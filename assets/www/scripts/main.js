require.config({
    paths:{
        // RequireJS plugin
        text:'libs/require/text',
        // RequireJS plugin
        domReady:'libs/require/domReady',
        // underscore library
        underscore:'libs/underscore/underscore',
        // Backbone.js library
        Backbone:'libs/backbone/backbone',
        // jQuery
        jquery:'libs/jquery/jquery-1.9.1',

        //backtack view pusher
        backstack:'libs/backstack/backstack-min',
    },
    shim:{
        Backbone : {
            deps:['underscore', 'jquery'],
            exports:'Backbone'
        },
        underscore : {
            exports:'_'
        },
        backstack : {
            deps:['Backbone', 'underscore', 'jquery'],
        }
    }
});

require(['domReady', 'views/home/HomeView', 'backstack'],
    function (domReady, HomeView, Backstack) {

        // domReady is RequireJS plugin that triggers when DOM is ready
        domReady(function () {
            
            //ondevice ready is cordave(phonegap) function
            function onDeviceReady(desktop) {
                // Hiding splash screen when app is loaded
                if (desktop !== true) {
                    cordova.exec(null, null, 'SplashScreen', 'hide', []);
                }
                alert('started');
                //Put all the event functions of backbone inside a Vent object
                window.App = {
                    Vent: _.extend({}, Backbone.Events),
                    StackNavigator : new Backstack.StackNavigator({el: '#container'})
                };

                App.StackNavigator.pushView(new HomeView());
            }

            if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                // This is running on a device so waiting for deviceready event
                console.log('HAPPENS FIRST DO HERE DATABASE JOB!')
                document.addEventListener('deviceready', onDeviceReady, false);
            } else {
                // On desktop don't have to wait for anything
                onDeviceReady(true);
            }
        });

    });