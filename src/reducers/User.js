import { types } from '../core/constants';

const initialState = {
  fullName: null,
  avatar: null,
  role: null,
  address: {
      address: null,
      district: null,
      province: null
  },
  username: null,
  phoneNumber: null,
  dateOfBirth: null,
  email: null
};
export default function user(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN: {
      return{...state,
        fullName: action.data.fullName,
        username: action.data.username,
        avatar: action.data.avatar,
        role: action.data.userRole
      };
    }
    case types.LOGOUT: {
        return{
            fullName: null,
            avatar: null,
            role: null,
            address: {
                address: null,
                district: null,
                province: null
            },
            phoneNumber: null,
            dateOfBirth: null,
            email: null
          };
    }
    case types.SET_USER: {
        return {
            ...state, 
            address: {
                address: action.data.address.address,
                district: action.data.address.district,
                province: action.data.address.province
            },
            phoneNumber: action.data.phoneNumber,
            dateOfBirth: action.data.dateOfBirth === null ||  action.data.dateOfBirth === undefined? null: action.data.dateOfBirth,
            email: action.data.email,
            fullName: action.data.fullName,
        username: action.data.username,
        }
    }
    case types.UPDATE_USER:{
      return {
        ...state,
        fullName: action.data.fullName,
  address: {
    address: action.data.address.address,
    district: action.data.address.district,
    province: action.data.address.province
  },
  phoneNumber: action.data.phoneNumber,
            dateOfBirth: action.data.dateOfBirth === null ||  action.data.dateOfBirth === undefined? null: new Date(action.data.dateOfBirth),
            email: action.data.email
      }
    }
    case types.UPDATE_AVATAR:{
      return {
        ...state, avatar: action.data
      }
    }
    default:
      return state;
  }
}