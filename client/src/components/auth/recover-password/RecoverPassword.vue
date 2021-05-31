<template>
  <form @submit.prevent="onsubmit" class="login">
    <br />
    <div class="row mb-2">
      <va-input
        v-model="email"
        type="email"
        label="Ingrese su email"
        :error="!!emailErrors.length"
        :error-messages="emailErrors"
      />
    </div>
    <div class="row justify--center">
      <va-button type="submit" class="my-0">{{
        $t("auth.recover_password")
      }}</va-button>
    </div>
  </form>
</template>

<script>
let axios = require("axios");

export default {
  name: "recover-password",
  data() {
    return {
      email: "",
      emailErrors: [],
    };
  },
  methods: {
    async onsubmit() {
      this.emailErrors = this.email ? [] : ["Email es requerido"];

      if (this.emailErrors.length)
        return this.showToast("Ingrese su correo electronico", {
          position: "bottom-right",
          icon: "fa-times",
          duration: 5000,
        });

      let response = await axios
        .post("/auth/recover", { email: this.email })
        .catch((error) => {
          this.showToast("Usuario o contraseña invalidos", {
            position: "bottom-right",
            icon: "fa-times",
            duration: 5000,
          });
          return;
        });

      this.showToast("Contraseña restaurada, revise su correo electronico", {
        position: "bottom-right",
        icon: "fa-check",
      });

      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss">
</style>
