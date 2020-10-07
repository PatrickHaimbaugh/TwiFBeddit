import React from "react";
import {
	Page,
	Content,
	UpperHeaderRow,
	ProfilePictureCol,
	ProfilePicture,
	FollowCol,
	FollowText,
	FollowNum,
	UsernameRow,
	UsernameText,
	BioRow,
	BioText,
} from "../styles/accountPageStyle";
import Post from "../components/Post";

const AccountPage = () => {
	return (
		<Page col={12}>
			<Content>
				<UpperHeaderRow>
					<ProfilePictureCol col={3}>
						<ProfilePicture
							alt="profilePicture"
							src="https://icanmakeshoes.com/wp-content/uploads/2010/09/blank-profile-picture.png"
						/>
					</ProfilePictureCol>
					<FollowCol col={4} offset={1}>
						<FollowText>Followers</FollowText>
						<FollowNum>354</FollowNum>
					</FollowCol>
					<FollowCol col={4}>
						<FollowText>Following</FollowText>
						<FollowNum>247</FollowNum>
					</FollowCol>
				</UpperHeaderRow>
				<UsernameRow>
					<UsernameText>Patrick</UsernameText>
				</UsernameRow>
				<BioRow>
					<BioText>Bio here</BioText>
				</BioRow>
				<Post
					Username="Perry"
					Title="Mac is Great"
					Topic="Music"
					Body="Faces is a great project!!!!!!"
					Upvotes="69"
					Downvotes="69"
					userVote="upvote"
					Image="https://www.rollingstone.com/wp-content/uploads/2018/11/mac-miller-left-behind.jpg?resize=1800,1200&w=450"
				></Post>
			</Content>
		</Page>
	);
};

export default AccountPage;
