import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentRoutingModule} from './component-routing.module';
import {NewsModule} from './news/news.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { SocialMediaListComponent } from './footer/social-media-list/social-media-list.component';
import { LinkedListComponent } from './footer/linked-list/linked-list.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import {NavigationService} from './header/navigation/navigation.service';
import {MatchModule} from './match/match.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentRoutingModule,
  ],
  declarations: [HeaderComponent, FooterComponent, NavigationComponent, SocialMediaListComponent,
    SocialMediaComponent, LinkedListComponent],
  exports: [HeaderComponent, FooterComponent],
  providers: [NavigationService]
})
export class ComponentModule { }
