// pages/usercategory/usercategory.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
   
  }
  onMyShow() {
    var that = this;
  }
  bindtohome(e){
    wx.reLaunch({
      url: '/pages/home/home',
    })
  }
  bindtodriver(e){
    wx.reLaunch({
      url: '/pages/driver/driver',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.bindtohome = content.bindtohome; 
body.bindtodriver = content.bindtodriver; 
Page(body)