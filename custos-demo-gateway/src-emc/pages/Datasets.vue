<template>
  <b-container class="p-2">
    <b-row class="mb-3">
      <b-col>
        <h2>Datasets</h2>
      </b-col>
    </b-row>
    <b-row style="background-color: white; padding: 10px; border-radius: 10px;">
      <b-col>
        <label for="from-date">From</label>
        <b-form-datepicker size="sm" id="from-date" v-model="filter.fromDate"></b-form-datepicker>
      </b-col>
      <b-col>
        <label for="to-date">To</label>
        <b-form-datepicker size="sm" id="to-date" v-model="filter.toDate"></b-form-datepicker>
      </b-col>
      <b-col class="pt-4">
        <b-button size="sm">Apply</b-button>
      </b-col>
    </b-row>
    <b-row class="pt-4">
      <b-table striped hover small :items="items"></b-table>
    </b-row>
    <b-row>
      <b-col>
        <b-pagination :total-rows="100" size="sm"></b-pagination>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        Are you missing images or data collected? &nbsp; &nbsp; &nbsp;<a href="#">Email EMC Staff</a>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Datasets",
  data() {
    return {
      filter: {
        fromDate: "",
        toDate: ""
      },
      items: [
        {
          principleInvestigator: "Thomas",
          microscope: 'Microscope 1',
          collection: 'session 1',
          date: "10/23/2020 09:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Thomas",
          microscope: 'Microscope 1',
          collection: 'session 1 (1)',
          date: "10/23/2020 12:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Thomas",
          microscope: 'Microscope 2',
          collection: 'session 2',
          date: "10/23/2020 07:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Adam",
          microscope: 'Microscope 6',
          collection: 'session 1',
          date: "10/23/2020 15:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Thomas",
          microscope: 'Microscope 1',
          collection: 'session 1 (1)',
          date: "10/23/2020 12:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Thomas",
          microscope: 'Microscope 2',
          collection: 'session 2',
          date: "10/23/2020 07:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Adam",
          microscope: 'Microscope 6',
          collection: 'session 1',
          date: "10/23/2020 15:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Thomas",
          microscope: 'Microscope 1',
          collection: 'session 1 (1)',
          date: "10/23/2020 12:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Thomas",
          microscope: 'Microscope 2',
          collection: 'session 2',
          date: "10/23/2020 07:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Adam",
          microscope: 'Microscope 6',
          collection: 'session 1',
          date: "10/23/2020 15:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Thomas",
          microscope: 'Microscope 1',
          collection: 'session 1 (1)',
          date: "10/23/2020 12:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Thomas",
          microscope: 'Microscope 2',
          collection: 'session 2',
          date: "10/23/2020 07:00",
          status: "Accessed"
        },
        {
          principleInvestigator: "Adam",
          microscope: 'Microscope 6',
          collection: 'session 1',
          date: "10/23/2020 15:00",
          status: "Accessed"
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>