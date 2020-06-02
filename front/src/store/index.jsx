import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

const rootReducer = combineReducers({
	...reducers,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;