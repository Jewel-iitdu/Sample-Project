import { ProductInformation } from "src/app/config/interfaces/product.interface";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  storageData: ProductInformation[] = [];
  selectedItem: ProductInformation;

  dataAdded = new BehaviorSubject(false);
  itemId = new BehaviorSubject(null);

  constructor() {}

  addOrUpdateItem(item: ProductInformation) {
    if (item.id == null) {
      this.getItems();
      const newData: ProductInformation = {
        id: Date.now(),
        productname: item.productname,
        productquantity: item.productquantity,
        productprice: item.productprice
      };

      this.storageData = [newData, ...this.storageData];

      this.setDataInLocalStorage();
    } else {
      this.setDataInLocalStorage();
    }
  }

  upsertItem(item: ProductInformation): void {
    this.setItemFromLocalStorage();
    if (item.id == null) {
      const newData: ProductInformation = {
        id: Date.now(),
        productname: item.productname,
        productquantity: item.productquantity,
        productprice: item.productprice
      };
      this.storageData = [newData, ...this.storageData];
    } else {
      const updateItem = this.storageData.find(x => x.id == item.id);
      const index = this.storageData.indexOf(updateItem);
      this.storageData[index] = item;
    }
    this.setDataInLocalStorage();
  }

  getItems(): ProductInformation[] | null {
    this.setItemFromLocalStorage();
    return this.storageData;
  }

  getItemById(id): ProductInformation | null {
    this.setItemFromLocalStorage();
    this.selectedItem = this.storageData.find(x => x.id == id);
    return this.selectedItem;
  }

  setDataInLocalStorage(): void {
    localStorage.setItem("data", JSON.stringify(this.storageData));
  }

  getDataFromLocalStorage(): ProductInformation[] {
    return JSON.parse(localStorage.getItem("data"));
  }

  checkLocalStorage(): boolean {
    return localStorage.getItem("data") != null ? true : false;
  }

  setItemFromLocalStorage(): void {
    if (this.checkLocalStorage() === false) {
      this.storageData = [];
    } else {
      this.storageData = this.getDataFromLocalStorage();
    }
  }

  deleteItem(key) {
    this.setItemFromLocalStorage();
    const updateItem = this.storageData.find(x => x.id == key);
    const index = this.storageData.indexOf(updateItem);
    if (index > -1) {
      this.storageData.splice(index, 1);
    }
    this.setDataInLocalStorage();
  }

  emitDataAdded() {
    this.dataAdded.next(true);
  }

  emitId(id) {
    this.itemId.next(id);
  }
}
