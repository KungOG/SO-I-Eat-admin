<template>
  <button class="light-admin-btn" :class="buttonText === chosenValue ? 'light-active-btn' : '' ">{{buttonText}}</button>   
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    chosenValue: {
      type: String,
      required: true,
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
    text-transform: uppercase;

    &.edit-btn {
      width: 120px;
    }
    &.light-active-btn {
      background-color: #AC9416;
      border: 1px solid #AC9416;
      color: white;
      outline: 0;
    }
  }
</style>