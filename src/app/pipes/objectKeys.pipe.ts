
import {Pipe, PipeTransform} from '@angular/core';

  @Pipe({name: 'keysToArray'})

  export class ObjectKeysPipe implements PipeTransform {
    transform(map: { [key: string]: any }, ...parameters: any[]) {
    if (!map)
      return undefined;
    const keys = Object.keys(map)
      .map((key) => ({ 'key': key, 'value': map[key] }));
      return keys;
    }
  }
