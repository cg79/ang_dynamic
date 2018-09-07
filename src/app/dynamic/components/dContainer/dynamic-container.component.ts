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

    // @Input() context: any;

    // private mappings = {
    //     'sample1': DynamicSample1Component,
    //     'label': DynamicLabelComponent,
    //   'div': DynamicDivComponent,
    //   'text': DynamicTextComponent
    // };

    // private componentRef: ComponentRef<{}>;

  pubSubService: PubSubService;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
) {
    super();
    debugger;
    this.pubSubService = new PubSubService();
    // this.service = service;
  }

    // getComponentType(typeName: string) {
    //     let type = this.mappings[typeName];
    //     return type;// || UnknownDynamicComponent;
    // }

  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    const { childrens } = this.context;

    for(var i=0;i<childrens.length;i++) {
      const children = childrens[i];
      children.obs = this.pubSubService;
      this.addChild1(this.viewContainerRef, this.componentFactoryResolver, {...children });

    }

  }
    // ngOnInit() {
    //     if (this.context.type) {
    //         let componentType = this.getComponentType(this.context.type);
    //
    //         // note: componentType must be declared within module.entryComponents
    //         let factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    //         this.componentRef = this.container.createComponent(factory);
    //
    //         // set component context
    //         let instance = <DynamicComponent> this.componentRef.instance;
    //         instance.context = this.context;
    //
    //
    //       // const factory = this.componentFactoryResolver.resolveComponentFactory(DynamicLabelComponent);
    //       //   const ref = this.viewContainerRef.createComponent(factory);
    //       //   ref.changeDetectorRef.detectChanges();
    //
    //     }
    // }
    //


}
