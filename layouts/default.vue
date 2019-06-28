<template>
  <div class="container">
    <nav class="topnav">
      <ol>
        <li v-for="(item, key) of links" :key="key">
          <a v-if="item.url" :href="item.url">{{ item.text }}</a>
          <nuxt-link v-if="item.link" :to="item.link">
            {{ item.text }}
          </nuxt-link>
          -
        </li>
      </ol>
    </nav>
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          text: "Gio d'Amelio",
          url: 'https://giodamelio.com'
        },
        {
          text: 'Blog',
          link: '/blog'
        },
        {
          text: 'Style Text',
          link: '/style-test'
        }
      ],
      social: [
        {
          text: 'Github',
          url: 'https://github.com/giodamelio'
        },
        {
          text: 'LinkedIn',
          url: 'https://www.linkedin.com/in/giodamelio'
        }
      ]
    };
  }
};
</script>
