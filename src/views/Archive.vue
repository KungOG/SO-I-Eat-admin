<template>
  <div class='archive'>
    <Navigation />
    <div class="content-wrapper">
      <aside class="aside-content">
        <div class="search-bar">
          <img
            class='search-icon'
            :src="require('@/assets/icons/' + icons.search)"
            alt="Sök" />
          <input
            type="text"
            v-model="search"
            placeholder="Sök ordernummer">
        </div>
        <div class="archive-items-list">
          <ul>
            <li
              v-for="(item, i) in filterArchiveItems"
              :key="`archiveitems-${i}`"
              @click="chosenOrder = item">
              <span>{{new Date(item.date).getFullYear() + '-' + new Date(item.date).getMonth() + 1 + '-' + new Date(item.date).getDate() + ' ' + new Date(item.date).toLocaleTimeString().slice(0, 5)}}</span>
              {{item.code}}
            </li>
          </ul>
        </div>
      </aside>
      <main class="main-content">
        <div v-if=chosenOrder>
          <div class="order-details">
            <h1>{{chosenOrder.code}}</h1>
            <h1>{{time}}</h1>
            <h1>Bord: {{chosenOrder.orderInformation.table}}</h1>
          </div>
          <div class="order-info" v-for="(foodItem, i) in chosenOrder.orderInformation.foodItems" :key="`archivefooditems-${i}`">
            <div>
              <h3>{{foodItem.productName}}</h3>
              <hr>
            </div>
            <div>
              <div>
                <p>{{foodItem.protein}}</p>
              </div>
              <div>
                <p v-for="add in foodItem.add">+{{add.name}}</p>
              </div>
              <div>
                <p v-for="remove in foodItem.remove">-{{remove}}</p>
              </div>
            </div>
          </div>
          <div class="order-info" v-for="(drinkItem, i) in chosenOrder.orderInformation.drinkItems" :key="`archivedrinkitems-${i}`">
            <h3>{{drinkItem.productName}}</h3>
            <hr>
            <p>{{drinkItem.description}}</p>
          </div>
          <div class="totalsum">
            <h3 class="sum">Totalsumma XXX:-</h3>
            <h3 class="sum">Betalad med Swish</h3>
          </div>
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
      if (this.allOrders !== null) {
      return this.allOrders.filter(item => item.code.toUpperCase().match(this.search.toUpperCase()));
      }
    },
    time() {
      const time = new Date(this.chosenOrder.date);
      const year = time.getFullYear()
      const month = time.getMonth()
      const date = time.getDate()
      const localTime = time.toLocaleTimeString().slice(0, 5);
      return year + '-' + month +1 + '-' + date + ' ' + localTime;
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
