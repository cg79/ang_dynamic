import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {ComponentInjectorService} from "../../component-injector.service";
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamic-radio-lbl-left-list]',
  template: `
      <span>{{context?.text}}</span>
      
      <div *ngFor="let option of context.items; index as i;">
            <input type="radio"
                   id="{{i}}"
                   name="{{context.name}}{{i}}"
                   value="{{option[context.bindValue]}}"
                   [(ngModel)]="context.value"
                   [checked]="context.value === option[context.bindValue]"
                   (change)="onChange()"
                   />
        <label for="{{context.name}}{{i}}">{{option[context.bindText]}}</label>
    </div>
`
})
export class DynamicRadioLabelLeftListComponent extends DynamicComponent {
  @ViewChild('dynamic1', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    pubSubService: PubSubService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super(pubSubService);
    // this.service = service;
  }

  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    this.afterInit();
  }

}
