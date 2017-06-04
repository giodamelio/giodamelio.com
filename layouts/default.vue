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
        <nuxt-link class="nav-item"
                   v-for="link in navbar.links"
                   :to="link.url"
                   :key="link.url">
          {{ link.text }}
        </nuxt-link>
      </div>

      <div class="nav-right">
        <!-- Social -->
        <a class="nav-item"
           v-for="site in navbar.social"
           target="_blank"
           rel="noopener noreferrer"
           :href="site.url"
           :key="site.url">
          <i :class="'fa fa-2x fa-' + site.icon" aria-hidden="true"></i>
        </a>
      </div>
    </nav>

    <nuxt/>
  </div>
</template>

<script>
// eslint-disable-next-line
import navbar from '~assets/navbar';

export default {
  data() {
    return {
      navbar,
    };
  },
};
</script>

<style>
</style>
