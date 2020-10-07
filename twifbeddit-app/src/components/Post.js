import React from "react";
import { Content, ContentCol, UserTopicRow, UserTopicText, TitleRow, TitleText, ImageRow, ImagePic, BodyRow, BodyText, VotesRow, VotesCol, VotesText } from "../styles/postStyle";

const Post = (props) => {
	const {
		Username,
		Title,
		Topic,
		Image,
		Body,
		Upvotes,
		Downvotes,
		userVote,
	} = props;

	return <Content>
		<ContentCol col={12}>
			<UserTopicRow>
				<UserTopicText>u/{Username}</UserTopicText>
				<UserTopicText>r/{Topic}</UserTopicText>
			</UserTopicRow>
			<TitleRow>
				<TitleText>{Title}</TitleText>
			</TitleRow>
				<ImageRow>
					<ImagePic
						src={Image}
					/>
			</ImageRow>
			<BodyRow>
				<BodyText>{Body}</BodyText>
			</BodyRow>
			<VotesRow>
				<VotesCol col={4}>
					<VotesText>Upvote</VotesText>
				</VotesCol>
				<VotesCol col={4}>
					<VotesText>Downvote</VotesText>
				</VotesCol>
				<VotesCol col={4}>
					<VotesText>Save Post</VotesText>
				</VotesCol>
			</VotesRow>
		</ContentCol>
	</Content>;
};

export default Post;
