<script setup>
import {ref, onMounted, onBeforeMount } from "vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialAlert from "@/components/MaterialAlert.vue";


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
    package_id: Number
  },
});

const items = ref({
  rows: []
})
const checkedPackages = ref([])

function registerTransportPackage(e) {
	e.preventDefault()
  const data = {
    transport_id: trans.value.transport_id,
    status: "Nadano",
    rows: checkedPackages.value
  }
  const user = JSON.parse(localStorage.user)
  
  console.log(data)
  try{
	fetch('http://localhost:3001/admin/register-transport-packages', {
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

async function getTransportData() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('http://localhost:3001/admin/transports', {
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
let trans = ref(0)
let maxStorage = ref(0)
let weight = ref(0)
let checkbox = ref()

function chooseTransport(transport){
  trans.value = transport
}

function chooseState(status){
  state.value = status
}

function check(mass, package_id, checkbox){
  if(checkbox){
    weight.value += mass
  }
  if(checkedPackages.value.includes(package_id)){
    const id = checkedPackages.value.indexOf(package_id)
    checkedPackages.value.splice(id, 1)
  }else{
    checkedPackages.value.push(package_id)
  }
  checkbox = !checkbox
}

onBeforeMount(async () => {
  items.value.rows = await getTransportData();
})

</script>
<template>
  <div class="container">
  <form  role="form" class="text-start" method="post" v-on:submit="registerTransportPackage">
  <div class="container">
      <div class="row justify-space-between py-2">
        <div class="col-3">
            <MaterialButton variant="gradient" color="secondary" class="w-auto me-2">Dodaj paczki</MaterialButton>
        </div>

        <div class="col-3">

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
              Transport
            </MaterialButton>

            <ul
              class="dropdown-menu px-2 py-3"
              :class="{ show: showDropdown }"
              aria-labelledby="dropdownMenuButton"
            >
              <li v-for="transport in items.rows" @click="chooseTransport(  transport  )">
                  {{ transport.udzwig + 'kg ' + transport.nazwa }}
              </li>
            </ul>
          </div>
        </div>
        

        <div class="col-3">
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
              <li @click="chooseState('Przekazano')">
                  Przekazano
              </li>
              <li @click="chooseState('Zwrocono')">
                  Zwrocono
              </li>
            </ul>
          </div>
        </div>





      </div>
    </div>


    

    <div 
    class="py-3 align-items-center row"
    :class="{ show: ((trans != 0)) }">
    <div class="col-sm-4">
      <p class="lead mb-0"> Transport: {{ trans.pojazd }} </p>
    </div>
    <div class="col-sm-4">
      <p class="lead mb-0"> Max udzwig: {{ trans.udzwig }} </p>
    </div>
    <div class="col-sm-4">
      <p class="lead mb-0"> Waga: {{ weight }} </p>
    </div>
      </div>
      <div 
    class="py-3 align-items-center row"
    :class="{ show: ((state != 0)) }">
    <div class="col-sm-4">
      <p class="lead mb-0"> Status: {{ state }} </p>
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
                        package_id
                      },
                      index
                    ) of rows"
                    :key="index"
                  >
                  <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                           <MaterialCheckbox id="check"  @click="check(mass, package_id, checked)" /> 
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
                      <p class="text-xs font-weight-bold mb-0">{{ status }}</p>
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
