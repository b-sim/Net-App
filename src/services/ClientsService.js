import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('clients', {
      params: {
        search: search
      }
    })
  },
  indexMongo (search) {
    return Api().get('mongoClients', {
      params: {
        search: search
      }
    })
  },
  postMongo (client) {
    return Api().post('mongoClients', client)
  },
  show (clientId) {
    return Api().get(`clients/${clientId}`)
  },
  post (client) {
    return Api().post('clients', client)
  },
  put (client) {
    return Api().put(`clients/${client.id}`, client)
  }
}