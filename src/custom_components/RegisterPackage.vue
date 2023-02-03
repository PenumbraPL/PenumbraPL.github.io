<script setup>
import { ref, onMounted } from "vue";

// example components
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialAlert from "@/components/MaterialAlert.vue";

//example components
import NavbarDefault from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";

//images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";

// material-input
import setMaterialInput from "@/assets/js/material-input";



onMounted(() => {
  setMaterialInput();
});

let status = ref(0)

async function registerPackage(e) {
	e.preventDefault()

	const data = {
		title :  e.target.elements.title.value,
		description :  e.target.elements.description.value,
		mass:  e.target.elements.mass.value,
		resever:  e.target.elements.resever.value,
    destination_point: e.target.elements.destination_point.value,
    source_point: e.target.elements.source_point.value
	}
  
  const user = JSON.parse(localStorage.user)
  console.log('abc: ', localStorage.user)
  
  try {
    await fetch('https://poczta-krakow-backend.azurewebsites.net/register-package', {
	    method: 'POST',
	    body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json',
          authorization: user.authorization
      }
	  }).then((response) => {
        status.value = response.status
        console.log(response.status)
    })
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
              Zarejestruj paczke
            </h1>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="form-label" v-if="status != 0 && status !== 200">
        <MaterialAlert color="danger" dismissible>
          Blad wprowadzanych danych - dane nie zostaly wprowadzone do bazy
        </MaterialAlert>
    </div>
    <div class="form-label" v-if="status != 0 && status == 200">
        <MaterialAlert color="success" dismissible>
          Dane zostaly wprowadzone poprawnie
        </MaterialAlert>
    </div>  
    <form  role="form" class="text-start" method="post" v-on:submit="registerPackage">
      <div class="row">
        <div class="col-md-6 col-6 mx-auto">
          <MaterialInput
          id="title"
          class="input-group-outline my-3"
          :label="{ text: 'Tytul', class: 'form-label' }"
          type="text"
          required
          />
          <MaterialInput
          id="description"
          class="input-group-outline my-3"
          :label="{ text: 'Opis', class: 'form-label' }"
          type="text"
          required
          />   
          <MaterialInput
          id="destination_point"
          class="input-group-outline my-3"
          :label="{ text: 'Poczta docelowa', class: 'form-label' }"
          type="number"
          />
          <MaterialInput
          id="source_point"
          class="input-group-outline my-3"
          :label="{ text: 'Poczta wysylkowa', class: 'form-label' }"
          type="number"
          />
          <MaterialInput
          id="mass"
          class="input-group-outline my-3"
          :label="{ text: 'Waga', class: 'form-label' }"
          type="number"
          />  
          <MaterialInput
          id="resever"
          class="input-group-outline my-3"
          :label="{ text: 'Odbiorca', class: 'form-label' }"
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
        >Zarejestruj
        </MaterialButton>
      </div>
    </div>
      </div>
    </form>
    </div>


  <DefaultFooter />
</template>
