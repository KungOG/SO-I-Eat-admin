<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    this.$store.dispatch('getOrders');
  },
}
</script>


<style lang="scss">
@import '@/assets/css/app.scss';
</style>
