<template>
    <form @submit.prevent="onsubmit()">
        <va-input
            v-model="name"
            type="text"
            :label="$t('auth.name')"
            :error="!!nameErrors.length"
            :error-messages="nameErrors"
        />

        <va-input
            v-model="surname"
            type="text"
            :label="$t('auth.surname')"
            :error="!!surnameErrors.length"
            :error-messages="surnameErrors"
        />

        <va-input
            v-model="email"
            type="email"
            :label="$t('auth.email')"
            :error="!!emailErrors.length"
            :error-messages="emailErrors"
        />

        <va-input
            v-model="password"
            type="password"
            :label="$t('auth.password')"
            :error="!!passwordErrors.length"
            :error-messages="passwordErrors"
        />

        <va-input
            v-model="confirmedPassword"
            type="password"
            :label="$t('auth.confirmed_password')"
            :error="!!confirmedPasswordError.length"
            :error-messages="confirmedPasswordError"
        />

        <div
            class="auth-layout__options d-flex align--center justify--space-between"
        >
            <router-link class="ml-1 link" :to="{ name: 'recover-password' }">{{
                $t("auth.recover_password")
            }}</router-link>
        </div>

        <div class="d-flex justify--center mt-3">
            <va-button type="submit" class="my-0">{{
                $t("auth.sign_up")
            }}</va-button>
        </div>
    </form>
</template>

<script>
let axios = require("axios");

export default {
    name: "signup",
    data() {
        return {
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmedPassword: "",
            emailErrors: [],
            passwordErrors: [],
            nameErrors: [],
            surnameErrors: [],
            confirmedPasswordError: []
        };
    },
    methods: {
        async onsubmit() {
            this.emailErrors = this.email ? [] : ["Email es requerido"];
            this.passwordErrors = this.password
                ? []
                : ["Contraseña es requerida"];
            this.nameErrors = this.name ? [] : ["Nombre requerido"];
            this.surnameErrors = this.surname ? [] : ["Apellido requerido"];

            if (!this.formReady) return;

            if (this.password.length < 4)
                return this.showToast(
                    "La contraseña debe ser mayor a 4 caracteres",
                    {
                        position: "bottom-right",
                        icon: "fa-times"
                    }
                );

            if (this.password != this.confirmedPassword)
                return this.showToast("Las contraseñas no coinciden", {
                    position: "bottom-right",
                    icon: "fa-times"
                });

            try {
                let response = await axios.post("/auth/register", {
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    password: this.password
                });

                this.showToast("Usuario registrado correctamente, por favor inicie sesión",
                {
                    position: "bottom-right",
                    icon: "fa-check",
                    duration: 5000
                }
            );

            this.$router.push({ name: "login" });

            } catch (error) {
                this.showToast(error.response.data.message, {
                    position: "bottom-right",
                    icon: "fa-times"
                });
            }
        }
    },
    computed: {
        formReady() {
            return !(this.emailErrors.length || this.passwordErrors.length);
        }
    }
};
</script>

<style lang="scss"></style>
