// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useAuthStore } from './store/useAuthStore'
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Opportunities from './pages/Opportunities';
// import OpportunityDetails from './pages/OpportunityDetails';
// import ClubsCulture from './pages/ClubsCulture';
// import ClubsCultureDetails from './pages/ClubsCultureDetails';
// import Connect from './pages/Connect';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import Signup from './pages/SignUp';
// import EventDetails from './pages/EventDetails';   // ⬅️ NEW
// function App() {
//   const {checkAuth,isCheckingAuth,authUser}= useAuthStore();
//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);
//   return (
//       <Router>
//         <div className="flex flex-col min-h-screen">
//           <Navbar />
//           <main className="flex-grow">
//             <Routes>
//               {/* Home */}


//               {/* Opportunities */}
//               <Route path="/opportunities" element={<Opportunities />} />
//               <Route path="/opportunities/:id" element={<OpportunityDetails />} />

//               {/* Events */}
//               <Route path="/events/:id" element={<EventDetails />} />

//               {/* Clubs & Culture */}
//               <Route path="/clubs-culture" element={<ClubsCulture />} />
//               <Route path="/clubs-culture/:id" element={<ClubsCultureDetails />} />

//               {/* Other pages */}
//               <Route path="/connect" element={<Connect />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Opportunities from './pages/Opportunities';
import OpportunityDetails from './pages/OpportunityDetails';
import ClubsCulture from './pages/ClubsCulture';
import ClubsCultureDetails from './pages/ClubsCultureDetails';
import Connect from './pages/Connect';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import EventDetails from './pages/EventDetails';

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // While checking token → show loader
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Checking authentication...
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <Navbar />

        <main className="flex-grow">
          <Routes>

            {/* 🟢 PROTECTED ROUTES (User must be logged in) */}
            <Route
              path="/"
              element={authUser ? <Home /> : <Navigate to="/login" />}
            />

            <Route
              path="/opportunities"
              element={authUser ? <Opportunities /> : <Navigate to="/login" />}
            />

            <Route
              path="/opportunities/:id"
              element={authUser ? <OpportunityDetails /> : <Navigate to="/login" />}
            />

            <Route
              path="/events/:id"
              element={authUser ? <EventDetails /> : <Navigate to="/login" />}
            />

            <Route
              path="/clubs-culture"
              element={authUser ? <ClubsCulture /> : <Navigate to="/login" />}
            />

            <Route
              path="/clubs-culture/:id"
              element={authUser ? <ClubsCultureDetails /> : <Navigate to="/login" />}
            />

            <Route
              path="/connect"
              element={authUser ? <Connect /> : <Navigate to="/login" />}
            />

            <Route
              path="/profile"
              element={authUser ? <Profile /> : <Navigate to="/login" />}
            />

            {/* 🔵 PUBLIC ROUTES (If user is logged in → send to home) */}
            <Route
              path="/login"
              element={!authUser ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/signup"
              element={!authUser ? <Signup /> : <Navigate to="/" />}
            />

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
