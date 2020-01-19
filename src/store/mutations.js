export default {
  setOrders(state, orders) {
    state.orders = orders;
  },
  setAllOrders(state, allOrders) {
    state.allOrders = allOrders;
  },
  setAddons(state, addons) {
    state.addons = addons;
  },
  setMenuItems(state, menuItems) {
    state.menuItems = menuItems;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setShowModal(state, boolean) {
    state.showModal = boolean;
  },
  setOrdersIdsToDeliver(state, id) {
    state.orderIds = id;
  },
  setShowComment(state, boolean) {
    state.showComment = boolean;
  },
};
