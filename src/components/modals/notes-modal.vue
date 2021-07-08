<template>
  <b-modal :id="modalId" title="Notes" hide-footer v-on:show="refreshData">

    <!--    <div style="border: 2px dashed #212529; padding: 10px;">-->
    <div>
      <b-textarea v-model="note"/>
      <div class="text-right pt-3">
        <b-button variant="primary" size="sm" v-on:click="saveNote">Save</b-button>
      </div>
      <!--      <b-media>-->
      <!--        &lt;!&ndash;        <template #aside>&ndash;&gt;-->
      <!--        &lt;!&ndash;          <b-icon icon="folder"/>&ndash;&gt;-->
      <!--        &lt;!&ndash;        </template>&ndash;&gt;-->
      <!--        <b>Bio Collection Group 1</b>-->
      <!--        <div contenteditable="true">-->
      <!--          <p>Some notes</p>-->
      <!--        </div>-->

      <!--        <b>Bio Collection Group 1/ Protein Dataset 1</b>-->
      <!--        <div contenteditable="true">-->
      <!--          <p>Some notes</p>-->
      <!--        </div>-->


      <!--        <b>Bio Collection Group 1/ Collection 1</b>-->
      <!--        <div contenteditable="true">-->
      <!--          <p>Some notes</p>-->
      <!--        </div>-->

      <!--        <b>Bio Collection Group 1/ Collection 1 / Dataset 1</b>-->
      <!--        <div contenteditable="true">-->
      <!--          <p>Some notes</p>-->
      <!--        </div>-->

      <!--        &lt;!&ndash;        <b-media>&ndash;&gt;-->
      <!--        &lt;!&ndash;          <template #aside>&ndash;&gt;-->
      <!--        &lt;!&ndash;            <b-icon icon="folder"/>&ndash;&gt;-->
      <!--        &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--        &lt;!&ndash;            <b>Dataset-1</b>&ndash;&gt;-->
      <!--        &lt;!&ndash;          <div contenteditable="true">&ndash;&gt;-->
      <!--        &lt;!&ndash;            <p>Some notes</p>&ndash;&gt;-->
      <!--        &lt;!&ndash;          </div>&ndash;&gt;-->
      <!--        &lt;!&ndash;        </b-media>&ndash;&gt;-->

      <!--        &lt;!&ndash;        <b-media>&ndash;&gt;-->
      <!--        &lt;!&ndash;          <template #aside>&ndash;&gt;-->
      <!--        &lt;!&ndash;            <b-icon icon="folder"/>&ndash;&gt;-->
      <!--        &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--        &lt;!&ndash;            <b>Dataset-2</b>&ndash;&gt;-->
      <!--        &lt;!&ndash;          <div contenteditable="true">&ndash;&gt;-->
      <!--        &lt;!&ndash;            <p>Some notes</p>&ndash;&gt;-->
      <!--        &lt;!&ndash;          </div>&ndash;&gt;-->
      <!--        &lt;!&ndash;        </b-media>&ndash;&gt;-->
      <!--      </b-media>-->
    </div>

  </b-modal>
</template>

<script>
import store from "@/store";

export default {
  name: "notes-modal",
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
      await this.$store.dispatch("emcResource/updateResource", {
        resourceId: this.resourceId,
        type: this.resource.type,
        name: this.resource.name,
        description: this.resource.description,
        note: this.note
      });
      this.$bvModal.hide(this.modalId);
      this.processing = false;
    },
    async refreshData() {
      await this.$store.dispatch("emcResource/fetchResource", {resourceId: this.resourceId});
      this.note = this.resource.note;
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