import url from '../constants/url.js'
import http from '../utils/http.js'

const eventApi = {
  getEventList(params) {
    return http.get(url.URL_GET_LIST_EVENTS_OF_SELLER, { params })
  },
  createEvent(data) {
    return http.post('/events', data)
  },
  updateEvent(eventId, data) {
    return http.put(`/events/${eventId}`, data)
  },
  deleteEvent(eventIds) {
    return http.post('/events/delete', { eventIds })
  },
  createEventCategory({ EcateId, Ename, Edesc, ParentCateId, Status = 1 }) {
    return http.post(url.URL_CREATE_EVENT_CATEGORY, { EcateId, Ename, Edesc, ParentCateId, Status })
  }
}

export default eventApi
