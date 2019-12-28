<template>
  <div class='navigation'>
    <div class='logo-dropdown' :class="showHamburger === true ? '-active' : ''">
      <div v-if="burgerText" class='dropdown-links'>
        <router-link to="/edit">redigera</router-link>
        <router-link to="/orderboard">ordrar</router-link>
        <router-link to="/archive">arkiv</router-link>
        <span @click="logout">logga ut</span>
      </div>
    </div>
    <div v-if="showHamburger" :class="showHamburger === true ? '-activeBackground' : ''" @click="activateHamburger" />
    <div class='logo'>
      <img :src='Icon' alt='Icon logo' @click="activateHamburger" />
    </div>
    <div class='nav-orders' v-if="$route.path == '/orderboard'">
      <img :src='Orders' alt="This is icon for orders" />
      <p>{{numberOfOrders}}</p>
    </div>
    <div class='time-buttons' v-if="$route.path == '/orderboard'">
      <img :src='Timer' alt="This is icon for timer" />
      <LightButton 
        v-for="buttonText in buttonTexts" 
        :key="buttonText" 
        :buttonText="buttonText" 
        :chosenValue="productionTime"
        @click.native="updateProductionTime(buttonText) "/>
    </div>
    <div v-if="$route.path == '/edit'">
      <LightButton 
        class="edit-btn"
        buttonText="förrätt"
        :chosenValue="categoryToEdit"
        @click.native="setCategoryToEdit('förrätt')"
      />
      <LightButton 
        class="edit-btn"
        buttonText="huvudrätt"
        :chosenValue="categoryToEdit"
        @click.native="setCategoryToEdit('huvudrätt')"
      />
      <LightButton 
        class="edit-btn"
        buttonText="efterrätt"
        :chosenValue="categoryToEdit"
        @click.native="setCategoryToEdit('efterrätt')"
      />
      <LightButton
        class="edit-btn"
        buttonText="dryck"
        :chosenValue="categoryToEdit"
        @click.native="setCategoryToEdit('dryck')"
      />
    </div>
    <div class='current-time'>
      <p>{{time}}</p>
    </div>
  </div>
</template>

<script>
import Orders from '@/assets/icons/Menu.svg';
import Timer from '@/assets/icons/Clock.svg';
import Icon from '@/assets/icons/FullLogo.svg';
import LightButton from '@/components/LightButton.vue';
import axios from 'axios';

export default {
  name: 'navigationbar',
  components: {
    Orders,
    Timer,
    Icon,
    LightButton,
  },
  data () {
    return {
      Orders: Orders,
      Timer: Timer,
      Icon: Icon,
      buttonTexts: ['10', '15', '20', '30', '45'],
      time: '',
      productionTime: '',
      productionTimeId: null,
      categoryToEdit: 'förrätt',
      showHamburger: false,
      burgerText: false,
    }
  },
  computed: {
    numberOfOrders() {
      return this.$store.getters.foodItems.length;
    },
  },
  mounted() {
    var timerID = setInterval(this.updateTime, 1000);
    this.getProductionTime();
  },
  methods: {
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
    activateHamburger() {
      this.showHamburger = !this.showHamburger;
      setTimeout(() => {
        this.burgerText = !this.burgerText
      }, 100);
    },
    async updateProductionTime(time) {
      this.productionTime = time;
      await this.$store.dispatch('updateProductionTime', {time: time, _id: this.productionTimeId});
      this.getProductionTime();
    },
    setCategoryToEdit(cat) {
      this.categoryToEdit = cat;
      this.$emit('setActiveCategoryToEdit', cat);
    },
    updateTime() {
      var cd = new Date();
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2);
    },
    zeroPadding(num, digit) {
      var zero = '';
      for(var i = 0; i < digit; i++) {
          zero += '0';
      }
      return (zero + num).slice(-digit);
    },
    getProductionTime(ctx) {
      const url = 'https://so-i-eat-server.herokuapp.com/deliveryTimes';
      axios
        .get(url)
        .then((response) => {
          this.productionTimeId = response.data[0]._id;
          this.productionTime = response.data[0].time;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
};
</script>
