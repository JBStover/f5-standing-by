import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TitleBar from './components/titlebar';
import Updates from './components/updates';
import Login from './components/login';
import Home from './components/home';
import Chart from './components/chart';
import About from './components/about';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import  ProtectedRoute  from './components/protectedRoute';


const App = () => {
  


  return (
    <div className="App">
    <Router>
    <TitleBar />
      <Routes>     
          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<><Home /><Chart /></>}/>
          </Route>  
          <Route path="/updates" element={<Updates />}/>   
          <Route exact path="/login" element={<Login />}/>  
          <Route path="/about" element={<About />}/>
      </Routes> 
    </Router>
    </div>
    );
}

export default App;
