<template>
  <b-modal :id="modalId" title="Notes" hide-footer v-on:show="refreshData">

    <PageErrors :errors="errors"/>

    <div>
      <b-textarea v-model="note"/>
      <div class="text-right pt-3">
        <b-button variant="primary" size="sm" v-on:click="saveNote">Save</b-button>
      </div>
    </div>

  </b-modal>
</template>

<script>
import store from "@/store";
import PageErrors from "@/components/PageErrors";

export default {
  name: "notes-modal",
  components: {PageErrors},
  props: {
    modalId: {
      default: "share-modal"
    },
    resourceId: {}
  },
  store: store,
  data() {
    return {
      errors: [],
      processing: false,

      note: "",
    }
  },
  computed: {
    resource() {
      return this.$store.getters["emcResource/getResource"]({resourceId: this.resourceId});
    }
  },
  methods: {
    async saveNote() {
      this.processing = true;
      try {
        await this.$store.dispatch("emcResource/updateResource", {
          resourceId: this.resourceId,
          type: this.resource.type,
          name: this.resource.name,
          description: this.resource.description,
          note: this.note
        });
        this.$bvModal.hide(this.modalId);
      } catch (e) {
        this.errors.push({
          variant: "danger",
          title: "Unknown Error",
          description: "Error when saving the resource note.",
          source: e
        });
      }

      this.processing = false;
    },
    async refreshData() {
      try {
        await this.$store.dispatch("emcResource/fetchResource", {resourceId: this.resourceId});
        this.note = this.resource.note;
      } catch (e) {
        this.errors.push({
          variant: "danger",
          title: "Network Error",
          description: "Please contact the system administrator",
          source: e
        });
      }
    }
  },
  watch: {
    resource() {
      this.note = this.resource.note;
    }
  }
}
</script>

<style scoped>

</style>