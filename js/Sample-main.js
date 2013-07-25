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
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

function checkBoxValue(){
	if (getelement('itemspoil').checked){
		spoilValue = getelement('itemspoil').value;
	} else {
		spoilValue = "No";
	}
}

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	//if there is no key, this if statement sets a new key and stores data
	if (!key){
		var id = Math.floor(Math.random()*102363265439);
	}else{
		id = key;
	}
	checkBoxValue();
	var item				= {};
		item.name			= ["Name: ", getelement('itemName').value];
		item.category		= ["Category: ", getelement('itemType').value];
		item.cost			= ["Cost: ", getelement('itemCost').value];
		item.ammount		= ["Ammount: ", getelement('itemAmount').value];
		item.spoil			= ["Spoil: ", spoilValue];
		item.removedate 	= ["Remove Date: ", getelement('itemRemoveDate').value];
		item.description	= ["Description: ", getelement('itemDescription').value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Data Saved!");
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};

var spoilValue = "No";

