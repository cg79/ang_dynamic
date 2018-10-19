import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-customPageRenderer',
  templateUrl: 'customPageRenderer.component.html',
  styleUrls: ['customPageRenderer.component.scss']
})
export class CustomPageRendererComponent implements OnInit {
  @Input() jsonData: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    this.route.data.subscribe((data) => {
      this.jsonData = data;
    });
  }

}