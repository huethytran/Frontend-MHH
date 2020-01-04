import { types } from '../core/constants';

const initialState = {
  cart: []
};
export default function cart(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CART: {
      return{
        cart: [...state.cart, action.cart]
      };
    }
    case types.REMOVE_CART:{
        var temp =  state.cart.splice(action.data, 1);
        return {
            cart: state.cart
        }
    }
    case types.DELETE_CART:{
        return {
            cart: []
        }
    }
    default:
      return state;
  }
}