import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";




function App() {
  return (
    <Router>
      <Header />
      <Footer/>
    </Router>
  );
}

export default App;
