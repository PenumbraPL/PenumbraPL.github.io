<script setup>
import {onMounted, onBeforeMount } from "vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";
import MaterialButton from "@/components/MaterialButton.vue";

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
    date: String,
    mail: String,
    status: String
  },
});

</script>
<template>
  <section class="pt-5">
    <div class="container">

      <div class="row justify-content-center">
        <p class="lead mb-0"> Transporty obsłużone </p>
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
                        date,
                        mail,
                        status
                      },
                      index
                    ) of rows"
                    :key="index"
                  >
                    <td class="align-middle text-center text-sm">
		                    <p class="text-xs font-weight-bold mb-0">{{ transport_id }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0 justify-content-center">{{ brand }}</p>
                      <p class="text-xs text-secondary mb-0">{{ model }}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
		                    <p class="text-xs font-weight-bold mb-0">{{ number_plate }}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
		                    <p class="text-xs font-weight-bold mb-0">{{ date }}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
		                    <p class="text-xs font-weight-bold mb-0">{{ mail }}</p>
                    </td>
                    <td class="align-middle text-center">
		                  <p class="text-xs font-weight-bold mb-0">{{ status }}</p>
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
