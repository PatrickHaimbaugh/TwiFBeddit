import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page, Content } from "../styles/accountPageStyle";
import Post from "../components/Post.js";
import makeNetworkCall from "../util/makeNetworkCall";
import { Alert } from "rsuite";
import * as globalActions from "../containers/GlobalContainer/actions";

export default function LandingPage({ loading }) {
	const username = useSelector((state) => state.account.username);
	const cookie = useSelector((state) => state.global.cookie);
	const dispatch = useDispatch();

	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		dispatch(globalActions.changeLoading(true));
		const resp = await makeNetworkCall({
			HTTPmethod: "get",
			path: "posts",
			cookie: cookie,
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
		if (cookie) {
			async function syncGetPosts() {
				await getPosts();
			}
			syncGetPosts();
		}
	}, []);

	return (
		<Page col={12}>
			{username != "" ? (
				<Content hidden={loading ? true : false}>
					{posts.map(function (post) {
						return (
							<Post
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
								Url={post.url}
							></Post>
						);
					})}
				</Content>
			) : (
				<div>
					<h1>Welcome to TwiFBeddit!</h1>
				</div>
			)}
		</Page>
	);
}
