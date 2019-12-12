import axios from 'axios';

export default {
 
  
  getOrders(ctx) {
    const url = 'https://so-i-eat-server.herokuapp.com/orders';
    let token = localStorage.token;
    axios
      .get(url, {
        headers: { authorization: `Bearer ${token}` }})
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
    await axios.patch('https://so-i-eat-server.herokuapp.com/businessHours', businessHours, {
      headers: { authorization: `Bearer ${token}` }});
  },
  async updateStatus(ctx, status) {
    await axios.patch('https://so-i-eat-server.herokuapp.com/statuses', status, {
      headers: { authorization: `Bearer ${token}` }});
  },
  async createProduct(ctx, newProduct) {
    await axios.post('https://so-i-eat-server.herokuapp.com/products', newProduct, {
      headers: { authorization: `Bearer ${token}` }});
  },
  async updateProduct(ctx, newProduct) {
    await axios.patch('https://so-i-eat-server.herokuapp.com/products', newProduct, {
      headers: { authorization: `Bearer ${token}` }});
  },
  async updateActiveProduct(ctx, active) {
    await axios.patch('https://so-i-eat-server.herokuapp.com/products', active, {
      headers: { authorization: `Bearer ${token}` }});
  },
  async updateProductionTime(ctx, productionTime) {
    await axios.patch('https://so-i-eat-server.herokuapp.com/productionTime', productionTime, {
      headers: { authorization: `Bearer ${token}` }});
  },
  async setOrderItemStatus(ctx, orderStatus) {
    await axios.patch('https://so-i-eat-server.herokuapp.com/orders', orderStatus, {
      headers: { authorization: `Bearer ${token}` }});
  },
  async removeProduct(ctx, newProduct) {
    await axios.delete(`https://so-i-eat-server.herokuapp.com/products/${newProduct}`, {
      headers: { authorization: `Bearer ${token}` }});
  },
  deliverOrders(ctx) {
    var ids = this.state.orderIds;
    ids.forEach(x => {
      axios.patch(`https://so-i-eat-server.herokuapp.com/orders`, {status: 4, _id: x}, {
        headers: { authorization: `Bearer ${token}` }});
    });
  },
};
