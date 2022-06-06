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
  public versos1: any[];
  public versos2: any[];
  public verso1: number;
  public verso2: number;
  public himno: number;

  public badges: any[];

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
    this.himno = 1;
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
    this.versos1 = this.biblia.books[this.libro].chapters[this.capitulo].content;
    this.versos2 = this.biblia.books[this.libro].chapters[this.capitulo].content;
  }

  public initialSelected(){
  }

  addText(){
    if(this.verso2 == -1){
      let text : Texto = {
        libro: this.biblia.books[this.libro],
        capitulo: this.capitulo + '',
        versiculo1: this.verso1 + '',
        content: [this.biblia.books[this.libro].chapters[this.capitulo].content[this.verso1].content]
      };
      this.badges.push(text);
    }else if(this.verso1 >= this.verso2){
      let conts: string[] = [];
      for(let i = 0; i < this.biblia.books[this.libro].chapters[this.capitulo].content.length; i++){
        if(i >= this.verso1 && i <= this.verso2){
          conts.push(this.biblia.books[this.libro].chapters[this.capitulo].content[i].content);
        }
      }
      let text : Texto = {
        libro: this.biblia.books[this.libro].name,
        capitulo: this.capitulo + '',
        versiculo1: this.verso1 + '',
        content: conts
      };
      this.badges.push(text);
    }
  }

  addHimno(){
    this.badges.push(this.himnario[this.himno]);
  }

}
