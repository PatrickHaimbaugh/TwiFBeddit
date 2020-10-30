import { AccordionActions } from "@material-ui/core";
import * as Constants from "./constants";

const initalState = {
	username: "",
	email: "",
	followers: 0,
	following: [],
	profile_picture: "",
	savedPosts: [],
	bio: "",
	cookie: "",
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
				cookie: action.object.cookie,
			};
		}

		case Constants.SIGN_OUT: {
			return {
				...initalState,
			};
		}

		default:
			return state;
	}
}
