<template>
  <div
    class="toggle"
    :class=[this.state_class]
    @click.self="onClick">
    <div
      class="draggable"
      @mousedown.prevent="dragStart"
      :style="style">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    width: 43,
    state: false,
    pressed: 0,
    position: 0,
  }),
  mounted() {
    this.toggle(this.value);
  },
  computed: {
    style() {
      return {
        transform: `translateX(${this.pos_percentage})`
      }
    },
    pos_percentage() {
      return `${this.position / this.width * 100}%`
    },
    state_class() {
      if (this.state) {
        return 'active'
      }
    },
  },
  watch: {
    position() {
      this.state = this.position >= 30;
    },
    value() {
      this.toggle(this.value);
    },
  },
  methods: {
    onClick() {
      this.toggle(!this.state);
      this.emit();
    },
    toggle(state) {
      this.state = state;
      this.position = !state ? 0 : 100;
    },
    dragging(e) {
      const pos = e.clientX - this.$el.offsetLeft; 
      const percent = pos / this.width * 100;
      this.position = percent <= 0
        ? 0
        : percent >= 100
          ? 100
          : percent;
    },
    dragStart(e) {
      this.startTimer();
      window.addEventListener('mousemove', this.dragging);
      window.addEventListener('mouseup', this.dragStop);
    },
    dragStop() {
      window.removeEventListener('mousemove', this.dragging);
      window.removeEventListener('mouseup', this.dragStop);
      this.resolvePosition();
      clearInterval(this.$options.interval)
      if (this.pressed < 30) {
        this.toggle(!this.state);
      }
      this.pressed = 0;
      this.emit();
    },
    startTimer() {
      this.$options.interval = setInterval(() => {
        this.pressed++
      }, 1);
    },
    resolvePosition() {
      this.position = this.state ? 100 : 0;
    },
    emit() {
      this.$store.dispatch('updateActiveProduct', this.state);
    },
  },
};
//https://codepen.io/nickforddesign/pen/NMqwLj
</script>

<style lang="scss">

  .toggle {
    width: 100px;
    height: 30px;
    background: #AA0909;;
    border-radius: 200px;
    padding: 2px;
    transition: background 0.6s;
    
    .draggable {
      width: 30px;
      height: 30px;
      background: white;
      border-radius: 100%;
      box-shadow: 0px 3px 10px rgba(0,0,0, 0.6);
      transform: translateX(0%);
      transition: transform 0.05s ease-in-out;
    }
    
    &.active {
      background: #699D65;
      transition: background 0.6s;
    }
  }

  .app {
    display: flex;
  }

  .switches {
    margin-right: 30px
  }

  pre {
    margin: 0;
    background: #513d56;
    color: #efefef;
    padding: 20px;
    border-radius: 6px;
    width: 200px;
  }
</style>
