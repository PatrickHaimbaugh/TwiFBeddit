import * as Constants from "./constants";

const initalState = {
	currentPage: "LandingPage",
};

export default function startReducer(state = initalState, action) {
	switch (action.type) {
		case Constants.CHANGE_CURRENT_PAGE: {
			return {
				...state,
				currentPage: action.payload,
			};
		}

		default:
			return state;
	}
}
