lrdcom.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	
	$urlRouterProvider.otherwise('/404');

	$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'src/pages/home.html',
			data : {
	           cssClassnames : 'page-home'
	       }
		})

		.state('404', {
		    // no url defined
		    template: '<div>error</div>',
		  })

		.state('about', {
			url: '/about',
			templateUrl: 'src/pages/about.html',
			data : {
	           cssClassnames : 'about'
	       }
		})

		.state('tickets', {
			url: '/tickets',
			templateUrl: 'src/pages/General/tickets.html'
		})

		.state('events-app', {
			url: '/events-app',
			templateUrl: 'src/pages/Events App/events-app.html'
		})

		.state('landing-page-creation', {
			url: '/landing-page-creation',
			templateUrl: 'src/pages/Digital Content Hub/landing-page-creation.html'
		})

		.state('localization', {
			url: '/localization',
			templateUrl: 'src/pages/Updating Content/localization.html'
		})

		.state('case-studies', {
			url: '/case-studies',
			templateUrl: 'src/pages/Updating Content/case-study.html'
		});

});