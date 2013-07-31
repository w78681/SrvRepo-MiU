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
		if ($("#itemSpoil").attr("checked")){
			spoilValue = "Yes";
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
		item.name			= ["Name: ", $('#itemName').val()];
		item.category		= ["Type: ", $('#itemType').val()];
		item.cost			= ["Cost: ", $('#itemCost').val()];
		item.amount			= ["Amount: ", $('#itemAmount').val()];
		if ($('#spoilValue').is(':checked')){
			spoilValue = "Yes";
		} else {
			spoilValue = "No";
		}		
		item.spoil			= ["Spoil: ", spoilValue];
		item.removedate 	= ["Remove Date: ", $('#itemRemoveDate').val()];
		if ($('#itemDescription').val() == "A brief description of the item if needed."){
			item.description = ""
		} else {
			item.description	= ["Description: ", $('#itemDescription').val()];
		};
		localStorage.setItem(id, JSON.stringify(item));
				
		amIChecked();
		alert("Data Saved!");
	};	
	
});

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
	var theInvDiv = document.getElementById('displayDataDiv');
	theInvDiv.appendChild(divider);
	var myList = document.createElement('ul');
	divider.appendChild(myList);
	document.getElementById('items').style.display = "block";
	for(var i = 0, len=localStorage.length; i < len; i++){
		var myli = document.createElement('li');
		var linksli = document.createElement('li');
		myList.appendChild(myli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var myObject = JSON.parse(value);
		var mySubLi = document.createElement('ul');
			mySubLi.setAttribute("data-role", "listview");
			mySubLi.setAttribute("data-filter", "true");	
		myli.appendChild(mySubLi);
		getIcon(mySubLi, myObject.category[1]);
		for (var n in myObject){
			var makeSubli = document.createElement('li');
			mySubLi.appendChild(makeSubli);
			var optionSubText = myObject[n][0]+" "+myObject[n][1];
			makeSubli.innerHTML = optionSubText;
			mySubLi.appendChild(linksli); 
		}
		makeItemLinks(localStorage.key(i), linksli)  //create edit and delete links for local storage items.

	}
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

function makeItemLinks(key, linksli){ //create edit and delete nav for displayed items
	//edit item link
	var editItemLink = document.createElement('a');
	editItemLink.href = "#pageEditItemForm";
	editItemLink.key = key;
	var editItemText = "Edit ";
	editItemLink.addEventListener("click", editMyItem);
	editItemLink.innerHTML = editItemText;
	linksli.appendChild(editItemLink);
	
	//delete item link
	var deleteItemLink = document.createElement('a');
	deleteItemLink.href = "#";
	deleteItemLink.key = key;
	var deleteItemText = " Delete";
	deleteItemLink.addEventListener("click", deleteMyItem);
	deleteItemLink.innerHTML = deleteItemText
	linksli.appendChild(deleteItemLink);
}

function editMyItem(){
	//grab data from item from local storage
	var keyvalue = localStorage.getItem(this.key);
	var item = JSON.parse(keyvalue);


	//populate the form fields with current localStorage values
	$('#itemname').val()		= item.name[1];
	$('#itemcategory').val() 	= item.category[1];
	$('#itemcost').val() 		= item.cost[1];
	$('#itemammount').val()		= item.ammount[1];
	if(item.spoil[1] == "Yes"){
		$('#itemspoil').attr("checked", "checked");
	}
	$('#itemremovedate').val() 	= item.removedate[1];
	$('#itemdescription').val() = item.description[1];
	
	//remove the initial listener from input 'save item' button.
	submitButton.removeEventListener("click", submitData);
	
	//change submitButton value to Edit Item
	$('#itemSubmit').val() = "Edit Item";
	var editSubmitButton = $('itemSubmit');
	
	//save the key value established in this function as a property of the editSubmitButton
	editSubmitButton.addEventListener("click", validateItem);
	editSubmitButton.key = this.key;
}

function deleteMyItem(){
	var asktoDelete = confirm("Are your sure you want to delete this item?");
	if(asktoDelete){
		localStorage.removeItem(this.key);
		alert("Item Deleted.");
		window.location.reload();
	}else{
		alert("Item was not deleted.");
	}
};

function deleteMyItem(){
	var asktoDelete = confirm("Are your sure you want to delete this item?");
	if(asktoDelete){
		localStorage.removeItem(this.key);
		alert("Item Deleted.");
		window.location.reload();
	}else{
		alert("Item was not deleted.");
	}
};
								
var clearLocal = function(){
	if(localStorage.length === 0){
		alert("No data to clear.");
	}else{
		localStorage.clear();
		alert("All data deleted.");
		//window.location.reload();
		window.location.href = '#pageMain';
		return false;
	}
};