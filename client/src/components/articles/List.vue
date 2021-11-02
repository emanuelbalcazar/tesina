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
                table: "Listado de Articulos",
                perPage: "Por Páginas",
                search: "Buscar por sitio",
                noData: "No se encontraron articulos."
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
                    name: "title",
                    title: "Titulo",
                    callback: this.formatMessage
                },
                {
                    name: "displayLink",
                    title: "Sitio"
                },
                {
                    name: "published",
                    title: "Publicado"
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

            axios.get("/articles", { params }).then(response => {
                this.items = response.data.data;
                this.totalPages = response.data.lastPage;
                this.perPage = response.data.perPage;
            });
        },
        openNewTab(article) {
            let win = window.open(article.link, "_blank");
            win.focus();
        },
        view(article) {
            this.$router.push({ name: "view-article", params: { id: article.id } });
        },
        formatMessage(value = "") {
            return value.substring(0, 50);
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
