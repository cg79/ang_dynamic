import { Component, Input } from '@angular/core';

@Component({
    selector: 'dynamic-component-demo',
    template: `
        <div>
            <h2>Dynamic content</h2>
            <h3>Context: <input type="text" [(ngModel)]="context.text"></h3>
            <dynamic-content type="sample1" [context]="context"></dynamic-content>
            <dynamic-content type="label" [context]="context"></dynamic-content>
            <dynamic-content type="div" [context]="context"></dynamic-content>
            
            <!--<dynamic-content type="some-other-type" [context]="context"></dynamic-content>-->
        </div>
    `
})
export class DynamicContentComponentDemo {

    context: any = {
        text: 'test',
        id:'asf'
    }

}
