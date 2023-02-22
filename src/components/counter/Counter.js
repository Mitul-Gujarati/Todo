import React, { Component } from 'react';
import './Counter.css'

class Counter extends Component {

    constructor() {
        super();
        this.state = {
            counter: 0
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.resetCount = this.resetCount.bind(this);
    }

    render() {
        return (
            <div className='counter'>
                <CounterButton by={1} incerementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={5} incerementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={10} incerementMethod={this.increment} decrementMethod={this.decrement} />
                <span className='count'>{this.state.counter}</span><br />
                <button className='reset' onClick={this.resetCount}>Reset</button>
            </div>
        );
    }

    increment(by) {
        this.setState(
            (prevState) => {
                return { counter: prevState.counter + by }
            }
        );
    }

    decrement(by) {
        this.setState((prevState) => {
            return { counter: prevState.counter - by }
        });
    }

    resetCount() {
        this.setState({
            counter: 0
        })
    }
}

//Creating class Component
class CounterButton extends Component {

    //creating the constructor for initializing the state of the counter.
    constructor() {
        //calling super() is mendatory for creating the state.
        super();

        //here we are ceating a state for counter.
        // this.state = {
        //     counter: 0
        // }

        // //here we are binding the method to the current state.
        // this.increment = this.increment.bind(this);
        // this.decrement = this.decrement.bind(this);
    }

    //this part was shown in browser.
    render() {
        return (
            <div className='counter'>
                <button onClick={() => this.props.incerementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
                { /*<span className='count'>{this.state.counter}</span>*/}
            </div>
        );
    }

    // increment() {
    //     //for incresing the counter we need to update the state.
    //     //we can update the as below.
    //     //in setState method we need to pass javaScript object,which we want to update.
    //     this.setState((prevState) => {
    //        return {counter: prevState.counter + this.props.by}
    //     });

    //     this.props.incerementMethod(this.props.by);
    // }

    // decrement() {
    //     //for incresing the counter we need to update the state.
    //     //we can update the as below.
    //     //in setState method we need to pass javaScript object,which we want to update.
    //     this.setState( (prevState) => {
    //         return {counter: prevState.counter - this.props.by}
    //     });

    //     this.props.decrementMethod(this.props.by);
    // }
}

export { Counter, CounterButton };
