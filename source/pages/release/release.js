// pages/release/release.js
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
import {
  WechatApi
} from "../../apis/wechat.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    var orderapi = new OrderApi();
    orderapi.goodslist({
      orderby: "r_main.seq"
    }, (goodslist) => {
      this.Base.setMyData({
        goodslist
      });
    });
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.enterpriseinfo({}, (errinfo) => {
      this.Base.setMyData({
        errinfo
      })
    })
    this.Base.setMyData({
      startdate: "",
      starttime: "",
      endtime: "",
      enddate: "",
      tsttime: "",
      tstdate: "",
      today: this.Base.util.FormatDate(new Date())
    });


    // var errinfo = this.Base.getMyData().errinfo;
    // if (errinfo == null || errinfo.status == "I") {
    //   wx.showModal({
    //     title: '未认证',
    //     content: '请等待认证结果',
    //     showCancel: false,
    //     // cancelText: '取消',
    //     cancelColor: '#EE2222',
    //     confirmText: '确定',
    //     confirmColor: '#2699EC',
    //     success: function (res) {
    //       if (res.confirm) {
    //         wx.reLaunch({
    //           url: '/pages/home/home',
    //         })
    //       }
    //     }
    //   });
    // }

  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: '任务发布',
    });
    var orderapi = new OrderApi();
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.enterpriseinfo({}, (errinfo) => {
      this.Base.setMyData({
        errinfo
      });
      if (errinfo == null || errinfo.status != "A") {
        wx.showModal({
          title: '未认证',
          content: '请您进行企业认证',
          showCancel: false,
          //cancelText: '取消',
          cancelColor: '#EE2222',
          confirmText: '确定',
          confirmColor: '#2699EC',
          duration: 300,
          success: function(res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '/pages/certification/certification',
              })
            }
          }
        });
      }
    })

    orderapi.memberlist({status:"A"}, (memberlist) => {
      this.Base.setMyData({
        memberlist
      });
    });

  }
  start(e) {
    console.log(e);
    var startdate = this.Base.getMyData().startdate;
    var starttime = this.Base.getMyData().starttime;
    if (startdate == "" || starttime == "") {
      wx.showToast({
        title: '请先选择报名\n开始日期!',
        icon: 'none',
        duration: 1000
      })
    }
  }
  end(e) {
    console.log(e);
    var enddate = this.Base.getMyData().enddate;
    var endtime = this.Base.getMyData().endtime;
    if (enddate == "" || endtime == "") {
      wx.showToast({
        title: '请先选择报名\n截止日期!',
        icon: 'none',
        duration: 1000
      })
    }
  }
  ttstart(e) {
    console.log(e);
    var tstdate = this.Base.getMyData().tstdate;
    var tsttime = this.Base.getMyData().tsttime;
    if (tstdate == "" || tsttime == "") {
      wx.showToast({
        title: '请先选择运输\n开始日期!',
        icon: 'none',
        duration: 1000
      })
    }
  }

  openRoute() {
    var route = this.Base.getMyData().route;
    console.log(route);
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
  dataReturnCallback(callbackid, data) {
    console.log("callbackid");
    console.log(callbackid);
    var that = this;
    if (callbackid == "route") {
      var route = data.route;
      var startaddress = route[0].address;
      var startlat = route[0].location.lat;
      var startlng = route[0].location.lng;
      var targetaddress = route[1].address;
      var targetlat = route[1].location.lat;
      var targetlng = route[1].location.lng;
      var distance = data.distance;
      var duration = data.duration;
      that.Base.setMyData({
        route: route,
        startaddress,
        startlat,
        startlng,
        targetaddress,
        targetlat,
        targetlng,
        distance,
        duration
      });
    }
  }
  bindgoods(e) {
    var goodslist = this.Base.getMyData().goodslist;
    this.Base.setMyData({
      goods_idx: e.detail.value,
      goods_id: goodslist[e.detail.value].id,
      goodstype: goodslist[e.detail.value].name
    });
  }
  bindenroll(e) {
    var enrolllist = this.Base.getMyData().memberlist;
    this.Base.setMyData({
      enroll_idx: e.detail.value,
      enroll_id: enrolllist[e.detail.value].id,
      elcontact: enrolllist[e.detail.value].name
    });
  }
  bindstartcontact(e) {
    var startcontactlist = this.Base.getMyData().memberlist;
    this.Base.setMyData({
      startcontact_idx: e.detail.value,
      startcontact_id: startcontactlist[e.detail.value].id,
      stcontact: startcontactlist[e.detail.value].name
    });
  }
  bindendcontact(e) {
    var endcontactlist = this.Base.getMyData().memberlist;
    this.Base.setMyData({
      endcontact_idx: e.detail.value,
      endcontact_id: endcontactlist[e.detail.value].id,
      edcontact: endcontactlist[e.detail.value].name
    });
  }

  bindstartdate(e) {
    console.log(e);
    var that = this;
    this.setData({
      startdate: e.detail.value
    })
    var enddate = this.Base.getMyData().enddate;
    var startdate = this.Base.getMyData().startdate;

    var date = new Date(startdate);
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    this.Base.setMyData({
      startdatenextday: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    })
    // var houdate = new Date(enddate);
    // houdate.setTime(houdate.getTime() - 24 * 60 * 60 * 1000);

    if (enddate != "") {
      this.Base.setMyData({
        enddate: "",
        tstdate: "",
        starttime: "",
        endtime: "",
        tsttime: "",
        tstenddate: "",
        tstendtime: ""
      })
    }


  }

  bindstarttime(e) {
    console.log(e);
    this.setData({
      starttime: e.detail.value
    })
    var startdate = this.Base.getMyData().startdate;
    var enddate = this.Base.getMyData().enddate;
    var starttime = this.Base.getMyData().starttime;
    var endtime = this.Base.getMyData().endtime;
    if (startdate == enddate && endtime < starttime) {
      this.Base.setMyData({
        starttime: endtime
      })
    }
  }

  bindenddate(e) {
    this.setData({
      enddate: e.detail.value
    })
    var startdate = this.Base.getMyData().startdate;
    var enddate = this.Base.getMyData().enddate;
    var tstdate = this.Base.getMyData().tstdate;

    var enddate = new Date(enddate);
    enddate.setTime(enddate.getTime() + 24 * 60 * 60 * 1000);
    this.Base.setMyData({
      enddatenextday: enddate.getFullYear() + "-" + (enddate.getMonth() + 1) + "-" + enddate.getDate()
    })
    // if (startdate > enddate) {
    //   this.Base.setMyData({
    //     enddate: startdate
    //   })
    // }
    // if (tstdate < enddate) {
    //   this.Base.setMyData({
    //     enddate: tstdate
    //   })
    // }
    if (tstdate != "") {
      this.Base.setMyData({
        tstdate: "",
        tsttime: "",
        tstenddate: "",
        tstendtime: ""
      })
    }
  }

  bindendtime(e) {
    this.setData({
      endtime: e.detail.value
    })
    var startdate = this.Base.getMyData().startdate;
    var enddate = this.Base.getMyData().enddate;
    var tstdate = this.Base.getMyData().tstdate;
    var starttime = this.Base.getMyData().starttime;
    var endtime = this.Base.getMyData().endtime;
    var tsttime = this.Base.getMyData().tsttime;
    // if (startdate == enddate && endtime < starttime) {
    //   this.Base.setMyData({
    //     endtime: starttime
    //   })
    // }
    // if (tstdate == enddate && endtime > tsttime) {
    //   this.Base.setMyData({
    //     endtime: tsttime
    //   })
    // }

  }

  tst_startdate(e) {
    this.setData({
      tstdate: e.detail.value
    })
    var tstdate = this.Base.getMyData().tstdate;
    var enddate = this.Base.getMyData().enddate;
    var tstenddate = this.Base.getMyData().tstenddate;

    var tstdate = this.Base.getMyData().tstdate;

    var tstdate = new Date(tstdate);
    tstdate.setTime(tstdate.getTime() + 24 * 60 * 60 * 1000);
    this.Base.setMyData({
      tststartdatenextday: tstdate.getFullYear() + "-" + (tstdate.getMonth() + 1) + "-" + tstdate.getDate()
    })
    // if (tstdate < enddate) {
    //   this.Base.setMyData({
    //     tstdate: enddate
    //   })
    // }
    // if (tstenddate < tstdate) {
    //   this.Base.setMyData({
    //     tstdate: tstenddate
    //   })
    // }
    if (tstenddate != "") {
      this.Base.setMyData({
        tstenddate: "",
        tstendtime: ""
      })
    }
  }

  tst_starttime(e) {
    this.setData({
      tsttime: e.detail.value
    })
    var tstdate = this.Base.getMyData().tstdate;
    var tstenddate = this.Base.getMyData().tstenddate;
    var tsttime = this.Base.getMyData().tsttime;
    var tstendtime = this.Base.getMyData().tstendtime;
    var enddate = this.Base.getMyData().enddate;
    var endtime = this.Base.getMyData().endtime;
    // if (tstdate == tstenddate && tstendtime < tsttime) {
    //   this.Base.setMyData({
    //     tsttime: tstendtime
    //   })
    // }
    // if (tstdate == enddate && endtime > tsttime) {
    //   this.Base.setMyData({
    //     tsttime: endtime
    //   })
    // }
  }
  tst_enddate(e) {
    this.setData({
      tstenddate: e.detail.value
    })
    var tstdate = this.Base.getMyData().tstdate;
    var tstenddate = this.Base.getMyData().tstenddate;
    // if (tstenddate < tstdate) {
    //   this.Base.setMyData({
    //     tstenddate: tstdate
    //   })
    // }
  }
  tst_endtime(e) {
    this.setData({
      tstendtime: e.detail.value
    })
    var tstdate = this.Base.getMyData().tstdate;
    var tstenddate = this.Base.getMyData().tstenddate;
    var tsttime = this.Base.getMyData().tsttime;
    var tstendtime = this.Base.getMyData().tstendtime;
    // if (tstdate == tstenddate && tstendtime < tsttime) {
    //   this.Base.setMyData({
    //     tstendtime: tsttime
    //   })
    // }

  }

  // binddt(e) {
  //   var date = e.detail.value;
  //   console.log(date);
  //   this.Base.setMyData({
  //     date: e.detail.value
  //   })
  // }
  bindrelease(e) {
    var orderapi = new OrderApi();
    orderapi.create({}, (create) => {
      this.Base.setMyData({
        create
      })
    })
  }
  startcontactdate(e) {
    var scdate = e.detail.value;
    console.log(scdate);
    this.Base.setMyData({
      scdate: e.detail.value
    })
  }
  startcontacttime(e) {
    var sctime = e.detail.value;
    console.log(sctime);
    this.Base.setMyData({
      sctime: e.detail.value
    })
  }
  endcontactdate(e) {
    var ecdate = e.detail.value;
    console.log(ecdate);
    this.Base.setMyData({
      ecdate: e.detail.value
    })
  }
  endcontacttime(e) {
    var ectime = e.detail.value;
    console.log(endcontacttime);
    this.Base.setMyData({
      ectime: e.detail.value
    })
  }

  starttransportdate(e) {
    var stpdate = e.detail.value;
    console.log(stpdate);
    this.Base.setMyData({
      stpdate: e.detail.value
    })
  }
  starttransporttime(e) {
    var stptime = e.detail.value;
    console.log(stptime);
    this.Base.setMyData({
      stptime: e.detail.value
    })
  }
  endtransportdate(e) {
    var etpdate = e.detail.value;
    console.log(etpdate);
    this.Base.setMyData({
      etpdate: e.detail.value
    })
  }
  endtransporttime(e) {
    var etptime = e.detail.value;
    console.log(etptime);
    this.Base.setMyData({
      etptime: e.detail.value
    })
  }
  goodsweight(e) {
    var gdsweight = e.detail.value;
    console.log(gdsweight);
    this.Base.setMyData({
      gdsweight: e.detail.value
    })
  }
  goodstype(e) {
    var gdstype = e.detail.value;
    console.log(gdstype);
    this.Base.setMyData({
      gdstype: e.detail.value
    })
  }
  cost(e) {
    var tstcost = e.detail.value;
    console.log(tstcost);
    this.Base.setMyData({
      tstcost: e.detail.value
    })
  }
  carnumber(e) {
    var carnum = e.detail.value;
    console.log(carnum);
    this.Base.setMyData({
      carnum: e.detail.value
    })
  }
  enrollcontact(e) {
    var elcontact = e.detail.value;
    console.log(elcontact);
    this.Base.setMyData({
      elcontact: e.detail.value
    })
  }
  startcontact(e) {
    var stcontact = e.detail.value;
    console.log(stcontact);
    this.Base.setMyData({
      stcontact: e.detail.value
    })
  }
  endcontact(e) {
    var edcontact = e.detail.value;
    console.log(edcontact);
    this.Base.setMyData({
      edcontact: e.detail.value
    })
  }
  bindremark(e) {
    var remark = e.detail.value;
    console.log(remark);
    this.Base.setMyData({
      remark: e.detail.value
    })
  }

  // bindcompanyname(e) {
  //   var companyname = e.detail.value;
  //   console.log(companyname);
  //   this.Base.setMyData({
  //     companyname: e.detail.value
  //   })
  // }

  startaddress(e) {
    var startaddress = e.detail.value;
    console.log(startaddress);
    this.Base.setMyData({
      startaddress: e.detail.value
    })
  }
  endaddress(e) {
    var endaddress = e.detail.value;
    console.log(endaddress);
    this.Base.setMyData({
      endaddress: e.detail.value
    })
  }
  // binddistance(e) {
  //   var distance = e.detail.value;
  //   console.log(distance);
  //   this.Base.setMyData({
  //     distance: e.detail.value
  //   })
  // }



  confirm(e) {
    var that=this;
    var data = e.detail.value;
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
    }
    if (errinfo == null || errinfo.status != "A") {
      this.Base.info("您暂未进行认证，请先认证!");
      return;
    }
    if (data.scdate == "") {
      this.Base.info("请选择报名开始日期");
      return;
    }
    // if (data.sctime == "") {
    //   this.Base.info("请选择报名开始时间");
    //   return;
    // }
    if (data.ecdate == "") {
      this.Base.info("请选择报名截止日期");
      return;
    }
    if (data.start_company == "") {
      this.Base.info("请输入起点企业名");
      return;
    }
    if (data.end_company == "") {
      this.Base.info("请输入终点企业名");
      return;
    }
    if (data.startaddress == "") {
      this.Base.info("请输入装车地址");
      return;
    }
    if (data.endaddress == "") {
      this.Base.info("请输入目的地址");
      return;
    }
    // if (data.ectime == "") {
    //   this.Base.info("请选择报名截止时间");
    //   return;
    // }
    if (data.stpdate == "") {
      this.Base.info("请选择运输开始日期");
      return;
    }
    // if (data.stptime == "") {
    //   this.Base.info("请选择运输开始时间");
    //   return;
    // }
    if (data.etpdate == "") {
      this.Base.info("请选择运输结束日期");
      return;
    }
    if (data.etptime == "") {
      this.Base.info("请选择运输结束时间");
      return;
    }
    if (data.carnumber == "") {
      this.Base.info("请输入车辆数目");
      return;
    }
    if (data.gdsweight == "") {
      this.Base.info("请输入货物吨数");
      return;
    }
    if (data.gdstype == "") {
      this.Base.info("请选择货运类型");
      return;
    }
    if (data.tstcost == "") {
      this.Base.info("请输入运输费用");
      return;
    }
    if (data.elcontact == "") {
      this.Base.info("请选择报名联系人");
      return;
    }
    

    var startdate = this.Base.getMyData().startdate;
    var starttime = this.Base.getMyData().starttime;
    var enddate = this.Base.getMyData().enddate;
    var endtime = this.Base.getMyData().endtime;
    var tstdate = this.Base.getMyData().tstdate;
    var tsttime = this.Base.getMyData().tsttime;
    var tstendtime = this.Base.getMyData().tstendtime;
    var tstenddate = this.Base.getMyData().tstenddate;
    var carnum = this.Base.getMyData().carnum;
    var start_company = data.start_company;
    var end_company = data.end_company;
    var startaddress = this.Base.getMyData().startaddress;
    var targetaddress = this.Base.getMyData().targetaddress;
    var startlat = this.Base.getMyData().startlat;
    var startlng = this.Base.getMyData().startlng;
    var targetlat = this.Base.getMyData().targetlat;
    var targetlng = this.Base.getMyData().targetlng;
    var distance = this.Base.getMyData().distance;
    var duration = this.Base.getMyData().duration;
    var etptime = this.Base.getMyData().etptime;
    var gdsweight = this.Base.getMyData().gdsweight;
    var goodstype = this.Base.getMyData().goodstype;
    var tstcost = this.Base.getMyData().tstcost;
    var elcontact = this.Base.getMyData().elcontact;
    var enroll_id = this.Base.getMyData().enroll_id;
    var remark = this.Base.getMyData().remark;
    var today = this.Base.getMyData().today;
    var time = this.Base.getMyData().time;
    var check = this.Base.getMyData().check;
    var orderapi = new OrderApi();
    var UserInfo = this.Base.getMyData().UserInfo;
    if (errinfo != null) {
      var companyname = this.Base.getMyData().errinfo.id;
    }
    console.log(companyname);


    var timestamp = Date.parse(new Date()) / 1000;
    var scdate = Date.parse(data.scdate) / 1000;
    if (scdate > timestamp) {
      this.Base.setMyData({ st: 3 })
    }
    else {
      this.Base.setMyData({ st: 1 })
    }
    var st = this.Base.getMyData().st;


    orderapi.create({
      status: "A",
      taskstatus: st,
      cmptask: check,
      open_id: UserInfo.openid,
      enroll_start: startdate + " " + starttime,
      enroll_deadline: enddate + " " + endtime,
      start_time: tstdate + " " + tsttime,
      end_time: tstenddate + " " + tstendtime,
      submit_date: today,
      startaddress: startaddress,
      
      start_company: start_company,
      end_company: end_company,
      startlat: startlat,
      startlng: startlng,

      targetaddress: targetaddress,

      targetlat: targetlat,
      targetlng: targetlng,

      distance: distance,
      duration: duration,
      weight: gdsweight,
      carcount: carnum,
      stuff_type_id: goodstype,
      unitprice: tstcost,
      enroll_contact: elcontact,
      enroll_id: enroll_id,
      // start_contact: stcontact,
      // end_contact: edcontact,
      // start_id: start_id,
      // end_id:end_id,
      remark: remark,
      enterprise_id: companyname
    }, (ret) => {
      if(ret.code==0){

        wx.reLaunch({
          url: '/pages/home/home'
        })

        that.onMyShow();
        wx.showToast({
          title: '发布成功',
          duration: 1000
        });
      } else if (ret.code == 1) {
        var api = new WechatApi();
        api.prepayc({id:ret.return
        },
          (ret) => {
            ret.success = function () {
              wx.reLaunch({
                url: '/pages/home/home'
              })
              that.onMyShow();
              wx.showToast({
                title: '发布成功',
                duration: 1000
              });
            }
            wx.requestPayment(ret);
          });
      }
    })
  }

  openRoute() {
    var route = this.Base.getMyData().route;
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
  checkchange(e) {
    var check = e.detail.value;
    console.log(check);
    this.Base.setMyData({
      check: e.detail.value
    })
  }
  bindALL(e) {
    var errinfo = this.Base.getMyData().errinfo;
    if (errinfo == null || errinfo.status == "A") {
      this.Base.setMyData({

      });
      wx.showModal({
        title: '未认证',
        content: '请您进行企业认证',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#2699EC',
        success: function(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/certification/certification',
            })

          }
        }
      });
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.bindALL = content.bindALL;
body.onMyShow = content.onMyShow;
body.checkchange = content.checkchange;
// body.binddistance = content.binddistance; 
body.bindgoods = content.bindgoods;
body.bindstartdate = content.bindstartdate;
body.bindenddate = content.bindenddate;
body.bindstarttime = content.bindstarttime;
body.bindendtime = content.bindendtime;
body.bindenroll = content.bindenroll;
body.bindstartcontact = content.bindstartcontact;
body.bindendcontact = content.bindendcontact;
body.tst_enddate = content.tst_enddate;
body.tst_endtime = content.tst_endtime;
body.tst_startdate = content.tst_startdate;
body.tst_starttime = content.tst_starttime;
body.bindrelease = content.bindrelease;
body.startcontactdate = content.startcontactdate;
body.startcontacttime = content.startcontacttime;
body.endcontactdate = content.endcontactdate;
body.endcontacttime = content.endcontacttime;
body.starttransportdate = content.starttransportdate;
body.starttransporttime = content.starttransporttime;
body.endtransportdate = content.endtransportdate;
body.endtransporttime = content.endtransporttime;
body.goodsweight = content.goodsweight;
body.goodstype = content.goodstype;
body.cost = content.cost;
body.enrollcontact = content.enrollcontact;
body.startcontact = content.startcontact;
body.endcontact = content.endcontact;
body.bindremark = content.bindremark;
body.confirm = content.confirm;
body.carnumber = content.carnumber;
body.openRoute = content.openRoute;
body.startaddress = content.startaddress;
body.endaddress = content.endaddress;
body.start = content.start;
body.end = content.end;
body.ttstart = content.ttstart;
body.openRoute = content.openRoute;
// body.bindcompanyname = content.bindcompanyname;
Page(body)