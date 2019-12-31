<template>
  <div class='edit'>
    <Navigation @setActiveCategoryToEdit="setActiveCategory" @emptyProductData="emptyNewProductData"/>
    <div class="content-wrapper">
      <div class='fader' :class="activatedSearch === true ? '-active' : ''" @click="showSearch">
        <img class='close-down-search' :src="require('@/assets/icons/' + icons.whiteCross)" alt="Cancel icon">
      </div>
      <section class='search-slidein' :class="activatedSearch === true ? '-active' : ''">
        <div class="search-bar">
          <img class='search-icon' :src="require('@/assets/icons/' + icons.search)"
          alt="Search item from database icon" />
          <input type="text" v-model="search" placeholder="Sök">
        </div>
        <div class="items-list">
          <ul>
            <li v-for="(item, i) in filterMenuItems" :key="`menuitems-${i}`"
            @click="showProduct(item._id)">
              <span>{{ item.productNr }}</span>
              {{ item.productName }}
            </li>
          </ul>
        </div>
        <div class="time-settings">
          <SetTime />
        </div>
      </section>
      <section class='field'>
        <div class="grid-wrapper">
          <div class="header">
            <img class='activate-search' :src="require('@/assets/icons/' + icons.search)"
            alt="Search item from database icon"
            @click="showSearch" />
            <h1 v-if="!newProduct._id">Skapa ny {{ categoryToEdit }}</h1>
            <h1 v-else>Redigera {{ newProduct.productName }}</h1>
          </div>
          <div class='wrapper-left'>
            <div class="number">
              <span>Nummer</span>
              <input type="text" v-model.number.lazy="newProduct.productNr">
            </div>
            <div class="price">
              <span>Pris</span>
              <input type="number" v-model.number="newProduct.price">
            </div>
            <div class="name">
              <span>Benämning</span>
              <input type="text" v-model.lazy="newProduct.productName">
            </div>
            <div class="category" :class="{'-inactive': categoryToEdit !== 'huvudrätt'}">
              <span>Kategori</span>
              <select v-model="newProduct.category">
                <option disabled value="">Välj kategori</option>
                <option v-for="category in categories" :key="category.categoryId" type="number"
                :value="category.categoryId">
                  {{category.categoryName}}
                </option>
              </select>
            </div>
            <div class="description">
              <span>Beskrivning</span>
              <textarea type="text" maxlength="150" v-model="newProduct.description" />
            </div>
            <div class="protein"
            :class="{'-inactive': categoryToEdit === 'efterrätt' || categoryToEdit === 'dryck'}">
              <span>Huvudingredienser</span>
              <div class="input-wrapper">
                <div class="container"
                v-for="(proteinType, i) in proteinTypes" :key="`proteinType-${i}`" >
                  <Checkbox :dataValue="newProduct.protein.includes(proteinType)"
                  :value="proteinType"
                  @input="arrayFullOfProtein"/>
                  <label v-if="proteinType === 'Pork'">Fläsk</label>
                  <label v-if="proteinType === 'Beef'">Biff</label>
                  <label v-if="proteinType === 'Chicken'">Kyckling</label>
                  <label v-if="proteinType === 'Shrimp'">Räkor</label>
                </div>
              </div>
              <br>
            </div>
            <div class="spice"
            :class="{'-inactive': categoryToEdit === 'efterrätt' || categoryToEdit === 'dryck'}">
              <span>Justerbar styrka</span>
              <div class="input-wrapper">
                <div class="container">
                  <Checkbox
                  :dataValue="newProduct.spice"
                  :value="isSpice" @input="(x) => {newProduct.spice = x}"/>
                  <label for="Yes">Ja</label>
                </div>
                <div class="container">
                  <Checkbox :dataValue="!newProduct.spice"
                  :value="!isSpice"
                  @input="(x) => {newProduct.spice = x}"/>
                  <label for="No">Nej</label>
                </div>
              </div>
            </div>
          </div>
          <div class="divider">
            <div class="line" />
          </div>
          <div class="wrapper-right">
            <div class="ingredients"
            :class="{'-inactive': categoryToEdit === 'efterrätt' || categoryToEdit === 'dryck'}">
              <span>Redigerbara ingredienser</span>
              <input type="text" v-model="newProduct.ingredients[0]">
              <input type="text" v-model="newProduct.ingredients[1]">
              <input type="text" v-model="newProduct.ingredients[2]">
              <input type="text" v-model="newProduct.ingredients[3]">
              <input type="text" v-model="newProduct.ingredients[4]">
              <input type="text" v-model="newProduct.ingredients[5]">
              <input type="text" v-model="newProduct.ingredients[6]">
            </div>
            <div class="extras"
            :class="{'-inactive': categoryToEdit === 'efterrätt' || categoryToEdit === 'dryck'}">
              <span>Tillval</span>
              <div class="input-wrapper">
                <div class="container" v-for="(addon, i) in addons" :key="`addon-${i}`" >
                  <Checkbox
                  :dataValue="newProduct.extras.includes(addon.name)"
                  :value="addon.name" @input="arrayFullOfAddons"/>
                  <label :for="addon.name">{{addon.name}}</label>
                </div>
              </div>
            </div>
          </div>
          <div v-if="newProduct._id" class="switch-button">
            <SwitchButton :value="newProduct.active" :id="newProduct._id"/>
          </div>
          <div class="button">
            <div
            :class="{'hidden-btn': !newProduct._id}"
            class="edit-admin-btn -remove" @click="removeProductFromDB">
              <img :src="require('@/assets/icons/' + icons.bin)"
              alt="Remove item from database icon">
              <span>Ta bort</span>
            </div>
            <div class='button-wrapper'>
              <div class='edit-admin-btn -add' @click="createNewProduct" >
                <img :src="require('@/assets/icons/' + icons.add)" alt="Add item to database icon">
                <span>Lägg till</span>
              </div>
              <div class='edit-admin-btn -cancel' @click="emptyNewProductData">
                <img :src="require('@/assets/icons/' + icons.cross)" alt="Cancel icon">
                <span>Avbryt</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/NavigationBar.vue';
import Checkbox from '@/components/Checkbox.vue';
import SetTime from '@/components/SetTime.vue';
import SwitchButton from '@/components/SwitchButton.vue';

export default {
  name: 'edit',
  components: {
    Navigation,
    Checkbox,
    SetTime,
    SwitchButton,
  },
  data: () => ({
    activatedSearch: false,
    search: '',
    categoryToEdit: 'förrätt',
    addons: [
      { name: 'Vitlök', price: 5 },
      { name: 'Lök', price: 5 },
      { name: 'Vitkål', price: 5 },
      { name: 'Paprika', price: 5 },
      { name: 'Morötter', price: 5 },
      { name: 'Broccoli', price: 5 },
      { name: 'Blomkål', price: 5 },
      { name: 'Cashewnötter', price: 5 },
      { name: 'Böngroddar', price: 5 },
      { name: 'Purjolök', price: 5 },
      { name: 'Bambuskott', price: 5 },
      { name: 'Fisksås', price: 5 },
      { name: 'Kokosmjölk', price: 5 },
      { name: 'Sötsursås', price: 5 },
      { name: 'Sweetchilisås', price: 5 },
      { name: 'Jordnötsås', price: 5 },
      { name: 'Jordnötter', price: 5 },
      { name: 'Ostronsås', price: 5 },
      { name: 'Ris', price: 5 },
      { name: 'Nudlar', price: 5 },
      { name: 'Ingefära', price: 5 },
      { name: 'Thaibasilika', price: 5 },
      { name: 'Galanga', price: 5 },
      { name: 'Citrongräs', price: 5 },
      { name: 'Korianderblad', price: 5 },
      { name: 'Limeblad', price: 5 },
      { name: 'Ananas', price: 5 },
      { name: 'Tomat', price: 5 },
      { name: 'Ägg', price: 5 },
      { name: 'Gräslök', price: 5 },
      { name: 'Tamarindsås', price: 5 },
      { name: 'Koriander', price: 5 },
      { name: 'Brysselkål', price: 5 },
      { name: 'Honung', price: 5 },
    ],
    proteinTypes: ['Pork', 'Beef', 'Chicken', 'Shrimp'],
    isSpice: true,
    buttonText: 'Lägg till',
    newProduct: {
      productNr: 0,
      productName: '',
      category: 0,
      active: true,
      price: 0,
      description: '',
      protein: [],
      spice: false,
      ingredients: [],
      extras: [],
    },
    icons: {
      bin: 'Bin.svg',
      search: 'Search.svg',
      add: 'Add.svg',
      cross: 'Cross.svg',
      whiteCross: 'WhiteCross.svg',
    },
  }),
  beforeMount() {
    this.$store.dispatch('getMenuItems');
    this.$store.dispatch('getCategories');
  },
  computed: {
    menuItems() {
      return this.$store.state.menuItems.filter((item) => {
        if (this.categoryToEdit === 'efterrätt') {
          return item.category === 6;
        }
        if (this.categoryToEdit === 'dryck') {
          return item.category === 7;
        }
        if (this.categoryToEdit === 'förrätt') {
          return item.category === 0;
        }
        return item.category < 6 && item.category !== 0;
      });
    },
    filterMenuItems() {
      return this.menuItems.filter(item => item.productName.toUpperCase().match(this.search.toUpperCase()));
    },
    categories() {
      if (this.categoryToEdit === 'huvudrätt') {
        return this.$store.state.categories.filter(
          x => x.categoryName !== 'Smått'
          && x.categoryName !== 'Sött'
          && x.categoryName !== 'Dryck',
        );
      }
      return this.$store.state.categories;
    },
  },
  methods: {
    showSearch() {
      this.activatedSearch = !this.activatedSearch;
    },
    removeProductFromDB() {
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('removeProduct', this.newProduct._id)
        .then(
            this.emptyNewProductData(),
          );
    },
    createNewProduct() {
      // eslint-disable-next-line no-underscore-dangle
      if (this.newProduct._id) {
        this.$store.dispatch('updateProduct', this.newProduct)
          .then(
            this.emptyNewProductData(),
          );
      } else {
        this.$store.dispatch('createProduct', this.newProduct)
          .then(
            this.emptyNewProductData(),
          )
      }
    },
    showProduct(id) {
      // eslint-disable-next-line no-underscore-dangle
      const productToEdit = this.menuItems.find(item => item._id === id);
      this.newProduct = productToEdit;
      this.activatedSearch = false;
    },
    arrayFullOfProtein(i) {
      const proteins = this.newProduct.protein;
      // eslint-disable-next-line no-unused-expressions
      proteins.includes(i) ? proteins.splice(proteins.indexOf(i), 1) : proteins.push(i);
    },
    arrayFullOfAddons(i) {
      const { extras } = this.newProduct;
      // eslint-disable-next-line no-unused-expressions
      extras.includes(i) ? extras.splice(extras.indexOf(i), 1) : extras.push(i);
    },
    setActiveCategory(x) {
      this.categoryToEdit = x;
      if (x === 'dryck') {
        this.newProduct.category = 7;
      } else if (x === 'efterrätt') {
        this.newProduct.category = 6;
      } else if (x === 'förrätt') {
        this.newProduct.category = 0;
      } else {
        this.newProduct.category = 1;
      }
    },
    emptyNewProductData() {
      this.newProduct = {
        productNr: 0,
        productName: '',
        category: 0,
        price: 0,
        description: '',
        active: true,
        protein: [],
        spice: false,
        ingredients: [],
        extras: [],
      };
    },
  },
};
</script>
