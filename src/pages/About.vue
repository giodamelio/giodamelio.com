<template>
  <Layout>
    <h1>{{ $page.staticPage.title }}</h1>
    <div v-html="$page.staticPage.content"></div>
  </Layout>
</template>

<page-query>
query {
  staticPage(path: "/about") {
    title
    content
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'About'
  }
};
</script>
