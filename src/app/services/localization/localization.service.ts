import { Injectable } from '@angular/core';
import {PubSubService} from "../pubSub/pubsub";
import language from '../../facade/language';

@Injectable()
export class LocalizationService {
  public language = language.EN;

  constructor( private pubSubService: PubSubService) {
    pubSubService.subscribe('change-language', (val)=>{
      this.language = language[val];
    });
  }

}
