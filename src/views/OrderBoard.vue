<template>
  <div class='orderBoard'>
    <h1>Orderboard</h1>
  </div>
</template>

<script>
export default {
  name: 'orderboard',
    beforeMount () {
    this.$store.dispatch('getOrders');
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  }
};
</script>
