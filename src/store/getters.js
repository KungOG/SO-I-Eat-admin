export default {
foodItems(state) {
  var orders = state.orders.map(x => x);
    return orders.reduce(function (acc, obj) {
      var key = obj.orderInformation['table'];
      var code = obj['code'];
      if(key === 'take away') {
        acc[code] = [];
        acc[code].push(obj);
      }
      if (!acc[key] || key === 'take away') {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  },
};
