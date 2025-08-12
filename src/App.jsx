import { Route, Routes } from "react-router-dom";
import "./App.css";
import EnterFormInfo from "./pages/EnterFormInfo";
import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import ViewForm from "./pages/ViewForm";
import NavBar from "./components/common/Navbar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes className='w-screen h-screen bg-richblack-900'>
        <Route path="/" element={<Home />} />
        <Route path="/enter-form-info" element={<EnterFormInfo />} />
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="/view" element={<ViewForm />} />
      </Routes>
    </div>
  );
}

export default App;
