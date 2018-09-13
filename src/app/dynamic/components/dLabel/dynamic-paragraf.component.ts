import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";

@Component({
    selector: 'dynamic-paragraf',
  template: `
    <p>
      {{context?.value}}
      <ng-template #dynamic1></ng-template>
    </p>`
})
export class DynamicParagrafComponent extends DynamicComponent {
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
