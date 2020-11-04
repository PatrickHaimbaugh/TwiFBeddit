import * as Constants from "./constants";

export function changeCurrentPage(payload) {
	return {
		type: Constants.CHANGE_CURRENT_PAGE,
		payload,
	};
}

export function setUsernameForAccountPage(payload) {
	return {
		type: Constants.SET_USERNAME_FOR_ACCOUNT_PAGE,
		payload,
	};
}

export function setUserForAccountPage(object) {
	return {
		type: Constants.SET_USER_FOR_ACCOUNT_PAGE,
		object,
	};
}

export function followUserOnAccountPage() {
	return {
		type: Constants.FOLLOW_USER_ON_ACCOUNT_PAGE,
	};
}

export function unfollowUserOnAccountPage() {
	return {
		type: Constants.UNFOLLOW_USER_ON_ACCOUNT_PAGE,
	};
}

export function storeSearchRequest(searchRequest) {
	return {
		type: Constants.SEARCH_REQUEST,
		searchRequest,
	};
}

export function logout() {
	return {
		type: Constants.LOGOUT,
	};
}

export function changeCurrentPost(object) {
	return {
		type: Constants.CHANGE_CURRENT_POST,
		object,
	};
}
