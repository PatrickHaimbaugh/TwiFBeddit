import * as Constants from "./constants";

export function changeCurrentPage(payload) {
	return {
		type: Constants.CHANGE_CURRENT_PAGE,
		payload,
	};
}
