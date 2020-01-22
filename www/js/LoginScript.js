
function register()
{
	var email = document.getElementById("email").value;
	var password = document.getElementById("passWord").value;
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	
	window.alert("Error: " + error.message);
	// ...
	});
	console.log("test1");
	//updateDbUser(email);
};
	
function logIn()
{
	var email = document.getElementById("email").value;
	var password = document.getElementById("passWord").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) 
	{
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
	
	window.alert("Error: " + error.message);
    // ...
	});
};

function updateDbUser(userEmail)
{
	var database = firebase.database();
	var data = {
		Profile:{
			Email:userEmail,
			Name:"Anon"
			}/*,
		MealPlan:{
			Monday:" ",
			Tuesday:" ",
			Wednesday:" ",
			Thursday:" ",
			Friday:" ",
			Saturday:" ",
			Sunday:" "
			},
		ShoppingList:{
			0:" "
			},
		Meals:{
			0:" "
			}*///remove blank
	}
	
	/*data = {
		Email:userEmail
	}*/
	database.ref('Users/' + currentUser.uid ).update(data);//+ '/Profile'
};


var currentUser;
	
	firebase.auth().onAuthStateChanged(function(user) 
	{
	if (user) {
	  // User is signed in.
	  currentUser = firebase.auth().currentUser;
	  location.href="MealPlanner.html";
	  window.alert("Welcome");
	  console.log("test2");
	  updateDbUser(document.getElementById("email").value);
	} else {
	  // No user is signed in.
	  document.getElementById("login").style.display = "block";
	  document.getElementById("loading").style.display= "none";
	}
	});