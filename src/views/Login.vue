<template>
  <div class='login'>
    <section class="login-content">
      <img :src="icon" alt="Full size business logo">
      <hr>
      <div v-if="!$auth.loading">
        <LightButton class="login-button" buttonText="logga in" v-if="!$auth.isAuthenticated" @click.native="login" />
        <LightButton class="login-button" buttonText="logga in" v-if="$auth.isAuthenticated" @click.native="logout" />
        <LightButton class="login-button" buttonText="webbhandel" />
      </div>
      <div>
        <button @click="callApi">Call</button>
      </div>
    </section>
    <Modal v-if="showModal" @closeModal="showModal = false"/>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import axios from 'axios'
import LightButton from '@/components/LightButton.vue';
import Icon from '@/assets/icons/FullLogo.svg';

export default {
  name: 'login',
  components: {
    Modal,
    LightButton,
    Icon,
  },
  data: () => ({
    showModal: false,
    icon: Icon,
  }),
  async mounted() {
    this.showModal = true;
  },
  methods: {
    async callApi() {
      let token = await this.$auth.getTokenSilently();
      localStorage.token = token
      console.log(token)
    },
    async login() {
      await this.$auth.loginWithRedirect();

    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

