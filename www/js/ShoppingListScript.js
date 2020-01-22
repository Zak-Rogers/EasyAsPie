var currentUser;
var mealPlan;
var meals;
var mealTitles;
var daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUser = user;
	console.log(user, "loged in");
	loadDb();
  } else {
    // No user is signed in.
	console.log(" No user is signed in.");
	location.href="Login.html";
  }
});

function addItem() //needs to add to DB
{
	var newItem = document.getElementById("New_Item").value;
	var newQuantity = document.getElementById("New_Item_Quantity").value;
	var dropBox = document.getElementById("Quantity_Unit");
	var newUnit = dropBox.options[dropBox.selectedIndex].value;
	var list= document.getElementById("ShoppingList").innerHTML;
	var database = firebase.database();
	
	/*list += "<li>" + newItem + "</li>";console.log(list);
	list=document.getElementById("QuantityList").innerHTML;
	list += "<li>" + newQuantity + "</li>";
	list = document.getElementById("UnitList").innerHTML;
	list += "<li>" + newUnit + "</li>";
	*/
	//console.log(list);
	list = list.split("</li>");
	/*for(var i =0;i<list.length-1;i++)
	{
		list[i] = list[i].slice(4);
	}
	*/
	
	//console.log(list);
	list.pop();
	//console.log(list.length);
	
	database.ref('Users/' + currentUser.uid + '/ShoppingList/ingredients/' + list.length).set(newItem);
	database.ref('Users/' + currentUser.uid + '/ShoppingList/quantity/' + list.length).set(newQuantity);
	database.ref('Users/' + currentUser.uid + '/ShoppingList/unit/' + list.length).set(newUnit);
	
	document.getElementById("New_Item").value = "";
	document.getElementById("New_Item_Quantity").value ="1";
	dropBox.selectedIndex = 0; 
	//updateDbShopping();
};
function jQAddItem() //example
{
	$(document).ready(function(){
		var newItem = $("#New_Item").val();
		console.log(newItem);
		$("#ShoppingList").append( "<li>" + newItem + "</li>");
	});
};

function loadDb()//
{
	var database = firebase.database();
	var ref = database.ref('Users/' + currentUser.uid + '/Meals/');
	ref.on('value', updateMeals, dataErr);
	
	ref = database.ref('Users/' + currentUser.uid + '/MealPlan/');
	ref.on('value',updateMealPlan,dataErr);
	
	ref = database.ref('Users/' + currentUser.uid + '/ShoppingList/');
	ref.on('value',displayShoppingList, dataErr);
};

function updateMeals(data)
{
	meals = data.val();
	if(meals!=null)
	{
		mealTitles = Object.keys(meals);
	}
};

function updateMealPlan(data)
{
	mealPlan = data.val();
};
	
function dataErr(err)
{
	console.log("error");
	console.log(err);
};

function todaysList()
{
	//generate todays ingredients list.
	//for(varible in object){} loop will execute once for each property of an object. object[varible]
	if(mealPlan != null)
	{
		var date = new Date();
		//load meal
		var todaysMeal= mealPlan[daysOfTheWeek[date.getDay()]];
		//get ingredients.
		if(todaysMeal != " ")
		{
		var ingredients = meals[todaysMeal].ingredients;
		var ing =ingredients["ingredient"];
		var ingQuantity =ingredients["quantity"];
		var quantityUnit = ingredients["unit"];
		
		updateShoppingList(ing,ingQuantity,quantityUnit);
		updateDbShopping();
		}else{console.log("you dnt have a meal set for today");} 
	}else{console.log("you dnt have a mealplan");} 
	
	/*
		Update database with ingredients
		then update page with database list
	*/ //working?
	
};

(function(){

  var todo = document.querySelector( '#todolist' ),
      form = document.querySelector( 'form' ),
      field = document.querySelector( '#newitem' );
    
  form.addEventListener( 'submit', function( ev ) {
    var text = field.value;
    if ( text !== '' ) {
      todo.innerHTML += '<li>' + text + ' <button onclick="Delete(this);">Delete</button> </li>';
      field.value = '';
      //field.focus();
    }
    ev.preventDefault();
  }, false);



})();
  function Delete(currentEl){
  currentEl.parentNode.parentNode.removeChild(currentEl.parentNode);
  }



function updateShoppingList(ing,quantity,unit)
{
	var ingList= document.getElementById("ShoppingList");
	var quantityList = document.getElementById("QuantityList");
	var unitList = document.getElementById("UnitList");
	
	for (var i = 0;i<ing.length;i++)
	{
		ingList.innerHTML += "<li>" + ing[i] + "</li>"; //
		quantityList.innerHTML += "<li>" + quantity[i] + "</li>";
		unitList.innerHTML += "<li>" + unit[i] + "</li>";
	}
};

function updateDbShopping()
{
	var ingList = document.getElementById("ShoppingList").innerHTML;
	var quantityList = document.getElementById("QuantityList").innerHTML;
	var unitList = document.getElementById("UnitList").innerHTML;
	
	ingList = ingList.split("</li>");
	quantityList = quantityList.split("</li>");
	unitList = unitList.split("</li>");
	
	for(var i =0;i<ingList.length-1;i++)
	{
		ingList[i] = ingList[i].slice(4);
		quantityList[i] = quantityList[i].slice(4);
		unitList[i] = unitList[i].slice(4);
	}
	
	ingList.pop();
	quantityList.pop();
	unitList.pop();
	
	var shoppingListObj = createShoppingListObj(ingList,quantityList, unitList);
	
	console.log(shoppingListObj);
	var database = firebase.database();
	database.ref('Users/' + currentUser.uid + "/ShoppingList/").set(shoppingListObj);
};

function createShoppingListObj(items,itemQuantity,units)
{
	/*var sortedLists
	var newItemList = ;
	var newQuantityList = [];
	
	for (var i=0;i<items.length;i++)
	{
		
	}*/
	var listObj = {ingredients:items,quantity: itemQuantity, unit:units};
	console.log(listObj);
	
	/*if(item.length ==0)
	{
		listObj[0] = 
	}*/
	console.log("test");
	return listObj
};

function displayShoppingList(data)
{
	var shoppingList = data.val();
	if(shoppingList != null)
	{
		var ing = shoppingList["ingredients"];
		var quantity = shoppingList["quantity"];
		var unit = shoppingList["unit"];
		console.log(ing);
		var ingListString = "";
		var quantityListString = "";
		var unitListString = "";
		//var ingIndex = Object.keys(shoppingList);
		
		console.log(ing);
		console.log(quantity);
		console.log(unit);
		//var sortedLists = sortLists(ing,quantity,unit);
		
		/*console.log(sortedLists[0]);
		console.log(sortedLists[1]);
		console.log(sortedLists[0][3]);
		*/
		for(var i=0;i<ing.length;i++)//sortedLists.length
		{
			//if(shoppingList[i] !=" ")
			//{			
			 ingListString+= "<li>" + ing[i] + "</li>"; //sortedLists[0][i]
			 quantityListString += "<li>" + quantity[i] + "</li>";	//sortedLists[1][i]
			 unitListString += "<li>" + unit[i] + "</li>";	//sortedLists[2][i]		 
			//}
		}
		document.getElementById("ShoppingList").innerHTML = ingListString;
		document.getElementById("QuantityList").innerHTML = quantityListString;
		document.getElementById("UnitList").innerHTML = unitListString;
		
	}
};

function sortLists(ings,quantitys,units)
{
	//var ingList =ings;
	var ingredient;
	var previousIng ="";
	var ingCount;
	var quantityUnit;
	var newIngList = [];
	var newQuantityList = [];
	var newUnitList = [];
	
	
	//ingList = ingList.sort();
	console.log(ings);
	console.log(quantitys);
	console.log(units);
	//sort duplicates
	for(var i = 0;i<ings.length;i++)
	{
		console.log("1st Loop");
		ingredient = ings[i];
		ingCount=parseInt(quantitys[i]);
		quantityUnit = units[i];
		
		console.log(ingredient);
		console.log(ingCount);
		console.log(quantityUnit);
		console.log(!newIngList.includes(ingredient));
		if(!newIngList.includes(ingredient)) //!= previousIng
		{
			newIngList.push(ingredient);
			
			
			for(var j=i+1;j<ings.length;j++)
			{	
				console.log("2nd loop");
				console.log(ingredient);
				console.log(ings[j]);
				console.log();
				if(ings[j]==ingredient )//&& !newIngList.includes(ingredient) //  && quantityUnit[j] == quantityUnit[i]
				{
					ingCount += parseInt(quantitys[j]);
					console.log(ingCount);
					
					//continue;
				}
				
			}
			newQuantityList.push(ingCount);
			newUnitList.push(quantityUnit);
			previousIng = ingredient;
			
		}
		else{}//continue
	}
	console.log(newIngList);
	console.log(newQuantityList);
	console.log(newUnitList);
	return [newIngList,newQuantityList, newUnitList];
};

function multiDList()
{
	//generate multiple days ingredients list.
};

function sevenDList()
{
	if(mealPlan != null){
	
		if(Object.keys(mealPlan).length == 7)
		{
			var daysMeal;
			var daysIngredients;
			var daysIngQuantity;
			var daysQuantityUnit;
			var weeksIngredients = [];
			var weeksQuantity = [];
			var weeksUnit= [];
			var sortedLists = [];
			//generate 7day ingredients list.
			for(i=0;i<7;i++)
			{
				daysMeal = mealPlan[daysOfTheWeek[i]];
				daysIngredients = meals[daysMeal].ingredients.ingredient;
				daysIngQuantity = meals[daysMeal].ingredients.quantity;
				daysQuantityUnit = meals[daysMeal].ingredients.unit;
				console.log(daysIngredients);
				weeksIngredients = weeksIngredients.concat(daysIngredients); //creates a new array merging two arrays
				weeksQuantity = weeksQuantity.concat(daysIngQuantity);
				weeksUnit = weeksUnit.concat(daysQuantityUnit);
			}
			console.log(weeksIngredients);
			sortedLists = sortLists(weeksIngredients,weeksQuantity,weeksUnit);
			console.log(sortedLists);
			updateShoppingList(sortedLists[0],sortedLists[1],sortedLists[2]);//weeksIngredients,weeksQuantity, weeksUnit
			updateDbShopping();
		}
		else
		{
			console.log("yuo dnt have a seven day plan");
		}
	}else{console.log("you dont have a meal plan");}
};

function clearList()
{
	document.getElementById("ShoppingList").innerHTML = "";
	document.getElementById("QuantityList").innerHTML = "";
	document.getElementById("UnitList").innerHTML = "";
	var database = firebase.database();
	var emptyListObj = {0:" "}
	
	for (var i=0;i<7;i++)
	{
		database.ref('Users/' + currentUser.uid + "/ShoppingList/").set(null);//emptyListObj
	}
};


