import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path= "/login" element = {<LoginPage/>} />
      <Route exact path= "/" element = {<HomePage/>} />
    </Routes>
  </Router>

  );
}

export default App;
