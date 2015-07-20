'use strict';

angular.module('angularToolsUiApp')
.service('todoGridService', ['$rootScope','serverData', '$q', function ($rootScope, serverData, $q) {
	var todoTest = 'todoGridのサービスです';
	var count = 1;
	var data = [];
	var gridNum = 10;

	var postjson = {
		'yobidashimoto': 'todogrid',
		'etc': 'etc'
	};
	// 非同期な呼び出し
	var asyncGetTodoData = function() {
		// 非同期処理の準備
		// deferredオブジェクトの目的は、成功/失敗の完了のシグナルが使用できるAPI
		// @see http://js.studio-kingdom.com/angularjs/ng_service/$q
		var deferred = $q.defer();

		// $httpでサーバーからデータを取得する。
		serverData.getServerData("data/sample", postjson).then(function(res) {
			console.log(res);
			if (res.status == 200) {
				// success
				// promise 処理中における通知を示す。呼び出し元で定義された .then()の第三引数 が実行される
				deferred.notify('取得完了。データ作成中です。');
				var _data = res.data.sampledata;
				for(var i = 0; i < _data.length; i++){
					if (_data[i].motivation != 1 && _data[i].motivation != 2) {
						_data[i].motivation = _data[i].motivation == 'あり' ? 1 : 2;
					}
				}
				data = _data;
				count = data.length + 1;
				// promise 処理の成功を示す。呼び出し元で定義された .then()の第一引数 が実行される
				deferred.resolve('データ作成完了');
			} else {
				// error
				// promise 処理の失敗を示す。呼び出し元で定義された .then()の第二引数 が実行される
				deferred.reject('えらー');
			}
		});

		// promise chainのため、promiseインスタンスを返却する。
		return deferred.promise;
	};

	return {
		setTodoTest: function(value) {
			todoTest = value;
		},
		getTodoTest: function() {
			return todoTest;
		},
		setData: function(value) {
			data.push({
				'id': count++,
				'title': value,
				'done': false,
				'motivation': 1
			});
			$rootScope.$broadcast('changedData');
		},
		getData: function() {
			return data;
		},
		getServerData: function() {
			// 非同期処理を実行する。
			var promise = asyncGetTodoData();
			// 非同期処理の状態に応じた処理を実行する。
			// ここに記述で良いのか？非同期処理をする関数の引数でコールバック関数を渡すのが良い？よくわからん。。。
			promise
				.then(function(resolveObj) {
						// 成功時のアクション
						console.log('成功時のアクションを実行します。' + resolveObj);
						$rootScope.$broadcast('changedData');
					}, function(rejectObj) {
						// エラー時のアクション
						console.log('エラー時のアクションを実行します。' + rejectObj);
						alert('データの取得に失敗しました。');
					}, function(notifyObj) {
						// 処理中のアクション
						console.log('処理中のアクションを実行します。' + notifyObj);
					})
				.finally(function() {
					// 後処理のアクション
					console.log('後処理のアクションを実行します。');
				});
		},
		setGridNum: function(num) {
			gridNum = num;
			$rootScope.$broadcast('changedGridNum');
		},
		getGridNum: function() {
			return gridNum;
		}
	}
}])
.controller('TodogridviewCtrl', ['$scope', '$rootScope', '$q', 'todoGridService', function ($scope, $rootScope, $q, todoGridService) {

	// Todoに項目を追加する。
	$scope.addTodo = function () {
		console.log($scope.newTitle);
		todoGridService.setData($scope.newTitle);
	};
	// サーバーからデータを取得する。
	$scope.getTodo = function() {
		todoGridService.getServerData();
	};

	// 選択されている行のデータを取得する。
	// @see http://ui-grid.info/docs/#/tutorial/210_selection
	$scope.showSelectedRows = function() {
		$rootScope.$broadcast('showSelectedRows');
	};

	// UI GridのAPIのgetSelectedRowsをログに出力する。
	$scope.showGetSelectedRowslog = function() {
		$rootScope.$broadcast('showGetSelectedRowslog');
	};

	$scope.gridNum = 5;
	todoGridService.setGridNum($scope.gridNum);
	$scope.$watch('gridNum', function() {
		// $scope.gridNum の 値 が変わった時
		todoGridService.setGridNum($scope.gridNum);
	});
}]);
