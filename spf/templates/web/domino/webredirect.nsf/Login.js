function checkShared(isChecked){

	var oRemember = document.getElementById('remember');
	if (oRemember){	
		if (isChecked){
			oRemember.disabled = true;
			oRemember.style.color = '#888888';
			oRemember.checked=false;
		}
		else {
			oRemember.disabled = false;
			oRemember.style.color = 'inherit';
		}
	}
	var oRememberText = document.getElementById('rememberText');
	if (oRememberText){
		if (isChecked)
			oRememberText.style.color = '#888888';
		else
			oRememberText.style.color='inherit';
	}
}

function checkOption(value){
	var oShared = document.getElementById('DWAShared');
	var oSharedText = document.getElementById('DWASharedText');
	
	switch(parseInt(value)){
		case 0: 
		case 1:	oShared.disabled = false;
			oShared.style.color = 'inherit'
			oSharedText.style.color = 'inherit';
			break;
				
		case 2:	oShared.disabled=true;
			oShared.style.color='#888888';
			oSharedText.style.color='#888888';
			oShared.checked=false;
			checkShared(false);
			break;				
	}
}


function setFormFocus() {

	//Check for a saved stated
	//If ultralite is selected after reload, hide the 'shared' checkbox
	var oUL = document.getElementById('radioUL');
	if (oUL && oUL.checked)
		checkOption(2);
	
	var oSh = document.getElementById('DWAShared');
	if (oSh)
		checkShared(oSh.checked);
	
	if (document.forms[0]){
		//Set Focus to the username field is the username is not already populated
		var oUsernameField = document.forms[0].username;
		if (oUsernameField && oUsernameField.value=="")	{
			oUsernameField.focus(); 
			oUsernameField.select();
		}
		else
		{
			var oPasswordField = document.forms[0].password;
			oPasswordField.focus(); 
			oPasswordField.select();
		}
	}

	var oModeCell = document.getElementById('e-mode-cell');
	var oDivideCell = document.getElementById('e-divide-cell');
	
	// Hide the DWA options if the login screen was not generated by DWA Redirect
	var DWAOptions = document.getElementById('DWAOptions');
	if (DWAOptions && (document.forms[0].RedirectTo.value.indexOf(webDbName)<1 || bLoginOptions == 0))
		DWAOptions.style.display = 'none';
	else
		DWAOptions.style.display = '';


	if (oModeCell && oDivideCell){
		// Hide DWA Mode buttons if Personal Options are enabled	
		if (bLoginOptions==1 && bPersonalOptions == 1) {
			oModeCell.style.display='none';
			oDivideCell.style.display='none';
		}
		else {
			oModeCell.style.display='';
			oDivideCell.style.display='';
		}
	} //End 	

}


function encryptPassword() {

	var oRemember = document.getElementById("remember");
	var oUsername = document.getElementById("username");
	var oShared = document.getElementById("DWAShared");
	
	if (oRemember && oRemember.checked && oUsername && oShared && !oShared.checked){
		//Expire cookie in 30 days
		var oExpire = new Date(new Date().getTime() + 2592000000); 
		window.document.cookie = "INOTES_LOGIN_ID="+escape(oUsername.value)+"; expires="+oExpire.toGMTString()+";";
	}
	else if (oRemember && !oRemember.checked){
		//Expire the cookie
		window.document.cookie = "INOTES_LOGIN_ID=; expires=Thu, 1 Jan 1970 23:59:59 UTC;";
	}		
		

	window.document.cookie = (oShared && oShared.checked) ? "DWAShared=1": "DWAShared=0";

	
 	if (bEncryptPassword && location.protocol != "https:") {
		var sAction = document.forms[0].action;
		var nRootPos = sAction.indexOf("/names.nsf");
		document.forms[0].action="https://"+location.hostname+(sslport && sslport!="443" ? ":" + sslport : "")+sAction.substring(nRootPos);
		var sRedirTo = document.forms[0].RedirectTo.value;
		if( '/' == sRedirTo.charAt(0) ) 
			document.forms[0].RedirectTo.value = location.protocol + "//"+location.hostname+sRedirTo;		
	}


	var oModes = document.forms[0].DWAMode;
	window.document.cookie = (oModes && oModes[1].checked) ? "DWAMode=1" :
				 (oModes && oModes[2] && oModes[2].checked) ? "DWAMode=2" : "DWAMode=0";
	
	document.forms[0].submit();
}




function doError() {
	return true;
}
window.onerror=doError;





