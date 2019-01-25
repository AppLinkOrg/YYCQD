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
    this.Base.uploadImage("weighing", (ret) => {
      that.Base.setMyData({
        photo: ret
      });
    }, 1);
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
  }
  carnumber(e) {
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
  confirm(e) {
    
    var data = e.detail.value;
    if (data.photo == "") {
      this.Base.info("请上传图片");
      return;
    }
    if (data.carnumber == "") {
      this.Base.info("请输入车重");
      return;
    }
    if (data.vehicletype == "") {
      this.Base.info("请输入净重");
      return;
    }
    if (data.load == "") {
      this.Base.info("请输入总重");
      return;
    }
    
    var carnumber = this.Base.getMyData().carnumber;
    var vehicletype = this.Base.getMyData().vehicletype;
    var load = this.Base.getMyData().load;
    var that = this;
    var photo = this.Base.getMyData().photo;

    var UserInfo = this.Base.getMyData().UserInfo;
    var api = new CertificateApi();
    api.riverlist({ openid: UserInfo.openid }, (list3) => {
     console.log(666666666666);
      console.log(this.Base.options.id);
    
    api.addweighing({
      status: "A",
      catheavy: carnumber,
      netheavy: vehicletype,
      totalheavy: load,
      weighing_img: photo,
      orderid: this.Base.options.id,
      member_id: list3[0].name
    }, (addvehicle) => {
      var pages = getCurrentPages();
      var beforePage = pages[pages.length - 2]; 
      beforePage.setMyData({
        id: this.Base.options.id


      })
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
    });
    })
  }
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.carnumber = content.carnumber;
body.load = content.load;
body.vehicletype = content.vehicletype;
body.confirm = content.confirm;
body.photo = content.photo;
body.uploadimg = content.uploadimg;
Page(body)