import { Component, Input } from '@angular/core';

@Component({
    selector: 'dynamic-component-demo',
    template: `
        <div>
            <h2>Dynamic content</h2>
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
