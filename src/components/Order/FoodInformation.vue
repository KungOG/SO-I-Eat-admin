<template>
  <div class='food-information'  @click="click">
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
    click() {
      this.itemStatus < 2 ? this.itemStatus++ : this.itemStatus = 0
      this.$store.dispatch('setOrderItemStatus', {status: this.itemStatus, _id: this.id})
    }
  }
};
</script>
