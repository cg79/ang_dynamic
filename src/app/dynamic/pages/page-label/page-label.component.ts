import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-label',
  templateUrl: './page-label.component.html',
  styleUrls: ['./page-label.component.css']
})
export class PageLabelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  context: any = {
    value: 'label1',
    id:'l1',
    type:'label'
  };

  context1: any = {
    value: 'label2',
    id:'l2',
    type:'label',
    children:{
      value: 'label2',
      id:'t1',
      type:'text',
    }
  };

  context2: any = {
    value: 'label2',
    id:'l2',
    type:'label',
    children:{
      value: 'label2',
      id:'t1',
      type:'text',
      validation:{
                required: "introdu ceva"
              }
    }
  };


}
