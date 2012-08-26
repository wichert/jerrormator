var Jerror = {
	options : {
		api_key : "foo",
	},

	init : function(options) {
		if (typeof options.endpoint == 'undefined') {
			options.endpoint = "https://api.errormator.com/api/reports";
		}
		if (typeof options.api_key == 'undefined') {
			options.api_key = "undefined";
		}
		if (typeof options.protocol_version == 'undefined') {
			options.protocol_version = "0.3";
		}
		Jerror.options = options;
		window.onerror = Jerror.onerror;
	},

	onerror : function(message, file, line) {
		var report = {
			"errormator.client" : "javascript",
			"error_type" : message,
			"occurences" : 1,
			"http_status" : 500
		}
		try {
			report.traceback = Jerror.collectTraceback();
			report.report_details = [ Jerror.collectDetails() ];
			Jerror.submit([ report ]);
		} catch (e) {
		}
	},

	submit : function(report) {
		var xhr = new window.XMLHttpRequest();

		if (!xhr && window.ActiveXObject) {
			xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
		}
		var url = this.options.endpoint + '/' + Jerror.options.api_key
				+ "?protocol_version=" + Jerror.options.protocol_version
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(report));
	},

	collectTraceback : function(file, line) {
		try {
			var func = printStackTrace.implementation.prototype
					.guessAnonymousFunction(file, line);
			return file + "[" + line + "]" + func;
		} catch (e) {
		}
		return file + "[" + line + "]";
	},

	collectDetails : function() {
		return {
			url : window.location.href,
			user_agent : window.navigator.userAgent,
			start_time : new Date().toJSON()
		};
	}
};
