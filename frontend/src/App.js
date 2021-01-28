import React, { useState } from 'react';
// import 'tabler-react/dist/Tabler.css';
import { Loader } from 'tabler-react';
import { BrowserRouter as Router } from 'react-router-dom';

// import ProtectedNavbar from './components/Navbar/ProtectedNavbar';

// import ResetPassword from './components/Auth/ResetPassword';

// Import Routes
import AuthRoutes from './routes/AuthRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';


function App() {
  const [authIsUpToDate/*, setAuthIsUpToDate*/] = useState(true);
  const [user/*, setUser*/] = useState(true);

  // useEffect(() => {
  //   firebase.auth.onAuthStateChanged((u) => {
  //     setUser(u);
  //     setAuthIsUpToDate(true);
  //   });
  // }, []);

  return (
    <>
    {!authIsUpToDate ? (
      <div className="center-page">
        <Loader />
      </div>
    ) : (
      <div className="App">
        <Router>{user ? <ProtectedRoutes /> : <AuthRoutes />}</Router>
      </div>
    )}
    </>
  );
}

export default App;
