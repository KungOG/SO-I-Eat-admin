<template>
  <div class="navigation">
    <div class="logo-dropdown" :class="showHamburger === true ? '-active' : ''">
      <div v-if="burgerText" class="dropdown-links">
        <router-link to="/orderboard">ordrar</router-link>
        <router-link to="/edit">produkter</router-link>
        <router-link to="/archive">arkiv</router-link>
        <span @click="openingModal">Öppettider</span>
        <span @click="logout">logga ut</span>
      </div>
    </div>
    <div
      v-if="showHamburger"
      :class="showHamburger === true ? '-activeBackground' : ''"
      @click="activateHamburger"
    />
    <div class="logo">
      <img :src="Icon" alt="Icon logo" @click="activateHamburger" />
    </div>
    <div class="nav-orders" v-if="$route.path == '/orderboard'">
      <img :src="Orders" alt="This is icon for orders" />
      <p>{{numberOfOrders}}</p>
    </div>
    <div class="time-buttons" v-if="$route.path == '/orderboard'">
      <img :src="Timer" alt="This is icon for timer" />
      <LightButton
        v-for="buttonText in buttonTexts"
        :key="buttonText"
        :buttonText="buttonText"
        :chosenValue="productionTime"
        @click.native="updateProductionTime(buttonText) "
      />
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
    <div class="current-time">
      <p>{{time}}</p>
    </div>
    <Modal v-if="showOpeningModal" @closeModal="closeOpeningModal" />
  </div>
</template>

<script>
import axios from "axios";
import Orders from "@/assets/icons/Menu.svg";
import Timer from "@/assets/icons/Clock.svg";
import Icon from "@/assets/icons/FullLogo.svg";
import LightButton from "@/components/LightButton.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "navigationbar",
  mounted() {
    setTimeout(() => {
      if(this.prevRoute) {
        this.prevRoute.name === "loading" 
          ? (this.showOpeningModal = true)
          : (this.showOpeningModal = false);
      }
    }, 1000);
    const timerID = setInterval(this.updateTime, 1000);
    this.getProductionTime();
  },
  components: {
    Orders,
    Timer,
    Icon,
    LightButton,
    Modal
  },
  props: {
    prevRoute: {
      required: false,
    },
  },
  data: () => ({
    Orders,
    Timer,
    Icon,
    buttonTexts: ["10", "15", "20", "30", "45"],
    time: "",
    productionTime: "",
    productionTimeId: null,
    categoryToEdit: "förrätt",
    showHamburger: false,
    burgerText: false,
    showOpeningModal: false,
  }),
  computed: {
    numberOfOrders() {
      return this.$store.getters.foodItems.length;
    }
  },
  methods: {
    openingModal() {
      this.showOpeningModal = true;
    },
    closeOpeningModal() {
      this.showOpeningModal = false;
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
    activateHamburger() {
      this.showHamburger = !this.showHamburger;
      setTimeout(() => {
        this.burgerText = !this.burgerText;
      }, 100);
    },
    async updateProductionTime(time) {
      this.productionTime = time;
      await this.$store.dispatch("updateProductionTime", {
        time,
        _id: this.productionTimeId
      });
      this.getProductionTime();
    },
    setCategoryToEdit(cat) {
      this.$emit("emptyProductData");
      this.categoryToEdit = cat;
      this.$emit("setActiveCategoryToEdit", cat);
    },
    updateTime() {
      const cd = new Date();
      this.time = `${this.zeroPadding(cd.getHours(), 2)}:${this.zeroPadding(
        cd.getMinutes(),
        2
      )}`;
    },
    zeroPadding(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    getProductionTime() {
      const url = "https://so-i-eat-server.herokuapp.com/deliveryTimes";
      axios
        .get(url)
        .then(response => {
          this.productionTimeId = response.data[0]._id;
          this.productionTime = response.data[0].time;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
