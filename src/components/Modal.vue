<template>
  <main class='modal'>
    <section>
      <h5>Sätt dagens öppettider</h5>
    </section>  
    <section class='time-section'>
      <div class='open-business'>
        <h3>Starttid</h3>
        <select v-model="selectedOpenHour">
          <option :value="hour" v-for="hour in openHours" :key="`open-hour-${hour}`">
            {{hour}}
          </option>
        </select>
      </div>
      <div class='closed-business'>
        <h3>Stoptid</h3>
        <select v-model="selectedCloseHour">
          <option :value="hour" v-for="hour in closeHours" :key="`close-hour-${hour}`">
            {{hour}}
          </option>
        </select>
      </div>
    </section>
    <section class='modal-button'>
       <DarkButton :buttonText="'OK'" @click.native="openRestaurant" />
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import DarkButton from './DarkButton.vue';

export default {
  name: 'modal',
  created() {
    this.getBusinessHours();
    this.getBusinessStatus();
  },
  components: {
    DarkButton,
  },
  data: () => ({
    openHours: [
      '08.00',
      '09.00',
      '10.00',
      '11.00',
      '12.00',
      '13.00',
      '14.00',
      '15.00',
      '16.00',
      '17.00',
      '18.00',
      '19.00',
      '20.00',
      '21.00',
      '22.00',
      '23.00'
    ],
    selectedOpenHour: '11.00',
    selectedCloseHour: '20.00',
    id: null,
    statusId: null,
  }),
  computed: {
    closeHours() {
      return this.openHours.map(x => x).filter(x => x > this.selectedOpenHour);
    },
  },
  methods: {
    openRestaurant() {
      this.updateBusinessHours();
      this.updateStatus();
      this.$emit('closeModal');
    },
    updateBusinessHours() {
      this.$store.dispatch('updateBusinessHours', {_id: this.id, closed: this.selectedCloseHour, open: this.selectedOpenHour});
    },
    updateStatus() {
      this.$store.dispatch('updateStatus', {status: 'open', _id: this.statusId});
    },
    getBusinessHours() {
      const url = 'https://so-i-eat-server.herokuapp.com/businessHours';
      axios
        .get(url)
        .then((response) => {
          this.id = response.data[0]._id;
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
}
</script>