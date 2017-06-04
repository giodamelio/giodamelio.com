<template>
  <div>
    <nav class="nav">
      <div class="nav-left">
        <!-- Brand -->
        <nuxt-link class="nav-item" :to="navbar.brand.url">
          <strong>
            {{ navbar.brand.text }}
          </strong>
        </nuxt-link>

        <!-- Links -->
        <nuxt-link class="nav-item is-hidden-touch is-tab"
                   v-for="link in navbar.links"
                   active-class="is-active"
                   :to="link.url"
                   :exact="link.exact"
                   :key="link.url">
          {{ link.text }}
        </nuxt-link>
      </div>

      <div class="nav-right">
        <!-- Social -->
        <a class="nav-item is-hidden-touch"
           v-for="site in navbar.social"
           target="_blank"
           rel="noopener noreferrer"
           :href="site.url"
           :key="site.url">
          <i class="fa fa-2x"
             :class="'fa-' + site.icon"
             aria-hidden="true"></i>
        </a>

        <!-- Hamburger menu toggle -->
        <a class="nav-item is-hidden-desktop"
           @click="toggleHamburgerMenu">
          <i class="fa fa-2x"
             :class="hamburgerClass"
             aria-hidden="true"></i>
        </a>
      </div>
    </nav>

    <!-- Hamburger menu -->
    <aside v-show="showHamburgerMenu">
      <!-- Links -->
      <ul class="menu-list">
        <li v-for="link in navbar.links">
          <nuxt-link active-class="is-active"
                     :to="link.url"
                     :exact="link.exact"
                     @click.native="toggleHamburgerMenu">
            {{ link.text }}
          </nuxt-link>
        </li>
      </ul>

      <!-- Social -->
      <section class="columns is-multiline menu-label menu-social is-mobile">
        <a class="column is-narrow nav-item"
           v-for="site in navbar.social"
           target="_blank"
           rel="noopener noreferrer"
           :href="site.url"
           :key="site.url"
            @click="toggleHamburgerMenu">
          <i class="fa fa-3x"
             :class="'fa-' + site.icon"
             aria-hidden="true"></i>
        </a>
      </section>
    </aside>

    <nuxt :class="{ dim: showHamburgerMenu }" />
  </div>
</template>

<script>
// eslint-disable-next-line
import navbar from '~assets/navbar';

export default {
  data() {
    return {
      showHamburgerMenu: false,
      navbar,
    };
  },
  computed: {
    hamburgerClass() {
      return this.showHamburgerMenu ? 'fa-arrow-left' : 'fa-bars';
    },
  },
  methods: {
    toggleHamburgerMenu() {
      this.showHamburgerMenu = !this.showHamburgerMenu;
    },
  },
};
</script>

<style>
  .dim {
    position: relative
  }

  /* TODO: figure out better height method */
  .dim::after {
    content: " ";
    z-index: 10;
    display: block;
    position: absolute;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .menu-social {
    margin: 0.5em !important;
  }

  .menu-social a {
    padding: 0.2em;
    text-align: center;
  }
</style>
