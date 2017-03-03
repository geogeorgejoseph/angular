var app = angular.module('main', ['ngTable']).
controller('DemoCtrl', function($scope,$element, $http, ngTableParams,$timeout) {
	$scope.data = [];
  $scope.usernames=[];
	$scope.details = [];
	$http.get("data.json").success(function(result){
		//$scope.dataset =$scope.data;
//http://embed.plnkr.co/ip6owK/ indexed db
	$scope.data= result;
	$scope.showitem=false;
	$scope.addform=false;
	$scope.searchuserdata=false;	
	$scope.showuserlist=true;
  $scope.showdataitem=false;
  $scope.searchResult=false;
  $scope.usersearchdata=false;
  $scope.activedetailsclass="inactive";
  $scope.activeadduserclass="inactive";
	//$scope.filedata = 'none';
	$scope.usercount=$scope.data.length;
	$scope.adddata=function(){
        $scope.activeadduserclass="inactive";
		 $scope.newid=$scope.data.length + 1;//alert($element.attr("class"));
		 $scope.data.push({
				id:$scope.newid,
				name:$scope.username,
				age:$scope.age,
				country:$scope.country,
        profile:$scope.info,
				gender:$scope.persongender,
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

	$scope.showdata=function(userid,names,ages,usercountry,usergender,infouser){
		$scope.details = [];
   // names=$.trim(names);
    /*$scope.namess = {
        text: names,
        word: /^\s*\w*\s*$/
      };*/
		$scope.details.push({id:names+usercountry+userid,name:names,age:ages,country:usercountry,gender:usergender,profile:infouser,email:names+'@angular.in'});
		$scope.showitem=true;
     $scope.activedetailsclass="active";
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
     $scope.activedetailsclass="inactive";
	};
	$scope.addclose=function(){
      $scope.activeadduserclass="inactive";
		$scope.addform=!$scope.addform;
	};
	$scope.addusers=function(){
  $scope.activeadduserclass="active";
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
  $scope.showcurrent=function(a){
     
          $scope.resultset=[];
        
		     angular.forEach($scope.data, function(value, key) {
                if (value.name === a) {
                     $scope.num=$scope.resultset.length + 1;
                    $scope.resultset.push({number:$scope.num,id:value.id,name:value.name,age:value.age,country:value.country,gender:value.gender,profile:value.profile});
                }
             //$scope.num++;
            })
        $scope.searchResult=true;
        $scope.searchuserdata=false;
       // alert($scope.resultset.length);
	};
      
	$scope.searchclose=function(){
		$scope.searchuserdata=!$scope.searchuserdata;
    //$scope.search='';
     $scope.searchResult=false;
	};
  //http://ng-table.com/#/intro/demo-real-world
	$scope.tableParams = new ngTableParams({
		page: 1, // show first page
		count: 5 // count per page
	}, {
	total:$scope.data.length, // length of data
	getData: function($defer, params) {
	//params.total();
  //dataset: $scope.data; 
	$defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	//$defer.resolve($scope.dataset.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	}
	});
	});
});
app.directive('search',function($timeout){
     return {
      restrict: 'C',
      link:function(scope, element, attrs){
          element.on("keydown keypress",function(){
                $timeout(function() {
                 scope.usersearchdata=true;
                },1000);
           })
        }
      }
})
//angular.bootstrap(document, ['main']);
