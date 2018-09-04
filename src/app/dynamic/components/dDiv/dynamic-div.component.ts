import {Component,
  NgModule,
  OnInit,
  ViewChild,
  ViewContainerRef} from '@angular/core';

import {DynamicComponent} from '../../dynamic.component';
import { ComponentInjectorService } from '../../component-injector.service';

@Component({
    selector: 'dynamic-div',
    template: `
    <div  id={{context?.id}}>
      <ng-template #dynamic></ng-template>
    </div>`
})
export class DynamicDivComponent extends DynamicComponent {

  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(service: ComponentInjectorService) {
    super();
    this.service = service;
  }
  
  ngOnInit() {
    this.service.setRootViewContainerRef(this.viewContainerRef);
    this.service.addChild('label', this.context);
  }


  // constructor(private componentFactoryResolver: ComponentFactoryResolver,
  //             private viewContainerRef: ViewContainerRef) {
  //   super();
  // }
  //
  // private addComponent() {
  //   const factory = this.componentFactoryResolver.resolveComponentFactory(DynamicLabelComponent);
  //   const ref = this.viewContainerRef.createComponent(factory);
  //   ref.changeDetectorRef.detectChanges();
  // }


}
