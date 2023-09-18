function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
let STATE = {
	ts: T_X,
	tb: T_Y
};
let CACHE = {
	oldinp: [,],
	ACTIVEI: 0
}

CHAINDATA = {
	250 : {
		logo: "https://ftm.guru/icons/ftm.svg"
	},
	42161 : {
		logo: "https://ftm.guru/icons/arb1.svg"
	},
	42161 : {
		logo: "https://ftm.guru/icons/base.svg"
	}
}
window.addEventListener('load',async function() {
	//PRE
	pre_stats();
	console.log("waitin for 3 secs..");
	$("cw_m").innerHTML = "Connecting.. Please wait."
	setTimeout(async () => { basetrip(); paintBook();}, 3000);
	arf();
}, false);

BL = {
	250:	"0x5a054233e59323e7a58f6b7dae86e6992f1f92e2",
	42161:	"0xc4c807aee35f75c891cb51ef982c98371b1362b4",
	8453:	"0xb62f6095f2afd00702fb79570c9f1aa730510fc4"
}

BUCKETDECIMALS = {
	250: { 0:6, 1:12, 2:6, 3:12 },
	42161: { 0:12, 1:12 },
	8453: { 0:12, 1:12 }
}

MAXORDERBOOKSIZE = 2500;

async function basetrip() {
	//MAIN
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");provider = new ethers.providers.JsonRpcProvider(RPC_URL); dexstats();paintBook();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.JsonRpcProvider(RPC_URL); dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
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
		dexstats();
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" id="btn-connect">Retry?</button>`;
	}
	if(Number(window.ethereum.chainId) != null && Number(window.ethereum.chainId!=CHAINID && CHAINID!=-2))
	{
		notice(`<h3>Wrong Network!</h3>You are connectedd to Chain ID ${Number(window.ethereum.chainId)}<br>Please Switch to ${CHAIN_NAME}`);
		_newch = "test";
		console.log("1: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		_newch = window.ethereum.request({
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
		console.log("2: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		_newch = await _newch;
		console.log("3: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		if( _newch == null) { window.location.reload(); }
		console.log("4: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
		notice(`<h3>Wrong Network!</h3>Please Switch to ${CHAIN_NAME}`);
		console.log("5: switching chain: ",window.ethereum.chainId, CHAINID, _newch);
	}
	//DrefreshFarm()
	//arf()
	//paintBook()
	cw()
	dexstats()
	gubs()
}



/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(4)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(4)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(4)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(4)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(4)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(4)+" Th."}
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
	let cs = await cw2(); cs?console.log("Good to Transact", cs):cw2();
	//cw2();
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
	/*if(window.ethereum.chainId==250) {
		(new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>
		{
			if(rn.length>0){
				$("cw").innerHTML="<span id='cw_ns'>hi, <span style=''>"+rn[0]+"</span> 👋</span>";
				$("cw_ns").onclick="notice(`<h3>GM, ${rn[0]}</h3>${DAPPNAME} is connected to your wallet<br><a href='${EXPLORE}/address/${window.ethereum.selectedAddress}' target='_blank'>${window.ethereum.selectedAddress}</a>`)"
			}
			else{
				$("cw").innerHTML= "<span id='cw_ns'>"+(window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34)+"</span>";
				$("cw").onclick="notice(`${DAPPNAME} is connected to your wallet<br><a href='${EXPLORE}/address/${window.ethereum.selectedAddress}' target='_blank'>${window.ethereum.selectedAddress}</a>`)"
			}
		})
	}*/
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
	if(_n>1e18){n_=(_n/1e18).toFixed(4)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(4)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(4)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(4)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(4)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(4)+" Thousand"}
	else if(_n>1){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

function sortit(n,_maintable,_trName,_tdName) {
  var t, r, z, i, x, y, v, b, c = 0;
  t = document.getElementById(_maintable);//.getElementsByTagName("tbody")[0];
  z = true;
  b = "a";
  while (z) {
    z = false;
    r = t.getElementsByClassName(_trName);
    for (i = 0; i < (r.length - 1); i++) {
      v = false;
      x = (r[i].getElementsByTagName(_tdName)[n].textContent)//.replace(/,| |\.|\$|%/g,'');
      if(isFinite(x)){x=Number(x)}else{x=x.toLowerCase()}
      y = (r[i + 1].getElementsByTagName(_tdName)[n].textContent)//.replace(/,| |\.|\$|%/g,'');
      if(isFinite(y)){y=Number(y)}else{y=y.toLowerCase()}
      if (b == "a") {
        if ((x) > (y)) {
          v= true;
          break;
        }
      } else if (b == "d") {
        if ((x) < (y)) {
          v = true;
          break;
        }
      }
    }
    if (v) {
      r[i].parentNode.insertBefore(r[i + 1], r[i]);
      z = true;
      c ++;
    } else {
      if (c == 0 && b == "a") {
        b = "d";
        z = true;
      }
    }
  }
    var t, r, z, i, x, y, v, b, c = 0;
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

async function arf(){
	let o = INITIAL; let c=0; let t=T_X.address; let d1=Date.now()
	var xfr = setInterval(
		async function(){
			if(!isFinite($('amount-sold-input').value) ) { return }
			//if($('ain').value == "" ) { $('ain').value=INITIAL }
			if(o != $('amount-sold-input').value){/*await*/ priceFinder()}
			if(t != STATE.ts.address){/*await*/ priceFinder()}
			if(c%23==0){/*await*/ priceFinder()}
			if(c%29==0){
				try { if( ethers.utils.isAddress(window.ethereum.selectedAddress) ) {/*await*/ gubs();} }
				catch(e) { console.log('No web3 wallet found!'); }
			}
			//if(c%41==0){/*await*/ paintBook()}
			o = $('amount-sold-input').value;
			t = STATE.ts.address;
			c++;
		},
		2000
	);
}

async function gubs() {
	gubs_ts = new ethers.Contract(STATE.ts.address, ["function balanceOf(address) public view returns(uint)"], signer);
	gubs_tb = new ethers.Contract(STATE.tb.address, ["function balanceOf(address) public view returns(uint)"], signer);
	bal = await Promise.all([
		gubs_ts.balanceOf(window.ethereum.selectedAddress),
		gubs_tb.balanceOf(window.ethereum.selectedAddress),
	]);
	_ub_s = (bal[0]/10**STATE.ts.decimals).toFixed(STATE.ts.decimals);
	_ub_b = (bal[1]/10**STATE.tb.decimals).toFixed(STATE.tb.decimals);
	$("amount-sold-balance").innerHTML = `<span onclick='$("amount-sold-input").value=${_ub_s}'>Balance: `+ _ub_s +" "+ STATE.ts.symbol+"</span>";
	$("amount-bought-balance").innerHTML = `<span onclick="">Balance: `+ _ub_b +" "+ STATE.tb.symbol+"</span>";
}

async function pre_stats() {
	console.log("pre-stat'ing");
	prepro = new ethers.providers.JsonRpcProvider(RPC_URL);
	$("logo-sold").src= T_X.logo;
	$("amount-sold-balance").innerHTML = `0.000000 ${T_X.symbol} available`;
	$("logo-bought").src= T_Y.logo;
	$("amount-bought-balance").innerHTML = `0.000000 ${T_Y.symbol} available`;
	$("img-obh-pri").src= T_Y.logo;
	$("img-obh-amt").src= T_X.logo;
	$("img-obh-tot").src= T_Y.logo;
	$("img-obh-a-pri").src= T_Y.logo;
	$("img-obh-a-amt").src= T_X.logo;
	$("img-obh-a-tot").src= T_Y.logo;
	$("img-obh-b-pri").src= T_Y.logo;
	$("img-obh-b-amt").src= T_X.logo;
	$("img-obh-b-tot").src= T_Y.logo;

	$("addlp-logo-x").src= T_X.logo;
	$("addlp-logo-y").src= T_Y.logo;
	$("onp-ask").placeholder=`0.0 ${T_X.symbol}`;
	$("onp-bid").placeholder=`0.0 ${T_Y.symbol}`;

	$("topnav-mkts").innerHTML = `


			<div style="" class="pairSelectionMenuContainer">
				<div class="pairSelectionMenu">
					<a onclick="pairSelectionMenu()">
						<div style="font-size:initial">
							<img style="width:20px;height:20px;" src="${T_X.logo}">
							<img style="width:20px;height:20px;" src="${T_Y.logo}">
						</div>
						<div>
							<div style="font-size:0.3em">${T_X.symbol}/${T_Y.symbol}</div>
						</div>
					</a>
				</div>
			</div>
	`;
						/*
						<div>
							<div style="font-size:0.4em">${T_X.symbol}/${T_Y.symbol}</div>
							<div style="font-size:0.3em"><img style="width:12pxheight:12px;" src="${CHAINDATA[CHAINID].logo}"> #${POOLID} - ${CHAIN_NAME}</div>
						</div>
						*/

	console.log("pre-stat'd");
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
	let ain = BigInt(Math.floor(Number($("amount-sold-input").value) * 10**selldeci));
	let sod = await R.getSwapOut(POOLADDR, ain, dir);
	//$("amount-sold-input").value = ((Number(ain)-Number(sod[0]))/10**selldeci).toFixed(selldeci);
	let aout = (Number(sod[1])/10**buydeci).toFixed(buydeci);
	$("amount-bought-input").value = aout;
	//console.log([ain, Number(sod[1]), Date.now()])
	//set slippage
}


async function sell() {
	R = new ethers.Contract(ROUTER.address, ROUTER.ABI, signer);
	let _nam = STATE.ts.address;
	let dir = T_X.address == _nam ? true : false;
	let selldeci = ( dir ? T_X.decimals : T_Y.decimals);
	let buydeci = ( dir ? T_Y.decimals : T_X.decimals);
	let ain = BigInt(Math.floor(Number($("amount-sold-input").value) * 10**selldeci));
	let TCS = new ethers.Contract(_nam,["function balanceOf(address) public view returns(uint)","function allowance(address,address) public view returns(uint)","function approve(address,uint)"],signer);
	let ubs = await Promise.all([
		TCS.balanceOf(window.ethereum.selectedAddress),
		TCS.allowance(window.ethereum.selectedAddress, R.address)
	]);
	if(Number(ubs[0]) < Number(ain)) {
		notice(`
		<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Insufficient Balance</h2>
		You have ${(ubs[0]/10**selldeci).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol}.
		<br><br><i>Desired amount:</i> ${(Number(ain)/10**selldeci).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol}
		<br><br><u>Please re-check your inputs & try again</u>
		`);
		return;
	}
	if(Number(ubs[1]) < Number(ain)) {
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Approve ${(dir?T_X:T_Y).symbol} for Trade</h2>
			E3 Engine needs your approval to trade ${(dir?T_X:T_Y).symbol}.
			<br><br>
			<br><i>Please confirm this tx in your wallet.</i>
		`);
		txh = await TCS.approve(R.address, ain);
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Approving the E3 router...</h2>
			<b>Awaiting confirmation from the network . . ..</b>
			<br><br><i>Please wait.</i>
		`);
		txr = await txh.wait();
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Approval Granted</h2>
			<br>Starting Trade Execution...
		`);
	}
	notice(`
		<h2>Finding path...</h2>
		To sell ${(Number(ain)/10**selldeci).toFixed(selldeci)}	 ${(dir?T_X:T_Y).symbol}
		<br>To buy ${(dir?T_Y:T_X).symbol}
		<br>
		<br><i>Slippage Tolerance</i> : ±0.1%
	`);
	let sod = await R.getSwapOut(POOLADDR, ain, dir);
	let bmin = Math.floor(Number(sod[1]) * SLIPBPS/10000);
	notice(`
		<h2>Order Summary</h2>
		Selling ${(Number(ain)/10**selldeci).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol} <img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}">
		<br>Buying ${(Number(sod[1])/10**buydeci).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol} <img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}">
		<br><h3>Expected Prices</h3>
		<img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"><img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}"> ${((Number(sod[1])/10**buydeci)/(Number(ain)/10**selldeci)).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol} per ${(dir?T_X:T_Y).symbol}
		<br><img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}"><img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"> ${((Number(ain)/10**selldeci)/(Number(sod[1])/10**buydeci)).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol} per ${(dir?T_Y:T_X).symbol}
		<br><h3>Slippage</h3>
		<b>Tolerance</b> : ±0.1%</i>
		<br><b>Minimum Received</b> : <img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"> ${(bmin/10**buydeci).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol}</i>
		<br>
		<br><br><b><u>Please confirm this transaction in your wallet</u></b>
	`);
	console.log([ BigInt(ain), BigInt(bmin), {pairBinSteps:[1], versions:[2], tokenPath: dir?[T_X.address, T_Y.address]:[T_Y.address, T_X.address]}, window.ethereum.selectedAddress, Math.floor(Date.now()/1000+3600) ]);
	txh = await R.swapExactTokensForTokens( BigInt(ain), BigInt(bmin), {pairBinSteps:[BUCKET], versions:[2], tokenPath: dir?[T_X.address, T_Y.address]:[T_Y.address, T_X.address]}, window.ethereum.selectedAddress, Math.floor(Date.now()/1000+3600) );
	notice(`
		<h2>Awaiting Confirmation..</h2>
		Selling ${(Number(ain)/10**selldeci).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol} <img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}">
		<br>Buying ${(Number(sod[1])/10**buydeci).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol} <img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}">
		<br><h3>Expected Prices</h3>
		<img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"><img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}"> ${((Number(sod[1])/10**buydeci)/(Number(ain)/10**selldeci)).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol} per ${(dir?T_X:T_Y).symbol}
		<br><img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}"><img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"> ${((Number(ain)/10**selldeci)/(Number(sod[1])/10**buydeci)).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol} per ${(dir?T_Y:T_X).symbol}
		<br><h3>Slippage</h3>
		<b>Tolerance</b> : ±0.1%</i>
		<br><b>Minimum Received</b> : <img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"> ${(bmin/10**buydeci).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol}</i>
		<br>
		<br><br><b><u>Please wait till this transaction is confirmed by the ${CHAIN_NAME} Network.</u></b>
		<h4><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
	`);
	txr = await txh.wait();
	console.log(txr);
	notice(`
		<h2>Trade Executed successfully</h2>
		Sold <img style="vertical-align: bottom;" height="20px" src="${STATE.ts.logo}"> ${(Number(ain)/10**selldeci).toFixed(selldeci)} ${(dir?T_X:T_Y).symbol}
		<br>Bought <img style="vertical-align: bottom;" height="20px" src="${STATE.tb.logo}"> ${(Number(sod[1])/10**buydeci).toFixed(buydeci)} ${(dir?T_Y:T_X).symbol}.
		<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
	`);
	gubs();paintBook();
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

function pairSelectionMenu() {
	notice(`
		<h2>Select a Pair to Trade</h2>
		<div style="" class="pairSelectionMenuContainer">
			<h2 class="pairSelectionMenu">
				<a href="250-0">
					<div><img src="https://ftm.guru/icons/mc.USDC.png"><img src="https://ftm.guru/icons/mc.USDT.png"></div>
					<div>
						<div>mc.USDC/mc.fUSDT</div>
						<div><img src="https://ftm.guru/icons/ftm.svg"> #0 - Fantom Opera</div>
					</div>
				</a>
				<a href="250-1">
					<div><img src="https://ftm.guru/icons/ftm.svg"><img src="https://ftm.guru/icons/mc.USDC.png"></div>
					<div>
						<div>WFTM/mc.USDC</div>
						<div><img src="https://ftm.guru/icons/ftm.svg"> #1 - Fantom Opera</div>
					</div>
				</a>
				<a href="42161-0">
					<div><img src="https://ftm.guru/icons/eth.svg"><img src="https://ftm.guru/icons/usdc.svg"></div>
					<div>
						<div>WETH/USDC.e</div>
						<div><img src="https://ftm.guru/icons/arb1.svg"> #0 - Arbitrum One</div>
					</div>
				</a>
				<a href="42161-1">
					<div><img src="https://ftm.guru/icons/eth.svg"><img src="https://ftm.guru/icons/usdc.svg"></div>
					<div>
						<div>WETH/USDC</div>
						<div><img src="https://ftm.guru/icons/arb1.svg"> #1 - Arbitrum One</div>
					</div>
				</a>
				<a href="250-2">
					<div><img src="https://ftm.guru/icons/lz.USDC.png"><img src="https://ftm.guru/icons/axl.USDC.png"></div>
					<div>
						<div>lz.USDC/axlUSDC</div>
						<div><img src="https://ftm.guru/icons/ftm.svg"> #2 - Fantom Opera</div>
					</div>
				</a>
				<a href="250-3">
					<div><img src="https://ftm.guru/icons/ftm.svg"><img src="https://ftm.guru/icons/axl.USDC.png"></div>
					<div>
						<div>wFTM/axlUSDC</div>
						<div><img src="https://ftm.guru/icons/ftm.svg"> #2 - Fantom Opera</div>
					</div>
				</a>
				<a href="8453-0">
					<div><img src="https://ftm.guru/icons/eth.svg"><img src="https://ftm.guru/icons/axl.USDC.png"></div>
					<div>
						<div>wETH/axlUSDC</div>
						<div><img src="https://ftm.guru/icons/base.svg"> #0 - Base</div>
					</div>
				</a>
				<a href="8453-1">
					<div><img src="https://ftm.guru/icons/eth.svg"><img src="https://ftm.guru/icons/usdc.svg"></div>
					<div>
						<div>wETH/USDbC</div>
						<div><img src="https://ftm.guru/icons/base.svg"> #1 - Base</div>
					</div>
				</a>
			</h2>
		</div>
	`);
}

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


//////

async function paintBook() {
	let ua = "";
	try {
		ua = window.ethereum.selectedAddress;
		ua=ua==null?"0x0000000000000000000000000000000000000000":ua;
	} catch(e) { ua="0x0000000000000000000000000000000000000000";}
	_BL=new ethers.Contract(BL[CHAINID],[{"inputs": [],"name": "LA","outputs": [{"internalType": "contract ILA","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IP","name": "p","type": "address"}],"name": "bucketList","outputs": [{"internalType": "uint24[]","name": "","type": "uint24[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint24[]","name": "inp","type": "uint24[]"}],"name": "cast_24_256","outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"},{"internalType": "address","name": "_pair","type": "address"}],"name": "poolInfo","outputs": [{"internalType": "uint256[]","name": "bIds","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsX","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsY","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidities","type": "uint256[]"},{"internalType": "uint256[]","name": "TamountsX","type": "uint256[]"},{"internalType": "uint256[]","name": "TamountsY","type": "uint256[]"},{"internalType": "uint256[]","name": "Tliquidities","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"},{"internalType": "address","name": "_pair","type": "address"}],"name": "positionOf","outputs": [{"internalType": "uint256[]","name": "bIds","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsX","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsY","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidities","type": "uint256[]"}],"stateMutability": "view","type": "function"}],provider)
	rd = await _BL.poolInfo(ua, POOLADDR);
	$("OBA").innerHTML = "";
	$("OBB").innerHTML = "";
	$("OBAB").innerHTML = "";
	$("mp-list").innerHTML = "";
	let _tliq = 0;let _tliqMax = 0;
	for(let i=0;i<rd[0].length;i++){_cliq=Number(rd[6][i])/10**T_Y.decimals;_tliq+=_cliq;_tliqMax=_tliqMax<_cliq?_cliq:_tliqMax;}
	let _t=[0,0];for(i=0;i<rd[0].length;i++){_t[0]+=Number(rd[1][i]);_t[1]+=Number(rd[2][i]);}
	let activebucketi=0;
	for(let i=0;i<rd[0].length;i++){
		if(Number(rd[4][i])>0&&Number(rd[5][i])>0){
			activebucketi=i;
		}
	}
	CACHE.ACTIVEI = Number(rd[0][activebucketi]);
	console.log("activebucketi, i",activebucketi,i,Number(rd[0][activebucketi]));

	$("mp-utab").innerHTML = `
		<span style="font-size:1.5em"><img style="vertical-align: bottom; height:24px; width:24px;" src="${T_X.logo}"> ${_t[0]/10**T_X.decimals} ${T_X.symbol}</span>
		<br><br>
		<span style="font-size:1.5em"><img style="vertical-align: bottom; height:24px; width:24px;" src="${T_Y.logo}"> ${_t[1]/10**T_Y.decimals} ${T_Y.symbol}</span>
		<br><br>
	`;

	for(let i=0;i<rd[0].length;i++) {
		//POW(CAST(1.0020 AS DOUBLE),CAST(CAST(AVG(Bucket) AS DOUBLE)-8388608 AS DOUBLE)) * 1e12 as Price;
		//_p = (1+BUCKET/1e4) ** (rd[0][i] - BUCK_1) * 10**(POOLID==0?0:12);
		_p = ((1e4+BUCKET)/1e4) ** (rd[0][i] - BUCK_1) * 10**(T_X.decimals-T_Y.decimals);
		_ux = Number(rd[1][i])/10**T_X.decimals;
		_uy = Number(rd[2][i])/10**T_Y.decimals;
		_ul = Number(rd[3][i])/10**T_Y.decimals;
		_px = Number(rd[4][i])/10**T_X.decimals;
		_py = Number(rd[5][i])/10**T_Y.decimals;
		_pl = Number(rd[6][i])/10**T_Y.decimals;

		/*
		_up = (_ux == 0 && _uy == 0)
			? "-"
			: (_ux > 0 && _uy == 0)
				? `${_ux.toFixed(4)} <img src="${T_X.logo}"> <button onclick="closePositionAt(${rd[0][i]},${rd[1][i]},${rd[2][i]},${rd[3][i]})"><img src="img/cross.svg"></button>`
				: (_uy > 0 && _ux == 0)
					? ` ${_uy.toFixed(4)} <img src="${T_Y.logo}"><button onclick="closePositionAt(${rd[0][i]},${rd[1][i]},${rd[2][i]},${rd[3][i]})"><img src="img/cross.svg"></button>`
					: ""
		;
		*/

		_upabx =
			_ux >= 0
			? `${_ux.toFixed(4)} <img src="${T_X.logo}"> <button onclick="closePositionAt(${rd[0][i]},${rd[1][i]},${rd[2][i]},${rd[3][i]},'x')"><img src="img/cross.svg"></button>`
			: ""
		;

		_upaby =
			_uy >= 0
			? ` ${_uy.toFixed(4)} <img src="${T_Y.logo}"> <button onclick="closePositionAt(${rd[0][i]},${rd[1][i]},${rd[2][i]},${rd[3][i]},'y')"><img src="img/cross.svg"></button>`
			: ""
		;



		_oldinp = CACHE.oldinp[0] == rd[0][i] ? CACHE.oldinp[1] : '';

		//_qt =

		if(
			//_px!=0 && _py==0 &&
			i > activebucketi
			&& i - activebucketi < MAXORDERBOOKSIZE
		) {

			let __r = document.createElement('div');
			__r.setAttribute('id',`OBR_${rd[0][i]}`);
			__r.setAttribute('class','OBR_A');
			__r.setAttribute('style', `background:linear-gradient(to right, #ff3333ff 0 ${_pl/_tliqMax*100}%, #ff33333f 0 100%)`);
			let __r1 = document.createElement('div');
			__r1.appendChild(document.createTextNode(`${_p.toFixed(6)}`));
			__r.appendChild(__r1);
			let __r2 = document.createElement('div');
			__r2.appendChild(document.createTextNode(`${(_pl/_p).toFixed(4)}`));
			__r.appendChild(__r2);
			let __r3 = document.createElement('div');
			__r3.appendChild(document.createTextNode(`${_pl.toFixed(4)}`));
			__r.appendChild(__r3);
			$("OBA").appendChild(__r);

			/*
			$("OBA").innerHTML = `
				<div
					id="OBR_${rd[0][i]}"
					class="OBR_A"
					style="background:linear-gradient(to right, #ff3333ff 0 ${_pl/_tliqMax*100}%, #ff33333f 0 100%)"
				>
					<div>${_p.toFixed(6)}</div>
					<div>${(_pl/_p).toFixed(4)}</div>
					<div>${_pl.toFixed(4)}</div>
				</div>
			` + $("OBA").innerHTML;
					//<div><input placeholder="0.00" id="op_${rd[0][i]}" value="${ _oldinp }"> <button onclick="openPositionAt(${rd[0][i]},${rd[1][i]},${rd[2][i]},${rd[3][i]},${rd[4][i]},${rd[5][i]},${rd[6][i]},'x')"><img src="img/check.svg"></button></div>
			*/
		}


		else if(
			//_px==0 && _py!=0
			activebucketi > i
			&& activebucketi - i < MAXORDERBOOKSIZE
		) {
			let __r = document.createElement('div');
			__r.setAttribute('id',`OBR_${rd[0][i]}`);
			__r.setAttribute('class','OBR_B');
			__r.setAttribute('style', `background:linear-gradient(to left, #00bb44ff 0 ${_pl/_tliqMax*100}%, #00bb443f 0 100%)`);
			let __r1 = document.createElement('div');
			__r1.appendChild(document.createTextNode(`${_p.toFixed(6)}`));
			__r.appendChild(__r1);
			let __r2 = document.createElement('div');
			__r2.appendChild(document.createTextNode(`${(_pl/_p).toFixed(4)}`));
			__r.appendChild(__r2);
			let __r3 = document.createElement('div');
			__r3.appendChild(document.createTextNode(`${_pl.toFixed(4)}`));
			__r.appendChild(__r3);
			$("OBB").appendChild(__r);

			//__r.appendChild( document.createElement('div').appendChild(document.createTextNode(`${_p.toFixed(6)}`)) );
			//__r.appendChild( document.createElement('div').appendChild(document.createTextNode(`${(_pl/_p).toFixed(4)}`)) );
			//__r.appendChild( document.createElement('div').appendChild(document.createTextNode(`${_pl.toFixed(4)}`)) );


			/*
			$("OBB").innerHTML = `
				<div
					id="OBR_${rd[0][i]}"
					class="OBR_B"
					style="background:linear-gradient(to right, #00bb44ff 0 ${_pl/_tliqMax*100}%, #00bb443f 0 100%)"
				>
					<div>${_p.toFixed(6)}</div>
					<div>${(_pl/_p).toFixed(4)}</div>
					<div>${_pl.toFixed(4)}</div>
				</div>
			` + $("OBB").innerHTML;
					//<div><input placeholder="0.00" id="op_${rd[0][i]}" value="${ _oldinp }"> <button onclick="openPositionAt(${rd[0][i]},${rd[1][i]},${rd[2][i]},${rd[3][i]},${rd[4][i]},${rd[5][i]},${rd[6][i]},'y')"><img src="img/check.svg"></button></div>
			*/
		}

		else if(_px!=0 && _py!=0) {


			let __ra = document.createElement('div');
			__ra.setAttribute('id',`OBR_${rd[0][i]}`);
			__ra.setAttribute('class','OBR_A');
			__ra.setAttribute('style', `background:linear-gradient(to right, #ff3333ff 0 ${_px*_p/_tliqMax*100}%, #ff33333f 0 100%)`);
			let __ra1 = document.createElement('div');
			__ra1.appendChild(document.createTextNode(`${(_p).toFixed(6)}`));
			__ra.appendChild(__ra1);
			let __ra2 = document.createElement('div');
			__ra2.appendChild(document.createTextNode(`${(_px).toFixed(4)}`));
			__ra.appendChild(__ra2);
			let __ra3 = document.createElement('div');
			__ra3.appendChild(document.createTextNode(`${(_px*_p).toFixed(4)}`));
			__ra.appendChild(__ra3);
			$("OBA").appendChild(__ra);


			let __rb = document.createElement('div');
			__rb.setAttribute('id',`OBR_${rd[0][i]}`);
			__rb.setAttribute('class','OBR_B');
			__rb.setAttribute('style', `background:linear-gradient(to left, #00bb44ff 0 ${_py/_tliqMax*100}%, #00bb443f 0 100%)`);
			let __rb1 = document.createElement('div');
			__rb1.appendChild(document.createTextNode(`${_p.toFixed(6)}`));
			__rb.appendChild(__rb1);
			let __rb2 = document.createElement('div');
			__rb2.appendChild(document.createTextNode(`${(_py/_p).toFixed(4)}`));
			__rb.appendChild(__rb2);
			let __rb3 = document.createElement('div');
			__rb3.appendChild(document.createTextNode(`${_py.toFixed(4)}`));
			__rb.appendChild(__rb3);
			$("OBB").appendChild(__rb);

			/*

			$("OBA").innerHTML = `
				<div
					id="OBR_${rd[0][i]}"
					class="OBR_A"
					style="background:linear-gradient(to right, #ff3333ff 0 ${_px*_p/_tliqMax*100}%, #ff33333f 0 100%)"
				>
					<div>${_p.toFixed(6)}</div>
					<div>${(_px).toFixed(4)}</div>
					<div>${(_px*_p).toFixed(4)}</div>
				</div>
			` + $("OBA").innerHTML;
					//<div><input placeholder="0.00" id="op_${rd[0][i]}" value="${ _oldinp }"> <button onclick="openPositionAt(${rd[0][i]},${rd[1][i]},${rd[2][i]},${rd[3][i]},${rd[4][i]},${rd[5][i]},${rd[6][i]},'x')"><img src="img/check.svg"></button></div>

			$("OBB").innerHTML = `
				<div
					id="OBR_${rd[0][i]}"
					class="OBR_B"
					style="background:linear-gradient(to right, #00bb44ff 0 ${_py/_tliqMax*100}%, #00bb443f 0 100%)"
				>
					<div>${_p.toFixed(6)}</div>
					<div>${(_py/_p).toFixed(4)}</div>
					<div>${(_py).toFixed(4)}</div>
				</div>
			` + $("OBB").innerHTML;
					//<div><input placeholder="0.00" id="op_${rd[0][i]}" value="${ _oldinp }"> <button onclick="openPositionAt(${rd[0][i]},${rd[1][i]},${rd[2][i]},${rd[3][i]},${rd[4][i]},${rd[5][i]},${rd[6][i]},'y')"><img src="img/check.svg"></button></div>
			*/

		/*
			$("OBAB").innerHTML = `
				<div
					id="OBR_${rd[0][i]}"
					class="OBR_AB"
					style="background:linear-gradient(to right, #0000ffff 0 ${_pl/_tliqMax*100}%, #0000ffff 0 100%)"
				>
					<div>${_p.toFixed(6)}</div>
					<div>${(_pl/_p).toFixed(4)}</div>
					<div>${_pl.toFixed(4)}</div>
					<div>${_up}</div>
					<div><input placeholder="0.00" id="op_${rd[0][i]}" value="${ _oldinp }"> <button onclick="openPositionAt(${rd[0][i]},${rd[1][i]},${rd[2][i]},${rd[3][i]},${rd[4][i]},${rd[5][i]},${rd[6][i]})"><img src="img/check.svg"></button></div>
				</div>
			`;// + $("OBAB").innerHTML;
			*/;
		}

		//sortit(0,"OBA","OBR_A","div");
		//sortit(0,"OBA","OBR_A","div");

		//sortit(0,"OBB","OBR_B","div");
		//sortit(0,"OBB","OBR_B","div");

		if(_ux > 0) {
			$("mp-list").innerHTML += `
				<div class="OBR_A">
					<div> ${_p.toFixed(6)} <img style="vertical-align: top;width: 16px;" src="${T_Y.logo}"></div>
					<div> ${(_ux*_p).toFixed(4)} <img style="vertical-align: top;width: 16px;" src="${T_Y.logo}"></div>
					<div> ${(_uy).toFixed(4)} <img style="vertical-align: top;width: 16px;" src="${T_Y.logo}"></div>
					<div>${(_upabx)}</div>
				</div>
			`;
		}

		if(_uy > 0) {
			$("mp-list").innerHTML +=  `
				<div class="OBR_B">
					<div> ${_p.toFixed(6)} <img style="vertical-align: top;width: 16px;" src="${T_Y.logo}"></div>
					<div> ${(_uy/_p).toFixed(4)} <img style="vertical-align: top;width: 16px;" src="${T_X.logo}"></div>
					<div> ${(_ux).toFixed(4)} <img style="vertical-align: top;width: 16px;" src="${T_X.logo}"></div>
					<div>${(_upaby)}</div>
				</div>
			`;
		}

	}

	//sortit(0,"OBA","OBR_A","div");
	//sortit(0,"OBA","OBR_A","div");

	sortit(0,"OBB","OBR_B","div");
	//sortit(0,"OBB","OBR_B","div");


}

PAIRABI =
[{"inputs":[{"internalType":"contract ILBFactory","name":"factory_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AddressHelper__CallFailed","type":"error"},{"inputs":[],"name":"AddressHelper__NonContract","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"BinHelper__CompositionFactorFlawed","type":"error"},{"inputs":[],"name":"BinHelper__LiquidityOverflow","type":"error"},{"inputs":[],"name":"FeeHelper__FeeTooLarge","type":"error"},{"inputs":[],"name":"LBPair__AddressZero","type":"error"},{"inputs":[],"name":"LBPair__AlreadyInitialized","type":"error"},{"inputs":[],"name":"LBPair__EmptyMarketConfigs","type":"error"},{"inputs":[],"name":"LBPair__FlashLoanCallbackFailed","type":"error"},{"inputs":[],"name":"LBPair__FlashLoanInsufficientAmount","type":"error"},{"inputs":[],"name":"LBPair__InsufficientAmountIn","type":"error"},{"inputs":[],"name":"LBPair__InsufficientAmountOut","type":"error"},{"inputs":[],"name":"LBPair__InvalidInput","type":"error"},{"inputs":[],"name":"LBPair__InvalidStaticFeeParameters","type":"error"},{"inputs":[],"name":"LBPair__MaxTotalFeeExceeded","type":"error"},{"inputs":[],"name":"LBPair__OnlyFactory","type":"error"},{"inputs":[],"name":"LBPair__OnlyProtocolFeeRecipient","type":"error"},{"inputs":[],"name":"LBPair__OutOfLiquidity","type":"error"},{"inputs":[],"name":"LBPair__TokenNotSupported","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"LBPair__ZeroAmount","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"LBPair__ZeroAmountsOut","type":"error"},{"inputs":[],"name":"LBPair__ZeroBorrowAmount","type":"error"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"LBPair__ZeroShares","type":"error"},{"inputs":[],"name":"LBToken__AddressThisOrZero","type":"error"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LBToken__BurnExceedsBalance","type":"error"},{"inputs":[],"name":"LBToken__InvalidLength","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"LBToken__SelfApproval","type":"error"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"LBToken__SpenderNotApproved","type":"error"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LBToken__TransferExceedsBalance","type":"error"},{"inputs":[],"name":"LiquidityConfigurations__InvalidConfig","type":"error"},{"inputs":[],"name":"OracleHelper__InvalidOracleId","type":"error"},{"inputs":[],"name":"OracleHelper__LookUpTimestampTooOld","type":"error"},{"inputs":[],"name":"OracleHelper__NewLengthTooSmall","type":"error"},{"inputs":[],"name":"PackedUint128Math__AddOverflow","type":"error"},{"inputs":[],"name":"PackedUint128Math__MultiplierTooLarge","type":"error"},{"inputs":[],"name":"PackedUint128Math__SubUnderflow","type":"error"},{"inputs":[],"name":"PairParametersHelper__InvalidParameter","type":"error"},{"inputs":[],"name":"ReentrancyGuard__ReentrantCall","type":"error"},{"inputs":[],"name":"SafeCast__Exceeds128Bits","type":"error"},{"inputs":[],"name":"SafeCast__Exceeds24Bits","type":"error"},{"inputs":[],"name":"SafeCast__Exceeds40Bits","type":"error"},{"inputs":[],"name":"TokenHelper__TransferFailed","type":"error"},{"inputs":[],"name":"Uint128x128Math__LogUnderflow","type":"error"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Uint128x128Math__PowUnderflow","type":"error"},{"inputs":[],"name":"Uint256x256Math__MulDivOverflow","type":"error"},{"inputs":[],"name":"Uint256x256Math__MulShiftOverflow","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"feeRecipient","type":"address"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"CollectedProtocolFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint24","name":"id","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"totalFees","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"CompositionFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"bytes32[]","name":"amounts","type":"bytes32[]"}],"name":"DepositedToBins","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"contract ILBFlashLoanCallback","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint24","name":"activeId","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"amounts","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"totalFees","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"FlashLoan","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint24","name":"idReference","type":"uint24"},{"indexed":false,"internalType":"uint24","name":"volatilityReference","type":"uint24"}],"name":"ForcedDecay","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint16","name":"oracleLength","type":"uint16"}],"name":"OracleLengthIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint16","name":"baseFactor","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"indexed":false,"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"indexed":false,"internalType":"uint16","name":"protocolShare","type":"uint16"},{"indexed":false,"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"}],"name":"StaticFeeParametersSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint24","name":"id","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"amountsIn","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"amountsOut","type":"bytes32"},{"indexed":false,"internalType":"uint24","name":"volatilityAccumulator","type":"uint24"},{"indexed":false,"internalType":"bytes32","name":"totalFees","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"protocolFees","type":"bytes32"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"bytes32[]","name":"amounts","type":"bytes32[]"}],"name":"WithdrawnFromBins","type":"event"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"approveForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"batchBalances","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"batchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amountsToBurn","type":"uint256[]"}],"name":"burn","outputs":[{"internalType":"bytes32[]","name":"amounts","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collectProtocolFees","outputs":[{"internalType":"bytes32","name":"collectedProtocolFees","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ILBFlashLoanCallback","name":"receiver","type":"address"},{"internalType":"bytes32","name":"amounts","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flashLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"forceDecay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getActiveId","outputs":[{"internalType":"uint24","name":"activeId","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"getBin","outputs":[{"internalType":"uint128","name":"binReserveX","type":"uint128"},{"internalType":"uint128","name":"binReserveY","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBinStep","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getFactory","outputs":[{"internalType":"contract ILBFactory","name":"factory","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"getIdFromPrice","outputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bool","name":"swapForY","type":"bool"},{"internalType":"uint24","name":"id","type":"uint24"}],"name":"getNextNonEmptyBin","outputs":[{"internalType":"uint24","name":"nextId","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOracleParameters","outputs":[{"internalType":"uint8","name":"sampleLifetime","type":"uint8"},{"internalType":"uint16","name":"size","type":"uint16"},{"internalType":"uint16","name":"activeSize","type":"uint16"},{"internalType":"uint40","name":"lastUpdated","type":"uint40"},{"internalType":"uint40","name":"firstTimestamp","type":"uint40"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint40","name":"lookupTimestamp","type":"uint40"}],"name":"getOracleSampleAt","outputs":[{"internalType":"uint64","name":"cumulativeId","type":"uint64"},{"internalType":"uint64","name":"cumulativeVolatility","type":"uint64"},{"internalType":"uint64","name":"cumulativeBinCrossed","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint24","name":"id","type":"uint24"}],"name":"getPriceFromId","outputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getProtocolFees","outputs":[{"internalType":"uint128","name":"protocolFeeX","type":"uint128"},{"internalType":"uint128","name":"protocolFeeY","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint128","name":"reserveX","type":"uint128"},{"internalType":"uint128","name":"reserveY","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStaticFeeParameters","outputs":[{"internalType":"uint16","name":"baseFactor","type":"uint16"},{"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"internalType":"uint16","name":"protocolShare","type":"uint16"},{"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"amountOut","type":"uint128"},{"internalType":"bool","name":"swapForY","type":"bool"}],"name":"getSwapIn","outputs":[{"internalType":"uint128","name":"amountIn","type":"uint128"},{"internalType":"uint128","name":"amountOutLeft","type":"uint128"},{"internalType":"uint128","name":"fee","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"amountIn","type":"uint128"},{"internalType":"bool","name":"swapForY","type":"bool"}],"name":"getSwapOut","outputs":[{"internalType":"uint128","name":"amountInLeft","type":"uint128"},{"internalType":"uint128","name":"amountOut","type":"uint128"},{"internalType":"uint128","name":"fee","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenX","outputs":[{"internalType":"contract IERC20","name":"tokenX","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getTokenY","outputs":[{"internalType":"contract IERC20","name":"tokenY","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getVariableFeeParameters","outputs":[{"internalType":"uint24","name":"volatilityAccumulator","type":"uint24"},{"internalType":"uint24","name":"volatilityReference","type":"uint24"},{"internalType":"uint24","name":"idReference","type":"uint24"},{"internalType":"uint40","name":"timeOfLastUpdate","type":"uint40"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"newLength","type":"uint16"}],"name":"increaseOracleLength","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"baseFactor","type":"uint16"},{"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"internalType":"uint16","name":"protocolShare","type":"uint16"},{"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"},{"internalType":"uint24","name":"activeId","type":"uint24"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes32[]","name":"liquidityConfigs","type":"bytes32[]"},{"internalType":"address","name":"refundTo","type":"address"}],"name":"mint","outputs":[{"internalType":"bytes32","name":"amountsReceived","type":"bytes32"},{"internalType":"bytes32","name":"amountsLeft","type":"bytes32"},{"internalType":"uint256[]","name":"liquidityMinted","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"baseFactor","type":"uint16"},{"internalType":"uint16","name":"filterPeriod","type":"uint16"},{"internalType":"uint16","name":"decayPeriod","type":"uint16"},{"internalType":"uint16","name":"reductionFactor","type":"uint16"},{"internalType":"uint24","name":"variableFeeControl","type":"uint24"},{"internalType":"uint16","name":"protocolShare","type":"uint16"},{"internalType":"uint24","name":"maxVolatilityAccumulator","type":"uint24"}],"name":"setStaticFeeParameters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"swapForY","type":"bool"},{"internalType":"address","name":"to","type":"address"}],"name":"swap","outputs":[{"internalType":"bytes32","name":"amountsOut","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];


async function closePositionAt(_bId,_upx,_upy,_upl,_kind) {
	notice(`
		<h3>Closing Old Position</h3>
		Limit Price: ${(1+BUCKET/1e4) ** (_bId - BUCK_1) * 10**(BUCKETDECIMALS[CHAINID][POOLID])} ${T_Y.symbol}S<br>
		Ask: ${_upx/10**T_X.decimals} ${T_X.symbol} <br>
		Bid: ${_upy/10**T_Y.decimals} ${T_Y.symbol}<br>
		Net Position: ${_upl/10**T_Y.decimals} ${T_Y.symbol}<br>
	`);

	_POOL = new ethers.Contract(POOLADDR,PAIRABI,signer);
	_ulpal = await Promise.all([
		_POOL.balanceOf(window.ethereum.selectedAddress,_bId),
		_POOL.isApprovedForAll(window.ethereum.selectedAddress,ROUTER.address)
	]);

	if( Number(_ulpal[0]) == 0) {
		notice(`
			<h3>Position Closed</h3>
			Limit Price: ${(1+BUCKET/1e4) ** (_bId - BUCK_1) * 10**(BUCKETDECIMALS[CHAINID][POOLID])} ${T_Y.symbol}S<br>
			Ask: ${_upx/10**T_X.decimals} ${T_X.symbol} <br>
			Bid: ${_upy/10**T_Y.decimals} ${T_Y.symbol}<br>
			Net Position: ${_upl/10**T_Y.decimals} ${T_Y.symbol}<br>
			<br>
			This position was closed.
		`);
	}

	if( (_ulpal[1]) == false) {
		notice(`
			<h3>Approve Position Manager</h3>
			E3 Position manager requires your approval to access and close this position.
			<br><br>
			<b>Please approve the this transaction in your wallet..</b>
		`);
		txh = await _POOL.approveForAll(ROUTER.address, true);

		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Approving the E3 Position Manager...</h2>
			<b>Awaiting confirmation from the network . . ..</b>
			<br><br><i>Please wait.</i>
		`);
		txr = await txh.wait();

		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Approval Granted</h2>
			<br>Closing your order...
		`);
	}

	notice(`
		<h3>Closing your Position</h3>
		Limit Price: ${(1+BUCKET/1e4) ** (_bId - BUCK_1) * 10**(BUCKETDECIMALS[CHAINID][POOLID])} ${T_Y.symbol}S<br>
		Ask: ${_upx/10**T_X.decimals} ${T_X.symbol}<br>
		Bid: ${_upy/10**T_Y.decimals} ${T_Y.symbol}<br>
		Net Position: ${_upl/10**T_Y.decimals} ${T_Y.symbol}<br><br>
		Slippage Tolerance: ±0.1%<br>
		Ask: ${_upx/10**T_X.decimals*SLIPBPS/1e4} ${T_X.symbol}<br>
		Bid: ${_upy/10**T_Y.decimals*SLIPBPS/1e4} ${T_Y.symbol}<br>
		<br><br>
		<b>Please approve the this transaction in your wallet..</b>
	`);
	R = new ethers.Contract(ROUTER.address, ROUTER.ABI, signer);
	txh = await R.removeLiquidity(
		T_X.address, T_Y.address, BUCKET,
		BigInt(Math.floor(_upx/10**T_X.decimals*SLIPBPS/1e4)), BigInt(Math.floor(_upy/10**T_Y.decimals*SLIPBPS/1e4)),
		[_bId], [_ulpal[0]], window.ethereum.selectedAddress, Math.floor(Date.now()/999.999)
	);

	notice(`
		<h2> Closing your Position...</h2>
		<u>Please wait till this transaction is confirmed by the ${CHAIN_NAME} Network.</u></b>
		<h4><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
	`);
	txr = await txh.wait();

	notice(`
		<h2>Position Closed successfully</h2>
		<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		<br><br>
		EⅢ is glad to have served you. Best of luck for your next trade!
	`);
	gubs();paintBook();
}

async function openPositionAt(_bId,_ubx,_uby,_ubl,_prx,_pry,_prl,_kind) {
	console.log("openPositionAt",_bId,_ubx,_uby,_ubl,_prx,_pry,_prl);
	let _ops = $('op_'+_bId).value;
	if(!isFinite(_ops)) { notice(`<h3>Invalid input amount!</h3><br>Please check the number and try again.`); return}
	_ops = Number(_ops);
	CACHE.oldinp = [_bId, _ops];

	_POOL = new ethers.Contract(POOLADDR,PAIRABI,signer);
	_T_X = new ethers.Contract(T_X.address, ["function balanceOf(address) public view returns(uint256)","function allowance(address,address) public view returns(uint256)","function approve(address,uint256)"], signer);
	_T_Y = new ethers.Contract(T_Y.address, ["function balanceOf(address) public view returns(uint256)","function allowance(address,address) public view returns(uint256)","function approve(address,uint256)"], signer);

	if(_prx>0 && _pry ==0) { //Sale order
		notice(`Validating your Sale Order...<br><br>Please wait.`);

		_ops = _ops * 10**T_X.decimals;
		_op_ubb = await Promise.all([
			_T_X.balanceOf(window.ethereum.selectedAddress),
			//gubs_ty.balanceOf(window.ethereum.selectedAddress),
			//_POOL.getBin(_bId),
			_T_X.allowance(window.ethereum.selectedAddress, ROUTER.address),
			//gubs_ty.allowance(window.ethereum.selectedAddress, ROUTER.address),
			_POOL.getActiveId()
		]);
		//_prx = _op_ubb[2][0];
		//_pry = _op_ubb[2][1];
		if( _op_ubb[0] < _ops ) { notice(`<h3>Insufficient Balance!</h3><br>Desired: ${(_ops / 10**T_Y.decimals).toFixed(6)} ${T_X.symbol}<br>Available: ${_op_ubb[2]/10**T_X.decimals} ${T_X.symbol}`); return};

		if(Number(_op_ubb[1]) < Number(_op_ubb[0])) {
			notice(`
				<h2><img style="vertical-align: bottom;" height="32px" src="${T_X.logo}"> Approve ${T_X.symbol} for Trade</h2>
				E3 Engine needs your approval to open a new ${(_ops / 10**T_X.decimals).toFixed(6)} ${T_X.symbol} position.
				<br><br>
				<br><i>Please confirm this tx in your wallet.</i>
			`);
			txh = await _T_X.approve(ROUTER.address, BigInt(Math.floor(_ops)));
			notice(`
				<h2><img style="vertical-align: bottom;" height="32px" src="${T_X.logo}"> Approving EⅢ Position Manager</h2>
				<b>Awaiting confirmation from the network . . ..</b>
				<br><br><i>Please wait.</i>
			`);
			txr = await txh.wait();
			notice(`
				<h2><img style="vertical-align: bottom;" height="32px" src="${T_X.logo}"> Approval Granted</h2>
				<img style="vertical-align: bottom;" height="32px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
				<img style="vertical-align: bottom;" height="32px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
				<br>Starting Order Creation...
			`);
		}

		R = new ethers.Contract(ROUTER.address, ROUTER.ABI, signer);
		//let _price = (1+BUCKET/1e4) ** (_bId - BUCK_1) * 10**(POOLID==0?0:12);
		let _price = ((1e4+BUCKET)/1e4) ** (_bId - BUCK_1) * 10**(T_X.decimals-T_Y.decimals);
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${T_X.logo}"> New Limit Order</h2>
			<h4>Selling ${T_X.symbol} for ${T_Y.symbol}</h4>
			Quantity: ${(_ops / 10**T_Y.decimals)} ${T_X.symbol}<br>
			Price: ${_price.toFixed(6)} ${T_Y.symbol}<br>
			Size: ${ ((_ops / 10**T_Y.decimals).toFixed(6)/_price).toFixed(6) } ${T_Y.symbol}<br>
			<br><br>
			<br><i>Please confirm this tx in your wallet.</i>
		`);
		let _op_obj = {"tokenX": T_X.address, "tokenY": T_Y.address, "binStep": BUCKET, "amountX": BigInt(_ops), "amountY": 0, "amountXMin": BigInt(Math.floor(_ops*SLIPBPS/1e4)), "amountYMin": 0, "activeIdDesired": _op_ubb[2], "idSlippage": 0, "deltaIds": [_bId - _op_ubb[2]], "distributionX": [BigInt(1e18)], "distributionY": [BigInt(1e18)], "to": window.ethereum.selectedAddress, "refundTo": window.ethereum.selectedAddress, "deadline": Math.floor(Date.now()/999.999) };
		console.log("_op_obj",_op_obj);
		txh = await R.addLiquidity(_op_obj);
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${T_X.logo}">Opening a Sell position</h2>
			<b>Awaiting confirmation from the network . . ..</b>
			<br><br><i>Please wait.</i>
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
		txr = await txh.wait();
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${T_X.logo}">New Position Opened</h2>
			<h4>Selling ${T_X.symbol} for ${T_Y.symbol}</h4>
			Quantity: ${(_ops / 10**T_Y.decimals).toFixed(6)} ${T_X.symbol}<br>
			Price: ${_price.toFixed(6)} ${T_Y.symbol}<br>
			Size: ${ ((_ops / 10**T_Y.decimals)/_price).toFixed(6) } ${T_Y.symbol}<br>
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
	}

	if(_prx==0 && _pry >0) { //Purchase order
		notice(`Validating your Purchase Order...<br><br>Please wait.`);

		_ops = _ops * 10**T_Y.decimals;
		_op_ubb = await Promise.all([
			_T_Y.balanceOf(window.ethereum.selectedAddress),
			//gubs_ty.balanceOf(window.ethereum.selectedAddress),
			//_POOL.getBin(_bId),
			_T_Y.allowance(window.ethereum.selectedAddress, ROUTER.address),
			//gubs_ty.allowance(window.ethereum.selectedAddress, ROUTER.address),
			_POOL.getActiveId()
		]);
		//_prx = _op_ubb[2][0];
		//_pry = _op_ubb[2][1];
		if( _op_ubb[0] < _ops ) { notice(`<h3>Insufficient Balance!</h3><br>Desired: ${(_ops / 10**T_Y.decimals).toFixed(6)} ${T_Y.symbol}<br>Available: ${_op_ubb[2]/10**T_Y.decimals} ${T_Y.symbol}`); return};

		if(Number(_op_ubb[1]) < Number(_op_ubb[0])) {
			notice(`
				<h2><img style="vertical-align: bottom;" height="32px" src="${T_Y.logo}"> Approve ${T_Y.symbol} for Trade</h2>
				E3 Engine needs your approval to open a new ${(_ops / 10**T_Y.decimals).toFixed(6)} ${T_Y.symbol} position.
				<br><br>
				<br><i>Please confirm this tx in your wallet.</i>
			`);
			txh = await _T_Y.approve(ROUTER.address, BigInt(Math.floor(_ops)));
			notice(`
				<h2><img style="vertical-align: bottom;" height="32px" src="${T_Y.logo}"> Approving EⅢ Position Manager</h2>
				<b>Awaiting confirmation from the network . . ..</b>
				<br><br><i>Please wait.</i>
			`);
			txr = await txh.wait();
			notice(`
				<h2><img style="vertical-align: bottom;" height="32px" src="${T_Y.logo}"> Approval Granted</h2>
				<br>Starting Order Creation...
			`);
		}

		R = new ethers.Contract(ROUTER.address, ROUTER.ABI, signer);
		//let _price = (1+BUCKET/1e4) ** (_bId - BUCK_1) * 10**(POOLID==0?0:12);
		let _price = ((1e4+BUCKET)/1e4) ** (_bId - BUCK_1) * 10**(T_X.decimals-T_Y.decimals);
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${T_Y.logo}"> New Limit Order</h2>
			<h4>Purchasing ${T_X.symbol} using ${T_Y.symbol}</h4>
			Quantity: ${(_ops / 10**T_Y.decimals).toFixed(6)} ${T_Y.symbol}<br>
			Price: ${_price.toFixed(6)} ${T_X.symbol}<br>
			Size: ${ ((_ops / 10**T_Y.decimals)/_price).toFixed(6) } ${T_X.symbol}<br>
			<br><br>
			<br><i>Please confirm this tx in your wallet.</i>
		`);
		let _op_obj = {"tokenX": T_X.address, "tokenY": T_Y.address, "binStep": BUCKET, "amountX": 0, "amountY": BigInt(_ops), "amountXMin": 0, "amountYMin": BigInt(Math.floor(_ops*SLIPBPS/1e4)), "activeIdDesired": _op_ubb[2], "idSlippage": 0, "deltaIds": [_bId - _op_ubb[2]], "distributionX": [BigInt(1e18)], "distributionY": [BigInt(1e18)], "to": window.ethereum.selectedAddress, "refundTo": window.ethereum.selectedAddress, "deadline": Math.floor(Date.now()/999.999) };
		console.log("_op_obj",_op_obj);
		txh = await R.addLiquidity(_op_obj);
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${T_Y.logo}"> Opening a Buy position</h2>
			<b>Awaiting confirmation from the network . . ..</b>
			<br><br><i>Please wait.</i>
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
		txr = await txh.wait();
		notice(`
			<h2><img style="vertical-align: bottom;" height="32px" src="${T_Y.logo}">New Position Opened</h2>
			<h4>Purchasing ${T_X.symbol} for ${T_Y.symbol}
			Quantity: ${(_ops / 10**T_Y.decimals)/_price} ${T_X.symbol}<br>
			Price: ${_price.toFixed(6)} ${T_Y.symbol}<br>
			Size: ${ ((_ops / 10**T_Y.decimals).toFixed(6)) } ${T_Y.symbol}<br>
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
	}

	gubs();paintBook();

}


async function closeAll() {
	_BL=new ethers.Contract(BL[CHAINID],[{"inputs": [],"name": "LA","outputs": [{"internalType": "contract ILA","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IP","name": "p","type": "address"}],"name": "bucketList","outputs": [{"internalType": "uint24[]","name": "","type": "uint24[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint24[]","name": "inp","type": "uint24[]"}],"name": "cast_24_256","outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"},{"internalType": "address","name": "_pair","type": "address"}],"name": "poolInfo","outputs": [{"internalType": "uint256[]","name": "bIds","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsX","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsY","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidities","type": "uint256[]"},{"internalType": "uint256[]","name": "TamountsX","type": "uint256[]"},{"internalType": "uint256[]","name": "TamountsY","type": "uint256[]"},{"internalType": "uint256[]","name": "Tliquidities","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"},{"internalType": "address","name": "_pair","type": "address"}],"name": "positionOf","outputs": [{"internalType": "uint256[]","name": "bIds","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsX","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsY","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidities","type": "uint256[]"}],"stateMutability": "view","type": "function"}],provider);
	rd2 = await _BL.poolInfo(window.ethereum.selectedAddress, POOLADDR);
	_t=[0,0];for(i=0;i<rd2[0].length;i++){_t[0]+=Number(rd2[1][i]);_t[1]+=Number(rd2[2][i]);}
	rd3=[];for(i=0;i<rd2[0].length;i++){if(Number(rd2[3][i])>0){rd3.push(Number(rd2[0][i]))}}
	qa=[];for(i=0;i<rd3.length;i++){qa.push(window.ethereum.selectedAddress)}
	let _pn = new ethers.Contract(POOLADDR,["function balanceOfBatch(address[],uint256[]) public view returns(uint256[])"],signer);
	R = new ethers.Contract(ROUTER.address, ROUTER.ABI, signer);
	bq=await _pn.balanceOfBatch(qa,rd3);

	_POOL = new ethers.Contract(POOLADDR,PAIRABI,signer);
	_isAFA = await _POOL.isApprovedForAll(window.ethereum.selectedAddress,ROUTER.address);

	if( _isAFA == false) {
	notice(`
		<h3>Approve Position Manager</h3>
		E3 Position manager requires your approval to access and close all your positions.
		<br><br>
		<b>Please approve the this transaction in your wallet..</b>
	`);
	txh = await _POOL.approveForAll(ROUTER.address, true);

	notice(`
		<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Approving the E3 Position Manager...</h2>
		<b>Awaiting confirmation from the network . . ..</b>
		<br><br><i>Please wait.</i>
	`);
	txr = await txh.wait();

	notice(`
		<h2><img style="vertical-align: bottom;" height="32px" src="${STATE.ts.logo}"> Approval Granted</h2>
		<br>Closing all of your orders...
	`);
}

	notice(`
		<h2>Closing All Positions</h2>
		<h3>Total Asks</h3>
		<img style="vertical-align: bottom;" height="24px" width="24px" src="${T_X.logo}"> ${_t[0]/10**T_X.decimals} ${T_X.symbol} <br>
		<h3>Total Bids</h3>
		<img style="vertical-align: bottom;" height="24px" width="24px" src="${T_Y.logo}"> ${_t[1]/10**T_Y.decimals} ${T_Y.symbol}<br>
		<h3>Minimum Received</h3>
		<img style="vertical-align: bottom;" height="24px" width="24px" src="${T_X.logo}"> ${_t[0]/10**T_X.decimals*SLIPBPS/1e4} ${T_X.symbol} <br>
		<img style="vertical-align: bottom;" height="24px" width="24px" src="${T_Y.logo}"> ${_t[1]/10**T_Y.decimals*SLIPBPS/1e4} ${T_Y.symbol} <br>
		<i>Slippage Tolerance : ±0.1%</i>
	`);
	txh = await R.removeLiquidity(T_X.address,T_Y.address,BUCKET,BigInt(Math.floor(_t[0]*SLIPBPS/1e4)),BigInt(Math.floor(_t[1]*SLIPBPS/1e4)),rd3,bq,window.ethereum.selectedAddress,Math.floor(Date.now()/1000+1337));
	notice(`
		<h2>Closing All Positions</h2>
		<h3>Total Asks</h3>
		<img style="vertical-align: bottom;" height="24px" width="24px" src="${T_X.logo}"> ${_t[0]/10**T_X.decimals} ${T_X.symbol} <br>
		<h3>Total Bids</h3>
		<img style="vertical-align: bottom;" height="24px" width="24px" src="${T_Y.logo}"> ${_t[1]/10**T_Y.decimals} ${T_Y.symbol}<br>
		<h3>Minimum Received</h3>
		<img style="vertical-align: bottom;" height="24px" width="24px" src="${T_X.logo}"> ${_t[0]/10**T_X.decimals*SLIPBPS/1e4} ${T_X.symbol} <br>
		<img style="vertical-align: bottom;" height="24px" width="24px" src="${T_Y.logo}"> ${_t[1]/10**T_Y.decimals*SLIPBPS/1e4} ${T_Y.symbol} <br>
		<i>Slippage Tolerance : ±0.1%</i>
		<br><br>
		<b>Awaiting confirmation from the network . . ..</b>
		<br><br><i>Please wait.</i>
		<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
	`);
	txr = await txh.wait();
	notice(`
		<h2>Closed All Positions!</h2>
		<h3>Total Asks</h3>
		<img style="vertical-align: bottom;" height="24px" width="24px" src="${T_X.logo}"> ${_t[0]/10**T_X.decimals} ${T_X.symbol} <br>
		<h3>Total Bids</h3>
		<img style="vertical-align: bottom;" height="24px" width="24px" src="${T_Y.logo}"> ${_t[1]/10**T_Y.decimals} ${T_Y.symbol}<br>
		<br>
		<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
	`);
	gubs();paintBook();
}


async function onp_create() {
	let _aamt = $("onp-ask").value;
	let _bamt = $("onp-bid").value;
	if(!isFinite(_aamt)) { notice(`<h3>Invalid amount of ${T_X.symbol} input!</h3>`); return;}	_aamt=Number(_aamt);
	if(!isFinite(_bamt)) { notice(`<h3>Invalid amount of ${T_Y.symbol} input!</h3>`); return;}	_bamt=Number(_bamt);
	_T_X = new ethers.Contract(T_X.address, ["function balanceOf(address) public view returns(uint256)","function allowance(address,address) public view returns(uint256)","function approve(address,uint256)"], signer);
	_T_Y = new ethers.Contract(T_Y.address, ["function balanceOf(address) public view returns(uint256)","function allowance(address,address) public view returns(uint256)","function approve(address,uint256)"], signer);
	_POOL = new ethers.Contract(POOLADDR,PAIRABI,signer);
	R = new ethers.Contract(ROUTER.address, ROUTER.ABI, signer);

	notice(`
		Validating your request...<br>
		<br><img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
		<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
		<br><br>Please wait..
	`);

	let _usernums = await Promise.all([
		_POOL.getActiveId(),
		_T_X.balanceOf(window.ethereum.selectedAddress),
		_T_X.allowance(window.ethereum.selectedAddress, ROUTER.address),
		_T_Y.balanceOf(window.ethereum.selectedAddress),
		_T_Y.allowance(window.ethereum.selectedAddress, ROUTER.address),
	]);

	console.log("onp-create",_aamt,_bamt,_usernums);

	if( _usernums[1] < (_aamt*10**T_X.decimals) || _usernums[3] < (_bamt*10**T_Y.decimals) ) {
		notice(`
			<h3>Insufficient Balance!</h3>
			<br>Desired ${T_X.symbol}: ${(_aamt).toFixed(6)}
			<br>Available ${T_X.symbol}: ${_usernums[1]/10**T_X.decimals}
			<br>
			<br>Desired ${T_Y.symbol}: ${(_bamt).toFixed(6)}
			<br>Available ${T_Y.symbol}: ${_usernums[3]/10**T_Y.decimals}
		`);
		return;
	};


	if( _usernums[2] < (_aamt*10**T_X.decimals) || _usernums[4] < (_bamt*10**T_Y.decimals) ) {
		notice(`
			<h3>Insufficient Allowances!</h3>
			<br>Desired ${T_X.symbol}: ${(_aamt).toFixed(6)}
			<br>Allowed ${T_X.symbol}: ${_usernums[2]/10**T_X.decimals}
			<br>
			<br>Desired ${T_Y.symbol}: ${(_bamt).toFixed(6)}
			<br>Allowed ${T_Y.symbol}: ${_usernums[4]/10**T_Y.decimals}
			<br><br>E3 Engine needs your approval to open a new	position.
			<br><i>Please confirm approval transactions in your wallet.</i>
		`);

		txh = await Promise.all([
			_usernums[2] < (_aamt*10**T_X.decimals) ? _T_X.approve(ROUTER.address, BigInt(Math.floor(_aamt*10**T_X.decimals))) : true,
			_usernums[4] < (_bamt*10**T_Y.decimals) ? _T_Y.approve(ROUTER.address, BigInt(Math.floor(_bamt*10**T_Y.decimals))) : true,
		]);
		txr = await Promise.all([
			txh[0] == true ? true : txh[0].wait(),
			txh[1] == true ? true : txh[1].wait()
		]);

		notice(`
			<h2>Approvals Granted!</h2>
			<img style="vertical-align: bottom;" height="32px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
			<img style="vertical-align: bottom;" height="32px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
			<br>Starting Order Creation...
		`);
	};


	if( $("onp-uwf").checked ){
		if(_aamt<T_X.minimum/10**T_X.decimals) { notice(`<h3>Amount of ${T_X.symbol} low!</h3>Minimum order size: ${T_X.minimum/10**T_X.decimals}`); return;}
		if(_bamt<T_Y.minimum/10**T_Y.decimals) { notice(`<h3>Amount of ${T_Y.symbol} low!</h3>Minimum order size: ${T_Y.minimum/10**T_Y.decimals}`); return;}
		notice(`
			<h3>Creating New EⅢ Position</h3>
			Using <b>Ultra-Wide Flat</b> strategy..
			<br>
			<br><img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
			<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
		`);

		let _op_obj = {
			"tokenX": T_X.address,
			"tokenY": T_Y.address,
			"binStep": BUCKET,
			"amountX": BigInt(Math.floor(_aamt*10**T_X.decimals)),
			"amountY": BigInt(Math.floor(_bamt*10**T_Y.decimals)),
			"amountXMin": BigInt(Math.floor(_aamt*10**T_X.decimals*SLIPBPS/1e4)),
			"amountYMin": BigInt(Math.floor(_bamt*10**T_Y.decimals*SLIPBPS/1e4)),
			"activeIdDesired": _usernums[0],//CACHE.ACTIVEI,
			"idSlippage": 10,
			"deltaIds": e3lib_gen_ids(-50,50),
			"distributionX": e3lib_gen_dist(true,'flat',101,50),
			"distributionY": e3lib_gen_dist(false,'flat',101,50),
			"to": window.ethereum.selectedAddress,
			"refundTo": window.ethereum.selectedAddress,
			"deadline": Math.floor(Date.now()/999.999)
		};
		console.log("_op_obj",_op_obj);

		txh = await R.addLiquidity(_op_obj);
		notice(`
			<h2>Opening a new position</h2>
			<div align="center">
				<img style="vertical-align: bottom;" height="64px" src="${T_X.logo}">
				<img style="vertical-align: bottom;" height="64px" src="${T_Y.logo}">
			</div>
			<br><b>Awaiting confirmation from the network . . .</b>
			<br<i>Please wait.</i>
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
		txr = await txh.wait();
		notice(`
			<h2>New Position Opened!</h2>
			Using <b>Ultra-Wide Flat</b> strategy..
			<br>
			<br><img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
			<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
		gubs();paintBook();


	}
	else if( $("onp-cbd").checked ){
		if(_aamt<T_X.minimum/10**T_X.decimals) { notice(`<h3>Amount of ${T_X.symbol} low!</h3>Minimum order size: ${T_X.minimum/10**T_X.decimals}`); return;}
		if(_bamt<T_Y.minimum/10**T_Y.decimals) { notice(`<h3>Amount of ${T_Y.symbol} low!</h3>Minimum order size: ${T_Y.minimum/10**T_Y.decimals}`); return;}
		notice(`
			<h3>Creating New EⅢ Position</h3>
			Using <b><i>Casual Basement Degen</i></b> strategy..
			<br>
			<br><img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
			<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
		`);

		let _op_obj = {
			"tokenX": T_X.address,
			"tokenY": T_Y.address,
			"binStep": BUCKET,
			"amountX": BigInt(Math.floor(_aamt*10**T_X.decimals)),
			"amountY": BigInt(Math.floor(_bamt*10**T_Y.decimals)),
			"amountXMin": BigInt(Math.floor(_aamt*10**T_X.decimals*SLIPBPS/1e4)),
			"amountYMin": BigInt(Math.floor(_bamt*10**T_Y.decimals*SLIPBPS/1e4)),
			"activeIdDesired": _usernums[0],//CACHE.ACTIVEI,
			"idSlippage": 10,
			"deltaIds": e3lib_gen_ids(-34,34),
			"distributionX": e3lib_gen_dist(true,'cbd'),
			"distributionY": e3lib_gen_dist(false,'cbd'),
			"to": window.ethereum.selectedAddress,
			"refundTo": window.ethereum.selectedAddress,
			"deadline": Math.floor(Date.now()/999.999)
		};
		console.log("_op_obj",_op_obj);

		txh = await R.addLiquidity(_op_obj);
		notice(`
			<h2>Opening a new position</h2>
			<div align="center">
				<img style="vertical-align: bottom;" height="64px" src="${T_X.logo}">
				<img style="vertical-align: bottom;" height="64px" src="${T_Y.logo}">
			</div>
			<br><b>Awaiting confirmation from the network . . .</b>
			<br<i>Please wait.</i>
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
		txr = await txh.wait();
		notice(`
			<h2>New Position Opened!</h2>
			Using <b><i>Casual Basement Degen</i></b> strategy..
			<br>
			<br><img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
			<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
		gubs();paintBook();
	}


	else if( $("onp-bp").checked ){
		if(_aamt<T_X.minimum/10**T_X.decimals) { notice(`<h3>Amount of ${T_X.symbol} low!</h3>Minimum order size: ${T_X.minimum/10**T_X.decimals}`); return;}
		if(_bamt<T_Y.minimum/10**T_Y.decimals) { notice(`<h3>Amount of ${T_Y.symbol} low!</h3>Minimum order size: ${T_Y.minimum/10**T_Y.decimals}`); return;}
		notice(`
			<h3>Creating New EⅢ Position</h3>
			Using <b>Bogdanoff Pro™</b> strategy..
			<br>
			<br><img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
			<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
		`);

		let _op_obj = {
			"tokenX": T_X.address,
			"tokenY": T_Y.address,
			"binStep": BUCKET,
			"amountX": BigInt(Math.floor(_aamt*10**T_X.decimals)),
			"amountY": BigInt(Math.floor(_bamt*10**T_Y.decimals)),
			"amountXMin": BigInt(Math.floor(_aamt*10**T_X.decimals*SLIPBPS/1e4)),
			"amountYMin": BigInt(Math.floor(_bamt*10**T_Y.decimals*SLIPBPS/1e4)),
			"activeIdDesired": _usernums[0],//CACHE.ACTIVEI,
			"idSlippage": 10,
			"deltaIds": e3lib_gen_ids(-14,14),
			"distributionX": e3lib_gen_dist(true,'bogpro'),
			"distributionY": e3lib_gen_dist(false,'bogpro'),
			"to": window.ethereum.selectedAddress,
			"refundTo": window.ethereum.selectedAddress,
			"deadline": Math.floor(Date.now()/999.999)
		};
		console.log("_op_obj",_op_obj);

		txh = await R.addLiquidity(_op_obj);
		notice(`
			<h2>Opening a new position</h2>
			<div align="center">
				<img style="vertical-align: bottom;" height="64px" src="${T_X.logo}">
				<img style="vertical-align: bottom;" height="64px" src="${T_Y.logo}">
			</div>
			<br><b>Awaiting confirmation from the network . . .</b>
			<br<i>Please wait.</i>
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
		txr = await txh.wait();
		notice(`
			<h2>New Position Opened!</h2>
			Using <b>Bogdanoff Pro™</b> strategy..
			<br>
			<br><img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
			<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
		gubs();paintBook();
	}



	else if( $("onp-ffc").checked ){
		if(_aamt<T_X.minimum/10**T_X.decimals) { notice(`<h3>Amount of ${T_X.symbol} low!</h3>Minimum order size: ${T_X.minimum/10**T_X.decimals}`); return;}
		if(_bamt<T_Y.minimum/10**T_Y.decimals) { notice(`<h3>Amount of ${T_Y.symbol} low!</h3>Minimum order size: ${T_Y.minimum/10**T_Y.decimals}`); return;}
		notice(`
			<h3>Creating New EⅢ Position</h3>
			Using <b>Five Finger Claw</b> strategy..
			<br>
			<br><img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
			<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
		`);

		let _op_obj = {
			"tokenX": T_X.address,
			"tokenY": T_Y.address,
			"binStep": BUCKET,
			"amountX": BigInt(Math.floor(_aamt*10**T_X.decimals)),
			"amountY": BigInt(Math.floor(_bamt*10**T_Y.decimals)),
			"amountXMin": BigInt(Math.floor(_aamt*10**T_X.decimals*SLIPBPS/1e4)),
			"amountYMin": BigInt(Math.floor(_bamt*10**T_Y.decimals*SLIPBPS/1e4)),
			"activeIdDesired": _usernums[0],//CACHE.ACTIVEI,
			"idSlippage": 10,
			"deltaIds": e3lib_gen_ids(-2,2),
			"distributionX": e3lib_gen_dist(true,'ffc'),
			"distributionY": e3lib_gen_dist(false,'ffc'),
			"to": window.ethereum.selectedAddress,
			"refundTo": window.ethereum.selectedAddress,
			"deadline": Math.floor(Date.now()/999.999)
		};
		console.log("_op_obj",_op_obj);

		txh = await R.addLiquidity(_op_obj);
		notice(`
			<h2>Opening a new position</h2>
			<div align="center">
				<img style="vertical-align: bottom;" height="64px" src="${T_X.logo}">
				<img style="vertical-align: bottom;" height="64px" src="${T_Y.logo}">
			</div>
			<br><b>Awaiting confirmation from the network . . .</b>
			<br<i>Please wait.</i>
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
		txr = await txh.wait();
		notice(`
			<h2>New Position Opened!</h2>
			Using <b>Five Finger Claw</b> strategy..
			<br>
			<br><img style="vertical-align: bottom;" height="20px" src="${T_X.logo}"> Asks: ${_aamt} ${T_X.symbol}
			<br><img style="vertical-align: bottom;" height="20px" src="${T_Y.logo}"> Bids: ${_bamt} ${T_Y.symbol}
			<h4 align="center"><a target="_blank" href="${EXPLORE}/tx/${txh.hash}">View on Explorer</a></h4>
		`);
		gubs();paintBook();
	}


	else if( $("onp-rr").checked ){}
	else { notice(`<h3>Please select a Strategy</h3>`); }
}







