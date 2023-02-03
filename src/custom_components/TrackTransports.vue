<script setup>
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";

//example components
import NavbarDefault from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
import Header from "../examples/Header.vue";

import PresentationPages from "../views/Presentation/Sections/PresentationPages.vue";


//images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";

import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import TransportTable1 from "@/custom_components/Tables/TransportTable1.vue";
import TransportTable2 from "@/custom_components/Tables/TransportTable2.vue";


async function getTable1Data() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('https://poczta-krakow-backend.azurewebsites.net/admin/track-transport', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.authorization
        },
    })
    return resp.json()
  } catch (err) {
    console.log(err)
  }
}

async function getTable2Data() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('https://poczta-krakow-backend.azurewebsites.net/admin/test-track-transport', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.authorization
        },
    })
    return resp.json()
  } catch (err) {
    console.log(err)
  }
}

async function refreshData() {
  tableData1.value.rows = await getTable1Data();
  tableData2.value.rows = await getTable2Data();
  this.$forceUpdate()
}

// table data
const tableData1= ref({
  headers: ["Numer transportu", "Pojazd", "Rejestracja", "Punkt nadania", "Status"],
  rows: []
})

const tableData2= ref({
  headers: ["Numer transportu", "Pojazd", "Rejesetracja", "Data", "Punkt odbioru", "Status"],
  rows: []
})


onBeforeMount(async () => {
  tableData1.value.rows = await getTable1Data();
  tableData2.value.rows = await getTable2Data();
})

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});
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
      loading="lazy">
    <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 me-2"
              :style="{ display: 'inline-block ' }"
            >
            Sledz transporty
            </h1>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <TransportTable1 v-bind="tableData1" @refresh="refreshData"/>
    <TransportTable2 v-bind="tableData2" />

  </div> 

  <DefaultFooter />
</template>
