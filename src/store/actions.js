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
  getCategories(ctx) {
    const url = 'https://so-i-eat-server.herokuapp.com/categories';
    axios
      .get(url)
      .then((response) => {
        ctx.commit('setCategories', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async updateBusinessHours(ctx, businessHours) {
    await axios.patch('https://so-i-eat-server.herokuapp.com/businessHours', businessHours);
  },
  async updateStatus(ctx, status) {
    console.log(status)
    await axios.patch('https://so-i-eat-server.herokuapp.com/statuses', status);
  },
  async createProduct(ctx, newProduct) {
    await axios.post('https://so-i-eat-server.herokuapp.com/products', newProduct);
  },
  async updateProduct(ctx, newProduct) {
    await axios.patch('https://so-i-eat-server.herokuapp.com/products', newProduct);
  },
  async updateActiveProduct(ctx, active) {
    await axios.patch('https://so-i-eat-server.herokuapp.com/products', active);
  },
  async updateProductionTime(ctx, productionTime) {
    await axios.patch('https://so-i-eat-server.herokuapp.com/productionTime', productionTime);
  },
  async setOrderItemStatus(ctx, orderStatus) {
    await axios.patch('https://so-i-eat-server.herokuapp.com/orders', orderStatus);
  },
  async removeProduct(ctx, newProduct) {
    await axios.delete(`https://so-i-eat-server.herokuapp.com/products/${newProduct}`);
  },
};
