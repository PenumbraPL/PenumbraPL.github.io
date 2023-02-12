<script setup>
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";

//example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/FooterDefault.vue";
import Header from "@/examples/Header.vue";

//images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";
import AdminMailTable from "@/custom_components/admin/AdminMailsTable.vue";

// table data

const tableData= ref({
  headers: ["Poczta_Id", "Nazwa", "Miejscowosc"],
  rows: []
})

async function getTableData() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('http://poczta-krakow-backend.azurewebsites.net/admin/admin-mails', {
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
              Poczty
            </h1>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <AdminMailTable v-bind="tableData" />
  </div>

  <DefaultFooter />
</template>
