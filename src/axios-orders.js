import Axios from 'axios';

export const axiosOrders = Axios.create({
  baseURL: 'https://burger-builder-c0b6c-default-rtdb.firebaseio.com/',
});
