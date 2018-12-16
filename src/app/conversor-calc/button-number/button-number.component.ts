import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'protractor';

@Component({
  selector: 'app-button-number',
  templateUrl: './button-number.component.html',
  styleUrls: ['./button-number.component.scss']
})
export class ButtonNumberComponent implements OnInit {

  @Input() numButton: any;
  @Input() class: string;
  @Output() clickNumber: EventEmitter<any> = new EventEmitter;



  ngOnInit() {
  }

  onClickButton(event) {
    this.clickNumber.emit(this.numButton);
  }

}
