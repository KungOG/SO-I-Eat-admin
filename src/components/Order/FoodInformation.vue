<template>
  <div class='food-information'  @click="click">
    <div class='content'>
      <div class='color' :class="[(status === 1 ? 'yellow' : ''), (status === 2 ? 'green' : '')]"/>
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
    data: () => ({
    status: 0,
  }),
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  methods: {
    click() {
      this.status < 2 ? this.status++ : this.status = 0
      console.log(this.status)
    }
  }
};
</script>
