<template>
  <div>
    <!--    <b-toast id="downloaded-toast" :visible="true" solid toaster="b-toaster-bottom-right" no-auto-hide no-close-button>-->
    <!--      <template #toast-title>-->
    <!--        <div class="w-100" style="display: flex; flex-direction: row;">-->
    <!--          <div style="flex: 1;font-size: 15px;line-height: 35px;">-->
    <!--            Download Ready (2)-->
    <!--          </div>-->

    <!--          <div>-->
    <!--            <b-button variant="link" style="color: white;">-->
    <!--              <b-icon icon="chevron-compact-down"></b-icon>-->
    <!--            </b-button>-->
    <!--            <b-button variant="link" style="color: white;">-->
    <!--              <b-icon icon="x"></b-icon>-->
    <!--            </b-button>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--      <div style="max-height: 200px; overflow: auto;">-->
    <!--        <ul class="w-100">-->
    <!--          <li style="background-color: #f5e5e4;">-->
    <!--            <div>Collection-xxxxxx-1</div>-->
    <!--            <div>-->
    <!--              &lt;!&ndash;              <ProgressCircle value="30" min="0" max="100"/>&ndash;&gt;-->
    <!--              <b-button variant="link-secondary">-->
    <!--                <b-icon icon="arrow-repeat"></b-icon>-->
    <!--              </b-button>-->
    <!--              <b-button variant="link-secondary">-->
    <!--                <b-icon icon="trash"></b-icon>-->
    <!--              </b-button>-->
    <!--            </div>-->
    <!--          </li>-->
    <!--          <li>-->
    <!--            <div>Collection-xxxxxx-2</div>-->
    <!--            <div>-->
    <!--              <ProgressCircle :value="30" :min="0" :max="100"/>-->
    <!--              <b-button variant="link-secondary">-->
    <!--                <b-icon icon="x"></b-icon>-->
    <!--              </b-button>-->
    <!--            </div>-->
    <!--          </li>-->
    <!--          <li>-->
    <!--            <div>Collection-groups-xxxxxx-1</div>-->
    <!--            <div>-->
    <!--              <ProgressCircle :value="99.999" :min="0" :max="100"/>-->
    <!--              <b-button variant="link-secondary">-->
    <!--                <b-icon icon="x"></b-icon>-->
    <!--              </b-button>-->
    <!--            </div>-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--    </b-toast>-->
    <b-toast id="download-toast" v-if="files && files.length > 0" :visible="true" solid toaster="b-toaster-bottom-right"
             no-auto-hide no-close-button>
      <template #toast-title>
        <div class="w-100" style="display: flex; flex-direction: row;">
          <div style="flex: 1;font-size: 15px;line-height: 35px;">
            Downloading Datasets ({{files.length}})
          </div>

          <div>
            <b-button variant="link" style="color: white;">
              <b-icon icon="chevron-compact-down"></b-icon>
            </b-button>
            <b-button variant="link" style="color: white;">
              <b-icon icon="x"></b-icon>
            </b-button>
          </div>
        </div>
      </template>
      <div style="max-height: 200px; overflow: auto;">
        <ul class="w-100">
          <li v-for="file in files" :key="file.fileId">
            <div>{{ file.name }}</div>
            <div>
              <ProgressCircle :value="file.download.progress" :min="0" :max="100"/>
              <b-button variant="link-secondary">
                <b-icon icon="x"></b-icon>
              </b-button>
            </div>
          </li>
        </ul>
      </div>
    </b-toast>
  </div>
</template>

<script>
import store from "../store";
import ProgressCircle from "@/components/ProgressCircle";

export default {
  name: "CollectionToastQueue",
  components: {ProgressCircle},
  store: store,
  computed: {
    files() {
      return this.$store.getters["emcFile/getDownloadProcessingFiles"]()
    }
  }
}
</script>

<style scoped>
ul {
  margin: 0px;
  padding: 0px;
}

ul li {
  border-bottom: 1px solid #f4f4f5;
  line-height: 38px;
  display: flex;
  flex-direction: row;
}

ul li:last-child {
  border-bottom: none;
}

ul li div:first-child {
  padding-left: 10px;
  flex: 1;
}

</style>