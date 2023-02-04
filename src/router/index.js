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
import UpdatePackageView from  "../custom_components/UpdatePackageStatus.vue"
import EmployeeSignInView from "../custom_components/EmployeeSignIn.vue"
import AdminPresentationViewView from "../custom_components/AdminPresentationView.vue"
import EmployeePresentationView from "../custom_components/EmployeePresentationView.vue"
import EmployeeSignUpView from "../custom_components/EmployeeSignUp.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "presentation",
      component: PresentationView,
    },
    // {
    //   path: "/pages/landing-pages/about-us",
    //   name: "about",
    //   component: AboutView,
    // },
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
    // {
    //   path: "/update-package",
    //   name: "update-package",
    //   component: UpdatePackageView,
    //   beforeEnter: (to, from) => {
    //     if(!localStorage.user){
    //       return {
    //         path: '/sign-in',
    //         query: { redirect: to.fullPath },
    //       }
    //     }
    //   },
    // },
    {
      path: "/admin",
      name: "admin-presentation-page",
      component: AdminPresentationViewView,
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
      path: "/admin/employee",
      name: "employee-presentation-page",
      component:     EmployeePresentationView,
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
      path: "/admin/sign-in",
      name: "admin-sign-in",
      component: EmployeeSignInView,
    },
    {
      path: "/admin/sign-up",
      name: "admin-sign-up",
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
            path: '/admin/sign-in',
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
            path: '/admin/sign-in',
            query: { redirect: to.fullPath },
          }
        }
      },
    },
  ],
});

export default router;
