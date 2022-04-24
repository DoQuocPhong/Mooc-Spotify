import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  
  @Input() auth_Face: string = " CONTINUE WITH FACEBOOK";
  @Input() auth_Google: string = " CONTINUE WITH GOOGLE";
  @Input() auth_Spotify: string = " CONTINUE WITH SPOTIFY";

  redirect_uri = "http://localhost:4200/home";

  client_id = "844201849e13485990d6690742af5fc7"; 
  client_secret = "8c44ca8756f341349d6329aaeec7d9df";

  AUTHORIZE = "https://accounts.spotify.com/authorize";
  
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  requestAuthorization() {
    localStorage.setItem("client_id", this.client_id);
    localStorage.setItem("client_secret", this.client_secret);

    let url = this.AUTHORIZE
    url += "?client_id=" + this.client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(this.redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
  }
}
