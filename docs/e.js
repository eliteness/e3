function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
let STATE = {
	ts: T_X,
	tb: T_Y
};
window.addEventListener('load',async function() {
	console.log("waitin for 3 secs..");
	$("cw_m").innerHTML = "Connecting.. Please wait."
	setTimeout(async () => { await basetrip(); }, 3000);
	arf();
}, false);




async function basetrip()
{
	//PRE
	pre_stats();
	//MAIN
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");provider = new ethers.providers.JsonRpcProvider(RPC_URL); await dexstats();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.JsonRpcProvider(RPC_URL);await dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
	else if(//typeOf window.ethereum == Object &&Number(window.ethereum.chainId)
		Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId,CHAINID);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){console.log("Found old wallet:", window.ethereum.selectedAddress);cw();}
		else{console.log("Didnt find a connected wallet!");cw();}
		//chkAppr(tokes[1][0])
		gubs();
	}
	else //if(Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Couldn't find Ethereum Provider - ",CHAINID,window.ethereum.chainId)
		if((typeof Number(window.ethereum.chainId) == "number")){$("cw_m").innerHTML = "Wrong network! Switch from " + Number(window.ethereum.chainId)+" to "+CHAINID}
		provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		//signer = provider.getSigner()
		await dexstats();
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" id="btn-connect">Retry?</button>`;
	}
	if(Number(window.ethereum.chainId) != null &&(window.ethereum.chainId!=CHAINID))
	{
		await window.ethereum.request({
    		method: "wallet_addEthereumChain",
    		params: [{
        		chainId: "0x"+(CHAINID).toString(16),
        		rpcUrls: [RPC_URL],
        		chainName: CHAIN_NAME,
        		nativeCurrency: {
            		name: CHAIN_GAS,
            		symbol: CHAIN_GAS,
            		decimals: 18
        		},
        		blockExplorerUrls: [EXPLORE]
    		}]
		});
		window.location.reload()
	}
	//DrefreshFarm()
	//arf()
	cw()
	dexstats()
	gubs()
}



/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(3)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(3)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(3)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(3)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(3)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(3)+"K"}
	else if(_n>1e1){n_=(_n/1e0).toFixed(3)+""}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

async function cw()
{
	let cs = await cw2(); cs?console.log("Good to Transact"):cw2();
	cw2();
}
async function cw2()
{
	if(!(window.ethereum)){$("cw_m").innerHTML="Metamask not detected! Trying a refresh";console.log("Metamask not found!");window.location.reload();return(0)}
	if(!(Number(window.ethereum.chainId)==CHAINID)){$("cw_m").innerHTML="Wrong network detected! Please switch to chain ID", CHAINID, "and refresh this page.";return(0)}
	if(typeof provider == "undefined"){$("cw_m").innerHTML="Provider not detected! Trying a refresh";console.log("Provider not found!");window.location.reload();return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints");
	gubs();
	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	if(window.ethereum.chainId==250) {
		(new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>
		{
			if(rn.length>0){
				$("cw").innerHTML="<span id='cw_ns'>hi, <span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span> 👋</span>";
				$("cw_ns").onclick="notice(`<h3>GM, ${rn[0]}</h3>${DAPPNAME} is connected to your wallet<br><a href='${EXPLORE}/address/${window.ethereum.selectedAddress}' target='_blank'>${window.ethereum.selectedAddress}</a>`)"
			}
			else{
				$("cw").innerHTML= "<span id='cw_ns'>"+(window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34)+"</span>";
				$("cw").onclick="notice(`${DAPPNAME} is connected to your wallet<br><a href='${EXPLORE}/address/${window.ethereum.selectedAddress}' target='_blank'>${window.ethereum.selectedAddress}</a>`)"
			}
		})
	}
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	//arf();
	return(1);
}
function fornum2(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Thousand"}
	else if(_n>1){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}
/*
function arf(){
	var xfr = setInterval(function() {
		console.log("refreshing farm stats", Date.now() );
		try { if( ethers.utils.isAddress(window.ethereum.selectedAddress) ) {gubs();} }
		catch(e) { console.log('hmm..'); }
		priceFinder()
	}, 15000);
}
*/

function arf(){
	let o = INITIAL; let c=0; let t=T_X.address;
	var xfr = setInterval(
		function(){
			if(!isFinite($('amount-sold-input').value) ) { return }
			//if($('ain').value == "" ) { $('ain').value=INITIAL }
			if(o != $('amount-sold-input').value){priceFinder()}
			if(t != STATE.ts.address){priceFinder()}
			if(c%10==0){priceFinder()}
			if(c%20==0){
				try { if( ethers.utils.isAddress(window.ethereum.selectedAddress) ) {gubs();} }
				catch(e) { console.log('No web3 wallet found!'); }
			}
			o = $('amount-sold-input').value;
			t = STATE.ts.address;
			c++
		},
		500
	)
}

async function gubs() {
	gubs_ts = new ethers.Contract(STATE.ts.address, ["function balanceOf(address) public view returns(uint)"], signer);
	gubs_tb = new ethers.Contract(STATE.tb.address, ["function balanceOf(address) public view returns(uint)"], signer);
	bal = await Promise.all([
		gubs_ts.balanceOf(window.ethereum.selectedAddress),
		gubs_tb.balanceOf(window.ethereum.selectedAddress),
	]);
	$("amount-sold-balance").innerHTML = "Balance: "+ (bal[0]/10**STATE.ts.decimals).toFixed(STATE.ts.decimals) +" "+ STATE.ts.symbol;
	$("amount-bought-balance").innerHTML = "Balance: "+ (bal[1]/10**STATE.tb.decimals).toFixed(STATE.tb.decimals) +" "+ STATE.tb.symbol
}

async function pre_stats() {
	prepro = new ethers.providers.JsonRpcProvider(RPC_URL);
	return;
	lp = new ethers.Contract(WRAP, LPABI, prepro);
	fa = new ethers.Contract(FARM, FARABI, prepro);
	bal = await Promise.all([
		fa.tvl(),
		fa.aprs()
	]);
	$("bal_tvl").innerHTML = fornum(bal[0],18);
	$("bal_apr").innerHTML = fornum(bal[1][0],18);
}

function notice(c) {
	window.location = "#note";
	$("content1").innerHTML = c;
	console.log(c);
}

async function dexstats() {
	return;
}

ROUTER = {
	address: "0xB9A64ab6b91F5c7a78c2360CfF759dE8a8a450d5",
	ABI: [{"inputs": [{"internalType": "contract ILBFactory","name": "factory","type": "address"},{"internalType": "contract IJoeFactory","name": "factoryV1","type": "address"},{"internalType": "contract ILBLegacyFactory","name": "legacyFactory","type": "address"},{"internalType": "contract ILBLegacyRouter","name": "legacyRouter","type": "address"},{"internalType": "contract IWNATIVE","name": "wnative","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "AddressHelper__CallFailed","type": "error"},{"inputs": [],"name": "AddressHelper__NonContract","type": "error"},{"inputs": [],"name": "JoeLibrary__InsufficientAmount","type": "error"},{"inputs": [],"name": "JoeLibrary__InsufficientLiquidity","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountSlippage","type": "uint256"}],"name": "LBRouter__AmountSlippageBPTooBig","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"}],"name": "LBRouter__AmountSlippageCaught","type": "error"},{"inputs": [{"internalType": "uint256","name": "id","type": "uint256"}],"name": "LBRouter__BinReserveOverflows","type": "error"},{"inputs": [],"name": "LBRouter__BrokenSwapSafetyCheck","type": "error"},{"inputs": [{"internalType": "uint256","name": "deadline","type": "uint256"},{"internalType": "uint256","name": "currentTimestamp","type": "uint256"}],"name": "LBRouter__DeadlineExceeded","type": "error"},{"inputs": [{"internalType": "address","name": "recipient","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "LBRouter__FailedToSendNATIVE","type": "error"},{"inputs": [{"internalType": "uint256","name": "idDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"}],"name": "LBRouter__IdDesiredOverflows","type": "error"},{"inputs": [{"internalType": "int256","name": "id","type": "int256"}],"name": "LBRouter__IdOverflows","type": "error"},{"inputs": [{"internalType": "uint256","name": "activeIdDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"},{"internalType": "uint256","name": "activeId","type": "uint256"}],"name": "LBRouter__IdSlippageCaught","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"internalType": "uint256","name": "amountOut","type": "uint256"}],"name": "LBRouter__InsufficientAmountOut","type": "error"},{"inputs": [{"internalType": "address","name": "wrongToken","type": "address"}],"name": "LBRouter__InvalidTokenPath","type": "error"},{"inputs": [{"internalType": "uint256","name": "version","type": "uint256"}],"name": "LBRouter__InvalidVersion","type": "error"},{"inputs": [],"name": "LBRouter__LengthsMismatch","type": "error"},{"inputs": [{"internalType": "uint256","name": "amountInMax","type": "uint256"},{"internalType": "uint256","name": "amountIn","type": "uint256"}],"name": "LBRouter__MaxAmountInExceeded","type": "error"},{"inputs": [],"name": "LBRouter__NotFactoryOwner","type": "error"},{"inputs": [{"internalType": "address","name": "tokenX","type": "address"},{"internalType": "address","name": "tokenY","type": "address"},{"internalType": "uint256","name": "binStep","type": "uint256"}],"name": "LBRouter__PairNotCreated","type": "error"},{"inputs": [],"name": "LBRouter__SenderIsNotWNATIVE","type": "error"},{"inputs": [{"internalType": "uint256","name": "id","type": "uint256"}],"name": "LBRouter__SwapOverflows","type": "error"},{"inputs": [{"internalType": "uint256","name": "excess","type": "uint256"}],"name": "LBRouter__TooMuchTokensIn","type": "error"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "uint256","name": "reserve","type": "uint256"}],"name": "LBRouter__WrongAmounts","type": "error"},{"inputs": [{"internalType": "address","name": "tokenX","type": "address"},{"internalType": "address","name": "tokenY","type": "address"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"},{"internalType": "uint256","name": "msgValue","type": "uint256"}],"name": "LBRouter__WrongNativeLiquidityParameters","type": "error"},{"inputs": [],"name": "LBRouter__WrongTokenOrder","type": "error"},{"inputs": [],"name": "TokenHelper__TransferFailed","type": "error"},{"inputs": [{"components": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint256","name": "binStep","type": "uint256"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"},{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256","name": "activeIdDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"},{"internalType": "int256[]","name": "deltaIds","type": "int256[]"},{"internalType": "uint256[]","name": "distributionX","type": "uint256[]"},{"internalType": "uint256[]","name": "distributionY","type": "uint256[]"},{"internalType": "address","name": "to","type": "address"},{"internalType": "address","name": "refundTo","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"internalType": "struct ILBRouter.LiquidityParameters","name": "liquidityParameters","type": "tuple"}],"name": "addLiquidity","outputs": [{"internalType": "uint256","name": "amountXAdded","type": "uint256"},{"internalType": "uint256","name": "amountYAdded","type": "uint256"},{"internalType": "uint256","name": "amountXLeft","type": "uint256"},{"internalType": "uint256","name": "amountYLeft","type": "uint256"},{"internalType": "uint256[]","name": "depositIds","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidityMinted","type": "uint256[]"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"components": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint256","name": "binStep","type": "uint256"},{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"},{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256","name": "activeIdDesired","type": "uint256"},{"internalType": "uint256","name": "idSlippage","type": "uint256"},{"internalType": "int256[]","name": "deltaIds","type": "int256[]"},{"internalType": "uint256[]","name": "distributionX","type": "uint256[]"},{"internalType": "uint256[]","name": "distributionY","type": "uint256[]"},{"internalType": "address","name": "to","type": "address"},{"internalType": "address","name": "refundTo","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"internalType": "struct ILBRouter.LiquidityParameters","name": "liquidityParameters","type": "tuple"}],"name": "addLiquidityNATIVE","outputs": [{"internalType": "uint256","name": "amountXAdded","type": "uint256"},{"internalType": "uint256","name": "amountYAdded","type": "uint256"},{"internalType": "uint256","name": "amountXLeft","type": "uint256"},{"internalType": "uint256","name": "amountYLeft","type": "uint256"},{"internalType": "uint256[]","name": "depositIds","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidityMinted","type": "uint256[]"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint24","name": "activeId","type": "uint24"},{"internalType": "uint16","name": "binStep","type": "uint16"}],"name": "createLBPair","outputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getFactory","outputs": [{"internalType": "contract ILBFactory","name": "lbFactory","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint256","name": "price","type": "uint256"}],"name": "getIdFromPrice","outputs": [{"internalType": "uint24","name": "","type": "uint24"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getLegacyFactory","outputs": [{"internalType": "contract ILBLegacyFactory","name": "legacyLBfactory","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getLegacyRouter","outputs": [{"internalType": "contract ILBLegacyRouter","name": "legacyRouter","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint24","name": "id","type": "uint24"}],"name": "getPriceFromId","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint128","name": "amountOut","type": "uint128"},{"internalType": "bool","name": "swapForY","type": "bool"}],"name": "getSwapIn","outputs": [{"internalType": "uint128","name": "amountIn","type": "uint128"},{"internalType": "uint128","name": "amountOutLeft","type": "uint128"},{"internalType": "uint128","name": "fee","type": "uint128"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILBPair","name": "pair","type": "address"},{"internalType": "uint128","name": "amountIn","type": "uint128"},{"internalType": "bool","name": "swapForY","type": "bool"}],"name": "getSwapOut","outputs": [{"internalType": "uint128","name": "amountInLeft","type": "uint128"},{"internalType": "uint128","name": "amountOut","type": "uint128"},{"internalType": "uint128","name": "fee","type": "uint128"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getV1Factory","outputs": [{"internalType": "contract IJoeFactory","name": "factoryV1","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getWNATIVE","outputs": [{"internalType": "contract IWNATIVE","name": "wnative","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "tokenX","type": "address"},{"internalType": "contract IERC20","name": "tokenY","type": "address"},{"internalType": "uint16","name": "binStep","type": "uint16"},{"internalType": "uint256","name": "amountXMin","type": "uint256"},{"internalType": "uint256","name": "amountYMin","type": "uint256"},{"internalType": "uint256[]","name": "ids","type": "uint256[]"},{"internalType": "uint256[]","name": "amounts","type": "uint256[]"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "removeLiquidity","outputs": [{"internalType": "uint256","name": "amountX","type": "uint256"},{"internalType": "uint256","name": "amountY","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "token","type": "address"},{"internalType": "uint16","name": "binStep","type": "uint16"},{"internalType": "uint256","name": "amountTokenMin","type": "uint256"},{"internalType": "uint256","name": "amountNATIVEMin","type": "uint256"},{"internalType": "uint256[]","name": "ids","type": "uint256[]"},{"internalType": "uint256[]","name": "amounts","type": "uint256[]"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "removeLiquidityNATIVE","outputs": [{"internalType": "uint256","name": "amountToken","type": "uint256"},{"internalType": "uint256","name": "amountNATIVE","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactNATIVEForTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactNATIVEForTokensSupportingFeeOnTransferTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMinNATIVE","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForNATIVE","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMinNATIVE","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForNATIVESupportingFeeOnTransferTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountIn","type": "uint256"},{"internalType": "uint256","name": "amountOutMin","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapNATIVEForExactTokens","outputs": [{"internalType": "uint256[]","name": "amountsIn","type": "uint256[]"}],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountNATIVEOut","type": "uint256"},{"internalType": "uint256","name": "amountInMax","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address payable","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapTokensForExactNATIVE","outputs": [{"internalType": "uint256[]","name": "amountsIn","type": "uint256[]"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"},{"internalType": "uint256","name": "amountInMax","type": "uint256"},{"components": [{"internalType": "uint256[]","name": "pairBinSteps","type": "uint256[]"},{"internalType": "enum ILBRouter.Version[]","name": "versions","type": "uint8[]"},{"internalType": "contract IERC20[]","name": "tokenPath","type": "address[]"}],"internalType": "struct ILBRouter.Path","name": "path","type": "tuple"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "swapTokensForExactTokens","outputs": [{"internalType": "uint256[]","name": "amountsIn","type": "uint256[]"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "token","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "sweep","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract ILBToken","name": "lbToken","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256[]","name": "ids","type": "uint256[]"},{"internalType": "uint256[]","name": "amounts","type": "uint256[]"}],"name": "sweepLBToken","outputs": [],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"}],
}




async function priceFinder() {
	let _nam = STATE.ts.address;
	let R = new ethers.Contract(ROUTER.address, ROUTER.ABI, new ethers.providers.JsonRpcProvider(RPC_URL));
	let dir = T_X.address == _nam ? true : false;
	let selldeci = ( dir ? T_X.decimals : T_Y.decimals);
	let buydeci = ( dir ? T_Y.decimals : T_X.decimals);
	let ain = (Number($("amount-sold-input").value) * 10**selldeci).toFixed(0);
	let sod = await R.getSwapOut(POOLADDR, ain, dir);
	//$("amount-sold-input").value = ((Number(ain)-Number(sod[0]))/10**selldeci).toFixed(selldeci);
	let aout = (Number(sod[1])/10**buydeci).toFixed(buydeci);
	$("amount-bought-input").value = aout;
	console.log([ain, Number(sod[1]), Date.now()])
	//set slippage
}


async function sell() {
	let R = new ethers.Contract(ROUTER.address, ROUTER.ABI, signer);
	let _nam = STATE.ts.address;
	let dir = T_X.address == _nam ? true : false;
	let selldeci = ( dir ? T_X.decimals : T_Y.decimals);
	let buydeci = ( dir ? T_Y.decimals : T_X.decimals);
	let ain = (Number($("amount-sold-input").value) * 10**selldeci).toFixed(0);
	let TCS = new ethers.Contract(_nam,["function balanceOf(address) public view returns(uint)","function allowance(address,address) public view returns(uint)","function approve(address,uint)"],signer);
	let ubs = await Promise.all([
		TCS.balanceOf(window.ethereum.selectedAddress),
		TCS.allowance(window.ethereum.selectedAddress, R.address)
	]);
	if(Number(ubs[0]) < Number(ain)) {
		notice(`
		<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Insufficient Balance</h2>
		You have ${(ubs[0]/10**selldeci).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol}.
		<br><br><i>Desired amount: ${(ain/10**selldeci).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol}
		`);
	}
	if(Number(ubs[1]) < Number(ain)) {
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Approve ${(dir?T_X:T_Y).symbol} for Trade</h2>
			E3 Engine needs your approval to trade ${(dir?T_X:T_Y).symbol}.
			<br><br>
			<br><i>Please confirm this tx in your wallet.<i>
		`);
		txh = await TCS.approve(R.address, ain);
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Approving the E3 router...</h2>
			<br><br>
			<b>Awaiting confirmation from the network . . ..<b>
			<br><i>Please wait.</i>
		`);
		txr = await txh.wait();
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Approval Granted</h2>
			<br>Starting Trade Execution...
		`);
	}
	notice(`
		<h2>Finding path...</h2>
		To sell ${(Number(ain)/10**selldeci).toFixed(selldeci)}
		 ${(dir?T_X:T_Y).symbol} for ${(dir?T_Y:T_X).symbol}
		<br><i>Slippage Tolerance: 1%</i>
	`);
	let sod = await R.getSwapOut(POOLADDR, ain, dir);
	let bmin = Math.floor(Number(sod[1]) * 99/100);
	notice(`
		<h2>Order Summary</h2>
		Selling ${(Number(ain)/10**selldeci).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol} <img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}">
		<br>Buying ${(Number(sod[1])/10**buydeci).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol} <img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}">
		<br><h3>Expected Prices</h3>
		<img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"><img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}"> ${(sod[1]/ain).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol} per ${(dir?T_X:T_Y).symbol}
		<br><img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}"><img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"> ${(ain/sod[1]).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol} per ${(dir?T_Y:T_X).symbol}
		<br><h3>Slippage</h3>
		<b>Tolerance</b> : 1%</i>
		<br><b>Minimum Received</b> : <img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"> ${(bmin/10**buydeci).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol}</i>
		<br>
		<br><br><b><u>Please confirm this transaction in your wallet</u></b>
	`);
	console.log([ BigInt(ain), BigInt(bmin), {pairBinSteps:[1], versions:[2], tokenPath: dir?[T_X.address, T_Y.address]:[T_Y.address, T_X.address]}, window.ethereum.selectedAddress, Math.floor(Date.now()/1000+3600) ]);
	txh = await R.swapExactTokensForTokens( BigInt(ain), BigInt(bmin), {pairBinSteps:[1], versions:[2], tokenPath: dir?[T_X.address, T_Y.address]:[T_Y.address, T_X.address]}, window.ethereum.selectedAddress, Math.floor(Date.now()/1000+3600) );
	notice(`
		<h2>Awaiting Confirmation..</h2>
		Selling ${(Number(ain)/10**selldeci).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol} <img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}">
		<br>Buying ${(Number(sod[1])/10**buydeci).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol} <img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}">
		<br><h3>Expected Prices</h3>
		<img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"><img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}"> ${(sod[1]/ain).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol} per ${(dir?T_X:T_Y).symbol}
		<br><img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}"><img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"> ${(ain/sod[1]).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol} per ${(dir?T_Y:T_X).symbol}
		<br><h3>Slippage</h3>
		<b>Tolerance</b> : 1%</i>
		<br><b>Minimum Received</b> : <img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"> ${(bmin/10**buydeci).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol}</i>
		<br>
		<br><br><b><u>Please wait till this transaction is confirmed by the ${CHAIN_NAME} Network.</u></b>
		<h4><a target="_blank" href="https://ftmscan.com/tx/${txh.hash}">View on Explorer</a></h4>
	`);
	await txr.wait();
	notice(`
		<h2>Trade Executed</h2>
		Sold ${(Number(ain)/10**selldeci).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol} for ${(dir?T_Y:T_X).symbol}.
		<br>
		<h4><a target="_blank" href="https://ftmscan.com/tx/${txr.hash}">View on Explorer</a></h4>
	`);
}



async function flipAssets() {
	console.log("Flip0: ",STATE.ts.symbol,STATE.tb.symbol,T_X.symbol,T_Y.symbol);
	if (STATE.ts.address == T_X.address) {
		STATE.ts = T_Y;
		STATE.tb = T_X;
		$("logo-sold").src = T_Y.logo;
		$("logo-bought").src = T_X.logo;
		tmp = $("amount-sold-balance").innerHTML;
		$("amount-sold-balance").innerHTML = $("amount-bought-balance").innerHTML;
		$("amount-bought-balance").innerHTML = tmp;
	}
	else if(STATE.ts.address == T_Y.address) {
		console.log("Flip1: ",STATE.ts.symbol,STATE.tb.symbol,T_X.symbol,T_Y.symbol);
		STATE.ts = T_X;
		STATE.tb = T_Y;
		$("logo-sold").src = T_X.logo;
		$("logo-bought").src = T_Y.logo;
		tmp = $("amount-sold-balance").innerHTML;
		$("amount-sold-balance").innerHTML = $("amount-bought-balance").innerHTML;
		$("amount-bought-balance").innerHTML = tmp;
	}
	else {
		console.log("Corrupt State");
	}
}

async function flipAssets2() {
	let assetsold = $("token-sold").value;
	if (assetsold == T_X.value) {
		$("token-sold").value = T_Y.address;
		$("token-bought").value = T_X.address;
		$("logo-sold").src = T_Y.logo;
		$("logo-bought").src = T_X.logo;
	}
	else {
		$("token-sold").value = T_X.address;
		$("token-bought").value = T_Y.address;
		$("logo-sold").src = T_X.logo;
		$("logo-bought").src = T_Y.logo;
	}
}