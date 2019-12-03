<template>
  <div class='food-order'>
    <div class='food-header'>
      <div class='filler' />
      <h2>Bord: {{order.orderInformation.table}}</h2>
      <span>{{order.date}}</span>
    </div>
    <FoodInformation 
      v-for="(orderItem, i) in order.orderInformation.foodItems" 
      :key="i" 
      :items="orderItem" 
      :orderNumber="order.code"
     />
  </div>
</template>

<script>
import FoodInformation from '@/components/Order/FoodInformation.vue';

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  components: {
    FoodInformation,
  }
};
</script>
