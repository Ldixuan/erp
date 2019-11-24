webpackJsonp([2],{

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalsOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_model_product_model__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_common_baseui__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(64);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var SalsOrderPage = (function (_super) {
    __extends(SalsOrderPage, _super);
    function SalsOrderPage(formBuilder, viewCtrl, alerCtrl, modalCtrl, rest, navParams, loadingCtrl, toastCtrl, navCtrl, storage, network) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.viewCtrl = viewCtrl;
        _this.alerCtrl = alerCtrl;
        _this.modalCtrl = modalCtrl;
        _this.rest = rest;
        _this.navParams = navParams;
        _this.loadingCtrl = loadingCtrl;
        _this.toastCtrl = toastCtrl;
        _this.navCtrl = navCtrl;
        _this.storage = storage;
        _this.network = network;
        _this.gridShow = false;
        _this.productNotFound = false;
        _this.readModel = false;
        _this.orderForm = _this.formBuilder.group({
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
            userId: [''],
            deptId: [''],
            status: [''],
            statusCode: 0,
            messageForAuditor: [''],
            remarkfeedback: ['']
        });
        _this.depts = [];
        _this.listProduct = new Array();
        _this.storage.get("userId").then(function (val) {
            var temp = _this.orderForm.value;
            temp.userId = val;
            _this.orderForm.setValue(temp);
        });
        var title = _this.navParams.get('title');
        if (title != undefined) {
            _this.initOrderInfo(title);
            _this.readModel = true;
        }
        _this.initDepts();
        return _this;
    }
    SalsOrderPage_1 = SalsOrderPage;
    SalsOrderPage.prototype.initDepts = function () {
        var _this = this;
        if (this.network.type != 'none') {
            this.rest.GetDeptByName(-1) // 填写url的参数
                .subscribe(function (f) {
                if (f.Success) {
                    _this.depts = f.Data;
                }
                else {
                    _super.prototype.showToast.call(_this, _this.toastCtrl, f.Msg);
                }
            }, function (error) {
                alert(error); //todo :    super.showToast(this.toastCtrl,"保存成功");
            });
        }
        else {
            _super.prototype.showToast.call(this, this.toastCtrl, "您处于离线状态，请连接网络! ");
        }
    };
    SalsOrderPage.prototype.initOrderInfo = function (title) {
        var _this = this;
        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "加载中...");
        if (this.network.type != 'none') {
            this.rest.GetSalesOrderByOrderId(title)
                .subscribe(function (f) {
                if (f.Success) {
                    var orderDetail = f.Data.salesOrderDetail;
                    var temp = _this.orderForm.value;
                    temp.title = orderDetail.commandeId;
                    temp.date = orderDetail.commandeCreateDate;
                    temp.telSender = orderDetail.senderTelephoneNumber;
                    temp.faxSender = orderDetail.senderFax;
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
                    temp.statusCode = orderDetail.statusCode || 0;
                    temp.remarkfeedback = orderDetail.remarkfeedback;
                    _this.orderForm.setValue(temp);
                    _this.deptSelect = { id: orderDetail.departmentId, name: orderDetail.departmentLabel };
                    var productsInfo = f.Data.cargo;
                    for (var index = 0; index < productsInfo.length; index++) {
                        var productTemp = {
                            idProduct: "",
                            nameProduct: "",
                            adresseProduct: "",
                            nameOffical: "",
                            numberProduct: "",
                            unitProduct: "",
                            priceProduct: "",
                            datePayProduct: "",
                            hadPaidProduct: "",
                            descriptProduct: ""
                        };
                        productTemp['idProduct'] = productsInfo[index].cargoId;
                        productTemp['nameProduct'] = productsInfo[index].cargoName;
                        productTemp['numberProduct'] = productsInfo[index].cargoQuantity || 0;
                        productTemp['unitProduct'] = productsInfo[index].cargoUnit;
                        productTemp['priceProduct'] = productsInfo[index].cargoUnitPrice || 0;
                        productTemp['datePayProduct'] = productsInfo[index].scheduleCargoDate;
                        productTemp['adresseProduct'] = "";
                        productTemp['nameOffical'] = "";
                        productTemp['hadPaidProduct'] = "";
                        productTemp['descriptProduct'] = "";
                        _this.listProduct.push(productTemp);
                    }
                }
                else {
                    _super.prototype.showToast.call(_this, _this.toastCtrl, f.Msg);
                }
                loading.dismiss();
            }, function (error) {
                loading.dismiss();
                alert(error); //TODO change to toast
            });
        }
        else {
            _super.prototype.showToast.call(this, this.toastCtrl, "您处于离线状态，请连接网络! ");
        }
    };
    SalsOrderPage.prototype.logForm = function () {
        var _this = this;
        if (this.listProduct.length == 0) {
            _super.prototype.showToast.call(this, this.toastCtrl, "请添加货物");
            return;
        }
        var confirm = this.alerCtrl.create({
            title: '提示',
            message: '确认保存此订单吗?',
            buttons: [
                {
                    text: '确认',
                    handler: function () {
                        _this.saveOrder();
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
    SalsOrderPage.prototype.saveOrder = function () {
        var _this = this;
        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "正在保存，请稍等");
        if (this.network.type != 'none') {
            this.rest.InsertSalesOrderByOrderId(this.orderForm.value, this.listProduct)
                .subscribe(function (f) {
                if (f.Success) {
                    _super.prototype.showToast.call(_this, _this.toastCtrl, "保存成功");
                    if (_this.readModel) {
                        var callback = _this.navParams.get('callback');
                        callback(true).then(function () { _this.navCtrl.pop(); });
                    }
                    else {
                        _this.navCtrl.setRoot(SalsOrderPage_1);
                    }
                }
                else {
                    // alert("保存失敗 : "+f.msg);
                    _super.prototype.showToast.call(_this, _this.toastCtrl, "保存失敗 : " + f.Msg);
                }
                loading.dismiss();
            }, function (error) {
                loading.dismiss();
                _super.prototype.showToast.call(_this, _this.toastCtrl, "保存失敗 : " + error); //TODO: cannot show the detail information for the user
            });
        }
        else {
            _super.prototype.showToast.call(this, this.toastCtrl, "您处于离线状态，请连接网络! ");
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
        console.log(temp); // TODO remove
    };
    SalsOrderPage.prototype.exit = function () {
        this.viewCtrl.dismiss();
    };
    SalsOrderPage = SalsOrderPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sals-order',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\sals-order\sals-order.html"*/`<!--\n\n  Generated template for the SalsOrderPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-toolbar mode="ios" *ngIf="!readModel">\n\n        <ion-title text-center>销售订单</ion-title>\n\n        <ion-buttons>\n\n            <button ion-button menuToggle>\n\n              <ion-icon name="menu"></ion-icon>\n\n            </button>\n\n          </ion-buttons>\n\n        \n\n          <ion-buttons end> \n\n            <button ion-button [disabled]="!orderForm.valid" (click) = "logForm()">保存</button>\n\n          </ion-buttons>\n\n    </ion-toolbar>\n\n\n\n    <ion-navbar *ngIf="readModel">\n\n      <ion-title align-title="center">销售订单</ion-title>\n\n        <ion-buttons end> \n\n          <button ion-button [disabled]="!orderForm.valid" (click) = "logForm()">保存</button>\n\n        </ion-buttons>\n\n      </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    \n\n  <ion-item-group inset="true" [formGroup]="orderForm" >\n\n      \n\n      <ion-item *ngIf="loading">\n\n          <ion-spinner></ion-spinner>\n\n          <p text-center font-size-small>加载中</p>\n\n      </ion-item>\n\n  \n\n      <ion-item *ngIf="readModel">\n\n        <ion-label color="primary" floating>订单编号</ion-label>\n\n        <ion-input type="text"  [disabled]="true" formControlName="title"></ion-input>\n\n     </ion-item>\n\n\n\n      <ion-item style="height: 80px;">\n\n        <ion-label color="primary" *ngIf="orderForm.value.date==\'\'">订单日期*</ion-label>\n\n        <ion-label color="primary" *ngIf="orderForm.value.date!=\'\'"  stacked>订单日期*</ion-label>\n\n        <ion-datetime displayFormat="YYYY年 MM月 DD日" pickerFormat="YYYY MM DD" formControlName="date"  max="2050"></ion-datetime>\n\n      </ion-item>\n\n      \n\n      <ion-item>\n\n        <ion-label color="primary" floating>收取人</ion-label>\n\n        <ion-input type="text" formControlName="sender"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>传真</ion-label>\n\n        <ion-input type="tel" formControlName="faxSender"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>电话</ion-label>\n\n        <ion-input type="tel" formControlName="telSender"></ion-input>\n\n      </ion-item>\n\n\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>单位*</ion-label>\n\n        <ionic-selectable\n\n          item-content \n\n          [(ngModel)]="deptSelect"\n\n          [ngModelOptions]="{standalone: true}"\n\n          [items]="depts"\n\n          itemTextField="name"\n\n          [canSearch]="true"\n\n          [disabled] = "depts.length == 0"\n\n          (onChange) = "changeDept()"\n\n          >\n\n        </ionic-selectable>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label color="primary" floating>发送人</ion-label>\n\n        <ion-input type="text" formControlName="receiver" autocorrect="on"></ion-input>\n\n      </ion-item>  \n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>传真</ion-label>\n\n        <ion-input type="tel" formControlName="faxReceiver" autocorrect="on"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>电话</ion-label>\n\n        <ion-input type="tel" formControlName="telReceiver" autocorrect="on"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n          <ion-label color="primary" floating>备注</ion-label>\n\n          <ion-textarea formControlName="descript"></ion-textarea>\n\n      </ion-item>\n\n\n\n      <ion-item></ion-item>\n\n  </ion-item-group>\n\n\n\n  <a ion-item (click)="presentModal()">\n\n      添加货物\n\n  </a>\n\n\n\n  <ion-list id="listProduct" >\n\n    <ion-card *ngFor="let product of listProduct" (click) = "presentModal(product, listProduct.indexOf(product))"> \n\n      <ion-card-header>\n\n        {{product.nameProduct}}\n\n      </ion-card-header>\n\n      <ion-card-content>\n\n        <ion-grid>\n\n          <ion-row inline>\n\n            <ion-col col-8 >数量 : {{product.numberProduct}} {{product.unitProduct}}</ion-col>\n\n            <ion-col col-4 pull-3>单价 : {{product.priceProduct}}</ion-col>\n\n            \n\n          </ion-row>\n\n          <ion-row>\n\n            <ion-col col-5>金额 : {{product.priceProduct*product.numberProduct}} 元</ion-col>\n\n            <ion-col col-7>交货日期 : {{product.datePayProduct}} </ion-col>\n\n          </ion-row>\n\n          <ion-row>\n\n            <ion-col>备注 : {{product.descriptProduct}} </ion-col>\n\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card-content>\n\n    </ion-card>\n\n  </ion-list>\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\sals-order\sals-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */]])
    ], SalsOrderPage);
    return SalsOrderPage;
    var SalsOrderPage_1;
}(__WEBPACK_IMPORTED_MODULE_5__app_common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=sals-order.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReadSalsOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sals_order_sals_order__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_common_baseui__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(66);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var ReadSalsOrderPage = (function (_super) {
    __extends(ReadSalsOrderPage, _super);
    function ReadSalsOrderPage(navCtrl, navParams, rest, storage, toastCtrl, network) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.rest = rest;
        _this.storage = storage;
        _this.toastCtrl = toastCtrl;
        _this.network = network;
        _this.hasChangeData = false;
        _this.loading = false;
        _this.myCallbackFunction = function (_params) {
            return new Promise(function (resolve, reject) {
                _this.hasChangeData = _params;
                resolve();
            });
        };
        _this.CategoryId = _this.navParams.get('cateogryId');
        _this.initSalsOrdersData();
        return _this;
    }
    ReadSalsOrderPage.prototype.initSalsOrdersData = function () {
        var _this = this;
        this.storage.get("userId").then(function (val) {
            _this.userId = val;
            _this.loading = true;
            if (_this.network.type != 'none') {
                _this.rest.GetOrdersByUserId(_this.userId, _this.CategoryId)
                    .subscribe(function (f) {
                    if (f.Success) {
                        _this.salsOrders = f["Data"];
                    }
                    else {
                        _super.prototype.showToast.call(_this, _this.toastCtrl, f.Msg);
                    }
                    _this.loading = false;
                }, function (error) {
                    alert(error); //TODO change to toast
                    _this.loading = false;
                });
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, "您处于离线状态，请连接网络! ");
            }
        });
    };
    ReadSalsOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReadSalsOrderPage');
    };
    ReadSalsOrderPage.prototype.ionViewDidEnter = function () {
        if (this.hasChangeData) {
            this.initSalsOrdersData();
        }
    };
    ReadSalsOrderPage.prototype.presentOrderPage = function (infoOrder, index) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__sals_order_sals_order__["a" /* SalsOrderPage */], { title: infoOrder.commandeId, callback: this.myCallbackFunction });
    };
    ReadSalsOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-read-sals-order',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\read-sals-order\read-sals-order.html"*/`<!--\n\n  Generated template for the ReadSqlsOrderPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title align-title="center">订单详情</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<div *ngIf="loading" class="spinner">\n\n  <ion-spinner center></ion-spinner>\n\n  <p text-center font-size-small>加载中</p>\n\n</div>\n\n\n\n<ion-content>\n\n  \n\n  \n\n    <ion-card *ngFor="let order of salsOrders" (click) = "presentOrderPage(order, salsOrders.indexOf(order))"> \n\n        <ion-card-header>\n\n          订单编号 : {{order.commandeId}}\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n          <ion-grid>\n\n            <ion-row inline>\n\n              <ion-col>收取人 : {{order.receiver}}</ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n              <ion-col>单位 : {{order.type}}</ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n              <ion-col>订单日期 : {{order.commandeCreateDate}} </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col>订单创建人 : {{userId}} </ion-col>\n\n                <ion-col>订单状态 : {{order.status}} </ion-col>\n\n            </ion-row>\n\n            \n\n          </ion-grid>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\read-sals-order\read-sals-order.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */]) === "function" && _f || Object])
    ], ReadSalsOrderPage);
    return ReadSalsOrderPage;
    var _a, _b, _c, _d, _e, _f;
}(__WEBPACK_IMPORTED_MODULE_5__app_common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=read-sals-order.js.map

/***/ }),

/***/ 166:
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
webpackEmptyAsyncContext.id = 166;

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/read-sals-order/read-sals-order.module": [
		686,
		1
	],
	"../pages/test/test.module": [
		687,
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
webpackAsyncContext.id = 211;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductModelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_common_baseui__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(66);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var ProductModelPage = (function (_super) {
    __extends(ProductModelPage, _super);
    function ProductModelPage(viewCtrl, formBuilder, navParams, rest, alerCtrl, toastCtrl, network) {
        var _this = _super.call(this) || this;
        _this.viewCtrl = viewCtrl;
        _this.formBuilder = formBuilder;
        _this.navParams = navParams;
        _this.rest = rest;
        _this.alerCtrl = alerCtrl;
        _this.toastCtrl = toastCtrl;
        _this.network = network;
        _this.searchQuery = '';
        _this.gridShow = false;
        _this.productNotFound = false;
        _this.modifMod = false;
        _this.initProducts();
        _this.productForm = _this.formBuilder.group({
            idProduct: [''],
            nameProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            adresseProduct: [''],
            nameOffical: [''],
            numberProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            unitProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            priceProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            datePayProduct: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            hadPaidProduct: [''],
            descriptProduct: ['']
        });
        _this.products = [];
        var infoProduct = _this.navParams.get('infoProduct');
        if (infoProduct != undefined) {
            _this.productForm.setValue(infoProduct);
            _this.productSelect = {
                id: infoProduct.idProduct,
                name: infoProduct.nameProduct,
                unit: infoProduct.unitProduct
            };
            _this.modifMod = true;
        }
        return _this;
    }
    ProductModelPage.prototype.checkNumber = function (name) {
        var val = this.productForm.value[name];
        if (isNaN(Number.parseInt(val))) {
            this.productForm.controls[name].setValue('');
        }
    };
    ProductModelPage.prototype.initProducts = function () {
        var _this = this;
        if (this.network.type != 'none') {
            this.rest.GetCargoByName(-1) // 填写url的参数
                .subscribe(function (f) {
                if (f.Success) {
                    _this.products = f.Data;
                }
                else {
                    _super.prototype.showToast.call(_this, _this.toastCtrl, f.Msg);
                }
            }, function (error) {
                alert(error); //TODO change to toast
            });
        }
        else {
            _super.prototype.showToast.call(this, this.toastCtrl, "您处于离线状态，请连接网络! ");
        }
    };
    ProductModelPage.prototype.changeProduct = function () {
        var productTmp = this.productForm.value;
        productTmp["idProduct"] = this.productSelect.id;
        productTmp["nameProduct"] = this.productSelect.name;
        productTmp["unitProduct"] = this.productSelect.unit;
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
            selector: 'page-product-model',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\product-model\product-model.html"*/`<ion-header>\n\n    <ion-toolbar mode="ios">\n\n        <ion-title text-center>添加货物</ion-title>\n\n        <ion-buttons>\n\n            <button ion-button (click)="exit()" icon-only>\n\n                <ion-icon name=\'arrow-back\' showWhen="ios" color = "primary"></ion-icon>\n\n              <ion-icon name="md-close" showWhen="android"></ion-icon>\n\n            </button>\n\n          </ion-buttons>\n\n      \n\n      <ion-buttons end> <button ion-button (click)="logProductForm()" \n\n        [disabled]="!productForm.valid" color="primary">保存</button>\n\n      </ion-buttons>\n\n    </ion-toolbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content >\n\n    <ion-item-group [formGroup]="productForm" inset=\'true\'>\n\n\n\n      <ion-item>\n\n          <ion-label color="primary" floating>货物名称*</ion-label>\n\n          <ionic-selectable\n\n            item-content \n\n            [(ngModel)]="productSelect"\n\n            [ngModelOptions]="{standalone: true}"\n\n            [items]="products"\n\n            itemTextField="name"\n\n            [canSearch]="true"\n\n            (onChange) = "changeProduct()"\n\n            [disabled] = "products.length==[]"\n\n            >\n\n          </ionic-selectable>\n\n        </ion-item>\n\n    \n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>产地</ion-label>\n\n        <ion-input type="text" formControlName="adresseProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>官方品名</ion-label>\n\n        <ion-input type="text" formControlName="nameOffical"></ion-input>\n\n      </ion-item>\n\n\n\n\n\n      <ion-item>\n\n        <ion-label color="primary"  floating>数量*</ion-label>\n\n        <ion-input type="number" (change)="checkNumber(\'numberProduct\')" formControlName="numberProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>单位*</ion-label>\n\n        <ion-input type="text" formControlName="unitProduct" (change)="checkNumber(\'unitProduct\')"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>单价*</ion-label>\n\n        <ion-input type="number" (change)="checkNumber(\'priceProduct\')" formControlName="priceProduct"></ion-input>\n\n      </ion-item>\n\n\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>金额*</ion-label>\n\n        <ion-input type="number" [disabled] = "true" value="{{productForm.value.priceProduct *  productForm.value.numberProduct}}"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item style="height: 80px;">\n\n        <ion-label color="primary" *ngIf="productForm.value.datePayProduct!=\'\'" stacked>*交货日期</ion-label>\n\n        <ion-label color="primary" *ngIf="productForm.value.datePayProduct==\'\'" >交货日期*</ion-label>\n\n        <ion-datetime displayFormat="YYYY年 MM月 DD日" pickerFormat="YYYY MM DD" formControlName="datePayProduct"\n\n          max="2050"></ion-datetime>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>已付数量</ion-label>\n\n        <ion-input type="text" formControlName="hadPaidProduct"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label color="primary" floating>备注</ion-label>\n\n        <ion-textarea formControlName="descriptProduct"></ion-textarea>\n\n      </ion-item>\n\n      <ion-item></ion-item>\n\n    </ion-item-group>\n\n\n\n    <button ion-button *ngIf="modifMod" (click) = "removeProduct()" block>删除</button>\n\n\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\product-model\product-model.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */]) === "function" && _g || Object])
    ], ProductModelPage);
    return ProductModelPage;
    var _a, _b, _c, _d, _e, _f, _g;
}(__WEBPACK_IMPORTED_MODULE_4__app_common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=product-model.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_common_baseui__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(154);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage(navCtrl, navParams, network, rest, toastCtrl, viewCtrl, storage, loadingCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.network = network;
        _this.rest = rest;
        _this.toastCtrl = toastCtrl;
        _this.viewCtrl = viewCtrl;
        _this.storage = storage;
        _this.loadingCtrl = loadingCtrl;
        _this.userList = [];
        _this.hasLogUserList = true;
        return _this;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var userId;
        var token;
        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "加载中...");
        Promise.all([this.storage.get("userId"), this.storage.get("token")]).then(function (values) {
            userId = values[0];
            token = values[1];
            if (userId != null && token != null) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
            }
            else {
                if (_this.network.type != 'none') {
                    _this.rest.GetUserList() // 填写url的参数
                        .subscribe(function (f) {
                        if (f.Success) {
                            _this.userList = f.Data;
                        }
                        else {
                            _super.prototype.showToast.call(_this, _this.toastCtrl, f.Msg);
                        }
                        if (_this.userList.length != 0) {
                            _this.hasLogUserList = false;
                        }
                        else {
                            _super.prototype.showToast.call(_this, _this.toastCtrl, "用户名获取失败");
                        }
                        loading.dismiss();
                    }, function (error) {
                        loading.dismiss();
                        alert(error); //TODO remove
                    });
                }
                else {
                    _super.prototype.showToast.call(_this, _this.toastCtrl, "您处于离线状态，请连接网络!");
                    loading.dismiss();
                }
            }
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.network.type != 'none') {
            if (this.selectedUserId != null && this.password != null && this.selectedUserId != '' && this.password != '') {
                var userTosend = this.userList.filter(function (p) { return p.id == _this.selectedUserId; });
                var user = {};
                if (userTosend != null && userTosend[0] != null) {
                    user["Password"] = this.password;
                    user["Id"] = userTosend[0].id;
                    user["Username"] = userTosend[0].username;
                    var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "请稍等");
                    this.rest.Login(user) // 填写url的参数
                        .subscribe(function (f) {
                        loading.dismiss();
                        if (f["Success"] == true) {
                            _this.storage.set("userId", userTosend[0].id);
                            _this.storage.set("token", f["Data"].token);
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                        }
                        else {
                            _super.prototype.showToast.call(_this, _this.toastCtrl, "登录失败，请检查用户名与密码是否正确");
                        }
                    }, function (error) {
                        alert(error); //TODO remove
                    });
                }
                else {
                    _super.prototype.showToast.call(this, this.toastCtrl, "请输入正确的账号及密码");
                }
            }
        }
        else {
            _super.prototype.showToast.call(this, this.toastCtrl, "您处于离线状态，请连接网络!");
        }
    };
    LoginPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\login\login.html"*/`<ion-content>\n\n\n\n      <ion-list>\n\n          <ion-item style="padding-top: 15px;">\n\n              <ion-label  floating>用户名</ion-label>\n\n              <ion-select [(ngModel)]="selectedUserId" interface="action-sheet" disabled="{{hasLogUserList}}">\n\n                <ion-option *ngFor="let user of userList"  [value]="user.id">{{user.id}} - {{user.username}}</ion-option>\n\n              </ion-select>\n\n          </ion-item>\n\n        \n\n          <ion-item style="padding-top:10px;">\n\n            <ion-label floating>密码</ion-label>\n\n            <ion-input type="password" [(ngModel)]="password"></ion-input>\n\n          </ion-item>\n\n        </ion-list>\n\n\n\n  <button ion-button block (click)="login()">登录</button>\n\n\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}(__WEBPACK_IMPORTED_MODULE_2__app_common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReadSalsOrderCategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_common_baseui__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__read_sals_order_read_sals_order__ = __webpack_require__(155);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * Generated class for the ReadSalsOrderCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReadSalsOrderCategoriesPage = (function (_super) {
    __extends(ReadSalsOrderCategoriesPage, _super);
    function ReadSalsOrderCategoriesPage(navCtrl, navParams, network, rest, toastCtrl, loadingCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.network = network;
        _this.rest = rest;
        _this.toastCtrl = toastCtrl;
        _this.loadingCtrl = loadingCtrl;
        return _this;
    }
    ReadSalsOrderCategoriesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // this.orderStatus = ["未提交","提交到财务","财务不同意","财务同意","经理不同意","经理同意","已作废","冲单"];
        if (this.network.type != 'none') {
            var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "加载中");
            var userId = 'Admi';
            this.rest.GetSalesOrderCategoriesByUserId(userId)
                .subscribe(function (f) {
                if (f.Success) {
                    _this.orderStatus = f["Data"];
                }
                else {
                    _super.prototype.showToast.call(_this, _this.toastCtrl, f.Msg);
                }
            }, function (error) {
                loading.dismiss();
                alert(error); //TODO change to toast
            });
        }
        else {
            _super.prototype.showToast.call(this, this.toastCtrl, "您处于离线状态，请连接网络! ");
        }
    };
    ReadSalsOrderCategoriesPage.prototype.itemSelected = function (itemId) {
        if (itemId != null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__read_sals_order_read_sals_order__["a" /* ReadSalsOrderPage */], { cateogryId: itemId });
        }
    };
    ReadSalsOrderCategoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-read-sals-order-categories',template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\pages\read-sals-order-categories\read-sals-order-categories.html"*/`<!--\n\n  Generated template for the ReadSalsOrderCategoriesPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title align-title="center">观看订单</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of orderStatus" (click)="itemSelected(item.categoryId)">\n\n      {{ item.categoryName }}\n\n      <ion-badge item-end>  {{ item.count }}</ion-badge>\n\n    </button> \n\n  </ion-list>\n\n</ion-content>\n\n`/*ion-inline-end:"C:\Users\36394\projet\erp\src\pages\read-sals-order-categories\read-sals-order-categories.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]) === "function" && _f || Object])
    ], ReadSalsOrderCategoriesPage);
    return ReadSalsOrderCategoriesPage;
    var _a, _b, _c, _d, _e, _f;
}(__WEBPACK_IMPORTED_MODULE_3__app_common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=read-sals-order-categories.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], TestPage);
    return TestPage;
}());

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(361);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__ = __webpack_require__(684);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_list_list__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_test_test__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_sals_order_sals_order__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_product_model_product_model__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_rest_rest__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_read_sals_order_read_sals_order__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_read_sals_order_categories_read_sals_order_categories__ = __webpack_require__(354);
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
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_sals_order_sals_order__["a" /* SalsOrderPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_product_model_product_model__["a" /* ProductModelPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_read_sals_order_read_sals_order__["a" /* ReadSalsOrderPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_read_sals_order_categories_read_sals_order_categories__["a" /* ReadSalsOrderCategoriesPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/read-sals-order/read-sals-order.module#ReadSalsOrderPageModule', name: 'ReadSalsOrderPage', segment: 'read-sals-order', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/test/test.module#TestPageModule', name: 'TestPage', segment: 'test', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_selectable__["a" /* IonicSelectableModule */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_sals_order_sals_order__["a" /* SalsOrderPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_product_model_product_model__["a" /* ProductModelPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_read_sals_order_read_sals_order__["a" /* ReadSalsOrderPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_read_sals_order_categories_read_sals_order_categories__["a" /* ReadSalsOrderCategoriesPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_16__providers_rest_rest__["a" /* RestProvider */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_observable_of__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_observable_of__);
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
    function RestProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        //private host = "http://47.100.137.77/";
        this.host = "http://localhost/LjWebApplication/";
        this.apiUrlGetCargoByName = this.host + 'api/cargo';
        this.apiUrlGetOrdersByUserId = this.host + 'api/SalesOrder/GetSalesOrderByUserId';
        this.apiUrlGetSalesOrderCategoriesByUserId = this.host + 'api/SalesOrder/GetSalesOrderCategoriesByUserId';
        this.apiUrlGetDeptByName = this.host + 'api/Client';
        this.apiUrlGetSalesOrderByOrderId = this.host + "api/SalesOrder/GetSalesOrderByOrderId";
        this.apiUrlInsertSalesOrderByOrderId = this.host + "api/SalesOrder/InsertSalesOrderByOrderId";
        this.apiUrlgetUserList = this.host + "api/Auth/getUserList";
        this.apiUrlLogin = this.host + "api/Auth/Login";
    }
    /*
    * With auth services
    */
    RestProvider.prototype.GetCargoByName = function (limit) {
        return this.getUrlReturn(this.apiUrlGetCargoByName + "?limit=" + limit);
    };
    RestProvider.prototype.GetOrdersByUserId = function (userId, categoryId) {
        return this.getUrlReturn(this.apiUrlGetOrdersByUserId + "?userId=" + userId + "&categoryId=" + categoryId);
    };
    RestProvider.prototype.GetSalesOrderCategoriesByUserId = function (userId) {
        return this.getUrlReturn(this.apiUrlGetSalesOrderCategoriesByUserId + "?userId=" + userId);
    };
    RestProvider.prototype.GetDeptByName = function (limit) {
        return this.getUrlReturn(this.apiUrlGetDeptByName + "?limit=" + limit);
    };
    RestProvider.prototype.GetSalesOrderByOrderId = function (orderId) {
        return this.getUrlReturn(this.apiUrlGetSalesOrderByOrderId + "?orderId=" + orderId);
    };
    RestProvider.prototype.InsertSalesOrderByOrderId = function (orderInfo, products) {
        return this.postUrlReturn(this.apiUrlInsertSalesOrderByOrderId, { orderInfo: orderInfo, products: products });
    };
    /**
     * Without auth
     *
     * @param {*} User
     * @returns {Observable<any>}
     * @memberof RestProvider
     */
    RestProvider.prototype.Login = function (User) {
        return this.postUrlReturnWithOutAuth(this.apiUrlLogin, User);
    };
    /**
     * Without auth
     * Get userlist for the login page
     * @returns {Observable<any>}
     * @memberof RestProvider
     */
    RestProvider.prototype.GetUserList = function () {
        return this.getUrlReturnWithOutAuth(this.apiUrlgetUserList);
    };
    // TODO: Login page remove all 
    RestProvider.prototype.getUrlReturnWithOutAuth = function (url) {
        return this.http.get(url)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["timeout"])(10000), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (e) {
            return Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_observable_of__["of"])({ 'error': 'timeout' });
        }))
            .map(this.extractData)
            .catch(this.handleError);
    };
    RestProvider.prototype.getToken = function () {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(this.storage.get('token').then(function (token) {
            //maybe some processing logic like JSON.parse(token)
            return token;
        }));
    };
    RestProvider.prototype.getUrlReturn = function (url) {
        var _this = this;
        return this.getToken().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["mergeMap"])(function (token) { return _this.http.get(url, { headers: new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }) }).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["timeout"])(10000), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (e) {
            return Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_observable_of__["of"])({ 'error': 'timeout' });
        }))
            .map(_this.extractData)
            .catch(_this.handleError); }));
    };
    RestProvider.prototype.postUrlReturn = function (url, body) {
        var _this = this;
        return this.getToken().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["mergeMap"])(function (token) { return _this.http.post(url, body, { headers: new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }) }).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["timeout"])(10000), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (e) {
            return Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_observable_of__["of"])({ 'error': 'timeout' });
        }))
            .map(_this.extractData)
            .catch(_this.handleError); }));
    };
    RestProvider.prototype.postUrlReturnWithOutAuth = function (url, body) {
        return this.http.post(url, body)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["timeout"])(10000), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (e) {
            return Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_observable_of__["of"])({ 'error': 'timeout' });
        }))
            .map(this.extractData)
            .catch(this.handleError);
    };
    RestProvider.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    RestProvider.prototype.handleError = function (error) {
        var errMsg;
        // if (error instanceof Response) {
        //   const body = error.json() || '';
        //   const err = body.error || JSON.stringify(body);
        //   errMsg = `${error.status}-${error.statusText || ''} ${err}`;
        // }
        // else {
        //   errMsg = error.message ? error.message : error.tostring();
        // }
        // console.error(errMsg);
        // return Observable.throw(errMsg);
        //console.log(JSON.stringify(error));
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(JSON.stringify(error));
    };
    RestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], RestProvider);
    return RestProvider;
}());

//# sourceMappingURL=rest.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseUI; });
var BaseUI = (function () {
    function BaseUI() {
    }
    BaseUI.prototype.showLoading = function (loadingCtrl, message) {
        var loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        });
        loader.present();
        return loader;
    };
    BaseUI.prototype.showToast = function (toastCtrl, message) {
        var toast = toastCtrl.create({
            message: message,
            duration: 5000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    };
    return BaseUI;
}());

//# sourceMappingURL=baseui.js.map

/***/ }),

/***/ 685:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_sals_order_sals_order__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_read_sals_order_categories_read_sals_order_categories__ = __webpack_require__(354);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
        this.listShow = {};
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: '销售管理', componentPages: [
                    { pageTitle: '销售订单', component: __WEBPACK_IMPORTED_MODULE_6__pages_sals_order_sals_order__["a" /* SalsOrderPage */] },
                    { pageTitle: '查看订单', component: __WEBPACK_IMPORTED_MODULE_8__pages_read_sals_order_categories_read_sals_order_categories__["a" /* ReadSalsOrderCategoriesPage */] }
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\36394\projet\erp\src\app\app.html"*/`<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n      <ion-item-group *ngFor="let p of pages" class="firstMenu">\n        <ion-item (click)="listShow[p.title]=!listShow[p.title]">\n          {{p.title}}\n          <ion-icon name="ios-arrow-down" item-right  *ngIf="listShow[p.title]"></ion-icon>\n          <ion-icon name="ios-arrow-forward" item-right *ngIf="!listShow[p.title]"></ion-icon>\n        </ion-item>\n        <ion-grid *ngIf="listShow[p.title]" >\n            <ion-row *ngFor="let i of p.componentPages" class="secondMenu">\n            <ion-col><a menuClose ion-item (click)="openPage(i)" class="fontSecondMenu">\n                {{i.pageTitle}}\n             </a> </ion-col>\n          </ion-row>\n        </ion-grid>\n    </ion-item-group>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`/*ion-inline-end:"C:\Users\36394\projet\erp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[356]);
//# sourceMappingURL=main.js.map