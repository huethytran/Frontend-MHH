import { types } from '../core/constants.js';
import * as callApi from '../utils/apiCaller';

export const setListCategories = (listCategories) => ({
  type: types.SET_LIST_CATEGORIES,
  listCategories
})
export const login = (data)=>({
  type: types.LOGIN,
  data
})
export const setUser=(data)=>({
  type: types.SET_USER,
  data
})
export const getUser = ()=>{
  return dispatch => {
    return callApi
      .callApiGetUser()
      .then(data => {
        if (data.data.status !== "ERROR") {
          var data1 = {
            phoneNumber: data.data.data.phoneNumber,
            dateOfBirth: data.data.data.dateOfBirth,
            email: data.data.data.email,
            address: {
              address: data.data.data.address.address,
              district: data.data.data.address.district,
              province: data.data.data.address.province,
            },
            username: data.data.data.username,
            fullName: data.data.data.fullName
          }
          console.log(data1, "hiiii")
          dispatch(setUser(data1))
          }
          else localStorage.removeItem("usertoken");
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export const updateUser = (data)=>({
  type: types.UPDATE_USER,
  data
})
export const updateAvatar = (data)=>({
  type: types.UPDATE_AVATAR,
  data
})
export const addCart = (cart)=>({
  type: types.ADD_CART,
  cart
})
export const deleteCart = ()=>({
  type: types.DELETE_CART
})