import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CodePush, InstallMode } from '@ionic-native/code-push';
import { RestProvider } from '../providers/rest/rest'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{ title: string, component: any, icon: any, param: object }>; //Array<{title: string, componentPages: Array<{pageTitle: string, component: any}>}>;

  listShow: { [key: string]: boolean } = {};

  constructor(public rest: RestProvider,
    public loadingCtrl: LoadingController, 
    public codePush: CodePush, 
    public platform: Platform, 
    public statusBar: StatusBar, 
    public plt : Platform,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: '销售管理', componentPages: [
      //   {pageTitle: '销售订单', component: SalsOrderPage},
      //   {pageTitle: '查看订单', component: ReadSalsOrderCategoriesPage}
      // ] },
      // { title: 'Home', componentPages: [
      //   {pageTitle: 'Home', component : HomePage}
      // ] },
      // { title: 'List', componentPages: [
      //   {pageTitle: 'List', component : ListPage}
      // ]}
      { title: '编辑销售/采购订单', component: 'SalsOrderPage', icon: 'create', param: null },
      { title: '查看销售订单', component: 'ReadSalsOrderCategoriesPage', icon: 'document', param: { commandTypeId: 'O', commandTypeLabel: '销售' } },
      { title: '查看采购订单', component: 'ReadSalsOrderCategoriesPage', icon: 'document', param: { commandTypeId: 'I', commandTypeLabel: '采购' } },
      { title: '编辑出货订单', component: 'AddDeliveryOrderPage', icon: 'create', param: null },
      { title: '查看出货订单', component: 'ReadDeliveryOrderPage', icon: 'document', param: null },
      { title: '审核销售/采购订单', component: 'ValidationOrderListPage', icon: 'arrow-dropdown-circle', param: null },
      // { title: 'Home', component: HomePage , icon:'document'},
      // { title: 'List', component: ListPage , icon:'document'},
      { title: '销售排行', component: 'SalesPerformanceRewardPage', icon: 'star', param: null },
      { title: '我的设置', component: 'SettingsPage', icon: 'settings', param: null }
    ];

    for (let index = 0; index < this.pages.length; index++) {
      this.listShow[this.pages[index].title] = false;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
     this.statusBar.styleDefault();
     this.splashScreen.hide();
     if(this.plt.is('cordova')){
        this.checkCodePush();
     }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.param == null) {
      this.nav.setRoot(page.component);
    }
    else {
      this.nav.setRoot(page.component, page.param);
    }
  }
  checkCodePush() {
    this.codePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: "\n\n更新说明:\n",
        optionalInstallButtonLabel: "安装",
        optionalIgnoreButtonLabel: "忽略",
        optionalUpdateMessage: "我们发布了一些功能的更新与bug修复",
        updateTitle: "更新"
      },
      installMode: InstallMode.IMMEDIATE
    }, (downloadProgress) => {
      if (downloadProgress) {
        // Update "downloading" modal with current download %
        //alert("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes);
        //console.log(111);
      }
    }).subscribe(
      (data) => {
        if (data == 7) {
        var loading =  this.loadingCtrl.create ({
            content: "正在下载...",
            dismissOnPageChange: true
        });
        loading.present();
        }
        //0:应用程序是最新的
        //1:*更新是可用的，它已被下载，解压缩并复制到部署文件夹,在使用SycStasUs.UpDeaTyEnter调用回调完成后，应用程序将重新加载更新的代码和资源。
        //2:可选的更新是可用的，但用户拒绝安装它。没有下载更新。
        //3:同步操作期间发生错误。这可能是与服务器通信、下载或解压缩更新时的错误。控制台日志应该包含有关发生的事情的更多信息。在这种情况下没有应用任何更新。
        //4:正在进行中的同步，因此此同步尝试已中止。
        //5:中间状态-插件即将检查更新。
        //6:中间状态-用户对话框即将被显示。只有在启用用户交互时才会报告此状态。
        //7:中间状态-更新包即将被下载。
        //8:中间状态-更新包即将安装。
        // 5678150
        //测试数据
      },
      (err) => {
        console.log('CODE PUSH ERROR: ' + err);
      }
    );
  }
}
