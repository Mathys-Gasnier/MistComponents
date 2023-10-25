import { useRef, useState } from 'react';
import styles from './PinCode.module.css';

export interface Classes {
    container: string,
    case: string
}

export interface PinCodeProps {
    n: number,
    confidential?: boolean,
    validate?: (input: string) => boolean,
    filled?: (input: string[]) => void,
    submit?: (input: string[]) => void,
    classes?: Partial<Classes>
}

const defaultClasses: Classes = {
    container: styles.container,
    case: styles.case
};

export function PinCode({
    n, confidential, validate, filled, submit, classes
}: PinCodeProps) {

    if(confidential == undefined) confidential = false;
    
    classes = { ...defaultClasses, ...(classes ?? {}) };

    if(!classes) return <></>;

    const [ values, setValues ] = useState<string[]>(new Array(n).fill(''));

    const refs = new Array(n).fill(null).map(() => useRef<HTMLInputElement>(null))

    return (
        <form
            className={ classes.container }
            autoComplete="off"
            onClick={ (e) => {
                e.preventDefault();
                const idx = values.findIndex((v) => v === '');
                refs[idx === -1 ? n - 1 : idx].current?.focus();
            } }
            onSubmit={ (e) => {
                e.preventDefault();
                console.log('tt');
                if(submit && values.every((s) => s !== '')) {
                    submit(values);
                }
            } }
        >
            {
                new Array(n).fill(null).map((_, idx) => (
                    <input
                        key={ idx }
                        className={ classes!.case }
                        type={ confidential ? 'password' : 'text' }
                        name={ `${idx}` }
                        id={ `${idx}` }
                        ref={ refs[idx] }
                        value={ values[idx] }
                        onChange={ (e) => {
                            if(validate && !validate(e.target.value.charAt(0) ?? '')) {
                                return;
                            }
                            setValues((values) => {
                                values[idx] = e.target.value.charAt(0) ?? '';
                                if(filled && values.every((s) => s !== '')) {
                                    filled(values);
                                }
                                return [ ...values ];
                            });
                            if(idx + 1 < n) refs[idx + 1].current?.focus();
                        } }
                        onKeyDown={ (e) => {
                            if(e.code === 'Backspace') {
                                e.preventDefault();
                                setValues((values) => {
                                    if(idx === n - 1) values[idx] = '';
                                    else if(values[idx] !== '') values[idx] = '';
                                    else if(idx !== 0) values[idx - 1] = '';
                                    return [ ...values ];
                                });
                                if(idx !== 0) refs[idx - 1].current?.focus();
                            }else if(e.code === 'Enter') {
                                if(submit && values.every((s) => s !== '')) {
                                    submit(values);
                                }
                            }
                        } }
                    />
                ))
            }
        </form>
    );
}