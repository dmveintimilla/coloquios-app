import { Component, Input, OnInit } from '@angular/core';
import { Coloquio } from '../../models/coloquio';

@Component({
  selector: 'app-coloquio',
  templateUrl: './coloquio.component.html',
  styleUrls: ['./coloquio.component.scss'],
})
export class ColoquioComponent implements OnInit {

  @Input() coloquio: Coloquio;

  coloquios: Coloquio[] = []

  constructor() {

   }

  

  ngOnInit() {
    // console.log("El producto es ->", this.coloquio);
  }

}
