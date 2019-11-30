function save_cookie(campo, dado){
	if(document.cookie == "")
		document.cookie = campo + "=" + dado + ",";
	else{
		document.cookie = document.cookie + campo + "=" + dado + ",";
	}
}

function get_cookie(campo){
	let campos = document.cookie.split(";");

	for(let i = 0; i < campos.length; i++){
		let c = campos[i].split("=");
		
		if(c[0] == campo) return c[1];
	}

	return null;
}

function clear_cookies(){
	document.cookie = "";	
}