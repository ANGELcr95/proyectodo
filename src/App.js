import './App.css';
import TodoContainer from './TodoContainer';
import {useState} from "react";

function App() {

  const [color, setColor] = useState("#282c34")
  return (
    <div className="App">
      <header className="App-header"style={{backgroundColor: color}}>
        <TodoContainer setColor={setColor}/>
      </header>
    </div>
  );
} 

export default App;
