import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  game: Game;
  currentCard: string;

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game;
    console.log(this.game)
  }

  takeCard() {
    if (!this.pickCardAnimation) {      // damit man jedesmal 1.5 sek warten muss bevor man wieder drückt
      this.currentCard = this.game.stack.pop() //pop() Methode entfernt letzte Element eines Arrays und gibt dieses zurück. ändert die Länge des Arrays.
      this.pickCardAnimation = true;
      // console.log(this.currentCard)
      this.game.currentPlayer++;
      this.game.currentPlayer= this.game.currentPlayer % this.game.players.length;

    }

    setTimeout(() => {
      this.pickCardAnimation = false;
      this.game.playedCards.push(this.currentCard);

    },1500)

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent); 
  

    dialogRef.afterClosed().subscribe(name => {
      console.log('The dialog was closed',name);
      if (name){
      this.game.players.push(name)
      }
    });

  }}
