import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { AuthProvider, AuthContext } from './context/auth';
import React, { useContext } from 'react';

function App() {

  const Private = ({children}) => {
    const { authorized } = useContext(AuthContext)

    if( !authorized ) return <Navigate to="/login"/>
    return(children)
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path= "/login" element = {<LoginPage/>} />
          <Route exact path= "/" element = {
            <Private>
              <HomePage/>
            </Private>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
