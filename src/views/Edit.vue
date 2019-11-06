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
            <h1>Skapa ny menyrad</h1>
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
                <option disabled value="">Välj katergori</option>
                <option type="number" value="0">Förätter</option>
                <option type="number" value="1">Wokat</option>
                <option type="number" value="2">Currygryta</option>
              </select>
            </div>
            <div class="description">
              <label>Beskrivning</label>
              <textarea type="text" v-model="newProduct.description" />
            </div>
            <div class="protein">
              <span>Huvudingredienser</span>
              <div class="input-wrapper">
                <div class="container" v-for="(proteinType, i) in proteinTypes" :key="`proteinType-${i}`" >
                  <Checkbox :dataValue="newProduct.protein.includes(proteinType)" :value="proteinType" @input="arrayFullOfProtein"/>
                  <label :for="proteinType">{{proteinType}}</label>  
                </div>
              </div>
              <br>
            </div>
            <div class="spice">
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
            <div class="ingredients">
              <label>Redigerbara ingredienser</label>
              <input type="text" v-model="newProduct.ingredients[0]">
              <input type="text" v-model="newProduct.ingredients[1]">
              <input type="text" v-model="newProduct.ingredients[2]">
              <input type="text" v-model="newProduct.ingredients[3]">
              <input type="text" v-model="newProduct.ingredients[4]">
            </div>
            <div class="extras">
              <span>Tillval</span>
              <div class="input-wrapper">
                <div class="container" v-for="(addon, i) in addons" :key="`addon-${i}`" >
                  <Checkbox :dataValue="newProduct.extras.includes(addon.name)" :value="addon.name" @input="arrayFullOfAddons"/>
                  <label :for="addon.name">{{addon.name}}</label>  
                </div>
              </div>
            </div>
          </div>
          <div class="button" @click="createNewProduct">
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
    addons: [{name: 'Bambuskott', price: 5}, {name: 'Tomat', price: 5}, {name: 'Lök', price: 5}, {name: 'Ananas', price: 5}, {name: 'Banan', price: 5}],
    proteinTypes: ['Pork', 'Beef', 'Chicken', 'Shrimp'],
    boolean: true,
    newProduct: {
      productNr: 0,
      productName: '',
      category: 0,
      price: 0,
      description: '',
      protein: [],
      spice: true,
      ingredients: [],
      extras: [],
    },
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
        return item.productName.match(this.search);
      })
    }
  },
  methods: {
    createNewProduct() {
      if(this.newProduct._id) {
        this.$store.dispatch('updateProduct', this.newProduct);
        console.log('UPDATE ---> ',this.newProduct);
      } else {
        this.$store.dispatch('createProduct', this.newProduct);
        console.log('CREATE ---> ',this.newProduct);
      }
    },
    showProduct(id) {
      var productToEdit = this.menuItems.find(function(item) {
        return item._id === id;
      });
      this.newProduct = productToEdit;
      console.log(this.newProduct);
    },
    arrayFullOfProtein(i) {
      var proteins = this.newProduct.protein;
      proteins.includes(i) ? proteins.splice(proteins.indexOf(i), 1) : proteins.push(i);
    },
    arrayFullOfAddons(i) {
      var extras = this.newProduct.extras;
      extras.includes(i) ? extras.splice(extras.indexOf(i), 1) : extras.push(i);
    },
  },
};
</script>
