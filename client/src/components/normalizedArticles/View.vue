<template>
  <va-card>
    <div>
      <va-button color="info" class="button" @click="back()">Volver</va-button>
      <va-button color class="button" @click="openInNewTab(article)"
        >Ver original</va-button
      >
      <br />
      <br />
      ¿Se encuentra en una nube de palabras?:&nbsp;<b>{{
        article.in_wordcloud ? "Si" : "No"
      }}</b>
      <br />
      <br />
      <h2>{{ article.article.title }}</h2>
      <br />
      <b>Fecha de publicación:&nbsp;</b>{{ article.article.published }}
      <br />
      <br />
      <b>Sitio web:</b>&nbsp;{{ article.article.displayLink }}
      <br />
      <br />
      <b>Texto original:</b>
      <br />
      <p>{{ article.article.body }}</p>
      <br />
      <b>Texto normalizado:</b>
      <p>{{ article.wordcloud }}</p>
      <br />
    </div>
  </va-card>
</template>

<script>
import axios from "axios";
const moment = require("moment");

export default {
  data() {
    return {
      article: { article: { title: "" } },
    };
  },
  computed: {},
  created() {
    this.findById(this.$route.params.id);
  },
  methods: {
    async findById(id) {
      try {
        let response = await axios.get("/normalizedArticles/" + id);
        this.article = response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return this.showToast(error.response.data.error, {
            position: "bottom-right",
            icon: "fa-times",
            duration: 5000,
          });
        }
      }
    },
    openInNewTab(article) {
      let win = window.open(article.link, "_blank");
      win.focus();
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss"></style>
