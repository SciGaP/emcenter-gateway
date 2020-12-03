<template>
  <div id="app">
    <div class="h-100 page-header">
      EMC Gateway
    </div>
    <div class="h-100 p-3 page-body">
      <div class="p-3 left-menu">
        <div class="p-3 left-menu-profile">
          <b-icon icon="person" style="width: 100px; height: 100px;"></b-icon>
          <div class="left-menu-profile-name">Joe David</div>
          <div class="left-menu-profile-role">Researcher</div>
        </div>
        <div class="p-3 left-menu-navigation">
          <ul>
            <li>
              <router-link to="/dashboard">
                <b-icon icon="bounding-box"></b-icon>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/datasets">
                <b-icon icon="bar-chart-line-fill"></b-icon>
                Datasets
              </router-link>
            </li>
            <li>
              <router-link to="/profile">
                <b-icon icon="person-fill"></b-icon>
                Profile
              </router-link>
            </li>
            <li>
              <router-link to="/settings">
                <b-icon icon="tools"></b-icon>
                Settings
              </router-link>
            </li>
            <li style="margin-top: 100px;">
              <router-link to="/settings">
                <b-icon icon="box-arrow-left"></b-icon>
                Logout
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-3" style="flex: 1;">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.page-header {
  padding: 10px 25px;
  font-size: 25px;
  color: #990201;
}

.page-body {
  display: flex;
  flex-direction: row;
  background: #f6f6f6;
}

.left-menu {
  width: 250px;
  background-color: white;
  border-radius: 10px;
}

.left-menu-navigation {

}

.left-menu-profile {
  text-align: center;
  color: #707070;
}

.left-menu-profile .left-menu-profile-name {
  font-weight: 600;
  font-size: 21px;
}

.left-menu-profile .left-menu-profile-role {
  font-size: 13px;
}

.left-menu-navigation ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

.left-menu-navigation ul li a {
  color: #707070;
  margin-bottom: 20px;
  display: block;
}

.left-menu-navigation ul li a:hover {
  color: #990201;
  text-decoration: none;
}

.left-menu-navigation ul li a svg {
  margin-right: 10px;
}
</style>
