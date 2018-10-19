import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {HttpWrapperService} from "../../../services/http/httpService";
import {LocalizationService} from "../../../services/localization/localization.service";


@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private  httpService: HttpWrapperService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public localizationService: LocalizationService) { }

  code:string;
  uiMessage:string;

  async confirm()
  {
    const req: any = {
      proxy: {
        module: 'security',
        method: 'confirm',
      },
      data: {
        code: this.code
      }
    };
    const respData = await this.httpService.postJson("api/pub", req);
    if(!respData.success){
      this.uiMessage = this.localizationService.language[respData.message];
      return;
    }
    const data = respData.data;
    this.uiMessage = this.localizationService.language[data.message];
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.code = params['id'];
    });
   this.confirm();

  }

}
