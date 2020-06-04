export function loginEmail(){
  
}
  
export function loginGmail(ui){
    ui.reset();
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          return true;
        },

      },
      signInFlow: 'popup',
      signInSuccessUrl: '#home'
    });
  }