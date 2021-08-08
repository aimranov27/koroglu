<template>
  <v-content class="back">
    <v-container class="login-container">
      <v-row dense justify="center">
        <v-col style="max-width: 140px;">
          <v-img
            src="../assets/vygon-logo.png"
            max-height="53"
            max-width="132"
          />
        </v-col>
      </v-row>
      <v-row dense class="text-uppercase display-2 mt-6">
        Смартэк
      </v-row>
      <v-form ref="loginForm" class="width-100p" @submit.stop="">
        <v-row dense>
          <s-login v-model="userLogin" />
          <s-password
            v-model="password"
            label="Пароль"
            :rules="passwordRules"
          />
        </v-row>
        <v-row dense justify="center" align="center">
          <v-alert type="error" v-model="error" dismissible>
            {{ errorMessage }}
          </v-alert>
          <v-alert type="error" v-model="secondaryAuthentication">
            В системе уже работает пользователь с такой учетной записью. Если вы
            нажмете "Все равно войти",то существующий сеанс будет прерван, при
            этом несохраненные данные будут потеряны.
          </v-alert>
          <v-btn
            v-if="secondaryAuthentication"
            type="submit"
            color="primary"
            block
            @click.stop.prevent="forceLogin"
          >
            Все равно войти
          </v-btn>
          <v-btn
            v-else
            type="submit"
            color="primary"
            block
            @click.stop.prevent="login"
          >
            Войти
          </v-btn>
        </v-row>
      </v-form>
      <v-row dense justify="center" align="center">
        <v-btn text small block color="primary" @click="forgotPassword"
          >Забыли пароль?</v-btn
        >
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import SPassword from "../components/LoginField";
import SLogin from "../components/PasswordField";
export default {
  name: "Login",
  components: { SLogin, SPassword },
  data: function () {
    return {
      userLogin: "",
      password: "",
      error: false,
      errorMessage: "",
      secondaryAuthentication: false,
      passwordRules: [(value) => !!value || "Укажите Ваш пароль"],
    };
  },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        let _this = this;
        this.$http
          .post(this.$endpoint.login, this.createFromData(), {
            errorHandle: false,
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((error) => {
            if (error.response && error.response.status === 406) {
              //Достигнуто максимальное количество допустимых сессий
              _this.secondaryAuthentication = true;
            } else if (error.response && error.response.status === 401) {
              _this.error = true;
              _this.errorMessage = "Указан не верный логин или пароль";
            } else if (error.response && error.response.status === 423) {
              _this.error = true;
              _this.errorMessage =
                "Ваша учетная запись заблокирована. Для разблокировки обратитесь к системному администратору.";
            } else {
              _this.error = true;
              _this.errorMessage =
                "Ошибка на стороне сервера. Попробуйте вовторить попытку позже.";
            }
          });
      }
    },
    forceLogin() {
      this.$http
        .post(this.$endpoint.forceLogin, this.createFromData())
        .then(() => {
          this.$router.push({ name: "Home" });
        });
    },
    forgotPassword() {
      this.$router.push({
        name: "ForgotPassword",
        params: { login: this.userLogin },
      });
    },
    createFromData() {
      let formData = new FormData();
      formData.set("username", this.userLogin);
      formData.set("password", this.password);
      return formData;
    },
  },
};
</script>

<style scoped>
.back {
  background-image: url("../assets/background.png");
  background-size: cover;
  background-position: 0 50%;
}

.login-container {
  max-width: 250px;
  position: absolute;
  left: 15%;
  top: 10%;
}
</style>
