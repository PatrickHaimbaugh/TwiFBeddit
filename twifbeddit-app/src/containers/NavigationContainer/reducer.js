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
	},
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

		default:
			return state;
	}
}
