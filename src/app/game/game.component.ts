import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  gameId: string;
  gameOver = false;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private route: ActivatedRoute) { }
  ngOnInit(): void {

    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];
      this.firestore.collection('games').doc(params['id']).valueChanges().subscribe((game: any) => {
        console.log('game update:', game)   //nur noch updates zu dem einem Spiel mit der zugehörigen id
        this.game.currentPlayer = game.currentPlayer;
        this.game.player_images = game.player_images;
        this.game.playedCards = game.playedCards;
        this.game.stack = game.stack;
        this.game.players = game.players;      //updaten das Spiel mit dem von in Firebase gespeicherten Daten
        this.game.currentCard = game.currentCard;
        this.game.pickCardAnimation = game.pickCardAnimation
      });

    });
  }

  newGame() {
    this.game = new Game;


  }

  takeCard() {
    if (this.game.stack.length == 0)
     { this.gameOver = true; }
    else if (!this.game.pickCardAnimation) {      // damit man jedesmal 1.5 sek warten muss bevor man wieder drückt
      this.game.currentCard = this.game.stack.pop() //pop() Methode entfernt letzte Element eines Arrays und gibt dieses zurück. ändert die Länge des Arrays.
      this.game.pickCardAnimation = true;

      // console.log(this.currentCard)
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
    }

    setTimeout(() => {
      this.game.pickCardAnimation = false;
      this.game.playedCards.push(this.game.currentCard);
      this.saveGame();

    }, 1500)

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);


    dialogRef.afterClosed().subscribe(name => {
      console.log('The dialog was closed', name);
      if (name) {
        this.game.players.push(name);
        this.game.player_images.push('assets/fish-gdc537c3a8_640.png')
        this.saveGame();
      }
    });

  }

  saveGame() {
    this.firestore.collection('games').doc(this.gameId).update(this.game.toJSON());

  }

  editPlayer(playerId: number) {
    console.log("edit", playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe(image => {
      console.log('Recived change', image)
      if (image) {
        if (image == 'DELETE') {
          this.game.player_images.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
        }
        else {
          this.game.player_images[playerId] = image;
          this.saveGame
        }

      }
    })

  }
}
