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
		loggedIn = useState(false);

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
				<Col col={1} offset={1}>
					<NavTextContent>
						<NavigationText onClick={() => changeActiveScreen("SignIn")}>
							Sign In
						</NavigationText>
					</NavTextContent>
				</Col>
				<Col col={1}>
					<NavTextContent>
						<NavigationText onClick={() => changeActiveScreen("Register")}>
							Register
						</NavigationText>
					</NavTextContent>
				</Col>
				{loggedIn ? null : (
					<Col col={4}>
						<IconContainer>
							<NavTextContent>
								<NavigationIcon icon={faHome} />
							</NavTextContent>
							<NavTextContent>
								<NavigationIcon icon={faCommentAlt} />
							</NavTextContent>
							<NavTextContent>
								<NavigationIcon icon={faUserCircle} />
							</NavTextContent>
							<NavTextContent>
								<NavigationIcon icon={faCog} />
							</NavTextContent>
						</IconContainer>
					</Col>
				)}
			</NavigationBar>
		</Content>
	);
};

export default Navigation;
