var searchIt = function (){
	var searchText = document.getElementById("searchTxt")

	if (searchText.value != ""){
		for(var i = 0, len=localStorage.length; i<len; i++){
			var key = localStorage.key[i];
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			for(n in obj){
				if (searchText === obj[n][1]){
					for(var j in obj){
						var optSubText = obj[j][0] + " " + obj[j][1];
						console.log(optSubText);
					}
				}				
			}
		}		 
	}
}

console.log("working?");

var searchClicker = document.getElementById("searchBtn")
searchClicker.addEventListener("click", searchIt);