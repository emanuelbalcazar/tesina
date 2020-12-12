<template>
    <div id="app" class="app">
        <div class="">
            <div class="loader" v-if="loading">
                <half-circle-spinner
                    :animation-duration="1000"
                    :size="60"
                    color="#ff1d5e"
                />
            </div>
        </div>

        <router-view />
    </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";

export default {
    name: "app",
    components: {
        HalfCircleSpinner
    },
    computed: {
        loading: function() {
            return this.$store.getters.isLoading;
        }
    }
};
</script>

<style lang="scss">
@import "../sass/main.scss";

body {
    height: 100%;

    #app {
        height: 100%;
    }
}

.loader {
    z-index: 9999;
    margin: auto;
    width: 50px;
    height: 50px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: wait;
}
</style>
