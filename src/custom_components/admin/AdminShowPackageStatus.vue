<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/FooterDefault.vue";
import Header from "@/examples/Header.vue";

//import PresentationPages from "../views/Presentation/Sections/PresentationPages.vue";
import AdminStatusTable from "@/custom_components/admin/AdminStatusTable.vue";

//images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";


async function getTableData() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('https://poczta-krakow-backend.azurewebsites.net/admin/admin-package-status', {
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

function myrefresh(){
  this.$forceUpdate();
}


// table data
const tableData = ref({
  headers: ["", "Nadawca", "Odbiorca", "Status", "Dostawa", "ID Paczki"],
  rows: []
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
    <AdminStatusTable v-bind="tableData" @my-refresh="myrefresh()"/>
  </div> 
  
  <DefaultFooter />
</template>
