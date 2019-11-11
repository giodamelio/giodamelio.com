<template>
  <div class="flex flex-col">
    <!-- Navbar -->
    <header class="wrapper">
      <div class="navbar container">
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
          class="hamburger-toggle pr-2"
          @click="hamburgerOpen = !hamburgerOpen"
          :open="hamburgerOpen"
        />
      </div>
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
  },
  methods: {
    closeHamburgerIfOpen() {
      if (this.hamburgerOpen) {
        this.hamburgerOpen = false;
      }
    }
  },

  // We have to do this hack to get click events from the entire document
  mounted() {
    document.addEventListener('click', this.closeHamburgerIfOpen);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeHamburgerIfOpen);
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
.wrapper {
  // Colors
  @apply bg-blue-500 text-white;
  @screen dark-mode {
    @apply bg-blue-900;
  }
}

.navbar {
  @apply flex-initial mx-auto py-2;

  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;

  // Add a little margin on small screens
  @apply pl-2;

  // Styles for bigger screens
  @screen md {
    // Unset the left padding
    @apply pl-0;

    grid-template-columns: auto 1fr;
  }
}

nav.navitems {
  @apply order-last;

  // Styles for bigger screens
  @screen md {
    // Make sure the items are left to right
    @apply inline order-none;

    // Add a bit of margin before the items
    @apply ml-2;
  }

  ul {
    li {
      @apply px-1 border-solid border-l text-lg cursor-pointer;

      // Apply the left borders to show the active page
      &.active {
        @apply border-l-4;
      }

      // Put the nav items next to each other in the navbar on larger screens
      @screen md {
        // Show the nav items inline on larger screens
        @apply inline;

        // Put the active indicator on the bottom
        &.active {
          @apply border-b;
        }
        &:not(.active) {
          @apply border-l-0;
        }

        // Remove all the left borders
        @apply border-l-0 #{!important};
      }
    }
  }
}

.hamburger-toggle {
  @screen md {
    @apply hidden;
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
