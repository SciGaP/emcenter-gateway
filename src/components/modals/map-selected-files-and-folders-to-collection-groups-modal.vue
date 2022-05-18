<template>
  <b-modal :id="modalId" size="sm" hide-footer title="Add to collection groups" v-on:show="refreshData">
    <PageErrors :errors="errors"/>
    <table-overlay-info :columns="1" :rows="5" :data="processing ? null : collectionGroups">
      <template #empty>No collection groups to be mapped. Please create one.</template>
      <ul>
        <li v-for="collectionGroup in collectionGroups" :key="collectionGroup.resourceId">
          <b-checkbox type="checkbox" :checked="isCollectionGroupMapped[collectionGroup.resourceId]"
                      v-on:change="mapChildResource(collectionGroup)"
                      name="collectionGroup" :id="`collectionGroup-${collectionGroup.resourceId}`"/>
          <label :for="collectionGroup.resourceId">{{ collectionGroup.name }}</label>
        </li>
      </ul>
    </table-overlay-info>
    <!--    <template #modal-footer="{close}">-->
    <!--      <b-button size="sm" variant="outline-primary" v-on:click="close()">-->
    <!--        Cancel-->
    <!--      </b-button>-->
    <!--      <b-button size="sm" variant="primary" v-on:click="close()">-->
    <!--        Save-->
    <!--      </b-button>-->
    <!--    </template>-->
  </b-modal>
</template>

<script>
import store from "../../store";
import EmcResource from "@/service/emc-service/emc-service-resource";
import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";
import PageErrors from "@/components/PageErrors";
// import ButtonOverlay from "airavata-custos-portal/src/lib/components/overlay/button-overlay";

export default {
  name: "map-selected-files-and-folders-to-collection-groups-modal",
  components: {PageErrors, TableOverlayInfo},
  store: store,
  props: {
    modalId: {
      default: ""
    },
    resourceIds: {
      default() {
        return []
      }
    },
  },
  data() {
    return {
      errors: [],
      processing: false,
      processingMapChild: {},

      isCollectionGroupMapped: {}
    }
  },
  computed: {
    collectionGroups() {
      let _collectionGroups = this.$store.getters["emcResource/getResources"]({
        type: EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP
      });

      if (_collectionGroups) {
        _collectionGroups = _collectionGroups.filter(({resourceId}) => {
          return this.resourceIds.indexOf(resourceId) < 0;
        });
      }

      return _collectionGroups
    },
    resources() {
      return this.resourceIds.map(resourceId => {
        return this.$store.getters["emcResource/getResource"]({resourceId});
      });
    },
    savedMappings() {
      const _savedMappings = {};

      for (let j = 0; this.collectionGroups && j < this.collectionGroups.length; j++) {
        const collectionGroup = this.collectionGroups[j];
        let mapped = this.resourceIds.length > 0;

        for (let i = 0; i < this.resourceIds.length; i++) {
          const parentResources = this.$store.getters["emcResource/getParentResources"]({resourceId: this.resourceIds[i]})

          let hasChildMapped = false;
          for (let j = 0; parentResources && j < parentResources.length; j++) {
            if (parentResources[j].resourceId === collectionGroup.resourceId) {
              hasChildMapped = true;
              break;
            }
          }

          mapped = mapped && hasChildMapped;
        }

        _savedMappings[collectionGroup.resourceId] = mapped;
      }

      return _savedMappings;
    }
  },
  methods: {
    async mapChildResource(collectionGroup) {
      this.processingMapChild = {...this.processingMapChild, [collectionGroup.resourceId]: true};

      try {
        if (this.isCollectionGroupMapped[collectionGroup.resourceId]) {
          await Promise.all(this.resources.map(childResource => {
            return this.$store.dispatch("emcResource/unmapChildResource", {
              parentResourceId: collectionGroup.resourceId, parentResourceType: collectionGroup.type,
              childResourceId: childResource.resourceId, childResourceType: childResource.type
            });
          }));
        } else {
          await Promise.all(this.resources.map(childResource => {
            return this.$store.dispatch("emcResource/mapChildResource", {
              parentResourceId: collectionGroup.resourceId, parentResourceType: collectionGroup.type,
              childResourceId: childResource.resourceId, childResourceType: childResource.type
            });
          }));
        }

      } catch (error) {

        // Rollback the state if the saving causes any error.
        this.isCollectionGroupMapped = {
          ...this.isCollectionGroupMapped,
          [collectionGroup.resourceId]: !this.isCollectionGroupMapped[collectionGroup.resourceId]
        };

        this.errors.push({
          title: "Unknown Error",
          description: `Unknown error when mapping to the collection group.`,
          source: error, variant: "danger"
        });
      }

      this.processingMapChild = {...this.processingMapChild, [collectionGroup.resourceId]: false};
    },
    async refreshData() {
      this.processing = true;

      try {
        await this.$store.dispatch("emcResource/fetchResources", {
          type: EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP
        });

        await Promise.all(this.resourceIds.map(resourceId => {
          this.$store.dispatch("emcResource/fetchParentResources", {
            resourceId: resourceId
          });
        }));
      } catch (e) {
        this.errors.push({
          variant: "danger",
          title: "Network Error",
          description: "Please contact the system administrator",
          source: e
        });
      }

      this.processing = false;
    }
  },
  watch: {
    savedMappings() {
      this.processing = true;

      this.isCollectionGroupMapped = {
        ...this.isCollectionGroupMapped,
        ...this.savedMappings,
      };

      this.processing = false;
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0px;
  padding: 10px;
}

ul li {
  display: flex;
  flex-direction: row;
}

ul li label {
  padding-left: 10px;
}
</style>