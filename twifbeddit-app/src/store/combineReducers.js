import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import our reducers here.
import navigation from "../containers/NavigationContainer/reducer";
import account from "../containers/AccountContainer/reducer";
import global from "../containers/GlobalContainer/reducer";

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

const globalPersistConfig = {
	key: "global",
	storage,
	blacklist: ["posts", "loading"],
};

const rootReducer = combineReducers({
	navigation: persistReducer(navigationPersistConfig, navigation),
	account: persistReducer(accountPersistConfig, account),
	global: persistReducer(globalPersistConfig, global),
});

export default rootReducer;
