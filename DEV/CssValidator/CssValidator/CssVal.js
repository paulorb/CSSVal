
// CssVal - Mask and validator easy
// Coded by: Paulo RB
// For more info visit: www.paulorb.com.br
// Requirements: all elements must have an ID and it MUST be all different





//Struct (we can create an instance of this one)
function SingleElementInputStructure()  {
	this.id = "";
	this.inputClass = "";
}


var CssVal = {
	CSSValErrorReportMethods: [],
	CSSValErrorReportMethodsIndex: 0,
	inputElementsStorage: [],
	inputElementsIndex: 0,
	CSSValMethods : [],
	CSSValMethodsIndex: 0,
	RegisterErrorReportModule: function(CSSValERModule){
		if(CSSValERModule == null){
			console.log("Error Registering module (NULL MODULE)");
			return;
		}
		console.log("Registering ER module: " +  CSSValERModule.className);
		CssVal.CSSValErrorReportMethods[CssVal.CSSValErrorReportMethodsIndex] = CSSValERModule;
		CssVal.CSSValErrorReportMethodsIndex++;
	},
	//register CSSVal module all new module must call the RegisterModule
	RegisterModule: function(CSSValModule) {   //NOT FOR ERROR REPORT MODULE
		if(CSSValModule == null){
			console.log("Error Registering module (NULL MODULE)");
			return;
		}
		console.log("Registering module: " +  CSSValModule.className);
		CssVal.CSSValMethods[CssVal.CSSValMethodsIndex] = CSSValModule;
		CssVal.CSSValMethodsIndex++;
	},
	FindModuleByCSSValName: function(CSSValModule){  //NOT FOR ERROR REPORT MODULE
		for (var i = 0; i < CssVal.CSSValMethodsIndex; i++) {
			if(CssVal.CSSValMethods[i].className == CSSValModule){
				return CssVal.CSSValMethods[i];
			}
		}
		return null;
	},
	FindModuleErrorReportModuleByCSSValName: function(CSSValERModule){  //NOT FOR ERROR REPORT MODULE
		for (var i = 0; i < CssVal.CSSValErrorReportMethodsIndex; i++) {
			if(CssVal.CSSValErrorReportMethods[i].className == CSSValERModule){
				//alert("ACHOU: " + CssVal.CSSValErrorReportMethods[i].className );
				return CssVal.CSSValErrorReportMethods[i];
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
					
					console.log("Index:"+ index + " Found ID:" + $(this).attr('id') + " Class=" +CssVal.CSSValMethods[i].className );
					//<input class="specific"
					//get the ID and passes the ID to the 
					CssVal.CSSValMethods[i].SetMask($(this).attr('id'));
					
					className = CssVal.CSSValMethods[i].className;
					//Validation
					//If the user has input some value related to validation like 
					//set an event lostfocus on the input to validate the contents of the input

					//verify if there is a CSSVal_ErrorReport_Simple
					var moduleErrorReport = null;
    				var classes = $(this).attr("class").split(" ");
    	
    				for (var j =0; j <= classes.length; j++) {
						//alert("for classes: "+ classes[j] + " todos: " + classes);
    					moduleErrorReport =  CssVal.FindModuleErrorReportModuleByCSSValName(classes[j]);
    					if(moduleErrorReport != null){
    						//alert($(this).attr('id'));
    						//alert(classes);
    						//alert("moduleErrorReport exists 1");
    						break;
    					}
    				}


    				if(moduleErrorReport != null){
    					//alert("moduleErrorReport exists 2");
    					//alert(moduleErrorReport);
						$(this).focusout(function () {
	    					if(CssVal.FindModuleByCSSValName(className).IsValid($(this).attr('id')) == false){
	    						//alert("Validation returned failed");
								moduleErrorReport.GenerateError($(this).attr('id'),CssVal.FindModuleByCSSValName(className).errorMessage);					

	    					}else{
	    						//alert("Validation returned valid!");
	    						moduleErrorReport.GenerateSuccess($(this).attr('id'),CssVal.FindModuleByCSSValName(className).successMessage);	
	    						
	    					}
						});
					}

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




var  ERROR_SimpleError =
{
	className : "CSSVal_ErrorReport_Simple",
	GenerateError: function(inputID,errorMessage){
		//alert("generating error");
		$("#"+inputID).css("border-color","red");
	//	$("#"+inputID).after($("<p>" + errorMessage + "</p>"));
		$("#msgerror_"+ inputID).remove();
		$("#"+inputID).after($("<span id=\"msgerror_"+ inputID +"\">" +  errorMessage + "</span>"));

		


	},
	GenerateSuccess: function(inputID,successMessage){
		$("#msgerror_"+ inputID).remove();
		$("#"+inputID).css("border-color","");
	},

	//constructor
	Initializate: function(){
		CssVal.RegisterErrorReportModule(this);
	}
	//console.debug(this)
	//CssVal.RegisterErrorReportModule(this);
}.Initializate(); //(); //run the constructor to assure that the RegisterErrorReportModule will be called


//CSSVal module
//var  CPF = function()  {
var CPF = {
	className : "CSSVal_cpf",
	errorMessage : "CPF Invalido",
	successMessage : null,
	SetMask :function(divID) {
		console.log("SetMask " + divID);
		$("#"+divID).mask("999.999.999-99");
	},
	IsValid : function(divID) {
		////alert($("#"+ divID).val());
		//CPF validation algorithm
		var cpf = $("#"+ divID).val().replace(/\./g,'').replace(/\-/g,'');
		//alert(cpf);
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
	},
	Initializate: function(){
		CssVal.RegisterModule(this);
	}
	//constructor
	//register module on the CSSVal Core
	

}.Initializate(); //run the constructor to assure that the RegisterModule will be called





//start point
$(document).ready(function() {
  	console.log("initializating ");
	CssVal.Initializate();
});





