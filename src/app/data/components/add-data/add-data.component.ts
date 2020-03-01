import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormGroupDirective
} from "@angular/forms";
import { ProductInformation } from "src/app/config/interfaces/product.interface";
import { errorMessages } from "../../../config/validators/errormessages.constants";
import {
  ErrorStateMatcherForsignUppage,
  UtilityService
} from "src/app/core/utility-service/utility.service";
import { DataService } from "../../service/data.service";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-data",
  templateUrl: "./add-data.component.html",
  styleUrls: ["./add-data.component.scss"]
})
export class AddDataComponent implements OnInit {
  addProductForm: FormGroup;
  errormessages = errorMessages;
  matcher;
  productId: any;
  selectedProduct: ProductInformation;
  allProducts = [];
  productInfo: ProductInformation = {
    id: null,
    productname: "",
    productprice: null,
    productquantity: null
  };
  displayedColumns: string[] = [
    "productname",
    "productquantity",
    "productprice",
    "edit"
  ];
  dataSource = new MatTableDataSource([]);

  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.makingAddProductForm();
    this.setCustomValidation();
    this.listenForEdit();
    // this.getStorageData();
    // this.dataSource = new MatTableDataSource(this.allProducts);
  }
  getProductby(productId) {
    this.selectedProduct = this.dataService.getItemById(productId);
    this.patchData(this.selectedProduct);
  }

  listenForEdit() {
    this.dataService.itemId.subscribe(res => {
      if (res) {
        this.productId = res;
        this.getProductby(res);
      }
    });
  }

  patchData(selectedProduct: ProductInformation) {
    this.addProductForm.patchValue({
      productname: selectedProduct.productname,
      productquantity: selectedProduct.productquantity,
      productprice: selectedProduct.productprice
    });
  }

  resetForm() {
    this.addProductForm.reset();
    Object.keys(this.addProductForm.controls).forEach(key => {
      this.addProductForm.get(key).setErrors(null);
    });
    this.productId = null;
  }
  setCustomValidation() {
    this.addProductForm.updateValueAndValidity();
  }
  makingAddProductForm() {
    this.addProductForm = this.fb.group({
      productname: ["", [Validators.required]],
      productprice: ["", [Validators.required]],
      productquantity: ["", [Validators.required]]
    });
  }
  onSubmit() {
    if (this.addProductForm.valid) {
      this.productInfo = {
        id: this.productId,
        productname: this.addProductForm.value.productname,
        productquantity: this.addProductForm.value.productquantity,
        productprice: this.addProductForm.value.productprice
      };
      this.dataService.upsertItem(this.productInfo);
      this.dataService.emitDataAdded();
      this.resetForm();
    } else {
      this.touchAllfields(this.addProductForm);
    }
  }
  touchAllfields(group: FormGroup) {
    this.util.touchAllFieldsOfForm(group);
  }
}
