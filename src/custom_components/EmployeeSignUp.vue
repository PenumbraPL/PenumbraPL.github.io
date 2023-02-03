<script setup>
import { ref, onMounted } from "vue";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialAlert from "@/components/MaterialAlert.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});

let status = ref(0)
let statusMessage = ref('')

function signUp(e) {
	// console.log(e.target.elements.name.value)
  // console.log(e.target.name.value)
	e.preventDefault()
  status.value = 0

  if(e.target.elements.password.value !== e.target.elements.password2.value){
    status.value = 400
    statusMessage.value = 'Niepoprawne powtorzenie hasla';
    return
  }

  const mail = e.target.elements.mail.value == "" ? null : e.target.elements.mail.value
	const data = {
		name: e.target.elements.name.value,
		surname: e.target.elements.surname.value,
		email: e.target.elements.email.value,
    is_admin: e.target.elements.is_admin.value,
    mail,
    password: e.target.elements.password.value,
	}

	fetch('https://poczta-krakow-backend.azurewebsites.net/admin/sign-up', {
	method: 'POST',
	body: JSON.stringify(data),
  headers: {
          'Content-Type': 'application/json'
        }
	}).then((response) => {
        status.value = response.status
        if (status.value === 200)
          statusMessage.value = 'Dane zostaly wprowadzone poprawnie'
        else
          statusMessage.value = `Blad wprowadzanych danych - ${response.message}`
        console.log(response.status)
    })
}

</script>
<template>
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
          <div class="col-md-8 col-12 mx-auto">
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
                    Zarejestruj sie
                  </h4>
                </div>
              </div>
              <div class="card-body" id="signupRoot">
                <div class="form-label" v-if="status != 0 && status !== 200">
                    <MaterialAlert color="danger" dismissible>
                      {{statusMessage}}
                    </MaterialAlert>
                </div>
                <div class="form-label" v-if="status != 0 && status == 200">
                    <MaterialAlert color="success" dismissible>
                      {{ statusMessage }}
                    </MaterialAlert>
                </div>
                <form  role="form" class="text-start" method="post" v-on:submit.prevent="signUp">
		              <div class="row">
                    <div class="col">
                      <MaterialInput
                        id="name"
                        class="input-group-outline my-3"
                        :label="{ text: 'Imie', class: 'form-label' }"
                        type="text"
                        required
                      />
                      <MaterialInput
                        id="surname"
                        class="input-group-outline my-3"
                        :label="{ text: 'Nazwisko', class: 'form-label' }"
                        type="text"
                        required
                      />   
                      <MaterialInput
                        id="email"
                        class="input-group-outline my-3"
                        :label="{ text: 'Email', class: 'form-label' }"
                        type="email"
                      />
                    </div>
                    <div class="col">
                      <MaterialSwitch
                        class="d-flex align-items-center ps-6"
                        id="is_admin"
                        labelClass="ms-3 mb-0"
                      >
                        Czy jest administratorem ?
                      </MaterialSwitch> 
                      <MaterialInput
                        id="mail"
                        class="input-group-outline my-3"
                        :label="{ text: 'Numer poczty', class: 'form-label' }"
                        type="number"
                      />  
                    </div>
                    <div class="col">
                      <MaterialInput
                        id="password"
                        class="input-group-outline mb-3"
                        :label="{ text: 'Haslo', class: 'form-label' }"
                        type="password"
                      />
                      <MaterialInput
                        id="password2"
                        class="input-group-outline mb-3"
                        :label="{ text: 'Powtorz haslo', class: 'form-label' }"
                        type="password"
                      />
                    </div>
                  </div>
                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      fullWidth  
		                >
                    Zarejestruj sie
                  </MaterialButton>
                  </div>
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
