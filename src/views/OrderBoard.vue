<template>
  <div class="order-board">
    <Navigation :prevRoute="prevRoute"/>
    <div class="content">
      <div class="drink-content">
        <DrinkCard v-for="(order, i) in drinkOrders" :key="`drink-orders-${i}`" :order="order" />
      </div>
      <div class="food1">
        <FoodCard
          v-for="(order, i) in foodOrders.array1"
          :key="`food-orders-array1-${i}`"
          :order="order"
        />
      </div>
      <div class="food2">
        <FoodCard
          v-for="(order, i) in foodOrders.array2"
          :key="`food-orders-array2-${i}`"
          :order="order"
        />
      </div>
    </div>
    <OrderModal v-if="showOrderModal" />
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import Navigation from "@/components/NavigationBar.vue";
// eslint-disable-next-line import/no-unresolved
import FoodCard from "@/components/Order/FoodCard.vue";
// eslint-disable-next-line import/no-unresolved
import DrinkCard from "@/components/Order/DrinkCard.vue";
// eslint-disable-next-line import/no-unresolved
import OrderModal from "@/components/OrderModal.vue";
// eslint-disable-next-line import/no-unresolved

export default {
  name: "orderboard",
  data: () => ({
    prevRoute: null,
  }),
  beforeMount() {
    setInterval(() => {
      this.$store.dispatch("getOrders");
    }, 5000);
  },
  components: {
    Navigation,
    DrinkCard,
    FoodCard,
    OrderModal
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
  },
  computed: {
    showOrderModal() {
      return this.$store.state.showModal;
    },
    drinkOrders() {
      const foodItems = this.$store.getters.foodItems.map(x => x);
      foodItems.sort((a, b) => {
        if (a[1][0].date < b[1][0].date) return -1;
        if (a[1][0].date > b[1][0].date) return 1;
        return 0;
      });
      const newArray = [];
      foodItems.forEach(x => {
        x[1][0].orderInformation.drinkItems.length !== 0
          ? newArray.push(x)
          : "";
      });
      return newArray;
    },
    foodOrders() {
      const foodItems = this.$store.getters.foodItems.map(x => x);
      const count = this.$store.getters.foodItems;
      const arrays = { array1: [], array2: [] };
      foodItems.sort((a, b) => {
        if (a[1][0].date < b[1][0].date) return -1;
        if (a[1][0].date > b[1][0].date) return 1;
        return 0;
      });
      for (let i = 0; i < count.length; i++) {
        foodItems.length !== 0 ? arrays.array1.push(foodItems.shift()) : "";
        foodItems.length !== 0 ? arrays.array2.push(foodItems.shift()) : "";
      }
      return arrays;
    }
  }
};
</script>
