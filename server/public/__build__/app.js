webpackJsonp([1,2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var angular2_1 = __webpack_require__(486);
	var router_1 = __webpack_require__(701);
	var http_1 = __webpack_require__(725);
	var app_1 = __webpack_require__(740);
	angular2_1.bootstrap(app_1.App, [
	    angular2_1.FORM_PROVIDERS,
	    router_1.ROUTER_PROVIDERS,
	    http_1.HTTP_PROVIDERS,
	    angular2_1.ELEMENT_PROBE_PROVIDERS
	]);


/***/ },

/***/ 740:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(486);
	var http_1 = __webpack_require__(725);
	var router_1 = __webpack_require__(701);
	var XLarge = (function () {
	    function XLarge(element, renderer) {
	        renderer.setElementStyle(element, 'fontSize', 'x-large');
	    }
	    XLarge = __decorate([
	        angular2_1.Directive({
	            selector: '[x-large]'
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef, angular2_1.Renderer])
	    ], XLarge);
	    return XLarge;
	})();
	exports.XLarge = XLarge;
	var App = (function () {
	    function App(http) {
	        this.http = http;
	        this.title = 'Angular 2';
	    }
	    App = __decorate([
	        angular2_1.Component({
	            selector: 'app',
	            directives: [router_1.ROUTER_DIRECTIVES, XLarge],
	            styles: ["\n    .title {\n      font-family: Arial, Helvetica, sans-serif;\n    }\n    main {\n      padding: 1em;\n    }\n  "],
	            template: "\n  <header>\n    <h1 class=\"title\">Hello {{ title }}</h1>\n  </header>\n\n  <main>\n    Your Content Here\n    <div>\n\n      <input type=\"text\" [value]=\"title\" (input)=\"title = $event.target.value\" autofocus>\n      <!--\n        Rather than wiring up two-way data-binding ourselves\n        we can use Angular's [(ngModel)] syntax\n        <input type=\"text\" [(ngModel)]=\"title\">\n      -->\n    </div>\n\n    <pre>this.title = {{ title | json }}</pre>\n\n  </main>\n\n  <footer x-large>\n    WebPack Angular 2 Starter by <a href=\"https://twitter.com/AngularClass\">@AngularClass</a>\n  </footer>\n  "
	        }), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], App);
	    return App;
	})();
	exports.App = App;


/***/ }

});
//# sourceMappingURL=app.js.map