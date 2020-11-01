import * as Constants from "./constants";

const initalState = {
	posts: [],
};

export default function startReducer(state = initalState, action) {
	switch (action.type) {
		case Constants.SET_POSTS: {
			return {
				...state,
				posts: action.object,
			};
		}

		default:
			return state;
	}
}
