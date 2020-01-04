import { combineReducers } from 'redux';
import viewCategory from './ViewCategory';
import user from './User';
import cart from './Cart';

const rootReducer = combineReducers({
 viewCategory, user, cart
});
export default rootReducer;