var currentUser;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUser = user;
	console.log(user, "loged in");
	try
	{
	loadDb();
	}
	catch(err)
	{
		document.getElementById("MealList").innerText = "You Have No Meals, Add Them Through The Menu."
	}
  } else {
    // No user is signed in.
	console.log(" No user is signed in.");
	location.href="Login.html";
  }
});

function loadDb()
{
	
	var database = firebase.database();
	var ref = database.ref('Users/' + currentUser.uid + '/Meals/');
	ref.on('value', displayMeals, dataErr);
	
};


function displayMeals(data)
{
	var meals = data.val();
	if (meals!= null){
	var titles = Object.keys(meals);
	
	for (var i =0;i<titles.length; i++)
	{
		var key = titles[i]
		document.getElementById("MealList").innerHTML += "<li>"+meals[key].title+"</li>";
	}
	}
};

	
function dataErr(err)
{
	console.log("error");
	console.log(err);
};

