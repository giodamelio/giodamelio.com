<template>
  <div class="flex flex-col">
    <!-- Navbar -->
    <header class="flex-initial bg-blue-500 text-white">
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
              <g-link :to="page.node.path" exact class="nav-item">{{
                page.node.title
              }}</g-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main body -->
    <div class="container mx-auto mt-3 flex-1">
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

<style lang="scss" scoped>
.nav-item {
  @apply px-1;
}

ul.navitems {
  @apply inline;

  li {
    @apply inline;
  }
}

.active {
  /* TODO: Make an active style */
  @apply underline;
}
</style>
