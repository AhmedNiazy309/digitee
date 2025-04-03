<template>
  <Html>
    <Head>
      <Title>{{ title }}</Title>
      <!-- i18n SEO -->
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>

    <!-- font-Montserrat is added inside tailwind.config.js to be used as a class -->
    <Body class="font-Montserrat">
      <div class="layout-content">
        <!-- header -->
        <!-- <LayoutAppHeader /> -->

        <!-- page loading -->
        <!-- <PageLoading v-if="pageLoading" /> -->

        <main>
          <!-- page content -->

          <!-- lang -->
          <!-- <LayoutLang /> -->

          <!-- nav -->
          <!-- <LayoutNav /> -->
          <slot />
        </main>

        <!-- footer -->
        <!-- <LayoutAppFooter /> -->
      </div>
    </Body>
  </Html>
</template>

<script setup>
/*************** Plugins **************** */

/*************** DATA **************** */
const { t } = useI18n();
// route
const route = useRoute();

// page loading store
// const { pageLoading } = storeToRefs(usePageLoadingStore());

// locale head
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

// added to every page 'specially dynamic pages'
useSeoMeta({
  title: "My Amazing Site",
  ogTitle: "My Amazing Site",
  description: "This is my amazing site, let me tell you all about it.",
  ogDescription: "This is my amazing site, let me tell you all about it.",
  ogImage: "/icon-green.png", // from public folder
  twitterCard: "summary_large_image",
});

// title
const title = computed(() => {
  return t(route.meta.title ?? "") + " - " + t("head.title");
});
</script>

<style lang="scss" scoped>
.layout-content {
  @apply flex flex-col min-h-screen;

  main {
    @apply flex-1 ;
  }
}
</style>
