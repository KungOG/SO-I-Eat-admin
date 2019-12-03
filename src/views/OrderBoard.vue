<template>
  <div class='order-board'>
    <Navigation />
    <div class='content'>
      <div class='drink-content'>
        <DrinkCard v-for="(order, i) in drinkOrders" :key="`drink-orders-${i}`" :order="order"/>
      </div>
      <div class="food1">
        <FoodCard v-for="(order, i) in foodOrders.array1" :key="`food-orders-array1-${i}`" :order="order" />
      </div>
      <div class="food2">
        <FoodCard v-for="(order, i) in foodOrders.array2" :key="`food-orders-array2-${i}`" :order="order" />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/NavigationBar.vue';
import FoodCard from '@/components/Order/FoodCard.vue';
import DrinkCard from '@/components/Order/DrinkCard.vue';

export default {
  name: 'orderboard',
  beforeMount() {
    this.$store.dispatch('getOrders');
  },
  components: {
    Navigation,
    DrinkCard,
    FoodCard,
  },
  computed: {
    drinkOrders() {
      var orders = this.$store.state.orders.map(x => x);
      var drinks = orders.filter(x => x.orderInformation.drinkItems.length !== 0);
      return drinks;
    },
    foodOrders() {
      var originalArray = this.$store.state.orders.map(x => x);
      var orders = this.$store.state.orders;
      var arrays = {array1: [], array2: []}

      for(let i=0; i < orders.length; i++) {
        originalArray.length % 2 === 0 ? arrays.array2.push(originalArray.shift()) : arrays.array1.push(originalArray.shift())
      }
      return arrays
    },
  },
};
</script>


