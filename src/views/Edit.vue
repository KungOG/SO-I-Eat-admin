<template>
  <div class='edit'>
    <Navigation/>
    <div class="content-wrapper">
      <section>
        <div class="search-bar">search bar</div>
        <div class="items-list">
          <ul>
            <li v-for="(item, i) in menuItems" :key="i">{{ item.id }}{{ item.name }}</li>
          </ul>        
        </div>
        <div class="time-settings"></div>
      </section>
      <section>
        <h1>kjfkf</h1>
      </section>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/NavigationBar.vue';

export default {
  name: 'edit',
  components: {
    Navigation,
  },
  beforeMount() {
    this.$store.dispatch('getMenuItems')
  },
  computed: {
    menuItems() {
      return this.$store.state.menuItems;
    }
  }
};
</script>
