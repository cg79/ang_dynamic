import { Component, Input } from '@angular/core';

@Component({
    selector: 'dynamic-component-demo',
    template: `
        <div>
            <h2>Dynamic content</h2>
            <dynamic-content [context]="context"></dynamic-content>
            
            <!--<dynamic-content type="some-other-type" [context]="context"></dynamic-content>-->
        </div>
    `
})
export class DynamicContentComponentDemo {

    context: any = {
        text: 'label1',
        id:'asf1',
      type:'label',
      children: {
              text: 'label2',
              id:'asf3',
              type:'label'
            }
    }


  // context: any = {
  //   text: 'test',
  //   id:'asf1',
  //   type:'div',
  //   children: {
  //     text: 'test',
  //     id:'asf2',
  //     type:'div',
  //     children: {
  //       text: 'test',
  //       id:'asf3',
  //       type:'label'
  //     }
  //   }
  // }

}
