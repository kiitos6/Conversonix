import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouteTabs } from './shared/models/RouteTabs';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  routeLinks: RouteTabs[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.routeLinks = [
      {
        label: 'Conversor',
        link: './calc',
        index: 0
      }, {
        label: 'Currency List',
        link: './list',
        index: 1
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
