import axios from 'axios';
import { api_url } from '../core/constants';

export function callApiGetProducts(temp) {
  return axios({
    method: 'GET',
    mode: "cors",
    url: `${api_url}/products?limit=8&offset=0&q={"actionFilter":"${temp}"}`
  });
}
export function callApiGetListProducts( filter, category) {
  return axios({
    method: 'GET',
    mode: "cors",
    url: `${api_url}/products?limit=0&offset=0&q={"actionFilter":"${filter}", "categoryName": "${category}"}`
  });
}
export function callApiGetProduct(temp) {
  return axios({
    method: 'GET',
    mode: "cors",
    url: `https://cors-anywhere.herokuapp.com/${api_url}/products/find-one?id=${temp}`
  });
}
export function callApiGetSameCategoryProducts(temp) {
  return axios({
    method: 'GET',
    mode: "cors",
    url: `https://cors-anywhere.herokuapp.com/${api_url}/products?limit=4&offset=0&q={"categoryName":"${temp}"}`
  });
}
export function callApiRegister(data){
  return axios({
    method: 'POST',
    mode: "cors",
    data: data,
    url: `https://cors-anywhere.herokuapp.com/${api_url}/user`
  })
}
export function callApiLogin(body) {
  console.log("aaaa", body)
  return axios({
    method: 'POST',
    mode: "cors",
    data: body,
    url: `https://cors-anywhere.herokuapp.com/${api_url}/user/login`
  });
}
export function callApiGetUser() {
  return axios({
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('usertoken')}`
    },
    data: {username: null, password: null},
    url: `https://cors-anywhere.herokuapp.com/${api_url}/user/login`
  });
}
export function callApiOrder(data) {
  return axios({
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('usertoken')}`
    },
    data: data,
    url: `https://cors-anywhere.herokuapp.com/${api_url}/order`
  });
}
export function callApiGetOrder(data) {console.log(data.status)
  return axios({
    method: 'GET',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('usertoken')}`
    },
    url: `https://cors-anywhere.herokuapp.com/${api_url}/order?q={"status":"${data.status}"}`
  });
}
export function callApiUpdateUser(data){
  return axios({
    method: 'PUT',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('usertoken')}`
    },
    data: data,
    url: `https://cors-anywhere.herokuapp.com/${api_url}/user`
  })
}