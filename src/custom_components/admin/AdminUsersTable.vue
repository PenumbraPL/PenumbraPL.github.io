<script setup>
import {onMounted, onBeforeMount } from "vue";

defineProps({
  headers: {
    type: Array,
    default: () => ["A", "B", "C", "D", "E", "F", "G", "H"],
  },
  rows: {
    type: Array,
    required: true,
    id: Number,
    forname: String,
    surname: String,
    date_of_birth: String,
    postal_code: String,
    phone_number: Number,
    email: String,
    password: String
  },
});

</script>
<template>
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
                        id,
                        forname,
                        surname,
                        date_of_birth,
                        postal_code,
                        phone_number,
                        email,
                        password
                      },
                      index
                    ) of rows"
                    :key="index"
                  >
                    <td>
                      <div class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">{{ id }}</p>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ forname }} {{ surname }}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
		                   <p class="text-xs font-weight-bold mb-0">{{ date_of_birth }}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
		                  <p class="text-xs font-weight-bold mb-0">{{ postal_code }}</p>
                    </td>
                    <td class="align-middle text-center">
                      <!-- <span class="text-secondary text-xs font-weight-bold">{{
                        date
                      }}</span> -->
		                  <p class="text-xs font-weight-bold mb-0">{{ phone_number }}</p>
                    </td>
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">{{ email }}</p>
                    </td>
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">{{ password }}</p>
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
</template>
