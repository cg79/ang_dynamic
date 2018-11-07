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


  newGuid = () => (((1+Math.random())*0x10000)|0).toString(16);


  onDrop(event) {
    //let dataTransfer = event.dataTransfer.getData('data');
    var data0 = event.dataTransfer.getData("text/plain");
    const droppedData = JSON.parse(data0);
    const node = this.node;
    if(!node.childrens) {
      node.childrens = [];
    }
    if(droppedData.structure) {
      droppedData.structure.key = this.newGuid();
      node.childrens.push(droppedData.structure);
    }else{
      if(!node.actions) {
        node.actions = [];
      }
      node.actions.push(droppedData);
    }
    this.pubSubService.publish('refreshJsonEditor',null);
  }

  onDropAction(event) {
    //let dataTransfer = event.dataTransfer.getData('data');
    var data0 = event.dataTransfer.getData("text/plain");
    const droppedData = JSON.parse(data0);
    const node = this.node;
    if(!node.actions) {
      node.actions = [];
    }
    node.actions.push(droppedData);

  }


  allowDrop(event) {
    event.preventDefault();
  }

  onChange(code) {
  }


  titleClick(el)
  {

    el.expanded = !el.expanded;
    // el.prop = !el.prop;
    this.pubSubService.publish('componentSelected', el);
  }
  getClases(el)
  {
    return el.expanded? "expanded":"notexpanded";
  }

  toggleProp(el)
  {
    el.prop = !el.prop;
    this.pubSubService.publish('componentSelected', el);

  }

  toggleActions(el)
  {
    // el.showActions = false;
    el.showActions = !el.showActions;
  }



  getPropClases(el)
  {
    return el.prop? "pexp":"notpexp";
  }


  dragData: any = null;
  onDragStartNode(event, data) {
    this.dragData = data;
    event.dataTransfer.setData("text/plain",JSON.stringify(data));

    event.dataTransfer.data = data;
  }

  onDropNode(node){
    // console.log(this.dragData);
    // const state = [ ...this.context.childrens];
    // state.push(this.dragData.structure);
    // this.context.childrens = state;
    //
    //
    //
    event.preventDefault();
  }

  allowDropNode(event) {
    event.preventDefault();
  }

  moveUpNode(node) {
    // this.moveUp(, node)
    this.pubSubService.publish('moveUpNode', node.key);
  }

  moveDownNode(node) {
    this.pubSubService.publish('moveDownNode', node.key);
  }

  deleteNode(node) {
    this.pubSubService.publish('deleteNode', node.key);
  }

  copyNode(node) {
    this.pubSubService.publish('copyNode', node.key);
  }

  cutNode(node) {
    this.pubSubService.publish('cutNode', node.key);
  }

  pasteNode(node) {
    this.pubSubService.publish('pasteNode', node.key);
  }





}
