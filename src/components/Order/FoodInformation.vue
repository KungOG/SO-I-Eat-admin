<template>
  <div class='food-information'  @click="checkOpenModal">
    <div class='content'>
      <div class='color' :class="[(itemStatus === 1 ? 'yellow' : ''), (itemStatus === 2 ? 'green' : '')]"/>
      <div class='info'>
        <h3>{{orderNumber}}</h3>
        <h3>{{items.productName}}</h3>
        <span>{{items.protein}}</span>
      </div>
      <div class='added-items'>
        <span v-for="(item, j) in items.add" :key="j">{{item.name}}</span>
      </div>
      <div class='removed-items'>
        <span v-for="(item, k) in items.remove" :key="k">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data: () => ({
    itemStatus: 0,
  }),
  props: {
    orderNumber: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    table: {
      type: Array,
      required: true,
    },
    orderStatus: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.itemStatus = this.status;
  },
  watch: {
    status() {
      this.itemStatus = this.status;
    },
  },
  methods: {
    updateStatus() {
      this.itemStatus < 2 ? this.itemStatus++ : this.itemStatus = 0
      var orders = this.$store.state.orders.map(x => x)
      var order = orders.splice(orders.findIndex(x => x._id === this.id), 1)
      var newOrder = order[0].orderInformation.foodItems[this.index].status = this.itemStatus
      this.$store.dispatch('setOrderItemStatus', {orderInformation: order[0].orderInformation, _id: this.id})
      this.checkAllStatuses();
    },
    checkAllStatuses() {
      var orders = this.$store.state.orders.map(x => x)
      var order = orders.splice(orders.findIndex(x => x._id === this.id), 1)
      if(order[0].orderInformation.foodItems.map(x => x.status).every(x => x === 2)) {
        if(this.orderStatus === 0 || this.orderStatus === 1) {
          this.$store.dispatch('setOrderItemStatus', {status: this.orderStatus + 2, _id: this.id})
        }
      } else if(this.itemStatus === 0) {
        if(this.orderStatus === 3 || this.orderStatus === 2) {
          this.$store.dispatch('setOrderItemStatus', {status: this.orderStatus - 2, _id: this.id})
        }
      }
    },
    checkOpenModal() {
      if(this.status === 1) {
        var jjj = this.table[1].map(x => x.orderInformation.foodItems.map(k => k.status)).flat();
        var ddd = this.table[1].map(x => x.orderInformation.drinkItems.map(k => k.status)).flat();
        var id = this.table[1].map(x => x._id)
        this.$store.commit('setOrdersIdsToDeliver', id)
        var kkk = jjj.filter(x => x==2).length
        var ppp = ddd.filter(x => x==true).length
        if(jjj.length - kkk === 1 && ddd.length - ppp === 0) {
          if(jjj.includes(1)) {
            this.$store.commit('setOrdersIdsToDeliver', id)
            this.$store.commit('setShowModal', true)
          } else {
            this.updateStatus();
          }
        } else {
          this.updateStatus();
        }
      } else {
        this.updateStatus();
      }
    }
  }
};
</script>
