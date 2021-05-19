<template>
  <b-modal :id="id" title="Collection Group">
    <div>
      <label for="collection-group-name">Collection Group Name</label>
      <b-form-input id="collection-group-name" v-model="collectionGroupName"></b-form-input>
    </div>
    <template #modal-footer="{close}">
      <b-button size="sm" variant="outline-primary" v-on:click="close()">
        Cancel
      </b-button>
      <b-button size="sm" variant="primary" v-on:click="createNewCollectionGroup">
        Save
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import store from "../../store";

export default {
  name: "create-new-collection-group-modal",
  props: {
    id: {
      default: "modal-create-collection-group"
    }
  },
  store: store,
  data() {
    return {
      collectionGroupName: null
    }
  },
  methods: {
    createNewCollectionGroup() {
      this.$store.dispatch("emcCollectionGroup/createCollectionGroup", {name: this.collectionGroupName});
      this.$bvModal.hide(this.id);
      this.id = null;
    }
  }
}
</script>

<style scoped>

</style>