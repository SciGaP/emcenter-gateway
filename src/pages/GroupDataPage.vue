<template>
  <Page :title="title" :breadcrumb-links="breadcrumbLinks">
    <!--    <div class="w-100">-->
    <!--      &lt;!&ndash;      <div class="w-100">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <label for="demo-1">Search</label>&ndash;&gt;-->
    <!--      &lt;!&ndash;        <input type="text" id="demo-1" aria-describedby="demo-1-note">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <small>&ndash;&gt;-->
    <!--      &lt;!&ndash;          <a href="#" data-modal-trigger="modal-1">Advanced search</a>&ndash;&gt;-->
    <!--      &lt;!&ndash;        </small>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </div>&ndash;&gt;-->

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
    <!--    </div>-->

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
          <b-button variant="link" v-b-modal.modal-selected-collections-download
                    v-if="displayMode === 'grid' && hasAnythingSelected()">
            Download
          </b-button>
          <!--          <b-modal id="modal-selected-collections-download" title="Download">-->
          <!--            <p class="my-4">Preparing to download...... </p>-->
          <!--          </b-modal>-->

          <b-button variant="link" v-b-modal.modal-selected-collections-share
                    v-if="displayMode === 'grid' && hasAnythingSelected()">
            Share
          </b-button>
          <!--          <b-modal id="modal-selected-collections-share" title="Share">-->
          <!--            <b-table-simple small>-->
          <!--              <b-thead>-->
          <!--                <b-tr>-->
          <!--                  <b-th>User</b-th>-->
          <!--                  <b-th>Read</b-th>-->
          <!--                  <b-th>Write</b-th>-->
          <!--                  <b-th>Share</b-th>-->
          <!--                </b-tr>-->
          <!--              </b-thead>-->
          <!--              <b-tbody>-->
          <!--                <b-tr>-->
          <!--                  <b-td>Dinuka</b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox :checked="true" :disabled="true"/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                </b-tr>-->
          <!--                <tr>-->
          <!--                  <b-td>Tanya</b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox :checked="true" :disabled="true"/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                </tr>-->
          <!--                <b-tr>-->
          <!--                  <b-td>Thomas</b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox :checked="true" :disabled="true"/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                  <b-td>-->
          <!--                    <b-checkbox/>-->
          <!--                  </b-td>-->
          <!--                </b-tr>-->
          <!--                <b-tr>-->
          <!--                  <b-td>-->
          <!--                    <UserSearchAndSelect v-on:change="(u) => u"/>-->
          <!--                  </b-td>-->
          <!--                </b-tr>-->
          <!--              </b-tbody>-->
          <!--            </b-table-simple>-->
          <!--          </b-modal>-->

          <!--          <b-button variant="link" v-b-modal.modal-selected-collections-history v-if="hasAnythingSelected()">-->
          <!--            History-->
          <!--          </b-button>-->
          <!--          <b-modal id="modal-selected-collections-history" title="History">-->
          <!--            <b-table-simple small>-->
          <!--              <b-thead>-->
          <!--                <b-tr>-->
          <!--                  <b-th>User</b-th>-->
          <!--                  <b-th>Date & Time</b-th>-->
          <!--                </b-tr>-->
          <!--              </b-thead>-->
          <!--              <b-tbody>-->
          <!--                <tr>-->
          <!--                  <b-td>Dinuka</b-td>-->
          <!--                  <b-td>03/05/2021 11.33am</b-td>-->
          <!--                </tr>-->
          <!--                <tr>-->
          <!--                  <b-td>Dinuka</b-td>-->
          <!--                  <b-td>03/05/2021 11.46am</b-td>-->
          <!--                </tr>-->
          <!--                <tr>-->
          <!--                  <b-td>Thomas</b-td>-->
          <!--                  <b-td>03/06/2021 01.12pm</b-td>-->
          <!--                </tr>-->
          <!--                <tr>-->
          <!--                  <b-td>Sarah</b-td>-->
          <!--                  <b-td>03/06/2021 05.22pm</b-td>-->
          <!--                </tr>-->
          <!--                <tr>-->
          <!--                  <b-td>Sarah</b-td>-->
          <!--                  <b-td>03/06/2021 05.37am</b-td>-->
          <!--                </tr>-->
          <!--              </b-tbody>-->
          <!--            </b-table-simple>-->
          <!--          </b-modal>-->

          <b-button size="sm" :variant="displayMode !== 'list'? 'outline-primary': 'primary'"
                    v-on:click="switchDisplayMode('list')">
            <b-icon icon="list" aria-hidden="true"></b-icon>
          </b-button>
          <b-button size="sm" :variant="displayMode !== 'grid'? 'outline-primary': 'primary'" class="ml-2"
                    v-on:click="switchDisplayMode('grid')">
            <b-icon icon="grid" aria-hidden="true"></b-icon>
          </b-button>
        </div>
      </div>


      <div class="w-100 pt-4"></div>

      <div class="w-100" style="display: flex;flex-direction: row;">
        <div v-if="displayMode === 'grid'">
          <input type="checkbox" name="all-grid" id="all-grid" :checked="isAllSelected()"
                 v-on:click="toggleAllSelection()" style="margin: 3px 10px;"/>
          <label for="all-grid">Select All</label>
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

      <div class="w-100" v-if="files && folders">

        <b-row v-if="displayMode === 'grid'">
          <b-col style="min-width: 300px;max-width: 300px;padding: 5px;" v-for="folder in folders"
                 :key="folder.folderId">
            <div class="w-100" style="border-radius: 10px;border: 1px solid #aaa;padding: 10px; display: flex;"
                 :class="{selected: isFolderSelected(folder)}">
              <div style="margin: 3px 10px;">
                <input type="checkbox" :checked="isFolderSelected(folder)" v-on:click="toggleFolderSelection(folder)"
                       :name="getFolderSelectionCheckboxId(folder)" :id="getFolderSelectionCheckboxId(folder)"/>
                <label :for="getFolderSelectionCheckboxId(folder)" style="margin: 0px !important;"></label>
              </div>
              <div style="flex: 1;">
                <router-link :to="getFolderLink(folder)" v-slot="{ href, route, navigate}">
                  <b-icon icon="folder-fill" aria-hidden="true"></b-icon>
                  <b-button size="sm" variant="link" :for="getFolderSelectionCheckboxId(folder)" @click="navigate">
                    {{ folder.name }}
                  </b-button>
                </router-link>
              </div>
              <div>
                <b-button size="sm" variant="link" data-modal-trigger="modal-share">
                  <b-icon icon="share-fill"></b-icon>
                </b-button>
                <b-button size="sm" variant="link">
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button size="sm" variant="link">
                  <b-icon icon="download"></b-icon>
                </b-button>
              </div>
            </div>
          </b-col>
          <div class="w-100 pt-5"></div>
          <b-col style="min-width: 300px;max-width: 300px;padding: 5px;"
                 v-for="file in files" :key="file.fileId">
            <div class="w-100" style="border-radius: 10px;border: 1px solid #aaa;padding: 15px"
                 :class="{selected: isFileSelected(file)}">
              <div class="w-100" style="display: flex; flex-direction: row">
                <div>
                  <input type="checkbox" :checked="isFileSelected(file)" v-on:click="toggleFileSelection(file)"
                         :name="getFileSelectionCheckboxId(file)" :id="getFileSelectionCheckboxId(file)"/>
                  <label :for="getFileSelectionCheckboxId(file)"
                         style="margin: 0px !important;"></label>
                </div>
                <div style="flex: 1;">
                  <b-button variant="link" :for="getFileSelectionCheckboxId(file)"
                  >
                    {{ file.name }}
                  </b-button>
                </div>
                <div>
                  <b-button size="sm" variant="link" data-modal-trigger="modal-share">
                    <b-icon icon="share-fill"></b-icon>
                  </b-button>
                  <b-button size="sm" variant="link">
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button size="sm" variant="link">
                    <b-icon icon="download"></b-icon>
                  </b-button>
                </div>
              </div>
              <div class="w-100 text-center"
                   style="font-size: 10px;height: 180px;overflow: hidden; display: flex; flex-direction: column;">
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
            <b-table-simple class="w-100">
              <b-thead>
                <b-tr>
                  <b-th>Collection</b-th>
                  <b-th>Owner</b-th>
                  <b-th>Created On</b-th>
                  <b-th>Last Updated</b-th>
                  <b-th>
                    <b-dropdown :disabled="!hasAnythingSelected()" id="dropdown-1" text="Actions" right
                                variant="outline-primary" size="sm">

                      <b-dropdown-item v-b-modal="`modal-selected-collections-share`">Share</b-dropdown-item>
                      <b-modal :id="`modal-selected-collections-share`" title="Share">
                        <b-table-simple small>
                          <b-thead>
                            <b-tr>
                              <b-th>User</b-th>
                              <b-th>Read</b-th>
                              <b-th>Write</b-th>
                              <b-th>Share</b-th>
                            </b-tr>
                          </b-thead>
                          <b-tbody>
                            <b-tr>
                              <b-td>Dinuka</b-td>
                              <b-td>
                                <b-checkbox :checked="true" :disabled="true"/>
                              </b-td>
                              <b-td>
                                <b-checkbox/>
                              </b-td>
                              <b-td>
                                <b-checkbox/>
                              </b-td>
                            </b-tr>
                            <tr>
                              <b-td>Tanya</b-td>
                              <b-td>
                                <b-checkbox :checked="true" :disabled="true"/>
                              </b-td>
                              <b-td>
                                <b-checkbox/>
                              </b-td>
                              <b-td>
                                <b-checkbox/>
                              </b-td>
                            </tr>
                            <b-tr>
                              <b-td>Thomas</b-td>
                              <b-td>
                                <b-checkbox :checked="true" :disabled="true"/>
                              </b-td>
                              <b-td>
                                <b-checkbox/>
                              </b-td>
                              <b-td>
                                <b-checkbox/>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td>
                                <UserSearchAndSelect v-on:change="(u) => u"/>
                              </b-td>
                            </b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </b-modal>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-copy`">Copy</b-dropdown-item>
                      <b-modal :id="`modal-selected-collections-copy`" title="Copy">
                        <p class="my-4">Preparing to Copy...... </p>
                      </b-modal>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-share-history`">Share History
                      </b-dropdown-item>
                      <b-modal :id="`modal-selected-collections-share-history`" title="Share History">
                        <p class="my-4">Share History...... </p>
                      </b-modal>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-history`">Collection History
                      </b-dropdown-item>
                      <b-modal :id="`modal-selected-collections-history`" size="lg" title="Collection History">
                        <b-table-simple small>
                          <b-thead>
                            <b-tr>
                              <b-th>Date and Time</b-th>
                              <b-th>Status</b-th>
                              <b-th>Owner</b-th>
                              <b-th>By</b-th>
                              <b-th>To</b-th>
                              <b-th>Details</b-th>
                            </b-tr>
                          </b-thead>
                          <b-tbody>
                            <b-tr>
                              <b-td>09/07/2020 13:00 PM</b-td>
                              <b-td>Shared</b-td>
                              <b-td>Me</b-td>
                              <b-td>Me</b-td>
                              <b-td>Group 1</b-td>
                              <b-td>-</b-td>
                            </b-tr>
                            <b-tr>
                              <b-td>08/31/2020 14:00 PM</b-td>
                              <b-td>Copied</b-td>
                              <b-td>Me</b-td>
                              <b-td>-</b-td>
                              <b-td>Google Drive</b-td>
                              <b-td>-</b-td>
                            </b-tr>
                            <b-tr>
                              <b-td>08/31/2020 12:00 PM</b-td>
                              <b-td>Modified</b-td>
                              <b-td>Me</b-td>
                              <b-td>-</b-td>
                              <b-td>-</b-td>
                              <b-td>2 files deleted</b-td>
                            </b-tr>
                            <b-tr>
                              <b-td>08/30/2020 12:00 PM</b-td>
                              <b-td>Modified</b-td>
                              <b-td>Me</b-td>
                              <b-td>Philip Walker</b-td>
                              <b-td>-</b-td>
                              <b-td>Collection name changed</b-td>
                            </b-tr>
                            <b-tr>
                              <b-td>08/23/2020 12:00 PM</b-td>
                              <b-td>Shared</b-td>
                              <b-td>Me</b-td>
                              <b-td>Philip Walker</b-td>
                              <b-td>Allen Edwards</b-td>
                              <b-td>-</b-td>
                            </b-tr>
                          </b-tbody>
                        </b-table-simple>
                        <template #modal-footer="{close}">
                          <b-button size="sm" variant="outline-primary" v-on:click="close">Close</b-button>
                        </template>
                      </b-modal>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-edit`">Edit</b-dropdown-item>
                      <b-modal :id="`modal-selected-collections-edit`" title="Edit">
                        <p class="my-4">Edit...... </p>
                      </b-modal>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-archive`">Archive</b-dropdown-item>
                      <b-modal :id="`modal-selected-collections-archive`" title="Archive">
                        <b-alert variant="info" show="">
                          Archiving files clears space in the current storage and can be retrieved for later
                        </b-alert>
                        <template #modal-footer="{cancel, ok}">
                          <b-button size="sm" variant="outline-primary" v-on:click="cancel()">Cancel</b-button>
                          <b-button variant="primary" size="sm" v-on:click="ok()">Archive</b-button>
                        </template>
                      </b-modal>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-delete`">Delete</b-dropdown-item>
                      <b-modal :id="`modal-selected-collections-delete`" title="Delete">
                        <b-alert variant="danger" show="">
                          Deleting a file would result in permanent loss of data for anyone with the file including
                          share recipients. Data once lost cannot be retrieved.
                        </b-alert>
                        <div>
                          An alternative option is Archive files instead
                        </div>
                        <template #modal-footer="{close}">
                          <b-button size="sm" variant="outline-primary"
                                    v-on:click="close();$bvModal.show(`modal-selected-collections-archive`)">
                            Archive Files
                          </b-button>
                          <b-button variant="primary" size="sm"
                                    v-on:click="close();$bvModal.show(`modal-selected-collections-delete-confirmation`)">
                            I still want to send Delete request
                          </b-button>
                        </template>
                      </b-modal>
                      <!--                      <b-modal :id="`modal-selected-collections-archive-confirmation`" title="Archive">-->
                      <!--                        <b-alert variant="info" show="">-->
                      <!--                          Archiving files clears space in the current storage and can be retrieved for later-->
                      <!--                        </b-alert>-->
                      <!--                        <template #modal-footer="{cancel, ok}">-->
                      <!--                          <b-button size="sm" variant="outline-primary" v-on:click="cancel()">Cancel</b-button>-->
                      <!--                          <b-button variant="primary" size="sm" v-on:click="ok()">Archive</b-button>-->
                      <!--                        </template>-->
                      <!--                      </b-modal>-->
                      <b-modal :id="`modal-selected-collections-delete-confirmation`" title="Delete Request">
                        <b-alert variant="danger" show="">
                          Deleting a file would result in permanent loss of data for anyone with the file including
                          share recipients. Data once lost cannot be retrieved.
                        </b-alert>
                        <div>
                          A delete request will be sent to your admin.
                          <br/><br/>
                          We'll notify you once the deletion has been performed
                        </div>
                        <template #modal-footer="{cancel, ok}">
                          <b-button size="sm" variant="outline-primary" v-on:click="cancel()">Cancel</b-button>
                          <b-button variant="primary" size="sm" v-on:click="ok()">Send request</b-button>
                        </template>
                      </b-modal>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-download`">Download</b-dropdown-item>
                      <b-modal :id="`modal-selected-collections-download`" title="Download">
                        <p class="my-4">Preparing to download...... </p>
                      </b-modal>


                      <!--                      <b-dropdown-item v-b-modal="`modal-selected-collections-history`">History-->
                      <!--                      </b-dropdown-item>-->
                      <!--                      <b-modal :id="`modal-selected-collections-history`" title="History">-->
                      <!--                        <b-table-simple small>-->
                      <!--                          <b-thead>-->
                      <!--                            <b-tr>-->
                      <!--                              <b-th>User</b-th>-->
                      <!--                              <b-th>Date & Time</b-th>-->
                      <!--                            </b-tr>-->
                      <!--                          </b-thead>-->
                      <!--                          <b-tbody>-->
                      <!--                            <tr>-->
                      <!--                              <b-td>Dinuka</b-td>-->
                      <!--                              <b-td>03/05/2021 11.33am</b-td>-->
                      <!--                            </tr>-->
                      <!--                            <tr>-->
                      <!--                              <b-td>Dinuka</b-td>-->
                      <!--                              <b-td>03/05/2021 11.46am</b-td>-->
                      <!--                            </tr>-->
                      <!--                            <tr>-->
                      <!--                              <b-td>Thomas</b-td>-->
                      <!--                              <b-td>03/06/2021 01.12pm</b-td>-->
                      <!--                            </tr>-->
                      <!--                            <tr>-->
                      <!--                              <b-td>Sarah</b-td>-->
                      <!--                              <b-td>03/06/2021 05.22pm</b-td>-->
                      <!--                            </tr>-->
                      <!--                            <tr>-->
                      <!--                              <b-td>Sarah</b-td>-->
                      <!--                              <b-td>03/06/2021 05.37am</b-td>-->
                      <!--                            </tr>-->
                      <!--                          </b-tbody>-->
                      <!--                        </b-table-simple>-->
                      <!--                      </b-modal>-->

                    </b-dropdown>
                  </b-th>
                  <b-th>
                    <input type="checkbox" name="all" id="all" :checked="isAllSelected()"
                           v-on:click="toggleAllSelection()"/>
                    <label for="all"></label>
                  </b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="folder in folders" :key="folder.folderId" :class="{selected: isFolderSelected(folder)}">
                  <b-td>
                    <router-link :to="getFolderLink(folder)" v-slot="{ href, route, navigate, isActive,isExactActive }">
                      <!--                      <b-icon v-if="folder.own === false" style="height: 100%;" icon="people-fill"-->
                      <!--                              aria-hidden="true"></b-icon>-->
                      <!--                      <b-icon style="height: 100%;" icon="folder-fill" aria-hidden="true"></b-icon>-->

                      <a :class="{active: isExactActive}" :href="href" @click="navigate"
                         style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;">
                        {{ folder.name }}
                      </a>
                    </router-link>
                  </b-td>
                  <b-td>{{ folder.createdBy }}</b-td>
                  <b-td>08/31/2020 14:00 PM</b-td>
                  <b-td>09/07/2020 13:00 PM</b-td>
                  <b-td>
                    <b-dropdown id="dropdown-1" text="Actions" right variant="outline-primary" size="sm">

                      <b-dropdown-item v-b-modal="`modal-selected-collections-share`">Share</b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-copy`">Copy</b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-share-history`">Share History
                      </b-dropdown-item>


                      <b-dropdown-item v-b-modal="`modal-selected-collections-history`">Collection History
                      </b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-edit`">Edit</b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-archive`">Archive</b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-delete`">Delete</b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-download`">Download</b-dropdown-item>

                    </b-dropdown>
                    <!--                    <div style="display: flex;">-->
                    <!--                      <div style="flex: 1;">-->
                    <!--                        <b-button size="sm" variant="link" data-modal-trigger="modal-share">-->
                    <!--                          <b-icon icon="share-fill"></b-icon>-->
                    <!--                        </b-button>-->
                    <!--                        <b-button size="sm" variant="link">-->
                    <!--                          <b-icon icon="download"></b-icon>-->
                    <!--                        </b-button>-->
                    <!--                        <b-button size="sm" variant="link">-->
                    <!--                          <b-icon icon="info-circle-fill"></b-icon>-->
                    <!--                        </b-button>-->
                    <!--                        <b-button size="sm" variant="link">-->
                    <!--                          <b-icon icon="three-dots-vertical"></b-icon>-->
                    <!--                        </b-button>-->
                    <!--                      </div>-->
                    <!--                    </div>-->
                  </b-td>
                  <b-td>
                    <input type="checkbox" :checked="isFolderSelected(folder)"
                           v-on:click="toggleFolderSelection(folder)"
                           :name="getFolderSelectionCheckboxId(folder)"
                           :id="getFolderSelectionCheckboxId(folder)"/>
                    <label :for="getFolderSelectionCheckboxId(folder)"></label>
                  </b-td>
                </b-tr>

                <b-tr v-if="folders.length > 0" class="w-100 pt-5"></b-tr>

                <b-tr v-for="file in files" :key="file.fileId" :class="{selected: isFileSelected(file)}">

                  <b-td>
                    <b-icon style="height: 100%;" icon="card-image" aria-hidden="true"></b-icon>
                    <a href="#" style="flex: 1;display: inline; padding-left: 5px;line-height: 24px;">
                      {{ file.name }}
                    </a>
                  </b-td>
                  <b-td>{{ file.createdBy }}</b-td>
                  <b-td>08/31/2020 14:00 PM</b-td>
                  <b-td>09/07/2020 13:00 PM</b-td>
                  <b-td>
                    <b-dropdown id="dropdown-1" text="Actions" right variant="outline-primary" size="sm">
                      <b-dropdown-item v-b-modal="`modal-selected-collections-share`">Share</b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-copy`">Copy</b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-share-history`">Share History
                      </b-dropdown-item>


                      <b-dropdown-item v-b-modal="`modal-selected-collections-history`">Collection History
                      </b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-edit`">Edit</b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-archive`">Archive</b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-delete`">Delete</b-dropdown-item>

                      <b-dropdown-item v-b-modal="`modal-selected-collections-download`">Download</b-dropdown-item>

                    </b-dropdown>
                    <!--                    <div style="display: flex;">-->
                    <!--                      <div style="flex: 1;">-->
                    <!--                        <b-button size="sm" variant="link" data-modal-trigger="modal-share">-->
                    <!--                          <b-icon icon="share-fill"></b-icon>-->
                    <!--                        </b-button>-->
                    <!--                        <b-button size="sm" variant="link">-->
                    <!--                          <b-icon icon="pencil"></b-icon>-->
                    <!--                        </b-button>-->
                    <!--                        <b-button size="sm" variant="link">-->
                    <!--                          <b-icon icon="download"></b-icon>-->
                    <!--                        </b-button>-->
                    <!--                        <b-button size="sm" variant="link">-->
                    <!--                          <b-icon icon="info-circle-fill"></b-icon>-->
                    <!--                        </b-button>-->
                    <!--                      </div>-->
                    <!--                    </div>-->
                  </b-td>
                  <b-td>
                    <input type="checkbox" :checked="isFileSelected(file)" v-on:click="toggleFileSelection(file)"
                           :name="getFileSelectionCheckboxId(file)" :id="getFileSelectionCheckboxId(file)"/>
                    <label :for="getFileSelectionCheckboxId(file)"></label>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </div>

        <div style="padding: 10px;" class="bg-light text-right">
          <Pagination/>
        </div>

      </div>
    </div>

  </Page>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import store from "../store";
import Page from "../components/Page";
import Pagination from "@/components/Pagination";
import UserSearchAndSelect from "@/components/EntitySelectInput";

export default {
  name: "GroupDataPage",
  components: {UserSearchAndSelect, Pagination, Page},
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
      getFiles: "emcFile/getFiles",
      getFolders: "emcFolder/getFolders",
      getFolderPath: "emcFolder/getFolderPath",
    }),
    title() {
      if (this.group) {
        return this.group.name;
      } else {
        return "Collections"
      }
    },
    breadcrumbLinks() {
      let _breadcrumbLinks = [{to: '/collections', name: 'Collections'}]

      if (this.group && this.group.name) {
        _breadcrumbLinks.push({to: this.groupLink, name: this.group.name});
      }

      const folderPath = this.getFolderPath({folderId: this.parentFolderId});
      if (folderPath) {
        for (let i = 0; i < folderPath.length; i++) {
          const folder = folderPath[i];
          if (folder) {
            const {folderId, name} = folder;
            _breadcrumbLinks.push({
              to: this.getFolderLink({folderId}),
              name: name
            });
          }
        }
      }

      return _breadcrumbLinks;
    },
    groupId() {
      return this.$route.query.groupId;
    },
    group() {
      return this.getGroup({groupId: this.groupId});
    },

    parentFolderId() {
      if (this.$route.query.parentFolderId) {
        return window.decodeURIComponent(this.$route.query.parentFolderId);
      } else {
        return null;
      }
    },

    // TODO remove. Added temporary for demo purpose.
    // mode() {
    //   const folderCountInPath = this.path.length === 0 ? 0 : this.path.split("/").length;
    //   if (folderCountInPath === 1) {
    //     return "user";
    //   } else if (folderCountInPath === 2) {
    //     return "collection";
    //   } else {
    //     return "group";
    //   }
    // },
    // nextMode() {
    //   if (this.mode === "group") {
    //     return "user"
    //   } else if (this.mode === "user") {
    //     return "collection"
    //   } else {
    //     return null;
    //   }
    // },

    files() {
      const _files = this.getFiles({groupId: this.groupId, parentFolderId: this.parentFolderId});

      // TODO remove
      if (_files && this.group) {
        return _files.map(file => {
          return {...file, name: `${this.group.name.replace(/ /ig, "-").toLowerCase()}-${file.name}`}

        });
      } else {
        return _files;
      }
    },
    folders() {
      const _folders = this.getFolders({groupId: this.groupId, parentFolderId: this.parentFolderId});

      // TODO remove
      if (_folders && this.group) {
        return _folders.map(folder => {
          return {...folder, name: `${this.group.name.replace(/ /ig, "-").toLowerCase()}-${folder.name}`}
        })
      } else {
        return _folders
      }
    },
    users() {
      return this.getUsers({groupId: this.groupId});
    },
    groupLink() {
      return this.getDataLink({groupId: this.groupId});
    },
    numberOfFilesSelected() {
      let _numberOfFilesSelected = 0;
      for (let i = 0; this.files && i < this.files.length; i++) {
        if (this.isFileSelected(this.files[i])) {
          _numberOfFilesSelected++;
        }
      }

      return _numberOfFilesSelected;
    },
    numberOfFoldersSelected() {
      let _numberOfFoldersSelected = 0;
      for (let i = 0; this.folders && i < this.folders.length; i++) {
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
      fetchFiles: "emcFile/fetchFiles",
      fetchFolders: "emcFolder/fetchFolders",
      fetchFolderPath: "emcFolder/fetchFolderPath"
    }),
    reset() {
      this.displayMode = "list";
      this.selectedFileIdMap = {};
      this.selectedFolderIdMap = {};
    },
    getDataLink({groupId} = {}, {folderId} = {}) {
      let _dataLink = "/collections?";

      if (groupId) {
        _dataLink += `groupId=${groupId}&`
      }

      if (folderId) {
        _dataLink += `parentFolderId=${folderId}&`
      }

      return _dataLink;
    },
    switchDisplayMode(displayMode) {
      this.displayMode = displayMode;
    },
    getFolderLink({folderId}) {
      return this.getDataLink({groupId: this.groupId}, {folderId});
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
      this.reset();
      if (this.groupId) this.fetchGroup({groupId: this.groupId});
      // this.fetchUsers({groupId: this.groupId});

      this.fetchFolders({groupId: this.groupId, parentFolderId: this.parentFolderId});
      this.fetchFiles({groupId: this.groupId, parentFolderId: this.parentFolderId});
      this.fetchFolderPath({folderId: this.parentFolderId});
    },
    parentFolderId() {
      this.reset();
      this.fetchFolders({groupId: this.groupId, parentFolderId: this.parentFolderId});
      this.fetchFiles({groupId: this.groupId, parentFolderId: this.parentFolderId});
      this.fetchFolderPath({folderId: this.parentFolderId});
    }
  },
  beforeMount() {
    if (this.groupId) this.fetchGroup({groupId: this.groupId});
    // this.fetchUsers({groupId: this.groupId});
    this.fetchFolders({groupId: this.groupId, parentFolderId: this.parentFolderId});
    this.fetchFiles({groupId: this.groupId, parentFolderId: this.parentFolderId});
    this.fetchFolderPath({folderId: this.parentFolderId});
  }
}
</script>

<style scoped>
.selected,
table tbody tr.selected {
  background-color: #d6e2ed;
}

</style>