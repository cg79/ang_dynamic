import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";

@Component({
    selector: 'dynamic-button',
  template: `
    <button class="{{context.class}}" type="{{context?.compType}}">
    {{context.value}}
      <ng-template #dynamic1></ng-template>
    </button>`

})
export class DynamicButtonComponent extends DynamicComponent {
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
