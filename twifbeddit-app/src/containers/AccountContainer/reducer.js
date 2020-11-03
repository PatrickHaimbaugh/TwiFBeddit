import { AccordionActions } from "@material-ui/core";
import * as Constants from "./constants";
import _ from "lodash";

const initalState = {
	username: "",
	email: "",
	followers: 0,
	following: [],
	profile_picture: "",
	savedPostIds: [],
	bio: "",
	savedPosts: [],
	followed_topics: [],
};

export default function startReducer(state = initalState, action) {
	switch (action.type) {
		case Constants.SET_USER: {
			return {
				...state,
				username: action.object.username,
				email: action.object.email,
				followers: action.object.followers,
				following: action.object.following,
				profile_picture: action.object.profile_picture,
				savedPostIds: action.object.savedPosts,
				bio: action.object.bio,
				followed_topics: action.object.followed_topics,
			};
		}

		case Constants.SIGN_OUT: {
			return {
				...initalState,
			};
		}

		case Constants.FOLLOW_USER: {
			return {
				...state,
				following: [...state.following, action.payload],
			};
		}

		case Constants.UNFOLLOW_USER: {
			return {
				...state,
				following: _.filter(state.following, (username) => {
					return username != action.payload;
				}),
			};
		}

		case Constants.LOGOUT: {
			return initalState;
		}

		case Constants.SET_SAVED_POSTS: {
			return {
				...state,
				savedPosts: action.object,
			};
		}

		case Constants.ADD_SAVE_POST: {
			return {
				...state,
				savedPostIds: [...state.savedPostIds, action.object._id],
				savedPosts: [...state.savedPosts, action.object],
			};
		}

		case Constants.REMOVE_SAVE_POST: {
			return {
				...state,
				savedPosts: _.filter(state.savedPosts, (post) => {
					return post._id !== action.payload;
				}),
				savedPostIds: _.filter(state.savedPostIds, (id) => {
					return id !== action.payload;
				}),
			};
		}

		case Constants.FOLLOW_TOPIC: {
			return {
				...state,
				followed_topics: [...state.followed_topics, action.topic],
			};
		}

		case Constants.UNFOLLOW_TOPIC: {
			return {
				...state,
				followed_topics: _.filter(state.followed_topics, (topic) => {
					return topic !== action.topic;
				}),
			};
		}

		default:
			return state;
	}
}
