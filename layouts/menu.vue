<template>

  <v-app id="inspire">
    
    <v-navigation-drawer
      v-model="drawer"
      app
      class="pt-4"
      color="grey lighten-3"
      expand-on-hover
      permanent
 
    >
 
  
    <NuxtLink to="./pages/home.vue" style="text-decoration: none; color: inherit" >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
           
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
</NuxtLink>
   


      
      <div class="button1">
        <v-btn @click="$router.push('/auth/signout')">Logout</v-btn>
      </div>
    </v-navigation-drawer>

    <v-main>
        <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
 data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Account', icon: 'mdi-account-box' },
          { title: 'Admin', icon: 'mdi-gavel' },
        ],
      }
    },
    
}
</script>
