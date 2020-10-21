import styled from "styled-components";
import { Row, Col } from "styled-bootstrap-grid";
import { Navbar, Input, InputGroup, Nav } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Content = styled(Col)``;

export const NavigationBar = styled(Row)`
	background-color: #1ea1f1;
	display: flex;
	align-items: center;
	color: white;
`;

export const NavigationText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-size: 1.15rem;
	font-weight: 600;
	transition: all 0.25s linear;
	cursor: pointer;
	left: 25%;
	right: 25%;
	justify-self: center;
`;

export const MyInput = styled(Input)``;

export const MyInputGroup = styled(InputGroup)`
	max-width: 100%;
	align-self: center;
	display: flex;
`;

export const Header = styled.div`
	float: left;
	margin-left: 0.25rem;
	height: 56px;
	color: white;
	display: flex;
	cursor: pointer;
	align-items: center;
`;

export const HeaderText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-size: 2rem;
	font-weight: 600;
	&::hover {
		background-color: green;
	}
`;

export const MyNav = styled(Nav)`
	display: flex;
	justify-content: center;
	position: absolute;
	left: 25%;
	right: 25%;
	align-items: center;
`;

export const NavTextContent = styled.div`
	height: 2.25rem;
	border-radius: 7px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	width: 100%;
	background-color: ${(props) => (props.currentPage ? "#14202b" : "inherit")};

	&:hover {
		background-color: #86c8f0;
	}
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

export const NavigationIcon = styled(FontAwesomeIcon)`
	font-size: 1.5rem;
	min-width: 38px;
	transition: color 0.25s linear;
	cursor: pointer;
`;
