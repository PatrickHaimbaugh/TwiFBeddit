import styled from "styled-components";
import { Col, Row } from "styled-bootstrap-grid";

export const Content = styled(Col)`
	width: 750px;
	background-color: white;
	border: 2px black solid;
	margin: 2rem 0;
`;

export const CommentCol = styled(Col)``;

export const UsernameRow = styled(Row)``;

export const UsernameText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-size: 0.75rem;
	font-weight: 600;
`;

export const CommentRow = styled(Row)``;

export const CommentText = styled.p`
	margin-left: 1rem;
`;
