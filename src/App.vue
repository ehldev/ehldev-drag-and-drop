<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 px-0">
          <ul class="list-group">
            <li class="list-group-item">
              <router-link to="/">Una lista</router-link>
            </li>
            <li class="list-group-item">
              <router-link to="/two-columns">2 listas</router-link>
            </li>
          </ul>
        </div>

        <div class="col-md-9 p-4">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>
