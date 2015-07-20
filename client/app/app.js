'use strict';

angular.module('angularToolsUiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngTouch',
  'ui.bootstrap',
  'ui.grid',
  'ui.grid.selection',
  'ui.grid.edit',
  'ui.grid.pagination',
  'ngMockE2E'

])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
/**
 * システム全体で共有するサービス
 */
.service('appService', function () {
	var userid = 'userid4service';
	var username = 'username4service';
	var test = '最初';
	return {
	  getUserid: function() {
		return userid;
	  },
	  getUsername: function() {
	  	return username;
	  },
	  setTest: function(value) {
	  	test = value;
	  },
	  getTest: function() {
	  	return test;
	  }
	}
})
/**
 * angular-mockで擬似的なAPIサーバーを構築する。
 */
.run(['$httpBackend', function ($httpBackend) {

	// Routeで指定されたパスは無視する。
	$httpBackend.whenGET(/^app\//).passThrough();
	$httpBackend.whenGET(/^components\//).passThrough();
	$httpBackend.whenGET('/api/things').passThrough();

	// サーバーから帰ってくるJSONのサンプル
	var sample = {
			"sample": "サンプルです",
			"sampledata": [
			{
				"id": "1",
				"title": "タイトル1",
				"done": "false",
				"motivation": 1
			},
			{
				"id": "2",
				"title": "タイトル2",
				"done": "false",
				"motivation": 1
			},
			{
				"id": "3",
				"title": "タイトル3",
				"done": "false",
				"motivation": 'なし'
			},
			{
				"id": "4",
				"title": "タイトル4",
				"done": "false",
				"motivation": 1
			},
			{
				"id": "5",
				"title": "タイトル5",
				"done": "false",
				"motivation": 1
			},
			{
				"id": "6",
				"title": "タイトル6",
				"done": "false",
				"motivation": 'なし'
			},
			{
				"id": "7",
				"title": "タイトル7",
				"done": "false",
				"motivation": 1
			},
			{
				"id": "8",
				"title": "タイトル8",
				"done": "false",
				"motivation": 1
			},
			{
				"id": "9",
				"title": "タイトル9",
				"done": "false",
				"motivation": 'なし'
			},
			{
				"id": "10",
				"title": "タイトル10",
				"done": "false",
				"motivation": 1
			},
			{
				"id": "11",
				"title": "タイトル11",
				"done": "false",
				"motivation": 1
			},
			{
				"id": "12",
				"title": "タイトル12",
				"done": "false",
				"motivation": 'なし'
			}
		]
	};

	/**
	 * 擬似的なサーバー通信
	 */
	// $httpBackend.whenGET('data/sample.json').respond(function(method, url, data, headers) {
	// 		return [200, sample, {}];
	// });
	$httpBackend.whenPOST('data/sample').respond(function(method, url, data, headers) {
		console.log('postされたデータたち method%O, url%O, data%O, headers%O', method, url, data, headers);
		// jsonデータをobjectに変換してみる
		var objData = angular.fromJson(data);
		// if文も書けるよ
		if (objData.commonItem.username == 'ユーザー名') {
			console.log('welcome!!' + objData.commonItem.username);
		};
		// if (test.commonItem.userid == 'user id') {
		// 	console.log(test);
		// }
		return [200, sample, {}];
	});
}])
/**
 * json形式ではなく、parameterに値をセットしたい場合は、configで変換してやると$httpを使用する側は何も意識しなくて済む
 */
// .config(function ($httpProvider) {
// 	$httpProvider.defaults.transformRequest = function(data){
// 		if (data === undefined) {
// 			return data;
// 		}
// 		return $.param(data);
// 	}
// })
/**
 * サーバーと通信するサービス
 */
.factory('serverData', ['$http', 'appService', function ($http, appService) {
	// サーバー側のホストを指定する。
	var URL = '';

	return {
		getServerData: function(uri, parameters) {
			/**
			 * サーバーに送信するJSONを作成する
			 * @return {object}		サーバーへ送信するJSON
			 */
			var createPostJson = function(parameters) {
				var postJson = {};
				postJson['commonItem'] = createCommonItem('user','');
				postJson['parsonalItem'] = parameters;
				return postJson
			}
			/**
			 * サーバーに送信する共通部分をごにょごにょする
			 * @return {object}		共通部分
			 */
			var createCommonItem = function(userid, username) {
				var submitUserId = userid;
				var submitUserName = username;
				if (!submitUserId) {
					// 空の場合は、メモリからユーザーIDを取得する。
					submitUserId = appService.getUserid();
				}

				if (!submitUserName) {
					// 空の場合は、メモリからユーザー名を取得する。
					submitUserName = appService.getUsername();
				}

				var commonObj = {};
				commonObj['userid'] = appService.getUserid();
				commonObj['username'] = appService.getUsername();
				commonObj['submitUserid'] = submitUserId;
				commonObj['submitUsername'] = submitUserName;
				return commonObj;
			}

			return $http({
						method : 'POST',
						url : URL + uri,
						data: angular.toJson(createPostJson(parameters))
					}).success(function(data, status, headers, config) {
						//成功
						console.log('成功');
					}).error(function(data, status, headers, config) {
						//失敗
						console.log('失敗');
					});
		}

	}

  }]);
