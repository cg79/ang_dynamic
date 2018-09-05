
// import {DynamicSample1Component} from "./components/dynamic-sample1.component";
// import {DynamicLabelComponent} from "./components/dLabel/dynamic-label.component";
// import {DynamicDivComponent} from "./components/dDiv/dynamic-div.component";
import {ViewContainerRef, ComponentFactoryResolver, Type} from "@angular/core";


export class DynamicComponent {
    context: any;

  private mappings = {
    'sample1': 'DynamicSample1Component',
    'label': 'DynamicLabelComponent',
    'div': 'DynamicDivComponent',
    'text': 'DynamicTextComponent'
  };


  getComponentType(typeName: string, factoryResolver: ComponentFactoryResolver, container:ViewContainerRef, ) {
    let type = this.mappings[typeName];
    var factories = Array.from(factoryResolver['_factories'].keys());
    var factoryClass = <Type<{}>>factories.find((x: any) => x.name === type);

    const factory = factoryResolver.resolveComponentFactory(factoryClass);


    const compRef = container.createComponent(factory);

    return compRef;// || UnknownDynamicComponent;
  }


  addChild(container:ViewContainerRef, factoryResolver: ComponentFactoryResolver, typeName: string, data) {
    let component = this.getComponentType(typeName, factoryResolver, container);

    // const factory = factoryResolver.resolveComponentFactory(componentType);
    // const component = factory.create(container.parentInjector);

    // let componentRef = this.rootViewContainer.createComponent(component);
    // (<AdComponent>componentRef.instance).data = adItem.data;

    const inst = <DynamicComponent>component.instance;
    inst.context = data;
    // container.insert(component.hostView);

  }

}
