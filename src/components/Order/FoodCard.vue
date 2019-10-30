<template>
  <div class='food-order'>
    <div class='food-header'>
      <div class='filler' />
      <h2>Bord: {{order.table}}</h2>
      <span>{{order.time}}</span>
    </div>
    <FoodInformation 
      v-for="(order, i) in order.items" 
      :key="i" 
      :items="order" 
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
