<template>
  <div class='login'>
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
    <div>
    <button @click="callApi">Call</button>
    <p>{{ apiMessage }}</p>
  </div>
    <Modal v-if="showModal" @closeModal="showModal = false"/>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import axios from 'axios'

export default {
  name: 'login',
  components: {
    Modal,
  },
  data: () => ({
    showModal: false,
    apiMessage: ""
  }),
  mounted() {
    this.showModal = true;
  },
  methods: {
    async callApi() {
      // Get the access token from the auth wrapper
      const token = await this.$auth.getTokenSilently();
      // Use Axios to make a call to the API
      const { data } = await axios.get("https://so-i-eat-server.herokuapp.com/api/external", {
        headers: {
          Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
        }
      });
      this.apiMessage = data;
    },
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

