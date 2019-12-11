<template>
  <div class='login'>
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
    <Modal v-if="showModal" @closeModal="showModal = false"/>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'login',
  components: {
    Modal,
  },
  data: () => ({
    showModal: false,
  }),
  mounted() {
    this.showModal = true;
  },
  methods: {
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
