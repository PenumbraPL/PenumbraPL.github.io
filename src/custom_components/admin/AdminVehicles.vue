<script setup>
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";

//example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/FooterDefault.vue";
import Header from "@/examples/Header.vue";

//images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";
import AdminVehiclesTable from "@/custom_components/admin/AdminVehiclesTable.vue";

// table data

const tableData= ref({
  headers: ["Id", "Lokalizacja", "Marka", "Model", "Udzwig", "Numer rejestracyjny"],
  rows: []
})

async function getTableData() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('https://poczta-krakow-backend.azurewebsites.net/admin-vehicles', {
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

//hooks
const body = document.getElementsByTagName("body")[0];

onBeforeMount(async () => {
  tableData.value.rows = await getTableData();
  console.log(tableData.value.rows)
})
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
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 me-2"
              :style="{ display: 'inline-block ' }"
            >
              Pojazdy
            </h1>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <!-- <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="row"><div class="col-6 col-md-4"></div>
    <div class="col-6 col-md-4">
      <h2 class="mb-0">Historia zamowien</h2>
    </div>
  </div> -->
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">

    <!-- <FetchData/> -->
    <AdminVehiclesTable v-bind="tableData" />
    <!-- <TrackTable/> -->

  </div>

  <DefaultFooter />
</template>
