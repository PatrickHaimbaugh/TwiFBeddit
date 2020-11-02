import * as Constants from "./constants";

const initalState = {
	posts: [],
	cookie: "",
};

export default function startReducer(state = initalState, action) {
	switch (action.type) {
		case Constants.SET_POSTS: {
			return {
				...state,
				posts: action.object,
			};
		}
		case Constants.SET_COOKIE: {
			return {
				...state,
				cookie: action.payload,
			};
		}

		default:
			return state;
	}
}
