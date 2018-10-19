import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {PubSubService} from "../../services/pubSub/pubsub";
import {SocketService} from "../../services/socket/socketService";


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit{

  public user: any;
  userCount : number = 0;
  canEditNews:boolean =false;
  canRegisterCourse: boolean = true;


  constructor (
               private pubSubService: PubSubService,
               private router: Router,
               private socketService:SocketService
  )
  {
    this.pubSubService.subscribe("login", (userData)=>{
      this.user  = userData;
    });

    this.router.events.subscribe( (event) => {

      if (event && event instanceof NavigationEnd) {
        // Hide loading indicator

        setTimeout(() => {
          this.isCollapsed = true;
        }, 1);

      }
    });

    this.pubSubService.subscribe("logout", (userData)=>{
      this.user  = null;

    });

  }

  msgReceive(msg){

    this.userCount = msg.usersCount;
  }

  ngOnInit(): void {
    this.socketService.connect();

    const evt : ISocketEvent = {
      evtName: "welcome",
      executeFunction: this.msgReceive.bind(this)
    };


    this.socketService.subscribe(evt);


    this.pubSubService.subscribe('login', (val)=>{
      this.user = val;

    });
  }

  onLanguageChanged(val){
    this.pubSubService.publish('change-language', val);
  }




  title:"asfasf";
  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }


  logout()
  {
    this.pubSubService.publish("logout",null);

  }


}
