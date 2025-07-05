import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDataPipe } from './pipes/format-data.pipe';



@NgModule({
  declarations: [
    FormatDataPipe
  ],
  exports: [
    FormatDataPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
