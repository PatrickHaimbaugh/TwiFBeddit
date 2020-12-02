import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navigationActions from "../containers/NavigationContainer/actions";
import {
	Content,
	NavigationBar,
	NavigationText,
	Header,
	HeaderText,
	MyInput,
	MyInputGroup,
	NavTextContent,
	IconContainer,
	NavigationIcon,
} from "../styles/navigationStyle";
import { Alert, Icon } from "rsuite";
import { Col } from "styled-bootstrap-grid";
import "rsuite/dist/styles/rsuite-default.css";
import {
	faHome,
	faCommentAlt,
	faUserCircle,
	faCog,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../pages/createPostDisplayStyle.css";

const Navigation = (props) => {
	const dispatch = useDispatch(),
		username = useSelector((state) => state.account.username),
		activeScreen = useSelector((state) => state.navigation.currentPage),
		[isLoggedIn, setIsLoggedIn] = useState(false),
		[searchText, setSearchText] = useState("");

	const changeActiveScreen = (screen) => {
		dispatch(navigationActions.changeCurrentPage(screen));
	};

	const updateUsernameForAccount = (username) => {
		dispatch(navigationActions.setUsernameForAccountPage(username));
	};

	const handleSearchChange = (event) => {
		var input = event.target.value;
		setSearchText(input);
	};

	const handleSearchButtonClick = () => {
		//if searching for user:
		if (searchText.charAt(0) === "@") {
			dispatch(
				navigationActions.setUsernameForAccountPage(
					searchText.substring(1, searchText.length)
				)
			);
			changeActiveScreen("Account");
		}

		//if searching for topic:
		else if (searchText.charAt(0) === "#") {
			dispatch(
				navigationActions.storeSearchRequest(
					searchText.substring(1, searchText.length)
				)
			);
			changeActiveScreen("SearchResults");
		} else {
			Alert.error(
				'invalid search string. Please search for a user using "@" and a topic using "#". ',
				4000
			);
		}
	};

	const handleSearchButtonClickNonLoggedIn = () => {
		if (searchText.charAt(0) === "@") {
			dispatch(
				navigationActions.setUsernameForAccountPage(
					searchText.substring(1, searchText.length)
				)
			);
			changeActiveScreen("Account");
		} else {
			Alert.error(
				'You may only look up existing users. Please search for a user using "@".',
				4000
			);
		}
	};

	return (
		<Content col={12}>
			<NavigationBar>
				<Col col={2}>
					<Header>
						<HeaderText onClick={() => changeActiveScreen("LandingPage")}>
							TwiFBeddit
						</HeaderText>
					</Header>
				</Col>
				<Col col={4} offset={2}>
					{username != "" ? (
						<MyInputGroup>
							<input
								className="form-control"
								id="title"
								onChange={handleSearchChange}
							/>
							<MyInputGroup.Button
								onClick={handleSearchButtonClick}
								currentPage={activeScreen == "SearchResults"}
							>
								<Icon icon="search" />
							</MyInputGroup.Button>
						</MyInputGroup>
					) : (
						<MyInputGroup>
							<input
								className="form-control"
								id="title"
								onChange={handleSearchChange}
							/>
							<MyInputGroup.Button
								onClick={handleSearchButtonClickNonLoggedIn}
								currentPage={activeScreen == "SearchResults"}
							>
								<Icon icon="search" />
							</MyInputGroup.Button>
						</MyInputGroup>
					)}
				</Col>
				{username != "" ? (
					<Col col={4}>
						<IconContainer>
							<NavTextContent
								onClick={() => changeActiveScreen("Post")}
								currentPage={activeScreen == "Post"}
							>
								<NavigationIcon icon={faPlus} />
							</NavTextContent>
							<NavTextContent
								onClick={() => changeActiveScreen("Messaging")}
								currentPage={activeScreen == "Messaging"}
							>
								<NavigationIcon icon={faCommentAlt} />
							</NavTextContent>
							<NavTextContent
								onClick={() => {
									changeActiveScreen("Account");
									updateUsernameForAccount(username);
								}}
								currentPage={activeScreen == "Account"}
							>
								<NavigationIcon icon={faUserCircle} />
							</NavTextContent>
							<NavTextContent
								onClick={() => changeActiveScreen("EditAccountPage")}
								currentPage={activeScreen == "EditAccountPage"}
							>
								<NavigationIcon icon={faCog} />
							</NavTextContent>
						</IconContainer>
					</Col>
				) : (
					<Col col={4}>
						<IconContainer>
							<NavTextContent
								onClick={() => changeActiveScreen("SignIn")}
								currentPage={activeScreen == "SignIn"}
							>
								<NavigationText>Sign In</NavigationText>
							</NavTextContent>
							<NavTextContent
								onClick={() => changeActiveScreen("SignUp")}
								currentPage={activeScreen == "SignUp"}
							>
								<NavigationText>Sign Up</NavigationText>
							</NavTextContent>
						</IconContainer>
					</Col>
				)}
			</NavigationBar>
		</Content>
	);
};

export default Navigation;
