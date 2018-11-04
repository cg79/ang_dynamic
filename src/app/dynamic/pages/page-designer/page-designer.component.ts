import {Component, OnInit, ViewChild, SimpleChanges, NgZone} from '@angular/core';
import {PubSubService} from "../../../services/pubSub/pubsub";
import {HttpWrapperService} from "../../../services/http/httpService";
import {ActivatedRoute} from "@angular/router";
import {FormsService} from "../../../pages/dashboard/forms.service";
import {Renderer3} from "@angular/core/src/render3/interfaces/renderer";

@Component({
  selector: 'app-page-designer',
  templateUrl: './page-designer.component.html',
  styleUrls: ['./page-designer.component.css']
})
export class PageDesignerComponent implements OnInit {

  activeColor = 'green';
  baseColor = '#ccc';
  overlayColor = 'rgba(255,255,255,0.5)';
  dragging = false;
  loaded = false;
  dragData: any = null;

  appId: '';
  ctrlName: '';
  ctrlId: '';

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

  hideShowComponents ={
    text: "Hide",
    visible: true,
    css1: "col s6 d1-",
    css2: "col s6 d1-"
  };

  tabPage: any = null;
  showTabPage(val) {
    this.tabPage = val;
  }
  toggleComponents() {
    this.hideShowComponents.visible = !this.hideShowComponents.visible;
    if(this.hideShowComponents.visible) {
      this.hideShowComponents.css1 = "col s6 d1 scroll";
      this.hideShowComponents.css2 = "col s6 d1 scroll";
      this.hideShowComponents.text = "Hide";
    }else{
      this.hideShowComponents.css1 = "hidden";
      this.hideShowComponents.css2 = "col s12 d1 scroll";
      this.hideShowComponents.text = "Show";
    }
  }

  constructor( private pubSubService: PubSubService, private httpWrapperService: HttpWrapperService,
               private route: ActivatedRoute,
               private zone: NgZone,
               private formsService: FormsService,
  ) {

    this.pubSubService.subscribe('getComponentType', (val) => {
      const {type, evtName } = val;
      const comp = this.state.components.find(el => el.structure.type === type);
      this.pubSubService.publish(evtName, comp.structure);
    });

    this.pubSubService.subscribe('getOperationByKey', (val) => {
      const {type, evtName } = val;
      const objByKkey = null;
      const comp = this.state.components.find(el => el.structure.type === type);
      this.pubSubService.publish(evtName, comp.structure);
    });

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
        // this.refreshTree();
      }
    });

    this.pubSubService.subscribe('moveDownNode', (val) => {
      this.treeNode = null;
      this.searchTree(this.context, val);
      if(this.treeNode) {
        const { parentNode, element } = this.treeNode;
        this.moveDown(parentNode.childrens, element);
        // this.refreshTree();
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
        this.refreshTree();
      }
    });

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
        // this.refreshTree();
      }
    });

    this.pubSubService.subscribe('pasteNode', (val) => {
      this.treeNode = null;
      this.searchTree(this.context, val);
      if (this.treeNode) {
        const { parentNode, element } = this.treeNode;
        const clipboard = this.pubSubService.getKeyValue('clipboard');
        const clipboardNode = JSON.parse(clipboard);
        if(!element.childrens) {
          element.childrens = [];
        }
        element.childrens.push(clipboardNode);

        this.refreshTree();
      }
    });

    this.pubSubService.subscribe('refreshTree', (val) => {
      if (!val) {
        return;
      }
      var x = JSON.stringify(this.context.childrens);

      // this.treeNode = null;
      this.context.childrens = null;
      this.context.childrens = JSON.parse(x);
    });


    this.pubSubService.subscribe('componentSelected', (val) => {
      if(this.selectedComponent ) {
        this.selectedComponent.prop = false;
        // this.treeNode = null;
        // this.searchTree(this.context, val);
      }
      // this.selectedComponent = null;


      this.zone.run(() => {
        if(!val.prop)
        {
          this.selectedComponent = null;
        }else{
          this.selectedComponent = val;
        }

      });

      // setTimeout( () => {
      //   this.selectedComponent = val;
      // }, 1);

    });

  }


  findObjectRecursivellyByPropValue(obj, key, value) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // {order: "popular"}
        const {name, id} = params;
        this.ctrlId = id;
        this.ctrlName = name;

        this.getControlById(id);
      });
  }

  refreshTree() {
    var x = JSON.stringify(this.context.childrens);

    // this.treeNode = null;
    this.context.childrens = null;
    this.context.childrens = JSON.parse(x);

    if(this.selectedComponent) {
      var y = JSON.stringify(this.selectedComponent);

      // this.treeNode = null;
      this.selectedComponent = null;
      this.selectedComponent = JSON.parse(y);

    }
  }

  selectedComponent : any = null;

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
  currentForm: any = null;

  getControlById(id)
  {
    const body = {
      data: {
        _id: id
      },
      proxy: {
        module: 'generic',
        method: 'findOne',
        info: {
          collection: 'controls'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body)
      .subscribe(data =>{
          const { data: form} = data;
          this.currentForm = form;
          this.context.childrens = form.structure || [];
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
        _id: this.ctrlId,
        structure: this.context.childrens
      },
      proxy: {
        module: "generic",
        method: "edit",
        info: {
          fields: ['structure'],
          collection: 'controls'
        }
      }
    };
    this.httpWrapperService.postJson('/api/private', body).subscribe(
      (data) => this.getForms(), // success path
      error => this.error = error
    );
  }

  // started: boolean = true;
  // start()
  // {
  //   this.started = true;
  //   this.getForms();
  // }


  newGuid = () => (((1+Math.random())*0x10000)|0).toString(16);
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
          dataSubscribe: '',
          childrens: []
        }
      },
      {
        name: 'navigation',
        structure: {
          type:'navigation',
          items:[],
          da:1,
          add: function () {
            this.items.push({
              title: '',
              url: '',
              rm:1,
              key: (((1+Math.random())*0x10000)|0).toString(16)
            });
          }
        }
      },
      {
        name: 'accordion',
        structure: {
          type:'accordion',
          id:'',
          class:"",
        }
      },
      {
        name: 'autocomplete',
        structure: {
          type:'autocomplete',
          id:'',
          class:"",
        }
      },
      {
        name: 'carousel',
        structure: {
          type:'carousel',
          id:'',
          class:"",
        }
      },
      {
        name: 'charts',
        structure: {
          type:'charts',
          id:'',
          class:"",
        }
      },
      {
        name: 'collapse',
        structure: {
          type:'collapse',
          id:'',
          class:"",
        }
      },
      {
        name: 'date',
        structure: {
          type:'date',
          id:'',
          class:"",
        }
      },
      {
        name: 'maps',
        structure: {
          type:'maps',
          id:'',
          class:"",
        }
      },
      {
        name: 'modal',
        structure: {
          type:'modal',
          id:'',
          class:"",
        }
      },
      {
        name: 'tabs',
        structure: {
          type:'tabs',
          id:'',
          class:"",
        }
      },
      {
        name: 'time',
        structure: {
          type:'time',
          id:'',
          class:"",
        }
      },
      {
        name: 'tooltip',
        structure: {
          type:'tooltip',
          id:'',
          class:"",
        }
      },
      {
        name: 'video',
        structure: {
          type:'video',
          id:'',
          class:"",
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
         childrens: [{a:1}]
        }
      },
      {
        name: 'div',
        structure: {
          type:'div',
          id:'',
          class:"row",
          cols: 0
        }
      },
      {
        name: 'text',
        structure: {
          type:'text',
          value: 'label1',
          id:'',
          class:"",
          compType: 'text',
          placeholder:'',
          validation:{
            required: {
              active: false,
              message: "introdu ceva",
            },
            equalWith: {
              active: false,
              ctrlId: "",
              message: "not equal with"
            },

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
          childrens: []
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
          class:'waves-effect waves-light btn',
          compType:'link',
          value:'btn',
          actions: []
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
      {
        name: 'number',
        structure: {
          type:'number',
          value: '',
          id:'',
          class:"",
          compType: 'text',
          validation:{
            required: true,
            requiredMessage: "introdu ceva"
          }
        }
      },
    ]
  };


  actions = {
    operations: [
      {
        httpPost: {
          name: '',
          url: '/api/pub/',
          proxy: {
            info: {
              collection: ''
            },
            module: 'generic',
            method: 'add'
          },
          body: {
            items: [],
            da:1,
            key: 'httppost',
            add: function () {
              this.items.push({
                propName: '',
                ctrlId: '',
                rm:1,
                key: (((1+Math.random())*0x10000)|0).toString(16)
              });
            }
          },
          storeKey: ''
        }
      },
      {
        httpGet: {
          url: '',
          proxy: {
            collection: '',
            module: '',
            method: ''
          },
          queryParams: '',
          parameters:[]
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
      },
      {
        setLocalStorage: {
          key: '',
          value: ''
        }
      },
      {
        getLocalStorage: {
          key: ''
        }
      },
      {
        throw: {
          message: ''
        }
      },
      {
        if: {
          cond: '',
          yes: {
            actions: []
          },
          no: {
            actions: []
          }

        }
      },
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
    this.dragData = JSON.stringify(data);
       event.dataTransfer.setData("text/plain",this.dragData);

    // event.dataTransfer.data = data;

  }
  onDrop(event, data) {
  //let dataTransfer = event.dataTransfer.getData('data');

    let obj = JSON.parse(this.dragData);
    // console.log(this.dragData);
    obj.structure.key = this.newGuid();
    const state = [ ...this.context.childrens];
    state.push(obj.structure);
    this.context.childrens = state;
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

    this.pubSubService.publish('dataChanged1',{ a: 1 });
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

  // newGuid = () => (((1+Math.random())*0x10000)|0).toString(16);

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
