export { memoize };

function memoize(func) {
		var myCahce = {
			key: [],
			value: [],
			add:function (elementId,valueElecment) {
				this.key.push(this.calculatedNumbersKey(elementId));
				this.value.push(valueElecment);
			},
			getValue: function (elementId) {
  					if (this.key.indexOf) {
    					return this.value[this.key.indexOf(this.calculatedNumbersKey(elementId))];
  					}
			},
			calculatedNumbersKey: function (elementId) {
				console.log(Array.prototype.slice.call(elementId).join(''));
  					return Array.prototype.slice.call(elementId).join('');
			}
			
		};
	var myFunction = function(){
			if(myCahce.getValue(arguments) === undefined){
				console.log('undefined');
				console.log(arguments);
				myCahce.add(arguments,func.apply(this,arguments));
			}
			return myCahce.getValue(arguments);
	};
	return myFunction;
}
