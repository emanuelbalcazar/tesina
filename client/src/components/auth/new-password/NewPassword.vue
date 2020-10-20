<template>
  <form @submit.prevent="onsubmit()">
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

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.new_password') }}</va-button>
    </div>
  </form>
</template>

<script>
let axios = require("axios");

export default {
  name: 'new-password',
  data () {
    return {
      newpassword: '',
      newpasswordErrors: [],
    }
  },
  methods: {
    async onsubmit () {
      this.newpasswordErrors = this.newpassword ? [] : ["Password requerido"];
     
      let response = await axios
        .post("/api/auth/reset", {
          newpassword: this.newpassword
        })
        .catch(error => {
          this.logError("Password incorrecto", {
            text: "Revise",
            href: "new-password"
          });
        });

      this.$cookies.set("token", response.data.access_token.token);
      // this.$cookies.set("userId", response.data.user.id);
      this.$cookies.set("password", response.data.user.password);
    },
   },
}

</script>

<style lang="scss">
</style>