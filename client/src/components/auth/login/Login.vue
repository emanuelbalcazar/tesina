<template>
    <form @submit.prevent="onsubmit">
        <va-input
            v-model="email"
            type="email"
            label="Email"
            :error="!!emailErrors.length"
            :error-messages="emailErrors"
        />

        <va-input
            v-model="password"
            type="password"
            label="Contraseña"
            :error="!!passwordErrors.length"
            :error-messages="passwordErrors"
        />

        <div
            class="auth-layout__options d-flex align--center justify--space-between"
        >
            <router-link class="ml-1 link" :to="{ name: 'recover-password' }">{{
                $t("auth.recover_password")
            }}</router-link>
        </div>

        <div class="d-flex justify--center mt-3">
            <va-button type="submit" class="my-0">Iniciar sesión</va-button>
        </div>
    </form>
</template>

<script>
const axios = require("axios");

export default {
    name: "login",
    data() {
        return {
            email: "",
            password: "",
            emailErrors: [],
            passwordErrors: [],
        };
    },
    computed: {
        formReady() {
            return !this.emailErrors.length && !this.passwordErrors.length;
        },
    },
    methods: {
        async onsubmit() {
            this.emailErrors = this.email ? [] : ["Email es requerido"];
            this.passwordErrors = this.password
                ? []
                : ["Contraseña es requerida"];

            if (!this.formReady) {
                return;
            }

            try {
                let response = await axios.post("/auth/login", {
                    email: this.email,
                    password: this.password,
                });

                if (response && response.data) {
                    this.$cookies.set("user", JSON.stringify(response.data.user));
                    this.$cookies.set("token", response.data.token);
                    this.$router.push("dashboard");

                    this.showToast("Bienvenido " + response.data.user.name, {
                        position: "bottom-right",
                        icon: "fa-check",
                    });
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    this.showToast(error.response.data.message, {
                        position: "bottom-right",
                        icon: "fa-times",
                    });
                } else {
                    this.showToast(
                        "No se pudo iniciar sesión debido a un error desconocido",
                        { position: "bottom-right", icon: "fa-times" }
                    );
                }
            }
        },
    },
};
</script>

<style lang="scss"></style>
