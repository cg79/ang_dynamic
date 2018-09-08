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

    // context: any = {
    //     id:'asf1',
    //   type:'container',
    //   childrens: [{
    //           text: 'ccccccccccccc',
    //           id:'a',
    //           type:'radioLblLeftList',
    //           items:[{a:1, text:"ion", checked:true},{a:2, text:"Maria"}],
    //           name:'hhhhhhhhhhhh',
    //           bindText:"text",
    //           bindValue:"a",
    //           value:"1",
    //           onchangeEvent:'bbb',
    //           subscribeEvents:['aaa']
    //     },
    //     {
    //       text: 'ccccccccccccc',
    //       id:'b',
    //       type:'text',
    //       items:[{a:1, text:"ion", checked:true},{a:2, text:"Maria"}],
    //       name:'hhhhhhhhhhhh',
    //       bindText:"text",
    //       bindValue:"a",
    //       value:"1",
    //       onchangeEvent:'aaa',
    //       subscribeEvents:['bbb'],
    //       validation:{
    //         required: "introdu ceva"
    //       }
    //
    //     }
    //     ],
    //
    //     children: {
    //       title: 'label2',
    //       id:'asf3',
    //       type:'text',
    //     }
    // };


  context: any = {
    id:'asf1',
    type:'div',
    children: {
      text: 'ccccccccccccc',
      id:'asf3',
      type:'chkLblLeftList',
      items:[{a:1, text:"ion", checked:true},{a:2, text:"Maria"}],
      name:'hhhhhhhhhhhh',
      bindText:"text",
      bindValue:"a",
      checked:"checked",
  
      children: {
        title: 'label2',
        id:'asf3',
        type:'text',
      }
    }
  };


}
