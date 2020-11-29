import * as Constants from "./constants";
import _ from "lodash";

const initalState = {
	posts: [],
	cookie: "",
	loading: false,
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

		case Constants.LOGOUT: {
			return initalState;
		}

		case Constants.UPDATE_POST: {
			return {
				...state,
				posts: _.map(state.posts, (post) => {
					if (post._id === action.object._id) {
						return action.object;
					}
					return post;
				}),
			};
		}

		case Constants.CHANGE_LOADING: {
			return {
				...state,
				loading: action.payload,
			};
		}

		default:
			return state;
	}
}
