<template>
  <div class='navigation'>
    <div class='logo'>
      <img :src='Icon' alt='Icon logo' />
    </div>
    <div class='orders' v-if="$route.path == '/orderboard'">
      <img :src='Orders' alt="This is icon for orders" />
    </div>
    <div class='time-buttons' v-if="$route.path == '/orderboard'">
      <img :src='Timer' alt="This is icon for timer" />
      <LightButton 
        v-for="buttonText in buttonTexts" 
        :key="buttonText" 
        :buttonText="buttonText" 
        :chosenValue="productionTime"
        @click.native="setProductionTime(buttonText) "/>
    </div>
    <div v-if="$route.path == '/edit'">
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
      categoryToEdit: '',
    }
  },
  mounted() {
    var timerID = setInterval(this.updateTime, 1000);
  },
  methods: {
    setProductionTime(time) {
      this.productionTime = time;
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
    }
  }
};
</script>
