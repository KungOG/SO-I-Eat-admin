export default {
foodItems(state) {
  var orders = state.orders.map(x => x);
    return orders.reduce(function (acc, obj) {
      var key = obj.orderInformation['table'];
      var code = obj['code'];
      if(key === 'take away') {
        acc[code] = [];
        acc[code].push(obj);
      } else if (!acc[key]) {
        acc[key] = [];
        acc[key].push(obj);
      }
      return acc;
    }, {});
  }
};
