<template>
  <div class='login'>
    <section class="login-content">
      <img :src="icon" alt="Full size business logo">
      <div class='line-divider'>
        <div class='line' />
      </div>
      <div v-if="!$auth.loading">
        <LightButton class="login-button" buttonText="logga in"
        v-if="!$auth.isAuthenticated" @click.native="login" />
        <LightButton class="login-button" buttonText="logga ut"
        v-if="$auth.isAuthenticated" @click.native="logout" />
        <LightButton class="login-button" buttonText="webbhandel" />
      </div>
    </section>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import LightButton from '@/components/LightButton.vue';
// eslint-disable-next-line import/no-unresolved
import Icon from '@/assets/icons/FullLogo.svg';

export default {
  name: 'login',
  components: {
    LightButton,
  },
  data: () => ({
    icon: Icon,
  }),
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>
