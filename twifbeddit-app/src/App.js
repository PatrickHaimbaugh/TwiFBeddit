import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import SignIn from "./pages/signin.js";
import VerificationInstructions from "./components/verificationInstructions.component"
import Verify from "./components/verify.component";

import SignUp from "./pages/signup.js";


function App() {
  return (
    <Router>
    <div className="container">

      <Route path="/signin" component = {SignIn}/>
      <Route path="/verification" component = {VerificationInstructions} />
      <Route path="/verify/:id" component = {Verify}/>

      <Route path="/signup" component =  {SignUp}/>


    </div>
    </Router>
  );
}

export default App;
