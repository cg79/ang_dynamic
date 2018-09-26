import {
  Component,
  NgModule,
  OnInit,
  ViewChild,
  ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';

import {DynamicComponent} from '../../dynamic.component';
import { ComponentInjectorService } from '../../component-injector.service';

@Component({
    selector: 'dynamic-div',
    template: `
    <div  id="{{context?.id}}" class="{{context?.class}}">
      <ng-template #dynamic></ng-template>
    </div>`
})
export class DynamicDivComponent extends DynamicComponent {

  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super();
    // this.service = service;
  }

  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);

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
