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
    </div>
    <div class='current-time'>15:35</div>
  </div>
</template>

<script>
import Orders from '@/assets/icons/Menu.svg';
import Timer from '@/assets/icons/Clock.svg';
import Icon from '@/assets/icons/Group.svg';

export default {
  name: 'navigationbar',
  components: {
    Orders,
    Timer,
    Icon,
  },
  data () {
    return {
      Orders: Orders,
      Timer: Timer,
      Icon: Icon,
    }
  }
};
</script>
