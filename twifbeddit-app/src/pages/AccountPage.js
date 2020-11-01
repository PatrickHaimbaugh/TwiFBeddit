import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import makeNetworkCall from "../util/makeNetworkCall";
import * as GlobalActions from "../containers/GlobalContainer/actions";
import _ from "lodash";

const AccountPage = () => {
	const { username, profile_picture, bio, following, followers } = useSelector(
			(state) => state.account
		),
		dispatch = useDispatch(),
		posts = useSelector((state) => state.global.posts);

	useEffect(() => {
		const getPosts = async () => {
			if (username) {
				const resp = await makeNetworkCall({
					HTTPmethod: "get",
					path: "posts",
					params: {
						author: username,
					},
				});
				dispatch(GlobalActions.setPosts(resp.posts));
			}
		};
		getPosts();
	}, [username]);

	return (
		<Page col={12}>
			<Content>
				<UpperHeaderRow>
					<ProfilePictureCol col={3}>
						<ProfilePicture alt="profilePicture" src={profile_picture} />
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
					<BioText>{bio}</BioText>
				</BioRow>
				{_.map(posts, (post) => {
					return (
						<Post
							Username={post.author}
							Title={post.title}
							Topic={post.topic}
							Body={post.text}
							Upvotes={post.upvotes}
							Downvotes={post.downvotes}
							Image={post.image_url}
						></Post>
					);
				})}
			</Content>
		</Page>
	);
};

export default AccountPage;
