<template>
  <div>
    <nav
      class="navbar header has-shadow is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          Gio's Internet Braindump
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item" v-for="(item, key) of social" :key="key">
          <a :href="item.url" :title="item.title">
            <b-icon :icon="item.icon" />
          </a>
        </div>
      </div>
    </nav>

    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      social: [
        {
          title: 'Github',
          icon: 'github-circle',
          url: 'https://github.com/giodamelio'
        }
      ],
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>
