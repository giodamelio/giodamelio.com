<template>
  <div>
    <!-- Navbar -->
    <header class="bg-blue-500 text-white">
      <div class="container mx-auto py-2">
        <g-link
          to="/"
          exact-active-class="nop"
          active-class="nop"
          exact
          class="text-2xl font-medium pr-3"
          >{{ $static.metadata.siteName }}</g-link
        >
        <nav class="inline align-baseline">
          <ul class="navitems">
            <li>
              <g-link to="/" exact class="nav-item">Home</g-link>
            </li>
            <li>
              <hr class="vertical" />
              <g-link to="/about/" exact class="nav-item">About</g-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main body -->
    <div class="container mx-auto mt-3">
      <slot />
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss" scoped>
.nav-item {
  @apply px-1;
}

hr.vertical {
  @apply inline border border-gray-400;
  width: 1px;
  height: 50%;
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
