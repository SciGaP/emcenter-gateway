<template>
  <Page
      v-if="group" :title="group.name"
      :breadcrumb-links="breadcrumbLinks"
  >
    <div class="w-100">
      <div class="w-100">
        <label for="demo-1">Search</label>
        <input type="text" id="demo-1" aria-describedby="demo-1-note">
        <small id="demo-1-note" class="rvt-display-block">
          <a href="#" data-modal-trigger="modal-example-basic">Advanced search</a>
        </small>
      </div>

      <!--      <button type="button" class="rvt-button" data-modal-trigger="modal-example-basic">Open modal example</button>-->

      <div class="rvt-modal"
           id="modal-example-basic"
           role="dialog"
           aria-labelledby="modal-example-title"
           aria-hidden="true"
           tabindex=-1>
        <div class="rvt-modal__inner">
          <header class="rvt-modal__header">
            <h1 class="rvt-modal__title" id="modal-example-title">Advanced search</h1>
          </header>
          <div class="rvt-modal__body">
            <div>
              <label for="select-demo">Microscope</label>
              <select id="select-demo" multiple="true">
                <option value="Microscope 1">Microscope 1</option>
                <option value="Microscope 2">Microscope 2</option>
                <option value="Microscope 3">Microscope 3</option>
                <option value="Microscope 4">Microscope 4</option>
              </select>
            </div>
            <div>
              <label for="demo-1">Date</label>
              <input type="text" id="demo-1" aria-describedby="demo-1-note">
              <small id="demo-1-note" class="rvt-display-block rvt-m-bottom-md">Date range or a specific date</small>
            </div>
          </div>
          <div class="rvt-modal__controls">
            <button type="button" class="rvt-button">Search</button>
            <button type="button" class="rvt-button rvt-button--secondary" data-modal-close="modal-example-basic">
              Cancel
            </button>
          </div>
          <button type="button" class="rvt-button rvt-modal__close" data-modal-close="modal-example-basic">
            <span class="rvt-sr-only">Close</span>
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor"
                    d="M9.41,8l5.29-5.29a1,1,0,0,0-1.41-1.41L8,6.59,2.71,1.29A1,1,0,0,0,1.29,2.71L6.59,8,1.29,13.29a1,1,0,1,0,1.41,1.41L8,9.41l5.29,5.29a1,1,0,0,0,1.41-1.41Z"/>
            </svg>
          </button>
        </div>
      </div>


      <!--      <b-input-group size="sm">-->
      <!--        <b-form-input placeholder="Search" size="sm"></b-form-input>-->
      <!--        <b-input-group-append>-->
      <!--          <b-button v-b-modal.modal-1>-->
      <!--            <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon>-->
      <!--          </b-button>-->
      <!--        </b-input-group-append>-->
      <!--      </b-input-group>-->

      <!--      <b-modal id="modal-1" title="Search / Filter">-->
      <!--        <p class="my-4">Advanced searching/ filtering criteria. </p>-->
      <!--        <div>-->
      <!--          <strong>Microscope</strong>-->
      <!--          <ul style="list-style: none; padding: 0px;">-->
      <!--            <li v-for="microscope in ['IU Cardiac-MS1', 'IU-med-MS1', 'IU-med-MS2']" :key="microscope">-->
      <!--              <b-form-checkbox-->
      <!--                  :id="`checkbox-group-user-${microscope}`"-->
      <!--                  :name="`checkbox-group-user-${microscope}`"-->
      <!--                  :checked="true"-->
      <!--              >-->
      <!--                {{ microscope }}-->
      <!--              </b-form-checkbox>-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </div>-->
      <!--        <template slot="modal-footer">-->
      <!--          <b-button>Search</b-button>-->
      <!--        </template>-->
      <!--      </b-modal>-->
    </div>

    <div class="w-100">

      <div class="w-100 mt-2" style="display: flex; flex-direction: row;display: inline-flex;align-items: center;">
        <div style="flex: 1;">
          <span v-if="numberOfFoldersSelected > 0">
            {{ numberOfFoldersSelected }} folder(s)
          </span>
          <span v-if="numberOfFoldersSelected > 0 && numberOfFilesSelected > 0">
            {{ numberOfFoldersSelected }} folder(s)
          </span>
          <span v-if="numberOfFilesSelected > 0">
            {{ numberOfFilesSelected }} file(s)
          </span>
          <span v-if="numberOfFoldersSelected > 0 || numberOfFilesSelected > 0">
            selected
          </span>
        </div>
        <div class="text-right">
          <button type="button" class="rvt-button rvt-button--plain" v-if="hasAnythingSelected()">
            Download
          </button>
          <button type="button" class="rvt-button rvt-button--plain" v-if="hasAnythingSelected()">
            Share
          </button>
          <button type="button" class="rvt-button rvt-button--plain" v-if="hasAnythingSelected()">
            History
          </button>
          <button type="button" class="rvt-button" :class="{'rvt-button--secondary': displayMode !== 'list'}"
                  v-on:click="switchDisplayMode('list')">
            <b-icon icon="list" aria-hidden="true"></b-icon>
          </button>
          <button type="button" class="ml-2 rvt-button" :class="{'rvt-button--secondary': displayMode !== 'grid'}"
                  v-on:click="switchDisplayMode('grid')">
            <b-icon icon="grid" aria-hidden="true"></b-icon>
          </button>
        </div>
      </div>


      <div class="w-100 pt-4"></div>

      <div class="w-100" style="display: flex;flex-direction: row;">
        <div v-if="displayMode === 'grid'">
          <input type="checkbox" name="all-grid" id="all-grid" :checked="isAllSelected()"
                 v-on:click="toggleAllSelection()"/>
          <label for="all-grid" class="rvt-m-right-sm">Select All</label>
        </div>
        <!--        <div>-->
        <!--          <span v-if="numberOfFoldersSelected > 0">-->
        <!--            {{ numberOfFoldersSelected }} folder(s)-->
        <!--          </span>-->
        <!--          <span v-if="numberOfFoldersSelected > 0 && numberOfFilesSelected > 0">-->
        <!--            {{ numberOfFoldersSelected }} folder(s)-->
        <!--          </span>-->
        <!--          <span v-if="numberOfFilesSelected > 0">-->
        <!--            {{ numberOfFilesSelected }} file(s)-->
        <!--          </span>-->
        <!--          <span v-if="numberOfFoldersSelected > 0 || numberOfFilesSelected > 0">-->
        <!--            selected-->
        <!--          </span>-->
        <!--        </div>-->
      </div>

      <b-row v-if="displayMode === 'grid'">
        <b-col style="min-width: 300px;max-width: 300px;padding: 5px;" v-for="folder in folders" :key="folder.folderId">
          <div class="w-100" style="border-radius: 10px;border: 1px solid #aaa;padding: 10px; display: flex;"
               :class="{selected: isFolderSelected(folder)}">
            <div>
              <input type="checkbox" :checked="isFolderSelected(folder)" v-on:click="toggleFolderSelection(folder)"
                     :name="getFolderSelectionCheckboxId(folder)" :id="getFolderSelectionCheckboxId(folder)"/>
              <label :for="getFolderSelectionCheckboxId(folder)" class="rvt-m-right-sm"
                     style="margin: 0px !important;"></label>
            </div>
            <div style="flex: 1;">
              <b-icon icon="folder-fill" aria-hidden="true"></b-icon>
              <button :for="getFolderSelectionCheckboxId(folder)"
                      class="rvt-button rvt-button--plain rvt-button--small">
                {{ folder.name }}
              </button>
              <!--                <button  :for="getFileSelectionCheckboxId(file)" type="button" class="btn btn-link p-1">{{ file.name }}</button>-->
            </div>
            <div>
              <button class="rvt-button rvt-button--plain rvt-button--small">
                <b-icon icon="share-fill"></b-icon>
              </button>
              <button class="rvt-button rvt-button--plain rvt-button--small">
                <b-icon icon="pencil"></b-icon>
              </button>
              <button class="rvt-button rvt-button--plain rvt-button--small">
                <b-icon icon="download"></b-icon>
              </button>
            </div>
          </div>
          <!--          <a>-->
          <!--            <b-icon icon="folder-fill" aria-hidden="true"></b-icon>-->
          <!--            <div style="display: inline; padding-left: 5px;">{{ folder.name }}</div>-->
          <!--          </a>-->
          <!--          <div class="w-100" style="border-radius: 10px;border: 1px solid #aaa;padding: 15px"-->
          <!--               :class="{selected: isFolderSelected(folder)}">-->
          <!--            <div class="w-100" style="display: flex; flex-direction: row">-->
          <!--              <div>-->
          <!--                <input type="checkbox" :checked="isFolderSelected(folder)" v-on:click="toggleFolderSelection(folder)"-->
          <!--                       :name="getFolderSelectionCheckboxId(folder)" :id="getFolderSelectionCheckboxId(folder)"/>-->
          <!--                <label :for="getFolderSelectionCheckboxId(folder)" class="rvt-m-right-sm"-->
          <!--                       style="margin: 0px !important;"></label>-->
          <!--              </div>-->
          <!--              <div style="flex: 1;">-->
          <!--                <button :for="getFolderSelectionCheckboxId(folder)" class="rvt-button rvt-button&#45;&#45;plain rvt-button&#45;&#45;small">-->
          <!--                  {{ file.name }}-->
          <!--                </button>-->
          <!--                &lt;!&ndash;                <button  :for="getFileSelectionCheckboxId(file)" type="button" class="btn btn-link p-1">{{ file.name }}</button>&ndash;&gt;-->
          <!--              </div>-->
          <!--              <div>-->
          <!--                <button class="rvt-button rvt-button&#45;&#45;plain rvt-button&#45;&#45;small">-->
          <!--                  <b-icon icon="share-fill"></b-icon>-->
          <!--                </button>-->
          <!--&lt;!&ndash;                <button class="rvt-button rvt-button&#45;&#45;plain rvt-button&#45;&#45;small">&ndash;&gt;-->
          <!--&lt;!&ndash;                  <b-icon icon="pencil"></b-icon>&ndash;&gt;-->
          <!--&lt;!&ndash;                </button>&ndash;&gt;-->
          <!--                <button class="rvt-button rvt-button&#45;&#45;plain rvt-button&#45;&#45;small">-->
          <!--                  <b-icon icon="download"></b-icon>-->
          <!--                </button>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="w-100 text-center"-->
          <!--                 style="font-size: 10px;height: 180px;overflow: hidden; display: flex; flex-direction: column;">-->
          <!--              &lt;!&ndash;              <div style="flex: 1;"></div>&ndash;&gt;-->
          <!--              &lt;!&ndash;            <img width="100%" :src="thumbnailDataUrl"/>&ndash;&gt;-->
          <!--              <b-icon icon="folder-fill" style="width: 100%; height: 100%;"></b-icon>-->
          <!--            </div>-->
          <!--            &lt;!&ndash;            <div class="w-100" style="display: flex;">&ndash;&gt;-->
          <!--            &lt;!&ndash;              <div style="flex: 1;">Microscope 1</div>&ndash;&gt;-->
          <!--            &lt;!&ndash;              <div>2MB</div>&ndash;&gt;-->
          <!--            &lt;!&ndash;            </div>&ndash;&gt;-->
          <!--          </div>-->
        </b-col>
        <div class="w-100 pt-5"></div>
        <b-col style="min-width: 300px;max-width: 300px;padding: 5px;"
               v-for="file in files" :key="file.fileId">
          <!--          <a>-->
          <!--            <b-icon icon="card-image" aria-hidden="true"></b-icon>-->
          <!--            <div style="display: inline; padding-left: 5px;">{{ file.name }}</div>-->
          <!--          </a>-->
          <div class="w-100" style="border-radius: 10px;border: 1px solid #aaa;padding: 15px"
               :class="{selected: isFileSelected(file)}">
            <div class="w-100" style="display: flex; flex-direction: row">
              <div>
                <input type="checkbox" :checked="isFileSelected(file)" v-on:click="toggleFileSelection(file)"
                       :name="getFileSelectionCheckboxId(file)" :id="getFileSelectionCheckboxId(file)"/>
                <label :for="getFileSelectionCheckboxId(file)" class="rvt-m-right-sm"
                       style="margin: 0px !important;"></label>
              </div>
              <div style="flex: 1;">
                <button :for="getFileSelectionCheckboxId(file)" class="rvt-button rvt-button--plain rvt-button--small">
                  {{ file.name }}
                </button>
                <!--                <button  :for="getFileSelectionCheckboxId(file)" type="button" class="btn btn-link p-1">{{ file.name }}</button>-->
              </div>
              <div>
                <button class="rvt-button rvt-button--plain rvt-button--small">
                  <b-icon icon="share-fill"></b-icon>
                </button>
                <button class="rvt-button rvt-button--plain rvt-button--small">
                  <b-icon icon="pencil"></b-icon>
                </button>
                <button class="rvt-button rvt-button--plain rvt-button--small">
                  <b-icon icon="download"></b-icon>
                </button>
              </div>
            </div>
            <div class="w-100 text-center"
                 style="font-size: 10px;height: 180px;overflow: hidden; display: flex; flex-direction: column;">
              <!--              <div style="flex: 1;"></div>-->
              <!--            <img width="100%" :src="thumbnailDataUrl"/>-->
              <b-icon icon="image" style="width: 100%; height: 100%;"></b-icon>
            </div>
            <div class="w-100" style="display: flex;">
              <div style="flex: 1;">Microscope 1</div>
              <div>2MB</div>
            </div>
          </div>
        </b-col>
      </b-row>


      <div v-if="displayMode === 'list'" class="w-100">
        <div class="w-100">
          <table class="w-100">
            <thead>
            <tr>
              <td>
                <input type="checkbox" name="all" id="all" :checked="isAllSelected()"
                       v-on:click="toggleAllSelection()"/>
                <label for="all" class="rvt-m-right-sm"></label>
              </td>
              <!--              <td>-->
              <!--                <div class="rvt-dropdown">-->
              <!--                  <button type="button" class="rvt-button rvt-button&#45;&#45;small rvt-button&#45;&#45;secondary"-->
              <!--                          data-dropdown-toggle="dropdown-all"-->
              <!--                          aria-haspopup="true" aria-expanded="false">-->
              <!--                    <span>Actions</span>-->
              <!--                    <svg aria-hidden="true" class="rvt-m-left-xs" xmlns="http://www.w3.org/2000/svg" width="16"-->
              <!--                         height="16" viewBox="0 0 16 16">-->
              <!--                      <path fill="currentColor"-->
              <!--                            d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z"/>-->
              <!--                    </svg>-->
              <!--                  </button>-->
              <!--                  <div class="rvt-dropdown__menu" id="dropdown-all" role="menu" aria-hidden="true">-->
              <!--                    <button type="button" role="menuitemradio">Download</button>-->
              <!--                    <button type="button" role="menuitemradio">Share</button>-->
              <!--                    <button type="button" role="menuitemradio">View History</button>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </td>-->
              <th>Name</th>
              <th>Last Updated</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="folder in folders" :key="folder.folderId" :class="{selected: isFolderSelected(folder)}">
              <td>
                <input type="checkbox" :checked="isFolderSelected(folder)" v-on:click="toggleFolderSelection(folder)"
                       :name="getFolderSelectionCheckboxId(folder)"
                       :id="getFolderSelectionCheckboxId(folder)"/>
                <label :for="getFolderSelectionCheckboxId(folder)" class="rvt-m-right-sm"></label>
              </td>
              <td>
                <router-link :to="getFolderLink(folder)" v-slot="{ href, route, navigate, isActive,isExactActive }">
                  <b-icon style="height: 100%;" icon="folder-fill" aria-hidden="true"></b-icon>
                  <a :class="{active: isExactActive}" :href="href" @click="navigate"
                     style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;">
                    {{ folder.name }}
                  </a>
                </router-link>
              </td>
              <td>Dec 23d, 2020, Thomas</td>
              <td>
                <div style="display: flex;">
                  <div style="flex: 1;">
                    <button class="rvt-button rvt-button--plain rvt-button--small">
                      <b-icon icon="share-fill"></b-icon>
                    </button>
                    <button class="rvt-button rvt-button--plain rvt-button--small">
                      <b-icon icon="download"></b-icon>
                    </button>
                    <button class="rvt-button rvt-button--plain rvt-button--small">
                      <b-icon icon="info-circle-fill"></b-icon>
                    </button>
                  </div>
                  <div class="rvt-dropdown">
                    <button type="button" class="rvt-button rvt-button--plain rvt-button--small"
                            :data-dropdown-toggle="getFolderActionsDropdownId(folder)"
                            aria-haspopup="true" aria-expanded="false">
                      <b-icon icon="three-dots-vertical"></b-icon>
                    </button>
                    <div class="rvt-dropdown__menu" :id="getFolderActionsDropdownId(folder)" role="menu"
                         aria-hidden="true">
                      <button type="button" role="menuitemradio">Download</button>
                      <button type="button" role="menuitemradio">Share</button>
                      <button type="button" role="menuitemradio">View History</button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <tr v-if="folders.length > 0" class="w-100 pt-5"></tr>

            <tr v-for="file in files" :key="file.fileId" :class="{selected: isFileSelected(file)}">
              <td>
                <input type="checkbox" :checked="isFileSelected(file)" v-on:click="toggleFileSelection(file)"
                       :name="getFileSelectionCheckboxId(file)" :id="getFileSelectionCheckboxId(file)"/>
                <label :for="getFileSelectionCheckboxId(file)" class="rvt-m-right-sm"></label>
              </td>
              <!--              <td>-->
              <!--                <div class="rvt-dropdown">-->
              <!--                  <button type="button" class="rvt-button rvt-button&#45;&#45;small rvt-button&#45;&#45;secondary"-->
              <!--                          :data-dropdown-toggle="getFileActionsDropdownId(file)"-->
              <!--                          aria-haspopup="true" aria-expanded="false">-->
              <!--                    <span>Actions</span>-->
              <!--                    <svg aria-hidden="true" class="rvt-m-left-xs" xmlns="http://www.w3.org/2000/svg" width="16"-->
              <!--                         height="16" viewBox="0 0 16 16">-->
              <!--                      <path fill="currentColor"-->
              <!--                            d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z"/>-->
              <!--                    </svg>-->
              <!--                  </button>-->
              <!--                  <div class="rvt-dropdown__menu" :id="getFileActionsDropdownId(file)" role="menu" aria-hidden="true">-->
              <!--                    <button type="button" role="menuitemradio">Download</button>-->
              <!--                    <button type="button" role="menuitemradio">Share</button>-->
              <!--                    <button type="button" role="menuitemradio">Edit</button>-->
              <!--                    <button type="button" role="menuitemradio">View History</button>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </td>-->
              <td>
                <b-icon style="height: 100%;" icon="card-image" aria-hidden="true"></b-icon>
                <a href="#" style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;">
                  {{ file.name }}
                </a>
              </td>
              <td>Dec 23d, 2020, Thomas</td>
              <td>
                <div style="display: flex;">
                  <div style="flex: 1;">
                    <button class="rvt-button rvt-button--plain rvt-button--small">
                      <b-icon icon="share-fill"></b-icon>
                    </button>
                    <button class="rvt-button rvt-button--plain rvt-button--small">
                      <b-icon icon="pencil"></b-icon>
                    </button>
                    <button class="rvt-button rvt-button--plain rvt-button--small">
                      <b-icon icon="download"></b-icon>
                    </button>
                    <button class="rvt-button rvt-button--plain rvt-button--small">
                      <b-icon icon="info-circle-fill"></b-icon>
                    </button>
                  </div>
                  <div class="rvt-dropdown">
                    <button type="button" class="rvt-button rvt-button--plain rvt-button--small"
                            :data-dropdown-toggle="getFileActionsDropdownId(file)"
                            aria-haspopup="true" aria-expanded="false">
                      <b-icon icon="three-dots-vertical"></b-icon>
                    </button>
                    <div class="rvt-dropdown__menu" :id="getFileActionsDropdownId(file)" role="menu"
                         aria-hidden="true">
                      <button type="button" role="menuitemradio">Download</button>
                      <button type="button" role="menuitemradio">Share</button>
                      <button type="button" role="menuitemradio">View History</button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </Page>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";
import Page from "../components/Page";

export default {
  name: "GroupDataPage",
  components: {Page},
  store: store,
  data() {
    return {
      memberTypes: ['ADMIN', 'MEMBER'],
      displayMode: "list",
      selectedFileIdMap: {},
      selectedFolderIdMap: {},
      // allFilesAndFoldersSelected: false
    }
  },
  computed: {
    ...mapGetters({
      getGroup: "group/getGroup",
      getUsers: "user/getUsers",
    }),
    breadcrumbLinks() {
      const _breadcrumbLinks = [{to: '/data', name: 'Datasets'}]
      if (this.group && this.group.name) {
        _breadcrumbLinks.push({to: this.groupLink, name: this.group.name});

        if (this.path && this.path !== "") {
          const pathSegments = this.path.split("/");
          pathSegments.map((pathSegment, pathSegmentIndex) => {
            const _fullPathToSegment = pathSegments.slice(0, pathSegmentIndex + 1).join("/");
            _breadcrumbLinks.push({to: `${this.groupLink}?path=${_fullPathToSegment}`, name: pathSegment});
          });
        }
      }

      return _breadcrumbLinks;
    },
    groupId() {
      return this.$route.params.groupId;
    },
    group() {
      return this.getGroup({groupId: this.groupId});
    },

    path() {
      if (this.$route.query.path) {
        return window.decodeURIComponent(this.$route.query.path);
      } else {
        return "";
      }
    },

    // TODO remove. Added temporary for demo purpose.
    mode() {
      const folderCountInPath = this.path.length === 0 ? 0 : this.path.split("/").length;
      if (folderCountInPath === 1) {
        return "user";
      } else if (folderCountInPath === 2) {
        return "collection";
      } else {
        return "group";
      }
    },
    nextMode() {
      if (this.mode === "group") {
        return "user"
      } else if (this.mode === "user") {
        return "collection"
      } else {
        return null;
      }
    },

    files() {
      if (this.mode === "collection") {
        return ["dataset-1", "dataset-2", "dataset-3", "dataset-4", "dataset-5", "dataset-6", "dataset-7", "dataset-8"].map((datasetName) => {
          return {
            fileId: datasetName, name: datasetName,
            status: {total: 1, uploading: 1, failed: 0, uploadingPercentage: 70}
          }
        });
      } else {
        return []
      }
    },
    folders() {
      if (this.mode === "group") {
        if (this.users) {
          return this.users.map((user) => {
            return {
              folderId: user.username,
              path: user.username,
              name: user.username,
              status: {total: 2345, uploading: 10, failed: 3, uploadingPercentage: 20}
            }
          });
        } else {
          return []
        }
      } else if (this.mode === "user") {
        return ["session-1", "session-2", "session-3", "session-4", "session-5"].map((collectionName) => {
          return {
            folderId: collectionName,
            path: this.path + "/" + collectionName,
            name: collectionName,
            status: {total: 2345, uploading: 10, failed: 3, uploadingPercentage: 20}
          }
        });
      } else {
        return []
      }
    },
    users() {
      return this.getUsers({groupId: this.groupId});
    },
    groupLink() {
      return `/data/groups/${this.groupId}`;
    },
    numberOfFilesSelected() {
      let _numberOfFilesSelected = 0;
      for (let i = 0; i < this.files.length; i++) {
        if (this.isFileSelected(this.files[i])) {
          _numberOfFilesSelected++;
        }
      }

      return _numberOfFilesSelected;
    },
    numberOfFoldersSelected() {
      let _numberOfFoldersSelected = 0;
      for (let i = 0; i < this.folders.length; i++) {
        if (this.isFolderSelected(this.folders[i])) {
          _numberOfFoldersSelected++;
        }
      }

      return _numberOfFoldersSelected;
    }
  },
  methods: {
    ...mapActions({
      fetchGroup: "group/fetchGroup",
      fetchUsers: "user/fetchUsers",
    }),
    switchDisplayMode(displayMode) {
      this.displayMode = displayMode;
    },
    getFolderLink(folder) {
      return this.groupLink + "?path=" + folder.path;
    },
    getFolderSelectionCheckboxId({folderId}) {
      return `folder-select-checkbox-${folderId}`;
    },
    getFileSelectionCheckboxId({fileId}) {
      return `file-select-checkbox-${fileId}`;
    },
    getFolderActionsDropdownId({folderId}) {
      return `folder-actions-dropdown-${folderId}`;
    },
    getFileActionsDropdownId({fileId}) {
      return `file-actions-dropdown-${fileId}`;
    },
    toggleAllSelection(selected = null) {
      if (typeof selected !== "boolean") {
        selected = !this.isAllSelected();
      }

      // this.allFilesAndFoldersSelected = selected;

      this.folders.map(folder => {
        this.toggleFolderSelection(folder, selected);
      });

      this.files.map(file => {
        this.toggleFileSelection(file, selected);
      });
    },
    toggleFolderSelection({folderId}, selected = null) {
      if (typeof selected !== "boolean") {
        selected = !this.selectedFolderIdMap[folderId];
      }

      // this.toggleAllSelection(false);
      this.selectedFolderIdMap = {
        ...this.selectedFolderIdMap,
        [folderId]: selected
      }
    },
    toggleFileSelection({fileId}, selected = null) {
      if (typeof selected !== "boolean") {
        selected = !this.selectedFileIdMap[fileId];
      }

      // this.toggleAllSelection(false);
      this.selectedFileIdMap = {
        ...this.selectedFileIdMap,
        [fileId]: selected
      }
    },
    isAllSelected() {
      console.log("isAllSelected");
      let _isAllSelected = false;

      for (let i = 0; i < this.folders.length; i++) {
        if (!this.isFolderSelected(this.folders[i])) {
          return false;
        } else {
          _isAllSelected = true;
        }
      }

      for (let i = 0; i < this.files.length; i++) {
        if (!this.isFileSelected(this.files[i])) {
          return false;
        } else {
          _isAllSelected = true;
        }
      }

      console.log("isAllSelected TRUE");

      return _isAllSelected;
    },
    isFolderSelected({folderId}) {
      if (this.selectedFolderIdMap[folderId]) return true;
      else return false;
    },
    isFileSelected({fileId}) {
      if (this.selectedFileIdMap[fileId]) return true;
      else return false;
    },
    hasAnythingSelected() {
      for (let folderId in this.selectedFolderIdMap) {
        if (this.isFolderSelected({folderId})) {
          return true;
        }
      }

      for (let fileId in this.selectedFileIdMap) {
        if (this.isFileSelected({fileId})) {
          return true;
        }
      }

      return false;
    }
  },
  watch: {
    groupId() {
      this.fetchGroup({groupId: this.groupId});
      this.fetchUsers({groupId: this.groupId});
    }
  },
  beforeMount() {
    this.fetchGroup({groupId: this.groupId});
    this.fetchUsers({groupId: this.groupId});
  }
}
</script>

<style scoped>
.selected,
table tbody tr.selected {
  background-color: #d6e2ed;
}

</style>