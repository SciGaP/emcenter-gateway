<template>
  <b-modal :id="modalId" size="sm" hide-footer title="Add to collection groups">
    <ul>
      <li v-for="collectionGroup in collectionGroups" :key="collectionGroup.resourceId">
        <b-checkbox type="checkbox" :checked="isCollectionGroupMapped[collectionGroup.resourceId] === true"
                    v-on:change="mapChildResource(collectionGroup)"
                    name="collectionGroup" :id="`collectionGroup-${collectionGroup.resourceId}`"/>
        <label :for="collectionGroup.resourceId">{{ collectionGroup.name }}</label>
      </li>
    </ul>
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

export default {
  name: "map-selected-files-and-folders-to-collection-groups-modal",
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
      processingMapChild: {},

      isCollectionGroupMapped: {}
    }
  },
  computed: {
    collectionGroups() {
      return this.$store.getters["emcResource/getResources"]({
        type: EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP
      });
    },
    childResources() {
      return this.resourceIds.map(resourceId => {
        return this.$store.getters["emcResource/getResource"]({resourceId});
      });
    }
  },
  methods: {
    async mapChildResource({resourceId, type}) {
      this.processingMapChild = {...this.processingMapChild, [resourceId]: true};

      try {
        await Promise.all(this.childResources.map(childResource => {
          return this.$store.dispatch("emcResource/mapChildResource", {
            parentResourceId: resourceId, parentResourceType: type,
            childResourceId: childResource.resourceId, childResourceType: childResource.type
          });
        }));
        this.isCollectionGroupMapped[resourceId] = true;
      } catch (error) {
        this.errors.push({
          title: `Unknown error when mapping to the collection group.`,
          source: error, variant: "danger"
        });
      }

      this.processingMapChild = {...this.processingMapChild, [resourceId]: false};
    }
  },
  beforeMount() {
    this.$store.dispatch("emcResource/fetchResources", {
      type: EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP
    });
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