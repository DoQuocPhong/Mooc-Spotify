import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() title: string = '';

  @Output() changeFollow = new EventEmitter();

  onChangeFollowStatus(){
    if(this.title == 'follow'){
      this.title = "followed";
    }else{
      this.title = "follow";
    }
      this.changeFollow.emit(this.title);
  }

}
