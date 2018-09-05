import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {ComponentInjectorService} from "../../component-injector.service";

@Component({
    selector: 'dynamic-label',
  template: `
    <label  id={{context?.id}}>
      <span>{{context?.text}}</span>
      <ng-template #dynamic1></ng-template>
    </label>`
})
export class DynamicLabelComponent extends DynamicComponent {
  @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super();
    // this.service = service;
  }

  ngOnInit() {
debugger;
    if(!this.context )
    {
      return;
    }
    const { children } = this.context;


    if (children) {
      this.addChild(this.viewContainerRef, this.componentFactoryResolver, this.context.type, children);

    }
  }

}
