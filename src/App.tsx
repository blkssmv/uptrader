import "./App.css";
import CreateTask from "./components/CreateTask";
import { Route, Routes } from "react-router-dom";
import ListTasks from "./components/ListTasks";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header/>
      <div className="container">
        <Routes>
          <Route path="/" element={<CreateTask />} />
          <Route path="/list" element={<ListTasks />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
