
import {
  ViewContainerRef, ComponentFactory, ComponentFactoryResolver, Type, Input, ComponentRef, OnInit, OnDestroy,
  SimpleChanges
} from "@angular/core";


export class DynamicComponent implements OnDestroy {
    @Input() context: any;

  private mappings = {
    'container':'dynamic-container',
    'label': 'dynamic-label',
    'div': 'dynamic-div',
    'text': 'dynamic-text',
    'chkLblLeft': 'dynamic-chk-lbl-left',
    'chkLblRight': 'dynamic-chk-lbl-right',
    'chkLblLeftList':'dynamic-chk-lbl-left-list',
    'radioLblLeftList':'dynamic-radio-lbl-left-list',
    'error':'dynamic-error'
  };

  protected componentRef: ComponentRef<{}> ;

  getComponentType(typeName: string, factoryResolver: ComponentFactoryResolver, container:ViewContainerRef, ) {
    console.log('0000---------------');
    let type = this.mappings[typeName];
    console.log(typeName);
    console.log(type);

    console.log('1111---------------');


    var factories = Array.from(factoryResolver['_factories'].values());
    console.log(factories);
    console.log('2222---------------');
    console.log(factoryResolver['_factories']);

    var factory = <ComponentFactory<{}>>factories.find((x: any) => x.selector === type);

    // console.log(factoryClass);
    // console.log('3333---------------');
    // const factory = factoryResolver.resolveComponentFactory(factoryClass);
    
    console.log(factory);

    console.log('container=============================================================');
    console.log(container);

    console.log('4444---------------');
    this.componentRef = container.createComponent(factory);

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

  addChild1(container:ViewContainerRef, factoryResolver: ComponentFactoryResolver,  data) {
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

  afterInit() {
    const { obs, subscribeEvents } = this.context;
    if (!obs || !subscribeEvents) {
      return;
    }
    debugger;

    for(var i=0;i<subscribeEvents.length;i++)
    {
      const eventName = subscribeEvents[i];
      obs.subscribe(eventName, (val) => {
        this.context.obsdata = val;
        debugger;

      });

    }


  }


   onChange(data){
    debugger;
    const { onchangeEvent, validation } = this.context;
    if(onchangeEvent) {
      this.triggerEvent(onchangeEvent, this.context.value);
    }

    this.validate();


  }
  //
  // ngOnChanges(changes: SimpleChanges) {
  //
  //   this.validate();
  //   //this.doSomething(changes.categoryId.currentValue);
  //   // You can also use categoryId.previousValue and
  //   // categoryId.firstChange for comparing old and new values
  //
  // }

  validate()
  {
    const { validation, value } = this.context;

    if(validation) {
      this.setError(false, null);
      if(validation["required"]) {
        if(!value) {
          this.setError(true, validation["required"]);
          return;
        }
      }
    }
  }


  setError(isError, message){
    if(!isError) {
      this.context.hasError = false;

    }else{
        this.context.hasError = true;
        this.context.validation.errMessage = message;
    }
  }

  setError0(isError, message){
    if(!isError) {
      setTimeout( () => {
        this.context.hasError = false
      }, 1);
    }else{
      setTimeout( () => {
        this.context.hasError = true;
        this.context.validation.errMessage = message;
      }, 1);
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  triggerEvent(eventName: string, data) {
    const { obs } = this.context;
    if (!obs) {
      return;
    }
    obs.publish(eventName, data);
  }

}
