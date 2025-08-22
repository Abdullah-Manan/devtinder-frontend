import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./component/Body";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
