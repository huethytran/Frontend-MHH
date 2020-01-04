import { types } from '../core/constants';

const initialState = {
  viewCategory: null,
  listCategories: [
  { name: "Áo", amount: 3},
  { name: "Đầm", amount: 3},
  { name: "Váy", amount: 3},
  { name: "Quần", amount: 2},
{ name: "Jumpsuit", amount: 1},
{ name: "Túi xách", amount: 0}]
};
export default function viewCategory(state = initialState, action) {
  switch (action.type) {
    case types.SET_LIST_CATEGORIES: {
      return{
        ...state, listCategories: action.listCategories
      };
    }
    default:
      return state;
  }
}