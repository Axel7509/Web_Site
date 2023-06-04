var filterBtns = document.getElementsByClassName('filter-update')

for (i = 0; i < filterBtns.length; i++) {
	filterBtns[i].addEventListener('click', function(){
		var filterId = this.dataset.filter

		console.log('filterId:', filterId)
        updateFilterId(filterId)
	})
}

function updateFilterId(filterId){

		var url = '/sort_store/'

		fetch(url, {
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				'X-CSRFToken':csrftoken,
			},
			body:JSON.stringify({'filterId':filterId})
		})

}