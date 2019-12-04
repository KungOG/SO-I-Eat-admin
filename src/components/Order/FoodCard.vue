<template>
  <div class='food-order'>
    <div class='food-header'>
      <div class='filler' />
      <h2 v-if="order[1][0].orderInformation.table !== 'take away'">Bord: {{order[1][0].orderInformation.table}}</h2>
      <h2 v-else>{{order[1][0].orderInformation.table}}</h2>
      <span>{{time}}</span>
    </div>
    <div v-for="(orderItem, i) in order[1]"  :key="i">
      <FoodInformation 
        v-for="(item, i) in orderItem.orderInformation.foodItems" 
        :key="i" 
        :items="item" 
        :orderNumber="orderItem.code"
        :id="orderItem._id"
        :status="orderItem.status"
      />
     </div>
  </div>
</template>

<script>
import FoodInformation from '@/components/Order/FoodInformation.vue';

export default {
  props: {
    order: {
      required: true,
    },
  },

  components: {
    FoodInformation,
  },
  computed: {
    time() {
      var d = new Date(this.order[1][0].date);
      return d.getHours().toString()+':'+d.getMinutes().toString();
    }
  }
};
</script>
