(function() {
    'use strict'

    angular.module('wt.theme', ['ngMaterial'])
        .config(config);

    config.$inject = ['$mdThemingProvider'];

    function config($mdThemingProvider) {
        var customPrimary = {
        '50': '#fbd89c',
        '100': '#face83',
        '200': '#f9c56a',
        '300': '#f8bb52',
        '400': '#f7b239',
        '500': '#f6a821',
        '600': '#f49e0a',
        '700': '#db8e09',
        '800': '#c37e08',
        '900': '#aa6e07',
        'A100': '#fce2b4',
        'A200': '#fdebcd',
        'A400': '#fef5e5',
        'A700': '#925e06'
            },
            customAccent = {
                '50': '#ffffff',
                '100': '#ffffff',
                '200': '#ffffff',
                '300': '#f3f3f3',
                '400': '#e7e7e7',
                '500': '#dadada',
                '600': '#cdcdcd',
                '700': '#c0c0c0',
                '800': '#b4b4b4',
                '900': '#a7a7a7',
                'A100': '#ffffff',
                'A200': '#ffffff',
                'A400': '#ffffff',
                'A700': '#9a9a9a'
            },
            customWarn = {
                '50': '#ffb280',
                '100': '#ffa266',
                '200': '#ff934d',
                '300': '#ff8333',
                '400': '#ff741a',
                '500': '#ff6400',
                '600': '#e65a00',
                '700': '#cc5000',
                '800': '#b34600',
                '900': '#993c00',
                'A100': '#ffc199',
                'A200': '#ffd1b3',
                'A400': '#ffe0cc',
                'A700': '#803200'
            },
            customBackground = {
        '50': '#686e82',
        '100': '#5c6274',
        '200': '#515666',
        '300': '#464a57',
        '400': '#3a3e49',
        '500': '#2f323b',
        '600': '#24262d',
        '700': '#181a1f',
        '800': '#2f323b',
        '900': '#020202',
        'A100': '#737a90',
        'A200': '#81889b',
        'A400': '#9095a6',
        'A700': '#000000'
            };


        $mdThemingProvider.definePalette('customPrimary', customPrimary);
        $mdThemingProvider.definePalette('customAccent', customAccent);
        $mdThemingProvider.definePalette('customWarn', customWarn);
        $mdThemingProvider.definePalette('customBackground', customBackground);
        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
           .accentPalette('customAccent')
           .warnPalette('customWarn')
           .backgroundPalette('customBackground')
        .dark();
    }
})();
