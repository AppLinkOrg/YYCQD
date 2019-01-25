// pages/driver/driver.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

  }
  //界面标题
  setPageTitle() {
    
    wx.setNavigationBarTitle({
      title: '车辆列表',
    });

  }
  onMyShow() {
    var that = this;
    var UserInfo = this.Base.getMyData().UserInfo;
    var orderapi = new OrderApi();
    orderapi.vehiclelist({status:"A,I"}, (vehiclelist) => {
      this.Base.setMyData({ vehiclelist });
  })}

  binddeleted(e){
    var that = this;
    var orderapi = new OrderApi();
    var memberinfo = this.Base.getMyData().memberinfo;
    var id = e.currentTarget.id;
    console.log(id+"ssssssssssssss");
    //return;
    wx.showModal({
      title: '',
      content: '确认删除车辆?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          orderapi.updatecarstatus({idlist:id}, (updatecarstatus) => {
            that.Base.setMyData({
              updatecarstatus
            });
            that.onMyShow();
          });

        }
      }
    });
  }
  toaddcar(e){
    var cats = e.currentTarget.dataset.cats;
    wx.showModal({
      title: '',
      content: '您是否需要添加新车辆',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/Addvehicle/Addvehicle?cats=' + cats,
          })
        }
      }
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.binddeleted = content.binddeleted;
body.toaddcar = content.toaddcar;
Page(body)