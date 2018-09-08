import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-checkbox',
  templateUrl: './list-checkbox.component.html',
  styleUrls: ['./list-checkbox.component.css']
})
export class ListCheckboxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  context: any = {
    id:'asf1',
    type:'div',
    children: {
      text: 'ccccccccccccc',
      id:'asf3',
      type:'chkLblLeftList',
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
