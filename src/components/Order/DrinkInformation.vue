<template>
  <div class='drink-information'>
    <div class='content'>
      <h3>{{orderNumber}}</h3>
      <h3>{{drinkItem.productName}}</h3>
      <span>Stor</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    drinkItem: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
    }
  },
};
</script>
