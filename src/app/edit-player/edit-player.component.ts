import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures =['assets/avatar-g9ec45d4e3_640.png', 'assets/penguin-gf72e3c61c_640.png', 'assets/avatar_men.png', 'assets/woman-g1e4d3ab5a_640.png','assets/nerd-g232da8944_640.png']
  constructor( public dialogRef: MatDialogRef<EditPlayerComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();

  }
}
