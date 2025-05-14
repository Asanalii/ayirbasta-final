import { makeAutoObservable } from "mobx";

export default class ProductsStore {
  constructor() {
    this._product = [];
    this._type = [];
    makeAutoObservable(this);
  }
  setproduct(product) {
    this._product = product;
  }

  get product() {
    return this._product;
  }
  settype(product) {
    this._type = product;
  }

  get type() {
    return this._type;
  }
}
