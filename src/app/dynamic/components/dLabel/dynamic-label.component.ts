 import {
  Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, Renderer2, ElementRef
} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";

@Component({
  selector:'[dinamicLabel]',
  template: `
    <!--<ng-container *ngIf="template == 'default'">-->
     <label id="{{context?.id}}" class="{{context?.class}}">
      {{context?.value}}
       <ng-template #dynamic1></ng-template>
    </label>
    
  <!--</ng-container>-->

    <!--<ng-container *ngIf="template == 'data'">-->
        <!--<label  id="{{context?.id}}" class="{{context?.class}}">-->
          <!--<span>{{data[context.value]}}</span>-->
          <!--<ng-template #dynamic1></ng-template>-->
        <!--</label>-->
    <!--</ng-container>-->
    
    
  `
})
export class DynamicLabelComponent extends DynamicComponent {
  @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2
    ) {
    super();
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

}
