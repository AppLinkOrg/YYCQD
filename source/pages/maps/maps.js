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
    this.mapCtx = wx.createMapContext('myMap');
    this.setData({
      latitude: null,
      longitude: null,
      markers: [{
        id: 1,
        latitude: null,
        longitude: null,
        name: null,
      }],
      covers: [{
        latitude: null,
        longitude: null,
        iconPath: null
      }, {
          latitude: null,
          longitude: null,
          iconPath: null
      }]

    })
   
    this.mapCtx.moveToLocation();
   
  }
  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '地图',

    });
  }
  onMyShow() {
    var that = this;
  }
  moveToLocation(){
   

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.moveToLocation = content.moveToLocation;
Page(body)