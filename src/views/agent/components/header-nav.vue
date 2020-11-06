<template>
  <div class="header">
    <tw-row :gutter="15">
      <tw-col :xl="8" :lg="8" :md="12" :xs="12">
        <div class="building message">
          <span class="title">Building</span>
          <div class="icon">
            <span class="icon-cog"></span>
          </div>
          <span class="number">{{ building }}</span>
        </div>
      </tw-col>
      <tw-col :xl="8" :lg="8" :md="12" :xs="12">
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
            <tw-col :xl="8" :lg="24" :md="8" :xs="8">
              <div class="account-title">ALL</div>
              <div class="account-total">{{ total }}</div>
            </tw-col>
            <tw-col :xl="8" :lg="24" :md="8" :xs="8">
              <div class="account-title">PHYSICAL</div>
              <div class="account-total">{{ physical }}</div>
            </tw-col>
            <tw-col :xl="8" :lg="24" :md="8" :xs="8">
              <div class="account-title">VIRTUAL</div>
              <div class="account-total">{{ virtual }}</div>
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
  margin-top: 10px;
}
.message{
  position: relative;
  width: 100%;
  height: 144px;
  color: #fff;
  .title{
    position: absolute;
    top: 16px;
    left: 12px;
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
  padding: 30px 20px;
  ::v-deep .tw-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .tw-col{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
  }
  &-title{
    font-size: 12px;
  }
  &-total{
    font-size: 20px;
    font-weight: 600;
  }
}
@media screen and (max-width: 768px) {
  .account{
    margin: 10px 0;
  }
}
</style>


