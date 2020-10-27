<template>
    <div class="row">
        <div class="flex">
            <div class="flex">
                <va-input
                    label="Frecuencia minima (%)"
                    v-model="minPercentage"
                    v-on:keyup.enter="findArticles"
                    type="number"
                    min="1"
                    max="100"
                    class="input"
                >
                    <va-button
                        slot="append"
                        @click="findArticles"
                        style="margin-right: 10;"
                        small
                    >
                        Buscar
                    </va-button>
                </va-input>
            </div>
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
            minPercentage: 30,
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
                    { date: "01/03/2020", minPercentage: this.minPercentage }
                );

                if (!response.data) {
                    return this.showToast(
                        "No se pudo obtener la nube de palabras",
                        { position: "bottom-right", icon: "fa-times" }
                    );
                }

                this.words = response.data;

            } catch (error) {
                if (!error.response) {
                    return this.showToast("Error al obtener la nube de palabras", {
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

.input {
    width: 130%;
}
</style>
