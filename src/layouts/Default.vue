<template>
  <div class="flex flex-col">
    <!-- Navbar -->
    <header class="navbar container">
      <!-- Site name -->
      <g-link
        to="/"
        exact-active-class="nop"
        active-class="nop"
        exact
        class="text-2xl font-medium"
      >
        {{ $static.metadata.siteName }}
      </g-link>

      <!-- Auto generate nav items from collection -->
      <nav class="navitems" :class="{ hidden: !hamburgerOpen }">
        <ul>
          <g-link
            v-for="(page, index) in $static.navItems.edges"
            tag="li"
            :key="index"
            :to="page.node.path"
            exact
            >{{ page.node.title }}</g-link
          >
        </ul>
      </nav>

      <!-- Hamburger menu toggle -->
      <HamburgerMenu
        class="pr-2"
        @click="hamburgerOpen = !hamburgerOpen"
        :open="hamburgerOpen"
      />
    </header>

    <!-- Main body -->
    <div class="container main-body">
      <slot />
    </div>
  </div>
</template>

<script>
import HamburgerMenu from '~/components/hamburger-menu.vue';

export default {
  components: {
    HamburgerMenu
  },
  data() {
    return {
      hamburgerOpen: false
    };
  }
};
</script>

<static-query>
query {
  metadata {
    siteName
  }
  navItems: allStaticPage(sortBy: "order", order: ASC) {
    edges {
      node {
        path
        title
      }
    }
  }
}
</static-query>

<!-- Non scoped style to set some styles for the body -->
<style lang="scss">
body {
  @screen dark-mode {
    @apply bg-blue-800 text-white;
  }
}
</style>

<style lang="scss" scoped>
header.navbar {
  @apply flex-initial mx-auto py-2;

  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;

  // Add a little margin on small screens
  @apply pl-2;
  @screen xl {
    @apply pl-0;
  }

  // Colors
  @apply bg-blue-500 text-white;
  @screen dark-mode {
    @apply bg-blue-900;
  }
}

nav.navitems {
  @apply order-last;

  ul {
    li {
      @apply px-1 border-solid border-l text-lg;

      &.active {
        @apply border-l-4;
      }
      &:not(.active) {
        @apply pl-2;
      }
    }
  }
}

.main-body {
  @apply mx-auto pt-3 flex-1;

  // Add a little margin on small screens
  @apply px-2;
  @screen xl {
    @apply px-0;
  }
}
</style>
