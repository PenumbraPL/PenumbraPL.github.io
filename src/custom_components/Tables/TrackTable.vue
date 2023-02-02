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
    title: String,
    description: String,
    mass: String,
    status: String,
    last_date_of_update: String,
    sender: String,
    resever: String,
    destination_point: Number
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
                        title,
                        description,
                        mass,
                        status,
                        last_date_of_update,
                        sender,
                        resever,
                        destination_point
                      },
                      index
                    ) of rows"
                    :key="index"
                  >
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-xs">{{ title }}</h6>
                          <p class="text-xs text-secondary mb-0 max-width-100">
                            {{ description.slice(0,50) }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ last_date_of_update }}</p>
                      <p class="text-xs text-secondary mb-0">{{ status }}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
		                   <p class="text-xs font-weight-bold mb-0">{{ sender }}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
		                  <p class="text-xs font-weight-bold mb-0">{{ resever }}</p>
                    </td>
                    <td class="align-middle text-center">
                      <!-- <span class="text-secondary text-xs font-weight-bold">{{
                        date
                      }}</span> -->
		                  <p class="text-xs font-weight-bold mb-0">{{ mass }} kg</p>
                    </td>
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">{{ destination_point }}</p>
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
