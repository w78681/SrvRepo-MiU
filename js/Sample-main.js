$('#pageMain').on('pageinit', function(){
	//code needed for home page goes here

});	
		
$('#pageInventory').on('pageinit', function(){

var clearLink = document.getElementById('clearLocal');
clearLink.addEventListener("click", clearLocal);

	if (localStorage.length === 0) {
	alert("No Data stored.  Default data add.");
	autoFillData();
	}
	var divider = document.createElement('div');
	divider.setAttribute("id", "items");
	var myList = document.createElement('ul');
	divider.appendChild(myList);
	document.body.appendChild(divider);	
	document.getElementById('items').style.display = "block";
	for(var i = 0, len=localStorage.length; i < len; i++){
		var myli = document.createElement('li');
		var linksli = document.createElement('li');
		myList.appendChild(myli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var myObject = JSON.parse(value);
		var mySubLi = document.createElement('ul');
		myli.appendChild(mySubLi);
		getIcon(mySubLi, myObject.category[1]);
		for (var n in myObject){
			var makeSubli = document.createElement('li');
			mySubLi.appendChild(makeSubli);
			var optionSubText = myObject[n][0]+" "+myObject[n][1];
			makeSubli.innerHTML = optionSubText;
			mySubLi.appendChild(linksli); 
		}
	}
});	
		
$('#pageAddItemForm').on('pageinit', function(){
	var myForm = $('#addItemForm');
	    myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
	var data = myForm.serializeArray();
		storeData(data);
		}
	});	
	//any other code needed for addItem page goes here
	
	function checkBoxValue(){
		if (document.getElementById("itemspoil").checked){
			spoilValue = document.getElementById("itemspoil").value;
		} else {
			spoilValue = "No";
		}
	}
	
	var storeData = function(data){
	//if there is no key, this if statement sets a new key and stores data
	//var key = 0;
	//if (!key){
		id = Math.floor(Math.random()*102363265439);
	//}else{
	//	id = key;
	//}
	//checkBoxValue();
	var item				= {};
		item.name			= ["Name: ", document.getElementById('itemName').value];
		item.category		= ["Type: ", document.getElementById('itemType').value];
		item.cost			= ["Cost: ", document.getElementById('itemCost').value];
		item.amount			= ["Amount: ", document.getElementById('itemAmount').value];
		item.spoil			= ["Spoil: ", spoilValue];
		item.removedate 	= ["Remove Date: ", document.getElementById('itemRemoveDate').value];
		
		if (document.getElementById('itemDescription').value == "A brief description of the item if needed."){
			item.description = ""
		} else {
			item.description	= ["Description: ", document.getElementById('itemDescription').value];
		};
		localStorage.setItem(id, JSON.stringify(item));
		alert("Data Saved!");
	};
	 
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

// get icon based on localstorage category field
function getIcon(mySubLi, iconCategory){
	var iconLi = document.createElement('li');
	mySubLi.appendChild(iconLi);
	var newIcon = document.createElement('img');
	var newIconSrc = newIcon.setAttribute("src", "img/" + iconCategory + ".jpg");
	iconLi.appendChild(newIcon);
}

var autoFillData = function(){
	for (var n in json){
		var id = Math.floor(Math.random()*102363265439);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}	 
};


var	deleteItem = function (){
			
};
					
var clearLocal = function(){
	if(localStorage.length === 0){
		alert("No data to clear.");
	}else{
		localStorage.clear();
		alert("All data deleted.");
		//window.location.reload();
		return false;
	}
};

var spoilValue = "No";

