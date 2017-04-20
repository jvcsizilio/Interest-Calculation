(function (angular, _) {
    //'use strict';

app.controller('indexCtrl', ['$scope', function($scope){

    // vars on scope
    $scope.model = {};
    $scope.showForm = true;
    $scope.result = {};
    $scope.result.items = []

    // methods on scope
    $scope.calculate = calculate;
    $scope.back = back;


    function start() {
        console.log('Hello');
    }

    function calculate() {
        if (!valid()) {
            return;
        }

        switch ($scope.model.interest) {
            case 'simple':
                simpleInterest($scope.model);
                break;
            case 'compound':
                compoundInterest($scope.model);
                break;
            default:
                break;
        }

        $scope.showForm = false;
    }

    function valid() {
        if (!$scope.model.interest ||
                !$scope.model.period ||
                !$scope.model.principal ||
                !$scope.model.rate ||
                ($scope.model.interest == 'compound' && !$scope.model.frequency)) {

            alert('Please fill all fields');
            return false;
        }

        // impedir numeros negativos

        return true;
    }

    function simpleInterest(filter) {
        $scope.result.items = [];
        var interest = (filter.principal / 100) * filter.rate;

        for (var x=0; x<filter.period; x++) {
            var item = {};

            if ($scope.result.items.length == 0) {
                item.initial = filter.principal;
            } else {
                item.initial = $scope.result.items[x-1].total;
            }

            item.interest = interest;
            item.total = item.interest + item.initial;
            $scope.result.items.push(item);
        }

        $scope.result.total = $scope.result.items[$scope.result.items.length -1].total;
        $scope.result.totalInterest = filter.principal * (filter.rate / 100) * filter.period;
    }

    function compoundInterest(filter) {
        $scope.result.items = [];
        var period = filter.period;
        var totalInterest = 0;

        for (var x=0; x<filter.period; x++) {
            var item = {};

            if ($scope.result.items.length == 0) {
                item.initial = filter.principal;
            } else {
                item.initial = $scope.result.items[x-1].total;
            }

            if (filter.period < filter.frequency) {
                item.interest = 0;
            } else if (filter.period == filter.frequency && (x+1) == filter.frequency) {
                item.interest = (item.initial / 100) * filter.rate;
            } else if (filter.period > filter.frequency && (x+1) % filter.frequency == 0) {
                item.interest = (item.initial / 100) * filter.rate;
            } else {
                item.interest = 0;
            }

            item.total = item.interest + item.initial;

            item.initial = parseFloat(item.initial.toFixed(2));
            item.interest = parseFloat(item.interest.toFixed(2));
            item.total = parseFloat(item.total.toFixed(2));

            totalInterest += item.interest;
            $scope.result.items.push(item);
        }

        $scope.result.total = $scope.result.items[$scope.result.items.length -1].total;
        $scope.result.total = parseFloat($scope.result.total.toFixed(2));

        $scope.result.totalInterest = totalInterest;
    }

    function back() {
        $scope.showForm = true;
        $scope.restult = {};
        $scope.restult.items = [];
        $scope.model = {};
        $scope.model.frequency = 1;
    }

    start();

}]);


})(window.angular, window._);
