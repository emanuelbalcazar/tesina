<template>
    <div class="">
        <h3>Nube de palabras</h3>
        <br />
        <div class="flex md2 sm2 xs2">
            <va-input
                label="Frecuencia minima"
                v-model="min"
                v-on:keyup.enter="findArticles"
                type="number"
            />
        </div>
        <div class="flex md3 sm3 xs6">
            <va-button color="success" type="button" @click="findArticles"
                >Buscar</va-button
            >
        </div>
        <cloud
            :data="words"
            :fontSizeMapper="fontSizeMapper"
            :onWordClick="onClick"
        />
    </div>
</template>

<script>
const axios = require("axios");
import Cloud from "vue-d3-cloud";

export default {
    name: "wordcloud",
    components: { Cloud },
    data() {
        return {
            min: 50,
            words: [],
            fontSizeMapper: word => word.value * 0.5
        };
    },
    created() {
        this.findArticles();
    },
    methods: {
        onClick(word) {
            alert(`Click en: ${word.text} - frecuencia: ${word.value}`);
        },
        async findArticles() {
            try {
                let response = await axios.post(
                    "/normalizedArticles/getWordCloud",
                    { date: "01/03/2020", min: this.min }
                );

                if (!response.data) {
                    return this.showToast(
                        "No se pudieron obtener las palabras de los articulos",
                        { position: "bottom-right", icon: "fa-times" }
                    );
                }

                this.words = response.data;
            } catch (error) {
                if (!error.response) {
                    return this.showToast("Error al obtener los articulos", {
                        position: "bottom-right",
                        icon: "fa-times"
                    });
                }
            }
        }
    }
};
</script>

<style lang="scss">
.row-equal .flex {
    .va-card {
        height: 100%;
    }
}
.dashboard {
    .va-card {
        margin-bottom: 0 !important;
    }
}
</style>
