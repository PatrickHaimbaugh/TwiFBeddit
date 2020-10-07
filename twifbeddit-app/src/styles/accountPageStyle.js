import styled from "styled-components";
import { Col, Row } from "styled-bootstrap-grid";

export const Page = styled(Col)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Content = styled(Col)`
	background-color: white;
	border: 1px grey solid;
	width: 750px;
`;

export const Header = styled(Row)``;

export const UpperHeaderRow = styled(Row)``;

export const ProfilePictureCol = styled(Col)``;

export const ProfilePicture = styled.img`
	border: 2px solid black;
	border-radius: 50%;
	width: 100%;
`;

export const FollowCol = styled(Col)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;
export const FollowText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-size: 1.15rem;
	font-weight: 600;
`;
export const FollowNum = styled.p``;

export const UsernameRow = styled(Row)``;

export const UsernameText = styled.p`
	font-family: "Montserrat", sans-serif;
	font-size: 1.15rem;
	font-weight: 600;
`;

export const BioRow = styled(Row)``;

export const BioText = styled.p``;

export const Posts = styled(Row)``;
