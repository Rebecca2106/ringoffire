import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { AngularFirestore } from '@angular/fire/compat/firestore'


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore:AngularFirestore, private router:Router) { }

  ngOnInit(): void {
  }

  newGame(){
    let game= new Game();
    console.log(game);
    this.firestore.collection('games').add(game.toJSON()).then((gameInfo:any) => {console.log(gameInfo.id)
    this.router.navigateByUrl('/game/' + gameInfo.id)
  })
  }
}
