// pages/historydetail/historydetail.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { date } from "../../apis/order.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;

    super.onLoad(options);
    var orderapi = new OrderApi();
    orderapi.goodslist({}, (goodslist) => {
      this.Base.setMyData({ goodslist });
    });
    var timestamp = Date.parse(new Date());

    this.Base.setMyData({
      allshow: this.Base.options.allshow,
      mineshow: this.Base.options.mineshow,
      mine: this.Base.options.mine,
      all: this.Base.options.all,
      timestamp: timestamp / 1000
    })

    console.log(11111111);
    
  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.memberlist({}, (memberlist) => {
      this.Base.setMyData({ memberlist });
    });


    orderapi.info({ id: this.Base.options.id }, (orderinfo) => {

      var data1 = new Date(Date.parse(orderinfo.start_time.replace(/-/g, "/")));
      var month1 = data1.getMonth() + 1;
      var day1 = data1.getDate();
      var hh1 = data1.getHours();
      var mm1 = data1.getMinutes();
      if (month1 < 10) {
        month1 = "0" + month1;
      }
      if (day1 < 10) {
        day1 = "0" + day1;
      }
      if (hh1 < 10) {
        hh1 = "0" + hh1;
      }
      if (mm1 < 10) {
        mm1 = "0" + mm1;
      }

      var data = new Date(Date.parse(orderinfo.end_time.replace(/-/g, "/")));
      var month = data.getMonth() + 1;
      var day = data.getDate();
      var hh = data.getHours();
      var mm = data.getMinutes();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hh < 10) {
        hh = "0" + hh;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }

      console.log(666);
      console.log(month1);
      console.log(day1);
      console.log(hh1);
      console.log(mm1);
      orderinfo.start_time;
      console.log(orderinfo.start_time);
      this.Base.setMyData({ orderinfo, month1, day1, hh1, mm1, month, day, hh, mm });
      
      orderapi.memberinfo({ id: orderinfo.enroll_id }, (enrollinfo) => {
        this.Base.setMyData({ enrollinfo });
      });
      orderapi.memberinfo({ id: orderinfo.start_id }, (startinfo) => {
        this.Base.setMyData({ startinfo });
      });
      orderapi.memberinfo({ id: orderinfo.end_id }, (endinfo) => {
        this.Base.setMyData({ endinfo });
      });
    });

  }
  setPageTitle(instinfo) {
    var title = "任务详情";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
  toreedit(e){
    wx.showModal({
      title: '再次发布',
      content: '您是否需要重新编辑并发布运输单?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          var id = e.currentTarget.id;
          wx.navigateTo({
            url: '/pages/reedit/reedit?id='+id,
          })
        }
      }
    });
  }

  openRoute() {
    var orderinfo = this.Base.getMyData().orderinfo;
    var startaddress = this.Base.getMyData().orderinfo.startaddress;
    var targetaddress = this.Base.getMyData().orderinfo.targetaddress;
    console.log("NNNNNNNNNN" + orderinfo.startaddress);

    var route = [

      {
        "title": startaddress,
        "address": orderinfo.startaddress,
        "type": 0,
        "location": {
          "lat": orderinfo.startlat,
          "lng": orderinfo.startlng
        }
      },

      //{ "address": startaddress, "type": 0, "location": { "lat": orderinfo.startlat, "lng": orderinfo.startlng } }, 

      {
        "title": targetaddress,
        "address": orderinfo.targetaddress,
        "type": 0,
        "location": {
          "lat": orderinfo.targetlat,
          "lng": orderinfo.targetlng
        }
      }
    ];

    if (route != undefined) {
      wx.navigateTo({
        url: '/pages/route/route?callbackid=route&route=' + JSON.stringify(route),
      })

    } else {

      wx.navigateTo({
        url: '/pages/route/route?callbackid=route',
      })
    }

  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.Deleteorder = content.Deleteorder;
body.update = content.update;
body.toreedit = content.toreedit; 
body.openRoute = content.openRoute; 
Page(body)