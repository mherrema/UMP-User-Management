///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>
var UMP;
(function (UMP) {
    var Module = (function () {
        function Module(name, modules) {
            this.app = angular.module(name, modules);
            this.app.config(function ($routeProvider) {
                $routeProvider.otherwise({ redirectTo: '/users' });
            });
        }
        Module.prototype.addController = function (name, controller) {
            this.app.controller(name, controller);
        };
        Module.prototype.addService = function (name, service) {
            this.app.service(name, service);
        };
        Module.prototype.addFactory = function (name, factory) {
            this.app.factory(name, factory);
        };
        Module.prototype.addRoute = function (url, htmlPath, controller) {
            this.app.config(function ($routeProvider, $animateProvider) {
                $routeProvider.when(url, {
                    templateUrl: htmlPath,
                    controller: controller
                });
            });
        };
        return Module;
    })();
    UMP.Module = Module;
})(UMP || (UMP = {}));
var UMPApp;
(function (UMPApp) {
    var myApp = new UMP.Module('UMPApp', ['ngRoute', 'ui.select', 'ngSanitize']);
    myApp.addController('navigationController', UMPApp.NavigationController);
    myApp.addController('UMPUsersController', UMPApp.UsersController);
    myApp.addController('UMPTeacherController', UMPApp.TeacherController);
    myApp.addController('UMPBulkUploadController', UMPApp.BulkUploadController);
    // myApp.addController( 'projectListController', ProjectListController );
    // myApp.addController( 'projectController', ProjectController );
    // myApp.addController( 'footerController', FooterController );
    // myApp.addController( 'lifestyleController', LifestyleController );
    // myApp.addController( 'trustsController', TrustsController );
    // myApp.addController( 'entitiesController', EntitiesController );
    // myApp.addController( 'financialsController', FinancialsController );
    // myApp.addController( 'clientsSettingsController', ClientsSettingsController );
    myApp.addService('navigationService', UMPApp.NavigationService);
    myApp.addService('usersService', UMPApp.UsersService);
    myApp.addService('teacherService', UMPApp.TeacherService);
    // myApp.addService('projectService', ProjectService);
    // myApp.addFactory('navigationFactory', NavigationFactory);
    myApp.addRoute("/user", "partials/user.html", "UMPUserController");
    myApp.addRoute("/users", "partials/users.html", "UMPUsersController");
    myApp.addRoute("/teachers", "partials/teachers.html", "UMPTeacherController");
    myApp.addRoute("/bulkupload", "partials/bulkupload.html", "UMPBulkUploadController");
    myApp.app.directive('rowLink', ['$location', function ($location) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    element.attr('style', 'cursor:pointer');
                    element.on('click', function () {
                        console.log(attr.rowLink);
                        $location.path(attr.rowLink);
                        scope.$apply();
                    });
                }
            };
        }]);
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=app.js.map