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
        class="text-2xl font-medium flex-initial flex-shrink-0 flex-grow"
        >{{ $static.metadata.siteName }}</g-link
      >

      <!-- Auto generate nav items from collection -->
      <nav class="navitems order-last" :class="{ hidden: hamburgerHidden }">
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
      <a
        class="pr-2 inline-block align-middle flex-none"
        @click="hamburgerHidden = !hamburgerHidden"
      >
        <div class="hamburger-icon">
          <div class="middle"></div>
        </div>
      </a>
    </header>

    <!-- Main body -->
    <div class="container main-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hamburgerHidden: true
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

  // The navbars flexbox
  @apply flex flex-row flex-wrap flex-wrap;

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
  @apply flex-initial flex-grow-0 flex-shrink-0;

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

// Pure css hamburger menu
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

div.hamburger-icon div {
  border-radius: 3px;
  content: '';
  display: block;
  height: 4px;
  margin: 7px 0;
  transition: all 0.2s ease-in-out;

  // Colors
  @apply text-white bg-white;
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
