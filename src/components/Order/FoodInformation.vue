<template>
  <div class='food-information'  @click="checkOpenModal">
    <div class='content'>
      <div class='color' :class="[(itemStatus === 1 ? 'yellow' : ''), (itemStatus === 2 ? 'green' : '')]"/>
      <div class='info'>
        <h3>{{orderNumber}}</h3>
        <h3 class='product-name'>{{items.productName}}</h3>
        <span v-if="items.protein === 'Shrimp'">Räkor</span>
        <span v-if="items.protein === 'Beef'" >Biff</span>
        <span v-if="items.protein === 'Chicken'">Kyckling</span>
        <span v-if="items.protein === 'Pork'">Fläsk</span>
        <span v-if="items.protein === 'Tofu'">Tofu</span>
      </div>
      <div class='added-items'>
        <span v-for="(item, j) in items.add" :key="j">{{item}}</span>
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
  computed: {
    order() {
      const orders = this.$store.state.orders.map(x => x);
      return orders.splice(orders.findIndex(x => x._id === this.id), 1);
    },
  },
  methods: {
    async updateStatus() {
      this.itemStatus < 2 ? this.itemStatus++ : this.itemStatus = 0;
      this.order[0].orderInformation.foodItems[this.index].status = this.itemStatus;
      await this.$store.dispatch('setOrderItemStatus', { orderInformation: this.order[0].orderInformation, _id: this.id });
      await this.$store.dispatch('getOrders');
      this.checkAllStatuses();
    },
    async checkAllStatuses() {
      if (this.order[0].orderInformation.foodItems.map(x => x.status).every(x => x === 2)) {
        if (this.orderStatus === 0 || this.orderStatus === 1) {
          await this.$store.dispatch('setOrderItemStatus', { status: this.orderStatus + 2, _id: this.id });
          await this.$store.dispatch('getOrders');
        }
      } else if (this.itemStatus === 0) {
        if (this.orderStatus === 3 || this.orderStatus === 2) {
          await this.$store.dispatch('setOrderItemStatus', { status: this.orderStatus - 2, _id: this.id });
          await this.$store.dispatch('getOrders');
        }
      }
    },
    checkOpenModal() {
      if (this.itemStatus === 1) {
        const mat = this.table[1].map(x => x.orderInformation.foodItems.map(k => k.status)).flat();
        const dryck = this.table[1].map(x => x.orderInformation.drinkItems.map(k => k.status)).flat();
        const id = this.table[1].map(x => x._id);
        this.$store.commit('setOrdersIdsToDeliver', id);
        const matAntalKlara = mat.filter(x => x === 2).length;
        const dryckAntalKlara = dryck.filter(x => x === true).length;
        if (mat.length - matAntalKlara === 1 && dryck.length - dryckAntalKlara === 0) {
          if (mat.includes(1)) {
            this.$store.commit('setOrdersIdsToDeliver', id);
            this.$store.commit('setShowModal', true);
          } else {
            this.updateStatus();
          }
        } else {
          this.updateStatus();
        }
      } else {
        this.updateStatus();
      }
    },
  },
};
</script>
