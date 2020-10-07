import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import our reducers here.
import navigation from "../containers/NavigationContainer/reducer";
import account from "../containers/AccountContainer/reducer";

const navigationPersistConfig = {
	key: "navigation",
	storage,
	blacklist: [],
};

const accountPersistConfig = {
	key: "account",
	storage,
	blacklist: [],
};

const rootReducer = combineReducers({
	navigation: persistReducer(navigationPersistConfig, navigation),
	account: persistReducer(accountPersistConfig, account),
});

export default rootReducer;
