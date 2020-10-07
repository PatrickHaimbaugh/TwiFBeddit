import * as Constants from "./constants";

export function signInOrSignUp(object) {
	return {
		type: Constants.SIGN_IN_OR_SIGN_UP,
		object,
	};
}
