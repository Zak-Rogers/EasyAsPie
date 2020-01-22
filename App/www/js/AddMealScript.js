
// Add quantity of ingreadient.

function addIngredient()
{
	var newIngredient = document.getElementById("Ingredient").value;
	var ingQuantity = document.getElementById("ingQuantity").value;
	var dropBox = document.getElementById("quantityUnit");
	var quantityUnit = dropBox.options[dropBox.selectedIndex].value;
	var list= document.getElementById("ingredientsList");
	list.innerHTML += "<li>" + newIngredient + "</li>";
	
	list =document.getElementById("quantityList");
	list.innerHTML += "<li>" + ingQuantity + "</li>";
	
	list = document.getElementById("unitList");
	list.innerHTML += "<li>" + quantityUnit + "</li>";
	
	document.getElementById("Ingredient").value = "";
	document.getElementById("ingQuantity").value = "1";
	dropBox.selectedIndex = 0;
};

function getIngredients()
{
	var ingList= document.getElementById("ingredientsList").innerHTML;
	ingList = ingList.split("</li>");
	for(var i =0;i<ingList.length-1;i++)
	{
		ingList[i] = ingList[i].slice(4);
	}
	ingList.pop();
	return ingList;
};
function getQuantities()
{
	var list= document.getElementById("quantityList").innerHTML;
	list = list.split("</li>");
	for(var i =0;i<list.length-1;i++)
	{
		list[i] = list[i].slice(4);
	}
	list.pop();
	return list;
};

function getUnits()
{
	var list = document.getElementById("unitList").innerHTML;
	list = list.split("</li>");
	for (var i = 0;i<list.length-1; i++)
	{
		list[i] = list[i].slice(4);
	}
	list.pop();
	return list;
};

function createMealObj()
{
	var ing = getIngredients();
	var quantities = getQuantities();
	var units = getUnits();
	var ingObj = {ingredient:ing,quantity:quantities,unit:units};
	var mealTitle = document.getElementById("Meal_Title").value;
	var mealRef = document.getElementById("Recipe_Ref").value;
	var mealObj = {title:mealTitle,reference:mealRef,ingredients:ingObj}; 
	return mealObj;
};

function saveMealObj(){
	//save locally as json
	var mealObj = createMealObj();
	updateDb(mealObj);
	location.href ="Meals.html";
};

function updateDb(data)
{
	var database = firebase.database();
	
	database.ref('Users/' + currentUser.uid + "/Meals/" + data["title"]).set(data);
};

var currentUser;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUser = user;
	console.log(user, "loged in");
  } else {
    // No user is signed in.
	console.log(" No user is signed in.");
	location.href="Login.html";
  }
});