// pages/updatecar/updatecar.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";

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
    }, undefined, 1);
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
    var orderapi = new OrderApi();
    orderapi.vehicleinfo({ id: this.Base.options.id }, (info) => {
      this.Base.setMyData({ info })
    })

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
  
  update(e) {
    console.log(6666666);
    var data = e.detail.value;
    if (data.carnum == "") {
      this.Base.info("请输入车牌号码");
      return;
    }
    if (data.cartype == "") {
      this.Base.info("请输入车牌类型");
      return;
    }
    if (data.carload == "") {
      this.Base.info("请输入车辆载重");
      return;
    }
    if (data.carphoto == "") {
      this.Base.info("请上传图片");
      return;
    }
    var carnumber = data.carnum;
    var vehicletype = data.cartype;
    var load = data.carload;
    var that = this;
    var photo = data.carphoto;
    var info = this.Base.getMyData().info;
    var UserInfo = this.Base.getMyData().UserInfo;
    var orderapi = new OrderApi();
    var memberinfo = this.Base.getMyData().memberinfo;
    orderapi.updatecar({
      member_id: memberinfo.id,
      id: info.id,
      openid: UserInfo.openid,
      status: "I",
      carnumber: carnumber,
      vehicletype: vehicletype,
      carload: load,
      reviewimg: photo,
      formid: e.detail.formId
    }, (updatecar) => {

       wx.navigateBack({
         success() {
           wx.showToast({

             title: '提交成功',
             icon: 'success',
             duration: 2000
           })
           that.onMyShow();
         }
       })
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
body.photo = content.photo;
body.uploadimg = content.uploadimg;
body.update = content.update;
Page(body)