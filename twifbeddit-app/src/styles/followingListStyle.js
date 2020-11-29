import styled from "styled-components";
import { Col, Row } from "styled-bootstrap-grid";

export const Content = styled(Col)``;

export const UserCol = styled(Col)`
	/* display: flex; */
`;

export const TopicCol = styled(Col)`
	/* display: flex; */
`;

export const HeaderText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-size: 1.15rem;
	font-weight: 600;
	text-align: center;
`;

export const FollowingRow = styled(Row)`
	display: flex;
	justify-content: space-evenly;
`;

export const UserTopicRow = styled(Row)`
	display: flex;
	justify-content: space-between;
	margin: 0.5rem 0;
	align-items: center;
`;

export const UserTopicText = styled.p``;

export const Button = styled.button``;
