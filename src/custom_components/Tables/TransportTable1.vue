<script setup>
import {ref, onMounted, onBeforeMount, getCurrentInstance } from "vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialAlert from "@/components/MaterialAlert.vue";


defineProps({
  headers: {
    type: Array,
    default: () => ["A", "B", "C", "D"],
  },
  rows: {
    type: Array,
    required: true,
    transport_id: Number,
    brand: String,
    model: String,
    number_plate: String,
    mail: String,
    status: String
  },
});


const status = ref(0)
const items = ref({
  rows: []
})
const mails = ref({
  rows: []
})


function registerTransport(e) {
	e.preventDefault()
const data = {
    mail_id: mail.value.punkt_id,
    vehicle_id: vehicle.value.pojazd_id,
  }
  const user = JSON.parse(localStorage.user)
  
  console.log(data)
  try{
	fetch('http://localhost:3001/admin/register-transport', {
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


async function getVehicleData() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('http://localhost:3001/admin/vehicles', {
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

async function getMailData() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('http://localhost:3001/admin/mails', {
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



onBeforeMount(async () => {
  items.value.rows = await getVehicleData();
  mails.value.rows = await getMailData();
  //console.log(items)
})



let mail = ref(0)
let vehicle = ref(0)
let checkbox = ref()

function chooseCar(car){
  vehicle.value = car
}

function chooseMail(point){
  mail.value = point
}

function check(transport_id, vehicle, destination){

}

</script>
<template>
  <section class="pt-5">
    <div class="container">
      


      <div class="container">
      <form  role="form" class="text-start" method="post" v-on:submit="registerTransport">
      <div class="row justify-space-between py-2">
        <div class="col-4">
            <MaterialButton variant="gradient" color="secondary" class="w-auto me-2">Dodaj transport</MaterialButton>
        </div>


        <div class="col-4">
        <!-- <div
          class="col-lg-4 ms-lg-auto col-md-6 col-sm-3 d-flex justify-content-center"
        > -->
          <div class="dropdown">
            <MaterialButton
              id="vehicle_id"
              variant="gradient"
              color="success"
              class="dropdown-toggle"
              :class="{ show: showDropdown }"
              @focusout="showDropdown = false"
              data-bs-toggle="dropdown"
              :area-expanded="showDropdown"
              @click="showDropdown = !showDropdown"
            >
              Pojazd
            </MaterialButton>

            <ul
              class="dropdown-menu px-2 py-3"
              :class="{ show: showDropdown }"
              aria-labelledby="dropdownMenuButton"
            >
              <li v-for="car in items.rows" @click="chooseCar(  car  )">
                  {{car.rejestracja + ' ' + car.marka + ' ' + car.model}}
                </li>
            </ul>
          </div>
        </div>
        
       


      <div class="col-4">
        <div class="dropdown">
            <MaterialButton
              id="mail_id"
              variant="gradient"
              color="success"
              class="dropdown-toggle"
              :class="{ show: showDropdown }"
              @focusout="showDropdown = false"
              data-bs-toggle="dropdown"
              :area-expanded="showDropdown"
              @click="showDropdown = !showDropdown"
            >
              Poczta docelowa
            </MaterialButton>

            <ul
              class="dropdown-menu px-2 py-3"
              :class="{ show: showDropdown }"
              aria-labelledby="dropdownMenuButton"
            >
            <li v-for="mail in mails.rows" @click="chooseMail(  mail  )">
                  {{ mail.nazwa }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
    </div>

    <div class="row justify-content-center">
    <div class="col-6">Pojazd: {{vehicle.rejestracja }}  {{vehicle.marka}}  {{vehicle.model}}</div>
    <div class="col-6">Poczta: {{mail.nazwa}}</div>
    </div>

    <div class="row justify-content-center">
        <p></p>
        <p class="lead mb-0"> Transporty nieobsłużone </p>
      </div>

      
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card">
            <div class="table-responsive">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      v-for="(header, index) in headers"
                      :key="header"
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      :class="{ 'ps-2': index == 1, 'text-center': index > 1 }"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      {
                        transport_id,
                        brand,
                        model,
                        number_plate,
                        mail,
                        status
                      },
                      index
                    ) of rows"
                    :key="index"
                  >
                    <!-- <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <MaterialCheckbox id="terms" v-model="checkbox" v-bind="check(transport_id, 'a', 'b')"/>
                        </div>
                      </div>
                    </td> -->
                    <td class="align-middle text-center">
                      <div class="d-flex flex-column justify-content-center">
                      <p class="text-xs font-weight-bold mb-0">{{ transport_id }}</p>
                    </div>
                      <!-- <p class="text-xs text-secondary mb-0">{{ delivered ? "Delivered" : "Not delivered" }}</p> -->
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-xs">{{ brand }}</h6>
                          <p class="text-xs text-secondary mb-0 max-width-100">
                            {{ model }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <!-- <span class="text-secondary text-xs font-weight-bold">{{
                        date
                      }}</span> -->
                      <div class="d-flex flex-column justify-content-center">
		                  <p class="text-xs font-weight-bold mb-0">{{ number_plate }}</p>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <div class="d-flex flex-column justify-content-center">
                      <p class="text-xs font-weight-bold mb-0">{{ mail }}</p>
                    </div>
                    </td>
                    <td class="align-middle text-center">
                      <div class="d-flex flex-column justify-content-center">
                      <p class="text-xs font-weight-bold mb-0">{{ status }}</p>
                    </div>
                    </td>
                    <!-- <td class="align-middle text-center">
                      <a
                        :href="route"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        {{ label }}
                      </a>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>




    </div>
  </section>
</template>
