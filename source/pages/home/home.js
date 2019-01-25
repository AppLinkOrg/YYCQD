// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  OrderApi
} from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    var timestamp = Date.parse(new Date());
    this.Base.setMyData({
      allshow: 1,
      state_id: 0,
      state_id_mine:0,
      today: this.Base.util.FormatDate(new Date()),
      time: this.Base.util.FormatDateTime(new Date()),
      timestamp : timestamp / 1000
    });
    
    var today = this.Base.util.FormatDate(new Date());
    var time = this.Base.util.FormatDateTime(new Date());
    console.log("当前日期为："+today);
    console.log("当前时间为：" + time);
    wx.setStorageSync("lastlogin", "Q");

    var orderapi = new OrderApi();
    orderapi.orderstatus({
      orderby: "r_main.id desc"
    }, (statuslist) => {
      statuslist.push({
        id: "",
        odrstatusname: "所有发布"
      });
      this.Base.setMyData({
        statuslist
      })
    })
    //var orderapi = new OrderApi();
    orderapi.messagelist({ orderby: 'r_main.seq' }, (messagelist) => {
      this.Base.setMyData({ messagelist })
    })

  }
  onMyShow() {
    var that = this;
    var num = [];
    var all = [];
    var UserInfo = this.Base.getMyData().UserInfo;
    var memberinfo = this.Base.getMyData().memberinfo;
    var orderapi = new OrderApi();
    // orderapi.enterpriselist({
    //   open_id: UserInfo.openid
    // }, (errlist) => {
    //   this.Base.setMyData({
    //     errlist
    //   })

    // })
    orderapi.enterpriseinfo({}, (errinfo) => {
      this.Base.setMyData({
        errinfo
      })
    })

    orderapi.applylist({ transport: "Y", company_id: memberinfo.id, orderstus:"A" }, (mlist) => {
      this.Base.setMyData({
        mlist
      });
    })

    orderapi.list({
      orderby: "r_main.created_date desc",
      getall: "Y",
      taskstatus:"1,2,3,5"
    }, (list) => {
      var memberinfo = this.Base.getMyData().memberinfo;

      orderapi.applylist({ newstatus: "Y" }, (applylist) => {
        for (var i = 0; i < list.length; i++) {
          all[i] = 0;
          for (var j = 0; j < applylist.length; j++) {
            if (list[i].id == applylist[j].order_id) {
              all[i]++;
              console.log(all);
            }
          }
        }
        this.Base.setMyData({
          applylist,
          all: all
        });
      });

      this.Base.setMyData({
        list
      });

    });

    orderapi.list({open_id: UserInfo.openid,orderby: "r_main.created_date desc",taskstatus: "1,2,3,5,"}, (minelist) => {
      
      

      //for (var i = 0; i < minelist.length; i++) {
      
        
     // }

      this.Base.setMyData({
        minelist
      });
      
    });

  }
  bindall(e) {
    console.log(e);
    this.Base.setMyData({
      allshow: 1,
      mineshow: 1
    });
    //this.onMyShow();
  }
  bindmine(e) {
    console.log(e);
    this.Base.setMyData({
      allshow: 2,
      mineshow: 2
    });
  }

  bindpickerstate(e) {
    console.log(e);
    var statuslist = this.Base.getMyData().statuslist;
    this.Base.setMyData({
      state_idx: e.detail.value,
      state_id: statuslist[e.detail.value].id,
      state_name: statuslist[e.detail.value].odrstatusname
    });
    var state_id = this.Base.getMyData().state_id;
    var orderapi = new OrderApi();
    orderapi.list({
      taskstatus: state_id,
      orderby: "r_main.created_date desc",
      getall: "Y"
    }, (list) => {
      this.Base.setMyData({
        list
      });
    });
    var UserInfo = this.Base.getMyData().UserInfo;
    // orderapi.list({
    //   open_id: UserInfo.openid,
    //   taskstatus: state_id,
    //   orderby: "r_main.created_date desc"
    // }, (minelist) => {
    //   this.Base.setMyData({
    //     minelist
    //   });
    // });

  }

  bindminepickerstate(e) {
    console.log(e);
    var statuslist = this.Base.getMyData().statuslist;
    this.Base.setMyData({
      state_idx1: e.detail.value,
      state_id_mine: statuslist[e.detail.value].id,
      state_name1: statuslist[e.detail.value].odrstatusname
    });
    var state_id_mine = this.Base.getMyData().state_id_mine;
    var orderapi = new OrderApi();
    // orderapi.list({
    //   taskstatus: state_id1,
    //   orderby: "r_main.created_date desc",
    //   getall: "Y"
    // }, (list) => {
    //   this.Base.setMyData({
    //     list
    //   });
    // });
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.list({
      open_id: UserInfo.openid,
      taskstatus: state_id_mine,
      orderby: "r_main.created_date desc"
    }, (minelist) => {
      this.Base.setMyData({
        minelist
      });
    });

  }
  one(e) {
    var errinfo = this.Base.getMyData().errinfo;

    if (errinfo == null || errinfo.status != "A") {
      wx.showModal({
        title: '未认证',
        content: '您是否需要前往企业认证',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#2699EC',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/certification/certification',
            })
          }
        }
      });
    } else {
      var id = e.currentTarget.id;
      var name = e.currentTarget.dataset.index;
      console.log(555555555555555555555);
      console.log(name);
      wx.navigateTo({
        url: '/pages/tasklist/tasklist?id=' + id + '&mineshow=' + 1 + '&all=' + name
      })
      // & all='+{{all[idx]}}
    }
  }

  mine(e) {
     var orderapi=new OrderApi();
     var id=e.currentTarget.id;
    orderapi.updatenewstatus({id:id }, (updatenewstatus) =>{
      this.Base.setMyData({ updatenewstatus})
    })
    
    var errinfo = this.Base.getMyData().errinfo;
    if (errinfo == null || errinfo.status != "A") {
      wx.showModal({
        title: '未认证',
        content: '您是否需要前往企业认证',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#2699EC',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/certification/certification',
            })
          }
        }
      });
    } else {
      var id = e.currentTarget.id;
      var mine = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '/pages/tasklist/tasklist?id=' + id + '&mineshow=' + 2 + '&mine=' + mine
      })
      // & all='+{{all[idx]}}
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindall = content.bindall;
body.bindmine = content.bindmine;
body.bindpickerstate = content.bindpickerstate; 
body.bindminepickerstate = content.bindminepickerstate; 
body.one = content.one;
body.mine = content.mine;

Page(body)