function signOut() {
  firebase.auth().signOut().then(() => {
  // Sign-out successful.
    location.href = '/';
  }).catch((error) => {
    // An error happened.
  });

}
