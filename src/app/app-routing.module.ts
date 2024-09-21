import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TranslateComponent } from './translate/translate.component';
import { TestYourselfComponent } from './test-yourself/test-yourself.component';
import { AddWordComponent } from './add-word/add-word.component';
import { DictionaryComponent } from './dictionary/dictionary.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'translate', component: TranslateComponent },
  { path: 'test', component: TestYourselfComponent },
  { path: 'add-word', component: AddWordComponent },
  { path:'dictionary', component: DictionaryComponent},
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
