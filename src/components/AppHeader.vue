<!--<template>-->
<!--  <header class="rvt-header" role="banner">-->
<!--    <a class="rvt-skip-link" href="#main-content">Skip to content</a>-->
<!--    <div class="rvt-header__trident">-->
<!--      <svg class="rvt-header__trident-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 48" aria-hidden="true">-->
<!--        <title id="iu-logo">Indiana University Logo</title>-->
<!--        <rect width="41" height="48" fill="#900"/>-->
<!--        <polygon-->
<!--            points="24.59 12.64 24.59 14.98 26.34 14.98 26.34 27.78 22.84 27.78 22.84 10.9 24.59 10.9 24.59 8.57 16.41 8.57 16.41 10.9 18.16 10.9 18.16 27.78 14.66 27.78 14.66 14.98 16.41 14.98 16.41 12.64 8.22 12.64 8.22 14.98 9.97 14.98 9.97 30.03 12.77 33.02 18.16 33.02 18.16 36.52 16.41 36.52 16.41 39.43 24.59 39.43 24.59 36.52 22.84 36.52 22.84 33.02 28 33.02 31.01 30.03 31.01 14.98 32.78 14.98 32.78 12.64 24.59 12.64"-->
<!--            fill="#fff"/>-->
<!--      </svg>-->
<!--    </div>-->
<!--    <span class="rvt-header__title">-->
<!--        <a href="#0">{{ $t('app.top-header.title') }}</a>-->
<!--    </span>-->
<!--    <div v-if="authenticated" class="rvt-header__controls">-->
<!--      <div class="rvt-header-id">-->
<!--        <div href="#0" class="rvt-header-id__profile">-->
<!--          <span class="rvt-header-id__avatar" aria-hidden="true">{{ currentUsernameInTwoLetters }}</span>-->
<!--          <span class="rvt-header-id__user">{{ currentUsername }}</span>-->
<!--        </div>-->
<!--        <a href="#0" class="rvt-header-id__log-out" v-on:click.prevent="logout">-->
<!--          Log out-->
<!--        </a>-->
<!--      </div>-->
<!--      <button type="button" class="rvt-drawer-button" aria-haspopup="true" aria-expanded="false"-->
<!--              data-drawer-toggle="mobile-drawer">-->
<!--        <span class="sr-only">Toggle menu</span>-->
<!--        <svg aria-hidden="true" class="rvt-drawer-button-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">-->
<!--          <g fill="currentColor">-->
<!--            <path d="M15,3H1A1,1,0,0,1,1,1H15a1,1,0,0,1,0,2Z"/>-->
<!--            <path d="M15,9H1A1,1,0,0,1,1,7H15a1,1,0,0,1,0,2Z"/>-->
<!--            <path d="M15,15H1a1,1,0,0,1,0-2H15a1,1,0,0,1,0,2Z"/>-->
<!--          </g>-->
<!--        </svg>-->
<!--        <svg aria-hidden="true" class="rvt-drawer-button-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">-->
<!--          <path fill="currentColor"-->
<!--                d="M9.41,8l5.29-5.29a1,1,0,0,0-1.41-1.41L8,6.59,2.71,1.29A1,1,0,0,0,1.29,2.71L6.59,8,1.29,13.29a1,1,0,1,0,1.41,1.41L8,9.41l5.29,5.29a1,1,0,0,0,1.41-1.41Z"/>-->
<!--        </svg>-->
<!--      </button>-->
<!--    </div>-->
<!--    <div v-if="authenticated" class="rvt-drawer" aria-hidden="true" id="mobile-drawer">-->
<!--      <div class="rvt-header-id rvt-header-id&#45;&#45;drawer">-->
<!--        <div class="rvt-header-id__profile rvt-header-id__profile&#45;&#45;drawer p-all-sm">-->
<!--          <span class="rvt-header-id__avatar" aria-hidden="true">{{ currentUsernameInTwoLetters }}</span>-->
<!--          <span class="rvt-header-id__user">{{ currentUsername }}</span>-->
<!--          <a href="#0" class="rvt-header-id__log-out" v-on:click.prevent="logout">-->
<!--            Log out-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->
<!--      <button type="button" class="rvt-drawer__bottom-close">Close nav</button>-->
<!--    </div>-->
<!--  </header>-->
<!--</template>-->

<template>
  <header class="rvt-header" role="banner">
    <a class="rvt-skip-link" href="#main-content">Skip to content</a>
    <!-- Trident -->
    <div class="rvt-header__trident">
      <svg class="rvt-header__trident-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 48" aria-hidden="true">
        <title id="iu-logo">Indiana University Logo</title>
        <rect width="41" height="48" fill="#900"/>
        <polygon
            points="24.59 12.64 24.59 14.98 26.34 14.98 26.34 27.78 22.84 27.78 22.84 10.9 24.59 10.9 24.59 8.57 16.41 8.57 16.41 10.9 18.16 10.9 18.16 27.78 14.66 27.78 14.66 14.98 16.41 14.98 16.41 12.64 8.22 12.64 8.22 14.98 9.97 14.98 9.97 30.03 12.77 33.02 18.16 33.02 18.16 36.52 16.41 36.52 16.41 39.43 24.59 39.43 24.59 36.52 22.84 36.52 22.84 33.02 28 33.02 31.01 30.03 31.01 14.98 32.78 14.98 32.78 12.64 24.59 12.64"
            fill="#fff"/>
      </svg>
    </div>
    <!-- App title -->
    <span class="rvt-header__title">
        <a href="#">{{ $t('app.top-header.title') }}</a>
    </span>
    <!-- Wrapper for header interactive elements -->
    <div class="rvt-header__controls">
      <!-- Main inline nav element -->
      <nav class="rvt-header__main-nav" role="navigation">
        <ul>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <div class="rvt-dropdown">
              <button type="button" class="rvt-dropdown__toggle" data-dropdown-toggle="dropdown-1" aria-haspopup="true"
                      aria-expanded="false">
                <span class="rvt-dropdown__toggle-text">Settings</span>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <title>Dropdown icon</title>
                  <path fill="currentColor"
                        d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z"
                  />
                </svg>
              </button>
              <div class="rvt-dropdown__menu" id="dropdown-1" role="menu" aria-hidden="true">
                <router-link to="/groups" v-slot="{ href, route, navigate, isActive}" tag="">
                  <a :class="{active: isActive}" :href="href" @click="navigate">
                    <!--                    <b-icon icon="bar-chart-line-fill"></b-icon>-->
                    {{ $t('app.left-nav.menu.item.name.groups') }}
                  </a>
                </router-link>
                <router-link to="/researchers" v-slot="{ href, route, navigate, isActive}" tag="">
                  <a :class="{active: isActive}" :href="href" @click="navigate">
                    <!--                    <b-icon icon="bar-chart-line-fill"></b-icon>-->
                    {{ $t('app.left-nav.menu.item.name.researchers') }}
                  </a>
                </router-link>
                <a href="#">-- TBA --</a>
              </div>
            </div>
          </li>
          <!--          <li>-->
          <!--            <a href="#" aria-current="page">Nav three</a>-->
          <!--          </li>-->
          <!--          <li>-->
          <!--            <div class="rvt-dropdown">-->
          <!--              <button type="button" class="rvt-dropdown__toggle" data-dropdown-toggle="dropdown-2" aria-haspopup="true"-->
          <!--                      aria-expanded="false">-->
          <!--                <span class="rvt-dropdown__toggle-text">Nav four</span>-->
          <!--                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">-->
          <!--                  <path fill="currentColor"-->
          <!--                        d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z"/>-->
          <!--                </svg>-->
          <!--              </button>-->
          <!--              <div class="rvt-dropdown__menu" id="dropdown-2" role="menu" aria-hidden="true">-->
          <!--                <a href="#">Item one</a>-->
          <!--                <a href="#">Item two</a>-->
          <!--                <a href="#">Item three</a>-->
          <!--                <a href="#">Item four</a>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </li>-->
        </ul>
      </nav>
      <!-- ID menu w/ dropdown -->
      <div class="rvt-header-id">
        <div class="rvt-dropdown">
          <button type="button" class="rvt-header-id__profile rvt-header-id__profile--has-dropdown rvt-dropdown__toggle"
                  data-dropdown-toggle="id-dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="rvt-header-id__avatar" aria-hidden="true">{{ currentUsernameInTwoLetters }}</span>
            <span class="rvt-header-id__user">{{ currentUsername }}</span>
            <svg aria-hidden="true" class="rvt-m-left-xs" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                 viewBox="0 0 16 16">
              <path fill="currentColor"
                    d="M8,12.46a2,2,0,0,1-1.52-.7L1.24,5.65a1,1,0,1,1,1.52-1.3L8,10.46l5.24-6.11a1,1,0,0,1,1.52,1.3L9.52,11.76A2,2,0,0,1,8,12.46Z"/>
            </svg>
          </button>
          <div class="rvt-dropdown__menu rvt-header-id__menu" id="id-dropdown" aria-hidden="true">
            <a href="#">Profile</a>
            <div role="group" aria-label="User actions">
              <a href="" v-on:click.prevent="logout">Log out</a>
            </div>
          </div>
        </div>
      </div>
      <!-- Drawer close button - shows on small screens -->
      <button type="button" class="rvt-drawer-button" aria-haspopup="true" aria-expanded="false"
              data-drawer-toggle="mobile-drawer-2">
        <span class="sr-only">Toggle menu</span>
        <svg aria-hidden="true" class="rvt-drawer-button-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <g fill="currentColor">
            <path d="M15,3H1A1,1,0,0,1,1,1H15a1,1,0,0,1,0,2Z"/>
            <path d="M15,9H1A1,1,0,0,1,1,7H15a1,1,0,0,1,0,2Z"/>
            <path d="M15,15H1a1,1,0,0,1,0-2H15a1,1,0,0,1,0,2Z"/>
          </g>
        </svg>
        <svg aria-hidden="true" class="rvt-drawer-button-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path fill="currentColor"
                d="M9.41,8l5.29-5.29a1,1,0,0,0-1.41-1.41L8,6.59,2.71,1.29A1,1,0,0,0,1.29,2.71L6.59,8,1.29,13.29a1,1,0,1,0,1.41,1.41L8,9.41l5.29,5.29a1,1,0,0,0,1.41-1.41Z"/>
        </svg>
      </button>
    </div>
    <!--
        Drawer - small screens only
        NOTE: If we are going to give people the option to use the drawer
        on desktop as well, a combo of duplicating markup and showing/hiding
        is probably the best way to handle that kind of flexibility.
        We'll just need to be clear about it in the documentation.
    -->
    <div class="rvt-drawer" aria-hidden="true" id="mobile-drawer-2">
      <!-- Drawer nav -->
      <nav class="rvt-drawer__nav" role="navigation">
        <ul>
          <li class="has-children">
            <button type="button" class="rvt-header-id__profile rvt-header-id__profile--drawer"
                    data-subnav-toggle="subnav-id" aria-haspopup="true" aria-expanded="false">
              <span class="rvt-header-id__avatar" aria-hidden="true">{{ currentUsernameInTwoLetters }}</span>
              <span class="rvt-header-id__user rvt-header-id__user--has-dropdown">{{ currentUsername }}</span>
            </button>
            <div id="subnav-id" role="menu" aria-hidden="true">
              <ul>
                <li>
                  <a href="#">Profile</a>
                </li>
                <li>
                  <a href="" v-on:click.prevent="logout">Log out</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li class="has-children">
            <button type="button" data-subnav-toggle="subnav-1" aria-haspopup="true" aria-expanded="false">Settings
            </button>
            <div id="subnav-1" role="menu" aria-hidden="true">
              <ul>
                <li>
                  <router-link to="/groups" v-slot="{ href, route, navigate, isActive}" tag="">
                    <a :class="{active: isActive}" :href="href" @click="navigate">
                      <!--                      <b-icon icon="bar-chart-line-fill"></b-icon>-->
                      {{ $t('app.left-nav.menu.item.name.groups') }}
                    </a>
                  </router-link>
                </li>
                <li>
                  <router-link to="/researchers" v-slot="{ href, route, navigate, isActive}" tag="">
                    <a :class="{active: isActive}" :href="href" @click="navigate">
                      <!--                      <b-icon icon="bar-chart-line-fill"></b-icon>-->
                      {{ $t('app.left-nav.menu.item.name.researchers') }}
                    </a>
                  </router-link>
                </li>
                <li>
                  <a href="#">-- TBA --</a>
                </li>
              </ul>
            </div>
          </li>
          <!--          <li>-->
          <!--            <a href="#" aria-current="page">Nav three</a>-->
          <!--          </li>-->
          <!--          <li class="has-children">-->
          <!--            <button type="button" data-subnav-toggle="subnav-2" aria-haspopup="true" aria-expanded="false">Nav four-->
          <!--            </button>-->
          <!--            <div id="subnav-2" role="menu" aria-hidden="true">-->
          <!--              <ul>-->
          <!--                <li>-->
          <!--                  <a href="#">Subnav one</a>-->
          <!--                </li>-->
          <!--                <li>-->
          <!--                  <a href="#">Subnav two</a>-->
          <!--                </li>-->
          <!--                <li>-->
          <!--                  <a href="#">Subnav three</a>-->
          <!--                </li>-->
          <!--              </ul>-->
          <!--            </div>-->
          <!--          </li>-->
        </ul>
        <button type="button" class="rvt-drawer__bottom-close">Close nav</button>
      </nav>
    </div>
  </header>
</template>

<script>

import store from "../store";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'AppHeader',
  store: store,
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      currentUsername: "auth/currentUsername",
      isAdmin: "auth/isAdmin",
      getUser: "user/getUser"
    }),
    user() {
      return this.getUser({username: this.currentUsername});
    },
    currentUsernameInTwoLetters() {
      return this.currentUsername.substring(0, 2).toUpperCase();
    }
  },
  methods: {
    ...mapActions({
      fetchUsers: "user/fetchUsers",
      logoutAction: "auth/logout",
      refreshAuthentication: "auth/refreshAuthentication"
    }),
    async logout() {
      await this.logoutAction();
    },
    async fetchAuthenticatedUser() {
      if (this.authenticated && (!this.user || this.user.username !== this.currentUsername)) {
        await this.fetchUsers({
          offset: 0,
          limit: 1,
          username: this.currentUsername
        });
      }
    },
    redirectToLoginIfNotAuthenticated() {
      if (!this.authenticated && this.$router.currentRoute.path !== "/") {
        this.$router.push('/')
      }
    }
  },
  watch: {
    authenticated() {
      this.redirectToLoginIfNotAuthenticated();
    },
    currentUsername() {
      if (this.currentUsername) {
        this.fetchAuthenticatedUser()
      }
    }
  },
  beforeMount() {
    this.refreshAuthentication();
    this.fetchAuthenticatedUser();
    this.redirectToLoginIfNotAuthenticated();
  }
}
</script>

<style scoped>
</style>
