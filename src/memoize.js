export { memoize };

function memoize(func) {
	var myCahce = {
		key: [],
		value: [],
		add: function (elementId, valueElecment) {
			this.key.push(this.calculatedNumbersKey(elementId));
			this.value.push(valueElecment);
		},
		getValue: function (elementId) {
	  		if (this.key.indexOf) {
	    			return this.value[this.getIdKey(elementId)];
	  		}
		},
		calculatedNumbersKey: function (elementId) {
	  			return Array.prototype.slice.call(elementId).join(',');
		},
		containsKey: function (elementId) {
	  			return this.getValue(elementId) !== undefined;
		},
		getIdKey: function (elementId) {
	  			return this.key.indexOf(this.calculatedNumbersKey(elementId));
		}
		
	};
	var myFunction = function () {
			if (!myCahce.containsKey(arguments)) {
				myCahce.add(arguments,func.apply(this,arguments));
			}
			return myCahce.getValue(arguments);
	};
	return myFunction;
}
