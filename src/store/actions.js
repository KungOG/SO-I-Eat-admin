import axios from 'axios'

export default {
   getOrders (ctx) {
    const url = 'http://localhost:80/orders';
      axios
    .get(url)
    .then(response => {
      ctx.commit('setOrders', response.data);
    })
    .catch(error => {
      console.log(error);
    })
  },
   getMenuItems (ctx) {
    const url = 'http://localhost:80/products';
      axios
    .get(url)
    .then(response => {
      ctx.commit('setMenuItems', response.data);
    })
    .catch(error => {
      console.log(error);
    })
  },
};
