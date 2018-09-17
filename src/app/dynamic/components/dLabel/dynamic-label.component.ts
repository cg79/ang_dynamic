import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";

@Component({
    selector: 'dynamic-label',
  template: `
    <label  id="{{context?.id}}" class="{{context?.class}}">
      <span>{{context?.value}}</span>
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
    if(!this.context )
    {
      return;
    }
    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);
  }

}
