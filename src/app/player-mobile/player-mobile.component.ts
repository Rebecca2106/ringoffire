import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit {

  @Input() name;
  @Input() playerActive:boolean =false;
  @Input() image='assets/fish-gdc537c3a8_640.png'


  constructor() { }

  ngOnInit(): void {
  }

}
