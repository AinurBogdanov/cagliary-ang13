import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDataPipe } from './pipes/format-data.pipe';
import { TransformSloenyPipe } from './pipes/transform-sloeny.pipe';

@NgModule({
  declarations: [FormatDataPipe, TransformSloenyPipe],
  exports: [FormatDataPipe, TransformSloenyPipe],
  imports: [CommonModule],
})
export class CoreModule {}
