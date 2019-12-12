<template>
  <div class='set-time'>
    <div class='set-time-button-wrapper'>
      <DarkButton class='set-time-open-button' :buttonText="buttonText" @click.native="(status='open')" :class="status === 'open' ? 'active' : ''"/>
      <div class='open-business'>
        <h3>ÖPPNAR</h3>
        <span> {{selectedOpenHour}} </span>
      </div>
    </div>
    <div class='set-time-button-wrapper'>
      <DarkButton class='set-time-close-button' :buttonText="'Stäng'" @click.native="(status='closed')" :class="status === 'closed' ? 'active' : ''"/>
      <div class='closed-business'>
        <h3>STÄNGER</h3>
        <span> {{selectedCloseHour}} </span>
     </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import DarkButton from './DarkButton.vue';

export default {
  name: 'settime',
  components: {
    DarkButton,
  },
  data: () => ({
    selectedOpenHour: null,
    selectedCloseHour: null,
    status: null,
    statusId: null,
    open: false,
    buttonText: 'Öppna'
  }),
  computed: {
    closeHours() {
      return this.openHours.map(x => x).filter(x => x > this.selectedOpenHour);
    },
  },
  created() {
    this.getBusinessHours();
    this.getBusinessStatus();
  },

  watch: {
    status() {
      this.updateStatus();
    }
  },
  methods: {
    getBusinessHours() {
      const url = 'https://so-i-eat-server.herokuapp.com/businessHours';
      axios
        .get(url)
        .then((response) => {
          this.selectedOpenHour = response.data[0].open;
          this.selectedCloseHour = response.data[0].closed;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBusinessStatus() {
      const url = 'https://so-i-eat-server.herokuapp.com/statuses';
      axios
        .get(url)
        .then((response) => {
          this.statusId = response.data[0]._id;
          this.status = response.data[0].status;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateStatus() {
      this.$store.dispatch('updateStatus', {status: this.status, _id: this.statusId});
    },
  },
};
</script>
