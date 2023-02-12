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
    pracownik_id: Number,
    imie: String,
    nazwisko: String,
    admin: Boolean,
    punkt_pocztowy: Number,
    email: String,
    haslo: String
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
                        pracownik_id,
                        imie,
                        nazwisko,
                        admin,
                        punkt_pocztowy,
                        email,
                        haslo
                      },
                      index
                    ) of rows"
                    :key="index"
                  >
                    <td>
                      <div class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">{{ pracownik_id }}</p>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ imie }} {{ nazwisko }}</p>
                      <!-- <p class="text-xs text-secondary mb-0">{{ status }}</p> -->
                    </td>
                    <td class="align-middle text-center text-sm">
		                   <p class="text-xs font-weight-bold mb-0">{{ admin ? 'Tak' : 'Nie' }}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
		                  <p class="text-xs font-weight-bold mb-0">{{ punkt_pocztowy }}</p>
                    </td>
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">{{ email }}</p>
                    </td>
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">{{ haslo }}</p>
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
