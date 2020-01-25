import axios from "axios";

export default {
  getOrders(ctx) {
    const url = "https://so-i-eat-server.herokuapp.com/orders";
    const { token } = localStorage;
    axios
      .get(url, { headers: { authorization: `Bearer ${token}` } })
      .then(response => {
        ctx.commit("setOrders", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  getAllOrders(ctx) {
    const url = "https://so-i-eat-server.herokuapp.com/allOrders";
    let token = localStorage.token;
    axios
      .get(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then(response => {
        ctx.commit("setAllOrders", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  getAddons(ctx) {
    const url = "https://so-i-eat-server.herokuapp.com/addons";
    let token = localStorage.token;
    axios
      .get(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then(response => {
        ctx.commit("setAddons", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  getMenuItems(ctx) {
    const url = "https://so-i-eat-server.herokuapp.com/products";
    axios
      .get(url)
      .then(response => {
        ctx.commit("setMenuItems", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  getCategories(ctx) {
    const url = "https://so-i-eat-server.herokuapp.com/categories";
    axios
      .get(url)
      .then(response => {
        ctx.commit("setCategories", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async updateBusinessHours(ctx, businessHours) {
    const { token } = localStorage;
    await axios.patch("https://so-i-eat-server.herokuapp.com/businessHours", businessHours, {
      headers: { authorization: `Bearer ${token}` }
    });
  },
  async updateStatus(ctx, status) {
    const { token } = localStorage;
    await axios.patch("https://so-i-eat-server.herokuapp.com/statuses", status, {
      headers: { authorization: `Bearer ${token}` }
    });
  },
  async createProduct(ctx, newProduct) {
    const { token } = localStorage;
    await axios.post("https://so-i-eat-server.herokuapp.com/products", newProduct, {
      headers: { authorization: `Bearer ${token}` }
    });
    ctx.dispatch("getMenuItems");
  },
  async updateProduct(ctx, newProduct) {
    const { token } = localStorage;
    await axios.patch("https://so-i-eat-server.herokuapp.com/products", newProduct, {
      headers: { authorization: `Bearer ${token}` }
    });
    ctx.dispatch("getMenuItems");
  },
  async updateActiveProduct(ctx, active) {
    const { token } = localStorage;
    await axios.patch("https://so-i-eat-server.herokuapp.com/products", active, {
      headers: { authorization: `Bearer ${token}` }
    });
    ctx.dispatch("getMenuItems");
  },
  async updateProductionTime(ctx, productionTime) {
    const { token } = localStorage;
    await axios.patch("https://so-i-eat-server.herokuapp.com/deliveryTimes", productionTime, {
      headers: { authorization: `Bearer ${token}` }
    });
  },
  async setOrderItemStatus(ctx, orderStatus) {
    const { token } = localStorage;
    await axios.patch("https://so-i-eat-server.herokuapp.com/orders", orderStatus, {
      headers: { authorization: `Bearer ${token}` }
    });
  },
  async removeProduct(ctx, newProduct) {
    const { token } = localStorage;
    await axios.delete(`https://so-i-eat-server.herokuapp.com/products/${newProduct}`, {
      headers: { authorization: `Bearer ${token}` }
    });
    ctx.dispatch("getMenuItems");
  },
  deliverOrders(ctx) {
    const { token } = localStorage;
    const ids = this.state.orderIds;
    ids.forEach(x => {
      axios.patch(
        "https://so-i-eat-server.herokuapp.com/orders",
        { status: 4, _id: x },
        { headers: { authorization: `Bearer ${token}` } }
      );
    });
  }
};
