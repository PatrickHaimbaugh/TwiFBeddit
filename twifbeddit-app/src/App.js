import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation";
import EditAccountPage from "./pages/EditAccountPage";

const App = (props) => {
	const currentPage = useSelector((state) => state.navigation.currentPage);

	return (
		<div>
			<Navigation />
			{currentPage === "LandingPage" && <LandingPage />}
			{currentPage === "EditAccountPage" && <EditAccountPage />}
		</div>
	);
};
export default App;
