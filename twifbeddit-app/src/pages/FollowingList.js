import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Content,
	FollowingRow,
	UserCol,
	TopicCol,
	HeaderText,
	UserTopicRow,
	UserTopicText,
	// Button,
} from "../styles/followingListStyle";
import _ from "lodash";
import * as accountActions from "../containers/AccountContainer/actions";
import { Alert, Button } from "rsuite";
import makeNetworkCall from "../util/makeNetworkCall";

const FollowingList = () => {
	const dispatch = useDispatch(),
		followedTopics = useSelector((state) => state.account.followed_topics),
		followedUsers = useSelector((state) => state.account.following),
		cookie = useSelector((state) => state.global.cookie);

	const UnfollowUserTopic = (topicOrUser, name) => {
		let method;
		let params;
		let path;
		if (topicOrUser === "user") {
			method = "patch";
			path = "users";
			params = {
				usernameToUnfollow: name,
			};
		} else {
			method = "post";
			path = "topics";
			params = {
				topicToUnfollow: name,
			};
		}
		makeNetworkCall({
			HTTPmethod: method,
			path: path,
			params,
			cookie,
		}).then((resp) => {
			if (resp.error) {
				Alert.error(
					"Something went wrong when changing following status.",
					4000
				);
			} else {
				if (topicOrUser == "user") {
					dispatch(accountActions.unfollowUser(name));
				} else {
					dispatch(accountActions.unfollowTopic(name));
				}
			}
		});
	};

	return (
		<Content col={12}>
			<FollowingRow>
				<UserCol col={4}>
					<HeaderText>Followed Users</HeaderText>
					{_.map(followedUsers, (user) => {
						return (
							<UserTopicRow>
								<UserTopicText>u/{user}</UserTopicText>
								<Button
									color="red"
									onClick={() => UnfollowUserTopic("user", user)}
								>
									Unfollow
								</Button>
							</UserTopicRow>
						);
					})}
				</UserCol>
				<TopicCol col={4}>
					<HeaderText>Followed Topics</HeaderText>
					{_.map(followedTopics, (topic) => {
						return (
							<UserTopicRow>
								<UserTopicText>r/{topic}</UserTopicText>
								<Button
									color="red"
									onClick={() => UnfollowUserTopic("topic", topic)}
								>
									Unfollow
								</Button>
							</UserTopicRow>
						);
					})}
				</TopicCol>
			</FollowingRow>
		</Content>
	);
};

export default FollowingList;
