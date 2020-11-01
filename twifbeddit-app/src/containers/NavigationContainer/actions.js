import * as Constants from "./constants";

export function changeCurrentPage(payload) {
	return {
		type: Constants.CHANGE_CURRENT_PAGE,
		payload,
	};
}

export function storeSearchRequest(searchRequest) {
	return {
		type: Constants.SEARCH_REQUEST,
		searchRequest,
	};
}
