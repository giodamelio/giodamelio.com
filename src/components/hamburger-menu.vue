<template>
  <a @click="clickEvent">
    <div class="hamburger-icon" :class="{ open }">
      <div class="middle"></div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    open: Boolean
  },
  methods: {
    clickEvent() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
div.hamburger-icon {
  width: 1.5rem;

  &:after,
  &:before,
  div.middle {
    border-radius: 3px;
    content: '';
    display: block;
    height: 3px;
    margin: 4px 0;
    transition: all 0.2s ease-in-out;

    // Colors
    @apply text-white bg-white;
  }
}

.open {
  &:before {
    transform: translateY(7px) rotate(135deg);
  }

  &:after {
    transform: translateY(-7px) rotate(-135deg);
  }

  div.middle {
    transform: scale(0);
  }
}
</style>
