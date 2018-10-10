import {Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges} from '@angular/core';
import {PubSubService} from "../../../../services/pubSub/pubsub";

@Component({
  selector: 'app-actionnode',
  templateUrl: './actionnode.component.html',
  styleUrls: ['./actionnode.component.css']
})
  export class ActionnodeNodeComponent implements OnInit {

  // @Input() node: any;
  @Input() isArray : boolean;
  @Input() parent : any;

  private _node: any;
  get node(): any {
    return this._node;
  }

  @Input()
  set node(obj: any) {
    this._node = obj;
    this.keys = this.getKeys(this._node);
  }

  keys : any = null;

  constructor(private pubSubService: PubSubService) { }

  ngOnInit() {
  }


  getKeys(node) {
    const keys = Object.keys(node)
      .map((key) => ({ 'key': key, 'value': node[key], 'type': this.getType(node[key])}));
    return keys;
  }


  getType(obj){
    let typeOf =  typeof(obj);
    if(!!obj && obj.constructor === Array) {
      return 'array';
    }
    return typeOf;
}


  newGuid = () => (((1+Math.random())*0x10000)|0).toString(16);

  hideShowObject(el) {
    el.expanded = !el.expanded;
  }

  onDropAction(event) {
    debugger;
    //let dataTransfer = event.dataTransfer.getData('data');
    var data0 = event.dataTransfer.getData("text/plain");
    const droppedData = JSON.parse(data0);
    // const state = {...this.node};
    // state.children = droppedData.structure;
    const node = this.node;
    if(!node.actions) {
      node.actions = [];
    }
    node.actions.push(droppedData);
    this.node.prop = false;
    this.node.prop = true;
    // debugger;
    // this.tree.push(this.dragData);
    // event.preventDefault();
  }


  onDrop(event) {
    //let dataTransfer = event.dataTransfer.getData('data');
    var data0 = event.dataTransfer.getData("text/plain");
    const droppedData = JSON.parse(data0);
    // const state = {...this.node};
    // state.children = droppedData.structure;
    const node = this.node;
    if(!node.childrens) {
      node.childrens = [];
    }
    node.childrens.push(droppedData.structure);
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


  titleClick(el)
  {
    el.expanded = !el.expanded;
  }
  getClases(el)
  {
    return el.expanded? "expanded":"notexpanded";
  }

  toggleProp(el)
  {
    el.showRowTemplate = false;
    el.prop = !el.prop;

  }

  toggleRowTemplate(el) {
    el.prop = false;
    el.showRowTemplate = !el.showRowTemplate;
  }


  getPropClases(el)
  {
    return el.prop? "pexp":"notpexp";
  }

  getTemplateClases(el)
  {
    return el.showRowTemplate? "rexp":"notrexp";
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
    // this.pubSubService.publish('datachanged', this.renderContext);
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


  addParam(o, event){
    debugger;
    const n = this.node;
    n.actions.push({
      id: '',
      property: '',
      key: this.newGuid()
    });

    var x = JSON.stringify(n);

    this.node =JSON.parse(x);
    event.preventDefault();
    return false;
  }

  deleteParam(par, v){
    const n = par;
    const parent = this.parent;
    parent.controls = parent.controls.filter(el => el.key !== v.key);

    this.pubSubService.publish('refreshTree', null);
    // var x = JSON.stringify(n);

    // par =JSON.parse(x);
    // const n = this.node;
    // n.controls = n.controls.filter(el => el.key == v.key);
    //
    // var x = JSON.stringify(n);
    //
    // this.node =JSON.parse(x);

  }




}
