<template>
  <div class="order-modal">
    <div class='modal-overlay'>
      <section class='upper-order-modal'>
        <h4>Ydada ydayday ydayda</h4>
      </section>
      <section class='lower-order-modal'>
        <DarkButton buttonText="Avbryt" @click.native="cancelUpdate"/>
        <DarkButton buttonText="OK" @click.native="deliverOrder"/>
      </section>
    </div>
  </div>
</template>

<script>
import DarkButton from './DarkButton.vue';

export default {
  name: 'order-modal',
  components: {
    DarkButton,
  },
  methods: {
    async deliverOrder() {
      await this.$store.dispatch('deliverOrders')
      this.$store.commit('setShowModal', false)
      this.$store.dispatch('getOrders');
    },
    cancelUpdate() {
      this.$store.commit('setShowModal', false)
    },
  }  
}
</script>
