import {Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges} from '@angular/core';
import {PubSubService} from "../../../../services/pubSub/pubsub";

@Component({
  selector: 'app-htmlnode',
  templateUrl: './htmlnode.component.html',
  styleUrls: ['./htmlnode.component.css']
})
  export class HtmlNodeComponent implements OnInit {

  @Input() node: any;


  constructor(private pubSubService: PubSubService) { }

  ngOnInit() {
  }





  onDrop(event) {
    //let dataTransfer = event.dataTransfer.getData('data');
    var data0 = event.dataTransfer.getData("text/plain");
    const droppedData = JSON.parse(data0);
    // const state = {...this.node};
    // state.children = droppedData.structure;
    this.node.children = droppedData.structure;
    // debugger;

    // this.tree.push(this.dragData);
    this.pubSubService.publish('refreshJsonEditor',null);
    // event.preventDefault();
  }


  allowDrop(event) {
    event.preventDefault();
  }

  onChange(code) {
  }

  ngOnInit() {
  }

  titleClick(el)
  {
    el.expanded = !el.expanded;
  }

  getClases(el)
  {
    return el.expanded? "expanded":"notexpanded";
  }


  // ngAfterViewInit() {
  //   this.editor.setTheme("eclipse");

  //   this.editor.getEditor().setOptions({
  //       enableBasicAutocompletion: true
  //   });

  //   this.editor.getEditor().commands.addCommand({
  //       name: "showOtherCompletions",
  //       bindKey: "Ctrl-.",
  //       exec: function (editor) {

  //       }
  //   })
//}

}
