import {Component, OnInit, ViewChild, SimpleChanges} from '@angular/core';
import {PubSubService} from "../../../services/pubSub/pubsub";
import {HttpWrapperService} from "../../../services/http/httpService";

@Component({
  selector: 'app-page-designer',
  templateUrl: './page-designer.component.html',
  styleUrls: ['./page-designer.component.css']
})
export class PageDesignerComponent implements OnInit {

  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';
  dragging: boolean = false;
  loaded: boolean = false;
  dragData: any = null;

  formsDropDown = {
    "text": "ccccccccccccc",
    "name": "a",
    "items": [
      {
        "a": 1,
        "text": "ion",
        "checked": true
      },
      {
        "a": 2,
        "text": "Maria"
      }
    ],
    "bindText": "name",
    "bindValue": "_id",
    "value": "1",
    http: {
        body : {
          data: {
            _id: '',
            name: 'f2'
          },
          proxy: {
            module: "form",
            method: "getForms"
          }
      },
      url: '/api/private'
    }
  };



  constructor( private pubSubService: PubSubService, private httpWrapperService: HttpWrapperService) {



    this.pubSubService.subscribe('refreshJsonEditor', (val) => {

      const sss = JSON.stringify(this.context.childrens);
       const childrens = JSON.parse(sss);
      this.context.childrens = childrens;
      // this.editor.data = { ...this.context };
      // this.context.id = 'id-' +  Math.random().toString(36).substr(2, 16);
      // this.context.childrens[0].ooo = 'id-' +  Math.random().toString(36).substr(2, 16);
      //setTimeout(() => this.context.childrens = [ ...this.context.childrens ],10);

    });

    this.pubSubService.subscribe('moveUpNode', (val) => {
      this.treeNode = null;
      this.searchTree(this.context, val);
      if(this.treeNode) {
        const { parentNode, element } = this.treeNode;
        this.moveUp(parentNode.childrens, element);
      }
    });

    this.pubSubService.subscribe('moveDownNode', (val) => {
      this.treeNode = null;
      this.searchTree(this.context, val);
      if(this.treeNode) {
        const { parentNode, element } = this.treeNode;
        this.moveDown(parentNode.childrens, element);
      }
    });

    this.pubSubService.subscribe('deleteNode', (val) => {
      this.treeNode = null;
      this.searchTree(this.context, val);
      if(this.treeNode) {
        this.treeNode.parentNode.childrens = this.treeNode.parentNode.childrens.filter(el=> el.key !== val);
        const sss = JSON.stringify(this.context.childrens);
        const childrens = JSON.parse(sss);
        this.context.childrens = childrens;
      }
    });

    //-------------------------------
    this.pubSubService.subscribe('copyNode', (val) => {
      this.treeNode = null;
      this.searchTree(this.context, val);
      if(this.treeNode) {
        const { parentNode, element } = this.treeNode;
        const nasStr = JSON.stringify(element);//changeIds;
        const n = JSON.parse(nasStr);
        this.changeIds(n);
        this.pubSubService.setKeyValue('clipboard', JSON.stringify(n));
      }
    });

    this.pubSubService.subscribe('cutNode', (val) => {
      this.treeNode = null;
      this.searchTree(this.context, val);
      if(this.treeNode) {
        const { parentNode, element } = this.treeNode;
        this.pubSubService.setKeyValue('clipboard', JSON.stringify(element));
        this.treeNode.parentNode.childrens = this.treeNode.parentNode.childrens.filter(el=> el.key !== val);
        const sss = JSON.stringify(this.context.childrens);
        const childrens = JSON.parse(sss);
        this.context.childrens = childrens;
      }
    });

    this.pubSubService.subscribe('pasteNode', (val) => {
      this.treeNode = null;
      this.searchTree(this.context, val);
      if(this.treeNode) {
        const { parentNode, element } = this.treeNode;
        const clipboard = this.pubSubService.getKeyValue('clipboard');
        const clipboardNode = JSON.parse(clipboard);
        if(!element.childrens) {
          element.childrens = [];
        }
        element.childrens.push(clipboardNode);
      }
    });

  }

  move = function(array, element, delta) {
    var index = array.indexOf(element);
    var newIndex = index + delta;
    if (newIndex < 0  || newIndex == array.length) return; //Already at the top or bottom.
    var indexes = [index, newIndex].sort(); //Sort the indixes
    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
  };

  moveUp = function(array, element) {
    this.move(array, element, -1);
  };

  moveDown = function(array, element) {
    this.move(array, element, 1);
  };

  getForms()
  {
    const body = {
      data: {
      },
      proxy: {
        module: "form",
        method: "getForms"
      }
    };
    this.httpWrapperService.postJson('/api/private', body).subscribe(
      (data) =>this.formsDropDown.items = data.data, // success path
      error => this.error = error // error path
    );
  }


  error: any = null;
  onChange(id)
  {
    const body = {
        data: {
          _id: id,
          name: 'f2'
        },
        proxy: {
          module: "form",
          method: "getForm"
        }
      };
      this.httpWrapperService.postJson('/api/private', body)
        .subscribe(data =>{
          this.context.childrens = data.data.structure || [];
        },
          error => this.error = error
      );
  }

  deleteForm() {
    const body = {
      data: {
        _id: this.formsDropDown.value,
        name: 'f2'
      },
      proxy: {
        module: "form",
        method: "deleteForm"
      }
    };
    this.httpWrapperService.postJson('/api/private', body).subscribe(
      (data) =>this.context.childrens = data.data, // success path
      error => this.error = error
    );
  }


  formName: string = null;
  createForm() {
    const body = {
      data: {
        name: this.formName
      },
      proxy: {
        module: "form",
        method: "add"
      }
    };
    this.httpWrapperService.postJson('/api/private', body).subscribe(
      (data) => this.getForms(), // success path
      error => this.error = error
    );
  }

  updateForm() {
    const body = {
      data: {
        _id: this.formsDropDown.value,
        structure: this.context.childrens
      },
      proxy: {
        module: "form",
        method: "edit"
      }
    };
    this.httpWrapperService.postJson('/api/private', body).subscribe(
      (data) => this.getForms(), // success path
      error => this.error = error
    );
  }

  started: boolean = true;
  start()
  {
    this.started = true;
    this.getForms();
  }

  ngOnInit() {
    this.getForms();
  }

  state = {
    components: [
      {
        name: 'repeater',
        structure: {
          type:'repeater',
          value: 'label1',
          id:'l1',
          class:'label',
          items:[{a:1, text:"ion", checked:true},{a:2, text:"Maria"}],
          rowTemplate: {
            type:'container'
          }
        }
      },
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
        name: 'container',
        structure: {
          type:'container',
         childrens: []
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
          class:"",
          compType: 'text',
          validation:{
            required: "introdu ceva la container"
          }
        }
      },
      {
        name: 'chk left',
        structure: {
          type:'chkLblLeft',
          value: false,
          id:'l2',
          class:"",
          text:'hhh'
        }
      },
      {
        name: 'checkbox left list',
        structure: {
          type:'chkLblLeftList',
          text: 'ccccccccccccc',
          id:'asf3',
          items:[{a:1, text:"ion", checked:true},{a:2, text:"Maria"}],
          name:'hhhhhhhhhhhh',
          bindText:"text",
          bindValue:"a",
          checkedProperty:"checked"
        }
      },
      {
        name:'radio list',
        structure: {
          type:'radioLblLeftList',
          text: 'ccccccccccccc',
          name:'a',
          items:[{a:1, text:"ion", checked:true},{a:2, text:"Maria"}],
          bindText:"text",
          bindValue:"a",
          value:"1",
          onchangeEvent:'bbb',
          subscribeEvents:['aaa']
        }
      },
      {
        name: 'paragraf',
        structure: {
          type:'paragraf',
          value:'paragraf'
        }
      },
      {
        name:'dropdown',
        structure: {
          type:'dropdown',
          text: 'ccccccccccccc',
          name:'a',
          items:[{a:1, text:"ion", checked:true},{a:2, text:"Maria"}],
          bindText:"text",
          bindValue:"a",
          value:"1",
          onchangeEvent:'bbb',
          subscribeEvents:['aaa']
        }
      },
      {
        name:'dropdowntemplate',
        structure: {
          type:'dropdowntemp',
          text: 'ccccccccccccc',
          name:'a',
          items:[{a:1, text:"ion", checked:true},{a:2, text:"Maria"}],
          bindText:"text",
          bindValue:"a",
          value:"1",
          onchangeEvent:'bbb',
          subscribeEvents:['aaa'],
          rowTemplate: {
            type:'container'
          }
        }
      },
      {
        name: 'link',
        structure: {
          type:'link',
          value:'paragraf',
          href:''
        }
      },
      {
        name: 'button',
        structure: {
          type:'button',
          class:'',
          compType:'link',
          value:'btn'
        }
      },
      {
        name: 'fileUpload',
        structure: {
          type:'fileUpload',
          class:'',
          value:'paragraf'
        }
      },
      {
        name: 'dynamicTemplate',
        structure: {
          type:'container',
          class:'',
          compType:'link',
          value:'paragraf'
        }
      },
      {
        name: 'dynamicTextLabel',
        structure: {
          type:'dynamicTextLabel',
          id:'',
          class:'',
          compType:'link',
          value:'paragraf',
          labelText:'zxc'
        }
      },
    ]
  };


  actions = {
    operations: [
      {
        http: {
          url: '',
          proxy: {
            module: '',
            method: ''
          },
          data: ''
        }
      },
      {
        getCtrValue: {
          id: '',
          property: ''
        }
      },
      {
        setCtrlValue: {
          id: '',
          value: ''
        }
      },
      {
        getCtrsValue:
          {
            name: '',
            controls: []
          }

      },
      {
        setCtrlsValue: {
          id: '',
          value: ''
        }
      }
    ]
  };



  getObjectName(obj) {
    return Object.keys(obj)[0];
  }

  radioLblLeftList
  tree = [];

  context: any = {
    id:'asf1',
    type:'container',
    key:'aaaa',
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
    this.updateForm();
  this.pubSubService.publish('datachanged', this.context);
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

  treeNode: any = null;
  //tree is context
  searchTree  =(node, nodeKey) =>{
    const { childrens } = node;
    if(childrens) {

      for (let i = 0; i < childrens.length; i++) {
        if (childrens[i].key == nodeKey) {
          // it's parent
          console.log(childrens[i].key);
          this.treeNode = {
            parentNode: node,
            element: childrens[i]
          };

        } else {
          this.searchTree(childrens[i], nodeKey);
        }
      }
    }
  }

  newGuid = () => (((1+Math.random())*0x10000)|0).toString(16);

  changeIds  =(node) =>{
    if(node.id) {
      node.id = this.newGuid();
    }
    const { childrens } = node;
    if(childrens) {

      for (let i = 0; i < childrens.length; i++) {
        if (childrens[i].id) {
          if(childrens[i].id) {
            childrens[i].id = this.newGuid();
          }
        }
        this.changeIds(childrens[i]);
      }
    }
  }


}
