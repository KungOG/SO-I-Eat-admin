import axios from 'axios';

export default {
  getOrders(ctx) {
    const url = 'https://so-i-eat-server.herokuapp.com/orders';
    axios
      .get(url)
      .then((response) => {
        ctx.commit('setOrders', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getMenuItems(ctx) {
    const url = 'https://so-i-eat-server.herokuapp.com/products';
    axios
      .get(url)
      .then((response) => {
        ctx.commit('setMenuItems', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async createProduct(ctx, newProduct) {
    await axios.post('https://so-i-eat-server.herokuapp.com/products', newProduct);
  },
  async updateProduct(ctx, newProduct) {
    console.log(newProduct);
    await axios.patch('https://so-i-eat-server.herokuapp.com/products', newProduct);
  },
};
