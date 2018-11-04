import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamic-button]',
  template: `
    <button class="{{context.class}}" type="{{context?.compType}}" (click)="exec()">
    {{context.value}}
      <ng-template #dynamic1></ng-template>
    </button>`

})
export class DynamicButtonComponent extends DynamicComponent {
  @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    pubSubService: PubSubService,
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

  exec() {
    this.pubSubService.publish('exec', this.context);
  }

}
