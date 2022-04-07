import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SocketDemo from "./SocketDemo";

function App() {
  return (
    <div className='App'>
      <h1>Welcome To the page</h1>
      <BrowserRouter>
        <div className='nav fluid-container bg-dark'>
          <div className='row w-100 p-2 m-2'>
            <Link activeClassName='active' className='link-ele' to='/'>
              <button className='home-link'>Home</button>
            </Link>

            <Link activeClassName='active' className='link-ele' to='/socket'>
              <button className='socket-link'>Socket Connection</button>
            </Link>
          </div>
        </div>
        <Routes>
          <Route path='/' />
          <Route path='/socket' element={<SocketDemo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
