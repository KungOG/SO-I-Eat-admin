<template>
  <button class="light-admin-btn" :class="buttonText === productionTime ? 'active-btn' : '' ">{{buttonText}}</button>   
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    productionTime: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss">
  .light-admin-btn {
    border: 1px solid white;
    border-radius: 5px;
    color: white;
    background: none;
    font-size: 16px; 
    width: 65px;
    height: 30px;
    margin: 0 1rem;

    &.edit-btn {
      width: 100px;
    }
    &.active-btn {
      background-color: white;
      color: black;
      outline: 0;
    }
  }
</style>