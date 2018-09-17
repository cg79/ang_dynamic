import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-prop-designer',
  templateUrl: './prop-designer.component.html',
  styleUrls: ['./prop-designer.component.css']
})
export class PropDesignerComponent implements OnInit {

  @Input() data : any = null;
  @Input() str : any = null;
  @Input() node : any = null;

  id : string = "";

  constructor() {
    this.id = this.uniqueId();
  }

  uniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
  };


ngOnInit() {

  }



}
