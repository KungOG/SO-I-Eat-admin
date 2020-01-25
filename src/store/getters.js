export default {
  foodItems(state) {
    const orders = state.orders.map(x => x);
    const groupedOrders = Object.entries(orders.reduce((acc, obj) => {
      const key = obj.orderInformation.table;
      const { code } = obj;
      if (key === 'take away') {
        acc[code] = [];
        acc[code].push(obj);
      }
      if (!acc[key] || key === 'take away') {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {}));

    for (let i = 0; i < groupedOrders.length; i++) {
      if (groupedOrders[i][0] === 'take away') {
        groupedOrders.splice(groupedOrders.indexOf(groupedOrders[i]), 1);
      }
    }
    return groupedOrders;
  },
};
