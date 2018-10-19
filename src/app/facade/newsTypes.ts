// import { Injectable } from '@angular/core';
//
// @Injectable()

export default new class NewsType {
  readonly Items: Array<any> = [
    {id:1, name: 'news'},
    {id:2, name: 'exercise'},
    {id:3, name: 'course'},
    {id:4, name: 'about'},
  ];

  newsType = {
    news:1,
    exercise:2,
    course:3,
    about:4
  };
}

