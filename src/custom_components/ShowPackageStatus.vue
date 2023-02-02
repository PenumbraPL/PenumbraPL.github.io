<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
import Header from "../examples/Header.vue";

import PresentationPages from "../views/Presentation/Sections/PresentationPages.vue";
import StatusTable from "./Tables/StatusTable.vue";

//images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";


async function getTableData() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('http://localhost:3001/admin/package-status', {
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


// table data
const tableData = ref({
  headers: ["", "Nadawca", "Odbiorca", "Status", "Dostawa", "ID Paczki"],
  rows: []
  // [
  //   {
  //     sender: "Alexa Liras",
  //     resever: "John Michael",
  //     status: "in transit", // color - waiting for send , waiting for reseve, in transit, reseved
  //     date: "23/04/18",
  //     mass: 20.00,
  //     transport: 1,
  //     curr_local: "Krakow"
  //   },
  // ],
});


onBeforeMount(async () => {
  tableData.value.rows = await getTableData();
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
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
              Status paczek
            </h1>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <StatusTable v-bind="tableData" />
  </div> 
  
  <DefaultFooter />
</template>
