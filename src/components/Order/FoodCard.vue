<template>
  <div class='food-order'>
    <div class='food-header'>
      <div class='filler' />
      <span class='comment'
        @click="toggleCommentModal"
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
      <div
        class="filler"
        @click="toggleCommentModal"
      />
      <div class='modal-content'>
        <img
          class='close-down-cross'
          :src="whiteCross"
          alt="Cancel icon"
        />
        <div
          class='modal-content-wrapper'
        >
        <div class='modal-text'>
          <span>ORDERNUMBER:</span>
          <p>{{order[1][0].code}}</p>
        </div>
        <div class='modal-text'>
          <span>KOMMENTAR:</span>
          <p>{{order[1][0].comment}}</p>
        </div>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
import FoodInformation from '@/components/Order/FoodInformation.vue';
import WhiteCross from '@/assets/icons/WhiteCross.svg';

export default {
  props: {
    order: {
      required: true,
    },
  },
  data: () => ({
    whiteCross: WhiteCross,
    showComment: false,
  }),
  components: {
    FoodInformation,
    WhiteCross,
  },
  computed: {
    time() {
      const date = new Date(this.order[1][0].date);
      const localTime = date.toLocaleTimeString().slice(0, 5);
      return localTime;
    },
  },
  methods: {
    toggleCommentModal() {
      this.showComment = !this.showComment;
    },
  },
};
</script>
