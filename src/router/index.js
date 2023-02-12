import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/Presentation/PresentationView.vue";
import AboutView from "../views/LandingPages/AboutUs/AboutView.vue";
import AuthorView from "../views/LandingPages/Author/AuthorView.vue";
import SignInBasicView from "../custom_components/SignIn.vue";
import SignUpBasicView from "../custom_components/SignUp.vue";
import ShowPackageView from "../custom_components/ShowPackageStatus.vue"
import ManageMailView from "../custom_components/ManagePostalService.vue"
import RegisterPackageView from "../custom_components/RegisterPackage.vue"
import TrackPackagesView from "../custom_components/TrackPackages.vue"
import TrackTransportsView from "../custom_components/TrackTransports.vue"
import EmployeeSignInView from "../custom_components/EmployeeSignIn.vue"
import AdminPresentationView from "../custom_components/AdminPresentationView.vue"
import EmployeePresentationView from "../custom_components/EmployeePresentationView.vue"
import EmployeeSignUpView from "../custom_components/EmployeeSignUp.vue"
import AdminTrackPackagesView from "../custom_components/admin/AdminTrackPackages.vue"
import AdminSignInView from "../custom_components/AdminSignIn.vue";
import AdminUsersView from "../custom_components/admin/AdminUsers.vue"
import AdminVehiclesView from "../custom_components/admin/AdminVehicles.vue"
import AdminPackageView from "../custom_components/admin/AdminPackage.vue"
import AdminPackageStatusView from "../custom_components/admin/AdminShowPackageStatus.vue"
import AdminDeliveredPackagesView from "../custom_components/admin/AdminDelivered.vue"
import AdminTransportsView from "../custom_components/admin/AdminTransports.vue"
import AdminPackageTransportsView from "../custom_components/admin/AdminPackageTransports.vue"
import AdminMailsView from "../custom_components/admin/AdminMails.vue"
import AdminWorkersView from "../custom_components/admin/AdminWorkers.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "presentation",
      component: PresentationView,
    },
    {
      path: "/pages/landing-pages/author",
      name: "author",
      component: AuthorView,
    },
    {
      path: "/sign-in",
      name: "signin-basic",
      component: SignInBasicView,
    },
    {
      path: "/sign-up",
      name: "signup-basic",
      component: SignUpBasicView,
    },
    {
      path: "/profile",
      name: "profile",
      component: AboutView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/register-package",
      name: "register-package",
      component: RegisterPackageView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/track-package",
      name: "track-package",
      component: TrackPackagesView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin",
      name: "admin-presentation-page",
      component: AdminPresentationView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          const user = JSON.parse(localStorage.user)
          if(!user['isAdmin']){
            return {
              path: '/admin/admin-sign-in',
              query: { redirect: to.fullPath },
            }
          }
        }
      },
    },
    {
      path: "/admin/employee",
      name: "employee-presentation-page",
      component:     EmployeePresentationView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/admin-sign-in",
      name: "admin-sign-in",
      component: AdminSignInView,
    },
    {
      path: "/admin/sign-in",
      name: "employee-sign-in",
      component: EmployeeSignInView,
    },
    {
      path: "/admin/sign-up",
      name: "employee-sign-up",
      component: EmployeeSignUpView,
    },
    {
      path: "/admin/package-status",
      name: "package-status",
      component: ShowPackageView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/mail-service",
      name: "manage-mail-service",
      component: ManageMailView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/track-transports",
      name: "admin-track-transports",
      component: TrackTransportsView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/admin-track-package",
      name: "admin-track-package",
      component: AdminTrackPackagesView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/admin-users",
      name: "admin-users",
      component: AdminUsersView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/admin-vehicles",
      name: "admin-vehicles",
      component: AdminVehiclesView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/admin-packages",
      name: "admin-packages",
      component: AdminPackageView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/admin-package-status",
      name: "admin-package-status",
      component: AdminPackageStatusView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/admin-workers",
      name: "admin-workers",
      component: AdminWorkersView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/admin-transports",
      name: "admin-transports",
      component: AdminTransportsView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/admin-package-transports",
      name: "admin-package-transports",
      component: AdminPackageTransportsView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/admin-delivered-packages",
      name: "admin-delivered-packages",
      component: AdminDeliveredPackagesView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
    {
      path: "/admin/admin-mails",
      name: "admin-mails",
      component: AdminMailsView,
      beforeEnter: (to, from) => {
        if(!localStorage.user){
          return {
            path: '/admin/admin-sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
  ],
});

export default router;
