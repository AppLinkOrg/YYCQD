// pages/team/team.js
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
    var orderapi = new OrderApi();
    orderapi.goodslist({}, (goodslist) => {
      this.Base.setMyData({ goodslist });
    });
  }
  
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    var UserInfo=this.Base.getMyData().UserInfo;
    orderapi.memberlist({ status:"A"}, (memberlist) => {
      this.Base.setMyData({ memberlist });
    });
  }
  setPageTitle(instinfo) {
    var title = "团队成员";
    wx.setNavigationBarTitle({
      title: title,
    })
  }

  binddeleted(e) {
    var that = this;
    var orderapi = new OrderApi();
    var memberinfo = this.Base.getMyData().memberinfo;
    var id = e.currentTarget.id;
    //console.log(id+"ssssssssssssss");
    //return;
    wx.showModal({
      title: '',
      content: '确认删除该成员?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {

          orderapi.updateteam({ member_id: memberinfo.id, idlist: id }, (updateteam) => {
            that.Base.setMyData({
              updateteam
            });
            that.onMyShow();
          });

        }
      }
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.binddeleted = content.binddeleted;
Page(body)