$('#pageMain').on('pageinit', function(){
	//code needed for home page goes here
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



	$('#itemName').val("Kraft Cheese");	
	$('#itemName').blur(function() {
		if ($('#itemName').val() === "") {
			$('#itemName').val("Kraft Cheese");
		}		
	});
	$('#itemName').focus(function() {
		if ($('#itemName').val() === "Kraft Cheese") {
			$('#itemName').val("");
		}		
	});

	$('#itemCost').val("2");
	$('#itemCost').blur(function() {
		if ($('#itemCost').val() === "") {
			$('#itemCost').val("2");
		}		
	});
	$('#itemCost').focus(function() {
		if ($('#itemCost').val() === "2") {
			$('#itemCost').val("");
		}		
	});

	var monthAbv = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"),
		theDate = new Date(), 
		daysToAdd = 7
		currentDate = theDate.getDate() + daysToAdd,
		currentMonth = theDate.getMonth(),
		currentYear = theDate.getFullYear();
		
	if (currentDate >= 32) {
		if (currentDate = 32) {currentDate = 1}
		if (currentDate = 33) {currentDate = 2}
		if (currentDate = 34) {currentDate = 3}
		if (currentDate = 35) {currentDate = 4}
		if (currentDate = 36) {currentDate = 5}
		if (currentDate = 37) {currentDate = 6}
		if (currentDate = 38) {currentDate = 7}
		currentMonth = theDate.getMonth()+1;
		if (currentMonth >= 12) {
			currentMonth = 0;
			currentYear = theDate.getFullYear()+1;
		} 
	};
	
	var formatedDate = monthAbv[currentMonth] + " " + currentDate + ", " + currentYear;

	$('#itemRemoveDate').val(formatedDate);
	$('#itemRemoveDate').blur(function() {
		if ($('#itemRemoveDate').val() === "") {
			$('#itemRemoveDate').val(formatedDate);
		}		
	});
	$('#itemRemoveDate').focus(function() {
		if ($('#itemRemoveDate').val() === formatedDate) {
			$('#itemRemoveDate').val("");
		}		
	});
	
	function checkBoxValue(){
		if ($("#itemSpoil").attr("checked")){
			spoilValue = "Yes";
		} else {
			spoilValue = "No";
		}
	}
	
	var storeData = function(data){
	id = Math.floor(Math.random()*102363265439);
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

		//amIChecked();  // Added to see what my checkbox status is as it keeps returning 'undefined'.

		alert("Data Saved!");
	};	
	
});

$('#pageEditItemForm').on('pageinit', function(){
	var myForm = $('#addItemForm');
	    myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
	var data = myForm.serializeArray();
		editMyItem(data);
		}
	});	
	//code needed for home page goes here
	
});	

$('#pageInventory').on('pageinit', function(){
	$('#ul').listview('refresh');


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

function editMyItem(){
	//grab data from item from local storage
	var keyvalue = localStorage.getItem(this.key);
	var item = JSON.parse(keyvalue);

	//populate the form fields with current localStorage values
	$('itemName').val()	= item.name[1];
	$('itemType').val() = item.category[1];
	$('itemCost').val() = item.cost[1];
	$('itemAmount').val() = item.ammount[1];
	if(item.spoil[1] == "Yes"){$('itemSpoil').Attr("checked", "checked");}
	$('itemRemoveDate').val() = item.removedate[1];
	$('itemDescription').val() = item.description[1];
	
	//remove the initial listener from input 'save item' button.
	submitButton.removeEventListener("click", submitData);
	
	//change submitButton value to Edit Item
	$('itemSubmit').value = "Edit Item";
	var editSubmitButton = $('itemSubmit');
	
	//save the key value established in this function as a property of the editSubmitButton
	editSubmitButton.addEventListener("click", validateItem);
	editSubmitButton.key = this.key;
}

function makeItemLinks(key, linksli){ //create edit and delete nav for displayed items
	//edit item link
	//var editItemLink = document.createElement('a');
	//editItemLink.href = "#pageEditItemForm";
	//editItemLink.key = key;
	//var editItemText = "Edit ";
	//editItemLink.addEventListener("click", editMyItem);
	//editItemLink.innerHTML = editItemText;
	//linksli.appendChild(editItemLink);
	
	//delete item link
	var deleteItemLink = document.createElement('a');
	deleteItemLink.href = "#";
	deleteItemLink.key = key;
	var deleteItemText = " Delete";
	deleteItemLink.addEventListener("click", deleteMyItem);
	deleteItemLink.innerHTML = deleteItemText
	linksli.appendChild(deleteItemLink);
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