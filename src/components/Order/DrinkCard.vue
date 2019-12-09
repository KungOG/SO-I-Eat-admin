<template>
  <div class='drink-order'>
    <div class='drink-header'>
      <h2 v-if="order[1][0].orderInformation.table !== 'take away'">Bord: {{order[1][0].orderInformation.table}}</h2>
      <h2 v-else>{{order[1][0].orderInformation.table}}</h2>
      <span>{{time}}</span>
    </div>
    <div v-for="(drinkItem, i) in order[1]" :key="`drink-items-${i}`">
      <DrinkInformation
      v-for="(item, i) in drinkItem.orderInformation.drinkItems"
      :key="`drink-items-${i}`"
      :index="i"
      :id="drinkItem._id"
      :drinkItem="item"
      :orderNumber="drinkItem.code"
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
      var d = new Date(this.order[1][0].date);
      return d.getHours().toString()+':'+d.getMinutes().toString();
    }
  },
};
</script>
