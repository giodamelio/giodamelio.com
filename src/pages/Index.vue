<template>
  <Layout>
    <h1 class="text-3xl">{{$page.pages.title}}</h1>
    <div v-html="$page.pages.content"></div>
  </Layout>
</template>

<page-query>
query {
  pages(path: "/content/pages/") {
    title
    content
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: ''
  }
}
</script>

<style>
</style>
