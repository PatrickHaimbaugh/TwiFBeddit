import * as Constants from "./constants";

const initalState = {
	currentPage: "LandingPage",
	searchRequest: "",
};

export default function startReducer(state = initalState, action) {
	switch (action.type) {
		case Constants.CHANGE_CURRENT_PAGE: {
			return {
				...state,
				currentPage: action.payload,
			};
		}

		case Constants.SEARCH_REQUEST: {
			return {
				...state,
				searchRequest: action.searchRequest,
			}
		}

		default:
			return state;
	}
}
