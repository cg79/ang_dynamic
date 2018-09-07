import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { DynamicComponent } from '../../dynamic.component';

@Component({
    selector: 'dynamic-text',
  template: `
  <input type="text" class="form-control" id="{{context.id}}" name="{{context.name}}" required [(ngModel)]="context.value"  (change)="onChange($event)">
  <div class="form-group"
  *ngIf="context.hasError"
                  [ngClass]="{'has-error':context.hasError}"> 
                        <label class="control-label">{{context.validation.errMessage}}
                            <ng-content></ng-content>
                        </label>
             </div>
  
  <pre> {{context | json}} </pre>
    `
})

export class DynamicTextComponent extends DynamicComponent {
  // @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

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
    this.afterInit();

    const { children } = this.context;


    // if (children) {
    //   this.addChild(this.viewContainerRef, this.componentFactoryResolver, this.context.type, children);

    // }
  }




}
