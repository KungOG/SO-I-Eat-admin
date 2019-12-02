<template>
  <div class='set-time'>
    <div>
      <DarkButton :buttonText="'Öppen'" @click.native="(status='open')" :class="status === 'open' ? 'active' : ''"/>
      <DarkButton :buttonText="'Stängd'" @click.native="(status='closed')" :class="status === 'closed' ? 'active' : ''"/>
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
    selectedOpenHour: null,
    selectedCloseHour: null,
    id: null,
    status: null,
    statusId: null,

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
  mounted() {
    setInterval(() => { 
      this.getBusinessHours();
      this.checkCurrentTime();
    }, 10000);
  },
  watch: {
    selectedOpenHour() {
      this.updateBusinessHours();
    },
    selectedCloseHour() {
      this.updateBusinessHours();
    },
    status() {
      this.updateStatus();
    }
  },
  methods: {
    updateBusinessHours() {
      this.$store.dispatch('updateBusinessHours', {_id: this.id, closed: this.selectedCloseHour, open: this.selectedOpenHour});
    },
    getBusinessHours() {
      const url = 'https://so-i-eat-server.herokuapp.com/businessHours';
      axios
        .get(url)
        .then((response) => {
          this.selectedOpenHour = response.data[0].open;
          this.selectedCloseHour = response.data[0].closed;
          this.id = response.data[0]._id;
          console.log('hej')
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
    checkCurrentTime() {
      const d = new Date();
      let currentTime = Number(d.getHours() + '.' + d.getMinutes());
      console.log(currentTime, Number(this.selectedOpenHour) )
      currentTime > Number(this.selectedOpenHour) && currentTime < Number(this.selectedCloseHour) ? console.log('open') : console.log('closed')
    },
  },
};
</script>

kolla av öppettider i loop - om temp tid finns + det är samma datum, gå efter den
om inte, ta bort temp datum och gå efter ordinarie datum

klick på stängd eller öppet - sätt datum och temp tid
