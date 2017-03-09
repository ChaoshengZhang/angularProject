angular.module("myApp",['ngRoute','ngAnimate','ngSanitize'])
	.config(function($routeProvider){
		$routeProvider.when('/quality',{
			templateUrl:"./resources/tpls/quality.html",
			controller:"qualityCtrl"
		}).when('/safe',{
			templateUrl:"./resources/tpls/safe.html",
			controller:"safeCtrl"
		}).when('/environment',{
			templateUrl:"./resources/tpls/environment.html",
			controller:"environmentCtrl"
		}).when('/tech',{
			templateUrl:"./resources/tpls/tech.html",
			controller:"techCtrl"
		}).when('/cultural',{
			templateUrl:"./resources/tpls/cultural.html",
			controller:"culturalCtrl"
		}).when('/detail/:id',{
			templateUrl:"./resources/tpls/detail.html",
			controller:"detailCtrl"
		}).otherwise({
			redirectTo:"/tech"
		})
	})
	.controller('detailCtrl', ['$rootScope','$scope','$location','$http','$sce', function($rootScope,$scope,$location,$http,$sce){
		
		var media = document.querySelector('#audio');
		// 音乐播放
		$scope.autoPlayMusic = function (){
		    // 自动播放音乐效果，解决浏览器或者APP自动播放问题
		    function musicInBrowserHandler() {
		        $scope.musicPlay(true);
		        document.body.removeEventListener('touchstart', musicInBrowserHandler);
		    }
		    document.body.addEventListener('touchstart', musicInBrowserHandler);
		
		    // 自动播放音乐效果，解决微信自动播放问题
		    function musicInWeixinHandler() {
		        $scope.musicPlay(true);
		        document.addEventListener("WeixinJSBridgeReady", function () {
		            $scope.musicPlay(true);
		        }, false);
		        document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
		    }
		    document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
		    $scope.audioPlay = true;
		};
		
		$scope.musicPlay = function (isPlay) {
		    
		    if (isPlay && media.paused) {
		        media.play();
		        $scope.audioPlay = true;
		    }
		    if (!isPlay && !media.paused) {
		        media.pause();
		        $scope.audioPlay = false;
		    }
		}
		$scope.autoPlayMusic();
		
		
		media.addEventListener('ended',function () {
		   	$scope.audioPlay = false;
		   	$("#audioBnt").removeClass("active");
		});
		media.addEventListener('paused',function () {
		   	$scope.audioPlay = false;
		   	$("#audioBnt").removeClass("active");
		});
		
		
		$scope.audioBtnToggle = function(){
			if(media.paused){ 
		        media.play();
		        $scope.audioPlay = true;  
		    }else{ 
		        media.pause();
		        $scope.audioPlay = false;  
		    } 
		};
		
		$rootScope.$on('$routeChangeSuccess', function () {
	    	media.pause();
		});
		

		$scope.sce = $sce.trustAsResourceUrl;
		var id = $location.path().split('/').pop();
        $http.get('./resources/data/'+id+'.json').success(function(data){
	        $scope.detailContent = data;
	    }).error(function(){
	        alert("一个不知名的错误");
	    });

	}])
	.controller('myCtrl', ['$scope', function($scope){
		$scope.dataList = [
			{
				"name":"技术",
				"href":"/tech"
			},
			{
				"name":"综合人文",
				"href":"/cultural"
			},
			{
				"name":"环境",
				"href":"/environment"
			},
			{
				"name":"安全",
				"href":"/safe"
			},
			{
				"name":"质量",
				"href":"/quality"
			}
		]
	}])
	.controller('qualityCtrl', ['$scope', function($scope){
		$scope.qualityList = [
			{
				"title":"二维码在工程质量管理中的运用",
				"id":1
			},
			{
				"title":"盾构机拼装工艺及主要构件",
				"id":2
			},
			{
				"title":"隐患整改APP",
				"id":3
			},
			{
				"title":"大体积混凝土测温",
				"id":4
			},
			{
				"title":"三维激光扫描仪",
				"id":5
			},
			{
				"title":"工地可视化远程管理系统",
				"id":6
			},
			{
				"title":"移动终端及实测实量",
				"id":7
			}
		]
	}])
	.controller('safeCtrl', ['$scope', function($scope){
		$scope.safeList = [
			{
				"title":"安全教育VR体验馆+信息化",
				"id":8
			},
			{
				"title":"全景网络高清智能球机",
				"id":9
			},
			{
				"title":"盾构施工远程实时监控系统",
				"id":10
			},
			{
				"title":"全自动智能监测方法",
				"id":11
			},
			{
				"title":"多媒体安全教育箱",
				"id":12
			},
			{
				"title":"施工升降机安全监控系统",
				"id":13
			},
			{
				"title":"塔吊小车定位和垂直起吊警示系统",
				"id":14
			},
			{
				"title":"防拆末端设备报警系统及灭火弹",
				"id":15
			},
			{
				"title":"塔式起重机视频安全管理系统",
				"id":16
			},
			{
				"title":"便携式周界防护系统",
				"id":17
			},
			{
				"title":"磁力缓降安全逃生装置",
				"id":18
			}
		]
	}])
	.controller('environmentCtrl', ['$scope', function($scope){
		$scope.environmentList = [
			{
				"title":"环境监测改善系统",
				"id":19
			},
			{
				"title":"临建智能化",
				"id":20
			},
			{
				"title":"节水节电措施",
				"id":21
			},
			{
				"title":"隧道内有毒有害气体检测报警系统",
				"id":22
			},
			{
				"title":"湖底淤泥脱水固化",
				"id":23
			},
			{
				"title":"建筑垃圾回收制砖",
				"id":24
			},
			{
				"title":"泥浆净化装置",
				"id":25
			},
			{
				"title":"车辆自动冲洗槽",
				"id":26
			},
			{
				"title":"雾炮降尘系统",
				"id":27
			}
		]
	}])
	.controller('techCtrl', ['$scope', function($scope){
		$scope.techList = [
			{
				"title":"施工现场管理系统及移动终端",
				"id":28
			},
			{
				"title":"棒材计数",
				"id":29
			},
			{
				"title":"BIM-FIM系统",
				"id":30
			},
			{
				"title":"工厂化预制加工技术",
				"id":31
			},
			{
				"title":"复杂节点、二维码",
				"id":32
			},
			{
				"title":"智能决策支持系统",
				"id":33
			},
			{
				"title":"DPTA机房",
				"id":34
			},
			{
				"title":"实景扫描技术在基础设施中的运用",
				"id":35
			},
			{
				"title":"基于BIM的预制梁场系统",
				"id":36
			},
			{
				"title":"数字化建造",
				"id":37
			},
			{
				"title":"基于BIM的智能施工放样",
				"id":38
			},
			{
				"title":"钢筋工程BIM应用技术研究",
				"id":39
			},
			{
				"title":"高支模变形监测系统",
				"id":40
			}
		]
	}])
	.controller('culturalCtrl', ['$scope', function($scope){
		$scope.culturalList = [
			{
				"title":"观摩智能语音介绍",
				"id":41
			},
			{
				"title":"3D MAX前期策划",
				"id":42
			},
			{
				"title":"芯片安全帽",
				"id":43
			},
			{
				"title":"云微投应用",
				"id":44
			},
			{
				"title":"自动感应实名制系统",
				"id":45
			},
			{
				"title":"免费WiFi及农民工联络",
				"id":46
			},
			{
				"title":"BIM与3D打印",
				"id":47
			},
			{
				"title":"一卡通管理系统",
				"id":48
			},
			{
				"title":"地铁隧道人员定位系统",
				"id":49
			},
			{
				"title":"后勤服务物业化",
				"id":50
			}
		]
	}])
	.directive("cateList",["$rootScope","$location",function($rootScope,$location){

		return {
			restrict:"AE",
			templateUrl:"./resources/tpls/cate-list.html",
			replace:true,
			scope:{
				myData:"="
			},
			link:function(scope,element,attrs){
				// .selectedNavItem变量存储当前选择项  
			    scope.selectedNavItem = $location.path(); 
			    // 栏目click时触发的方法。  
			    scope.itemClick = function(itemTitle) {  
			      	scope.selectedNavItem = itemTitle  
			    }
			    
			    $rootScope.$on('$routeChangeSuccess', function () {
			    	if( $location.path().indexOf("detail") == -1 ){
			    		scope.selectedNavItem = $location.path(); 
			    	}
				});

			}
		}

	}])
	.filter("myFilter", function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    });