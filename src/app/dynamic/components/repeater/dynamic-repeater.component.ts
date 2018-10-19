import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamic-repeater]',
  template: `
      <ng-template #dynamic1></ng-template>
  `
})

export class DynamicRepeaterComponent extends DynamicComponent {
  @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    pubSubService: PubSubService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super(pubSubService);
    // this.service = service;
  }

  onSelect(data)
  {

  }
  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    const { childrens } = this.context;
    if(!childrens)
    {
      return;
    }

    if (!this.context.id) {
      this.context.id = this.newGuid();
    }

    const { id } = this.context;
    let counter = 0;
    let compId = '';

    for(var j=0; j < this.context.items.length; j++) {
      const data = this.context.items[j];
      for(var i=0;i<childrens.length;i++) {
        counter ++;
        compId = `${id}${counter}`;
        const children = childrens[i];
        children.asString = JSON.stringify(children);
        this.addChild2(this.viewContainerRef,this.componentFactoryResolver, children, data, compId);
      }
    }

    // for(var i=0;i<childrens.length;i++) {
    //   const children = childrens[i];
    //   for(var j=0; j < this.context.items.length; j++) {
    //     const data = this.context.items[j];
    //     this.addChild2(this.viewContainerRef,this.componentFactoryResolver,children, data);
    //   }
    // }
    // this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);
  }

}
