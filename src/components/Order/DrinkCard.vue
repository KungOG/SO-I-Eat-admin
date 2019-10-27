<template>
  <div class='drink-order'>
    <div class='drink-header'>
      <h3>12</h3>
      <h4>13.37</h4>
    </div>
    <DrinkInformation />
  </div>
</template>

<script>
import DrinkInformation from '@/components/Order/DrinkInformation.vue';
export default {
  components: {
    DrinkInformation,
  }
};
</script>
