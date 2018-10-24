import {Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, ChangeDetectionStrategy} from '@angular/core';
import {DynamicComponent} from "../dynamic.component";
import {PubSubService} from "../../services/pubSub/pubsub";

@Component({
    selector: '[dynamicNavigation]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">Logo</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li *ngIf="user" (click)="logout()"><a href="#" routerLink="/user/login" routerLinkActive="active">Logout</a></li>
            <li *ngIf="!user" ><a href="#" routerLink="/user/login" routerLinkActive="active">Login</a></li>
            <li><a  href="#" routerLink="/designer" routerLinkActive="active">Designer</a></li>
            <li><a  href="#" routerLink="/designer" routerLinkActive="active">test</a></li>
            <li><a  href="#" routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
          </ul>
        </div>
      </nav>
    </ng-container>
  
  <!--<ng-container *ngIf="template == 'data'">-->
      <!--<input type="text" -->
        <!--class="{{context.class}}" -->
        <!--id="{{context.id}}" -->
        <!--name="{{context.name || context.id}}" -->
        <!--[(ngModel)]="data[context.value]"  -->
        <!--(input)="change($event)">-->
        <!---->
      <!--<ng-template #errcontainer></ng-template>-->
    <!--</ng-container>-->
  
  <!--<pre> {{context | json}} </pre>-->
    `
})

export class DynamicNavigationComponent extends DynamicComponent {
  @ViewChild('errcontainer', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    pubSubService: PubSubService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    super(pubSubService);
  }

  ngOnInit() {
    if(!this.context )
    {
      return;
    }
    this.addChildrens(this.viewContainerRef, this.componentFactoryResolver);
    this.afterInit();

  }

  errorComponent = null;

  change(data) {
    this.onChange(data);



    if(this.context.hasError) {
      if(this.errorComponent) {
        this.errorComponent.destroy();
      }

      this.errorComponent = this.addChild1(this.viewContainerRef, this.componentFactoryResolver, {
        errMessage: this.context.validation.errMessage,
        id:this.newGuid(),
        type:'error',
      });
    }else{
      if(this.errorComponent) {
        this.errorComponent.destroy();
      }

    }
  }

}
