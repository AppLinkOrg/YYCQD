// pages/driver/driver.js
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
  date
} from "../../apis/order.api.js";
import {
  CertificateApi
} from "../../apis/certificate.api.js";
import {
  WechatApi
} from "../../apis/wechat.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      id: this.Base.options.id,

    })

  }
  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '任务详情',

    });
  }
  enrollcontact(e) {
    var elcontact = e.detail.value;
    console.log(elcontact);
    this.Base.setMyData({
      elcontact: e.detail.value
    })
  }

  onMyShow() {
    var that = this;
    var UserInfo = this.Base.getMyData().UserInfo;
    var orderapi = new OrderApi();
    var api = new CertificateApi();
    api.certificatelist({}, (list) => {
      that.Base.setMyData({
        list
      });
    })
    orderapi.applylist({
      transport: 'Y,N'
    }, (apylist) => {
      that.Base.setMyData({
        apylist
      });
    })
    orderapi.info({
      id: this.Base.options.id
    }, (info) => {
      this.Base.setMyData({
        info
      })
    })

    api.certificatexq({}, (driverinfo) => {
      this.Base.setMyData({
        driverinfo
      });
    });
    orderapi.vehiclelist({
      status: "A"
    }, (vehiclelist) => {
      this.Base.setMyData({
        vehiclelist
      })
    })

    var month;
    var month1;
    var month2;
    var month3;
    var day;
    var day1;
    var day2;
    var day3;
    var hh;
    var hh1;
    var hh2;
    var hh3;
    var mm;
    var mm1;
    var mm2;
    var mm3;


    var api = new OrderApi();
    api.info({

      id: this.Base.getMyData().id
    }, (info) => {

      var data1 = new Date(Date.parse(info.enroll_start.replace(/-/g, "/")));
      var data2 = new Date(Date.parse(info.enroll_deadline.replace(/-/g, "/")));
      var data3 = new Date(Date.parse(info.start_time.replace(/-/g, "/")));
      var data4 = new Date(Date.parse(info.end_time.replace(/-/g, "/")));
      month = data1.getMonth() + 1;
      month1 = data2.getMonth() + 1;
      month2 = data3.getMonth() + 1;
      month3 = data4.getMonth() + 1;
      day = data1.getDate();
      day1 = data2.getDate();
      day2 = data3.getDate();
      day3 = data4.getDate();
      hh = data1.getHours();
      hh1 = data2.getHours();
      hh2 = data3.getHours();
      hh3 = data4.getHours();
      mm = data1.getMinutes();
      mm1 = data2.getMinutes();
      mm2 = data3.getMinutes();
      mm3 = data4.getMinutes();
      if (month < 10) {
        month = "0" + month;
      }
      if (month1 < 10) {
        month1 = "0" + month1;
      }
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      if (month3 < 10) {
        month3 = "0" + month3;
      }

      if (day < 10) {
        day = "0" + day;
      }
      if (day1 < 10) {
        day1 = "0" + day1;
      }
      if (day2 < 10) {
        day2 = "0" + day2;
      }
      if (day3 < 10) {
        day3 = "0" + day3;
      }

      if (hh < 10) {
        hh = "0" + hh;
      }
      if (hh1 < 10) {
        hh1 = "0" + hh1;
      }
      if (hh2 < 10) {
        hh2 = "0" + hh2;
      }
      if (hh3 < 10) {
        hh3 = "0" + hh3;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      if (mm1 < 10) {
        mm1 = "0" + mm1;
      }
      if (mm2 < 10) {
        mm2 = "0" + mm2;
      }
      if (mm3 < 10) {
        mm3 = "0" + mm3;
      }

      this.Base.setMyData({
        month: month,
        day: day,
        hh: hh,
        mm: mm
      });
      this.Base.setMyData({
        month1: month1,
        day1: day1,
        hh1: hh1,
        mm1: mm1
      });
      this.Base.setMyData({
        month2: month2,
        day2: day2,
        hh2: hh2,
        mm2: mm2
      });
      this.Base.setMyData({
        month3: month3,
        day3: day3,
        hh3: hh3,
        mm3: mm3
      });
      info.applycount = parseInt(info.applycount);
      info.carcount = parseInt(info.carcount);
      info.totaldun = parseInt(info.totaldun);
      info.weight = parseInt(info.weight);
      this.Base.setMyData(info);
      console.log("编号" + info.enroll_id)
      orderapi.memberinfo({
        id: info.enroll_id
      }, (enrollinfo) => {
        this.Base.setMyData({
          enrollinfo
        });
      });

      orderapi.memberinfo({
        id: info.start_id
      }, (startinfo) => {
        this.Base.setMyData({
          startinfo
        });
      });

      orderapi.memberinfo({
        id: info.end_id
      }, (endinfo) => {
        this.Base.setMyData({
          endinfo
        });
      });
    });
  }

  tonnage(e) {
    var tonnage = e.detail.value;
    this.Base.setMyData({
      tonnage: e.detail.value
    })
    this.onMyShow();
  }

  bindenroll(e) {
    var vehiclelist = this.Base.getMyData().vehiclelist;
    this.Base.setMyData({
      enroll_idx: e.detail.value,
      enroll_id: vehiclelist[e.detail.value].id,
      enroll_carload: vehiclelist[e.detail.value].carload,
      elcontact: vehiclelist[e.detail.value].carnumber
    });
    this.onMyShow();
  }

  binddriver(e) {
    var driverphone = e.detail.value;
    this.Base.setMyData({
      driverphone: e.detail.value
    })
  }
  // num(e){
  //   var driverphone = e.detail.value;
  //   this.Base.setMyData({
  //     driverphone: e.detail.value
  //   })
  // }
  confirm(e) {
    var memberinfo = this.Base.getMyData().memberinfo;
    console.log("这句话" + memberinfo.mobile);
    //return;
    var driverinfo = this.Base.getMyData().driverinfo;
    var apylist = this.Base.getMyData().apylist;



    //console.log("sssss" + driverinfo.id)
    var enroll_carload = this.Base.getMyData().enroll_carload;
    console.log("fffffffffffffffffff" + enroll_carload)
    //return;
    var data = e.detail.value;
    var weight = this.Base.getMyData().weight;
    var totaldun = this.Base.getMyData().totaldun;
    var carcount = this.Base.getMyData().carcount;
    var applycount = this.Base.getMyData.applycount;
    console.log(weight);
    for (var i = 0; i < apylist.length; i++) {
      if (apylist[i].vehicle == data.elcontact) {
        this.Base.info("请该车辆已报,请联系平台或者联系同车队使用人员");
        return;
      }
    }
    if (data.tonnage == "") {
      this.Base.info("请输入客运吨数");
      return;
    }
    if (data.driverphone == "") {
      this.Base.info("请输入联系电话");
      return;
    }

    // if (parseInt(data.tonnage) > parseInt(weight)) {
    //   this.Base.info("不能大于剩余吨数");
    //   return;
    // }
    if (parseInt(data.tonnage) > parseInt(weight) - parseInt(totaldun)) {
      this.Base.info("不能大于剩余吨数");
      return;
    }
    if (parseInt(data.tonnage) > parseInt(enroll_carload)) {
      this.Base.info("不能大于车辆核载吨数");
      return;
    }
    if (parseInt(data.tonnage) <= 0) {
      this.Base.info("请填写大于零的数字");
      return;
    }
    if (this.Base.getMyData().elcontact == null) {
      this.Base.info("请选择车辆");
      return;
    }
    this.onMyShow();
    var drivermobile = data.driverphone;
    //console.log("萨克斯开始开始222222" + drivermobile)
    var tonnage = this.Base.getMyData().tonnage;
    // var driverphone = this.Base.getMyData().driverphone; 
    //  if(driverphone==""){
    //    this.Base.setMyData({
    //      drivermobile : memberinfo.mobile
    //    }) 

    //  }
    //  else{
    //    this.Base.setMyData({
    //      drivermobile :driverphone
    //    })
    //   // console.log("萨克斯开始开始"+drivermobile)
    //  }
    //var driverphone = this.Base.getMyData().driverphone; 

    //return;
    var orderid = this.Base.getMyData().id;
    var vehicle = this.Base.getMyData().elcontact;
    var that = this;
    var api = new CertificateApi();
    var UserInfo = this.Base.getMyData().UserInfo;
    var orderapi = new OrderApi();
    var enroll_carload = this.Base.getMyData().enroll_carload;


    var info = this.Base.getMyData().info;
    console.log(info.member_mobile + "yyyyyyyyyyyyyyyyyyyyyyy");
    //return;
    orderapi.addapply({
      status: "A",
      mobile: info.member_mobile,
      orderstus:"A",
      transport: "Y",
      contype: "B",
      orderid: orderid,
      tonnage: tonnage,
      driver_phone: drivermobile,
      vehicle: vehicle,
      newstatus: "Y",
      company_id: info.member_id,
      drivernewstatus: "N",
      member_name: info.enterprise_id_name,
      carriage_driver: driverinfo.id,
      car_load: enroll_carload,
      openid: UserInfo.openid,
      formid: e.detail.formId
    }, (ret) => {
      var driverinfo = this.Base.getMyData().driverinfo;
      if (driverinfo == null || driverinfo.status != "A") {
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
                url: '/pages/certificate/certificate',
              })
            }
          }
        });
      } else {

        if (ret.code == 0) {

          wx.navigateBack({

            })
            // ({
            //   url: '/pages/driver/driver'
            // }),
            wx.showToast({
              title: '报名成功',
              duration: 1000
            });
          var orderno = this.Base.getMyData().orderno;
          var member_mobile = this.Base.getMyData().member_mobile;
          //console.log("lllllllllllllllllllllllll" + member_mobile);
          //return;
          var certificateapi = new CertificateApi();
          var instinfo = that.Base.getMyData().instinfo;
          var sms = instinfo["sms7"];
          sms = sms.replace("$", orderno);
          certificateapi.sendsms({
            mobile: member_mobile,
            content: sms
          });
          //测试部分
        } else {
          var api = new WechatApi();

          api.prepay({
              id: ret.return
            },
            (ret) => {
              ret.success = function() {
                wx.navigateBack({
                  })
                  wx.showToast({
                    title: '报名成功',
                    duration: 1000
                  });

                var orderno = this.Base.getMyData().orderno;
                var member_mobile = this.Base.getMyData().member_mobile;
                //console.log("lllllllllllllllllllllllll" + member_mobile);
                //return;
                var certificateapi = new CertificateApi();
                var instinfo = that.Base.getMyData().instinfo;
                var sms = instinfo["sms7"];
                sms = sms.replace("$", orderno);
                certificateapi.sendsms({
                  mobile: member_mobile,
                  content: sms
                });

              }
              wx.requestPayment(ret)
            });

         


        }

      }
    });

  }
  onUnload() {
    clearInterval();
  }
  btnshowtost() {
    wx.showToast({
      title: '报名人数或剩余货运吨数已达到上限!',
      icon: 'none',
      image: '',
      duration: 1500,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();

body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tonnage = content.tonnage;
body.binddriver = content.binddriver;
body.confirm = content.confirm;
body.enrollcontact = content.enrollcontact;
body.bindenroll = content.bindenroll;
body.btnshowtost = content.btnshowtost;
body.num = content.num;
Page(body)