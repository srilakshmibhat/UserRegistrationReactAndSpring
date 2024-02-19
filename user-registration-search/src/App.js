import './App.css';
import RegistrationForm from './components/RegistrationForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Route
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';
// import { RedirectionProvider } from './components/RedirectionContext'; // Import RedirectionProvider


function App() {

  return (
    <div className="App" style={styles.appContainer}>
      <Router>
        {/* <RedirectionProvider> */}
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        {/* </RedirectionProvider> */}
      </Router>
    </div>
  );
}
const styles = {
  appContainer: {
    backgroundColor: '#222', // Change background color to a darker color
    minHeight: '100vh', // Ensure the container takes up the full height of the viewport
    padding: '20px', // Add padding to the container
  },
};
// const cors = require("cors");
// const corsOptions = {
//   origin: '*',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// }

// App.use(cors(corsOptions))

export default App;
