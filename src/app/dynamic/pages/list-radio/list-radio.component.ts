import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-radio',
  templateUrl: './list-radio.component.html',
  styleUrls: ['./list-radio.component.css']
})
export class ListRadioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  context: any = {
    id:'asf1',
    type:'div',
    children: {
      text: 'ccccccccccccc',
      id:'asf3',
      type:'radioLblLeftList',
      items:[{a:1, text:"ion", checked:true},{a:2, text:"Maria"}],
      name:'hhhhhhhhhhhh',
      bindText:"text",
      bindValue:"a",
      checked:"checked",

      children: {
        title: 'label2',
        id:'asf3',
        type:'text',
      }
    }
  };
}
