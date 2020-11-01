import * as Constants from "./constants";

export function setUser(object) {
	return {
		type: Constants.SET_USER,
		object,
	};
}
