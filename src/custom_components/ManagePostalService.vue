<script setup>
import { ref, onMounted } from "vue";

// example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialAlert from "@/components/MaterialAlert.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
 
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";



onMounted(() => {
  setMaterialInput();
});

let status = ref(0)


function registerVehicle(e) {
	e.preventDefault()
const data = {
    mail_id: e.target.elements.mail_id.value,
    brand: e.target.elements.brand.value,
    model: e.target.elements.model.value,
    number_plate: e.target.elements.number_plate.value,
    max_mass: e.target.elements.max_mass.value,
  }
  const user = JSON.parse(localStorage.user)

  try{
	fetch('https://poczta-krakow-backend.azurewebsites.net/admin/register-vehicle', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json',
          authorization: user.authorization
      }
	}).then((response) => {
        status.value = response.status
        console.log(response.status)
    });
  } catch (err) {
      console.log(err)
    }
}

function registerMail(e) {
	e.preventDefault()

	const data = {
		name :  e.target.elements.name.value,
		place :  e.target.elements.place.value,
	}
  const user = JSON.parse(localStorage.user)

  try{
	fetch('https://poczta-krakow-backend.azurewebsites.net/admin/mails', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json',
          authorization: user.authorization
      }
	}).then((response) => {
        status.value = response.status
        console.log(response.status)
    });
  } catch (err) {
      console.log(err)
    }
}

</script>
<template>
 <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <Header>
    <div
      class="page-header min-vh-45"
      :style="`background-image: url(${vueMkHeader})`"
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 me-2"
              :style="{ display: 'inline-block ' }"
            >
              Zarzadzaj poczta
            </h1>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="form-label" v-if="status != 0 && status !== 200" dismissible>
        <MaterialAlert color="danger" >
          Blad wprowadzanych danych - dane nie zostaly wprowadzone do bazy
        </MaterialAlert>
    </div>
    <div class="form-label" v-if="status != 0 && status == 200" dismissible>
        <MaterialAlert color="success" >
          Dane zostaly wprowadzone poprawnie
        </MaterialAlert>
    </div>  
    <form  role="form" class="text-start" method="post" v-on:submit="registerMail">
      <div class="row">
        <div class="col-md-6 col-6 mx-auto">
          <MaterialInput
          id="name"
          class="input-group-outline my-3"
          :label="{ text: 'Nazwa', class: 'form-label' }"
          type="text"
          /> 
          <MaterialInput
          id="place"
          class="input-group-outline my-3"
          :label="{ text: 'Miejscowosc', class: 'form-label' }"
          type="text"
          />  
      </div>
    <div class="row">
      <div class="col-md-3 col-3 mx-auto">
        <MaterialButton
          class="my-4 mb-2"
          variant="gradient"
          color="success"
          fullWidth  
        >Dodaj poczte
        </MaterialButton>
      </div>
    </div>
      </div>
    </form>


    <!-- <form  role="form" class="text-start" method="post" v-on:submit="registerPackage">
      <div class="row">
        <div class="col-md-6 col-6 mx-auto">
          <MaterialInput
          id="email"
          class="input-group-outline my-3"
          :label="{ text: 'Email', class: 'form-label' }"
          type="email"
          />
      </div>
    <div class="row">
      <div class="col-md-3 col-3 mx-auto">
        <MaterialButton
          class="my-4 mb-2"
          variant="gradient"
          color="success"
          fullWidth  
        >Dodaj uzytkownika do admin
        </MaterialButton>
      </div>
    </div>
      </div>
    </form> -->



    
    <form  role="form" class="text-start" method="post" v-on:submit="registerVehicle">
      <div class="row">
        <div class="col-md-6 col-6 mx-auto">
          <MaterialInput
          id="brand"
          class="input-group-outline my-3"
          :label="{ text: 'Marka', class: 'form-label' }"
          type="text"
          />
          <MaterialInput
          id="model"
          class="input-group-outline my-3"
          :label="{ text: 'Model', class: 'form-label' }"
          type="text"
          />   
          <MaterialInput
          id="mail_id"
          class="input-group-outline my-3"
          :label="{ text: 'Poczta', class: 'form-label' }"
          type="number"
          />
          <MaterialInput
          id="number_plate"
          class="input-group-outline my-3"
          :label="{ text: 'Rejestracja pojazdu', class: 'form-label' }"
          type="text"
          />
          <MaterialInput
          id="max_mass"
          class="input-group-outline my-3"
          :label="{ text: 'Udźwig pojazdu', class: 'form-label' }"
          type="number"
          />        
      </div>
    </div>
      <div class="row">
      <div class="col-md-3 col-3 mx-auto">
        <MaterialButton
          class="my-4 mb-2"
          variant="gradient"
          color="success"
          fullWidth  
        >Dodaj pojazd do poczty
        </MaterialButton>
      </div>
    </div>
      <!-- </div> -->
    </form>
    </div>

  <DefaultFooter />
</template>
