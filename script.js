var app = angular.module('main', ['ngTable']).
controller('DemoCtrl', function($scope,$element, $http, ngTableParams) {
	$scope.data = [];
	$scope.details = [];
	$http.get("data.json").success(function(result){
		//$scope.dataset =$scope.data;
	$scope.data= result;
	$scope.showitem=false;
	$scope.addform=false;
	$scope.searchuserdata=false;	
	$scope.showuserlist=true;
  $scope.showdataitem=false;
  $scope.searchResult=false;
	//$scope.filedata = 'none';
	$scope.usercount=$scope.data.length;
	$scope.adddata=function(){
		 $scope.newid=$scope.data.length + 1;//alert($element.attr("class"));
		 $scope.data.push({
				id:$scope.newid,
				name:$scope.username,
				age:$scope.age,
				country:$scope.country,
				gender:"male",
				imgpath:$scope.imageupload
		});
				/*var f = document.getElementById('file').files[0],
				r = new FileReader();
				r.onloadend = function(e){
				$scope.filedata = e.target.result;
				}
				r.readAsBinaryString(f);*/
	$scope.username='';
	$scope.age='';
	$scope.country='';
	$scope.addform=false;
	$scope.usercount++;
	};

	$scope.showdata=function(userid,names,ages,usercountry,usergender){
		$scope.details = [];
   // names=$.trim(names);
    /*$scope.namess = {
        text: names,
        word: /^\s*\w*\s*$/
      };*/
		$scope.details.push({id:names+usercountry+userid,name:names,age:ages,country:usercountry,gender:usergender,email:names+'@angular.in'});
		$scope.showitem=true;
	};
	$scope.removename = function (index) {
   		 $scope.data.splice(index, 1);//alert(index);http://hello-angularjs.appspot.com/removetablerow
		$scope.usercount--;
	};
	$scope.showtotalusers=function(){
		$scope.showuserlist=!$scope.showuserlist;
	};
	$scope.hidetotalusers=function(){
		$scope.showuserlist=false;
	};
	$scope.close=function(){
		$scope.showitem=false;
	};
	$scope.addclose=function(){
		$scope.addform=!$scope.addform;
	};
	$scope.addusers=function(){
		$scope.addform=!$scope.addform;
	};
	$scope.searchusers=function(){
		$scope.searchuserdata=!$scope.searchuserdata;
    
	};
  $scope.searchdata=function(){
      if($scope.search.length>0){
          $scope.resultset=[];
        
		     angular.forEach($scope.data, function(value, key) {
                if (value.name === $scope.search) {
                     $scope.num=$scope.resultset.length + 1;
                    $scope.resultset.push({number:$scope.num,id:value.id,name:value.name,age:value.age,country:value.country,gender:value.gender,profile:value.profile});
                }
             //$scope.num++;
            })
        $scope.searchResult=true;
        $scope.searchuserdata=false;
       // alert($scope.resultset.length);
    }
	};
      
	$scope.searchclose=function(){
		$scope.searchuserdata=!$scope.searchuserdata;
    $scope.search='';
     $scope.searchResult=false;
	};
	$scope.tableParams = new ngTableParams({
		page: 1, // show first page
		count: 10 // count per page
	}, {
	total:$scope.data.length, // length of data
	getData: function($defer, params) {
	//params.total();
	$defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	//$defer.resolve($scope.dataset.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	}
	});
	});
});

//angular.bootstrap(document, ['main']);
