import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule,
    MatSortModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSnackBarModule
  ], exports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule,
    MatSortModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
