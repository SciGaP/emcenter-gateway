<template>
  <b-container>
    <b-row>
      <b-col>
        <h2>Settings</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Users/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Groups/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Users from "@/components/workspace/Users";
import Groups from "@/components/workspace/Groups";

export default {
  name: "Settings",
  components: {Groups, Users}
}
</script>

<style scoped>

</style>