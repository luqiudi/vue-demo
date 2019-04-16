<template>
<div class="test_container">
    <el-row>
        <el-row class="ctrl-map-visible">
            <el-col :span="24" align='right' style="padding: 19px;">
                <el-button @click="cabackList" type="warning">返回</el-button>
                <el-button @click="saveMapUpdate" type="primary">保存</el-button>
            </el-col>
        </el-row>
        <el-card class="box-card">
            <el-row class="map-clock">
                <el-col :span="2" align='center'>打卡类型：</el-col>
                <el-col :span="22" align='left'>上下班打卡</el-col>
            </el-row>
            <el-row class="map-clock">
                <el-col :span="2" align='center'>打卡时间：</el-col>
                <el-col :span="22" align="left">
                    <el-radio v-model="radio" label="1" disabled>固定时间上下班</el-radio>
                    <el-radio v-model="radio" label="2" disabled>自由时间上下班</el-radio>
                </el-col>
            </el-row>
            <el-row class="geolocation map-clock">
                <el-col :span="2" align='center'>打卡地点：</el-col>
                <el-col :span="22" class="map-clock-container">
                    <img src="~assets/img/fine-tuning.png" class="clock_logo" style="position:absolute;" @click="startLogin">
                    <div id="g2map" class="locationImap"></div>
                    <el-input
                        v-model="inputAddress"
                        class="clock-address-name"
                        style="height:24px;"
                        disabled></el-input>

                </el-col>
            </el-row>
            <el-row class="map-clock">
                <el-col class="clock-address" align='center' :span="2"><span class="warp-color">*</span>&nbsp;打卡地点：</el-col>
                <el-col class="clock-address" :span="6">
                    <el-input
                        v-model="clickAddress"
                        class="clock-address-enter"
                        style="height:24px;"
                        disabled></el-input>
                </el-col>
                <el-col class="clock-address" :span="16">
                </el-col>
            </el-row>
            <el-row class="map-clock">
                <el-col align='center' :span="2"><span class="warp-color">*</span>&nbsp;打卡范围：</el-col>
                <el-col :span="3" align="left">
                    <el-input-number
                        v-model="inputRange"
                        controls-position="right"
                        @change="handleChange"
                        :min="0"
                        :max="2000"></el-input-number>
                    <!-- <el-input v-model="inputRange" class="clock-address-enter" placeholder="300" ></el-input> -->
                </el-col>
                <el-col :span="19" align="left">
                    <div class="normal-range">m，员工可在画圈范围内正常打卡</div>
                </el-col>
            </el-row>
        </el-card>
    </el-row>
</div>
</template>

<script>
//   import Pagination from "~/components/Pagination"
//   import api from "~/config/http";
//   import Mock from "mockjs";
  export default {
    components: {
    //   Pagination
    },
    data() {
      return {
        radio: '1',
        isList:true,
        listLoading: false,
        tableData: [],
        inputAddress: '', //input输入框
        inputRange: '', //input范围输入框
        inputNameRange: '',//地图上的搜索框
        clickAddress:'123',//当前点击的地图地址
        workCycle:'',
        log: '',
        lat: '',
        startTime: '',
        endTime: '',
        id: '',
        flag: '',
        ZS: {
          MONITOR: {
            map: {},
            isRelocation:true,
            radius:500,
            log:0,
            lat:0,
          }
        },
        pageNo: 1,
        pageSize: 15,
        total: 0,
        pageInfo: {
            pageNo: 1,
            pageSize: 6,
            total: 1,
        }
      }
    },
    mounted() {
        var data = {"unitId":"AHHF_QHHFY_20180408","unitName":" ","clockType":"2","log":13055357.52783,"lat":3710686.68,"startTime":"","endTime":"","elasticTime":"","workCycle":"自由打卡","clockRange":"300","unitAddress":"测试测试测试测试测试测试测试测试测试测试测试测试234655ce4eccjhhhADFF2@#$%^&*?,"};
        this.ZS.MONITOR.log = data.log;
        this.ZS.MONITOR.lat = data.lat;
        this.ZS.MONITOR.radius = data.clockRange;
        this._initMap(data.log, data.lat, data.clockRange);
    },
    watch: {
      inputRange(n,o){
            this.ZS.MONITOR.radius = n;
            if(this.ZS.MONITOR.elementLayer){
                this.addElement(this.ZS.MONITOR.log,this.ZS.MONITOR.lat,this.ZS.MONITOR.radius);
            }
      }  
    },
    methods: {
      //
      startLogin(){
        this.ZS.MONITOR.isRelocation =true;
        console.log('startLogin');
      },
      handleChange(value) {
        console.log(value);
        this.inputRange = value;
        this.addElement(this.log,this.lat,value);
      },
      //cabackList返回列表
      cabackList(){
        this.isList = true
      },
      //保存地图修改信息
      saveMapUpdate(){
        console.log(this.inputRange)
        let params = {
          id: this.id,
          startTime: this.startTime,
          endTime: this.endTime,
          log: this.log,
          lat: this.lat,
          unitAddress: this.inputAddress,
          workCycle: this.workCycle,
          clockRange: this.inputRange
        }
        api.post(api.forent_url.maintenanceUrl+ 'clock/updateUnitRule', params,  this.TIMEOUT ).then(res=>{
          if(!res.data){}else{
            this.isList = true
            this.getUnitClockRuleList();
          }
        })

      },
      editOperator(rowObj){
        this.isList=false
        this.id = rowObj.id
        let params = {
          id : this.id
        }
        api.get(api.forent_url.maintenanceUrl+ "/clock/getUnitInfoById", params, this.TIMEOUT ).then( res =>{
          if(!res.data){} else{
            console.log(JSON.stringify(res.data))
            this.radio = res.data.clockType
            this.inputAddress = res.data.unitAddress;
            this.inputNameRange = res.data.unitName;
            this.inputRange = res.data.clockRange
            this.log = res.data.log
            this.lat = res.data.lat
            this.workCycle = res.data.workCycle
            this.startTime = res.data.startTime
            this.endTime = res.data.endTime
            this.$forceUpdate();
            this._initMap(this.log, this.lat, this.inputRange)
          }
        })

      },
      getUnitClockRuleList(){ //可维保范围设置列表
        this.listLoading = true;
        let params = {
          orgId:'340104FWJG201806250002',
          pageNo: this.pageInfo.pageNo || 1,
          pageSize: this.pageInfo.pageSize || 15,
          // tenantId: this.tenantId || "",
          // orgCode: this.usrObj.orgCode,
          // showFlag: this.userStatus,
          // userName: this.$refs.inputSearch.value
        };
        api.post(api.forent_url.maintenanceUrl + "clock/getUnitClockRuleList", params, this.TIMEOUT).then(res => {
            if (!res.data) {} else {
              // console.log("1111------",res);
                this.pageInfo.total = res.data.total;
                this.tableData = res.data.rows;
                this.listLoading = false;
            }
        });
      },
      sonHandleCurrentChange(pageInfo) {
        // 处理分页信息并赋值
        this.pageInfo.pageSize = (pageInfo.pageSize ? parseInt(pageInfo.pageSize) : this.pageInfo.pageSize);
        this.pageInfo.pageNo = (pageInfo.pageNo ? parseInt(pageInfo.pageNo) : this.pageInfo.pageNo);
        // this.getUserList(this.userStatus);
        this.getUnitClockRuleList();
      },
      //地图初始化
      _initMap(log, lat, radius){
        var _this = this;
        // 创建地图对象
        console.log('this.gs2',this.gs2);
        var g2map = new this.gs2.maps.Map({
          defaultExtent: {
            maxZoom: 17,
            minZoom: 4,
            level: 13,
            center: [log, lat],
            projection: "EPSG:3857"
          }
        });
        // 初始化地图，传入要初始化的DOM对象的id
        g2map.init({
          targetId: 'g2map'
        });
        // 创建 百度地图矢量 瓦片图层
        var baiduvec = new this.gs2.lys.TileLayer({
          layerType: this.gs2.lys.TileLayer,
          tileType: this.gs2.lys.TileType.BaiduMap,
          opacity: 1.0,
          visible: true,
          matrix: 22,
          // url: "http://172.18.7.60/proxy/mapTiledProxy.ashx?http://online0.map.bdimg.com/tile"
          url: "http://online0.map.bdimg.com/tile"
        });
        console.log("add")
        console.log(g2map)
        console.log(baiduvec)
        //将瓦片图层添加到地图
        g2map.addLayer(baiduvec);
        //创建点图层
        _this.ZS.MONITOR.elementLayer = new this.gs2.lys.ElementLayer({
          zIndex: 10
        });
        _this.ZS.MONITOR.g2map = g2map;
        g2map.addLayer(_this.ZS.MONITOR.elementLayer);
        //事件
        _this.ZS.MONITOR.toolTipWare = new _this.gs2.ext.TooltipWare({
          map: g2map
        });
        g2map.on("click", function(button, shift, screenX, screenY, mapX, mapY, handle) {
          var ele = _this.ZS.MONITOR.elementLayer.hitTest(screenX, screenY);
          console.log('ele :', ele);
          if(_this.ZS.MONITOR.isRelocation) {
            _this.ZS.MONITOR.isRelocation = false;
            //重新定位
            _this.ZS.MONITOR.radius = _this.inputRange;
            _this.ZS.MONITOR.mapX = mapX;
            _this.ZS.MONITOR.mapY = mapY;
            _this.addElement(mapX, mapY, _this.ZS.MONITOR.radius);
            var location = mapX+","+mapY
            var mapParams = JSON.stringify({
              url:"http://api.map.baidu.com/geocoder/v2/",
              location:location,
              ak:"hmFFKbr0nFUvqAN2gcUHwMILWFTzm5Xt",
              output:"json",
              coordtype:"bd09mc"
            })

            $.ajax({
              url: "http://api.map.baidu.com/geocoder/v2/",//forent_url.maintenance_service_url + "/baiDuMap/getBaiDuMapResult",
              type: 'get',
              dataType: "jsonp",
              data:{
                location:location,
                ak:"hmFFKbr0nFUvqAN2gcUHwMILWFTzm5Xt",
                output:"json",
                coordtype:"bd09mc"
              },//{"mapParams":mapParams},
              //jsonpCallback:"baiduMapData"
              success: function(res) {
                debugger;
                var code = res["status"];
                if(code == "0") {
                  _this.clickAddress = res.result.formatted_address;
                  // _this.ZS.MONITOR.unitAddress = res.result.formatted_address;
                  // $(".clockPlaceNameInput").val(ZS.MONITOR.unitAddress)
                }
              }
            })
            // _this.$axios.get('http://api.map.baidu.com/geocoder/v2/',{
            // api.get(api.forent_url.bdgisUrl+'/geocoder/v2/',{
            //   location:location,
            //   ak:"hmFFKbr0nFUvqAN2gcUHwMILWFTzm5Xt",
            //   output:"json",
            //   coordtype:"bd09mc"
            // }).then(({status,data})=>{
            //   debugger;
            //   console.log(1)
            //   // console.log(data+"add")
            //   // var code = res["status"];
            //   // if(code == "0") {
            //   //   _this.ZS.MONITOR.unitAddress = res.result.formatted_address;
            //   //   $(".clockPlaceNameInput").val(_this.ZS.MONITOR.unitAddress)
            //   // }
            //   // if(status===200){

            //   // }else{
            //   // 	self.error=data.msg
            //   // }

            // // })
            
            // })
          }


        })
        //  console.log(2)
         
      },
      //添加图标元素
      addElement(log, lat,radius){
        var _this = this
        _this.ZS.MONITOR.elementLayer.clear();
        // var picSource = ["iVBORw0KGgoAAAANSUhEUgAAACMAAAAsCAYAAADvjwGMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDY4NzI2OEVFRUJFMTFFOEI4NEI4Q0Y0NUNDREQyMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDY4NzI2OEZFRUJFMTFFOEI4NEI4Q0Y0NUNDREQyMTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENjg3MjY4Q0VFQkUxMUU4Qjg0QjhDRjQ1Q0NERDIxMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENjg3MjY4REVFQkUxMUU4Qjg0QjhDRjQ1Q0NERDIxMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsSkGn8AAAjESURBVHjarFhdbBxX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"]
        var picSource = ["data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAyCAYAAAA5kQlZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4RTBCODdFQjU0OUVFMzExOTI1OUQ2MzcwRjVBMzk5NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENDA5OUJCMThCM0ExMUU4QUM4MzlERkFDQTc2NTFEQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpENDA5OUJCMDhCM0ExMUU4QUM4MzlERkFDQTc2NTFEQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpiN2M5Yjc1ZC03OWYzLTVhNDMtYTQ0Ni1kMGMzN2NiODMwMGQiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkZmM3ZTg1MC04YjIyLTExZTgtYjJhOS05ZDIy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"]
        //创建样式
        var markerSymbol = new this.gs2.syms.Picturemarkersymbol({
          // source: picSource[0],
          source: picSource[0],
          width: 35,
          height: 44,
          rotation: "0",
          opacity: "1",
          offsetX: 17.5,
          offsetY: 44
        });
        //点
        // console.log(this.gs2)
        // console.log(this.gs2.geom)
        var point = new this.gs2.geom.Point({
          x: log,
          y: lat,
          spatialReference: this.gs2.geom.SpatialReference.EPSG3857
        });
        //创建点圆元素
        _this._createCircle(log, lat, radius);
        //创建点元素
        var ele = new this.gs2.ele.Element({
          geometry: point,
          symbol: markerSymbol,
        });
        // debugger
        _this.ZS.MONITOR.elementLayer.add(ele);
      },
      _createCircle(log, lat, radius){
          console.log('创建圆');
        var _this = this
        console.log(122222222222222)
        console.log(_this.ZS.MONITOR.g2map)
        var centerGeom = new this.gs2.geom.Point({
          x: log,
          y: lat,
          spatialReference: _this.ZS.MONITOR.g2map.spatialReference
        });
       // console.log(1234)
        var geoJson = _this._getBufferGeoJson(centerGeom, radius);
        console.log(123)
        var polygonGeometry = this.gs2.geom.GeometryFactory.createGeometryFromGeoJson(geoJson, _this.ZS.MONITOR.g2map.spatialReference);
        var ring = new this.gs2.geom.Polygon({
          spatialReference: _this.ZS.MONITOR.g2map.spatialReference
        });
        polygonGeometry.addGeometry(ring);
        var symbol=new this.gs2.syms.SimpleFillsymbol({
          borderColor:new this.gs2.syms.Color({a:100,b:213,g:124,r:16}),
          fillColor:new this.gs2.syms.Color({a:30,b:213,g:124,r:16}),
          borderThickness:1
          });
        var circleEle = new this.gs2.ele.Element({
          geometry: polygonGeometry,
          symbol: symbol
        });
        _this.ZS.MONITOR.elementLayer.add(circleEle);
      },
      _getBufferGeoJson(centerGeom, radius){
         /**
         * 根据中心点半径获取缓冲区
         * @param centerGeom {gs2.geom.Point}
         * @param radius {Number} 半径 /m
         * @private
         */
        var _this = this
        if(!(centerGeom && !isNaN(radius))) {
            return null;
          }
          var geoJson = null;
          var spatialRef = centerGeom.spatialReference;
          var projService = new this.gs2.ext.ProjectService();
          var ptGeom = new this.gs2.geom.Point({
            x: centerGeom.x,
            y: centerGeom.y,
            spatialReference: spatialRef
          });
          //激活tool
          var opts = {
            center: [ptGeom.x, ptGeom.y],
            radius: radius,
            count: 128,
          };
          var circlePoints = _this.getCirclePonits(opts);
          var geomJson = {
            type: 'Polygon',
            coordinates: [circlePoints]
          }
          var geom = this.gs2.geom.GeometryFactory.createGeometryFromGeoJson(geomJson);
          geom.spatialReference = 3857;
          geoJson = projService.transform(geom, spatialRef).asGeoJson();
          return geoJson;
       },
       getCirclePonits(options){
        //  console.log(1+"getCirclePonits")
         /**
         * 获取圆上的点
         * @method
         * @param options {Object} 必填，参数
         * @param options.center {Array} 必填 圆心
         * @param options.radius {Number} 必填，半径
         * @param options.count {Number} 必填，点数，默认为128
         * @param options.spatialReference {Number} 必填，中心点坐标系， 默认为3857
         * @returns {Array}
         */

        var center = options.center,
          count = options.count || 128,
          radius = parseFloat(options.radius),
          spatialReference = 3857;
        var ic = (Math.PI * 2) / count,
          icc = 360 / count;
        var arr = [],
          cx = center[0],
          cy = center[1];
        for(var i = 0; i < count; i++) {
          var rad = ic * i;
          var x = cx + radius * Math.cos(rad);
          var y = cy + radius * Math.sin(rad);
          arr.push([x, y]);
        }
        return arr;
       }
    },
  }
</script>

<style lang="scss" scoped>
.test_container {

    // @import "~/assets/css/table.scss";

    .notab {
        border-top: none;
    }

    .ctrl-map-visible {
        background-color: #fff;
        margin-bottom: 12px;
    }

    .map-clock {
        height: 32px;
    }

    .warp-color {
        color: #ff6b6b;
    }

    // .clock-address{
    //   margin-top: 10px;
    // }
    .clock-address-enter .el-input__inner {
        height: 24px;
    }

    .geolocation {
        height: 50vh;
    }

    .locationImap {
        // height: 50vh;
        // height: calc(100% - 60px);
        // background: red;
    }

    .normal-range {
        height: 24px;
        line-height: 24px;
        text-align: left;
        text-indent: 1em;
    }

    // .geolocation{}

    .map-clock-container {
        .clock_logo {
            position: absolute;
            z-index: 100;
            left: 480px;
            transition: all .5s;
            &:hover {
                transform: scale(.95)
            }

            &:active {
                left: 481px;
                top: 1px;
            }
        }
    }

    .clock-address-name {
        width: 320px;
        position: absolute;
        top: 10px;
        left: 120px;
        z-index: 999;
    }

    .notab {
        height: calc(100vh - 55px - 21px - 0px);
    }

    .notab>div:first-child {
        height: calc(100vh - 55px - 40px - 31px);
    }

    // .el-col-24 {
    //   padding: 19px;
    // }
    @media screen and (max-width: 1920px) {
        .geolocation {
            height: 69vh;
        }

        .locationImap {
            height: 68vh;
        }

        .clock-address-name {
            left: 158px;
        }
    }

    @media screen and (max-width: 1440px) {
        .geolocation {
            height: 50vh;
        }

        .locationImap {
            height: 49vh;
        }

        .clock-address-name {
            left: 120px;
        }

        .map-clock-container {
            .clock_logo {
                position: absolute;
                z-index: 100;
                left: 446px;

                &:hover {
                    width: 50px;
                    height: 50px;
                }

                &:active {
                    left: 447px;
                    top: 1px;
                }
            }
        }
    }

}
</style>
