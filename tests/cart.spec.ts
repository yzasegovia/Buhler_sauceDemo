import { Page, expect } from "@playwright/test";

export class Product {

    static readonly SLFleeceJacket = new Product('sauce-labs-fleece-jacket', "Sauce Labs Fleece Jacket",29.99);
    static readonly SLBackPack = new Product('sauce-labs-backpack', "Sauce Labs Backpack", 29.99);
    static readonly SLBikeLight = new Product('sauce-labs-bike-light', "Sauce Labs Bike Light", 9.99);
    static readonly SLBoltShirt = new Product('sauce-labs-bolt-t-shirt', "Sauce Labs Bolt T-Shirt", 15.99);
    static readonly SLOnsie = new Product('sauce-labs-onesie', "Sauce Labs Onesie", 7.99);
    static readonly TestRed = new Product('test\\.allthethings\\(\\)-t-shirt-\\(red\\)', "Test.allTheThings() T-Shirt (Red)", 15.99);

    static readonly fieldId = 'data-test';
    static readonly addprefix = 'add-to-cart-';
    static readonly removeprefix = 'remove-';

    private constructor(
        private readonly _locatorId: string, 
        private readonly _title: string,
        private readonly _price: number){};
        
    toString(){return this._locatorId};

    get locationId(){return this._locatorId};
    get itemprice(){return this._price};
    get addLocationId(){ return '[' + Product.fieldId + '="' + Product.addprefix + this._locatorId +'"]'};
    get removeLocationId(){return '[' + Product.fieldId + '="' + Product.removeprefix + this._locatorId +'"]'};
   

}

export class Cart {
    constructor (readonly page:Page){
    }

    async add(product:Product){
        await this.page.locator(product.addLocationId).click();
    }

    async removed(product:Product){
        await this.page.locator(product.removeLocationId).click();
    }
}

export function cart(page:Page){
    return new Cart(page);
}