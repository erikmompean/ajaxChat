$(document).ready(function(){
	$("#submitBtn").click(function(){
			console.log("hola")
			var userName = $('#username').val()
			var password = $('#passwd').val()
		    $.get("chat.php",
		    	{
		    		option	: 2,
		    		"username"	: userName,
		    		"password"	: password
		    	},
		    	function(data, status){
		    		if(!jQuery.isEmptyObject(data))
		    		{
		    			redirect()
		    			
		    		}
		    		else
		    		{
		    			alert("Error")
		    		}
					
				}, 'json');
		});

// jQuery end
});

function redirect(){
	console.log("success");
	window.location = "index.html";
}