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
    <OrderModal v-if="showModal"/>
  </div>
</template>

<script>
import Navigation from '@/components/NavigationBar.vue';
import FoodCard from '@/components/Order/FoodCard.vue';
import DrinkCard from '@/components/Order/DrinkCard.vue';
import OrderModal from '@/components/OrderModal.vue';

export default {
  name: 'orderboard',
  beforeMount() {
    setInterval(() => {
      this.$store.dispatch('getOrders');
    }, 5000);
  },
  components: {
    Navigation,
    DrinkCard,
    FoodCard,
    OrderModal,
  },
  computed: {
    showModal() {
      return this.$store.state.showModal;
    },
    drinkOrders() {
      let foodItems =  this.$store.getters.foodItems.map(x => x);
      foodItems.sort(function(a, b) {
        if (a[1][0].date < b[1][0].date) return -1;
        if (a[1][0].date > b[1][0].date) return 1; 
        return 0;  
      })
      var arrayy = [];
      foodItems.forEach((x) => {
        x[1][0].orderInformation.drinkItems.length !== 0 ? arrayy.push(x) : ''
      });
      return arrayy;
    },
    foodOrders() {
      let foodItems =  this.$store.getters.foodItems.map(x => x);
      let count =  this.$store.getters.foodItems;
      var arrays = {array1: [], array2: []}
      foodItems.sort(function(a, b) {
        if (a[1][0].date < b[1][0].date) return -1;
        if (a[1][0].date > b[1][0].date) return 1; 
        return 0;  
    })
      for(let i=0; i < count.length; i++) {
        foodItems.length !== 0 ? arrays.array1.push(foodItems.shift()) : '';
        foodItems.length !== 0 ? arrays.array2.push(foodItems.shift()) : '';
      }
      return arrays
    },
  },
};
</script>
