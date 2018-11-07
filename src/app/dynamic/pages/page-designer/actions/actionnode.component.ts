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

  newGuid = () => (((1+Math.random())*0x10000)|0).toString(16);

  nodeid : string = this.newGuid();

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

  constructor(private pubSubService: PubSubService) {

  }

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

  callAddFunction() {
    debugger;
    // this.node.items
    const evtName = this.newGuid();
    this.pubSubService.subscribe(evtName, (val) => {
      // val.add.bind(this.node);
      this.node.add = val.add;
      this.node.add();
      delete this.node.add;

      this.pubSubService.unsubscribe(evtName);
    });

    if (this.node.type) {
      if(this.node.type === 'state') {
        this.node.items.push({
          propName: '',
          value: '',
          rm:1,
          key: (((1+Math.random())*0x10000)|0).toString(16)
        });
      }else{
        this.pubSubService.publish('getComponentType', {
          type: this.node.type,
          evtName
        });
      }

    } else {

      this.node.items.push({
        propName: '',
        ctrlId: '',
        rm: 1,
        key: (((1+Math.random())*0x10000)|0).toString(16)
      });

      // this.pubSubService.publish('getOperationByKey', {
      //   key: this.node.key,
      //   evtName
      // });
    }

  }

  callRemoveFunction(el) {
    // this.node.items
    this.node.items = this.node.items.filter(x => x.key != el.key);
    // this.pubSubService.publish('refreshTree', null);
    var x = JSON.stringify(this.node);
    this.node = JSON.parse(x);
  }

  hideShowObject(el) {
    el.expanded = !el.expanded;
  }

  onDropAction(event) {
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
    // this.tree.push(this.dragData);
    // event.preventDefault();
  }

  onDropRowTemplate(event) {
    //let dataTransfer = event.dataTransfer.getData('data');
    var data0 = event.dataTransfer.getData("text/plain");
    const droppedData = JSON.parse(data0);
    // const state = {...this.node};
    // state.children = droppedData.structure;
    const node = this.node;

    if(droppedData.structure && node.childrens) {
      droppedData.structure.key = this.newGuid();
      node.childrens.push(droppedData.structure);
    }



    // if(!node.actions) {
    //   node.actions = [];
    // }
    // node.actions.push(droppedData);
    // this.node.prop = false;
    // this.node.prop = true;
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
    el.prop = !el.prop;

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
    const {data} = node;
    this.pubSubService.publish('moveUpNode', data.key);
  }

  moveDownNode(node) {
    const {data} = node;
    this.pubSubService.publish('moveDownNode', data.key);
  }

  deleteNode(node) {
    const {data} = node;
    this.pubSubService.publish('deleteNode', data.key);
  }

  copyNode(node) {
    const {data} = node;
    this.pubSubService.publish('copyNode', data.key);
  }

  cutNode(node) {
    const {data} = node;
    this.pubSubService.publish('cutNode', data.key);
  }

  pasteNode(node) {
    const {data} = node;
    this.pubSubService.publish('pasteNode', data.key);
  }

  pasteToChildrens(node) {
    const {data} = node;

    const clipboard = this.pubSubService.getKeyValue('clipboard');
    if(!clipboard) {
      return;
    }
    const clipboardNode = JSON.parse(clipboard);

    data.push(clipboardNode);
    //this.pubSubService.publish('pasteNode', data.key);
  }


  addParam(o, event){
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
