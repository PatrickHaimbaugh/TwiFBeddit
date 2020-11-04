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
import * as globalActions from "../containers/GlobalContainer/actions";
import * as navigationActions from "../containers/NavigationContainer/actions";
import _ from "lodash";

const AccountPage = () => {
	const currentAccount = useSelector((state) => state.account),
		{ usernameForAccountPage, userForAccountPage } = useSelector(
			(state) => state.navigation
		),
		[showPosts, setShowPosts] = useState("posts"),
		cookie = useSelector((state) => state.global.cookie),
		dispatch = useDispatch(),
		posts = useSelector((state) => state.global.posts),
		[isCurUser, setIsCurUser] = useState(true),
		[isFollowing, setIsFollowing] = useState(false);

	useEffect(() => {
		const getPosts = async () => {
			if (currentAccount.username) {
				if (currentAccount.username === usernameForAccountPage) {
					dispatch(navigationActions.setUserForAccountPage(currentAccount));

					makeNetworkCall({
						HTTPmethod: "get",
						path: "save",
						cookie,
					}).then((resp) => {
						dispatch(accountActions.setSavedPosts(resp.posts));
					});
				} else {
					makeNetworkCall({
						HTTPmethod: "get",
						path: "users",
						params: {
							username: usernameForAccountPage,
						},
					}).then((resp) => {
						dispatch(navigationActions.setUserForAccountPage(resp));
						setIsCurUser(false);
						setIsFollowing(
							currentAccount.following.includes(usernameForAccountPage)
						);
					});
				}
				makeNetworkCall({
					HTTPmethod: "get",
					path: "posts",
					params: {
						author: usernameForAccountPage,
					},
				}).then((resp) => {
					dispatch(globalActions.setPosts(resp.posts));
				});
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
			cookie,
		});
	};

	const logout = () => {
		// reset account info
		dispatch(accountActions.logout());
		// delete cookie and reset posts to empty
		dispatch(globalActions.logout());
		// set page to landing page
		dispatch(navigationActions.logout());
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
				{isCurUser ? (
					<LogoutRow>
						<LogoutButton onClick={() => logout()}>Logout</LogoutButton>
					</LogoutRow>
				) : null}
				<TabsRow>
					<Tab onClick={() => setShowPosts("posts")}>Posts</Tab>
					<Tab onClick={() => setShowPosts("comments")}>
						Comments and Interactions
					</Tab>
					{isCurUser ? (
						<Tab onClick={() => setShowPosts("saved")}>Saved Posts</Tab>
					) : null}
				</TabsRow>
				{showPosts === "posts"
					? _.map(posts, (post) => {
							if (post.post_type === "comment") {
								return;
							}
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
									Post={post}
								></Post>
							);
					  })
					: showPosts === "comments"
					? null //show all posts where they interacted
					: _.map(currentAccount.savedPosts, (post) => {
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
									Post={post}
								></Post>
							);
					  })}
				{}
			</Content>
		</Page>
	);
};

export default AccountPage;
