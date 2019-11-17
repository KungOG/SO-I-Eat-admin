<template>
  <div class='drink-order'>
    <div class='drink-header'>
      <h2>12</h2>
      <span>{{order.orderInformation.time}}</span>
    </div>
    <DrinkInformation v-for="(drinkItem, i) in order.orderInformation.drinkItems" :key="`drink-items-${i}`" :drinkItem="drinkItem" :orderNumber="order.code"/>
  </div>
</template>

<script>
import DrinkInformation from '@/components/Order/DrinkInformation.vue';
export default {
  components: {
    DrinkInformation,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>
