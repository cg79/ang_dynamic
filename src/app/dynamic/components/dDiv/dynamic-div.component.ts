import {
  Component,
  NgModule,
  OnInit,
  ViewChild,
  ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';

import {DynamicComponent} from '../../dynamic.component';
import { ComponentInjectorService } from '../../component-injector.service';
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: 'dynamic-div',
    template: `
    <div  id="{{context?.id}}" class="{{context?.class}}" [ngClass]="getClass()">
      <ng-template #dynamic></ng-template>
    </div>`
})
export class DynamicDivComponent extends DynamicComponent {

  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    pubSubService: PubSubService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super(pubSubService);
    // this.service = service;
  }

  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);

  }

  getClass() {
    const { cols } = this.context;
    if (cols) {
      return `col s${cols}`;
    }
    return '';
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
