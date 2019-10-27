<template>
  <div class='navigation'>
    <div class='logo'>
      <img :src='Icon' alt='Icon logo' />
    </div>
    <div class='orders'>
      <img :src='Orders' alt="This is icon for orders" />
    </div>
    <div class='time-buttons'>
      <img :src='Timer' alt="This is icon for timer" />
      <LightButton 
        v-for="buttonText in buttonTexts" 
        :key="buttonText" 
        :buttonText="buttonText" 
        :productionTime="productionTime"
        @click.native="setProductionTime(buttonText) "/>
    </div>
    <div class='current-time'>
      <p>{{time}}</p>
    </div>
  </div>
</template>

<script>
import Orders from '@/assets/icons/Menu.svg';
import Timer from '@/assets/icons/Clock.svg';
import Icon from '@/assets/icons/Group.svg';
import LightButton from '@/components/LightButton.vue';

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

    }
  },
  mounted() {
    var timerID = setInterval(this.updateTime, 1000);
  },
  methods: {
    setProductionTime(time) {
      this.productionTime = time;
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
    }
  }
};
</script>
