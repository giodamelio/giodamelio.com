<template>
  <div class="flex flex-col">
    <!-- Navbar -->
    <header class="navbar">
      <div class="container mx-auto py-2">
        <!-- Site name -->
        <g-link
          to="/"
          exact-active-class="nop"
          active-class="nop"
          exact
          class="text-2xl font-medium pr-3"
          >{{ $static.metadata.siteName }}</g-link
        >

        <!-- Auto generate nav items from collection -->
        <nav class="inline align-baseline">
          <ul class="navitems">
            <li
              v-for="(page, index) in $static.navItems.edges"
              :class="{ 'border-solid': true, 'border-l': index !== 0 }"
            >
              <g-link :to="page.node.path" exact>{{ page.node.title }}</g-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main body -->
    <div class="container main-body">
      <slot />
    </div>
  </div>
</template>

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
.navbar {
  @apply flex-initial;

  // Add a little margin on small screens
  @apply pl-2;
  @screen md {
    @apply pl-0;
  }

  // Colors
  @apply bg-blue-500 text-white;
  @screen dark-mode {
    @apply bg-blue-900;
  }
}

ul.navitems {
  @apply inline;

  li {
    @apply inline px-1;
  }
}

.active {
  /* TODO: Make an active style */
  @apply underline;
}

.main-body {
  @apply mx-auto mt-3 flex-1;

  // Add a little margin on small screens
  @apply px-2;
  @screen md {
    @apply px-0;
  }
}
</style>
