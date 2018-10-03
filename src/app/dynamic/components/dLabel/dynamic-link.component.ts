import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";

@Component({
    selector: '[dynamic-link]',
  template: `
    <a class="{{context.class}}" href="{{context?.href}}">
    {{context.value}}
      <ng-template #dynamic1></ng-template>
    </a>`
})
export class DynamicLinkComponent extends DynamicComponent {
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
