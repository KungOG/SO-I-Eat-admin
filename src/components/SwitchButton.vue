<template>
  <div class='switch-button-wrapper'>
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
    <span class='switch-button-span'>{{switchButtonText}}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    width: 43,
    state: false,
    pressed: 0,
    position: 0,
    switchButtonText: '',
  }),
  mounted() {
    this.toggle(this.value);
  },
  computed: {
    style() {
      return {
        transform: `translateX(${this.pos_percentage})`,
      };
    },
    pos_percentage() {
      return `${this.position / this.width * 100}%`;
    },
    state_class() {
      if (this.state) {
        return 'active';
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
      // eslint-disable-next-line no-unused-expressions
      this.state === true ? this.switchButtonText = 'AKTIV PRODUKT' : this.switchButtonText = 'INAKTIV PRODUKT';
      this.position = !state ? 0 : 100;
    },
    dragging(e) {
      const pos = e.clientX - this.$el.offsetLeft;
      const percent = pos / this.width * 100;
      // eslint-disable-next-line no-nested-ternary
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
      clearInterval(this.$options.interval);
      if (this.pressed < 30) {
        this.toggle(!this.state);
      }
      this.pressed = 0;
      this.emit();
    },
    startTimer() {
      this.$options.interval = setInterval(() => {
        this.pressed++;
      }, 1);
    },
    resolvePosition() {
      this.position = this.state ? 100 : 0;
    },
    emit() {
      this.$store.dispatch('updateActiveProduct', { active: this.state, _id: this.id });
    },
  },
};
// https://codepen.io/nickforddesign/pen/NMqwLj
</script>

<style lang="scss">
.switch-button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  @media screen and (min-width: 2400px) { width: 226px; }

  .switch-button-span {
    margin-top: 10px;
  }
}

.toggle {
  width: 100px;
  height: 30px;
  background: #AA0909;
  border-radius: 200px;
  padding: 2px;
  transition: background .6s;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 50px;
    height: 15px;
  }

  @media screen and (min-width: 2400px) {
    width: 150px;
    height: 45px;
  }

  .draggable {
    width: 30px;
    height: 30px;
    background: white;
    border-radius: 100%;
    transform: translateX(0%);
    transition: transform 0.05s ease-in-out;

    @media (max-width: 1024px) {
      width: 15px;
      height: 15px;
    }
    @media screen and (min-width: 2400px) {
      width: 45px;
      height: 45px;
    }
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
