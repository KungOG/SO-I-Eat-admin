<template>
  <div class='login'>
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
};
</script>
