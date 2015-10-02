export {
	memoize
};


function memoize(func) {
	var myCahce = {
		key: [],
		values: [],
		add: function(elementId, valueElecment) {
			this.key.push(this.generateKey(elementId));
			this.values.push(valueElecment);
		},
		getValue: function(elementId) {
			if (this.key.indexOf) {
				return this.values[this.getIndexKey(elementId)];
			}
		},
		generateKey: function(elementId) {
			var myvar = "";
			if (elementId.length === 0) {
				myvar += "empty arguments";
			} else {
				for (var i = 0; i < elementId.length; i++) {
					myvar += this.typeGenerateKey(elementId[i]);
				}
			}
			return myvar;
		},
		typeGenerateKey: function(element) {
			switch (typeof(element)) {
				case "object":
					return this.generateKeyForObjectTypes(element);
				case "undefined":
					return "undefined:{}";
				default:
					return this.generateKeyForScalarTypes(element);
			}
		},
		generateKeyForObjectTypes: function(typeObject) {
			var cahe = "";
			if (typeObject) {
				for (var arg in typeObject) {
					cahe += arg;
					cahe += ":";
					cahe += this.typeGenerateKey(typeObject[arg]);
				}
			} else {
				cahe += "null:{}";
			}
			return cahe;
		},
		generateKeyForScalarTypes: function(typeScalar) {
			var cahe = "";
			cahe += typeof(typeScalar);
			cahe += ":{";
			cahe += typeScalar;
			cahe += "}";
			return cahe;
		},
		containsKey: function(elementId) {
			return this.getIndexKey(elementId) === -1;
		},
		getIndexKey: function(elementId) {
			return this.key.indexOf(this.generateKey(elementId));
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