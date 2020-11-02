import * as Constants from "./constants";

export function setPosts(object) {
	return {
		type: Constants.SET_POSTS,
		object,
	};
}

export function setCookie(payload) {
	return {
		type: Constants.SET_COOKIE,
		payload,
	};
}
