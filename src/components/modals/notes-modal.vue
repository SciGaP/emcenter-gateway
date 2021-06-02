<template>
  <b-modal :id="modalId" title="Notes" hide-footer>

    <div style="border: 2px dashed #212529; padding: 10px;">
      <b-media>
        <template #aside>
          <b-icon icon="folder"/>
        </template>
        <b>Collection-1</b>
        <div contenteditable="true">
          <p>Some notes</p>
        </div>

        <b-media>
          <template #aside>
            <b-icon icon="folder"/>
          </template>
            <b>Dataset-1</b>
          <div contenteditable="true">
            <p>Some notes</p>
          </div>
        </b-media>

        <b-media>
          <template #aside>
            <b-icon icon="folder"/>
          </template>
            <b>Dataset-2</b>
          <div contenteditable="true">
            <p>Some notes</p>
          </div>
        </b-media>
      </b-media>
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
    fileId: {},
    folderId: {}
  },
  store: store
}
</script>

<style scoped>

</style>