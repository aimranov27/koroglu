import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home";
import AdvertisingCampaigns from "../pages/AdvertisingCampaigns/AdvertisingCampaigns";
import CreateCampaignPage from "../pages/CreateCampaign/CreateCampaignPage";
// import userService from "../service/userService";


Vue.use(VueRouter);

const routes = [
  {
    name: 'Home',
    path: '/home',
    component: Home,
  },
  {
    name: 'AdvertisingCampaigns',
    path: '/advertising_campaigns',
    component: AdvertisingCampaigns,
  },
  {
    name: 'CreateCampaign',
    path: '/advertising_campaigns/create_campaign',
    component: CreateCampaignPage,
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.authRequired === false)) {
//     //Аутентификация не нужна
//     next();
//   } else {
//     //Аутентификация нужна.
//     //Проверим наличие пользака в store. Если его там нет, то попробуем получить.
//     if (store.state.user != null) {
//       next();
//     } else {
//       //Пользователя не оказалось. Попробуем его достать
//       userService
//         .getCurrentUser()
//         .then((user) => {
//           if (user == null) {
//             //Пользователя нет... считаем что и сесси нет
//             next({ name: "Login" });
//           } else {
//             //Все хорошо, сервер вернул текущего пользователя
//             store.commit("setUser", user);
//             if (user.temporaryPassword) {
//               //У пользователя временный пароль
//               next({ name: "ChangePassword" });
//             } else {
//               //Пароль постоянный -все хорошо
//               next();
//             }
//           }
//         })
//         .catch(() => {
//           //Что-то пошло не так
//           store.commit("clearUser");
//           next({ name: "Login" });
//         });
//     }
//   }
// });

export default router;
