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

export function logout() {
	return {
		type: Constants.LOGOUT,
	};
}

export function setSavedPosts(object) {
	return {
		type: Constants.SET_SAVED_POSTS,
		object,
	};
}

export function addSavePost(object) {
	return {
		type: Constants.ADD_SAVE_POST,
		object,
	};
}

export function removeSavePost(payload) {
	return {
		type: Constants.REMOVE_SAVE_POST,
		payload,
	};
}

export function followTopic(topic) {
	return {
		type: Constants.FOLLOW_TOPIC,
		topic,
	};
}

export function unfollowTopic(topic) {
	return {
		type: Constants.UNFOLLOW_TOPIC,
		topic,
	};
}
