<template>
    <va-card :titleOnImage="title.table">
        <div class="row align--center">
            <div class="flex xs12 md4">
                <va-input
                    :value="toSearch"
                    placeholder="Buscar..."
                    @input="search"
                >
                    <va-icon name="fa fa-search" slot="prepend" />
                </va-input>
            </div>
        </div>
        <va-data-table
            :fields="fields"
            :data="items"
            :no-data-label="title.noData"
            :loading="loading"
            :per-page="parseInt(perPage)"
            :totalPages="totalPages"
            @page-selected="readItems"
            api-mode
        >
            <template slot="actions" slot-scope="props">
                <va-button
                    flat
                    small
                    color
                    @click="view(props.rowData)"
                    class="ma-0"
                    >Ver detalle</va-button
                >
            </template>
        </va-data-table>
    </va-card>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            title: {
                table: "Listado de Articulos Normalizados",
                perPage: "Por Páginas",
                search: "Buscar por sitio",
                noData: "No se encontraron articulos normalizados."
            },
            toSearch: "",
            perPage: 10,
            totalPages: 0,
            items: [],
            loading: false,
            toSearch: null
        };
    },
    computed: {
        fields() {
            return [
                {
                    name: "id",
                    title: "ID"
                },
                {
                    name: "link",
                    title: "Link",
                    callback: this.formatLink
                },
                {
                    name: "wordcloud",
                    title: "Texto final",
                    callback: this.formatMessage
                },
                {
                    name: "article_id",
                    title: "ID articulo original"
                },
                {
                    name: "__slot:actions",
                    dataClass: "text-center"
                }
            ];
        }
    },
    created() {
        this.readItems();
    },
    methods: {
        search(toSearch) {
            this.toSearch = toSearch;
            this.readItems();
        },
        readItems(page = 1) {
            const params = {
                perPage: this.perPage,
                page: page,
                criteria: this.toSearch
            };

            axios.get("/normalizedArticles", { params }).then(response => {
                this.items = response.data.data;
                this.totalPages = response.data.lastPage;
                this.perPage = response.data.perPage;
            });
        },
        view(article) {
            this.$router.push({ name: "view-normalized-article", params: { id: article.id } });
        },
        formatLink(value = "") {
            return value.substring(0, 60);
        },
        formatMessage(value = "") {
            return value.substring(0, 100);
        },
        search(toSearch) {
            this.toSearch = toSearch;
            this.readItems();
        }
    }
};
</script>

<style lang="scss">
.data-table-server-pagination---avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>
