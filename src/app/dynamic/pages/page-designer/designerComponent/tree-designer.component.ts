import {Component, OnInit, Input} from '@angular/core';
import {PubSubService} from "../../../../services/pubSub/pubsub";

@Component({
  selector: 'app-tree-designer',
  templateUrl: './tree-designer.component.html',
  styleUrls: ['./tree-designer.component.css']
})
export class TreeDesignerComponent implements OnInit {

  @Input() tree : any = null;



  constructor(pubSubService: PubSubService) {
    //   const aaa = JSON.stringify(this.data);
    //   this.data = JSON.parse(aaa);
    //   console.log(this.tree);
    //
    // });

  }




ngOnInit() {

  }



}
