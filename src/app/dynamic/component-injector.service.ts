import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from '@angular/core';

import { DynamicComponent } from './dynamic.component';
import { DynamicSample1Component } from './components/dynamic-sample1.component';
import { DynamicLabelComponent } from './components/dLabel/dynamic-label.component';
import { DynamicDivComponent } from './components/dDiv/dynamic-div.component';

@Injectable()
export class ComponentInjectorService {

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  private mappings = {
    'sample1': DynamicSample1Component,
    'label': DynamicLabelComponent,
    'div': DynamicDivComponent
  };

  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  getComponentType(typeName: string) {
    let type = this.mappings[typeName];
    return type;// || UnknownDynamicComponent;
  }


  addChild(typeName: string, data) {
    let componentType = this.getComponentType(typeName);

    const factory = this.factoryResolver.resolveComponentFactory(componentType);
    const component = factory.create(this.rootViewContainer.parentInjector);
    
    // let componentRef = this.rootViewContainer.createComponent(component);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    
    component.instance.context = data;
    this.rootViewContainer.insert(component.hostView);

  }

}
