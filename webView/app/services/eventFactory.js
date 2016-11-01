'use strict';
app.service("eventFactory", function($http, hostedServer){

this.getEventsAndPhotos = () => {
	return $http
		.get(hostedServer + '/get/Events/Photos')
}

this.getSingleEvent = (id) => {
	let eventObj = {
			"id": id,
			"count": 0
		}
		return $http
			.post(hostedServer + '/event/' + id, eventObj)
}

this.getMorePhotos =  (eventObj) => {
		return $http
			.post(hostedServer + '/event/' + eventObj.id, eventObj)
	}
})
