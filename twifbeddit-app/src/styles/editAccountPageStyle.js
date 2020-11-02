import styled from "styled-components";
import { Col, Row } from "styled-bootstrap-grid";
import { Input, ControlLabel, ButtonToolbar } from "rsuite";

export const Content = styled(Col)`
	/* background-color: grey; */
	/* color: white; */
`;

export const Title = styled.h2`
	font-family: "Montserrat", sans-serif;
	display: flex;
	justify-content: center;
`;

export const MyInput = styled(Input)``;

export const MyControlLabel = styled(ControlLabel)`
	font-family: "Montserrat", sans-serif;
	font-size: 1.15rem;
	font-weight: 600;
`;

export const MyButtonToolbar = styled(ButtonToolbar)`
	display: flex;
	justify-content: space-between;
`;
