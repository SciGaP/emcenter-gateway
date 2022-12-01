<template>
  <Page :title="title" :breadcrumb-links="breadcrumbLinks" :errors="errors">
    <template #header-right>
      <router-link v-if="hasCollectionGroups" :to="createNewCollectionGroupLink" v-slot="{navigate}">
        <b-button variant="primary" @click="navigate">Create New Collection Group</b-button>
      </router-link>
      <router-link v-if="hasLabs" :to="createNewLabLink" v-slot="{navigate}">
        <b-button variant="primary" @click="navigate">Create New Lab</b-button>
      </router-link>
    </template>
    <div class="w-100">
      <div class="pr-3 pl-3" v-if="!parentResourceId">
        <b-form-input v-model="searchTyping" v-on:keydown.enter="onSearchEnter"/>
        <b-form-text v-if="!hasCollectionGroups">
          Metadata can be searched by inserting key values separated by commas. <br/>
          Eg:- microscope=emc123, angle=35
        </b-form-text>
      </div>

      <b-modal v-if="resources && resources[selectedResourceIndex]" id="resource-preview-modal" size="lg"
               :title="resources[selectedResourceIndex].name">
        <template #modal-footer>
          <div class="d-flex flex-row w-100">
            <div class="flex-fill" style="font-size: 12px; line-height: 27px;">
              Created at {{ getDateString(resources[selectedResourceIndex].createdAt) }}
            </div>
            <resource-actions :resource-id="resources[selectedResourceIndex].resourceId" :errors="errors"/>
          </div>
        </template>

        <Errors :errors="errors"/>

        <div>
          <b-carousel
              id="carousel-1"
              v-model="selectedResourceIndex"
              :interval="0"
              controls no-wrap
              indicators
              background="#ababab"
              style="text-shadow: 1px 1px 2px #333;"
          >
            <b-carousel-slide
                v-for="(resource, resourceIndex) in directoriesAndResources"
                :key="resourceIndex">
              <template #img>
                <div class="w-100 overflow-auto" style="height: 300px;">
                  <img
                      class="w-100" v-if="getResourceImageUrl(resource)"
                      :src="getResourceImageUrl(resource)"
                      :alt="resource.description"
                  >
                  <b-icon v-else-if="resource.type === 'FILE'" icon="card-image" aria-hidden="true"
                          class="w-100 h-100"></b-icon>
                </div>
              </template>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </b-modal>

      <table-overlay-info :rows="5" :columns="6" :data="directoriesAndResources">
        <template #empty>
          <div class="w-100 p-4 text-center">
            No Collections to show. It's empty.
          </div>
        </template>
        <b-table-simple class="w-100">
          <b-thead>
            <b-tr>
              <b-th>
                <!--                    <b-checkbox type="checkbox" name="all" id="all" :checked="isAllSelected()"-->
                <!--                                v-on:change="toggleAllSelection()"/>-->
                <!--                    <label for="all">Select all</label>-->
              </b-th>
              <b-th></b-th>
              <b-th>Name</b-th>
              <!--              <b-th>size</b-th>-->
              <b-th>Created On</b-th>
              <b-th>Last Updated</b-th>

              <template v-if="showPiColumn">
                <b-th v-if="hasCollectionGroups && !((hasCollections || hasDatasets))">Owner</b-th>
                <b-th v-else-if="!hasCollectionGroups && (hasCollections || hasDatasets)">PI</b-th>
                <b-th v-else>PI / Owner</b-th>
              </template>

              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(resource, resourceIndex) in directoriesAndResources"
                  :key="resourceIndex" :class="{selected: selectedResourceIndex === resourceIndex}"
                  v-on:click="selectedResourceIndex = resourceIndex">
              <b-td>
                <!--                    <b-checkbox type="checkbox" :checked="isFileSelected(file)"-->
                <!--                                v-on:change="toggleFileSelection(file)"-->
                <!--                                :name="getFileSelectionCheckboxId(file)" :id="getFileSelectionCheckboxId(file)"/>-->
                <!--                    <label :for="getFileSelectionCheckboxId(file)">{{ file.name }}</label>-->
              </b-td>
              <b-td>
                <div style="font-size: 25px;line-height: 25px;">
                  <img v-if="getResourceThumbnailUrl(resource)" :src="getResourceThumbnailUrl(resource)"
                       style="width: 24px; height: 24px;">
                  <b-icon v-else-if="resource.type === 'FILE'" icon="card-image" aria-hidden="true"
                          v-b-tooltip.hover="`Dataset`"></b-icon>
                  <b-icon v-else-if="resource.type === 'COLLECTION'" icon="folder" aria-hidden="true"
                          v-b-tooltip.hover="`Collection`"></b-icon>
                  <b-icon v-else-if="resource.type === 'COLLECTION_GROUP'" icon="folder-symlink"
                          aria-hidden="true" v-b-tooltip.hover="`Collection Group`"></b-icon>
                  <b-icon v-else-if="resource.type === 'LAB'" icon="box-seam"
                          aria-hidden="true" v-b-tooltip.hover="`Lab`"></b-icon>
                </div>
              </b-td>
              <b-td>
                <div style="flex: 1;" class="resource-name" :id="`resource-name-${resource.resourceId}`">
                  <div v-if="resource.type === 'FILE'">
                    <a href="#" v-b-tooltip.hover="resource.name"
                       v-b-modal="`resource-preview-modal`">
                      {{ resource.name }}
                    </a>
                  </div>
                  <router-link v-else :to="getResourceLink(resource)"
                               v-slot="{ href, route, navigate, isActive,isExactActive }">
                    <a style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;"
                       v-b-tooltip.hover="resource.name"
                       :class="{active: isExactActive}" :href="href" @click="navigate">
                      {{ resource.name }}
                    </a>
                  </router-link>
                </div>
              </b-td>
              <b-td style="font-size: 12px; line-height: 27px;">
                <template v-if="resource.createdAt">{{ getDateString(resource.createdAt) }}</template>
                <template v-else>-- -- -- -- -- --</template>
              </b-td>
              <b-td style="font-size: 12px; line-height: 27px;">
                <template v-if="resource.lastUpdatedAt">{{ getDateString(resource.lastUpdatedAt) }}</template>
                <template v-else>-- -- -- -- -- --</template>
              </b-td>
              <b-td v-if="showPiColumn">
                <block-tooltip-user :username="resource.createdBy">
                  {{ resource.createdBy }}
                </block-tooltip-user>
              </b-td>
              <b-td>
                <resource-actions v-if="!!resource.resourceId" :resource-id="resource.resourceId" :errors="errors"/>
              </b-td>
            </b-tr>

          </b-tbody>
        </b-table-simple>
      </table-overlay-info>

    </div>
  </Page>
</template>

<script>
import store from "../../store";
import Page from "../../components/Page";
import EmcResource from "@/service/emc-service/emc-service-resource";
import TableOverlayInfo from "airavata-custos-portal/src/lib/components/overlay/table-overlay-info";
import custosStore from "airavata-custos-portal/src/lib/store";
import BlockTooltipUser from "@/components/blocks/block-tooltip-user";
import ResourceActions from "@/pages/resource/resource-actions";
import Errors from "@/components/Errors";

export default {
  name: "resource-list",
  components: {
    Errors,
    ResourceActions,
    BlockTooltipUser, Page,
    TableOverlayInfo
  },
  data() {
    return {
      errors: [],

      searchTyping: "",
      search: "",
      defaultTypes: [
        EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION,
        EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_DATASET
      ],

      selectedResourceIndex: 0
    }
  },
  store: store,
  computed: {
    hasCollectionGroups() {
      return this.types.indexOf(EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) >= 0;
    },
    hasCollections() {
      return this.types.indexOf(EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION) >= 0;
    },
    hasDatasets() {
      return this.types.indexOf(EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_DATASET) >= 0;
    },
    hasLabs() {
      return this.types.indexOf(EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_LAB) >= 0;
    },
    searchQuery() {
      const _searchQuery = this.search.split(",").map(queryText => {
        const query = queryText.split("=");
        if (query.length === 1) {
          return {field: "resourceName", value: query[0].trim()};
        } else {
          return {field: query[0].trim(), value: query[1].trim()};
        }
      }).filter(({value}) => value && value.length > 0);

      if (this.sharedBy) {
        _searchQuery.push({field: "sharedBy", value: this.sharedBy});
      } else if (this.sharedWith) {
        _searchQuery.push({field: "sharedWith", value: this.sharedWith});
      }

      return _searchQuery;
    },
    types() {
      if (this.$route.query.types) {
        return this.$route.query.types.split(",").map(type => type.trim());
      } else {
        if (this.parentResource && this.parentResource.type === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) {
          return [...this.defaultTypes, EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP];
        } else {
          return this.defaultTypes;
        }
      }
    },
    sharedWith() {
      if (this.$route.query.sharedWithMe) {
        return this.currentUsername;
      } else {
        return null;
      }
    },
    sharedBy() {
      if (this.$route.query.sharedByMe) {
        return this.currentUsername;
      } else {
        return null;
      }
    },
    currentUsername() {
      return custosStore.getters["auth/currentUsername"];
    },
    createNewCollectionGroupLink() {
      return `/collections/new?type=${EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP}`;
    },
    createNewLabLink() {
      return `/collections/new?type=${EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_LAB}`;
    },
    title() {
      let _title = "Collections";

      if (this.parentResource && this.parentResource.type === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) {
        _title = "Collection Groups";
      } else if (this.types.length === 1) {
        if (this.types[0] === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) {
          _title = "Collection Groups";
        } else if (this.types[0] === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_LAB) {
          _title = "Labs";
        }
      }

      if (this.sharedBy) {
        _title = "Shared By Me"
      } else if (this.sharedWith) {
        _title = "Shared With Me"
      }

      return _title;
    },
    breadcrumbLinks() {
      let collectionsLink = '/collections';

      let queryParams = [];
      // if (this.sharedBy) {
      //   queryParams.push("sharedByMe=true");
      // } else if (this.sharedWith) {
      //   queryParams.push("sharedWithMe=true");
      // }

      if (this.parentResource && this.parentResource.type === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP) {
        queryParams.push(`types=${EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION_GROUP}`);
      } else if (this.types !== this.defaultTypes) {
        queryParams.push(`types=${this.types.join(",")}`);
      }

      if (queryParams.length > 0) {
        collectionsLink += `?${queryParams.join("&")}`
      }

      let _breadcrumbLinks = [{to: collectionsLink, name: this.title}]

      if (this.parentDirectory && this.parentDirectory.length > 0) {
        const parentDirectories = this.parentDirectory.replace(/^\//, "").replace(/\/$/, "").split("/")
        let nextParentDirectoryPath = "/";
        for (let i = 0; i < parentDirectories.length; i++) {
          nextParentDirectoryPath = `${nextParentDirectoryPath}${parentDirectories[i]}/`
          _breadcrumbLinks.push({
            to: `/collections?parentDirectory=${nextParentDirectoryPath}&${queryParams.join("&")}`,
            name: parentDirectories[i]
          });
        }
      }

      if (this.parentResourceId) {
        if (this.parentResourcePath) {
          for (let i = 0; i < this.parentResourcePath.length; i++) {
            _breadcrumbLinks.push({
              to: `/collections?parentResourceId=${this.parentResourcePath[i]}&${queryParams.join("&")}`,
              name: this.$store.getters["emcResource/getResource"]({resourceId: this.parentResourcePath[i]}).name
            });
          }
        }

        if (this.parentResource) {
          _breadcrumbLinks.push({
            to: `/collections?parentResourceId=${this.parentResource.resourceId}`,
            name: this.parentResource.name
          });
        }
      }

      return _breadcrumbLinks;
    },
    parentResourceId() {
      if (this.$route.query.parentResourceId) {
        return window.decodeURIComponent(this.$route.query.parentResourceId);
      } else {
        return null;
      }
    },
    rootDirectory() {
      return "/images/GatewayTests/workdir";
    },
    parentDirectory() {
      if (this.parentResourceId && this.parentResource) {

        let accessibleParentResourcePathStr = "";
        if (this.parentResourcePath && this.parentResourcePath.length > 0) {
          accessibleParentResourcePathStr = this.parentResourcePath.map(resourceId => {
            return this.$store.getters["emcResource/getResource"]({resourceId}).name;
          }).join("/") + "/";
        }

        let _parentDirectory = new RegExp(`${this.rootDirectory.replace(/\//, "\\/")}(\\/([^/]+\\/)*)${accessibleParentResourcePathStr}${this.parentResource.name}`).exec(this.parentResource.resourcePath);
        if (_parentDirectory && _parentDirectory.length > 1) {
          _parentDirectory = _parentDirectory[1];
          return _parentDirectory;
        }

        return null;

      } else if (this.$route.query.parentDirectory) {
        return window.decodeURIComponent(this.$route.query.parentDirectory)
      } else {
        return "/";
      }
    },
    parentResource() {
      return this.$store.getters["emcResource/getResource"]({resourceId: this.parentResourceId});
    },
    parentResourcePath() {
      return this.$store.getters["emcResource/getResourcePath"]({resourceId: this.parentResourceId});
    },
    directoriesAndResources() {
      let _directoriesAndResources;
      if (this.types.indexOf("COLLECTION_GROUP") >= 0) {
        _directoriesAndResources = this.resources;
      } else if (this.parentResourceId) {
        _directoriesAndResources = this.resources;
      } else {
        _directoriesAndResources = this.directories;
      }

      if (_directoriesAndResources) {
        _directoriesAndResources = _directoriesAndResources.sort((a, b) => b.lastUpdatedAt - a.lastUpdatedAt);
      }

      return _directoriesAndResources;
    },
    showPiColumn() {
      return this.parentDirectory !== "/";
    },
    directories() {
      if (this.resources && (this.sharedWith || this.sharedBy)) {
        return this.resources.map(resource => {
          let _directory = resource.resourcePath.replace(`${this.rootDirectory}${this.parentDirectory}`, "");
          return {...resource, name: _directory};
        });
      }

      if (!this.parentResourceId && this.resources) {
        const _directories = [];
        const _directoriesMap = {};

        this.resources.filter((resource) => {
          if (resource.resourcePath && resource.resourcePath.indexOf(`${this.rootDirectory}${this.parentDirectory}`) >= 0) {
            let _directory = resource.resourcePath.replace(`${this.rootDirectory}${this.parentDirectory}`, "");
            _directory = /^([^/]+)\/?.*$/.exec(_directory);
            if (_directory && _directory.length > 1) {
              _directory = _directory[1];

              let directoryExists = !!_directoriesMap[_directory];

              if (`${this.rootDirectory}${this.parentDirectory}${_directory}` === resource.resourcePath) {
                _directoriesMap[_directory] = resource;
              } else if (!directoryExists) {
                _directoriesMap[_directory] = {
                  name: _directory,
                  path: `${this.parentDirectory}${_directory}/`,
                  resourcePath: resource.resourcePath,
                  createdBy: resource.createdBy,
                  createdAt: resource.createdAt,
                  lastUpdatedAt: resource.lastUpdatedAt,
                  type: EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_COLLECTION
                }
              }

              if (!directoryExists) {
                _directories.push(_directory);
              } else {
                _directoriesMap[_directory].createdAt = Math.min(_directoriesMap[_directory].createdAt, resource.createdAt);
                _directoriesMap[_directory].lastUpdatedAt = Math.max(_directoriesMap[_directory].lastUpdatedAt, resource.lastUpdatedAt);
              }

            }
          }
        });

        return _directories.map(directory => _directoriesMap[directory]);
      } else {
        return null;
      }
    },
    resources() {
      let _resources = [];

      if (this.parentResourceId) {
        const list = this.$store.getters["emcResource/getResources"]({
          parentResourceId: this.parentResourceId,
          queries: this.searchQuery
        });

        if (list) {
          _resources = _resources.concat(list);
        } else {
          _resources = null;
        }
      } else {
        for (let i = 0; i < this.types.length; i++) {
          const type = this.types[i];
          const list = this.$store.getters["emcResource/getResources"]({
            parentResourceId: this.parentResourceId,
            type: type,
            queries: this.searchQuery
          });

          if (list) {
            _resources = _resources.concat(list);
          } else {
            _resources = null;
            break;
          }
        }
      }

      return _resources;
    }
  },
  methods: {
    getDateString(dateInt) {
      return new Date(dateInt).toLocaleString('en-US');
    },
    getResourceLink(resource) {
      let resourceLink;
      if (resource.resourceId) {
        resourceLink = `/collections?parentResourceId=${resource.resourceId}`;
      } else if (resource.path) {
        resourceLink = `/collections?parentDirectory=${resource.path}`;
      }

      // if (this.sharedBy) {
      //   resourceLink += `&sharedByMe=true`;
      // }
      //
      // if (this.sharedWith) {
      //   resourceLink += `&sharedWithMe=true`;
      // }

      return resourceLink;
    },
    onSearchEnter() {
      this.search = this.searchTyping;
    },
    async refreshData() {
      try {
        if (this.parentResourceId) {
          await Promise.all([
            this.$store.dispatch("emcResource/fetchResource", {resourceId: this.parentResourceId}),
            this.$store.dispatch("emcResource/fetchParentResources", {resourceId: this.parentResourceId})
          ]);

          await this.$store.dispatch("emcResource/fetchResources", {
            parentResourceId: this.parentResourceId,
            parentResourceType: this.parentResource.type,
            queries: this.searchQuery
          });
        } else {
          await Promise.all(this.types.map(type => this.$store.dispatch("emcResource/fetchResources", {
            parentResourceId: this.parentResourceId,
            type: type,
            queries: this.searchQuery
          })));
        }
      } catch (e) {
        this.errors.push({
          variant: "danger",
          title: "Network Error",
          description: "Please contact the system administrator.",
          source: e
        });
      }
    },
    getResourceThumbnailUrl({resourceId}) {
      const resource = this.$store.getters["emcResource/getResource"]({resourceId});
      if (resource) {
        return resource.thumbnail;
      }
    },
    getResourceImageUrl({resourceId}) {
      const resource = this.$store.getters["emcResource/getResource"]({resourceId});
      if (resource) {
        return resource.image;
      }
    }
  },
  watch: {
    parentResourceId() {
      this.searchTyping = "";
      this.search = "";
      this.refreshData();
    },
    sharedWith() {
      this.searchTyping = "";
      this.search = "";
    },
    sharedBy() {
      this.searchTyping = "";
      this.search = "";
    },
    types(a, b) {
      if (JSON.stringify(a) !== JSON.stringify(b)) {
        this.searchTyping = "";
        this.search = "";
      }
    },
    searchQuery(a, b) {
      if (JSON.stringify(a) !== JSON.stringify(b)) {
        this.refreshData();
      }
    },
    async resources() {
      if (this.resources) {
        try {
          // await Promise.all(this.resources.filter(({type}) => type === EmcResource.EMC_RESOURCE_TYPE.EMC_RESOURCE_TYPE_DATASET).map(resource => {
          //   return this.$store.dispatch("emcResource/fetchResourceMetadata", {
          //     resourceId: resource.resourceId,
          //     type: resource.type
          //   });
          // }));
        } catch (e) {
          // TODO
        }
      }
    },
    $route() {
      this.errors = [];
    }
  },
  beforeMount() {
    this.refreshData();
  }
}
</script>

<style scoped>
.selected,
table tbody tr.selected {
  background-color: #e9eff4;
}

table label {
  visibility: hidden;
  position: fixed;
  top: -100px;
}

div.resource-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

div.resource-name a {
  display: inline;
  padding-left: 5px;
  line-height: 24px;
}
</style>