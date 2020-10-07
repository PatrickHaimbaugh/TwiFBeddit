import { AccordionActions } from "@material-ui/core";
import * as Constants from "./constants";

const initalState = {
	username: "",
	email: "",
	followers: 0,
	following: [],
	profile_pictrue: "",
	savedPosts: [],
	bio: "",
};

export default function startReducer(state = initalState, action) {
	switch (action.type) {
		case Constants.SIGN_IN_OR_SIGN_UP: {
			return {
				...state,
				username: action.object.username,
				email: action.object.email,
				followers: action.object.followers,
				following: action.object.following,
				profile_pictrue: action.object.profile_pictrue,
				savedPosts: action.object.savedPosts,
				bio: action.object.bio,
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
