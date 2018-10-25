import Api from '@/services/Api'

export default {
  post (clientInfo) {
    return Api().post('createjson', clientInfo)
  }
}