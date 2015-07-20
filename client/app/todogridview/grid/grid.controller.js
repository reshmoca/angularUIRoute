'use strict';

angular.module('angularToolsUiApp')
.controller('GridCtrl', ['$scope', 'todoGridService', function ($scope, todoGridService) {

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
		paginationPageSize: todoGridService.getGridNum(),
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

	// とりあえず初期化
	$scope.gridOptions.data = todoGridService.getData();

	/**
	 * データが変更されたら取得する
	 */
	$scope.$on('changedData', function() {
		$scope.gridOptions.data = todoGridService.getData();
	});

	// 選択されている行のデータを取得する。
	// @see http://ui-grid.info/docs/#/tutorial/210_selection
	$scope.$on('showSelectedRows', function() {
		$scope.selectedRows = $scope.gridApi.selection.getSelectedRows();
	});

	$scope.$on('showGetSelectedRowslog', function() {
		console.log($scope.gridApi.selection.getSelectedRows());
	});

	$scope.$on('changedGridNum', function() {
		$scope.gridOptions.paginationPageSize = todoGridService.getGridNum();
	});


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
