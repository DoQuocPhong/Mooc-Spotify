import { Component, Injectable, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@Injectable({ providedIn: 'root' })
export class HomeComponent implements OnInit{

  audio = new Audio();

  constructor() { 
  }

  ngOnInit(): void {
    this.audio.src = "../../../assets/music/demo.mp3";
    this.audio.load();
  }

  playSound(){
    if (this.audio.paused){
      this.audio.play();
    }else{
      this.audio.pause();
    }
    
  }
}

