import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation";
import AccountPage from "./pages/AccountPage";

import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./pages/signin.js";
import VerificationInstructions from "./components/verificationInstructions.component";
import Verify from "./components/verify.component";

import SignUp from "./pages/signup.js";

const App = (props) => {
	const currentPage = useSelector((state) => state.navigation.currentPage);

	return (
		<Router>
			<div className="container">
				<Navigation />
				{currentPage === "LandingPage" && <LandingPage />}

				{currentPage === "SignIn" && <SignIn />}

				{currentPage === "SignUp" && <SignUp />}

				{currentPage === "Account" && <AccountPage />}
				{/* <Route path="/signin" component={SignIn} /> */}
				<Route path="/verification" component={VerificationInstructions} />
				<Route path="/verify/:id" component={Verify} />

				{/* <Route path="/signup" component={SignUp} /> */}
			</div>
		</Router>
	);
};
export default App;
