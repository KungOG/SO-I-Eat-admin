<template>
  <div class='food-order'>
    <div class='food-header'>
      <div class='filler' />
      <h2>Bord 12</h2>
      <span>13.37</span>
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
