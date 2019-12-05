export default {
foodItems(state) {
  var orders = state.orders.map(x => x);
    var groupedOrders = Object.entries(orders.reduce(function (acc, obj) {
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
    }, {}));

    for (let i = 0; i < groupedOrders.length; i++) {
      if(groupedOrders[i][0] === 'take away') {
        groupedOrders.splice(groupedOrders.indexOf(groupedOrders[i]),1)
      }
    } 
    return groupedOrders
  },
};
