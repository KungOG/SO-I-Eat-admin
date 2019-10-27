<template>
  <div class='food-order'>
    <div class='food-header'>
      <div class='filler' />
      <h3>12</h3>
      <h4>13.37</h4>
    </div>
    <FoodInformation />
  </div>
</template>

<script>
import FoodInformation from '@/components/Order/FoodInformation.vue';
export default {
  components: {
    FoodInformation,
  }
};
</script>
