'use strict';

angular.module('angularToolsUiApp')
.service('todoGridService', [function () {
	var todoTest = 'todoGridのサービスです';
	return {
		setTodoTest: function(value) {
			todoTest = value;
		},
		getTodoTest: function() {
			return todoTest;
		}
	}
}])
.controller('TodogridCtrl', ['$scope', 'serverData', 'appService', 'todoGridService', function ($scope, serverData, appService, todoGridService) {

	todoGridService.setTodoTest('todoGridのサービスです(ページin)');
	appService.setTest('todoGridから遷移してきました。');

	// uiGridのオプション
	$scope.gridOptions = {
		// 行選択の表示/非表示
		enableRowSelection: true,
		// 全行選択の表示/非表示
		enableSelectAll: true,
		// 業選択のチェックボックスのWidth
		selectionRowHeaderWidth: 35,
		// 複数行の選択可否
		multiSelect: true,
		// 行の高さ
		// rowHeight: 35,
		// ui-gridのフッターの表示/非表示
		showGridFooter:false,
		// ui-gridのページャーの表示/非表示
		enablePaginationControls: false,
		// ui-gridのページャーAPI用の表示件数
		paginationPageSize: 5,
		// カラムのヘッダーメニューの表示/非表示
		enableColumnMenus:false,
		// uiGridのカラムの設定
		// @see 編集可能なテーブル設定 http://ui-grid.info/docs/#/tutorial/201_editable
		/**
		 * name : サーバーに送る(サーバーから取得する)物理名
		 * displayName : 画面表示用の名前
		 * @type {Array}
		 */
		columnDefs: [
			{ name: 'id', enableCellEdit: false},
			{ name: 'title', displayName: 'Todoタイトル(ソート不可)' ,enableSorting: false},
			{ name: 'done', displayName: '実行有無' },
			{ name: 'motivation', displayName: 'やる気', editableCellTemplate: 'ui-grid/dropdownEditor', width: '20%',
				cellFilter: 'mapMotivation', editDropdownValueLabel: 'motivation', editDropdownOptionsArray: [
					{ id: 1, motivation: 'あり' },
					{ id: 2, motivation: 'なし' }
				] },
		]
	};
	// gridで提供されているAPIを$scopeに登録する。
	$scope.gridOptions.onRegisterApi = function( gridApi ) {
		$scope.gridApi = gridApi;
	};

	var todoData = [];
	var count = 1;
	$scope.addTodo = function () {
		console.log($scope.newTitle);
		$scope.gridOptions.data.push({
			'id': count++,
			'title': $scope.newTitle,
			'done': false,
			'motivation': 1
		});
	};

	var postjson = {
		'yobidashimoto': 'todogrid',
		'etc': 'etc'
	};
	$scope.getTodo = function() {
		serverData.getServerData("data/sample", postjson).then(function(res) {
			var data = res.data.sampledata;
			for(var i = 0; i < data.length; i++){
				if (data[i].motivation != 1 && data[i].motivation != 2) {
					data[i].motivation = data[i].motivation == 'あり' ? 1 : 2;
				}
			}
			$scope.gridOptions.data = data;
			count = data.length + 1;
		});

	};

	// 選択されている行のデータを取得する。
	// @see http://ui-grid.info/docs/#/tutorial/210_selection
	$scope.showSelectedRows = function() {
		$scope.selectedRows = $scope.gridApi.selection.getSelectedRows();
	};

	$scope.showGetSelectedRowslog = function() {
		console.log($scope.gridApi.selection.getSelectedRows());
	};
}])
.filter('mapMotivation', function() {
  var motivationHash = {
    1: 'あり',
    2: 'なし'
  };
 
  return function(input) {
    if (!input){
      return '';
    } else {
      return motivationHash[input];
    }
  };
})
;
