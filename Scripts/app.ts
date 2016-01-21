///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>

module UMP
{
  export class Module
  {
    app: ng.IModule;

    constructor( name: string, modules: Array< string > )
    {
      this.app = angular.module( name, modules );
      this.app.config(function($routeProvider){
        $routeProvider.otherwise({redirectTo:'/users'});
      })
    }

    addController( name: string, controller: Function )
    {
      this.app.controller( name, controller );
    }

    addService( name: string, service: Function ): void
    {
      this.app.service( name, service );
    }

    addFactory( name: string, factory: Function ): void
    {
      this.app.factory( name, factory );
    }

    addRoute(url: string, htmlPath: string, controller: string): void
    {
      this.app.config(function($routeProvider, $animateProvider) {
        $routeProvider.when(url, {
                templateUrl : htmlPath,
                controller  : controller
            });
          });
    }
  }
}

module UMPApp
{
  var myApp = new UMP.Module( 'UMPApp', ['ngRoute', 'ui.select', 'ngSanitize'] );
  myApp.addController( 'navigationController', NavigationController );
  myApp.addController( 'UMPUsersController', UsersController );
  myApp.addController( 'UMPTeacherController', TeacherController );
  myApp.addController( 'UMPBulkUploadController', BulkUploadController );
  // myApp.addController( 'projectListController', ProjectListController );
  // myApp.addController( 'projectController', ProjectController );
  // myApp.addController( 'footerController', FooterController );
  // myApp.addController( 'lifestyleController', LifestyleController );
  // myApp.addController( 'trustsController', TrustsController );
  // myApp.addController( 'entitiesController', EntitiesController );
  // myApp.addController( 'financialsController', FinancialsController );
  // myApp.addController( 'clientsSettingsController', ClientsSettingsController );
  myApp.addService('navigationService', NavigationService);
  myApp.addService('usersService', UsersService);
  myApp.addService('teacherService', TeacherService);
  // myApp.addService('projectService', ProjectService);
  // myApp.addFactory('navigationFactory', NavigationFactory);
  myApp.addRoute("/user", "partials/user.html", "UMPUserController");
  myApp.addRoute("/users", "partials/users.html", "UMPUsersController");
  myApp.addRoute("/teachers", "partials/teachers.html", "UMPTeacherController");
  myApp.addRoute("/bulkupload", "partials/bulkupload.html", "UMPBulkUploadController");
  myApp.app.directive('rowLink', ['$location', function ($location) {
  return{
    restrict: 'A',
    link: function (scope, element, attr) {
      element.attr('style', 'cursor:pointer');
      element.on('click', function(){
        console.log(attr.rowLink);
        $location.path(attr.rowLink);
        scope.$apply();
      });
    }
  }
}]);
}
