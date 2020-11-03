import styled from "styled-components";
import { Col, Row } from "styled-bootstrap-grid";

export const Content = styled(Row)`
	cursor: ${(props) => (props.currentPost ? "initial" : "pointer")};
`;

export const ContentCol = styled(Col)`
	background-color: white;
	border: 2px black solid;
`;

export const UserTopicRow = styled(Row)`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

export const UserTopicText = styled.p`
	cursor: pointer;
	font-family: "Montserrat", sans-serif;
	font-size: 0.75rem;
	font-weight: 600;
	margin: 0;
`;

export const TitleRow = styled(Row)``;

export const TitleText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-size: 1.15rem;
	font-weight: 600;
	margin: 0;
`;

export const ImageRow = styled(Row)`
	display: flex;
	justify-content: center;
`;

export const ImagePic = styled.img`
	max-width: 100%;
	height: auto;
`;

export const BodyRow = styled(Row)``;

export const BodyText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-size: 1rem;
	font-weight: 400;
	margin: 0;
`;

export const VotesRow = styled(Row)`
	justify-content: space-around;
`;

export const VotesCol = styled(Col)`
	display: flex;
	justify-content: center;
`;

export const UpvoteButton = styled.button`
	display: inline-block;
	height: 38px;
	padding: 0 30px;
	color: white;
	text-align: center;
	font-size: 11px;
	font-weight: 700;
	line-height: 38px;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	text-decoration: none;
	white-space: nowrap;
	border-radius: 2px;
	background-color: #ff4500;
	border: 1px solid #ff4500;
	cursor: pointer;
	box-sizing: border-box;
	width: 33%;
`;

export const DownvoteButton = styled.button`
	display: inline-block;
	height: 38px;
	padding: 0 30px;
	color: white;
	text-align: center;
	font-size: 11px;
	font-weight: 700;
	line-height: 38px;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	text-decoration: none;
	white-space: nowrap;
	border-radius: 2px;
	background-color: #9494ff;
	border: 1px solid #9494ff;
	cursor: pointer;
	box-sizing: border-box;
	width: 33%;
`;

export const SaveButton = styled.button`
	display: inline-block;
	height: 38px;
	padding: 0 30px;
	color: white;
	text-align: center;
	font-size: 11px;
	font-weight: 700;
	line-height: 38px;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	text-decoration: none;
	white-space: nowrap;
	border-radius: 2px;
	background-color: #00acee;
	border: 1px solid #00acee;
	cursor: pointer;
	box-sizing: border-box;
	width: 33%;
`;
