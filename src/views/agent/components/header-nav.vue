<template>
  <div class="header">
    <tw-row :gutter="15">
      <tw-col :xl="8" :lg="8" :md="12">
        <div class="building message">
          <span class="title">Building</span>
          <div class="icon">
            <span class="icon-cog"></span>
          </div>
          <span class="number">{{ building }}</span>
        </div>
      </tw-col>
      <tw-col :xl="8" :lg="8" :md="12">
        <div class="idle message">
          <span class="title">Idle</span>
          <div class="icon">
            <span class="icon-coffee"></span>
          </div>
          <span class="number">{{ idle }}</span>
        </div>
      </tw-col>
      <tw-col :xl="8" :lg="8" :md="24">
        <div class="account message">
          <tw-row :gutter="10">
            <tw-col :xl="24" :lg="24" :md="8" :xs="8">
              <tw-row :gutter="10">
                <tw-col :xl="12" :lg="12" :md="24" class="account-title">ALL</tw-col>
                <tw-col :xl="12" :lg="12" :md="24" class="account-total">{{ total }}</tw-col>
              </tw-row>
            </tw-col>
            <tw-col :xl="24" :lg="24" :md="8" :xs="8">
              <tw-row :gutter="10">
                <tw-col :xl="12" :lg="12" :md="24" class="account-title">PHYSICAL</tw-col>
                <tw-col :xl="12" :lg="12" :md="24" class="account-total">{{ physical }}</tw-col>
              </tw-row>
            </tw-col>
            <tw-col :xl="24" :lg="24" :md="8" :xs="8">
              <tw-row :gutter="10">
                <tw-col :xl="12" :lg="12" :md="24" class="account-title">VIRTUAL</tw-col>
                <tw-col :xl="12" :lg="12" :md="24" class="account-total">{{ virtual }}</tw-col>
              </tw-row>
            </tw-col>
          </tw-row>
        </div>
      </tw-col>
    </tw-row>
  </div>
</template>
<script>
import { getAgentsList } from 'api/agent'
export default {
  data() {
    return {
      building: '0',
      idle: '0',
      total: '0',
      physical: '',
      virtual: ''
    }
  },
  created () {
    this.getAgentsList()
  },
  methods: {
    getAgentsList () {
      getAgentsList().then(res => {
        let building = []
        let idle = []
        let physical = []
        let virtual = []
        this.total = res.length
        res.forEach(item => {
          item.status === 'building' && (building.push(item))
          item.status === 'idle' && (idle.push(item))
          item.type === 'physical' && (physical.push(item))
          item.type === 'virtual' && (virtual.push(item))
        })
        this.building = building.length
        this.idle = idle.length
        this.physical = physical.length
        this.virtual = virtual.length
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
  margin: 10px;
}
.message{
  position: relative;
  width: 100%;
  height: 135px;
  color: #fff;
  .title{
    position: absolute;
    top: 12px;
    left: 8px;
    font: 18px blod;
  }
  .icon{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      font-size: 144px;
      opacity: 20%;
    }
  }
  .number{
    position: absolute;
    right: 10px;
    bottom: 15px;
    font-size: 48px;
  }
}
.building{
  background-color: #FFB900;
}
.idle{
  background-color: #7FBC39;
}
.account{
  background-color: #fff;
  color: #333;
  padding: 20px;
  &-title{
    font-size: 12px;
    padding: 10px 0;
  }
  &-total{
    font-size: 20px;
    font-weight: 600;
    text-align: right;
  }
}
@media screen and (max-width: 1024px) {
  .account{
    margin: 10px 0;
    &-title,&-total{
      text-align: center !important;
      padding: 15px 0;
    }
  }
}
</style>


