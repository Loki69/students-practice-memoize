export {
	memoize
};


function memoize(func) {
	var myCahce = {
		key: [],
		values: [],
		add: function(elementId, valueElecment) {
			this.key.push(this.calKey(elementId));
			this.values.push(valueElecment);
		},
		getValue: function(elementId) {
			if (this.key.indexOf) {
				return this.values[this.getIdKey(elementId)];
			}
		},
		calKey: function(elementId) {
			var myvar = "";
			if (elementId.length === 0) {
				myvar += "empty arguments";
			} else {
				for (var i = 0; i < elementId.length; i++) {
					myvar += this.generateCahe(elementId[i]);
				}
			}
			return myvar;
		},
		generateCahe: function(element) {
			switch (typeof(element)) {
				case "object":
					return this.calculatedForObjectTypes(element);
				case "undefined":
					return "undefined:{}";
				default:
					return this.calculatedForScalarTypes(element);
			}
		},
		calculatedForObjectTypes: function(typeObject) {
			var cahe = "";
			if (typeObject) {
				for (var arg in typeObject) {
					cahe += arg;
					cahe += ":";
					cahe += this.generateCahe(typeObject[arg]);
				}
			} else {
				cahe += "null:{}";
			}
			return cahe;
		},
		calculatedForScalarTypes: function(typeScalar) {
			var cahe = "";
			cahe += typeof(typeScalar);
			cahe += ":{";
			cahe += typeScalar;
			cahe += "}";
			return cahe;
		},
		containsKey: function(elementId) {
			return this.getIdKey(elementId) === -1;
		},
		getIdKey: function(elementId) {
			return this.key.indexOf(this.calKey(elementId));
		},
	};
	var myFunction = function() {
		if (myCahce.containsKey(arguments)) {
			myCahce.add(arguments, func.apply(this, arguments));
		}
		return myCahce.getValue(arguments);
	};
	return myFunction;
}