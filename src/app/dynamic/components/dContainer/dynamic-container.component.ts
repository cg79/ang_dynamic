import {
    Component, Input, OnInit, OnDestroy,
    ViewChild, ViewContainerRef,
    ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import {container} from "@angular/core/src/render3/instructions";
import {DynamicComponent} from "../../dynamic.component";
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: 'dynamic-container',
    template: `
            <ng-template #container></ng-template>
    `
})

//implements OnInit, OnDestroy
export class DynamicContainerComponent extends DynamicComponent  {
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  get context(): any {
    return this._context;
  }

  @Input()
  set context(val: any) {
    console.log('prev value: ', this._context);
    console.log('got name: ', val);
    this._context = val;

    this.renderComponets();
  }


  modelChanged() {
    this.renderComponets();
  }


  constructor(pubSubService: PubSubService,
              private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(pubSubService);
    this.pubSubService.subscribe('datachanged', (val) => {
      this.context = val;
      this.renderComponets();
    });
  }


  ngOnInit() {
  }

  renderComponets() {
    if(!this.context )
    {
      return;
    }
    this.viewContainerRef.clear();
    if(!this.context )
    {
      return;
    }
    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);
  }



}
