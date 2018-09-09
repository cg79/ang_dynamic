import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-designer',
  templateUrl: './page-designer.component.html',
  styleUrls: ['./page-designer.component.css']
})
export class PageDesignerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  state = {
    components: [
      {
        name: 'label',
        structure: {
          value: 'label1',
          id:'l1',
          type:'label'
        }
      }
    ]
  };

}
