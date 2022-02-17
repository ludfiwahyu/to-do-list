import { MDBCol, MDBContainer } from "mdbreact";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="App">
      <MDBContainer>
        <div className="mt-4 mb-4">
          <h1>TodoApp and Weather</h1>
        </div>
        <MDBCol className="mt-4 mb-4">
          <Weather />
        </MDBCol>
        <MDBCol className="mt-4 mb-4">
          <h3>Todo App</h3>
          <AddTodo />
          <Todos />
        </MDBCol>
      </MDBContainer>
    </div>
  );
}

export default App;
