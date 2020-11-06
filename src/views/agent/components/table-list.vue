<template>
  <div class="table">
    <div class="content">
      <div v-for="item in agentsList" :key="item.id" :style="{'border-color': item.status === 'building'? '#FFB900' : '#7FBC39'}" class="agent-item">
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
              <tw-popover ref="addResource" placement="bottom-start" customer-class="add-resource">
                <tw-button type="primary" only-icon="icon-plus"></tw-button>
                <template slot="content">
                  <div id="close-popover" class="close" @click="handleCancel">
                    <span class="icon-close"></span>
                  </div>
                  <div class="form">
                    <div class="form-title">
                      <span>Separate multiple resource name width commas</span>
                    </div>
                    <div class="form-input">
                      <tw-input v-model="resources" placeholder="Input value"></tw-input>
                    </div>
                    <div class="form-footer">
                      <tw-button type="primary" @click.native="handleAdd(item)">Add Resources</tw-button>
                      <tw-button id="close-popover" type="warning" @click.native="handleCancel">Cancel</tw-button>
                    </div>
                  </div>
                </template>
              </tw-popover>
              <div class="resources-box">
                <tw-button v-for="(button, index) in item.resources" :key="index" suffix="icon-trash" class="resources-box__item" @click.native="handleDelete(item, index)">
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
import { updateAgentById } from 'api/agent'
export default {
  props: {
    agentsList: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      resources: ''
    }
  },
  methods: {
    // 新增
    handleAdd (item) {
      // 深拷贝
      let obj = Object.assign({}, item)
      if (this.resources) {
        const add = this.resources.split(',')
        obj.resources = obj.resources.concat(add)
      }
      updateAgentById(obj.id, obj).then(() =>{
        this.handleCancel()
        this.$emit('updateList')
      }).catch(e => {
        console.log({ e })
        this.handleCancel()
        this.$emit('updateList')
      })
    },
    // 删除
    handleDelete (item, index) {
      let obj = Object.assign({}, item)
      obj.resources.splice(index, 1)
      updateAgentById(obj.id, obj).then(() =>{
        this.handleCancel()
        this.$emit('updateList')
      }).catch(e => {
        console.log({ e })
        this.handleCancel()
        this.$emit('updateList')
      })
    },
    handleCancel () {
      this.resources = ''
      this.$refs.addResource.forEach(item => {
        item.close()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  margin-top: 10px;
}
.agent-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-bottom: 15px;
  padding: 16px;
  border-left-style: solid;
  border-left-width: 0px;
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
      margin-top: 20px;
      .resources-box{
        &__item{
          margin-bottom: 10px;
        }
      }
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
@media screen and (max-width: 768px) {
  .agent-item{
    border-left-width: 5px !important;
  }
  .content-icon{
    padding: 5px 0;
  }
  .status{
    display: none;
  }
}
</style>
<style lang="scss">
.add-resource{
  position: relative;
  width: 570px;
  border: 2px solid #90D9E4;
  shadow: 0 3px 5px rgba(0, 0, 0, .3);
  .form{
    padding: 16px 12px;
    &-title{
      color: #929292;
    }
    &-input{
      padding-top: 10px;
      padding-bottom: 16px;
    }
  }
  .close{
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 16px;
    color: #00B4CF;
    cursor: pointer;
  }
  &:before{
    top: -22px !important;
    left: 10px !important;
    border-width: 10px !important;
    border-bottom-color: #90D9E4 !important;
  }
  &:after{
    top: -19px !important;
    left: 10px !important;
    border-width: 10px !important;
  }
}
</style>

