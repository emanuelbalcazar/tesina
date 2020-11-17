<template>
    <va-card>
        <div class="row">
            <div class="flex">
                <h3>Nube de palabras por fecha</h3>
                <div class="flex">
                    <VueDatePicker v-model="date" format="DD/MM/YYYY" />
                    <br>

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
                            style="margin-right: 0;"
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
    </va-card>
</template>

<script>
const axios = require("axios");
const moment = require("moment")
import Cloud from "vue-d3-cloud";

export default {
    name: "wordcloud",
    components: { Cloud },
    data() {
        return {
            minPercentage: 30,
            words: [],
            date: new Date(),
            fontSizeMapper: word => word.value * 0.6
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
                let dateToSearch = moment(this.date).format("DD/MM/YYYY");
                let response = await axios.get(`/wordcloud/byDate?date=${dateToSearch}&minPercentage=${this.minPercentage}`);

                if (!response.data) {
                    return this.showToast(
                        "No se pudo obtener la nube de palabras",
                        { position: "bottom-right", icon: "fa-times" }
                    );
                }

                this.words = response.data;
            } catch (error) {

                if (error.response && error.response.data) {
                    return this.showToast(error.response.data.error, {
                        position: "bottom-right",
                        icon: "fa-times",
                        duration: 5000
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
    width: 100%;
}
</style>
