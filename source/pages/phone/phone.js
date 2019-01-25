// pages/driver/driver.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    this.setData({
      date: '请选择日期',
      fun_id: 2,
      time: '获取验证码', //倒计时 
      currentTime: 61

    })
    super.onLoad(options);

  }
  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '修改手机号',

    });
  }
  getCode(){

    var that = this;
    var currentTime = that.data.currentTime
        interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)

  }
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  }
  onMyShow() {
    var that = this;
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getCode = content.getCode;
body.getVerificationCode = content.getVerificationCode;
Page(body)