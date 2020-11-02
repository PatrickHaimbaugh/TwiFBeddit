import React from "react";
import { useState } from "react";
import makeNetworkCall from "../util/makeNetworkCall";
import {
	Content,
	ContentCol,
	UserTopicRow,
	UserTopicText,
	TitleRow,
	TitleText,
	ImageRow,
	ImagePic,
	BodyRow,
	BodyText,
	VotesRow,
	VotesCol,
	UpvoteButton,
	DownvoteButton,
	SaveButton,
} from "../styles/postStyle";
import { useSelector, useDispatch } from "react-redux";
import * as navigationActions from "../containers/NavigationContainer/actions";
import * as accountActions from "../containers/AccountContainer/actions";

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
		PostId,
		Post,
	} = props;

	const [curVote, setCurVote] = useState(""),
		cookie = useSelector((state) => state.global.cookie),
		[loading, setLoading] = useState(false),
		dispatch = useDispatch(),
		savedPostIds = useSelector((state) => state.account.savedPostIds);

	const vote = async (command) => {
		const voteType = curVote === command ? "un" + command : command;
		const oldCurVote = curVote;
		setCurVote(voteType);
		setLoading(true);
		const resp = await makeNetworkCall({
			HTTPmethod: "post",
			path: "votes",
			params: {
				postId: PostId,
				action: voteType,
			},
			cookie,
		});
		if (resp.error) {
			setCurVote(oldCurVote);
		}
		setLoading(false);
	};

	const switchToAuthorAccount = () => {
		dispatch(navigationActions.setUsernameForAccountPage(Username));
		dispatch(navigationActions.changeCurrentPage("Account"));
	};

	const savePost = async () => {
		setLoading(true);
		let params;
		let saved = savedPostIds.includes(PostId);
		if (saved) {
			params = {
				postId: PostId,
				unsave: true,
			};
			dispatch(accountActions.removeSavePost(PostId));
		} else {
			params = {
				postId: PostId,
			};
			dispatch(accountActions.addSavePost(Post));
		}
		const resp = await makeNetworkCall({
			HTTPmethod: "post",
			path: "save",
			cookie,
			params,
		});

		setLoading(false);
	};

	return (
		<Content>
			<ContentCol col={12}>
				<UserTopicRow>
					<UserTopicText onClick={() => switchToAuthorAccount()}>
						u/{Username}
					</UserTopicText>
					<UserTopicText>r/{Topic}</UserTopicText>
				</UserTopicRow>
				<TitleRow>
					<TitleText>{Title}</TitleText>
				</TitleRow>
				<ImageRow>
					<ImagePic src={Image} />
				</ImageRow>
				<BodyRow>
					<BodyText>{Body}</BodyText>
				</BodyRow>
				<VotesRow>
					<VotesCol col={4}>
						<UpvoteButton disabled={loading} onClick={() => vote("up")}>
							{curVote === "up" ? "undo UpVote" : "Upvote"}
						</UpvoteButton>
					</VotesCol>
					<VotesCol col={4}>
						<DownvoteButton disabled={loading} onClick={() => vote("down")}>
							{curVote === "down" ? "undo Downvote" : "Downvote"}
						</DownvoteButton>
					</VotesCol>
					<VotesCol col={4}>
						<SaveButton disabled={loading} onClick={() => savePost()}>
							{savedPostIds.includes(PostId) ? "Unsave Post" : "Save Post"}
						</SaveButton>
					</VotesCol>
				</VotesRow>
			</ContentCol>
		</Content>
	);
};

export default Post;
