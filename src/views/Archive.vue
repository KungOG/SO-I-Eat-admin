<template>
  <div class="archive">
    <Navigation />
    <div class="content-wrapper">
      <aside class="aside-content">
        <div class="search-bar">
          <img class="search-icon" :src="require('@/assets/icons/' + icons.search)" alt="Sök" />
          <input type="text" v-model="search" placeholder="Sök ordernummer" />
        </div>
        <div class="date">
          <input type="date" @input="date = $event.target.value" />
        </div>
        <div class="archive-items-list">
          <ul>
            <li
              v-for="(item, i) in filterArchiveItems"
              :key="`archiveitems-${i}`"
              @click="chosenOrder = item"
            >
              <span>{{item.date.slice(0, 10) + ' ' + new Date(item.date).toLocaleTimeString().slice(0, 5)}}</span>
              {{item.code}}
            </li>
          </ul>
        </div>
      </aside>
      <main class="main-content">
        <div v-if="chosenOrder">
          <div class="order-details">
            <h1>{{chosenOrder.code}}</h1>
            <h1>{{time}}</h1>
            <h1>Bord: {{chosenOrder.orderInformation.table}}</h1>
          </div>
          <div
            class="order-info"
            v-for="(foodItem, i) in chosenOrder.orderInformation.foodItems"
            :key="`archivefooditems-${i}`"
          >
            <div>
              <h3>{{foodItem.productName}}</h3>
              <hr />
            </div>
            <div>
              <div>
                <p>{{foodItem.protein}}</p>
              </div>
              <div>
                <p v-for="(add, i) in foodItem.add" :key="`archiveadd-${i}`">+{{add.name}}</p>
              </div>
              <div>
                <p v-for="(remove, i) in foodItem.remove" :key="`archiveremove-${i}`">-{{remove}}</p>
              </div>
            </div>
          </div>
          <div
            class="order-info"
            v-for="(drinkItem, i) in chosenOrder.orderInformation.drinkItems"
            :key="`archivedrinkitems-${i}`"
          >
            <h3>{{drinkItem.productName}}</h3>
            <hr />
            <p>{{drinkItem.description}}</p>
          </div>
          <div class="totalsum">
            <h3 class="sum">Totalsumma {{chosenOrder.amount}}:-</h3>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navigation from "@/components/NavigationBar.vue";

export default {
  name: "archive",
  data: () => ({
    icons: {
      search: "Search.svg"
    },
    search: "",
    chosenOrder: null,
    date: "",
  }),
  components: {
    Navigation
  },
  beforeMount() {
    this.$store.dispatch("getAllOrders");
  },
  computed: {
    allOrders() {
      return this.$store.state.allOrders;
    },
    filterArchiveItems() {
      if (this.allOrders !== null) {
        if (this.date.length === 0) {
          return this.allOrders.filter(item =>
            item.code.toUpperCase().match(this.search.toUpperCase())
          );
        }
        return this.allOrders.filter(item => {
          const fullDate = item.date.slice(0, 10);
          return fullDate === this.date;
        });
      }
    },
    time() {
      const time = new Date(this.chosenOrder.date);
      const localTime = time.toLocaleTimeString().slice(0, 5);
      const date = this.chosenOrder.date.slice(0, 10)
      return date + ' ' + localTime
    },
  },
};
</script>
