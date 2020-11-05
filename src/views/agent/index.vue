<template>
  <div class="agent">
    <header-nav :agents-list="agentsList"></header-nav>
    <menu-search @menuClick="handleMenuClick"></menu-search>
    <table-list :agents-list="agentsList"></table-list>
  </div>
</template>
<script>
import headerNav from './components/header-nav'
import menuSearch from './components/menu-search'
import tableList from './components/table-list'
import { getAgentsList } from 'api/agent'
export default {
  components: { headerNav, menuSearch, tableList },
  data () {
    return {
      agentsList: [],
      type: ''
    }
  },
  created () {
    this.getAgentsList()
  },
  methods: {
    /**
     * 获取list
     */
    getAgentsList () {
      getAgentsList(this.type).then(res => {
        this.agentsList = res
      })
    },
    handleMenuClick (type) {
      this.type = type
      this.getAgentsList()
    }
  }
}
</script>

