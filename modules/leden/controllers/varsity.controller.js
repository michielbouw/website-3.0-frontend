/*
 * Thetasite app structure AngularJS
 *
 * December 2014, Michiel Bouw
 */
angular.module('theta.leden')
    .controller('varsity', ['$scope', function ($scope) {
        var today = new Date();

        function getFirstSunday(year, month){
            var Firstday = new Date(year, month, 1);
            var FirstdayWeek = Firstday.getDay();
            var firstSunday = new Date(year, month, (7 - FirstdayWeek)%7);
            return firstSunday.getDay();
        }

        if (today.getMonth() > 3) {
            var y = today.getFullYear() + 1;
            var m = 3;
            var d = getFirstSunday(y,m);
            // var d = 5; //fill in if day is not first sunday of april
            $scope.number = y - 1883;
        } else {
            var y = today.getFullYear();
            var m = 3;
            var d = getFirstSunday(y,m);
            // var d = 5; //fill in if day is not first sunday of april
            $scope.number = y - 1883;
        }

        var t2 = today;
        var t1 = new Date(y,m,d);
        $scope.days = parseInt((t1-t2)/(24*3600*1000));

        if($scope.days > 1 || $scope.days == 0) {
            $scope.countdown = "dagen";
        } else if($scope.days == 1) {
            $scope.countdown = "dag";
        }

        if (today.getMonth() == 3 && today.getDay() > d) {
            $scope.days = 0;
        }
    }]);
