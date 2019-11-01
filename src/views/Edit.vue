<template>
  <div class='edit'>
    <Navigation/>
    <div class="content-wrapper">
      <section>
        <div class="search-bar">
          <input type="text" v-model="search" placeholder="Sök">
        </div>
        <div class="items-list">
          <ul>
            <li v-for="(item, i) in filterMenuItems" :key="i"><span>{{ item.id }}</span>{{ item.name }}</li>
          </ul>        
        </div>
        <div class="time-settings">
          <div>
            <DarkButton :buttonText="'Öppen'"/>
            <h3>Starttid</h3>
            <h3>Stoptid</h3>
          </div>
          <div>
            <DarkButton :buttonText="'Stängd'"/>
            <DarkButton/>
            <DarkButton/>
          </div>
        </div>
      </section>
      <section class='field'>
        <div class="grid-wrapper">
          <div class="header">
            <h1>Skapa ny menyrad</h1>
          </div>
          <div class='wrapper'>
            <div class="number">
              <label>Nummer</label>
              <input type="text">
            </div>
            <div class="category">
              <label>Kategori</label>
              <input type="text">
            </div>
            <div class="name">
              <label>Benämning</label>
              <input type="text">
            </div>
            <div class="price">
              <label>Pris</label>
              <input type="number">
            </div>
            <div class="protein">
              <label>Protein</label>
              <input type="text">
            </div>
            <div class="description">
              <label>Beskrivning</label>
              <input type="text">
            </div>
            <div class="ingredients">
              <label>Redigerbara ingredienser</label>
              <input type="text">
            </div>
            <div class="spice">
              <label>Justerbar styrka</label>
              <input type="text">
            </div>
          </div>
          <div class="button">
            <DarkButton />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/NavigationBar.vue';
import DarkButton from '@/components/DarkButton.vue';

export default {
  name: 'edit',
  components: {
    Navigation,
    DarkButton,
  },
  data: () => ({
    search: '',
  }),
  beforeMount() {
    this.$store.dispatch('getMenuItems');
  },
  computed: {
    menuItems() {
      return this.$store.state.menuItems;
    },
    filterMenuItems () {
      return this.menuItems.filter((item) => {
        return item.name.match(this.search);
      })
    }
  },
  
};
</script>
