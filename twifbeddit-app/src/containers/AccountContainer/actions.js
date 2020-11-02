import * as Constants from "./constants";

export function setUser(object) {
	return {
		type: Constants.SET_USER,
		object,
	};
}

export function followUser(payload) {
	return {
		type: Constants.FOLLOW_USER,
		payload,
	};
}

export function unfollowUser(payload) {
	return {
		type: Constants.UNFOLLOW_USER,
		payload,
	};
}