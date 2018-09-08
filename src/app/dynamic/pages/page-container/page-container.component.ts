import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
context3: any = {
      id:'asf1',
    type:'container',
    childrens: [{
            text: 'ccccccccccccc',
            id:'a1',
            type:'radioLblLeftList',
            items:[{a:1, text:"ion", checked:true},{a:2, text:"Maria"},{a:3, text:"fffffffff"}],
            name:'cont',
            bindText:"text",
            bindValue:"a",
            value:"1",
            onchangeEvent:'bbb',
            subscribeEvents:['aaa']
      },
      {
        text: 'ccccccccccccc',
        id:'b2',
        type:'text',
        items:[{a:1, text:"ion", checked:true},{a:2, text:"Maria"}],
        name:'txx',
        bindText:"text",
        bindValue:"a",
        value:"1",
        onchangeEvent:'aaa',
        subscribeEvents:['bbb'],
        validation:{
          required: "introdu ceva la container"
        }
      }
      ],

      children: {
        title: 'label2',
        id:'asf3',
        type:'text',
      }
  };
}
