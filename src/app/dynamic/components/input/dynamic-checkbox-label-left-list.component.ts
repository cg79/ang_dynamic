import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DynamicComponent} from "../../dynamic.component";
import {ComponentInjectorService} from "../../component-injector.service";
import {PubSubService} from "../../../services/pubSub/pubsub";

@Component({
    selector: '[dynamic-chk-lbl-left-list]',
  template: `
      <span>{{context?.text}}</span>
      <div *ngFor="let option of context.items; index as i;">
        <input type="checkbox"
          id="{{context.name}}{{i}}"
          [value]=option[context.bindValue]
          [(ngModel)]="option[context.checkedProperty]"
        />
        <label for="{{context.name}}{{i}}" >{{option[context.bindText]}}</label>
      </div>
`
})
export class DynamicChkLabelLeftListComponent extends DynamicComponent {
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

  getValue() {
    const { bindValue, checkedProperty } = this.context;
    const response = this.context.items.filter(it=> it[checkedProperty]).map(it => it[bindValue]);
    console.log(response);
    return response;
  }

  setSelectedValues(arr) {
    const { bindValue, checkedProperty, items } = this.context;
    items.map(el => el[checkedProperty] = arr.indexOf(el[bindValue])>-1);
  }


}
