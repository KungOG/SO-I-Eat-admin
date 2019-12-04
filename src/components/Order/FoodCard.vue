<template>
  <div class='food-order'>
    <div class='food-header'>
      <div class='filler' />
      <h2>Bord: {{order[0]}}</h2>
      <span>tid</span>
    </div>
    <div v-for="(orderItem, i) in order[1]"  :key="i">
      <FoodInformation 
        v-for="(item, i) in orderItem.orderInformation.foodItems" 
        :key="i" 
        :items="item" 
        :orderNumber="orderItem.code"
      />
     </div>
  </div>
</template>

<script>
import FoodInformation from '@/components/Order/FoodInformation.vue';

export default {
  props: {
    order: {
      required: true,
    },
  },

  components: {
    FoodInformation,
  }
};
</script>
