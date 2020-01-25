<template>
  <button class="dark-admin-btn" :class="buttonText === productionTime ? 'dark-active-btn' : '' ">{{buttonText}}</button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: false,
    },
    productionTime: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss">
  .dark-admin-btn {
    border: 1px solid black;
    border-radius: 5px;
    color: black;
    background: none;
    font-size: 16px;
    width: 65px;
    height: 30px;
    margin: 0;
    text-transform: uppercase;
    cursor: pointer;

    &.dark-active-btn {
      background-color: white;
      color: black;
      outline: 0;
    }

    &.hidden-btn {
      visibility: hidden;
    }
  }
</style>
