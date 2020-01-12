<template>
  <div class='food-order'>
    <div class='food-header'>
      <div class='filler' />
      <span class='comment'
      @click="showComment"
      v-if="order[1][0].comment !== null"
      >Kommentar</span>
      <h2 v-if="order[1][0].orderInformation.table !== 'take away'">
        Bord: {{order[1][0].orderInformation.table}}
      </h2>
      <h2 v-else>{{order[1][0].orderInformation.table}}</h2>
      <span class='time'>{{time}}</span>
    </div>
    <div v-for="(orderItem, i) in order[1]"  :key="i">
      <FoodInformation
        v-for="(item, i) in orderItem.orderInformation.foodItems"
        :key="i"
        :index="i"
        :items="item"
        :orderNumber="orderItem.code"
        :id="orderItem._id"
        :status="item.status"
        :table="order"
        :orderStatus="orderItem.status"
      />
     </div>
     <div
     class='comment-modal'
     v-if="showComment">
      <div class='modal-content'>
        <span>Ordernummer: {{}}</span>
        <span></span>
      </div>
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
      const date = new Date(this.order[1][0].date);
      const localTime = date.toLocaleTimeString().slice(0, 5);
      return localTime;
    },
    showCommentModal() {
      return this.$store.state.showComment;
    },
  },
  methods: {
    showComment() {
      this.$store.commit('setShowComment', true);
    },
  },
};
</script>
