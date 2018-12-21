import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouteTabs } from './shared/models/RouteTabs';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ConversorCalcComponent } from './conversor-calc/conversor-calc.component';
import { ConversorListComponent } from './conversor-list/conversor-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConversorListComponent],
})
export class AppComponent implements OnInit {

  routeLinks: RouteTabs[];
  activeLinkIndex = -1;
  @ContentChild(ConversorListComponent)
  private conversorList: ConversorListComponent;

  @ContentChild(ConversorCalcComponent)
  private conversorCalc: ConversorCalcComponent;

  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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
  this.addIcons(iconRegistry, sanitizer);
  }




  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  changeBase(): void {
    this.conversorList.changeBase();
  }

  addIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
    iconRegistry.addSvgIcon(
      'more_vert',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/more_vert.svg'));
    iconRegistry.addSvgIcon(
      'euro_symbol',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/euro_symbol.svg'));
    iconRegistry.addSvgIcon(
      'search',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/search.svg'));
    iconRegistry.addSvgIcon(
      'favorite',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/favorite.svg'));
  }
}
