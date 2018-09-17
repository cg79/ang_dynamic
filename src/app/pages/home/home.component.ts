import { Component, OnInit, Injectable, ViewChild  } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, query, stagger
} from '@angular/animations';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(meta: Meta, title: Title)
  {
    // Sets the <meta> tag for the page
    meta.addTags([
      { name: 'author', content: 'App' },
      { name: 'description', content: 'This is a description.' },
    ]);
  }

  ngOnInit() {
  }

}
