import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation";
import EditAccountPage from "./pages/EditAccountPage";
import AccountPage from "./pages/AccountPage";
import PostPage from "./pages/PostPage";
import ViewPost from "./pages/ViewPost";

import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./pages/signin.js";
import VerificationInstructions from "./components/verificationInstructions.component";
import Verify from "./components/verify.component";

import SignUp from "./pages/signup.js";
import Loader from "./components/Loader";

import TopicResults from "./pages/topicResults.js";

const App = (props) => {
	const currentPage = useSelector((state) => state.navigation.currentPage),
		loading = useSelector((state) => state.global.loading);

	return (
		<Router>
			<div className="container">
				<Navigation />

				{loading && <Loader loading={loading} />}

				{currentPage === "LandingPage" && <LandingPage loading={loading} />}

				{currentPage === "SignIn" && <SignIn loading={loading} />}

				{currentPage === "SignUp" && <SignUp loading={loading} />}

				{currentPage === "EditAccountPage" && (
					<EditAccountPage loading={loading} />
				)}

				{currentPage === "Account" && <AccountPage loading={loading} />}

				{currentPage === "Post" && <PostPage loading={loading} />}

				{currentPage === "ViewPost" && <ViewPost loading={loading} />}

				<Route path="/verification" component={VerificationInstructions} />
				<Route path="/verify/:id" component={Verify} />

				{/*<Route path="/topic/:topic" component={TopicResults} />*/}

				{currentPage === "SearchResults" && <TopicResults loading={loading} />}
			</div>
		</Router>
	);
};
export default App;
