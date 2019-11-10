<template>
  <Layout>
    <h1 class="text-3xl">{{ $page.staticPage.title }}</h1>
    <div v-html="$page.staticPage.content"></div>
  </Layout>
</template>

<page-query>
query {
  staticPage(path: "/content/static-page/") {
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
};
</script>

<style></style>
