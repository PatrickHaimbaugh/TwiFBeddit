import React, { useState, useEffect } from "react";

import { Page, Content, FollowButton } from "../styles/accountPageStyle";
import Post from "../components/Post.js";
import makeNetworkCall from "../util/makeNetworkCall";
import * as accountActions from "../containers/AccountContainer/actions";
import * as navigationActions from "../containers/NavigationContainer/actions";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
import * as globalActions from "../containers/GlobalContainer/actions";

export default function SearchResults({ loading }) {
	const currentAccount = useSelector((state) => state.account);
	const searchRequest = useSelector((state) => state.navigation.searchRequest);
	const cookie = useSelector((state) => state.global.cookie);
	const dispatch = useDispatch();

	const [posts, setPosts] = useState([]);
	const [isFollowing, setIsFollowing] = useState();

	const setInitialFollowState = () => {
		if (currentAccount.username) {
			if (currentAccount.followed_topics.includes(searchRequest)) {
				setIsFollowing(true);
			} else {
				setIsFollowing(false);
			}
		}
	};

	const followOrUnfollowTopic = (type) => {
		const topic = searchRequest;
		console.log(topic);
		if (currentAccount.username === "") {
			dispatch(navigationActions.changeCurrentPage("SignUp"));
			return;
		}
		let params = {};
		if (type === "Unfollow") {
			dispatch(accountActions.unfollowTopic(searchRequest));
			setIsFollowing(false);
			params = {
				topicToUnfollow: searchRequest,
			};
		} else {
			dispatch(accountActions.followTopic(searchRequest));
			setIsFollowing(true);
			params = {
				topicToFollow: searchRequest,
			};
		}
		makeNetworkCall({
			HTTPmethod: "post",
			path: "topics",
			params,
			cookie,
		});
	};

	const getPosts = async () => {
		dispatch(globalActions.changeLoading(true));
		setInitialFollowState();

		const topic = searchRequest;
		const resp = await makeNetworkCall({
			HTTPmethod: "get",
			path: "posts",
			params: {
				topic: topic,
			},
		});
		if (resp.error) {
			Alert.error("Something went wrong loading posts.", 4000);
		} else {
			//Convert list of JSON post objects into array
			var postsArray = [];
			for (var i = 0; i < resp.posts.length; i++) {
				var obj = resp.posts[i];
				console.log(obj);
				postsArray.push(obj);
			}
			/*this.setState({
        posts: postsArray,
      })*/
			console.log(postsArray);
			setPosts(postsArray);
		}
		dispatch(globalActions.changeLoading(false));
	};
	//getPosts()
	useEffect(() => {
		async function syncGetPosts() {
			await getPosts();
		}
		syncGetPosts();
	}, []);

	return (
		<Page col={12}>
			<Content hidden={loading ? true : false}>
				{isFollowing ? (
					<FollowButton
						onClick={() => {
							followOrUnfollowTopic("Unfollow");
						}}
					>
						Unfollow
					</FollowButton>
				) : (
					<FollowButton
						onClick={() => {
							followOrUnfollowTopic("Follow");
						}}
					>
						Follow
					</FollowButton>
				)}
				{posts.map(function (post) {
					return (
						<Post
							key={post._id}
							Username={post.author}
							Title={post.title}
							Topic={post.topic}
							Body={post.text}
							Upvotes={post.upvotes}
							Downvotes={post.downvotes}
							userVote="upvote"
							Image={post.image_url}
							PostId={post._id}
							Post={post}
						></Post>
					);
				})}
			</Content>
		</Page>
	);
}
