import styled from "styled-components";
import { Col, Row } from "styled-bootstrap-grid";

export const Content = styled(Row)``;

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
  font-family: "Montserrat", sans-serif;
  font-size: .75rem;
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

export const ImagePic = styled.img``;

export const BodyRow = styled(Row)``;

export const BodyText = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
`;

export const VotesRow = styled(Row)``;

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
  letter-spacing: .1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #FF4500;
  border: 1px solid #FF4500;
  cursor: pointer;
  box-sizing: border-box;
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
  letter-spacing: .1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #9494FF;
  border: 1px solid #9494FF;
  cursor: pointer;
  box-sizing: border-box;
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
  letter-spacing: .1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #00ACEE;
  border: 1px solid #00ACEE;
  cursor: pointer;
  box-sizing: border-box;
`;