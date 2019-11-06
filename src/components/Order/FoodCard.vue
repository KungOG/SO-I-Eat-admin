<template>
  <div class='food-order'>
    <div class='food-header'>
      <div class='filler' />
      <h2>Bord: {{order.table}}</h2>
      <span>{{order.orderInformation.time}}</span>
    </div>
    <FoodInformation 
      v-for="(orderItem, i) in order.orderInformation.items" 
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
