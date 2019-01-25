// pages/driver/driver.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CertificateApi } from "../../apis/certificate.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    
    super.onLoad(options);

  }
  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '司机认证',

    });
  }
  onMyShow() {
    var that = this;

    var api = new CertificateApi();
    var UserInfo = this.Base.getMyData().UserInfo;
    api.certificatexq({ status:'A,I,S' }, (driverinfo) => {
      that.Base.setMyData({
        driverinfo
      });
    })
         
 
  }
  name(e) {
    var name = e.detail.value;
    this.Base.setMyData({
      name: e.detail.value
    })
  }
  uploadimg(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("driver",
    
    
    
     (ret) => {
      that.Base.setMyData({
        photo: ret
      });
    }
    
    
    ,undefined, 1);
  }
  photo(e) {
    var photo = e.detail.value;
    console.log(photo);
    this.Base.setMyData({
      photo: e.detail.value
    })
  }

  iduploadimg(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("driver", (ret) => {
      that.Base.setMyData({
        idphoto: ret
      });
    }, undefined, 1);
  }
  // uploadimg(e) {
  //   var that = this;
  //   var id = e.currentTarget.id;

  //   this.Base.uploadImage("driver", (ret) => {

  //     that.Base.setMyData({

  //       photo: ret

  //     });
  //   }, 1);
  // }

  idphoto(e) {
    var idphoto = e.detail.value;
    console.log(photo);
    this.Base.setMyData({
      idphoto: e.detail.value
    })
  }

  idcard(e) {
    var idcard = e.detail.value;

    this.Base.setMyData({
      idcard: e.detail.value
    })
  }
  confirm(e) {

    // var certificateapi = new CertificateApi();
    // var instinfo = this.Base.getMyData().instinfo;
    // certificateapi.sendsms({mobile:"17608463082", content: instinfo["sms2"] });

    // return;

    var certificateapi = new CertificateApi();
    var data = e.detail.value;
    if (data.name == "") {
      this.Base.info("请输姓名");
      return;
    }
    if (data.idcard == "") {
      this.Base.info("请输入身份证号");
      return;
    }
    if (data.photo == "") {
      this.Base.info("请上传驾驶证照片");
      return;
    }
    if (data.idphoto == "") {
      this.Base.info("请上传身份证照片");
      return;
    }
    var idphoto = this.Base.getMyData().idphoto;
    var photo = this.Base.getMyData().photo;
    var name = this.Base.getMyData().name;
    var idcard = this.Base.getMyData().idcard;
    var UserInfo = this.Base.getMyData().UserInfo;
    var openid=UserInfo.openid;
    var that = this;
    
    
    certificateapi.updetedriver({
      status: "I",
      name: name,
      idcard: idcard,
      openid:openid,
      dirlicense_img: photo,
      idcard_img: idphoto,
      formid: e.detail.formId
    }, (updetedriver) => {
      
      var instinfo = this.Base.getMyData().instinfo;
      var sms = instinfo["sms2"];
      sms = sms.replace("$", name);
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
            wx.navigateBack({
              
            })
          }
        }
      });
      // var pages = getCurrentPages();
      // var beforePage = pages[pages.length - 2];
      // wx.navigateBack({
      //   success() {
      //     beforePage.onLoad();
      //     wx.showModal({
      //       showCancel: false,
      //       title: '',
      //       content: '提交成功',
      //     })
      //   }
      // })

    });
  }
  againalter(e) {
    

    //return;
    var that=this;
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
            url: '/pages/updatedriver/updatedriver',
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
body.name=content.name;
body.idcard = content.idcard;
body.idphoto = content.idphoto;
body.iduploadimg = content.iduploadimg;
body.photo = content.photo;
body.uploadimg = content.uploadimg;
body.againalter = content.againalter;
Page(body)