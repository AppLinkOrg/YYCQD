// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
    this.needauth=false;
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      allshow: 1
    });
    var statelist = ["所有发布", "报名中", "运输中", "未开始"];
    this.Base.setMyData({
      statelist
    });
    this.Base.setMyData({ state: 0 });

    wx.showModal({
      title: '',
      content: '若拒绝授权手机号，小程序功能将受限，需删除小程序再进入授权',
      showCancel: false,
      cancelText: '否',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
    })
    


  }
  onMyShow() {
    var that = this;
    wx.getStorage({
      key: 'lastlogin',
      success: function(res) {
        console.log("lastlogin");
        console.log(res);
        if(res.data=="D"){
          wx.reLaunch({
            url: '/pages/driver/driver',
          })
        } else if (res.data == "Q"){
          wx.reLaunch({
            url: '/pages/home/home',
          })
        }
        
      },
    });
    var orderapi = new OrderApi();
    orderapi.list({getall:"Y"}, (list) => {
      this.Base.setMyData({ list });
    });
  }
  bindall(e) {
    console.log(e);
    this.Base.setMyData({ allshow: 1, mineshow: 1 });
  }
  bindmine(e) {
    console.log(e);
    this.Base.setMyData({ allshow: 2, mineshow: 2 });
  }

  bindpickerstate(e) {
    // var list = this.Base.getMyData().list;
    // this.Base.setMyData({
    //   state_idx: e.detail.value,
    //   state_id: list[e.detail.value].id
    // });
    this.Base.setMyData({
      state: e.detail.value
    });
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '游客界面',
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindall = content.bindall;
body.bindmine = content.bindmine;
body.bindpickerstate = content.bindpickerstate;
Page(body)