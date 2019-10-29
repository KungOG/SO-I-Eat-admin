<template>
  <div class='food-information'>
    <div class='content'>
      <div class='color' />
      <div class='info'>
        <!-- <h3>{{order.ordernumber}}</h3> -->
        <h3>{{items.name}}</h3>
        <span>{{items.protein}}</span>
      </div>
      <div class='added-items'>
        <span v-for="(item, j) in items.add" :key="j">{{item}}</span>
      </div>
      <div class='removed-items'>
        <span v-for="(item, k) in items.remove" :key="k">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
};
</script>
