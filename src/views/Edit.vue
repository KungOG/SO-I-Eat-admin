<template>
  <div class='edit'>
    <Navigation @setActiveCategoryToEdit="setActiveCategory"/>
    <div class="content-wrapper">
      <section>
        <div class="search-bar">
          <input type="text" v-model="search" placeholder="Sök">
        </div>
        <div class="items-list">
          <ul>
            <li v-for="(item, i) in filterMenuItems" :key="`menuitems-${i}`" @click="showProduct(item._id)">
              <span>{{ item.productNr }}</span>
              {{ item.productName }}
            </li>
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
            <h1 v-if="!newProduct._id">Skapa ny {{ categoryToEdit }}</h1>
            <h1 v-else>Redigera {{ newProduct.productName }}</h1>
          </div>
          <div class='wrapper-left'>
            <div class="number">
              <label>Nummer</label>
              <input type="number" v-model.number.lazy="newProduct.productNr">
            </div>
            <div class="price">
              <label>Pris</label>
              <input type="number" v-model.number="newProduct.price">
            </div>
            <div class="name">
              <label>Benämning</label>
              <input type="text" v-model.lazy="newProduct.productName">
            </div>
            <div class="category">
              <label>Kategori</label>
              <select v-model="newProduct.category">
                <option disabled value="">Välj kategori</option>
                <option v-for="category in categories" :key="category.categoryId" type="number" :value="category.categoryId">{{category.categoryName}}</option>
              </select>
            </div>
            <div class="description">
              <label>Beskrivning</label>
              <textarea type="text" v-model="newProduct.description" />
            </div>
            <div class="protein" :class="{'-inactive': categoryToEdit === 'efterrätt' || categoryToEdit === 'dryck'}">
              <span>Huvudingredienser</span>
              <div class="input-wrapper">
                <div class="container" v-for="(proteinType, i) in proteinTypes" :key="`proteinType-${i}`" >
                  <Checkbox :dataValue="newProduct.protein.includes(proteinType)" :value="proteinType" @input="arrayFullOfProtein"/>
                  <label :for="proteinType">{{proteinType}}</label>  
                </div>
              </div>
              <br>
            </div>
            <div class="spice" :class="{'-inactive': categoryToEdit === 'efterrätt' || categoryToEdit === 'dryck'}">
              <span>Justerbar styrka</span>
              <div class="input-wrapper">
                <div class="container">
                  <Checkbox :dataValue="newProduct.spice" :value="boolean" @input="(x) => {newProduct.spice = x}"/>
                  <label for="Yes">Ja</label>
                </div>
                <div class="container">
                  <Checkbox :dataValue="!newProduct.spice" :value="!boolean" @input="(x) => {newProduct.spice = x}"/>
                  <label for="No">Nej</label>  
                </div>
              </div>
            </div>
          </div>
          <div class="divider">
            <div class="line" />
          </div>
          <div class="wrapper-right">
            <div class="ingredients" :class="{'-inactive': categoryToEdit === 'efterrätt' || categoryToEdit === 'dryck'}">
              <label>Redigerbara ingredienser</label>
              <input type="text" v-model="newProduct.ingredients[0]">
              <input type="text" v-model="newProduct.ingredients[1]">
              <input type="text" v-model="newProduct.ingredients[2]">
              <input type="text" v-model="newProduct.ingredients[3]">
              <input type="text" v-model="newProduct.ingredients[4]">
            </div>
            <div class="extras" :class="{'-inactive': categoryToEdit === 'efterrätt' || categoryToEdit === 'dryck'}">
              <span>Tillval</span>
              <div class="input-wrapper">
                <div class="container" v-for="(addon, i) in addons" :key="`addon-${i}`" >
                  <Checkbox :dataValue="newProduct.extras.includes(addon.name)" :value="addon.name" @input="arrayFullOfAddons"/>
                  <label :for="addon.name">{{addon.name}}</label>  
                </div>
              </div>
            </div>
          </div>
          <div class="button">
            <DarkButton :class="{'hidden-btn': !newProduct._id}" class="remove" buttonText="Ta bort" @click.native="removeProductFromDB" />
            <div class="button-wrapper">
              <DarkButton class="-add" :buttonText="buttonText" @click.native="createNewProduct" />
              <DarkButton buttonText="Avbryt" @click.native="emptyNewProductData" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/NavigationBar.vue';
import DarkButton from '@/components/DarkButton.vue';
import Checkbox from '@/components/Checkbox.vue';

export default {
  name: 'edit',
  components: {
    Navigation,
    DarkButton,
    Checkbox,
  },
  data: () => ({
    search: '',
    categoryToEdit: 'förrätt',
    addons: [{name: 'Bambuskott', price: 5}, {name: 'Tomat', price: 5}, {name: 'Lök', price: 5}, {name: 'Ananas', price: 5}, {name: 'Banan', price: 5}],
    proteinTypes: ['Pork', 'Beef', 'Chicken', 'Shrimp'],
    boolean: true,
    buttonText: 'Lägg till',
    newProduct: {
      productNr: 0,
      productName: '',
      category: 0,
      price: 0,
      description: '',
      protein: [],
      spice: false,
      ingredients: [],
      extras: [],
    },
  }),
  beforeMount() {
    this.$store.dispatch('getMenuItems');
    this.$store.dispatch('getCategories');
  },
  computed: {
    menuItems() {
      return this.$store.state.menuItems.filter((item) => {
        if(this.categoryToEdit === "efterrätt") {
          return item.category === 6;
        } else if (this.categoryToEdit === "dryck") {
          return item.category === 7;
        } else if (this.categoryToEdit === "förrätt") {
          return item.category === 0;
        } else {
          return item.category < 6;
        }
      })
    },
    filterMenuItems () {
      return this.menuItems.filter((item) => {
        return item.productName.match(this.search);
      })
    },
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    removeProductFromDB() {
      this.$store.dispatch('removeProduct', this.newProduct._id)
    },
    createNewProduct() {
      if(this.newProduct._id) {
        this.$store.dispatch('updateProduct', this.newProduct)
        .then(
          this.emptyNewProductData()
        )
        console.log('UPDATE ---> ',this.newProduct);
      } else {
        this.$store.dispatch('createProduct', this.newProduct)
        .then(
          this.emptyNewProductData()
        )
        console.log('CREATE ---> ',this.newProduct);
      }
    },
    showProduct(id) {
      var productToEdit = this.menuItems.find(function(item) {
        return item._id === id;
      });
      this.newProduct = productToEdit;
    },
    arrayFullOfProtein(i) {
      var proteins = this.newProduct.protein;
      proteins.includes(i) ? proteins.splice(proteins.indexOf(i), 1) : proteins.push(i);
    },
    arrayFullOfAddons(i) {
      var extras = this.newProduct.extras;
      extras.includes(i) ? extras.splice(extras.indexOf(i), 1) : extras.push(i);
    },
    setActiveCategory(x) {
      this.categoryToEdit = x
      if(x === 'dryck') {
        this.newProduct.category = 7
      } else if(x === 'efterrätt') {
        this.newProduct.category = 6
      } else if(x === 'förrätt') {
        this.newProduct.category = 0
      } else {
        this.newProduct.category = 1
      }
    },
    emptyNewProductData() {
      this.newProduct = {
        productNr: 0,
        productName: '',
        category: 1,
        price: 0,
        description: '',
        protein: [],
        spice: false,
        ingredients: [],
        extras: [],
      }
    }
  },
};
</script>
