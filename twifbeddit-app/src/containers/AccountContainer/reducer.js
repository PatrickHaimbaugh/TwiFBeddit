import { AccordionActions } from "@material-ui/core";
import * as Constants from "./constants";
import _ from "lodash";

const initalState = {
	username: "",
	email: "",
	followers: 0,
	following: [],
	profile_picture: "",
	savedPosts: [],
	bio: "",
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
				savedPosts: action.object.savedPosts,
				bio: action.object.bio,
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

		default:
			return state;
	}
}
