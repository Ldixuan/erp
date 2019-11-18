webpackJsonp([2],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalsOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_model_product_model__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__ = __webpack_require__(71);
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
    function SalsOrderPage(formBuilder, viewCtrl, alerCtrl, modalCtrl, rest, navParams) {
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.alerCtrl = alerCtrl;
        this.modalCtrl = modalCtrl;
        this.rest = rest;
        this.navParams = navParams;
        this.gridShow = false;
        this.productNotFound = false;
        this.readModel = false;
        this.orderForm = this.formBuilder.group({
            title: [''],
            date: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            telSender: [''],
            faxSender: [''],
            sender: [''],
            receiver: [''],
            faxReceiver: [''],
            telReceiver: [''],
            descript: [''],
            dept: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            products: [''],
            userId: ['Admi'],
            deptId: [''],
            status: [''],
            messageForAuditor: ['']
        });
        this.depts = [];
        this.listProduct = new Array();
        var title = this.navParams.get('title');
        if (title != undefined) {
            this.initOrderInfo(title);
            this.readModel = true;
        }
    }
    SalsOrderPage.prototype.initDepts = function () {
        var _this = this;
        this.rest.GetDeptByName("广州", -1) // 填写url的参数
            .subscribe(function (f) {
            console.log(f);
            _this.depts = f;
        }, function (error) {
            _this.depts = [{ id: "-1", name: "请求错误" }];
        });
    };
    SalsOrderPage.prototype.initOrderInfo = function (title) {
        var _this = this;
        this.rest.GetSalesOrderByOrderId(title)
            .subscribe(function (f) {
            var orderDetail = f.salesOrderDetail;
            var temp = _this.orderForm.value;
            temp.title = orderDetail.commandeId;
            temp.date = orderDetail.commandeCreateDate;
            temp.telSender = orderDetail.senderTelephoneNumber;
            temp.faxReceiver = orderDetail.senderFax;
            temp.sender = orderDetail.sender;
            temp.receiver = orderDetail.receiver;
            temp.faxReceiver = orderDetail.receiverFax;
            temp.telReceiver = orderDetail.receiverTelephoneNumber;
            temp.descript = orderDetail.Remark1 + orderDetail.Remark2 + orderDetail.Remark3
                + orderDetail.Remark4 + orderDetail.Remark5 + orderDetail.Remark6 + orderDetail.Remark7;
            temp.dept = orderDetail.departmentLabel;
            temp.userId = orderDetail.commandCreator;
            temp.deptId = orderDetail.departmentId;
            temp.status = orderDetail.status;
            temp.messageForAuditor = orderDetail.messageForAuditor;
            _this.orderForm.setValue(temp);
            _this.deptSelect = { id: orderDetail.departmentId, name: orderDetail.departmentLabel };
            var productsInfo = f.cargo;
            for (var index = 0; index < productsInfo.length; index++) {
                var productTemp = {
                    idProduct: "",
                    nameProduct: "",
                    adresseProduct: "",
                    nameOffical: "",
                    numberProduct: "",
                    unitProduct: "",
                    priceProduct: "",
                    typePriceProduct: "",
                    amount: "",
                    datePayProduct: "",
                    hadPaidProduct: "",
                    descriptProduct: ""
                };
                productTemp['idProduct'] = productsInfo[index].cargoId;
                productTemp['nameProduct'] = productsInfo[index].cargoName;
                productTemp['numberProduct'] = productsInfo[index].cargoQuantity;
                productTemp['unitProduct'] = productsInfo[index].cargoUnit;
                productTemp['priceProduct'] = productsInfo[index].cargoUnitPrice;
                productTemp['datePayProduct'] = productsInfo[index].scheduleCargoDate;
                productTemp['adresseProduct'] = "";
                productTemp['nameOffical'] = "";
                productTemp['typePriceProduct'] = "";
                productTemp['amount'] = "";
                productTemp['hadPaidProduct'] = "";
                productTemp['descriptProduct'] = "";
                _this.listProduct.push(productTemp);
            }
        }, function (error) {
            alert("请求失败");
        });
    };
    SalsOrderPage.prototype.removeOrder = function () {
        var _this = this;
        var confirm = this.alerCtrl.create({
            title: '提示',
            message: '确认删除此订单吗?',
            buttons: [
                {
                    text: '确认',
                    handler: function () {
                        _this.viewCtrl.dismiss({ action: 1, content: {} });
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    SalsOrderPage.prototype.logForm = function () {
        var dataTmp = this.orderForm.value;
        dataTmp.products = this.listProduct;
        this.orderForm.setValue(dataTmp);
        if (this.readModel) {
            this.viewCtrl.dismiss({ action: 2, content: this.orderForm.value });
        }
    };
    SalsOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalsOrderPage');
    };
    SalsOrderPage.prototype.presentModal = function (infoProduct, index) {
        var _this = this;
        var modal;
        if (infoProduct == undefined) {
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__product_model_product_model__["a" /* ProductModelPage */]);
        }
        else {
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__product_model_product_model__["a" /* ProductModelPage */], { infoProduct: infoProduct });
        }
        modal.onDidDismiss(function (data) {
            if (index != undefined) {
                if (data != undefined) {
                    if (data.action == 1) {
                        _this.listProduct[index] = data.content;
                    }
                    else if (data.action == 0) {
                        _this.listProduct.splice(index, 1);
                    }
                }
            }
            else if (data != undefined) {
                _this.listProduct.push(data.content);
            }
        });
        modal.present();
    };
    SalsOrderPage.prototype.changeDept = function () {
        var temp = this.orderForm.value;
        temp.deptId = this.deptSelect.id;
        temp.dept = this.deptSelect.name;
        this.orderForm.setValue(temp);
        console.log(temp);
    };
    SalsOrderPage.prototype.exit = function () {
        this.viewCtrl.dismiss();
    };
    SalsOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sals-order',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\sals-order\sals-order.html"*/`<!--\n\n  Generated template for the SalsOrderPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar *ngIf="!readModel">\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>销售订单</ion-title>\n\n    </ion-navbar>\n\n  \n\n    <ion-navbar *ngIf="readModel">\n\n      <ion-title text-center>销售订单</ion-title>\n\n      <ion-buttons>\n\n        <button ion-button (click)="exit()" icon-only>\n\n            <ion-icon name=\'arrow-back\' color = "primary"></ion-icon>\n\n            <ion-icon name="md-close" showWhen="android"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n        <ion-buttons end> <button ion-button (click)="removeOrder()" \n\n          color="primary">删除</button>\n\n        </ion-buttons>\n\n      </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-item-group inset="true" [formGroup]="orderForm" >\n\n\n\n      <ion-item >\n\n        <ion-label color="primary" floating>订单编号</ion-label>\n\n        <ion-input type="text" formControlName="title"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary">*订单日期</ion-label>\n\n        <ion-datetime displayFormat="YYYY年 MM月 DD日" pickerFormat="YYYY MM DD" formControlName="date" autocorrect="on"></ion-datetime>\n\n      </ion-item>\n\n\n\n      <br>\n\n      <ion-item>\n\n        <ion-label color="primary" floating>收取人</ion-label>\n\n        <ion-input type="text" formControlName="sender"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>传真</ion-label>\n\n        <ion-input type="tel" formControlName="faxSender"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>电话</ion-label>\n\n        <ion-input type="tel" formControlName="telSender"></ion-input>\n\n      </ion-item>\n\n\n\n\n\n      <ion-item>\n\n        <ion-label>*单位</ion-label>\n\n        <ionic-selectable\n\n          item-content \n\n          [(ngModel)]="deptSelect"\n\n          [ngModelOptions]="{standalone: true}"\n\n          [items]="depts"\n\n          itemTextField="name"\n\n          [canSearch]="true"\n\n          (click) = "initDepts()"\n\n          (onChange) = "changeDept()">\n\n        </ionic-selectable>\n\n      </ion-item>\n\n      <br>\n\n      <ion-item>\n\n        <ion-label color="primary" floating>发送人</ion-label>\n\n        <ion-input type="text" formControlName="receiver" autocorrect="on"></ion-input>\n\n      </ion-item>  \n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>传真</ion-label>\n\n        <ion-input type="tel" formControlName="faxReceiver" autocorrect="on"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>电话</ion-label>\n\n        <ion-input type="tel" formControlName="telReceiver" autocorrect="on"></ion-input>\n\n      </ion-item>\n\n      <br>\n\n\n\n      <ion-item>\n\n          <ion-label color="primary" floating>备注</ion-label>\n\n          <ion-textarea formControlName="descript"></ion-textarea>\n\n      </ion-item>\n\n\n\n      <ion-item></ion-item>\n\n  </ion-item-group>\n\n\n\n  <a ion-item (click)="presentModal()">\n\n      添加货物\n\n  </a>\n\n\n\n  <ion-list id="listProduct" >\n\n    <ion-card *ngFor="let product of listProduct" (click) = "presentModal(product, listProduct.indexOf(product))"> \n\n      <ion-card-header>\n\n        {{product.nameProduct}}\n\n      </ion-card-header>\n\n      <ion-card-content>\n\n        <ion-grid>\n\n          <ion-row inline>\n\n            <ion-col>数量 : {{product.numberProduct}} {{product.unitProduct}}</ion-col>\n\n            <ion-col>单价 : {{product.priceProduct}}</ion-col>\n\n            <ion-col>金额 : {{product.amount}} 元</ion-col>\n\n          </ion-row>\n\n          <ion-row>\n\n            <ion-col>交货日期 : {{product.datePayProduct}} </ion-col>\n\n          </ion-row>\n\n          <ion-row>\n\n            <ion-col>备注 : {{product.descriptProduct}} </ion-col>\n\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card-content>\n\n    </ion-card>\n\n  </ion-list>\n\n  \n\n  <button ion-button [disabled]="!orderForm.valid" (click) = "logForm()" block>保存</button>\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\sals-order\sals-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], SalsOrderPage);
    return SalsOrderPage;
}());

//# sourceMappingURL=sals-order.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReadSqlsOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sals_order_sals_order__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(71);
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
 * Generated class for the ReadSqlsOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReadSqlsOrderPage = (function () {
    function ReadSqlsOrderPage(navCtrl, navParams, modalCtrl, rest) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.rest = rest;
        this.loading = true;
        this.userId = "Admi";
        this.initSalsOrdersData();
    }
    ReadSqlsOrderPage.prototype.initSalsOrdersData = function () {
        var _this = this;
        this.rest.GetOrdersByUserId(this.userId)
            .subscribe(function (f) {
            _this.salsOrders = f;
            _this.loading = false;
        }, function (error) {
            alert("请求失败");
        });
    };
    ReadSqlsOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReadSqlsOrderPage');
    };
    ReadSqlsOrderPage.prototype.presentOrderPage = function (infoOrder, index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__sals_order_sals_order__["a" /* SalsOrderPage */], { title: infoOrder.commandeId });
        modal.onDidDismiss(function (data) {
            if (data != undefined) {
                if (data.action == 1) {
                    _this.salsOrders.splice(index, 1);
                }
                else if (data.action == 2) {
                    _this.salsOrders[index] = data.content;
                }
            }
        });
        modal.present();
    };
    ReadSqlsOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-read-sqls-order',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\read-sqls-order\read-sqls-order.html"*/`<!--\n  Generated template for the ReadSqlsOrderPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>查看订单</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n<ion-content padding>\n    <ion-spinner icon="dots" *ngIf="loading" class="spinner-dark" ></ion-spinner>\n    <ion-card *ngFor="let order of salsOrders" (click) = "presentOrderPage(order, salsOrders.indexOf(order))"> \n        <ion-card-header>\n          订单编号 : {{order.commandeId}}\n        </ion-card-header>\n        <ion-card-content>\n          <ion-grid>\n            <ion-row inline>\n              <ion-col>收取人 : {{order.receiver}}</ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col>单位 : {{order.type}}</ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col>订单日期 : {{order.commandeCreateDate}} </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col>订单创建人 : {{userId}} </ion-col>\n                <ion-col>订单状态 : {{order.status}} </ion-col>\n            </ion-row>\n            \n          </ion-grid>\n        </ion-card-content>\n      </ion-card>\n\n</ion-content>\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\read-sqls-order\read-sqls-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */]])
    ], ReadSqlsOrderPage);
    return ReadSqlsOrderPage;
}());

//# sourceMappingURL=read-sqls-order.js.map

/***/ }),

/***/ 162:
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
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/read-sqls-order/read-sqls-order.module": [
		679,
		1
	],
	"../pages/test/test.module": [
		680,
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
webpackAsyncContext.id = 207;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductModelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(71);
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
    function ProductModelPage(viewCtrl, formBuilder, navParams, rest, alerCtrl) {
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.rest = rest;
        this.alerCtrl = alerCtrl;
        this.searchQuery = '';
        this.gridShow = false;
        this.productNotFound = false;
        this.modifMod = false;
        this.productForm = this.formBuilder.group({
            idProduct: [''],
            nameProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            adresseProduct: [''],
            nameOffical: [''],
            numberProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            unitProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            priceProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            typePriceProduct: [''],
            amount: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            datePayProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            hadPaidProduct: [''],
            descriptProduct: ['']
        });
        this.products = [];
        var infoProduct = this.navParams.get('infoProduct');
        if (infoProduct != undefined) {
            this.productForm.setValue(infoProduct);
            this.productSelect = {
                id: infoProduct.idProduct,
                name: infoProduct.nameProduct,
                unit: infoProduct.unitProduct,
                typePrice: infoProduct.typePriceProduct
            };
            this.modifMod = true;
        }
    }
    ProductModelPage.prototype.initProducts = function () {
        var _this = this;
        this.rest.GetCargoByName("C", -1) // 填写url的参数
            .subscribe(function (f) {
            _this.products = f;
            console.log(_this.products);
        }, function (error) {
            _this.products = [{ id: '-1', name: "请求错误", unit: "", typePrice: "" }];
        });
    };
    ProductModelPage.prototype.changeProduct = function () {
        var productTmp = this.productForm.value;
        productTmp["nameProduct"] = this.productSelect.name;
        productTmp["unitProduct"] = this.productSelect.unit;
        productTmp["typePriceProduct"] = this.productSelect.typePrice;
        this.productForm.setValue(productTmp);
    };
    ProductModelPage.prototype.exit = function () {
        this.viewCtrl.dismiss();
    };
    ProductModelPage.prototype.logProductForm = function () {
        this.viewCtrl.dismiss({ action: 1, content: this.productForm.value });
    };
    ProductModelPage.prototype.removeProduct = function () {
        var _this = this;
        var confirm = this.alerCtrl.create({
            title: '提示',
            message: '确认删除此商品吗?',
            buttons: [
                {
                    text: '确认',
                    handler: function () {
                        _this.viewCtrl.dismiss({ action: 0, content: {} });
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    ProductModelPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductModelPage');
    };
    ProductModelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product-model',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\product-model\product-model.html"*/`<!--\n\n  Generated template for the ProductModelPage page.\n\n\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n      <ion-buttons>\n\n          <button ion-button (click)="exit()" icon-only>\n\n              <ion-icon name=\'arrow-back\' showWhen="ios" color = "primary"></ion-icon>\n\n            <ion-icon name="md-close" showWhen="android"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    <ion-title text-center>添加货物</ion-title>\n\n    <ion-buttons end> <button ion-button (click)="logProductForm()" \n\n      [disabled]="!productForm.valid" color="primary">保存</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content >\n\n    <ion-item-group [formGroup]="productForm" inset=\'true\'>\n\n\n\n      <ion-item>\n\n          <ion-label>*货物名称</ion-label>\n\n          <ionic-selectable\n\n            item-content \n\n            [(ngModel)]="productSelect"\n\n            [ngModelOptions]="{standalone: true}"\n\n            [items]="products"\n\n            itemTextField="name"\n\n            [canSearch]="true"\n\n            (click) = "initProducts()"\n\n            (onChange) = "changeProduct()">\n\n          </ionic-selectable>\n\n        </ion-item>\n\n    \n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>产地</ion-label>\n\n        <ion-input type="text" formControlName="adresseProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>官方品名</ion-label>\n\n        <ion-input type="text" formControlName="nameOffical"></ion-input>\n\n      </ion-item>\n\n\n\n      <br>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>*数量</ion-label>\n\n        <ion-input type="number" formControlName="numberProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>*单位</ion-label>\n\n        <ion-input type="text" formControlName="unitProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>*单价</ion-label>\n\n        <ion-input type="number" formControlName="priceProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>价类</ion-label>\n\n        <ion-select formControlName="typePriceProduct">\n\n          <ion-option value="米价">米价</ion-option>\n\n          <ion-option value="单位价">单位价</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <br>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>*金额</ion-label>\n\n        <ion-input type="number" formControlName="amount"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" >*交货日期</ion-label>\n\n        <ion-datetime displayFormat="YYYY年 MM月 DD日" pickerFormat="YYYY MM DD" formControlName="datePayProduct"\n\n          autocorrect="on"></ion-datetime>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>已付数量</ion-label>\n\n        <ion-input type="text" formControlName="hadPaidProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <br>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>备注</ion-label>\n\n        <ion-textarea formControlName="descriptProduct"></ion-textarea>\n\n      </ion-item>\n\n      <ion-item></ion-item>\n\n    </ion-item-group>\n\n\n\n    <button ion-button *ngIf="modifMod" (click) = "removeProduct()" block>删除</button>\n\n\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\product-model\product-model.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ProductModelPage);
    return ProductModelPage;
}());

//# sourceMappingURL=product-model.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Port = (function () {
    function Port() {
    }
    return Port;
}());
var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.ports = [
            { id: 1, name: 'Tokai' },
            { id: 2, name: 'Vladivostok' },
            { id: 3, name: 'Navlakhi' }
        ];
    }
    HomePage.prototype.portChange = function (event) {
        console.log('port:', this.port);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\home\home.html"*/`<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Home</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-item>\n\n    <ion-label>Port</ion-label>\n\n    <ionic-selectable\n\n      item-content \n\n      [(ngModel)]="port"\n\n      [items]="ports"\n\n      itemTextField="name"\n\n      [canSearch]="true"\n\n      (onChange)="portChange($event)">\n\n    </ionic-selectable>\n\n  </ion-item>\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], TestPage);
    return TestPage;
}());

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(355);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_test_test__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_sals_order_sals_order__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_product_model_product_model__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_rest_rest__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_read_sqls_order_read_sqls_order__ = __webpack_require__(149);
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
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_sals_order_sals_order__["a" /* SalsOrderPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_product_model_product_model__["a" /* ProductModelPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_read_sqls_order_read_sqls_order__["a" /* ReadSqlsOrderPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/read-sqls-order/read-sqls-order.module#ReadSqlsOrderPageModule', name: 'ReadSqlsOrderPage', segment: 'read-sqls-order', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/test/test.module#TestPageModule', name: 'TestPage', segment: 'test', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__["a" /* IonicSelectableModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_sals_order_sals_order__["a" /* SalsOrderPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_product_model_product_model__["a" /* ProductModelPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_read_sqls_order_read_sqls_order__["a" /* ReadSqlsOrderPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_rest_rest__["a" /* RestProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_sals_order_sals_order__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_read_sqls_order_read_sqls_order__ = __webpack_require__(149);
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
                    { pageTitle: '销售订单', component: __WEBPACK_IMPORTED_MODULE_6__pages_sals_order_sals_order__["a" /* SalsOrderPage */] },
                    { pageTitle: '查看订单', component: __WEBPACK_IMPORTED_MODULE_7__pages_read_sqls_order_read_sqls_order__["a" /* ReadSqlsOrderPage */] }
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\app\app.html"*/`<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n      <ion-item-group *ngFor="let p of pages" class="firstMenu">\n        <ion-item (click)="listShow[p.title]=!listShow[p.title]">\n          {{p.title}}\n          <ion-icon name="ios-arrow-down" item-right  *ngIf="listShow[p.title]"></ion-icon>\n          <ion-icon name="ios-arrow-forward" item-right *ngIf="!listShow[p.title]"></ion-icon>\n        </ion-item>\n        <ion-grid *ngIf="listShow[p.title]" >\n            <ion-row *ngFor="let i of p.componentPages" class="secondMenu">\n            <ion-col><a menuClose ion-item (click)="openPage(i)" class="fontSecondMenu">\n                {{i.pageTitle}}\n             </a> </ion-col>\n          </ion-row>\n        </ion-grid>\n    </ion-item-group>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`/*ion-inline-end:"C:\Users\36394\projet\erp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestProvider = (function () {
    function RestProvider(http) {
        this.http = http;
        this.host = "http://47.100.137.77/";
        //private host = "http://localhost/LjWebApplication/";
        this.apiUrlGetCargoByName = this.host + 'api/cargo';
        this.apiUrlGetOrdersByUserId = this.host + 'api/SalesOrder/GetSalesOrderByUserId';
        this.apiUrlGetDeptByName = this.host + 'api/Client';
        this.apiUrlGetSalesOrderByOrderId = this.host + "api/SalesOrder/GetSalesOrderByOrderId";
    }
    RestProvider.prototype.GetCargoByName = function (keyword, limit) {
        return this.getUrlReturn(this.apiUrlGetCargoByName + "?keyword=" + keyword + "&limit=" + limit);
    };
    RestProvider.prototype.GetOrdersByUserId = function (userId) {
        return this.getUrlReturn(this.apiUrlGetOrdersByUserId + "?userId=" + userId);
    };
    RestProvider.prototype.GetDeptByName = function (keyword, limit) {
        return this.getUrlReturn(this.apiUrlGetDeptByName + "?name=" + keyword + "&limit=" + limit);
    };
    RestProvider.prototype.GetSalesOrderByOrderId = function (orderId) {
        return this.getUrlReturn(this.apiUrlGetSalesOrderByOrderId + "?orderId=" + orderId);
    };
    RestProvider.prototype.getUrlReturn = function (url) {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    RestProvider.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    RestProvider.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + "-" + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.tostring();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(errMsg);
    };
    RestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], RestProvider);
    return RestProvider;
}());

//# sourceMappingURL=rest.js.map

/***/ })

},[350]);
//# sourceMappingURL=main.js.map