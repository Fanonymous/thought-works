import service from '@/utils/request'
import baseApi from '@/config'

/**
 * 根据 agent type获取列表
 * @param {*} type 
 */
export function getAgentsList(type) {
  return service({
    url: baseApi.cruise + 'agents',
    method: 'get',
    params: {
      type: type || undefined
    }
  })
}
