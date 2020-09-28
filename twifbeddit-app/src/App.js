import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";

const App = (props) => {
	const currentPage = useSelector((state) => state.navigation.currentPage);

	return <div>{currentPage === "LandingPage" && <LandingPage />}</div>;
};
export default App;
