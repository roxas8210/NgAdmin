import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company/company.component';
import { CompanyItemComponent } from './company-item/company-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CompanyComponent, CompanyItemComponent],
  exports: [CompanyComponent, CompanyItemComponent]
})
export class CompanyModule { }
