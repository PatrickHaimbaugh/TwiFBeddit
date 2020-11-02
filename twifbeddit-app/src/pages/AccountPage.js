import React, { useEffect, useState } from "react";
import {
	Page,
	Content,
	UpperHeaderRow,
	ProfilePictureCol,
	ProfilePicture,
	FollowCol,
	FollowText,
	FollowNum,
	FollowButton,
	UsernameRow,
	UsernameText,
	BioRow,
	BioText,
	LogoutRow,
	LogoutButton,
	TabsRow,
	Tab,
} from "../styles/accountPageStyle";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import * as accountActions from "../containers/AccountContainer/actions";
import makeNetworkCall from "../util/makeNetworkCall";
import * as GlobalActions from "../containers/GlobalContainer/actions";
import * as navigationActions from "../containers/NavigationContainer/actions";
import _ from "lodash";

const AccountPage = () => {
	const currentAccount = useSelector((state) => state.account),
		{ usernameForAccountPage, userForAccountPage } = useSelector(
			(state) => state.navigation
		),
		dispatch = useDispatch(),
		posts = useSelector((state) => state.global.posts),
		[isCurUser, setIsCurUser] = useState(true),
		[isFollowing, setIsFollowing] = useState(false);

	useEffect(() => {
		const getPosts = async () => {
			if (currentAccount.username) {
				if (currentAccount.username === usernameForAccountPage) {
					dispatch(navigationActions.setUserForAccountPage(currentAccount));
				} else {
					const userDataResp = await makeNetworkCall({
						HTTPmethod: "get",
						path: "users",
						params: {
							username: usernameForAccountPage,
						},
					});
					dispatch(navigationActions.setUserForAccountPage(userDataResp));
					setIsCurUser(false);
					setIsFollowing(
						currentAccount.following.includes(usernameForAccountPage)
					);
				}
				const resp = await makeNetworkCall({
					HTTPmethod: "get",
					path: "posts",
					params: {
						author: usernameForAccountPage,
					},
				});
				dispatch(GlobalActions.setPosts(resp.posts));
			}
		};
		getPosts();
	}, [currentAccount.username]);

	const changeActiveScreen = (screen) => {
		dispatch(navigationActions.changeCurrentPage(screen));
	};

	const followOrUnfollow = (type) => {
		if (currentAccount.username === "") {
			changeActiveScreen("SignUp");
			return;
		}
		let params = {};
		if (type === "Unfollow") {
			dispatch(navigationActions.unfollowUserOnAccountPage());
			dispatch(accountActions.unfollowUser(usernameForAccountPage));
			setIsFollowing(false);
			params = {
				usernameToUnfollow: usernameForAccountPage,
			};
		} else {
			dispatch(navigationActions.followUserOnAccountPage());
			dispatch(accountActions.followUser(usernameForAccountPage));
			setIsFollowing(true);
			params = {
				usernameToFollow: usernameForAccountPage,
			};
		}
		makeNetworkCall({
			HTTPmethod: "patch",
			path: "users",
			params,
			cookie: currentAccount.cookie,
		});
	};

	return (
		<Page col={12}>
			<Content>
				<UpperHeaderRow>
					<ProfilePictureCol col={3}>
						<ProfilePicture
							alt="profilePicture"
							src={userForAccountPage.profile_picture}
						/>
					</ProfilePictureCol>
					<FollowCol col={4} offset={1}>
						<FollowText>Followers</FollowText>
						<FollowNum> {userForAccountPage.followers} </FollowNum>
						{isCurUser ? null : isFollowing ? (
							<FollowButton
								onClick={() => {
									followOrUnfollow("Unfollow");
								}}
							>
								Unfollow
							</FollowButton>
						) : (
							<FollowButton
								onClick={() => {
									followOrUnfollow("Follow");
								}}
							>
								Follow
							</FollowButton>
						)}
					</FollowCol>
					<FollowCol col={4}>
						<FollowText>Following</FollowText>
						<FollowNum> {userForAccountPage.following.length} </FollowNum>
					</FollowCol>
				</UpperHeaderRow>
				<UsernameRow>
					<UsernameText>{userForAccountPage.username}</UsernameText>
				</UsernameRow>
				<BioRow>
					<BioText>{userForAccountPage.bio}</BioText>
				</BioRow>
				<TabsRow>
					<Tab>Posts</Tab>
					<Tab>Comments and Interactions</Tab>
					<Tab>Saved Posts</Tab>
				</TabsRow>
				{_.map(posts, (post) => {
					return (
						<Post
							key={post._id}
							Username={post.author}
							Title={post.title}
							Topic={post.topic}
							Body={post.text}
							Upvotes={post.upvotes}
							Downvotes={post.downvotes}
							Image={post.image_url}
							PostId={post._id}
						></Post>
					);
				})}
			</Content>
		</Page>
	);
};

export default AccountPage;
