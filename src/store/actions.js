import axios from 'axios'

export default {
   getOrders (ctx) {
    const url = 'http://localhost:3000/orders';
      axios
    .get(url)
    .then(response => {
      ctx.commit('setOrders', response.data);
    })
    .catch(error => {
      console.log(error);
    })
  },
   getMenuItems (ctx) {
    const url = 'http://localhost:3000/products';
      axios
    .get(url)
    .then(response => {
      ctx.commit('setMenuItems', response.data);
    })
    .catch(error => {
      console.log(error);
    })
  },
   async createProduct (ctx, newProduct) {
    console.log(newProduct)
    
    await axios.post('http://localhost:3000/products', newProduct);
    
    console.log('funkade')




    // const url = 'http://localhost:3000/products';
    //   axios
    // .post(url, newProduct)
    // .then(response => {
    //   console.log('jkjbkj')
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  },
};
