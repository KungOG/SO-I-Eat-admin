<template>
  <div class='drink-order'>
    <div class='drink-header'>
      <div class='filler' />
      <h2 v-if="order[1][0].orderInformation.table !== 'take away'">Bord: {{order[1][0].orderInformation.table}}</h2>
      <h2 v-else>{{order[1][0].orderInformation.table}}</h2>
      <span class='drink-time'>{{time}}</span>
    </div>
    <div v-for="(drinkItem, i) in order[1]" :key="`drink-items-${i}`">
      <DrinkInformation
      v-for="(item, i) in drinkItem.orderInformation.drinkItems"
      :key="`drink-items-${i}`"
      :index="i"
      :id="drinkItem._id"
      :drinkItem="item"
      :table="order"
      :status="item.status"
      :orderNumber="drinkItem.code"
      :orderStatus="drinkItem.status"
      />
    </div>
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
      required: true,
    },
  },
  computed: {
    time() {
      const date = new Date(this.order[1][0].date);
      const localTime = date.toLocaleTimeString().slice(0, 5);
      return localTime;
    },
  },
};
</script>
