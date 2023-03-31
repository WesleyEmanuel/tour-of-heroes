import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MessagesComponent } from '../messages/messages.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

const COMPONENTS = [MessagesComponent, ToolbarComponent];
const MODULES = [MaterialModule, FlexLayoutModule];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, MODULES],
  exports: [COMPONENTS, MaterialModule, MODULES],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been load. Import this module in the AppModule.'
      );
    }
  }
}
