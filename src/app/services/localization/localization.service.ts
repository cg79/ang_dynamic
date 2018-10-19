import { Injectable } from '@angular/core';
import {PubSubService} from "../../../../../../../../07_angular2/cli/fullsd/src/app/services/pubsub/pubsub";
import language from '../../../../../../../../07_angular2/cli/fullsd/src/app/facade/language';

@Injectable()
export class LocalizationService {
  public language = language.EN;

  constructor( private pubSubService: PubSubService) {
    pubSubService.subscribe('change-language', (val)=>{
      this.language = language[val];
    });
  }

}
