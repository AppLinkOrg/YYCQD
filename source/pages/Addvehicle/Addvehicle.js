// pages/driver/driver.js
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

  }

  uploadimg(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("vehicle", (ret) => {
      that.Base.setMyData({
        photo: ret
      });
    },undefined, 1);
  }
  photo(e) {
    var photo = e.detail.value;
    console.log(photo);
    this.Base.setMyData({
      photo: e.detail.value
    })
  }

  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '添加车辆',

    });
  }
  onMyShow() {
    var that = this;
    var orderapi=new OrderApi();
    orderapi.vehicleinfo({id:this.Base.options.id},(info)=>{
      this.Base.setMyData({info})
    })
    orderapi.vehiclelist({ all:"Y"}, (vehiclelist) => {
      this.Base.setMyData({ vehiclelist })
    })

  }
  carnumber(e){
    var carnumber = e.detail.value;
  
    this.Base.setMyData({
      carnumber: e.detail.value
    })
  }
  load(e) {
    var load = e.detail.value;
    console.log(load);
    this.Base.setMyData({
      load: e.detail.value
    })
  }
  vehicletype(e) {
    var vehicletype = e.detail.value;
    console.log(vehicletype);
    this.Base.setMyData({
      vehicletype: e.detail.value
    })
  }
  confirm(e){
    console.log(6666666);
    var data=e.detail.value;
    var vehiclelist = this.Base.getMyData().vehiclelist;
    // for (var i = 0; i < vehiclelist.length; i++) {
    //   if (data.carnumber == vehiclelist[i].carnumber) {
    //     this.Base.info("该车牌已被认证,请重新输入");
    //     return;
    //   }
    // }
    if (data.carnumber == "") {
        this.Base.info("请输入车牌号码");
        return;
      }
    if (data.vehicletype == "") {
      this.Base.info("请输入车牌类型");
      return;
    }
    if (data.load == "") {
      this.Base.info("请输入车辆载重");
      return;
    }
    if (data.photo == "") {
      this.Base.info("请上传图片");
      return;
    }

    var carnumber = this.Base.getMyData().carnumber;
    var vehicletype = this.Base.getMyData().vehicletype;
    var load = this.Base.getMyData().load;
    var that =this;
    var photo = this.Base.getMyData().photo;
    var UserInfo = this.Base.getMyData().UserInfo;
    var orderapi=new OrderApi();


    orderapi.addvehicle({
      openid: UserInfo.openid,
      status:"I",
      carnumber: carnumber,
      vehicletype: vehicletype,
      carload: load,
      reviewimg: photo,
      formid: e.detail.formId
    }, (addvehicle) => {


      var certificateapi = new CertificateApi();
      var instinfo = this.Base.getMyData().instinfo;
      var sms = instinfo["sms3"];
      sms = sms.replace("$", carnumber);
      certificateapi.sendsms({ content: sms });



      var pages = getCurrentPages();
      var beforePage = pages[pages.length - 2];

      if (addvehicle.code == 0) {
        wx.navigateBack({
          success() {
            beforePage.onLoad();
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      } else {
        this.Base.info(addvehicle.result);
      }
      
    });
  } 
  againalter(e) {
    var that=this;
    wx.showModal({
      title: '修改资料',
      content: '您是否需要重新提交资料并等待审核？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/updatecar/updatecar?id='+that.Base.options.id,
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
body.carnumber = content.carnumber;
body.load = content.load;
body.vehicletype = content.vehicletype;
body.confirm=content.confirm;
body.photo = content.photo;
body.uploadimg = content.uploadimg; 
body.againalter = content.againalter;
Page(body)