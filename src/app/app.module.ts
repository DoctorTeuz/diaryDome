import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './diaryDome/homepage/homepage.component';
import { WorkerCompleteListComponent } from './WWEATeuz_History/worker-complete-list/worker-complete-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { WorkerInformationComponent } from './WWEATeuz_History/worker-complete-list/worker-information/worker-information.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AlboComponent } from './WWEATeuz_History/albo/albo.component';
import { AccordionAlboComponent } from './WWEATeuz_History/albo/accordion-albo/accordion-albo.component';
import { LoginComponent } from './shared/login/login.component';
import { FormsModule } from '@angular/forms';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { GeneralFunctionService } from './services/general-function.service';
import { LoadingWheelComponent } from './shared/loading-wheel/loading-wheel.component';
import { ShowListComponent } from './diaryDome/show-list/show-list.component';
import { ShowRowComponent } from './diaryDome/show-list/show-row/show-row.component';
import { CreateShowPopupComponent } from './diaryDome/create-show-popup/create-show-popup.component';
import { GenericAlertPopupComponent } from './shared/generic-alert-popup/generic-alert-popup.component';
import { ShowComponent } from './diaryDome/show/show.component';
import { PopupTopBarComponent } from './shared/popup-top-bar/popup-top-bar.component';
import { CreateSegmentPopupComponent } from './diaryDome/create-segment-popup/create-segment-popup.component';
import { WorkerListImagesComponent } from './diaryDome/create-segment-popup/worker-list-images/worker-list-images.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FormatListComponent } from './diaryDome/format-list/format-list.component';
import { FormatRowComponent } from './diaryDome/format-list/format-row/format-row.component';

const MatModules = [
  BrowserModule,
  BrowserAnimationsModule,
  MatCheckboxModule,
  MatButtonModule,
  MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  FormsModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    WorkerCompleteListComponent,
    AlboComponent,
    WorkerInformationComponent,
    MenuComponent,
    AccordionAlboComponent,
    LoginComponent,
    TopBarComponent,
    LoadingWheelComponent,
    ShowListComponent,
    ShowRowComponent,
    CreateShowPopupComponent,
    GenericAlertPopupComponent,
    ShowComponent,
    PopupTopBarComponent,
    CreateSegmentPopupComponent,
    WorkerListImagesComponent,
    FormatListComponent,
    FormatRowComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    RichTextEditorModule,
    ...MatModules,
  ],
  entryComponents: [
    WorkerInformationComponent,
    CreateShowPopupComponent,
    GenericAlertPopupComponent,
    CreateSegmentPopupComponent,
    WorkerListImagesComponent,
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpInterceptorService, 
      multi: true 
    }

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
