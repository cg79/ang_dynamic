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
    @Input() context : any = null;
    @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

    // @Input() context: any;

    // private mappings = {
    //     'sample1': DynamicSample1Component,
    //     'label': DynamicLabelComponent,
    //   'div': DynamicDivComponent,
    //   'text': DynamicTextComponent
    // };

    // private componentRef: ComponentRef<{}>;

  modelChanged() {
    this.renderComponets();
  }

  pubSubService: PubSubService;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
) {
    super();
    this.pubSubService = new PubSubService();
    // this.service = service;
    this.pubSubService.subscribe('datachanged', (val) => {
      this.context = val;
      this.renderComponets();
    });
  }

    // getComponentType(typeName: string) {
    //     let type = this.mappings[typeName];
    //     return type;// || UnknownDynamicComponent;
    // }

  ngOnInit() {
    this.renderComponets();

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
