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
  CertificateApi
} from "../../apis/certificate.api.js";
var utils = require('../../utils/util.js')

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5; 
    this.Base.setMyData({
      today: this.Base.util.FormatDate(new Date()),
      todayspan: Date.parse(new Date()) / 1000
    })
    

    wx.setStorageSync("lastlogin", "D");

    this.setData({
      array: ['所有', '离我最近', '费用最高'],
      objectArray: [{
          id: 0,
          name: '所有'
        },
        {
          id: 1,
          name: '离我最近'
        },
        {
          id: 2,
          name: '费用最高'
        }

      ],
      index: 0,
      tab: 0

    })
    this.Base.setMyData({
      list: [],
      ybm: [],
      dwc: [],
      orderby: ""
    })
    this.Countdown();
    this.one();
    this.binddwc();
    super.onLoad(options);
  }


  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '司机首页',

    });
  }
  sj(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  onMyShow() {
    var that = this;
    this.Base.getAddress((location) => {
      console.log(location);
      //查询所有列表 
      var orderapi = new OrderApi();
      var api = new CertificateApi();
      
      var api = new CertificateApi();

      api.certificatexq({}, (driverinfo) => {
        this.Base.setMyData({
          driverinfo
        });
      });


      orderapi.messagelist({
        orderby: 'r_main.seq'
      }, (messagelist) => {
        this.Base.setMyData({
          messagelist
        })
      })
      
      var orderby = this.Base.getMyData().orderby;

      var driverinfo=this.Base.getMyData().driverinfo;
      //var id = this.Base.getMyData().driverinfo.id;
      //console.log("MMMMMMMMMMMM" + id)
      //carriage_driver: driverinfo.id
      var memberinfo=this.Base.getMyData().memberinfo;
      var driver_id=6553598;
      if (driverinfo!=undefined){
        driver_id=driverinfo.id;
      }
      orderapi.applylist({ carriage_driver: driver_id,transport:"Y,N"}, (list1) => {
        orderapi.list({
          getall: "Y",
          mylat: location.location.lat,
          mylng: location.location.lng,
          orderby: orderby
        }, (list) => {
          var year = new Array();
          var month = new Array();
          var year1 = new Array();
          var month1 = new Array();
          var days = new Array();
          var day = new Array();
          var day1 = new Array();
          var days = new Array()
          var hh = new Array();
          var mm = new Array();
          var hh1 = new Array();
          var mm1 = new Array();
          var sj = new Array();
          var year2 = new Array();
          var month2 = new Array();
          var day2 = new Array();
          var hh2 = new Array();
          var mm2 = new Array();
          var year3 = new Array();
          var month3 = new Array();
          var day3 = new Array();
          var hh3 = new Array();
          var mm3 = new Array();
          var year4 = new Array();
          var month4 = new Array();
          var day4 = new Array();
          var hh4 = new Array();
          var mm4 = new Array();
          var num = 0;
          var xs = new Array();
          //循环转化时间
          for (var i = 0; i < list.length; i++) {
            var dqsj = Date.parse(new Date()) / 1000;
            var sjc = list[i].enroll_deadline_timespan;
            var sjj = sjc - dqsj;
            console.log(sjj);
            days[i] = parseInt((sjj + 3600 * 24) / (3600 * 24));
            xs[i] = parseInt((sjj) / (3600));
            console.log(days[i]);
            sj[i] = utils.sjc(sjj, 'm:s');
            var myDate = new Date(Date.parse(list[i].enroll_deadline.replace(/-/g, "/")));
            year[i] = myDate.getFullYear();
            month[i] = myDate.getMonth() + 1;
            day[i] = myDate.getDate();
            hh[i] = myDate.getHours();
            mm[i] = myDate.getMinutes();
            if (month[i] < 10) {
              month[i] = '0' + month[i];
            }
            if (day[i] < 10) {
              day[i] = '0' + day[i];
            }
            if (hh[i] < 10) {
              hh[i] = '0' + hh[i];
            }
            if (mm[i] < 10) {
              mm[i] = '0' + mm[i];
            }
          }
          for (var i = 0; i < list1.length; i++) {
            if (list1[i].transport_name == "已报名") {
              var myDate1 = new Date(Date.parse(list1[i].order_start_time.replace(/-/g, "/")));
              var myDate2 = new Date(Date.parse(list1[i].order_end_time.replace(/-/g, "/")));
              year1[i] = myDate1.getFullYear();
              month1[i] = myDate1.getMonth() + 1;
              day1[i] = myDate1.getDate();
              hh1[i] = myDate1.getHours();
              mm1[i] = myDate1.getMinutes();
              if (month1[i] < 10) {
                month1[i] = '0' + month1[i];
              }
              if (day1[i] < 10) {
                day1[i] = '0' + day1[i];
              }
              if (hh1[i] < 10) {
                hh1[i] = '0' + hh1[i];
              }
              if (mm1[i] < 10) {
                mm1[i] = '0' + mm1[i];
              }
              var myDate2 = new Date(Date.parse(list1[i].order_end_time.replace(/-/g, "/")));
              year2[i] = myDate2.getFullYear();
              month2[i] = myDate2.getMonth() + 1;
              day2[i] = myDate2.getDate();
              hh2[i] = myDate2.getHours();
              mm2[i] = myDate2.getMinutes();
              if (month2[i] < 10) {
                month2[i] = '0' + month2[i];
              }
              if (day2[i] < 10) {
                day2[i] = '0' + day2[i];
              }
              if (hh2[i] < 10) {
                hh2[i] = '0' + hh2[i];
              }
              if (mm2[i] < 10) {
                mm2[i] = '0' + mm2[i];
              }
            }
            if (list1[i].transport_name == "待完成") {
              var myDate3 = new Date(Date.parse(list1[i].order_start_time.replace(/-/g, "/")));
              var myDate4 = new Date(Date.parse(list1[i].order_end_time.replace(/-/g, "/")));
              year3[i] = myDate3.getFullYear();
              month3[i] = myDate3.getMonth() + 1;
              day3[i] = myDate3.getDate();
              hh3[i] = myDate3.getHours();
              mm3[i] = myDate3.getMinutes();
              if (month3[i] < 10) {
                month3[i] = '0' + month3[i];
              }
              if (day3[i] < 10) {
                day3[i] = '0' + day3[i];
              }
              if (hh3[i] < 10) {
                hh3[i] = '0' + hh3[i];
              }
              if (mm3[i] < 10) {
                mm3[i] = '0' + mm3[i];
              }
              list1[i].day3 = day3[i];
              list1[i].month3 = month3[i];
              list1[i].hh3 = hh3[i];
              list1[i].mm3 = mm3[i];
              year4[i] = myDate4.getFullYear();
              month4[i] = myDate4.getMonth() + 1;
              day4[i] = myDate4.getDate();
              hh4[i] = myDate4.getHours();
              mm4[i] = myDate4.getMinutes();
              if (month4[i] < 10) {
                month4[i] = '0' + month4[i];
              }
              if (day4[i] < 10) {
                day4[i] = '0' + day4[i];
              }
              if (hh4[i] < 10) {
                hh4[i] = '0' + hh4[i];
              }
              if (mm4[i] < 10) {
                mm4[i] = '0' + mm4[i];
              }
              list1[i].day4 = day4[i];
              list1[i].month4 = month4[i];
              list1[i].hh4 = hh4[i];
              list1[i].mm4 = mm4[i];
            }
          }
          //循环找出新任务中已报名
          var UserInfo = this.Base.getMyData().UserInfo;
          var bm = [];
          var ybm = [];
          var dwc = [];

          var driverinfo=this.Base.getMyData().driverinfo;


          for (var a = 0; a < list.length; a++) {
            bm[a] = 0;
            for (var b = 0; b < list1.length; b++) {
              if (list[a].id == list1[b].order_id) {
                bm[a]++;
              }
              if (list[a].id == list1[b].order_id && list1[b].transport_name == "已报名"  ) {
                
                ybm.push(list1[b]);
              }
              //&& driverinfo.name == list1[b].carriage_driver
              if (list[a].id == list1[b].order_id && list1[b].transport_name == "待完成" ) {
                
                dwc.push(list1[b]);
              }
              
              if (list[a].id == list1[b].order_id && UserInfo.openid == list1[b].openid && list1[b].transport == "Y" && list1[b].contype == "B"  ) {
                list[a].status = "O";
              }
              if (list[a].id == list1[b].order_id && UserInfo.openid == list1[b].openid && list1[b].transport == "N" && list1[b].contype == "B") {
                list[a].status = "M";
              }
              if (list[a].id == list1[b].order_id && UserInfo.openid == list1[b].openid && list1[b].transport == "L" && list1[b].contype == "A" ) {
                list[a].status = "A";
              }
              
            }
            if (list[a].taskstatus_name == "报名中" && list[a].status == "A" && days[a] > 0) {
              num++;
            }
          }
          this.Base.setMyData({
            num: num,
            year: year,
            month: month,
            day: day,
            days: days,
            sj: sj,
            bm: bm,
            hh: hh,
            xs: xs,
            mm: mm,
            year1: year1,
            month1: month1,
            day1: day1,
            hh1: hh1,
            mm1: mm1,
            year2: year2,
            month2: month2,
            day2: day2,
            hh2: hh2,
            mm2: mm2,
            year3: year3,
            month3: month3,
            day3: day3,
            hh3: hh3,
            mm3: mm3,
            year4: year4,
            month4: month4,
            day4: day4,
            hh4: hh4,
            mm4: mm4,

          });
          orderapi.applylist({
            member_id: memberinfo.id,
            transport: "N",
            drivernewstatus: "Y",
          }, () => {

            this.Base.setMyData({
              ybm: ybm,

              dwc: dwc
            });

          })
          this.Base.setMyData({
            list1: list1
          });
          this.Base.setMyData({
            list
          });
        });
      })

      orderapi.applylist({
        drivernewstatus: "Y",
        transport: "N"
      }, (waitlist) => {
        this.Base.setMyData({
          waitlist
        });
      })
    });
  }
  qwe(e) {
    var i = e.detail.value;
    var orderby = "";
    if (i == 1) {
      orderby = " juliwo";
    }
    if (i == 2) {
      orderby = " unitprice desc";
    }
    console.log(i);
    this.setData({
      index: e.detail.value,
      orderby: orderby
    });
    this.onMyShow();
  }
  changetab(e) {
    this.Base.setMyData({
      tab: e.currentTarget.id
    });
    this.onMyShow();
  }
  onUnload() {
    console.log(66666);
    clearInterval(this.timer);
    clearInterval(this.timer1);
    clearInterval(this.timer2);
 
  }

  Countdown() {
    var that = this;

    console.log(this.time);
    clearInterval(this.time);

    this.timer = setInterval(() => {

      var list = this.Base.getMyData().list;
      var days = new Array()
      var sj = new Array();
      var xs = new Array();
      var num = 0;
      //循环转化时间
      for (var i = 0; i < list.length; i++) {
        var dqsj = Date.parse(new Date()) / 1000;
        var sjc = list[i].enroll_deadline_timespan;
        var sjj = sjc - dqsj;
        days[i] = parseInt((sjj + 3600 * 24) / (3600 * 24));
        xs[i] = parseInt((sjj) / 3600);
        sj[i] = utils.sjc(sjj, 'm:s')
      }
      
      content.setMyData({
        days: days,
        sj: sj,
        xs: xs
      })

    }, 1000);

  }
  one(ybm) {
    var that = this;

    console.log(this.time1);
    clearInterval(this.time1);
    this.timer1 = setInterval(() => {
      var ybm = this.Base.getMyData().ybm;

      var days = new Array()
      var sj = new Array();
      var xs = new Array();
      var num = 0;
      //循环转化时间

      for (var i = 0; i < ybm.length; i++) {
        var dqsj = Date.parse(new Date()) / 1000;
        var mydata = ybm[i].order_enroll_deadline;
        mydata = mydata.replace(/-/g, '/');
        var sjc = Date.parse(mydata) / 1000;
        
        var sjj = sjc - dqsj;
    
        if (sjj <= 0) {
          days[i] = 0,
            xs[i] = "00",
            sj[i] = "00:00"
        }
        else {
          days[i] = parseInt((sjj + 3600 * 24) / (3600 * 24));
          xs[i] = parseInt((sjj) / 3600);
          sj[i] = utils.sjc(sjj, 'm:s');
        }

        // days[i] = parseInt((sjj + 3600 * 24) / (3600 * 24));
        // xs[i] = parseInt((sjj) / 3600);
        // sj[i] = utils.sjc(sjj, 'm:s')
        
      }
       
        content.setMyData({
          days1: days,
          sj1: sj,
          xs1: xs
        })
      
      
      //console.log( sjc + "啊啊啊");
    }, 1000);

  }
  binddwc(dwc) {
    var that = this;
    console.log(this.time2);
    clearInterval(this.time2);
    this.timer2 = setInterval(() => {
      var dwc = this.Base.getMyData().dwc;
      var days = new Array()
      var sj = new Array();
      var xs = new Array();
      var num = 0;
      //循环转化时间

      for (var i = 0; i < dwc.length; i++) {

        var dqsj = Date.parse(new Date()) / 1000;
        // var mydata2 = Date.parse(new Date());
        // mydata2 = mydata2.replace(/-/g, '/');
        // var dqsj = Date.parse(mydata2) / 1000;

        var mydata = dwc[i].order_end_time;
        mydata = mydata.replace(/-/g, '/');
        var sjc = Date.parse(mydata) / 1000;

        var sjj = sjc - dqsj;
        console.log(sjc + "wwwwwwwwwwwwwwwwwwww");

        if (sjj <= 0){
          days[i]=0,
          xs[i]="00",
          sj[i]="00:00"
        }
        else{
          days[i] = parseInt((sjj + 3600 * 24) / (3600 * 24));
          xs[i] = parseInt((sjj) / 3600);
          sj[i] = utils.sjc(sjj, 'm:s');
        }
        
      }
     
           
        content.setMyData({
          days2: days,
          sj2: sj,
          xs2: xs
        })
     
     
      // console.log(days2 + "mmm" + sj2 + "ssss" + xs2);
    }, 1000);
  }

  newtask(e) {
    var driverinfo = this.Base.getMyData().driverinfo;
    
    //console.log(driverinfo.status)
    //return;
    if (driverinfo == null || driverinfo.status != "A") {
      wx.showModal({
        title: '未认证',
        content: '您是否需要前往司机认证',
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
      var id = e.currentTarget.id;
      var UserInfo = this.Base.getMyData().UserInfo;
      wx.navigateTo({
        url: '/pages/orderdetails/orderdetails?id=' + id + '&openid' + UserInfo.openid
      })
    }
  }
  registered(e) {
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
      var id = e.currentTarget.id;
      console.log("ssssssssssa" + id)
      var UserInfo = this.Base.getMyData().UserInfo;
      wx.navigateTo({
        url: '/pages/apply/apply?id=' + id
      })
    }
  }
  tobecompleted(e) {

    var orderapi = new OrderApi();
    orderapi.updateton({}, (updateton) => {
      this.Base.setMyData({
        updateton
      })
    })

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
      var id = e.currentTarget.id;
      var UserInfo = this.Base.getMyData().UserInfo;
      wx.navigateTo({
        url: '/pages/xq1/xq1?id=' + id
      })
    }
  }
}
var tab = null;
var timer = 1;
var timer1 = 1;
var timer2 = 1;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.qwe = content.qwe;
body.changetab = content.changetab;
body.sj = content.sj;
body.Countdown = content.Countdown;
body.one = content.one;
body.binddwc = content.binddwc;
body.setTimeout = content.setTimeout;
body.newtask = content.newtask;
body.registered = content.registered;
body.tobecompleted = content.tobecompleted;
Page(body)