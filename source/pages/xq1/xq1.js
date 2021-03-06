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
  ApplyApi
} from "../../apis/apply.api.js"; 
import {
  CertificateApi
} from "../../apis/certificate.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      id:this.Base.options.id,
      date: new Date(),
      rand: (new Date()).getTime()
    })
  
    super.onLoad(options);
  }

  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '待完成详情',
    });
  }

  onMyShow() {
    console.log(6666666);
    var that=this;
    var mylocation = this.Base.getMyData().mylocation;
      that.Base.getAddress((addressinfo) => {
        that.Base.setMyData({ mylocation: addressinfo });
        
        
        
      });
    
    var orderapi = new OrderApi();
    // orderapi.applyinfo({ id: this.Base.options.orderid},(applyinfo)=>{
    //    this.Base.setMyData({ applyinfo})
    //  })

    orderapi.applyinfo({ id: this.Base.options.id}, (applyinfo) => {
      var year2 = new Array();
      var month2 = new Array();
      var day2 = new Array();
      var hh2 = new Array();
      var mm2 = new Array();
      var year1 = new Array();
      var month1 = new Array();
      var day1 = new Array();
      var hh1 = new Array();
      var mm1 = new Array();
      var myDate1 = new Date(Date.parse(applyinfo.order_start_time.replace(/-/g, "/")));
      var myDate2 = new Date(Date.parse(applyinfo.order_end_time.replace(/-/g, "/")));
      year1 = myDate1.getFullYear();
      month1 = myDate1.getMonth() + 1;
      day1 = myDate1.getDate();
      hh1 = myDate1.getHours();
      mm1 = myDate1.getMinutes();
      if (month1 < 10) {
        month1 = '0' + month1;
      }
      if (day1 < 10) {
        day1 = '0' + day1;
      }
      if (hh1 < 10) {
        hh1 = '0' + hh1;
      }
      if (mm1 < 10) {
        mm1 = '0' + mm1;
      }

      year2 = myDate2.getFullYear();
      month2 = myDate2.getMonth() + 1;
      day2 = myDate2.getDate();
      hh2 = myDate2.getHours();
      mm2 = myDate2.getMinutes();
      if (month2 < 10) {
        month2 = '0' + month2;
      }
      if (day2 < 10) {
        day2 = '0' + day2;
      }
      if (hh2 < 10) {
        hh2 = '0' + hh2;
      }
      if (mm2 < 10) {
        mm2 = '0' + mm2;
      }
      this.Base.setMyData({
        applyinfo,
        year1: year1,
        year2: year2,
        month1: month1,
        month2: month2,
        day1: day1,
        day2: day2,
        hh1: hh1,
        hh2: hh2,
        mm2: mm2,
        mm1: mm1
      });
      orderapi.memberinfo({ id: applyinfo.order_enroll_id }, (enrollinfo) => {
        this.Base.setMyData({ enrollinfo });
      });
      orderapi.memberinfo({ id: applyinfo.order_start_id }, (startinfo) => {
        this.Base.setMyData({ startinfo });
      });
      orderapi.memberinfo({ id: applyinfo.order_end_id }, (endinfo) => {
        this.Base.setMyData({ endinfo });
      });
    })
  }
  qwe(e) {
    this.setData({
      index: e.detail.value
    })
  }
  changetab(e) {
    this.Base.setMyData({
      tab: e.currentTarget.id
    });
  }

  uploadimg(e) {
    var that = this;
    var id = e.currentTarget.id;
    var photo = [];
    this.Base.uploadImage("photo", (ret) => {
      photo.push(ret);
      that.Base.setMyData({
        photo
      });
    }, () => {}, 9);
  }


  startuploadimg(e) {
    var that = this;
    var id = e.currentTarget.id;
    var start_photo = [];
    this.Base.uploadImage("photo", (ret) => {
      start_photo.push(ret);
      that.Base.setMyData({
        start_photo
      });
    }, () => { }, 9);
  }

  Getover(e) {
    var data = e.detail.value;
    var that=this;
    
    //return;
    if (data.end_load == "") {
      this.Base.info("请填写终点过磅单载重");
      return;
    }
    if (data.photo == "") {
      this.Base.info("请至少添加一张终点过磅单");
      return;
    }
    
    var applyapi = new ApplyApi(); 
    var lat = this.Base.getMyData().mylocation.location.lat;
    var lng = this.Base.getMyData().mylocation.location.lng; 
    console.log("1111111111111" + lat);
    var address = this.Base.getMyData().mylocation.address;
    console.log("55555555555555" + address)
    
    var end_load = data.end_load;
    var photo = this.Base.getMyData().photo[0];
    var photo2 = this.Base.getMyData().photo[1];
    var photo3 = this.Base.getMyData().photo[2];
    var photo4 = this.Base.getMyData().photo[3];
    var photo5 = this.Base.getMyData().photo[4];
    var photo6 = this.Base.getMyData().photo[5];
    var photo7 = this.Base.getMyData().photo[6];
    var photo8 = this.Base.getMyData().photo[7];
    var photo9 = this.Base.getMyData().photo[8];
    var applyinfo=this.Base.getMyData().applyinfo;
    console.log(applyinfo.id);
    applyapi.uploaddan({
      apply_id: applyinfo.id, end_load: end_load, end_submit_lng: lng, end_submit_lat: lat, end_submit_address: address, photo: photo, photo2: photo2, photo3: photo3, photo4: photo4, photo5: photo5, photo6: photo6, photo7: photo7, photo8: photo8, photo9: photo9,
      formid: e.detail.formId }, (uploaddan) => {

        var applyinfo = this.Base.getMyData().applyinfo;
        //console.log("lllllllllllllllllllllllll" + orderno);
        var certificateapi = new CertificateApi();
        var instinfo = that.Base.getMyData().instinfo;
        var sms = instinfo["sms9"];
        sms = sms.replace("$", applyinfo.vehicle);

        certificateapi.sendsms({ mobile: applyinfo.mobile, content: sms });


          wx.reLaunch({
            url: '/pages/driver/driver',
          })
          this.onMyShow();
      wx.showToast({
        title: '提交成功,请等待发布方确认',
      })
    });
  }


  start_Getover(e) {
    var that=this;
    var data = e.detail.value;
    if (data.gbdload == "") {
      this.Base.info("请填写起点过磅单载重");
      return;
    }
    if (data.p1 == "") {
      this.Base.info("请至少添加一张起点过磅单");
      return;
    }
    var getall=this.Base.getMyData().getall;
    //console.log("1111111111111" + getall.mylat);
    //return;
    var applyapi = new ApplyApi();
    var gbdload = data.gbdload;
    var date = this.Base.getMyData().date;
    console.log("sssssaaaaaaa" + date);
    //return;
    var lat = this.Base.getMyData().mylocation.location.lat;
    var lng = this.Base.getMyData().mylocation.location.lng;
    var address = this.Base.getMyData().mylocation.address;
    console.log("55555555555555" + address)
    var p1 = data.p1;
    var p2 = data.p2;
    var p3 = data.p3;
    var p4 = data.p4;
    var p5 = data.p5;
    var p6 = data.p6;
    var p7 = data.p7;
    var p8 = data.p8;
    var p9 = data.p9;
    var applyinfo = this.Base.getMyData().applyinfo;
    console.log(applyinfo.id);
    applyapi.updatestart({
      apply_id: applyinfo.id, start_load: gbdload, start_submit_lng: lng, start_submit_lat: lat, start_submit_address: address, p1: p1, p2: p2, p3: p3, p4: p4, p5: p5, p6: p6, p7: p7, p8: p8, p9: p9,
      formid: e.detail.formId }, (updatestart) => {
        //that.Base.info(updatestart.return);


        
        var applyinfo = this.Base.getMyData().applyinfo;
        //console.log("lllllllllllllllllllllllll" + orderno);
        var certificateapi = new CertificateApi();
        var instinfo = that.Base.getMyData().instinfo;
        var sms = instinfo["sms8"];
        sms = sms.replace("$", applyinfo.vehicle);

        certificateapi.sendsms({ mobile: applyinfo.mobile, content: sms });




      wx.reLaunch({
        url: '/pages/driver/driver',
      })
      this.onMyShow();
      wx.showToast({
        title: '提交成功,请等待发布方确认',
      })
    });
  }

  toast(e){
    var applyinfo=this.Base.getMyData().applyinfo;
    if (applyinfo.p1==""){
      wx.showToast({
        title: '请先提交起点过磅单',
        icon:'none',
        content: ''
      })
    }

  }

   photo(e) {
     var photo = e.detail.value;
     console.log(photo);
     this.Base.setMyData({
       photo: e.detail.value
     })
   }

  photo2(e) {
    var photo2 = e.detail.value;
    console.log(photo2);
    this.Base.setMyData({
      photo2: e.detail.value
    })
  }

  photo3(e) {
    var photo3 = e.detail.value;
    console.log(photo3);
    this.Base.setMyData({
      photo3: e.detail.value
    })
  }

  photo4(e) {
    var photo4 = e.detail.value;
    console.log(photo4);
    this.Base.setMyData({
      photo4: e.detail.value
    })
  }

}
var tab = null;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.qwe = content.qwe;
body.changetab = content.changetab;
body.uploadimg = content.uploadimg; 
body.startuploadimg = content.startuploadimg; 
body.photo = content.photo;
body.photo2 = content.photo2;
body.photo3 = content.photo3;
body.photo4 = content.photo4; 
body.Getover = content.Getover;
body.start_Getover = content.start_Getover;
body.toast = content.toast;
Page(body)