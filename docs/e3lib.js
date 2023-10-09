
async function libPH_getIdFromPrice(_id, _step) {
	fa2=new ethers.providers.JsonRpcProvider("https://rpc.testnet.fantom.network");
	PH = new ethers.Contract("0xc8f66ab5619fc637c2d51abb0d24781b3f29e6c6",[{"inputs":[],"name":"SafeCast__Exceeds24Bits","type":"error"},{"inputs":[],"name":"Uint128x128Math__LogUnderflow","type":"error"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Uint128x128Math__PowUnderflow","type":"error"},{"inputs":[],"name":"Uint256x256Math__MulDivOverflow","type":"error"},{"inputs":[],"name":"Uint256x256Math__MulShiftOverflow","type":"error"},{"inputs":[{"internalType":"uint256","name":"price128x128","type":"uint256"}],"name":"convert128x128PriceToDecimal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"convertDecimalPriceTo128x128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint16","name":"binStep","type":"uint16"}],"name":"getBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"getExponent","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint16","name":"binStep","type":"uint16"}],"name":"getIdFromPrice","outputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"},{"internalType":"uint16","name":"binStep","type":"uint16"}],"name":"getPriceFromId","outputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"stateMutability":"pure","type":"function"}],fa2);
	_price_raw = await PH.getIdFromPrice(_id,_step);
}

function e3lib_Num_to_hex32(_num) {
	_dec = (_num % 1) ;
	_dec32 = ethers.utils.hexZeroPad("0x" + ( _dec * 16**32 ).toString(16) , 16 );
	_int = Math.floor(_num);
	_int32 = ethers.utils.hexZeroPad("0x" + _int.toString(16) , 16);
	return _int32 + _dec32.substr(2);
}

function e3lib_hex32_to_num(_hex) {
	_hex = ethers.utils.hexZeroPad( _hex.toString(16) , 32);
	_int = Number(_hex.substr(0,34));
	_dec = Number("0x"+_hex.substr(34,32))/16**32;
	return (_int + _dec);
}

function e3lib_gen(mid,step,count){
	let ra=[];
	for(i=0-count;i<=0+count;i++) {
		ra.push( mid + i*step )
	}
	return ra
}

function e3lib_spread_uniform(n) {
	if(n%2==0) throw new Error("Should be odd-lengthed!");
	let m = ((n+1)/2)-1;
	let b = BigInt(Math.floor(1e18/(m+1)));
	let x=[], y=[];
	for(let i=0;i<n;i++) {
		if(i<m) {
			x[i] = b;
			y[i] = 0;
		}
		else if(i==m) {
			x[i] = b;
			y[i] = b;
		}
		else if(i>m) {
			x[i] = 0;
			y[i] = b;
		}
	}
	return {x:x,y:y}
}

function e3lib_gen_ids(_start,_end) {
	let _rarr=[];
	for (let i=_start;i<=_end;i++) {
		_rarr.push(i);
	}
	return _rarr;
}

function e3lib_gen_dist(_isx, _kind, _size, _zeros) {
	_rarr=[];
	if(_kind=='flat') {
		if(_isx){
			for(let i=0;i<_size;i++){
				i < _zeros
				? _rarr.push(0)
				: _rarr.push(BigInt(Math.floor( 1e18 / Math.ceil(_size-_zeros) )));
			}
		}
		else {
			for(let i=0;i<_size;i++){
				i < _size - _zeros
				? _rarr.push(BigInt(Math.floor( 1e18 / Math.ceil(_size-_zeros) )))
				: _rarr.push(0) ;
			}
		}
	}
	else if(_kind == 'bogpro') {
		_rarr = _isx
			? ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","41211048977914000","82422097955828100","81733364405671000","80598240676066400","79035503085190000","77070709389239300","74735503559369100","72066768416207000","69105657812196500","65896543800024600","62485916310631600","58921273239094500","55250037548078800","51518535181979400","47771063452128600"]
			: ["47771063452128600","51518535181979400","55250037548078800","58921273239094500","62485916310631600","65896543800024600","69105657812196500","72066768416207000","74735503559369100","77070709389239300","79035503085190000","80598240676066400","81733364405671000","82422097955828100","41211048977914000","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]
		;
	}
	else if(_kind == 'cbd') {
		_rarr = _isx
			? ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","29755270020154500","59510540040309100","59013259498679400","58193675578387300","57065345187862800","55646721580678200","53960652389436200","52033767809535700","49895781813860300","47578731985577300","45116185061827900","42542435551692800","39891723861428700","37197498326338900","34491742564713800","31804385831372300","29162809782220400","26591460507005900","24111570084459900","21740987486925100","19494114608220600","17381939670544900","15412157402808900","13589363247419300","11915307473221600","10389194434459100","9008012267419790","7766878975915517","6659392019927108","5677970071259770","4814177413491765","4059023421017415","3403231542769610","2837474143462068","2352571339581980"]
			: ["2352571339581980","2837474143462068","3403231542769610","4059023421017415","4814177413491765","5677970071259770","6659392019927108","7766878975915517","9008012267419790","10389194434459100","11915307473221600","13589363247419300","15412157402808900","17381939670544900","19494114608220600","21740987486925100","24111570084459900","26591460507005900","29162809782220400","31804385831372300","34491742564713800","37197498326338900","39891723861428700","42542435551692800","45116185061827900","47578731985577300","49895781813860300","52033767809535700","53960652389436200","55646721580678200","57065345187862800","58193675578387300","59013259498679400","59510540040309100","29755270020154500","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]
		;
	}
	else if(_kind == 'ffc') {
		_rarr = _isx
			? ["0","0",BigInt(0.4e18),BigInt(0.35e18),BigInt(0.25e18)]
			: [BigInt(0.2e18),BigInt(0.375e18),BigInt(0.425e18),"0","0"]
		;
	}
	return _rarr;
}