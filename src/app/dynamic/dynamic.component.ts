import {
  ViewContainerRef, ComponentFactory, ComponentFactoryResolver, Type, Input, ComponentRef, OnInit, OnDestroy,
  SimpleChanges, ViewChild, TemplateRef
} from '@angular/core';

import {PubSubService} from '../services/pubSub/pubsub';

export class DynamicComponent implements OnInit, OnDestroy {
  // @Input() context: any;
  template: string = 'default';
  newGuid = () => (((1 + Math.random()) * 0x10000) | 0).toString(16);

  private _data: any;
  get data(): any {
    return this._data;
  }

  @Input()
  set data(obj: any) {
    console.log('context: ', this.context);

    console.log('prev value: ', this._data);
    console.log('got name: ', obj);
    this._data = obj;
    this.template = 'data';
  }


  protected _context: any;
  get context(): any {
    return this._context;
  }

  @Input()
  set context(obj: any) {
    console.log('context: ', this.context);

    console.log('prev value: ', this._context);
    console.log('got name: ', obj);
    if (!obj.key) {
      obj.key = this.newGuid();
    }
    this._context = obj;
  }


  private mappings = {
    'container': 'dynamic-container',
    'label': 'dinamicLabel',
    'dynamic-content': 'dynamic-content',
    'div': 'dynamic-div',
    'text': 'dynamic-text',
    'chkLblLeft': '[dynamic-chk-lbl-left]',
    'chkLblRight': '[dynamic-chk-lbl-right]',
    'chkLblLeftList': '[dynamic-chk-lbl-left-list]',
    'radioLblLeftList': '[dynamic-radio-lbl-left-list]',
    'error': '[dynamic-error]',
    'paragraf': '[dynamic-paragraf]',
    'dropdown': '[dynamic-dropdown]',
    'dropdowntemp': '[dynamic-dropdown-template]',
    'link': '[dynamic-link]',
    'button': '[dynamic-button]',
    'fileUpload': '[dynamic-file-upload]',
    'repeater': '[dynamic-repeater]',
    'dynamicTextLabel': '[dynamicTextLabel]',
    'accordion': '[dynamicAccordion]',
    'autocomplete': '[dynamicAutocomplete]',
    'carousel': '[dynamicCarousel]',
    'chart': '[dynamicChart]',
    'collapse': '[dynamicCollapse]',
    'date': '[dynamicDate]',
    'map': '[dynamicMap]',
    'modal': '[dynamicModal]',
    'tabs': '[dynamicTabs]',
    'time': '[dynamicTime]',
    'tooltip': '[dynamicTooltip]',
    'number': '[dynamicTextNumber]',
    'navigation': '[dynamicNavigation]'

  };

  protected componentRef: ComponentRef<{}>;


  // @ViewChild(TemplateRef) template;
  //


  constructor(public pubSubService: PubSubService) {
    this.pubSubService = pubSubService;
  }

  // ngOnInit() {
  //   if(!this.vcRef) {
  //     return;
  //   }
  //   this.vcRef.createEmbeddedView(this.template);
  // }


  getComponentType(typeName: string, factoryResolver: ComponentFactoryResolver, container: ViewContainerRef,) {
    // console.log('0000---------------');
    let type = this.mappings[typeName];
    console.log(typeName);
    console.log(type);


    var factories = Array.from(factoryResolver['_factories'].values());
    // console.log(factories);
    // console.log('2222---------------');
    // console.log(factoryResolver['_factories']);

    var factory = <ComponentFactory<{}>>factories.find((x: any) => x.selector === type);

    // if(!factory) {
    //   factory = <ComponentFactory<{}>>factories.find((x: any) => x.componentType.name === type);
    // }
    // console.log(factoryClass);
    // console.log('3333---------------');
    // const factory = factoryResolver.resolveComponentFactory(factoryClass);

    console.log(factory);

    console.log('container=============================================================');
    // console.log(container);

    // console.log('4444---------------');
    this.componentRef = container.createComponent(factory);

    // const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
    //   .rootNodes[0];
    // try {
    //   (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes;
    // }
    // catch (ex) {
    //
    //   console.log(ex);
    // }
    return this.componentRef;// || UnknownDynamicComponent;
  }


  // addChild(container:ViewContainerRef, factoryResolver: ComponentFactoryResolver, typeName: string, data) {
  //   let component = this.getComponentType(typeName, factoryResolver, container);
  //
  //   // const factory = factoryResolver.resolveComponentFactory(componentType);
  //   // const component = factory.create(container.parentInjector);
  //
  //   // let componentRef = this.rootViewContainer.createComponent(component);
  //   // (<AdComponent>componentRef.instance).data = adItem.data;
  //
  //   const inst = <DynamicComponent>component.instance;
  //   inst.context = data;
  //   // container.insert(component.hostView);
  //
  // }

  addChild1(container: ViewContainerRef, factoryResolver: ComponentFactoryResolver, data) {
    let component = this.getComponentType(data.type, factoryResolver, container);

    // const factory = factoryResolver.resolveComponentFactory(componentType);
    // const component = factory.create(container.parentInjector);

    // let componentRef = this.rootViewContainer.createComponent(component);
    // (<AdComponent>componentRef.instance).data = adItem.data;

    const inst = <DynamicComponent>component.instance;
    inst.context = data;
    // container.insert(component.hostView);
    return component;
  }

  addChild2(container: ViewContainerRef, factoryResolver: ComponentFactoryResolver, context, data, compId) {
    let component = this.getComponentType(context.type, factoryResolver, container);

    // const factory = factoryResolver.resolveComponentFactory(componentType);
    // const component = factory.create(container.parentInjector);

    // let componentRef = this.rootViewContainer.createComponent(component);
    // (<AdComponent>componentRef.instance).data = adItem.data;

    const componentFromRepeaterContext = JSON.parse(context.asString);
    componentFromRepeaterContext.id = compId;

    const {value} = componentFromRepeaterContext;
    if (value.startsWith('[')) {
      const newv = value.replace('[', '').replace(']', '');
      componentFromRepeaterContext.value = data[newv];
    }

    const inst = <DynamicComponent>component.instance;
    inst.context = componentFromRepeaterContext;
    inst.data = data;
    // container.insert(component.hostView);
    return component;
  }

  addChildrens(container: ViewContainerRef, factoryResolver: ComponentFactoryResolver) {

    const {childrens} = this.context;
    if (!childrens) {
      return;
    }

    // if(!container) {
    //   throw "NO CONTAINER";
    // }

    for (var i = 0; i < childrens.length; i++) {
      const children = childrens[i];
      if (!children.key) {
        children.key = this.newGuid();
      }
      if (this.data) {
        this.addChild2(container, factoryResolver, children, this.data, 'kkk');
      } else {
        this.addChild1(container, factoryResolver, children);
      }

    }
  }

  dataChangedObs = null;
  afterInit() {
    const { id } = this.context;
    if (id) {
      this.dataChangedObs = this.pubSubService.subscribe('dataChanged1', (data) => {
        // this.dataChangedObs.unsubscribe();
      });
    }

    const {obs, subscribeEvents, validation} = this.context;
    if (obs || subscribeEvents) {

      for (var i = 0; i < subscribeEvents.length; i++) {
        const eventName = subscribeEvents[i];
        obs.subscribe(eventName, (val) => {
          this.context.obsdata = val;

        });
      }
    }

    if (!validation) {
      return;
    }

    const validationExpressions = this.createValidationExpressions();
    validation.expressions = validationExpressions;
  }


  onChange(data) {
    const {onchangeEvent, validation} = this.context;
    if (onchangeEvent) {
      this.triggerEvent(onchangeEvent, this.context.value);
    }

    this.validate();


  }

  validate() {
    let {validation, value} = this.context;
    // if(this.data) {
    //   value = this.data[this.context.value];
    // }

    if (validation) {
      this.setError(false, null);
      if (validation.required && validation.required.active) {
        if (!value) {
          this.setError(true, validation.required['message']);
          return;
        }
        // const { equalWith } = validation;
        // if(equalWith && equalWith.active) {
        //   if(!value) {
        //     this.setError(true, validation["message"]);
        //     return;
        //   }
        //
        // }
        const validationExpressions = this.createValidationExpressions();
        validation.expressions = validationExpressions;

        this.pubSubService.publish('validate', validation);

      }
    }
  }

  createValidationExpressions() {
    const expressions = [];

    let {validation, value} = this.context;
    if (!validation) {
      return;
    }

    const {equalWith} = validation;
    if (equalWith && equalWith.active) {
      expressions.push({
        // equalWith: {
        //   id: this.context.id,
        //   expr: `[${this.context.id}] == [${equalWith.ctrlId}]`
        // }
        name: 'equalWith',
        id: this.context.id,
        expr: `[${this.context.id}] == [${equalWith.ctrlId}]`,
        message: equalWith.message,
        setError: this.setError.bind(this)
      });
    }

    return expressions;
  }

  setError(isError, message) {
    if (!isError) {
      this.context.hasError = false;

    } else {
      this.context.hasError = true;
      this.context.validation.errMessage = message;
    }
  }

  setError0(isError, message) {
    if (!isError) {
      setTimeout(() => {
        this.context.hasError = false;
      }, 1);
    } else {
      setTimeout(() => {
        this.context.hasError = true;
        this.context.validation.errMessage = message;
      }, 1);
    }
  }

  error: null;

  http(httpWrapperService) {
    const {http} = this.context;

    if (http) {

      httpWrapperService.postJson(http.url, http.body).subscribe(
        (data) => this.context.items = data.data, // success path
        error => this.error = error // error path
      );
    }
  }

  triggerEvent(eventName: string, data) {
    const {obs} = this.context;
    if (!obs) {
      return;
    }
    obs.publish(eventName, data);
  }

  ngOnInit(): void {
    // this.pubSubService.
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

}
