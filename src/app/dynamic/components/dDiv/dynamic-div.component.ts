import {Component, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";

@Component({
    selector: 'dynamic-div',
    template: `<div id={{context?.id}}>{{context?.text}}</div>`
})
export class DynamicDivComponent extends DynamicComponent {

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
