var config = (
	function() {
		return {
			cycle_duration: 1500,
			hubspotFormID: '231dd439-b782-4e95-9cee-776e9a29d3f2',
			hubspotPortalID: '252686',
			hubspotAPIKey: 'xxx',
			stepsContainerClass: 'steps-container',
			uploadContainerClass: 'file-drag',
			updateConfig: function(key, value) {
				this[key] = value;
			}
		};
	}
)();

var module = {};
