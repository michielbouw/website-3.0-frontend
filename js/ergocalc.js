angular.module('ergocalc', [])
    .controller('ergocalculator', ['$scope', function($scope) {
        // ***** code voor het omrekenformulier *****

        $scope.txtDist = 2000;
        $scope.txtTimeMin = 0;
        $scope.txtTimeSec = 0;
        $scope.txtSplitMin = 0;
        $scope.txtSplitSec = 0;
        $scope.txtPower = 0;
        $scope.txtSpeed = 0;

        var b = 0;
        $scope.change1 = function() {
            if ($scope.txtDist == 2000 || !($scope.txtDist)) {
                if ($scope.txtSplitMin != 0 || $scope.txtSplitSec != 0) {
                    b = 4;
                } else if ($scope.txtPower != 0) {
                    b = 8;
                } else if ($scope.txtSpeed != 0) {
                    b = 16;
                }
            } else {
                b = 1;
                if ($scope.txtSpeed != 0) {
                    b = 17;
                } else if ($scope.txtPower != 0) {
                    b = 9;
                } else if ($scope.txtSplitMin != 0 || $scope.txtSplitSec != 0) {
                    b = 5;
                } else if ($scope.txtTimeMin != 0 || $scope.txtTimeSec != 0) {
                    b = 3;
                }
            }
            calc();
        };
        $scope.change2 = function () {
            if ($scope.txtDist) {
                b = 3;
            } else if ($scope.txtPower != 0) {
                b = 10;
            } else if ($scope.txtSpeed != 0) {
                b = 18;
            } else if ($scope.txtSplitMin != 0 || $scope.txtSplitSec != 0) {
                b = 6;
            }
            calc();
        };
        $scope.change3 = function() {
            if (!($scope.txtDist)) {
                b = 4;
                if ($scope.txtTimeMin != 0 || $scope.txtTimeSec != 0) {
                    b = 6;
                }
            } else {
                b = 5;
            }
            calc();
        };
        $scope.change4 = function() {
            if (!($scope.txtDist)) {
                b = 8;
                if ($scope.txtTimeMin != 0 || $scope.txtTimeSec != 0) {
                    b = 10;
                }
            } else {
                b = 9;
            }
            calc();
        };
        $scope.change5 = function() {
            if (!($scope.txtDist)) {
                b = 16;
                if ($scope.txtTimeMin != 0 || $scope.txtTimeSec != 0) {
                    b = 18;
                }
            } else {
                b = 17;
            }
            calc();
        };

        function round_1(x) {
            return (Math.round(x * 10) / 10);
        }

        function calc() {
            var d = 0;
            var t = 0;
            var u = 0;
            var p = 0;
            var v = 0;

            if (b & 1) d = $scope.txtDist;
            if (b & 2) t = $scope.txtTimeMin * 60 + $scope.txtTimeSec;
            if (b & 4) u = $scope.txtSplitMin * 60 + $scope.txtSplitSec;
            if (b & 8) p = $scope.txtPower;
            if (b & 16) v = $scope.txtSpeed;

            if (b == 3) {                  // d, t
                v = d / t;
                u = 500 * t / d;
                p = 2.8 * Math.pow(v, 3);
            } else if (b == 5) {           // d, u
                v = 500 / u;
                t = d / v;
                p = 2.8 * Math.pow(v, 3);
            } else if (b == 9) {           // d, p
                v = Math.pow(p / 2.8, 1 / 3);
                t = d / v;
                u = 500 / v;
            } else if (b == 17) {          // d, v
                v /= 3.6;
                t = d / v;
                u = 500 / v;
                p = 2.8 * Math.pow(v, 3);
            } else if (b == 6) {           // t, u
                v = 500 / u;
                d = v * t;
                p = 2.8 * Math.pow(v, 3);
            } else if (b == 10) {          // t, p
                v = Math.pow(p / 2.8, 1 / 3);
                d = v * t;
                u = 500 / v;
            } else if (b == 18) {          // t, v
                v /= 3.6;
                d = v * t;
                u = 500 / v;
                p = 2.8 * Math.pow(v, 3);
            } else if (b == 4) {            // u
                v = 500 / u;
                d = 2000;
                t = d / v;
                p = 2.8 * Math.pow(v, 3);
            } else if (b == 8) {            // p
                v = Math.pow(p / 2.8, 1 / 3);
                d = 2000;
                t = d / v;
                u = 500 / v;
            } else if (b == 16) {           // v
                d = 2000;
                v /= 3.6;
                t = d / v;
                u = 500 / v;
                p = 2.8 * Math.pow(v, 3);
            }
            var m = 0;

            if (!(b & 1)) $scope.txtDist = round_1(d);
            if (!(b & 2)) {
                t = round_1(t);
                m = Math.floor(t / 60);
                t %= 60;
                $scope.txtTimeMin = m;
                $scope.txtTimeSec = round_1(t);
            }
            if (!(b & 4)) {
                u = round_1(u);
                m = Math.floor(u / 60);
                u %= 60;
                $scope.txtSplitMin = m;
                $scope.txtSplitSec = round_1(u);
            }
            if (!(b & 8)) $scope.txtPower = round_1(p);
            if (!(b & 16)) $scope.txtSpeed = round_1(v * 3.6);

        }

        $scope.resetForm = function () {
            $scope.txtDist = 0;
            $scope.txtTimeMin = 0;
            $scope.txtTimeSec = 0;
            $scope.txtSplitMin = 0;
            $scope.txtSplitSec = 0;
            $scope.txtPower = 0;
            $scope.txtSpeed = 0;
        }
    }]);
