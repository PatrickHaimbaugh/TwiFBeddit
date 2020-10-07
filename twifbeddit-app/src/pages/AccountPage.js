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
import { useSelector } from "react-redux";

const AccountPage = () => {
	const { username, profile_pictrue, bio, following, followers } = useSelector(
		(state) => state.account
	);

	return (
		<Page col={12}>
			<Content>
				<UpperHeaderRow>
					<ProfilePictureCol col={3}>
						<ProfilePicture alt="profilePicture" src={profile_pictrue} />
					</ProfilePictureCol>
					<FollowCol col={4} offset={1}>
						<FollowText>Followers</FollowText>
						<FollowNum> {followers} </FollowNum>
					</FollowCol>
					<FollowCol col={4}>
						<FollowText>Following</FollowText>
						<FollowNum> {following.length} </FollowNum>
					</FollowCol>
				</UpperHeaderRow>
				<UsernameRow>
					<UsernameText>{username}</UsernameText>
				</UsernameRow>
				<BioRow>
					<BioText>Purdue CS student</BioText>
				</BioRow>
				<Post
					Username={username}
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
