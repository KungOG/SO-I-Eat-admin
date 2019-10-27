<template>
  <div class='drink-order'>
    <div class='drink-header'>
      <h2>12</h2>
      <span>13.37</span>
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
