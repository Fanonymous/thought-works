<template>
  <div class="table">
    <div class="content">
      <div v-for="item in agentsList" :key="item.id" class="agent-item">
        <div class="agent-logo">
          <img :src="require(`assets/img/${item.os}.png`)" alt="agent">
        </div>
        <div class="agent-mes">
          <tw-row :gutter="10">
            <tw-col :xl="12" :lg="12" :md="24" class="content-icon">
              <span class="icon-desktop"></span>
              <span class="name">{{ item.name }}</span>
              <span :class="{'status-building': item.status === 'building', 'status-idle': item.status === 'idle'}" class="status">{{ item.status }}</span>
            </tw-col>
            <tw-col :xl="6" :lg="6" :md="24" class="content-icon">
              <span class="icon-info"></span>
              <span class="ip">{{ item.ip }}</span>
            </tw-col>
            <tw-col :xl="6" :lg="6" :md="24" class="content-icon">
              <span class="icon-folder"></span>
              <span class="location">{{ item.location }}</span>
            </tw-col>
            <tw-col :xl="20" :lg="20" :md="24" class="agent-operate">
              <tw-button type="primary" only-icon="icon-plus"></tw-button>
              <div>
                <tw-button v-for="(button, index) in item.resources" :key="index" suffix="icon-trash">
                  <span>{{ button }}</span>
                </tw-button>
              </div>
            </tw-col>
            <tw-col :xl="4" :lg="4" :md="24" class="deny">
              <tw-button v-if="item.status === 'building'" type="primary" prefix="icon-deny">
                <span>Deny</span>
              </tw-button>
            </tw-col>
          </tw-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    agentsList: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.content{
  margin: 0 10px;
}
.agent-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-bottom: 15px;
  padding: 16px;
  .agent-logo{
    width: 80px;
    margin-right: 20px;
  }
  .agent-mes{
    width: 0;
    flex: 1;
    .icon-desktop,.icon-info,.icon-folder{
      color: #CDCDCD;
      font-size: 16px;
      margin-right: 6px;
    }
    .content-icon{
      display: flex;
      align-items: center;
    }
    .name{
      color: #3AC5DA;
    }
    .status{
      color: #fff;
      padding: 2px 5px;
      margin-left: 10px;
    }
    .status-building{
      background-color: #FFB900;
    }
    .status-idle{
      background-color: #7FBC39;
    }
    .agent-operate{
      display: flex;
      align-items: center;
      margin-top: 20px;
    }
    .deny{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;
    }
  }
}
@media screen and (max-width: 1024px) {
  .agent-logo{
    display: none;
  }
}
</style>
