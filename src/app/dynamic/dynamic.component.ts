
import {ViewContainerRef, ComponentFactoryResolver, Type, Input, ComponentRef, OnInit, OnDestroy} from "@angular/core";


export class DynamicComponent implements OnDestroy {
    @Input() context: any;

  private mappings = {
    'sample1': 'DynamicSample1Component',
    'label': 'DynamicLabelComponent',
    'div': 'DynamicDivComponent',
    'text': 'DynamicTextComponent'
  };

  protected componentRef: ComponentRef<{}> ;

  getComponentType(typeName: string, factoryResolver: ComponentFactoryResolver, container:ViewContainerRef, ) {
    let type = this.mappings[typeName];
    var factories = Array.from(factoryResolver['_factories'].keys());
    var factoryClass = <Type<{}>>factories.find((x: any) => x.name === type);

    const factory = factoryResolver.resolveComponentFactory(factoryClass);


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

  }



  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

}
