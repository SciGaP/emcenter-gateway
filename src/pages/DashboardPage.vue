<template>
  <div>
    <div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">New Data</div>
        <div class="dashboard-card-date">
          <label>Date</label>
          <b-datepicker/>
        </div>
        <div class="w-100 dashboard-card-stats">
          <div class="dashboard-card-stats-item">
            <div class="dashboard-card-stats-item-figure">2</div>
            <div class="dashboard-card-stats-item-caption">COLLECTIONS</div>
          </div>
          <div class="dashboard-card-stats-item">
            <div class="dashboard-card-stats-item-figure">200</div>
            <div class="dashboard-card-stats-item-caption">FILES</div>
          </div>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">Download History</div>
        <div class="dashboard-card-date">
          <label>Date</label>
          <b-datepicker/>
        </div>
        <div class="w-100 dashboard-card-stats">
          <div class="dashboard-card-stats-item">
            <div class="dashboard-card-stats-item-figure">6</div>
            <div class="dashboard-card-stats-item-caption">COLLECTIONS DOWNLOADED</div>
          </div>
          <div class="dashboard-card-stats-item">
            <div class="dashboard-card-stats-item-figure">1</div>
            <div class="dashboard-card-stats-item-caption">COLLECTIONS PENDING</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">Upload History</div>
        <div class="dashboard-card-date">
          <label>Date</label>
          <b-datepicker/>
        </div>
        <div class="w-100 dashboard-card-stats">
          <div class="dashboard-card-stats-item" style="height: 180px;width: 180px;"></div>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">Share History</div>
        <div class="dashboard-card-date">
          <label>Date</label>
          <b-datepicker/>
        </div>
        <div class="w-100 dashboard-card-stats">
          <div class="dashboard-card-stats-item">
            <div class="dashboard-card-stats-item-figure">2</div>
            <div class="dashboard-card-stats-item-caption">COLLECTIONS</div>
          </div>
          <div class="dashboard-card-stats-item">
            <div class="dashboard-card-stats-item-figure">5</div>
            <div class="dashboard-card-stats-item-caption">RESEARCHERS</div>
          </div>
          <div class="dashboard-card-stats-item">
            <div class="dashboard-card-stats-item-figure">2</div>
            <div class="dashboard-card-stats-item-caption">DOWNLOADED BY</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardPage"
}
</script>

<style scoped>
.dashboard-card {
  /*width: 400px;*/
  height: 350px;
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 3px 6px #5C5C5C29;
  display: inline-grid;
}

.dashboard-card .dashboard-card-title {
  color: #707070;
  font-size: 23px;
  margin-bottom: 20px;
}

.dashboard-card .dashboard-card-date {
  font-size: 13px;
  font-weight: 600;
}


.dashboard-card .dashboard-card-stats {
  display: flex;
}

.dashboard-card .dashboard-card-stats .dashboard-card-stats-item {

}

.dashboard-card .dashboard-card-stats .dashboard-card-stats-item .dashboard-card-stats-item-figure {
  width: 125px;
  height: 125px;
  line-height: 110px;
  margin: 20px;
  border: 4px solid #7FC5EF;
  background-color: #F5FBFF;
  border-radius: 50%;
  text-align: center;
}

.dashboard-card .dashboard-card-stats .dashboard-card-stats-item .dashboard-card-stats-item-caption {
  color: #707070;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
}


</style>