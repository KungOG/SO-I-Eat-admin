<template>
  <div class='order-board'>
    <Navigation />
    <div class='content'>
      <div class='drink-content'>
        <DrinkCard />
      </div>
      <div class="food1">
        <FoodCard v-for="(order, i) in orders.array1" :key="`orders-array1-${i}`" :order="order" />
      </div>
      <div class="food2">
        <FoodCard v-for="(order, i) in orders.array2" :key="`orders-array2-${i}`" :order="order" />
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

  components: {
    Navigation,
    DrinkCard,
    FoodCard,
  },
  computed: {
    orders() {
      var originalArray = this.$store.state.orders.map(x => x);
      var orders = this.$store.state.orders;
      var arrays = {array1: [], array2: []}

      for(let i=0; i < originalArray.length; i++) {
        orders.length % 2 == 0 ? arrays.array2.push(orders.shift()) : arrays.array1.push(orders.shift())
      }
      return arrays
    }
  },
  methods: {
    sortOrders() {
      console.log(this.orders);
    }
  }
};
</script>


