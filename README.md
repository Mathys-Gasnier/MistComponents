# MistComponents

A React components Library

## Components

### PinCode
Can be used to create pin code inputs

Usage:
```jsx
<Pincode
    n={ /* Number of pin code letters */ }
    validator={ /* A function that takes a char and returns if it's valid or not */ }
    filled={ /* Triggered when all inputs are filled */ }
    submit={ /* Triggered when the user presses Enter in the input and all the inputs are full */ }
    classes={ {
        container: 'container-class', // Custom css class for the pin code input container,
        case: 'case-class', // Custom css class for each pin code input
    } }
/>
```