<template>
  <div class='archive'>
    <Navigation />
    <div class="content-wrapper">
      <aside class="aside-content">
        <div class="search-bar">
          <img class='search-icon' :src="require('@/assets/icons/' + icons.search)"
          alt="Sök" />
          <input type="text" v-model="search" placeholder="Sök ordernummer">
        </div>
        <div class="archive-items-list">
          <ul>
            <li
              v-for="(item, i) in allOrders"
              :key="`archiveitems-${i}`"
              @click="chosenOrder = item">
              <span>{{item.date}}</span>
              {{item.code}}
            </li>
          </ul>
        </div>
      </aside>
      <main class="main-content">
        <div v-if=chosenOrder>
          <h1>{{chosenOrder.code}}</h1>
          <h1>{{chosenOrder.date}}</h1>
        </div>
      </main>  
    </div>  
  </div>
</template>

<script>
import Navigation from '@/components/NavigationBar.vue';
import axios from 'axios';

export default {
  name: 'archive',
  data: () => ({
    allOrders: null,
    icons: {
      search: 'Search.svg',    
    },
    search: '',
    chosenOrder: null,
  }),
  components: {
    Navigation,
  },
  computed: {
    filterArchiveItems() {
      return this.allOrders.filter(item => item.code.toUpperCase().match(this.search.toUpperCase()));
    },

  },
  beforeMount() {
    this.getAllOrders();
  },
  methods: {
    getAllOrders() {
      const url = 'https://so-i-eat-server.herokuapp.com/orders';
      let token = localStorage.token;
      axios
        .get(url, {
          headers: { authorization: `Bearer ${token}` }})
        .then((response) => {
          this.allOrders = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  showOrder(id) {

  }
};
</script>
