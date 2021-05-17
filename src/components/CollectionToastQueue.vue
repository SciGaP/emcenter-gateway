<template>
  <div>
    <b-toast id="downloaded-toast" :visible="true" solid toaster="b-toaster-bottom-right" no-auto-hide no-close-button>
      <template #toast-title>
        <div class="w-100" style="display: flex; flex-direction: row;">
          <div style="flex: 1;font-size: 15px;line-height: 35px;">
            Download Ready (2)
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
          <li style="background-color: #f5e5e4;">
            <div>Collection-xxxxxx-1</div>
            <div>
              <!--              <ProgressCircle value="30" min="0" max="100"/>-->
              <b-button variant="link-secondary">
                <b-icon icon="arrow-repeat"></b-icon>
              </b-button>
              <b-button variant="link-secondary">
                <b-icon icon="trash"></b-icon>
              </b-button>
            </div>
          </li>
          <li>
            <div>Collection-xxxxxx-2</div>
            <div>
              <ProgressCircle value="30" min="0" max="100"/>
              <b-button variant="link-secondary">
                <b-icon icon="x"></b-icon>
              </b-button>
            </div>
          </li>
          <li>
            <div>Collection-groups-xxxxxx-1</div>
            <div>
              <ProgressCircle value="30" min="0" max="100"/>
              <b-button variant="link-secondary">
                <b-icon icon="x"></b-icon>
              </b-button>
            </div>
          </li>
        </ul>
      </div>
    </b-toast>
    <b-toast id="download-toast" :visible="true" solid toaster="b-toaster-bottom-right" no-auto-hide no-close-button>
      <template #toast-title>
        <div class="w-100" style="display: flex; flex-direction: row;">
          <div style="flex: 1;font-size: 15px;line-height: 35px;">
            Downloading Datasets (7)
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
          <li v-for="i in [1,2,3,4,5,6,7,8,9]" :key="i">
            <div>file-xxxxxx-{{ i }}</div>
            <div>
              <ProgressCircle value="30" min="0" max="100"/>
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
import ProgressCircle from "@/components/ProgressCircle";

export default {
  name: "CollectionToastQueue",
  components: {ProgressCircle}
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