import { Component } from 'react';

//Creating functional Component
function ThirdComponent() {
    return (
        <div>Third Component</div>
    );
}

//Creating functional Component
function FourthComponent() {
    return (
        <div>Fourth Component</div>
    );
}

//exporting multiple functional component from one module.
export {ThirdComponent, FourthComponent};