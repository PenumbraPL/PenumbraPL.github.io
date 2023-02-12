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
    transport_id: Number,
    pojazd: Number,
    punkt_nadania: Number,
    punkt_odbioru: Number
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
                        transport_id,
                        pojazd,
                        punkt_nadania ,
                        punkt_odbioru
                      },
                      index
                    ) of rows"
                    :key="index"
                  >
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">{{ transport_id }}</p>
                      <!-- <p class="text-xs text-secondary mb-0">{{ status }}</p> -->
                    </td>
                    <td class="align-middle text-center text-sm">
		                   <p class="text-xs font-weight-bold mb-0">{{ pojazd }}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
		                  <p class="text-xs font-weight-bold mb-0">{{ punkt_nadania }}</p>
                    </td>
                    <td class="align-middle text-center">
                      <!-- <span class="text-secondary text-xs font-weight-bold">{{
                        date
                      }}</span> -->
		                  <p class="text-xs font-weight-bold mb-0">{{ punkt_odbioru }}</p>
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
