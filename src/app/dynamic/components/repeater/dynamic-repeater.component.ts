import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamic-repeater]',
  template: `
      <ng-template #dynamic1></ng-template>
      <pre>{{context | json}} </pre>
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
    const { childrens, dataSubscribe  } = this.context;
    if(!childrens)
    {
      return;
    }
    this.renderItems();

    if(dataSubscribe) {
      this.pubSubService.subscribe(dataSubscribe, (data) => {
        debugger;
        this.context.items = data.data;
        setTimeout(this.renderItems.bind(this),1);
      });
    }

    const rrr = this.renderItems.bind(this);
    setInterval(() => {
      this.context.items.push({a:"aaa", text: this.newGuid()});
      rrr();
    }, 1000);
  }

  counter = 0;

  renderItems(){
    if(!this.context )
    {
      return;
    }
    const { childrens, dataSubscribe  } = this.context;
    if(!childrens)
    {
      return;
    }

    const childrensClone = [...childrens];

    if (!this.context.id) {
      this.context.id = this.newGuid();
    }
    this.viewContainerRef.clear();
    const { id } = this.context;

    let compId = '';
    const items = [...this.context.items];
    for(var j=0; j < items.length; j++) {
      const data = items[j];
      console.log('render', j);
      for(var i=0;i<childrensClone.length;i++) {
        this.counter ++;
        compId = `${id}${this.counter}`;
        const children = childrensClone[i];
        if(!children.asString ) {
        children.asString = JSON.stringify(children);
        }
        this.addChild2(this.viewContainerRef,this.componentFactoryResolver, children, data, compId);
      }
    }
  }


}
