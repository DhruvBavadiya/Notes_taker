import './App.css';
import About from './Componenets/About';
import Home from './Componenets/Home';
import Navbar from './Componenets/Navbar';
import NoteState from './Context/Notes/NoteState';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Componenets/Signup';
import Login from './Componenets/Login';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    
    <Navbar />
    <Routes>
    <Route exact path='/about' element={<About/>} />
    <Route exact path='/login' element={<Login/>} />
    <Route exact path='/signup' element={<Signup/>} />
    <Route exact path='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
