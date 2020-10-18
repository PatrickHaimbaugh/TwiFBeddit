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
import { Icon } from "rsuite";
import { Col } from "styled-bootstrap-grid";
import "rsuite/dist/styles/rsuite-default.css";
import {
	faHome,
	faCommentAlt,
	faUserCircle,
	faCog,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = (props) => {
	const dispatch = useDispatch(),
		username = useSelector((state) => state.account.username),
		activeScreen = useSelector((state) => state.navigation.currentPage),
		[isLoggedIn, setIsLoggedIn] = useState(false);

	const changeActiveScreen = (screen) => {
		dispatch(navigationActions.changeCurrentPage(screen));
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
					<MyInputGroup>
						<MyInput />
						<MyInputGroup.Button>
							<Icon icon="search" />
						</MyInputGroup.Button>
					</MyInputGroup>
				</Col>
				{username != "" ? (
					<Col col={4}>
						<IconContainer>
							<NavTextContent
								onClick={() => changeActiveScreen("Home")}
								currentPage={activeScreen == "Home"}
							>
								<NavigationIcon icon={faHome} />
							</NavTextContent>
							<NavTextContent
								onClick={() => changeActiveScreen("Post")}
								currentPage={activeScreen == "Post"}
							>
								<NavigationIcon icon={faCommentAlt} />
							</NavTextContent>
							<NavTextContent
								onClick={() => changeActiveScreen("Account")}
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
