var app = angular.module('crypto', []);

app.controller('myCtrl', function($scope, $http){

    $scope.urlc = 'https://bravenewcoin-v1.p.rapidapi.com/digital-currency-symbols';
    $scope.urlf = 'https://bravenewcoin-v1.p.rapidapi.com/fiat-currency-symbols';

    $http({
        method: 'GET',
        url: $scope.urlc,
        headers: {
            "x-rapidapi-host": "bravenewcoin-v1.p.rapidapi.com",
            "x-rapidapi-key": "f3b50c0255msh74f9198d4b57a4ap1450cbjsn4931c16c924f"
        }
    }).then(function(response){
        //console.log(response.data.digital_currencies);
        $scope.c = response.data.digital_currencies;

        var ck = [];

        for(let obj of $scope.c){
            //console.log("object:", obj);
            for (let key in obj) {
                //console.log("key:", key, "value:", obj[key]);
                ck.push({"key":key, "value":obj[key]});
            }
        }
        $scope.crypt = ck;
       
    });

    $http({
        method: 'GET',
        url: $scope.urlf,
        headers: {
            "x-rapidapi-host": "bravenewcoin-v1.p.rapidapi.com",
            "x-rapidapi-key": "f3b50c0255msh74f9198d4b57a4ap1450cbjsn4931c16c924f"
        }
    }).then(function(response){
        console.log(response.data);
        $scope.c = response.data.fiat_currencies;

        var fk = [];
         
        for(let obj of $scope.c){
            //console.log("object:", obj);
            for (let key in obj) {
                //console.log("key:", key, "value:", obj[key]);
                fk.push({"key":key, "value":obj[key]});
            }
        }
        $scope.curr = fk;
       
    });


    $scope.convert = function () {

        var q = $scope.crypto_input;
        var f = $scope.cryptocurrency;
        var t = $scope.currency;

        $http({
            method: 'GET',
            url: "https://bravenewcoin-v1.p.rapidapi.com/convert?qty="+q+"&from="+f+"&to="+t,
            headers: {
                "x-rapidapi-host": "bravenewcoin-v1.p.rapidapi.com",
                "x-rapidapi-key": "f3b50c0255msh74f9198d4b57a4ap1450cbjsn4931c16c924f"
            }
        }).then(function(response){
            //console.log(response);
            $scope.curr_output = response.data.to_quantity;
        });
    }
});