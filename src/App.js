import { Component } from 'react';
import './App.css';
import {Counter} from './components/counter/Counter';
import FirstComponent from './components/learning-examples/FirstExample';
import SecondComponent from './components/learning-examples/SecondExample';
//importing multiple component from one module.
import { ThirdComponent, FourthComponent } from './components/learning-examples/ThirdComponent';
import { TodoApp } from './components/todo/TodoApp';

function App() {
  return (
    //calling LearningComponentsfrom below.
    //<div className='App'><LearningComponents /></div>
    <div className='App'>
      {/*<Counter/>*/}
      <TodoApp/>
    </div>
  )
}


class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
        My Todo-Application
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
        <FourthComponent />
      </div>
    );
  }
}

export default App;
