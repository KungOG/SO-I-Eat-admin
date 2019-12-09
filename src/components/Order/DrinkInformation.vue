<template>
  <div class='drink-information' @click="updateStatus">
    <div class='content'>
      <h3>{{orderNumber}}</h3>
      <h3>{{drinkItem.productName}}</h3>
      <span>Stor</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    drinkItem: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    itemStatus: false,
  }),
  methods: {
    updateStatus() {
      this.itemStatus = !this.itemStatus;
      var orders = this.$store.state.orders.map(x => x)
      var order = orders.splice(orders.findIndex(x => x._id === this.id), 1)
      var newOrder = order[0].orderInformation.drinkItems[this.index].status = this.itemStatus
      this.$store.dispatch('setOrderItemStatus', {orderInformation: order[0].orderInformation, _id: this.id})
    }
  }
};
</script>
