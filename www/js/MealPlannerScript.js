var currentUser;
var meals;
var titles;
var daysOfTheWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUser = user;
	console.log(user, "loged in");
	// if meal plan+meals exist do ->
	loadDbMeals();
	loadDbMealPlan();
	//else display user needs to add meals
  } else {
    // No user is signed in.
	console.log(" No user is signed in.");
	location.href="Login.html";
  }
});

function loadDbMealPlan()
{
	var database = firebase.database();
	var ref = database.ref('Users/' + currentUser.uid + '/MealPlan/');
	ref.on('value', displayMealPlan, dataErr);
};

function displayMealPlan(data)
{
	var mealPlan = data.val();
	if(mealPlan!= null)
	{
		var days = Object.keys(mealPlan);
		
		for (var i =0;i<days.length; i++)
		{
			var key = days[i];
			if(mealPlan[key] != " "){
				document.getElementById(key).innerHTML = mealPlan[key];
			}
		}
	}
};

function loadDbMeals()
{
	var database = firebase.database();
	var ref = database.ref('Users/' + currentUser.uid + '/Meals/');
	ref.on('value',displayMeals, dataErr);
};

function displayMeals(data)
{
	meals =data.val();
	if (meals!= null)
	{
		var mealPlanInputs = document.getElementsByClassName("mealSelectionList")
		
		titles = Object.keys(meals);
		for (var i=0;i<titles.length;i++)
		{
			var key = titles[i]
			for (var j=0; j<mealPlanInputs.length;j++)
			{
				mealPlanInputs[j].innerHTML += "<option value='" + titles[i] + "'>" + titles[i] + "</option>"; //value='" + meals[titles[i]] +
			}
		}
	}
	console.log("complete");
};

function dataErr(err)
{
	console.log("error");
	console.log(err);
};

function addMealToPlan(dayOfWeek)
{
	var dropBox = document.getElementById(dayOfWeek + "MealSelection");
	var value = dropBox.options[dropBox.selectedIndex].value;
	var database = firebase.database();
	
	database.ref('Users/' + currentUser.uid + "/MealPlan/" + dayOfWeek).set(value);
	console.log(meals[value]);
};

function generateMealPlan()
{
	//gets 7 random meals from meal list.
	//warning this will override your current mealplan
	var randomNum;
	var mealPlan = [];
	
	var database = firebase.database();
	
	for (var i=0;i<7;i++)
	{
		randomNum = Math.floor(Math.random() * titles.length);
		mealPlan.push(titles[randomNum]);
	}
	console.log(mealPlan);
	for (var i=0;i<7;i++)
	{
		database.ref('Users/' + currentUser.uid + "/MealPlan/" + daysOfTheWeek[i]).set(mealPlan[i]);
	}
	
};

function clearMealPlan()
{
	
	var database = firebase.database();
	for(i=0;i<7;i++)
	{
		console.log("test");
		database.ref('Users/' + currentUser.uid + '/MealPlan/' + daysOfTheWeek[i]).set(" ");
		location.reload();
	}
};

