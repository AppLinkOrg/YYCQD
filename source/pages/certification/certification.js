// pages/certification/certification.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js"; 
import { OrderApi } from "../../apis/order.api.js"; 
import { CertificateApi } from "../../apis/certificate.api.js"; 

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    console.log(this.options.status);
      // wx.showModal({
      //   title: '提示',
      //   content: '您已经通过认证',
      //   success: function (res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     }
      //   }
      // })

  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.enterpriseinfo( {} , (errinfo) => {
      this.Base.setMyData({ errinfo })
      
    })

    // orderapi.qrcode({id:3,filename:'a.png'}, (qrcode) => {
    //   this.Base.setMyData({ qrcode })
    // })
  }
  setPageTitle(instinfo) {
    var title = "企业认证";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
  uploadimg(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("Renzheng", (ret) => {
        that.Base.setMyData({
          photo: ret
        });
    }, undefined, 1);
  }
  confirm(e){
    var data = e.detail.value;
    if (data.enterprisename == '') {
      this.Base.info("企业名称不可为空");
      return;
    }
    if (data.creditcode == '') {
      this.Base.info("统一社会信用代码不可为空");
      return;
    }
    if (data.photo == "") {
      this.Base.info("请上传营业执照或有效证明");
      return;
    }
    var enterprisename = this.Base.getMyData().enterprisename;
    var creditcode = this.Base.getMyData().creditcode;
    var photo = this.Base.getMyData().photo;
    var UserInfo = this.Base.getMyData().UserInfo;
    var memberinfo = this.Base.getMyData().memberinfo;
    var that = this;
    var orderapi = new OrderApi();
    console.log(UserInfo.nickName);
    orderapi.authenticate({
       status: "I",
       mobile: memberinfo.mobile,
       open_id: UserInfo.openid,
       enterprisename: enterprisename,
       creditcode: creditcode,
       authenticateimg:photo,
       formid: e.detail.formId
    }, (authenticate) => {
        //  var pages = getCurrentPages(); 
        //  var beforePage = pages[pages.length - 2];
        //  wx.reLaunch({
        //    success(){
        //      beforePage.onLoad();
        //    }
      //  })

      var certificateapi = new CertificateApi();
      var instinfo = this.Base.getMyData().instinfo;
      var sms = instinfo["sms1"];
      //管理员您好，企业：$，在平台上提交了认证，请审核。
      //管理员您好，企业：腾讯有限公司，在平台上提交了认证，请审核。
      sms = sms.replace("$", enterprisename);
      certificateapi.sendsms({ content: sms });

      wx.showModal({
        title: '',
        content: '提交成功',
        showCancel: false,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#2699EC',
        success: function (res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/mine/mine',
            })
          }
        }
      });
     });
  }
  enterprisename(e) {
    var enterprisename = e.detail.value;
    console.log(enterprisename);
    this.Base.setMyData({
      enterprisename: e.detail.value
    })
  }
  creditcode(e) {
    var creditcode = e.detail.value;
    console.log(creditcode);
    this.Base.setMyData({
      creditcode: e.detail.value
    })
  }
  photo(e) {
    var photo = e.detail.value;
    console.log(photo);
    this.Base.setMyData({
      photo: e.detail.value
    })
  }
  // updateprove
  Yes(e){
  wx.reLaunch({
    url: '/pages/mine/mine',
  })
  }
  againalter(e) {
    wx.showModal({
      title: '修改资料',
      content: '您是否需要修改资料并重新等待审核？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/updateprove/updateprove',
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

body.confirm = content.confirm;
body.enterprisename = content.enterprisename;
body.creditcode = content.creditcode; 
body.photo = content.photo;
body.uploadimg = content.uploadimg; 
body.Yes = content.Yes; 
body.againalter = content.againalter; 
Page(body)