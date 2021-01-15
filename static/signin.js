function signIn(){
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;


  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    if(user['user']['emailVerified'] == false){
      document.getElementById('error').innerHTML = "Email not authenticated";
    }
    else{
      window.location.href = '/welcome';
    }
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    document.getElementById('error').innerHTML = errorMessage;
  });

}
