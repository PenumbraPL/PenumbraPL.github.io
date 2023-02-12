<script setup>
import ExampleCard from "../views/Presentation/Components/ExampleCard.vue";

// images
import imgSigninCover from "@/assets/img/signin-cover.png";
</script>
<template>
  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
         <div class="row mt-4">
 
            <div class="col-md-3 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Paczki"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="admin-packages"
              />
              
            </div>
            <div class="col-md-3 mt-md-0 mt-5">
              <ExampleCard
                classes="mt-5"
                title="Pojazdy"
                :image="imgSigninCover"
                route="admin-vehicles"
              />
            </div>
            <div class="col-md-3 mt-md-0 mt-5">
              <ExampleCard
                classes="mt-5"
                title="Uzytkownicy"
                :image="imgSigninCover"
                route="admin-users"
              />
            </div>
            <div class="col-md-3 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Status paczek"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="admin-package-status"
              />
            </div>
          </div>   
          <div class="row mt-4">
            <div class="col-md-3 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Pracownicy"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="admin-workers"
              />
            </div>
            <div class="col-md-3 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Poczty"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="admin-mails"
              />
            </div>
            <div class="col-md-3 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Transporty"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="admin-transports"
              />
            </div>
            <div class="col-md-3 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Paczki Transportów"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="admin-package-transports"
              />
            </div>
            </div>
            <div class="row">
            <div class="col-md-3 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Paczki dostarczone"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="admin-delivered-packages"
              />
            </div>
            <!-- <div class="col-md-3 mt-md-0 mt-5">
            <ExampleCard
                class="shadow-lg"
                title="Status paczek"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/contact.jpg"
                route="package-status"
              /> 
            </div> -->
            <div class="col-md-3 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Zarzadaj poczta"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="manage-mail-service"
              />
            </div>
            <div class="col-md-3 mt-md-0 mt-5">
              <ExampleCard
                classes="shadow-lg"
                title="Wyświetl paczki"
                image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/pages/author.jpg"
                route="admin-track-package"
              />
            </div>
            </div>            
        </div>
        <div class="col-md-3 mx-auto mt-md-0 mt-3">
          <div class="position-sticky" style="top: 100px !important">
            <h3>
              Strona glowna dla wszystkich dostepnych funkcji dostępnych w usludze pocztowej
            </h3>
            <h6 class="text-secondary font-weight-normal">
              Funkcje dostepne w usludze pocztowej Krakowski-kurier
            </h6>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
