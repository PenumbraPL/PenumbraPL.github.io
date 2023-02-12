<script setup>
import { ref, onMounted } from "vue";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialAlert from "@/components/MaterialAlert.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import router from "../router";
onMounted(() => {
  setMaterialInput();
});

let status = ref(200);

function signIn(e) {
	  e.preventDefault()

    const data = {
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
    }
    
    fetch('http://poczta-krakow-backend.azurewebsites.net/admin/admin-sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        status.value = response.status
        console.log(response.status)
        response.json()
          .then((user) => {
            localStorage.user = JSON.stringify({
              workerId: user.pracownikId,
              isAdmin: user.admin,
              authorization: 'Basic ' + window.btoa(data.email + ":" + data.password)
            })
            router.push("/admin")
          }).catch(err=>console.log(err))
    })
    ;
}


</script>
<template>
  <!-- <DefaultNavbar transparent /> -->
  <Header>
    <div
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)'
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
              >
                <div
                  class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                >
                  <h4
                    class="text-white font-weight-bolder text-center mt-2 mb-0"
                  >
                    Sign in
                  </h4>
                </div>
              </div>
              <div class="card-body">
                 <div class="form-label" v-if="status !== 200">
                  <MaterialAlert color="danger" dismissible>
                    Nieprawidlowy email lub haslo
                  </MaterialAlert>
                 </div> 
                <form role="form" class="text-start"  method="post" v-on:submit="signIn">
                  <MaterialInput
                    id="email"
                    class="input-group-outline my-3"
                    :label="{ text: 'Email', class: 'form-label' }"
                    type="email"
                  />
                  <MaterialInput
                    id="password"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Password', class: 'form-label' }"
                    type="password"
                  />
                  <MaterialSwitch
                    class="d-flex align-items-center mb-3"
                    id="rememberMe"
                    labelClass="mb-0 ms-3"
                    checked
                    >Remember me</MaterialSwitch
                  >

                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      fullWidth
                      >Sign in</MaterialButton
                    >
                  </div>
                  <p class="mt-4 text-sm text-center">
                    Don't have an account?
                    <a
                      href=".\sign-up"
                      class="text-success text-gradient font-weight-bold"
                      >Sign up</a
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer position-absolute bottom-2 py-2 w-100">
        <div class="container">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-12 col-md-6 my-auto">
              <div
                class="copyright text-center text-sm text-white text-lg-start"
              >
                Copyright 
                © {{ new Date().getFullYear() }}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </Header>
</template>
