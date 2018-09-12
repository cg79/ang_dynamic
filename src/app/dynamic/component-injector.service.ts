import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector, ViewContainerRef
} from '@angular/core';

import { DynamicComponent } from './dynamic.component';
import { DynamicSample1Component } from './components/dynamic-sample1.component';
import { DynamicLabelComponent } from './components/dLabel/dynamic-label.component';
import { DynamicDivComponent } from './components/dDiv/dynamic-div.component';

@Injectable()
export class ComponentInjectorService {

  constructor() {
  }

  private mappings = {
    'sample1': DynamicSample1Component,
    'label': DynamicLabelComponent,
    'div': DynamicDivComponent
  };


  getComponentType(typeName: string) {
    let type = this.mappings[typeName];
    return type;// || UnknownDynamicComponent;
  }


  addChild(container:ViewContainerRef, factoryResolver: ComponentFactoryResolver, typeName: string, data) {
    let componentType = this.getComponentType(typeName);

    const factory = factoryResolver.resolveComponentFactory(componentType);
    const component = factory.create(container.parentInjector);

    // let componentRef = this.rootViewContainer.createComponent(component);
    // (<AdComponent>componentRef.instance).data = adItem.data;

    const inst = <DynamicComponent>component.instance;
    inst.context = data;
    container.insert(component.hostView);

  }

}
