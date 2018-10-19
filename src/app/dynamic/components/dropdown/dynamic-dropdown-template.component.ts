import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamic-dropdown-template]',
  template: `
    <select class="browser-default"
    (change)="onSelect($event.target.value)" 
    [(ngModel)]="context.value">
      <option *ngFor="let item of context.items"
        [value]=item[context.bindValue]>
         {{item[context.bindText]}}
         <dynamic-content [context]="context.childrens"></dynamic-content>
      </option>
    </select>
`
})

export class DynamicDropDownTemplateComponent extends DynamicComponent {
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
    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);
  }

}
