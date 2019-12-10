<template>
  <div class='drink-information' @click="checkOpenModal">
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
    orderStatus: {
      type: Number,
      required: true,
    },
    table: {
      type: Array,
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
      this.checkAllStatuses();
    },
    checkAllStatuses() {
      var orders = this.$store.state.orders.map(x => x)
      var order = orders.splice(orders.findIndex(x => x._id === this.id), 1)
      if(order[0].orderInformation.drinkItems.map(x => x.status).every(x => x === true)) {
        this.$store.dispatch('setOrderItemStatus', {status: this.orderStatus + 1, _id: this.id})
      } 
    },
    checkOpenModal() {
      var mat = this.table[1].map(x => x.orderInformation.foodItems).map(k => k[0].status)
      var dryck = this.table[1].map(x => x.orderInformation.drinkItems).map(k => k[0].status)
      var matAntalKlara = mat.filter(x => x==2).length
      var dryckAntalKlara = dryck.filter(x => x==true).length
        console.log('Dryck -->',dryckAntalKlara)
        console.log(dryck.length)
        console.log('mat -->', matAntalKlara)
      if(mat.length - matAntalKlara === 0 && dryck.length - dryckAntalKlara === 1) {
        console.log('ok')
        if(dryck.includes(false)) {
          this.$store.commit('setShowModal', true);
        } else {
          this.updateStatus();
        }
      } else {
        console.log('update')
        this.updateStatus();
      }
    }
  }
};
</script>
