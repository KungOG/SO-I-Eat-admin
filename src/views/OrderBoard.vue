<template>
  <div class='order-board'>
    <Navigation />
    <div class='content'>
      <div class='drink-content'>
        <DrinkCard />
      </div>
      <div class='food-content'>
        <FoodCard class="1" v-for="(order, i) in orders" :key="i" :order="order" />
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
    beforeMount () {
    this.$store.dispatch('getOrders');
  },
  components: {
    Navigation,
    DrinkCard,
    FoodCard,
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  },
  methods: {
    sortOrders() {
      console.log(this.orders);
    }
  }
};
</script>
