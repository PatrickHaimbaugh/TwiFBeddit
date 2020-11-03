import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import makeNetworkCall from "../util/makeNetworkCall";
import { Page } from "../styles/accountPageStyle";
import _ from "lodash";
import { Form, FormGroup, FormControl, Button } from "rsuite";
import {
	Content,
	CommentCol,
	UsernameRow,
	UsernameText,
	CommentRow,
	CommentText,
} from "../styles/viewPostStyle";
import * as globalActions from "../containers/GlobalContainer/actions";
import * as navigationAction from "../containers/NavigationContainer/actions";

const ViewPost = () => {
	const currentPost = useSelector((state) => state.navigation.currentPost),
		cookie = useSelector((state) => state.global.cookie),
		dispatch = useDispatch(),
		[comment, setComment] = useState(""),
		[loading, setLoading] = useState(false);

	const post = async () => {
		setLoading(true);
		await makeNetworkCall({
			HTTPmethod: "post",
			path: "comment",
			cookie,
			params: {
				id: currentPost._id,
			},
			data: {
				text: comment,
			},
		}).then((resp) => {
			dispatch(globalActions.updatePost(resp.updatedPost));
			dispatch(navigationAction.changeCurrentPost(resp.updatedPost));
		});
		setLoading(false);
		setComment("");
	};

	return (
		<Page col={12}>
			<Content>
				<Post
					Username={currentPost.author}
					Title={currentPost.title}
					Topic={currentPost.topic}
					Body={currentPost.text}
					Upvotes={currentPost.upvotes}
					Downvotes={currentPost.downvotes}
					userVote="upvote"
					Image={currentPost.image_url}
					PostId={currentPost._id}
					Post={currentPost}
					currentPost={true}
				></Post>
				<CommentCol>
					{_.map(currentPost.comments, (comment) => {
						return (
							<div key={comment._id}>
								<UsernameRow>
									<UsernameText>u/{comment.author}</UsernameText>
								</UsernameRow>
								<CommentRow>
									<CommentText>{comment.text}</CommentText>
								</CommentRow>
								<hr></hr>
							</div>
						);
					})}
				</CommentCol>
				<Form fluid>
					<FormGroup>
						<FormControl
							name="Comment"
							onChange={(e) => setComment(e)}
							value={comment}
							type="text"
						/>
						<Button onClick={() => post()} disabled={loading}>
							Comment
						</Button>
					</FormGroup>
				</Form>
			</Content>
		</Page>
	);
};

export default ViewPost;
