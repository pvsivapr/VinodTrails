
/************Here We Are Declaring The Application module**************************/              
var app = angular.module("myApp", ["ui.router"]);
/************For Navigation purpose**************************/        
app.config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/consulation');
    $stateProvider
    .state("consulation", {
          url: '/consulation',
        templateUrl : "consulation.html",
        controller : "londonCtrl"
    })
    .state("shop", {
        url: '/shop',
        templateUrl : "shop.html",
        controller : "dataGet"
    })
    .state("Job Post", {
        url: '/JobPost',
        templateUrl : "JobPost.html",
        controller :"jobpost"
    })
    .state("blog", {
        url: '/blog',
        templateUrl : "blog.html"
    })
    .state("aboutUs",
           {url:'/aboutus',
            templateUrl:"Aboutus.html",
            controller :"filecntrl"
           })
    .state("fulldata1", {
        url: '/viewall',
        templateUrl : "viewall.html",
         controller :"viewall"
       
    })
 
});
/*********consolution*************/
app.controller('londonCtrl', function($scope,$http,registerdata)
               {
    $scope.CurrentDate = new Date();
    $scope.data = {};//data assigning
    $scope.data1 = {};//data assigning
    $scope.data = null;
     $scope.data1 = null;
    registerdata.gettingData().success(function(data)
        {
           $scope.details = data;//getting data 
        });
	 $scope.onSubmit = function() //submit the registration form
     {
          $scope.CurrentDate = new Date();
          var data11=$scope.data;
          registerdata.insertData(data11).success(function (data) 
          {
                $scope.students = data.affectedRows;//getting Response from inserting
                var insertid1=data.insertId;
                var file = $scope.myFile;
                var uploadUrl = "http://localhost:6737/images";
               registerdata.uploadFileToUrl(file,insertid1, uploadUrl);
                 if($scope.students==1)
                     {
                        $scope.message = data.affectedRows;
                        registerdata.gettingData().success(function(data)
                        {
                           $scope.details = data;
                       });
                     }
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
	   }
         $scope.deleteInfo=function(p_id)//Delete the row
        {
            var datafinal = {p_id};
            registerdata.deleteData(datafinal).success(function(data, status, headers, config)
        {
                if(data.affectedRows==1)
                {
                 registerdata.gettingData().success(function(data)
                        {  $scope.details = data;});
                }
        }).error(function(data, status, header, config) { $scope.result = "Data: " + status;  });
    }
         $scope.editInfo=function(detail){
             $scope.mymodal="#myModal";
             $scope.data1 = detail;
            $scope.updateRegister=function()
            {
              var datafinal=$scope.data1;
                registerdata.updateData(datafinal).success(function (data){
                    if(data.affectedRows==1)
                {
                    $scope.message = data.affectedRows;
                 registerdata.gettingData().success(function(data)
                        {  $scope.details = data;});
                }
                });
               // window.alert(x.reg_name);
            }
      
    }
         
         $scope.Activate=function(detail,activate){
           
             if(activate == 0){
                 var x = 1;
             registerdata.deactivate(detail,x).success(function(data){
                 
                 if(data.affectedRows==1){
                    
                    
                 }
             });
             }
              else if(activate==1){
                 var x = 0;
             registerdata.deactivate(detail,x).success(function(data){
                 
                 
             });
             }
         }

         
});
/************************shop *******************************/
app.controller('dataGet' , function($scope,$http,registerdata,$state,myService){
//getting the data
registerdata.gettingData().success(function(data)
{ $scope.details = data; });
    $scope.deleteInfo=function(p_id){
         var datafinal = {p_id};
        registerdata.deleteData(datafinal).success(function(data, status, headers, config)
        {
                if(data.affectedRows==1)
                {
                 registerdata.gettingData().success(function(data)
                        {  $scope.details = data;});
                }
        }).error(function(data, status, header, config) { $scope.result = "Data: " + status;  });
    }
    
    $scope.fulldata=function(detail){
    myService.set(detail);
                $state.go("fulldata1"); 
       
    }
    //delete the data 
 $scope.editInfo=function(p_id,reg_name,reg_password,reg_email){
        $scope.editprofile=[p_id,reg_name,reg_password,reg_email,myFile];
    }
});
/*****************file uploading*******************************/
    app.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);
/*****************about *******************************/
     app.controller('filecntrl',  function($scope, registerdata){
        $scope.ranga = function(){
            window.alert('hi');
          /* var file = $scope.myFile;
           var uploadUrl = "http://localhost:6737/images";
           registerdata.uploadFileToUrl(file, uploadUrl);*/
              foxscript.src = '//js.foxpush.com/cachetrixcom.js?v='+Math.random();
           foxscript.type = 'text/javascript';
           foxscript.async = 'true';
      // var fox_s = document.getElementsByTagName('script')[0];
        var fox_s = "hiiiiiiii";
       fox_s.parentNode.insertBefore(foxscript, fox_s);
        };
     });


/*****************************insights*****************************************/

app.controller('viewall',function($scope,myService){
       $scope.desiredLocation = myService.get();
});
/*****************************Job post*****************************************/

app.controller('jobpost',function($scope){
      $scope.selection=function(){
          
      }
});

/*****************All services are written here *******************************/
app.service('registerdata',function($http){
    this.insertData=function(data11){
      return $http.post('http://localhost:6737/register',data11);
    } ;
      this.gettingData=function(){
      return $http.get('http://localhost:6737/getdbRegister');
    } ;
    
       this.deleteData=function(datafinal){
      return $http.post('http://localhost:6737/delete_person',datafinal);
    } ;
        this.updateData=function(datafinal){
      return $http.post('http://localhost:6737/updatedata',datafinal);
    } ;
        this.deactivate=function(datafinal,x){
              var details={datafinal,x}
      return $http.post('http://localhost:6737/deactivate',details);
    } ;
  this.uploadFileToUrl = function(file,insertid1, uploadUrl){
      
           var fd = new FormData();
           fd.append('file', file);
      fd.append('insertid1', insertid1);
            
      
           $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           })

           .success(function(){
           })

           .error(function(){
           });
        }   
});


/**********************factorymethod*********************************/

app.service('myService', function() {
 var savedData = {}
 function set(detail) {
   savedData = detail;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

});