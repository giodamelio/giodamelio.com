<template>
  <Layout>
    <h1>{{$page.pages.title}}</h1>
    <div v-html="$page.pages.content"></div>
  </Layout>
</template>

<page-query>
query {
  pages(path: "/content/pages/about/") {
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
}
</script>
