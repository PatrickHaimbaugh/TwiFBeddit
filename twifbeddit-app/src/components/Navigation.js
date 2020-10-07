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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = (props) => {
	const dispatch = useDispatch(),
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
				{isLoggedIn ? (
					<Col col={4}>
						<IconContainer>
							<NavTextContent onClick={() => changeActiveScreen("Home")}>
								<NavigationIcon icon={faHome} />
							</NavTextContent>
							<NavTextContent onClick={() => changeActiveScreen("Post")}>
								<NavigationIcon icon={faCommentAlt} />
							</NavTextContent>
							<NavTextContent onClick={() => changeActiveScreen("Account")}>
								<NavigationIcon icon={faUserCircle} />
							</NavTextContent>
							<NavTextContent onClick={() => changeActiveScreen("EditAccount")}>
								<NavigationIcon icon={faCog} />
							</NavTextContent>
						</IconContainer>
					</Col>
				) : (
					<Col col={4}>
						<IconContainer>
							<NavTextContent onClick={() => changeActiveScreen("SignIn")}>
								<NavigationText>Sign In</NavigationText>
							</NavTextContent>
							<NavTextContent onClick={() => changeActiveScreen("Register")}>
								<NavigationText>Register</NavigationText>
							</NavTextContent>
						</IconContainer>
					</Col>
				)}
			</NavigationBar>
		</Content>
	);
};

export default Navigation;
