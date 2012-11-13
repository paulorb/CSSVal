// CssVal - Mask and validator easy
// Requirements: all elements must have an ID and it MUST be all different





//Struct (we can create an instance of this one)
function SingleElementInputStructure()  {
	this.id = "";
	this.inputClass = "";
}


var CssVal = {
	inputElementsStorage: [],
	inputElementsIndex: 0,
	CSSValMethods : [],
	CSSValMethodsIndex: 0,
	//register CSSVal module all new module must call the RegisterModule
	RegisterModule: function(CSSValModule) {
		if(CSSValModule == null){
			console.log("Error Registering module (NULL MODULE)");
			return;
		}
		console.log("Registering module: " +  CSSValModule.className);
		CssVal.CSSValMethods[CssVal.CSSValMethodsIndex] = CSSValModule;
		CssVal.CSSValMethodsIndex++;
	},
	FindModuleByCSSValName: function(CSSValModule){
		for (var i = 0; i < CssVal.CSSValMethodsIndex; i++) {
			if(CssVal.CSSValMethods[i].className == CSSValModule){
				return CssVal.CSSValMethods[i];
			}
		}
		return null;
	},
	Initializate: function() {
		//loop all input elements and check for CSSVal keywords
		//this is a factory search for specific keywords and for each one create and execute the specific method
		console.log("Initializate()");
		
		//search for class in each Module available
		for (var i = 0; i < CssVal.CSSValMethodsIndex; i++) {
			console.log("Searching on module " + CssVal.CSSValMethods[i].className);
			//get all input of an specific class type 
			$("." + CssVal.CSSValMethods[i].className ).each( function(index) {   
					console.log("Found ID:" + $(this).attr('id') + " Class=" +CssVal.CSSValMethods[i].className );
					//<input class="specific"
					//get the ID and passes the ID to the 
					CssVal.CSSValMethods[i].SetMask($(this).attr('id'));
					
					className = CssVal.CSSValMethods[i].className;
					//Validation
					//set an event lostfocus on the input to validate the contents of the input
					$(this).focusout(function () {
    					if(CssVal.FindModuleByCSSValName(className).IsValid($(this).attr('id')) == false){
    						alert("Validation returned failed");
    					}else{
    						alert("Validation returned valid!");
    					}
					});

					//store the element
					el = new SingleElementInputStructure();
					el.id = $(this).attr('id');
					el.inputClass = CssVal.CSSValMethods[i].className;
					CssVal.inputElementsStorage[CssVal.inputElementsIndex] = el;
					CssVal.inputElementsIndex++;
			 } );
		};


			


			
		

	}





}


//CSSVal module
var  CPF = function()  {
	this.className = "CSSVal_cpf";
	this.SetMask = function(divID) {
		console.log("SetMask " + divID);
		$("#"+divID).mask("999.999.999-99");
	};
	this.IsValid= function(divID) {
		//alert($("#"+ divID).val());
		var cpf = $("#"+ divID).val().replace(/\./g,'').replace(/\-/g,'');
		alert(cpf);
		if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
		return false;
		add = 0;
		for (i=0; i < 9; i ++)
		add += parseInt(cpf.charAt(i)) * (10 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11)
		rev = 0;
		if (rev != parseInt(cpf.charAt(9)))
		return false;
		add = 0;
		for (i = 0; i < 10; i ++)
		add += parseInt(cpf.charAt(i)) * (11 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11)
		rev = 0;
		if (rev != parseInt(cpf.charAt(10)))
		return false;
		return true;
	};

	//constructor
	//register module on the CSSVal Core
	CssVal.RegisterModule(this);

}(); //run the constructor to assure that the RegisterModule will be called


//start point
$(document).ready(function() {
  	console.log("initializating ");
	CssVal.Initializate();
});





