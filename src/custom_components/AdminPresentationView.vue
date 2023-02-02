<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
import Header from "../examples/Header.vue";

import PresentationPages from "./AdminPresentationPages.vue";


//images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";

import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";


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
              class="text-white pt-3 me-2"
              :style="{ display: 'inline-block ' }"
            >
              Panel
            </h1>
            <p class="lead text-white px-5" :style="{ fontWeight: '500' }">
              Zacznij wysylac poczte z najlepsza firma kurierska w Krakowie.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <PresentationPages />


  </div> 
  <DefaultFooter />
</template>
