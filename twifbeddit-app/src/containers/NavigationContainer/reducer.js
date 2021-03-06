import * as Constants from "./constants";

const initalState = {
	currentPage: "LandingPage",
	usernameForAccountPage: "",
	userForAccountPage: {
		username: "",
		email: "",
		followers: 0,
		following: [],
		profile_picture: "",
		savedPosts: [],
		bio: "",
		followed_topics: [],
	},
	searchRequest: "",
	dmResponse: "",
	selectedConversation: "",
	currentPost: {},
};

export default function startReducer(state = initalState, action) {
	switch (action.type) {
		case Constants.CHANGE_CURRENT_PAGE: {
			return {
				...state,
				currentPage: action.payload,
			};
		}

		case Constants.SET_USERNAME_FOR_ACCOUNT_PAGE: {
			return {
				...state,
				usernameForAccountPage: action.payload,
			};
		}

		case Constants.SET_USER_FOR_ACCOUNT_PAGE: {
			return {
				...state,
				userForAccountPage: action.object,
			};
		}

		case Constants.FOLLOW_USER_ON_ACCOUNT_PAGE: {
			return {
				...state,
				userForAccountPage: {
					...state.userForAccountPage,
					followers: state.userForAccountPage.followers + 1,
				},
			};
		}

		case Constants.UNFOLLOW_USER_ON_ACCOUNT_PAGE: {
			return {
				...state,
				userForAccountPage: {
					...state.userForAccountPage,
					followers: state.userForAccountPage.followers - 1,
				},
			};
		}

		case Constants.SEARCH_REQUEST: {
			return {
				...state,
				searchRequest: action.searchRequest,
			};
		}

		case Constants.LOGOUT: {
			return initalState;
		}

		case Constants.CHANGE_CURRENT_POST: {
			return {
				...state,
				currentPost: action.object,
			};
		}

		case Constants.DM_RESPONSE: {
			return {
				...state,
				dmResponse: action.response,
			};
		}

		case Constants.SELECTED_CONVERSATION: {
			return {
				...state,
				selectedConversation: action.username,
			};
		}

		default:
			return state;
	}
}
