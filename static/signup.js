
function createUser() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.sendEmailVerification().then(function() {
          // Email sent.
          location.href = '/';
        }).catch(function(error) {
          // An error happened.
        });
        console.log(user);
      } else {
        console.log("user is not signed in");
      }
    });

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    console.log(errorMessage);
    console.log(user);
  //  console.log(user.isEmailVerified());
  });
}
