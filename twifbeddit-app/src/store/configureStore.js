import { applyMiddleware, compose, createStore } from "redux";
import { logger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { persistStore } from "redux-persist";

import rootReducer from "./combineReducers";

const middlewares = [];

middlewares.push(logger);
middlewares.push(thunkMiddleware);

export default function configureStore() {
	const store = createStore(
		rootReducer,
		undefined,
		compose(applyMiddleware(...middlewares))
	);

	persistStore(store);

	return store;
}
