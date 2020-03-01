import { ProductInformation } from "src/app/config/interfaces/product.interface";
import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { DataService } from "../../service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-show-data",
  templateUrl: "./show-data.component.html",
  styleUrls: ["./show-data.component.scss"]
})
export class ShowDataComponent implements OnInit {
  storageData: ProductInformation[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.setData();
    this.checkData();
  }

  setData() {
    this.storageData = this.dataService.getItems();
  }

  checkData() {
    this.dataService.dataAdded.subscribe(res => {
      if (res) {
        this.setData();
      }
    });
  }

  editData(id) {
    this.dataService.emitId(id);
  }
  deleteData(id) {
    this.dataService.deleteItem(id);
    this.dataService.emitDataAdded();
  }
}
