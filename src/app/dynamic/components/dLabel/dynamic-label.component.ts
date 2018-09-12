import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";

@Component({
    selector: 'dynamic-label',
  template: `
    <label  id={{context?.id}} class={{context?.class}}>
      <span>{{context?.value}}</span>
      <ng-template #dynamic1></ng-template>
      <!--<pre>{{context | json}} </pre>-->
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
    if(!this.context )
    {
      return;
    }
    const { children } = this.context;


    if (children) {
      this.addChild1(this.viewContainerRef, this.componentFactoryResolver, children);

    }
  }

}
