import { Component, Injectable, OnInit } from '@angular/core';
// import { ToastrManager } from 'ng6-toastr-notifications';

declare var FB: any;

@Component({
  selector: 'app-button-auth-face',
  templateUrl: './button-auth-face.component.html',
  styleUrls: ['./button-auth-face.component.css']
})
@Injectable({ providedIn: 'root' })
export class ButtonAuthFaceComponent implements OnInit {

  // constructor( public toastr: ToastrManager) { }

  ngOnInit(): void {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '425745602693185',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      FB.AppEvents.logPageView();
    };
  
    // (function(d, s, id){
    //    var js, fjs = d.getElementsByTagName(s)[0];
    //    if (d.getElementById(id)) {return;}
    //    js = d.createElement(s); js.id = id;
    //    js.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js');
    //   //  js.src = "https://connect.facebook.net/en_US/sdk.js";
    //   //  fjs.parentNode.insertBefore(js, fjs)!;
    //    if (fjs.parentNode === null) {
    //     alert('oops');
    //   } else {
    //     // since you've done the nullable check
    //     // TS won't complain from this point on
    //     fjs.parentNode.insertBefore(js, fjs)!; // <- no error
    //   }
    //  }(document, 'script', 'facebook-jssdk'));

     (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js');
      //  js.src = "https://connect.facebook.net/en_US/sdk.js";
      //  fjs.parentNode.insertBefore(js, fjs)!;
       if (fjs.parentNode === null) {
        alert('oops');
      } else {
        // since you've done the nullable check
        // TS won't complain from this point on
        fjs.parentNode.insertBefore(js, fjs)!; // <- no error
      }
    }(document, 'script', 'facebook-jssdk'));
  }

  submitLogin(){
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response: { authResponse: any; })=>
        {
          console.log('submitLogin',response);
          if (response.authResponse)
          {
            // this.toastr.successToastr('login successful', 'Success!');
            console.log('User login done');
          }
           else
           {
           console.log('User login failed');
         }
      });

  }

}
