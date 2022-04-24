import { Component, Injectable, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@Injectable({ providedIn: 'root' })
export class HomeComponent implements OnInit{

  redirect_uri = "http://localhost:4200/home";

  audio = new Audio();
  client_id: string | null | undefined ; 
  client_secret: string | null | undefined ;

  access_token: any;
  refresh_token: any;
  currentPlaylist: any = "";
  radioButtons: any;

  AUTHORIZE = "https://accounts.spotify.com/authorize"
  TOKEN = "https://accounts.spotify.com/api/token";
  PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
  DEVICES = "https://api.spotify.com/v1/me/player/devices";
  PLAY = "https://api.spotify.com/v1/me/player/play";
  PAUSE = "https://api.spotify.com/v1/me/player/pause";
  NEXT = "https://api.spotify.com/v1/me/player/next";
  PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
  PLAYER = "https://api.spotify.com/v1/me/player";
  TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
  CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
  SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";
  status: any;
  responseText: any;

  constructor() { 
  }

  ngOnInit(): void {
    this.client_id = localStorage.getItem("client_id");
    this.client_secret = localStorage.getItem("client_secret");
    if ( window.location.search.length > 0 ){
        this.handleRedirect();
    }
    else{
        this.access_token = localStorage.getItem("access_token");
        if ( this.access_token == null ){
            // we don't have an access token so present token section
            //document.getElementById("tokenSection").style.display = 'block';
            (<HTMLInputElement>document.getElementById("tokenSection")).style.display = 'block'  
        }
        else {
            // we have an access token so present device section
            //document.getElementById("deviceSection").style.display = 'block';  
            (<HTMLInputElement>document.getElementById("deviceSection")).style.display = 'block'
            this.refreshDevices();
            this.refreshPlaylists();
            this.currentlyPlaying();
        }
    }
    this.refreshRadioButtons();
  }

  playSound(){
    if (this.audio.paused){
      this.audio.play();
    }else{
      this.audio.pause();
    }
    
  }

  onPageLoad(){
    this.client_id = localStorage.getItem("client_id");
    this.client_secret = localStorage.getItem("client_secret");
    if ( window.location.search.length > 0 ){
        this.handleRedirect();
    }
    else{
        this.access_token = localStorage.getItem("access_token");
        if ( this.access_token == null ){
            // we don't have an access token so present token section
            //document.getElementById("tokenSection").style.display = 'block';
            (<HTMLInputElement>document.getElementById("tokenSection")).style.display = 'block'  
        }
        else {
            // we have an access token so present device section
            //document.getElementById("deviceSection").style.display = 'block';  
            (<HTMLInputElement>document.getElementById("deviceSection")).style.display = 'block'
            this.refreshDevices();
            this.refreshPlaylists();
            this.currentlyPlaying();
        }
    }
    this.refreshRadioButtons();
  }

  refreshRadioButtons(){
    let data = localStorage.getItem("radio_button");
    if ( data != null){
        this.radioButtons = JSON.parse(data);
        if ( Array.isArray(this.radioButtons) ){
          this.removeAllItems("radioButtons");
          this.radioButtons.forEach( (item, index) => this.addRadioButton(item, index));
        }
    }
  }

  addRadioButton(item: any, index: any){
    //let node = document.createElement("button");
    let node = (<HTMLInputElement>document.createElement("button"));
    node.className = "btn btn-primary m-2";
    node.innerText = index;
    //node.onclick = this.onRadioButton( item.deviceId, item.playlistId) {() => this.onRadioButton("dfd")};
    //node.click = {() => this.onRadioButton(item.deviceId, item.playlistId)};
    node.addEventListener('click', (e) => {
      this.onRadioButton(item.deviceId, item.playlistId);//your typescript function
  });
    //document.getElementById("radioButtons").appendChild(node);
    (<HTMLInputElement>document.getElementById("radioButtons")).appendChild(node);
  }

  onRadioButton( deviceId: string, playlistId: string ){
    let body: any = {};
    body.context_uri = "spotify:playlist:" + playlistId;
    body.offset = {};
    body.offset.position = 0;
    body.offset.position_ms = 0;
    this.callApi( "PUT", this.PLAY + "?device_id=" + deviceId, JSON.stringify(body), this.handleApiResponse );
    //callApi( "PUT", SHUFFLE + "?state=true&device_id=" + deviceId, null, handleApiResponse );
  }

  removeAllItems( elementId: string ){
    //let node = document.getElementById(elementId);
    let node = (<HTMLInputElement>document.getElementById("elementId"));
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
  }

  handleRedirect(){
    let code = this.getCode();
    this.fetchAccessToken( code );
    window.history.pushState("", "", this.redirect_uri); // remove param from url
  }

  getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
  }

  fetchAccessToken( code: any){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(this.redirect_uri);
    body += "&client_id=" + this.client_id;
    body += "&client_secret=" + this.client_secret;
    this.callAuthorizationApi(body);
  }

  refreshAccessToken(){
    this.refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + this.refresh_token;
    body += "&client_id=" + this.client_id;
    this.callAuthorizationApi(body);
}

  callAuthorizationApi(body: any){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", this.TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(this.client_id + ":" + this.client_secret));
    xhr.send(body);
    xhr.onload = this.handleAuthorizationResponse;
  }

  handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
          this.access_token = data.access_token;
            localStorage.setItem("access_token", this.access_token);
        }
        if ( data.refresh_token  != undefined ){
          this.refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", this.refresh_token);
        }
        this.onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
  }

  callApi(method: string, url: string, body: any, callback: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xhr.send(body);
    xhr.onload = callback;
  }

  addDevice(item: any){
    //let node = document.createElement("option");
    //let node = (<HTMLInputElement>document.createElement("option"));
    let node = (<HTMLInputElement>document.createElement("button"));
    node.value = item.id;
    node.innerHTML = item.name;
    //document.getElementById("devices").appendChild(node);
    (<HTMLInputElement>document.getElementById("devices")).appendChild(node);
}

  //handle
  handleDevicesResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        this.removeAllItems( "devices" );
        data.devices.forEach((item: any) => this.addDevice(item));
    }
    else if ( this.status == 401 ){
        this.refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
  }

  handlePlaylistsResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        this.removeAllItems( "playlists" );
        data.items.forEach((item: { id: string; name: string; tracks: { total: string; }; }) => this.addPlaylist(item));
        //document.getElementById('playlists').value=currentPlaylist;
        (<HTMLInputElement>document.getElementById("playlists")).value = this.currentPlaylist;
    }
    else if ( this.status == 401 ){
        this.refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
  }

  handleApiResponse(){
    if ( this.status == 200){
        console.log(this.responseText);
        setTimeout(this.currentlyPlaying, 2000);
    }
    else if ( this.status == 204 ){
        setTimeout(this.currentlyPlaying, 2000);
    }
    else if ( this.status == 401 ){
        this.refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }    
  }

  handleCurrentlyPlayingResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        if ( data.item != null ){
            // document.getElementById("albumImage").src = data.item.album.images[0].url;
            // document.getElementById("trackTitle").innerHTML = data.item.name;
            // document.getElementById("trackArtist").innerHTML = data.item.artists[0].name;
            (<HTMLInputElement>document.getElementById("albumImage")).src = data.item.album.images[0].url;
            (<HTMLInputElement>document.getElementById("trackTitle")).innerHTML = data.item.name;
            (<HTMLInputElement>document.getElementById("trackArtist")).innerHTML = data.item.artists[0].name;
        }


        if ( data.device != null ){
            // select device
            var currentDevice = data.device.id;
            //document.getElementById('devices').value=currentDevice;
            (<HTMLInputElement>document.getElementById("devices")).value = currentDevice
        }

        if ( data.context != null ){
            // select playlist
            var currentPlaylist = data.context.uri;
            currentPlaylist = currentPlaylist.substring( currentPlaylist.lastIndexOf(":") + 1,  currentPlaylist.length );
            //document.getElementById('playlists').value=currentPlaylist;
            (<HTMLInputElement>document.getElementById("playlists")).value = currentPlaylist
        }
    }
    else if ( this.status == 204 ){

    }
    else if ( this.status == 401 ){
        this.refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
  }

  addPlaylist(item: { id: string; name: string; tracks: { total: string; }; }){
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name + " (" + item.tracks.total + ")";
    //document.getElementById("playlists").appendChild(node); 
    (<HTMLInputElement>document.getElementById("playlists")).appendChild(node); 
  }

  refreshDevices(){
    this.callApi( "GET", this.DEVICES, null, this.handleDevicesResponse );
  }

  refreshPlaylists(){
    this.callApi( "GET", this.PLAYLISTS, null, this.handlePlaylistsResponse );
  }

  currentlyPlaying(){
    this.callApi( "GET", this.PLAYER + "?market=US", null, this.handleCurrentlyPlayingResponse );
  }

  play(){
    // let playlist_id = document.getElementById("playlists").value;
    // let trackindex = document.getElementById("tracks").value;
    // let album = document.getElementById("album").value;
    let playlist_id = (<HTMLInputElement>document.getElementById("playlists")).value; 
    let trackindex = (<HTMLInputElement>document.getElementById("tracks")).value; 
    let album = (<HTMLInputElement>document.getElementById("album")).value; 
    let body: any = {};
    if ( album.length > 0 ){
        body.context_uri = album;
    }
    else{
        body.context_uri = "spotify:playlist:" + playlist_id;
    }
    body.offset = {};
    body.offset.position = trackindex.length > 0 ? Number(trackindex) : 0;
    body.offset.position_ms = 0;
    this.callApi( "PUT", this.PLAY + "?device_id=" + this.deviceId(), JSON.stringify(body), this.handleApiResponse );
  }

  shuffle(){
    this.callApi( "PUT", this.SHUFFLE + "?state=true&device_id=" + this.deviceId(), null, this.handleApiResponse );
    this.play(); 
  }

  pause(){
    this.callApi( "PUT", this.PAUSE + "?device_id=" + this.deviceId(), null, this.handleApiResponse );
  }

  next(){
    this.callApi( "POST", this.NEXT + "?device_id=" + this.deviceId(), null, this.handleApiResponse );
  }

  previous(){
    this.callApi( "POST", this.PREVIOUS + "?device_id=" + this.deviceId(), null, this.handleApiResponse );
  }

  transfer(){
      let body: any = {};
      body.device_ids = [];
      body.device_ids.push(this.deviceId())
      this.callApi( "PUT", this.PLAYER, JSON.stringify(body), this.handleApiResponse );
  }

  deviceId(){
    //return document.getElementById("devices").value;
    return (<HTMLInputElement>document.getElementById("devices")).value; 
  }

  fetchTracks(){
    // let playlist_id = document.getElementById("playlists").value;
    let playlist_id = (<HTMLInputElement>document.getElementById("playlists")).value; 
    if ( playlist_id.length > 0 ){
        var url = this.TRACKS.replace("{{PlaylistId}}", playlist_id);
        this.callApi( "GET", url, null, this.handleTracksResponse );
    }
  }

  handleTracksResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        this.removeAllItems( "tracks" );
        data.items.forEach( (item: any, index: any) => this.addTrack(item, index));
    }
    else if ( this.status == 401 ){
        this.refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
  }

  addTrack(item: any, index: any){
    let node = document.createElement("option");
    node.value = index;
    node.innerHTML = item.track.name + " (" + item.track.artists[0].name + ")";
    //document.getElementById("tracks").appendChild(node); 
    (<HTMLInputElement>document.getElementById("tracks")).appendChild(node); 
  }

  saveNewRadioButton(){
    let item: any = {};
    item.deviceId = this.deviceId();
    //item.playlistId = document.getElementById("playlists").value;
    item.playlistId = (<HTMLInputElement>document.getElementById("playlists")).value; 
    this.radioButtons.push(item);
    localStorage.setItem("radio_button", JSON.stringify(this.radioButtons));
    this.refreshRadioButtons();
}

}

