import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Texto, Himno } from './MainData';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public type: number;
  public biblia: any;
  public himnario: any;
  public libro: number;
  public capitulo: number;
  public capitulos: number[];
  public versos1: number[];
  public versos2: number[];
  public verso1: number;
  public verso2: number;

  public badges: Himno[] | Texto[];

  constructor(private data: DataService) {
    this.type = 2;
    this.libro = -1;
    this.capitulo = -1;
    this.capitulos = Array(5).fill(1).map((x,i)=>i);
    this.versos1 = Array(5).fill(1).map((x,i)=>i);
    this.versos2 = Array(5).fill(1).map((x,i)=>i);
    this.verso1 = -1;
    this.verso2 = -1;
    this.badges = [];
  }

  ngOnInit(): void {
    this.data.getBible().subscribe(data => {
      this.biblia = data;
    });
    this.data.getHimnario().subscribe(data => {
      this.himnario = data;
    });
    
  }

  public generateChapters(){
    this.capitulos = Array(Number(this.biblia.books[this.libro].content[this.biblia.books[this.libro].content.length - 1].chapter) + 1).fill(1).map((x, i) => i);
    this.capitulos.shift();
  }

  public generateVerses(){
    let chapter = [];
    for(let chap of this.biblia.books[this.libro].content){
      if(chap.chapter == this.capitulo){
        chapter.push(chap);
      }
    }
    this.versos1 = Array(chapter.length + 1).fill(1).map((x, i) => i);
    this.versos1.shift();
    this.versos2 = Array(chapter.length + 1).fill(1).map((x, i) => i);
    this.versos2.shift();
  }

  public initialSelected(){
    this.versos2 = [];
    for(let i = 1; i <= this.versos1.length; i++){
      this.versos2.push(i);
    }
    for(let i = 0; i < this.verso1; i++){
      this.versos2.shift();
    }
    this.verso2 = this.verso1;
  }

  addText(){
    let content: string[] = [];
    for(let cont of this.biblia.books[this.libro - 1].content){
      console.log(cont)
      if(this.verso2 != -1){
        if(cont.chapter == Number(this.capitulo) && Number(cont.verse) >= Number(this.verso1) && Number(cont.verse) <= Number(this.verso2)){
          content.push(cont.content);
        }
      } else {
        if(cont.chapter == this.capitulo && cont.verse == this.verso1){
          content.push(cont.content);
        }
      }
    }
    let text: Texto = {
      libro: this.biblia.books[this.libro].name,
      capitulo: this.capitulo + '',
      versiculo1: this.verso1 + '',
      versiculo2: this.verso2 + '',
      content: []
    };
    console.log(text);
  }

  addHimno(){

  }

}
