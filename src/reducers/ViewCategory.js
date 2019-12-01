import { types } from '../core/constants';

const initialState = {
  viewCategory: null,
  listCategories: [{ name: "Áo kiểu", amount: 10},
  { name: "Áo thun", amount: 9},
  { name: "Đầm", amount: 2},
  { name: "Váy", amount: 15},
  { name: "Quần", amount: 18}]
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