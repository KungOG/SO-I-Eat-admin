<template>
  <div class="checkbox" :class="{ 'checkbox-selected': dataValue }" @click="sendValue">
    <svg
      class="w-1/2 fill-current"
      :class="[value ? 'text-white' : 'text-blue-400']"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0
      c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7
      C514.5,101.703,514.499,85.494,504.502,75.496z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'checkbox',
  props: {
    value: { 
        required: true,
    },
    dataValue: {
        required: true,
    }
  },
  methods: {
      sendValue() {
          this.$emit('input', this.value);
      },
  },
};
</script>

<style lang="scss">
.checkbox {
  height: 28px;
  width: 28px;
  border: 1px solid #676565;
  border-radius: 999px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    height: 18px;
    width: 18px;
  }

  @media screen and (min-width: 2400px) {
    height: 35px;
    width: 35px;
  }
}
.checkbox-selected {
  background: #676565;
}
</style>