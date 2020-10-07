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
  border: 1px black solid;
`;

export const VotesText = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
`;