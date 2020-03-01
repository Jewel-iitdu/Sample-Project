import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddDataComponent } from "./components/add-data/add-data.component";
import { ShowDataComponent } from "./components/show-data/show-data.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "add-data"
  },

  {
    path: "add-data",
    component: AddDataComponent
  },
  // {
  //   path: "show-data",
  //   component: ShowDataComponent
  // },
  // {
  //   path: "add-data/:id",
  //   component: AddDataComponent,
  // }
];

@NgModule({
  declarations: [AddDataComponent, ShowDataComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class DataModule {}
