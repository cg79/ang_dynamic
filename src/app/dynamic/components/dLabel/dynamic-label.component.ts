 import {
  Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, Renderer2, ElementRef
} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
 import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
  selector:'dinamicLabel',
  template: `
     <label id="{{context?.id}}" class="{{context?.class}}">
      {{context?.value}}
       <ng-template #dynamic1></ng-template>
    </label>
  `
})

//LINK: https://jaxenter.com/new-angular6-143995.html
export class DynamicLabelComponent extends DynamicComponent {
  @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    pubSubService: PubSubService,
    ) {
    super(pubSubService);
    // this.service = service;
//https://github.com/angular/angular/issues/18877
  }

  ngOnInit() {
    // this.nativeElement = this.el.nativeElement.childNodes[0];
    //this.renderer.appendChild(this.el.nativeElement,null)

    if(!this.context )
    {
      return;
    }
    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);
  }

  // ngAfterViewInit() {
  //   debugger;
  //   const el = this.el;
  //   const parentElement = el.nativeElement.parentElement;
  //   const element = el.nativeElement;
  //   parentElement.removeChild(element);
  //   parentElement.parentNode.insertBefore(element, parentElement.nextSibling);
  //   parentElement.parentNode.removeChild(parentElement);
  //
  //
  // }

}
