import {Component, OnInit, ViewChild, SimpleChanges} from '@angular/core';
import {PubSubService} from "../../../services/pubSub/pubsub";
import {JsonEditorOptions, JsonEditorComponent} from "ang-jsoneditor";

@Component({
  selector: 'app-page-designer',
  templateUrl: './page-designer.component.html',
  styleUrls: ['./page-designer.component.css']
})
export class PageDesignerComponent implements OnInit {

  public editorOptions: JsonEditorOptions;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';
  dragging: boolean = false;
  loaded: boolean = false;
  dragData: any = null;

  constructor( private pubSubService: PubSubService) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    this.editorOptions.mode = 'code';
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    this.editorOptions.statusBar = false;


    this.pubSubService.subscribe('refreshJsonEditor', (val) => {

      const sss = JSON.stringify(this.context.childrens);
       const childrens = JSON.parse(sss);
      this.context.childrens = childrens;
      this.editor.data = { ...this.context };
      // this.context.id = 'id-' +  Math.random().toString(36).substr(2, 16);
      // this.context.childrens[0].ooo = 'id-' +  Math.random().toString(36).substr(2, 16);
      //setTimeout(() => this.context.childrens = [ ...this.context.childrens ],10);

    });


  }

  ngOnInit() {
    this.editorOptions.onChange = this.change.bind(this);
  }



  change() {
    console.log('change:', this.editor);
    const data = this.editor.get();
    this.pubSubService.publish('datachanged', data);
  }

  state = {
    components: [
      {
        name: 'label',
        structure: {
          type:'label',
          value: 'label1',
          id:'l1',
          class:'label'

        }
      },
      {
        name: 'div',
        structure: {
          type:'div',
          id:'l2',
          class:"row"
        }
      },
      {
        name: 'text',
        structure: {
          type:'text',
          value: 'label1',
          id:'l2',
          class:""
        }
      },
      {
        name: 'chk left',
        structure: {
          type:'chkLblLeft',
          value: '',
          id:'l2',
          class:""
        }
      }
    ]
  };



  tree = [];

  context: any = {
    id:'asf1',
    type:'container',
    childrens: this.tree
  };

  renderContext: any = {
    "id": "asf1",
    "type": "container",
    "childrens": [
      {
        "value": "label1",
        "id": "l1",
        "type": "label"

      }
    ]
  } ;



  onDragStart(event, data) {
    this.dragData = data;
     event.dataTransfer.setData("text/plain",JSON.stringify(data));

    event.dataTransfer.data = data;

  }
  onDrop(event, data) {
  //let dataTransfer = event.dataTransfer.getData('data');

    console.log(this.dragData);
    const state = [ ...this.context.childrens];
    state.push(this.dragData.structure);
    this.context.childrens = state;

    this.pubSubService.publish('refreshJsonEditor',null);


    this.pubSubService.publish('datachanged', this.renderContext);
    event.preventDefault();
  }


  allowDrop(event) {
  event.preventDefault();
}

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  refreshContext() {
  this.pubSubService.publish('datachanged', this.renderContext);
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;

  }


}
