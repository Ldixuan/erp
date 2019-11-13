webpackJsonp([1],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/test/test.module": [
		275,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 150;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\home\home.html"*/`<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Ionic Menu Starter</h3>\n\n  <p>\n    If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will show you the way.\n  </p>\n\n  <button ion-button secondary menuToggle>Toggle Menu</button>\n</ion-content>\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\list\list.html"*/`<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalsOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_model_product_model__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SalsOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SalsOrderPage = (function () {
    function SalsOrderPage(formBuilder, modalCtrl) {
        this.formBuilder = formBuilder;
        this.modalCtrl = modalCtrl;
        this.gridShow = false;
        this.productNotFound = false;
        this.initializeDept();
        this.orderForm = this.formBuilder.group({
            title: [''],
            date: [''],
            telSender: [''],
            faxSender: [''],
            sender: [''],
            receiver: [''],
            faxReceiver: [''],
            telReceiver: [''],
            descript: [''],
            dept: ['']
        });
        this.listProduct = new Array();
    }
    SalsOrderPage.prototype.initializeDept = function () {
        this.depts = [
            { name: "foo" },
            { name: "bar" }
        ];
    };
    SalsOrderPage.prototype.logForm = function () {
        console.log(this.orderForm.value);
    };
    SalsOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalsOrderPage');
    };
    SalsOrderPage.prototype.presentModal = function (infoProduct, index) {
        var _this = this;
        var modal;
        console.log(infoProduct);
        if (infoProduct == undefined) {
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__product_model_product_model__["a" /* ProductModelPage */]);
        }
        else {
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__product_model_product_model__["a" /* ProductModelPage */], { infoProduct: infoProduct });
        }
        modal.onDidDismiss(function (data) {
            if (index != undefined) {
                _this.listProduct[index] = data;
                return;
            }
            else if (data != undefined) {
                _this.listProduct.push(data);
            }
        });
        modal.present();
    };
    SalsOrderPage.prototype.getDept = function (ev) {
        // Reset items back to all of the items
        this.initializeDept();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.depts = this.depts.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            if (this.depts.length > 0) {
                this.gridShow = true;
            }
            else {
                this.gridShow = false;
            }
        }
        console.log(this.gridShow);
    };
    SalsOrderPage.prototype.selectDept = function (item) {
        var deptTmp = this.orderForm.value;
        deptTmp["dept"] = item.name;
        this.orderForm.setValue(deptTmp);
        this.gridShow = false;
        this.productNotFound = false;
    };
    SalsOrderPage.prototype.endInputDept = function (ev) {
        var val = ev.target.value;
        if (val == "") {
            this.gridShow = false;
        }
        for (var index = 0; index < this.depts.length; index++) {
            if (val == this.depts[index].name) {
                var deptTmp = this.orderForm.value;
                deptTmp["nameProduct"] = this.depts[index].name;
                this.orderForm.setValue(deptTmp);
                this.gridShow = false;
                return;
            }
        }
        this.productNotFound = true;
    };
    SalsOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sals-order',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\sals-order\sals-order.html"*/`<!--\n\n  Generated template for the SalsOrderPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>销售订单</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-item-group inset="true" [formGroup]="orderForm" >\n\n\n\n      <ion-item >\n\n        <ion-label color="primary" floating>订单编号</ion-label>\n\n        <ion-input type="text" formControlName="title"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary">订单日期</ion-label>\n\n        <ion-datetime displayFormat="YYYY年 MM月 DD日" pickerFormat="YYYY MM DD" formControlName="date" autocorrect="on"></ion-datetime>\n\n      </ion-item>\n\n\n\n      <br>\n\n      <ion-item>\n\n        <ion-label color="primary" floating>收取人</ion-label>\n\n        <ion-input type="text" formControlName="sender" autocorrect="on"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>传真</ion-label>\n\n        <ion-input type="tel" formControlName="faxSender" autocorrect="on"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>电话</ion-label>\n\n        <ion-input type="tel" formControlName="telSender" autocorrect="on"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>单位</ion-label>\n\n        <ion-input type="text" formControlName="dept"  (input)="getDept($event)" (change)="endInputDept($event)"></ion-input>\n\n      </ion-item>\n\n      <ion-grid id="deptSearchList" *ngIf="gridShow">\n\n          <ion-row *ngFor="let dept of depts" (click)="selectDept(dept)">\n\n            <ion-col class="grid">{{dept.name}}</ion-col>\n\n          </ion-row>\n\n      </ion-grid>\n\n        <p *ngIf="productNotFound">未找到对应货物</p>\n\n\n\n      <br>\n\n      <ion-item>\n\n        <ion-label color="primary" floating>发送人</ion-label>\n\n        <ion-input type="text" formControlName="receiver" autocorrect="on"></ion-input>\n\n      </ion-item>  \n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>传真</ion-label>\n\n        <ion-input type="tel" formControlName="faxReceiver" autocorrect="on"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>电话</ion-label>\n\n        <ion-input type="tel" formControlName="telReceiver" autocorrect="on"></ion-input>\n\n      </ion-item>\n\n      <br>\n\n\n\n      <ion-item>\n\n          <ion-label color="primary" floating>备注</ion-label>\n\n          <ion-textarea formControlName="descript"></ion-textarea>\n\n      </ion-item>\n\n\n\n      <ion-item></ion-item>\n\n  </ion-item-group>\n\n\n\n  <a ion-item (click)="presentModal()">\n\n      添加货物\n\n  </a>\n\n\n\n  <ion-list id="listProduct" >\n\n    <ion-card *ngFor="let product of listProduct" (click) = "presentModal(product, listProduct.indexOf(product))"> \n\n      <ion-card-header>\n\n        {{product.nameProduct}}\n\n      </ion-card-header>\n\n      <ion-card-content>\n\n        <ion-grid>\n\n          <ion-row inline>\n\n            <ion-col>数量 : {{product.numberProduct}} {{product.unitProduct}}</ion-col>\n\n            <ion-col>单价 : {{product.priceProduct}}</ion-col>\n\n            <ion-col>金额 : {{product.amount}} 元</ion-col>\n\n          </ion-row>\n\n          <ion-row>\n\n            <ion-col>交货日期 : {{product.datePayProduct}} </ion-col>\n\n          </ion-row>\n\n          <ion-row>\n\n            <ion-col>备注 : {{product.descriptProduct}} </ion-col>\n\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card-content>\n\n    </ion-card>\n\n  </ion-list>\n\n  \n\n  <button ion-button [disabled]="!orderForm.valid" (click) = "logForm()" block>保存</button>\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\sals-order\sals-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]])
    ], SalsOrderPage);
    return SalsOrderPage;
}());

//# sourceMappingURL=sals-order.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductModelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ProductModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProductModelPage = (function () {
    function ProductModelPage(viewCtrl, formBuilder, navParams) {
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.searchQuery = '';
        this.gridShow = false;
        this.productNotFound = false;
        this.initializeProduct();
        this.productForm = this.formBuilder.group({
            nameProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            adresseProduct: [''],
            nameOffical: [''],
            numberProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            unitProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            priceProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            typePriceProduct: [''],
            amount: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            datePayProduct: [''],
            hadPaidProduct: [''],
            descriptProduct: ['']
        });
        var infoProduct = this.navParams.get('infoProduct');
        if (infoProduct != undefined) {
            this.productForm.setValue(infoProduct);
        }
    }
    ProductModelPage.prototype.exit = function () {
        this.viewCtrl.dismiss();
    };
    ProductModelPage.prototype.logProductForm = function () {
        this.viewCtrl.dismiss(this.productForm.value);
    };
    ProductModelPage.prototype.initializeProduct = function () {
        this.products = [
            { id: 1, name: "foo", unit: "码", typePrice: "米价" },
            { id: 2, name: "bar", unit: "码", typePrice: "米价" }
        ];
    };
    ProductModelPage.prototype.getProduct = function (ev) {
        // Reset items back to all of the items
        this.initializeProduct();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.products = this.products.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            if (this.products.length > 0) {
                this.gridShow = true;
            }
            else {
                this.gridShow = false;
            }
        }
    };
    ProductModelPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductModelPage');
    };
    ProductModelPage.prototype.selectProduct = function (item) {
        var productTmp = this.productForm.value;
        productTmp["nameProduct"] = item.name;
        productTmp["unitProduct"] = item.unit;
        productTmp["typePriceProduct"] = item.typePrice;
        this.productForm.setValue(productTmp);
        this.gridShow = false;
        this.productNotFound = false;
    };
    ProductModelPage.prototype.endInputProduct = function (ev) {
        var val = ev.target.value;
        if (val == "") {
            this.gridShow = false;
        }
        for (var index = 0; index < this.products.length; index++) {
            if (val == this.products[index].name) {
                var productTmp = this.productForm.value;
                productTmp["nameProduct"] = this.products[index].name;
                productTmp["unitProduct"] = this.products[index].unit;
                productTmp["typePriceProduct"] = this.products[index].typePrice;
                this.productForm.setValue(productTmp);
                this.gridShow = false;
                return;
            }
        }
        this.productNotFound = true;
    };
    ProductModelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product-model',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\product-model\product-model.html"*/`<!--\n\n  Generated template for the ProductModelPage page.\n\n\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n      <ion-buttons>\n\n      <button ion-button (click)="exit()" icon-start>\n\n        <ion-icon name=\'arrow-back\'></ion-icon> 返回\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title text-center>添加货物</ion-title>\n\n    <ion-buttons end> <button ion-button (click)="logProductForm()" \n\n      [disabled]="!productForm.valid" color="black">保存</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content >\n\n    <ion-item-group [formGroup]="productForm" inset=\'true\'>\n\n      <ion-item>\n\n        <ion-label color="primary" floating>货物名称</ion-label>\n\n        <ion-input type="text" (input)="getProduct($event)" (change)="endInputProduct($event)"\n\n         formControlName="nameProduct"></ion-input>\n\n      </ion-item>\n\n      <ion-grid id="productSearchList" *ngIf="gridShow">\n\n        <ion-row *ngFor="let product of products" (click)="selectProduct(product)">\n\n          <ion-col class="grid">{{product.name}}</ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n      <p *ngIf="productNotFound">未找到对应货物</p>\n\n\n\n    \n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>产地</ion-label>\n\n        <ion-input type="text" formControlName="adresseProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>官方品名</ion-label>\n\n        <ion-input type="text" formControlName="nameOffical"></ion-input>\n\n      </ion-item>\n\n\n\n      <br>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>数量</ion-label>\n\n        <ion-input type="number" formControlName="numberProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>单位</ion-label>\n\n        <ion-input type="text" formControlName="unitProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>单价</ion-label>\n\n        <ion-input type="number" formControlName="priceProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>价类</ion-label>\n\n        <ion-select formControlName="typePriceProduct">\n\n          <ion-option value="米价">米价</ion-option>\n\n          <ion-option value="单位价">单位价</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <br>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>金额</ion-label>\n\n        <ion-input type="number" formControlName="amount"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" >交货日期</ion-label>\n\n        <ion-datetime displayFormat="YYYY年 MM月 DD日" pickerFormat="YYYY MM DD" formControlName="datePayProduct"\n\n          autocorrect="on"></ion-datetime>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>已付数量</ion-label>\n\n        <ion-input type="text" formControlName="hadPaidProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <br>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>备注</ion-label>\n\n        <ion-textarea formControlName="descriptProduct"></ion-textarea>\n\n      </ion-item>\n\n      <ion-item></ion-item>\n\n    </ion-item-group>\n\n\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\product-model\product-model.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ProductModelPage);
    return ProductModelPage;
}());

//# sourceMappingURL=product-model.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TestPage = (function () {
    function TestPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TestPage');
    };
    TestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\test\test.html"*/`<!--\n  Generated template for the TestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Test</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<h3>hello</h3>\n<p>hello world</p>\n</ion-content>\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\test\test.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], TestPage);
    return TestPage;
}());

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(223);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_test_test__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_sals_order_sals_order__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_product_model_product_model__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_sals_order_sals_order__["a" /* SalsOrderPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_product_model_product_model__["a" /* ProductModelPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/test/test.module#TestPageModule', name: 'TestPage', segment: 'test', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_sals_order_sals_order__["a" /* SalsOrderPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_product_model_product_model__["a" /* ProductModelPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_sals_order_sals_order__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.listShow = {};
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: '销售管理', componentPages: [
                    { pageTitle: '销售订单', component: __WEBPACK_IMPORTED_MODULE_6__pages_sals_order_sals_order__["a" /* SalsOrderPage */] }
                ] },
            { title: 'Home', componentPages: [
                    { pageTitle: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] }
                ] },
            { title: 'List', componentPages: [
                    { pageTitle: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] }
                ] }
        ];
        for (var index = 0; index < this.pages.length; index++) {
            this.listShow[this.pages[index].title] = false;
        }
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\app\app.html"*/`<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <ion-item-group *ngFor="let p of pages">\n        <ion-item (click)="listShow[p.title]=!listShow[p.title]">\n          {{p.title}}\n          <ion-icon name="ios-arrow-down" item-right  *ngIf="listShow[p.title]"></ion-icon>\n          <ion-icon name="ios-arrow-forward" item-right *ngIf="!listShow[p.title]"></ion-icon>\n        </ion-item>\n        <ion-list *ngIf="listShow[p.title]">\n            <button menuClose ion-item *ngFor="let i of p.componentPages" (click)="openPage(i)" small>\n                {{i.pageTitle}}\n            </button>\n        </ion-list>\n    </ion-item-group>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`/*ion-inline-end:"C:\Users\36394\projet\erp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map