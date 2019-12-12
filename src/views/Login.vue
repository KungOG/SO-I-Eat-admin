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
  }),
  async mounted() {
    this.showModal = true;
  },
  methods: {
    async callApi() {
      localStorage.token = await this.$auth.getTokenSilently();
    },
    async login() {
      await this.$auth.loginWithRedirect();
      localStorage.token = await this.$auth.getTokenSilently();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

