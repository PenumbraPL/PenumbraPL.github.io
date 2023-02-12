<script setup>
import {ref, onMounted, onBeforeMount } from "vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialAlert from "@/components/MaterialAlert.vue";
//import { emit } from "process";


defineProps({
  headers: {
    type: Array,
    default: () => ["A", "B", "C", "D", "E"],
  },
  rows: {
    type: Array,
    required: true,
    sender: String,
    resever: String,
    status: String,
    date: String,
    mass: Number,
    transport: Number,
    package_id: Number,
    package_of_transport_id: Number
  },
});

const items = ref({
  rows: []
})
const vehicles = ref({
  rows: []
})
const checkedPackages = ref([])

function updatePackage(e) {
	e.preventDefault()
  let data

  if(state.value === 'Nadano'){
    data = {
      sendMail : sendMail.value.punkt_id,
      reseveMail: reseveMail.value.punkt_id,
      vehicle: vehicle.value.pojazd_id,
      status: state.value,
      rows: checkedPackages.value
    }
    isNull.value = 0;
  }
  else{
    data = {
      status: state.value,
      rows: checkedPackages.value
    }
    isNull.value = checkedPackages.value.some(r => r[1] === null)
  }
  
  console.log(isNull.value)
  console.log(checkedPackages.value)

if(!isNull.value){
  const user = JSON.parse(localStorage.user)
  
  console.log(data)
  try{
	fetch('https://poczta-krakow-backend.azurewebsites.net/admin/update-package', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json',
          authorization: user.authorization
      }
	}).then((response) => {
        status.value = response.status
        console.log(response.status)
        //$emit('myRefresh')
    });
  } catch (err) {
      console.log(err)
    }
  }
}

async function getTransportData1() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('https://poczta-krakow-backend.azurewebsites.net/admin/mails', {
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

async function getTransportData2() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('https://poczta-krakow-backend.azurewebsites.net/admin/admin-vehicles', {
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


let status = ref(0)
let state = ref("")
let vehicle = ref(0)
let sendMail = ref(0)
let reseveMail = ref(0)
let isNull = ref(0)

function chooseSendMail(mail){
  sendMail.value = mail
  //vehicle.value = null
  vehicles.value.rows = getTransportData2()
}

function chooseReseveMail(mail){
  reseveMail.value = mail
}

function chooseVehicle(veh){
  vehicle.value = veh
}

function chooseState(status){
  state.value = status
}

function check(package_id, transport_id, checkbox){
  if(checkedPackages.value.some(r => r[0] === package_id && r[1] === transport_id)){
    const id = checkedPackages.value.find(r => r[0] === package_id && r[1] === transport_id)
    checkedPackages.value.splice(id, 1)
  }else{
    checkedPackages.value.push([package_id, transport_id])
  }
  checkbox = !checkbox
}

onBeforeMount(async () => {
  items.value.rows = await getTransportData1();
  vehicles.value.rows = await getTransportData2();
})

</script>
<template>
  <div class="container">
  <form  role="form" class="text-start" method="post" v-on:submit="updatePackage">
  <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-3">
            <MaterialButton variant="gradient" color="secondary" class="w-auto me-2">Aktualizuj status</MaterialButton>
        </div>

        <div class="col-3"
        v-show="state === 'Nadano'"
        >

          <div class="dropdown">
            <MaterialButton
              variant="gradient"
              color="success"
              class="dropdown-toggle"
              :class="{ show: showDropdown }"
              @focusout="showDropdown = false"
              id="dropdownMenuButton"
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
              <li v-for="vehicle in vehicles.rows" @click="chooseVehicle(  vehicle  )">
                  {{ vehicle.marka + ' ' + vehicle.model + ' ' + vehicle.rejestracja}}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-3"
        v-show="state === 'Nadano'"
        >
        <div class="dropdown">
            <MaterialButton
              variant="gradient"
              color="success"
              class="dropdown-toggle"
              @focusout="showDropdown = false"
              id="dropdownMenuButton"
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
              <li v-for="mail in items.rows" @click="chooseReseveMail(  mail  )">
                  {{ mail.nazwa }}
              </li>
            </ul>
          </div>
        </div>


        <div class="col-3"
        v-show="state === 'Nadano'"
        >
        <div class="dropdown">
            <MaterialButton
              variant="gradient"
              color="success"
              class="dropdown-toggle"
              :class="{ show: showDropdown }"
              @focusout="showDropdown = false"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              :area-expanded="showDropdown"
              @click="showDropdown = !showDropdown"
            >
              Poczta wysylkowa
            </MaterialButton>

            <ul
              class="dropdown-menu px-2 py-3"
              :class="{ show: showDropdown }"
              aria-labelledby="dropdownMenuButton"
            >
              <li v-for="mail in items.rows" @click="chooseSendMail(  mail  )">
                  {{ mail.nazwa }}
              </li>
            </ul>
          </div>
        </div>
      </div>


    <div class="row justify-space-between py-2">
        <div class="dropdown">
            <MaterialButton
              variant="gradient"
              color="success"
              class="dropdown-toggle"
              :class="{ show: showDropdown }"
              @focusout="showDropdown = false"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              :area-expanded="showDropdown"
              @click="showDropdown = !showDropdown"
            >
              Status
            </MaterialButton>

            <ul
              class="dropdown-menu px-2 py-3"
              :class="{ show: showDropdown }"
              aria-labelledby="dropdownMenuButton"
            >
              <li @click="chooseState('Dostarczono')">
                  Dostarczono
              </li>
              <li @click="chooseState('Odebrano')">
                  Odebrano
              </li>
              <li @click="chooseState('Nadano')">
                  Nadano
              </li>
              <li @click="chooseState('W trasie')">
                  W trasie
              </li>
            </ul>
          </div>
        </div>
  


    </div>


    
    <div 
    class="py-3 align-items-center row">
    <div class="col-sm-4">
      <p class="lead mb-0"> Status: {{ state }} </p>
    </div>
    </div>
    <div 
    class="py-3 align-items-center row"
    v-show="state === 'Nadano'">
    <div class="col-sm-4">
      <p class="lead mb-0"> Poczta wysylkowa: {{ sendMail.nazwa }} </p>
    </div>
    <div class="col-sm-4">
      <p class="lead mb-0"> Poczta docelowa: {{ reseveMail.nazwa }} </p>
    </div>
    <div class="col-sm-4">
      <p class="lead mb-0"> Pojazd: {{ vehicle.marka + ' ' + vehicle.model + ' ' + vehicle.rejestracja}}</p>
    </div>
      </div>


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
  <div class="form-label" v-if="isNull == 1" >
      <MaterialAlert color="danger" dismissible>
        Blad wprowadzanych danych - paczki zarejestrowane trzeba najpierw nadac
      </MaterialAlert>
  </div>

  <section class="pt-5">
    <div class="container">
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
                        sender,
                        resever,
                        status,
                        date,
                        mass,
                        transport,
                        package_id,
                        package_of_transport_id
                      },
                      index
                    ) of rows"
                    :key="index"
                  >
                  <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                           <MaterialCheckbox id="check"  @click="check(package_id, package_of_transport_id, checked)" /> 
                          </div>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-xs">{{ sender }}</h6>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">{{ resever }}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">{{ status == null ? 'Zarejestrowano' : status}}</p>
                      <p class="text-xs text-secondary mb-0">{{ date }}</p>
                    </td>
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">{{ transport }}</p>
                      <p class="text-xs font-weight mb-0">{{ mass }} kg</p>
                    </td>
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">{{ package_id }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </form>
  </div>
</template>
