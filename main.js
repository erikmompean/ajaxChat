var myUserId;
var theOther = null;
$(document).ready(function(){
	
	$.get("chat.php",
    	{
    		option	: 1,
    	},
    	function(data, status){
	    	for (i = 0; i < data.length; i++) {
	    		var id = data[i].user_id
	    		$(".contact-list").append('<div id="contactTag'+ data[i].user_id +'" class="contact"><p class="contact-name">' + data[i].username + '</p></div>')
	    		addRoom(id)
			}
		}, 
		'json'
	);

    
	$("#searchBox").keyup(function(){
		$(".contact-list").empty()
		var inputVal = $('#searchBox').val()
	    $.get("chat.php",
	    	{
	    		option	: 0,
	    		string	: inputVal
	    	},
	    	function(data, status){
	    		
		    	for (i = 0; i < data.length; i++) {
		    		//REPETIR AQUI
		    		var id = data[i].user_id
		    		$(".contact-list").append('<div id="contactTag'+ data[i].user_id +'" class="contact"><p class="contact-name">' + data[i].username + '</p></div>')
					addRoom(id)
				}

				
			}, 'json');
	});


	function addRoom(id){
	
		$("#contactTag"+id).click(function(){
			theOther = id
			console.log(id)
			console.log(theOther)
			$("#chatContent").empty()
			$(".who-am-i").empty()
			$.get("chat.php",
		    	{
		    		option	: 6,
		    		"id"	:theOther
		    	},
		    	function(data, status){

					$(".who-am-i").append('<p><span class="top-text">Estas hablando con: </span>'+ data[0].username +'</p>')			
				}, 'json');
			$.get("chat.php",
		    	{
		    		option	: 4,
		    	},
		    	function(data, status){
		    		myUserId = data.user_id
		    		
		    		showContent(data.user_id, id)				
				}, 'json');
			
		});
	}

	function showContent(myId, otherId){
		$.get("chat.php",
	    	{
	    		option	: 3,
	    		"myId"	: myId,
	    		"otherId": otherId
	    	},
	    	function(data, status){
				for (i = 0; i < data.length; i++) {
					discriminateMessage(data[i])

				}
			}, 'json');
	}

	function discriminateMessage(message){
		if(myUserId == message.sender)
		{
			$("#chatContent").append('<div class="cap"><div class="my-message col-md-12"><p class="message"> '+ message.text +' <span class="time">10:30</span></p></div></div>')
		}
		else
		{
			$("#chatContent").append('<div class="cap"><div class="other-message col-md-12"><p class="message"> '+ message.text +' <span class="time">10:30</span></p></div></div>')
		}
	}

	$("#sendBtn").click(function(){

		// Una pequeña animacion al enviar
	    $("#sendBtn").animate({
	        height: '30px'
	    }, 150, function(){
	    	$("#sendBtn").animate({
	        	height: '25px'
	    }, 150);
	    });
	   	
	   	// Recojemos el texto
		var txt = $("#textSender").val()

		// Comprovamos que el texto o este vacio, o, sean solo espacios
		var prove = proveTxt(txt)		
		if(prove === true){
	

			// Enviamos
			$.get("chat.php",
		    	{
		    		option	: 5,
		    		"text"	: txt,
		    		"sender": myUserId,
		    		"receiver": theOther
		    	},
	    	function(data, status){
	    		
				console.log(data)
			}
		    	);

			}
		$("#textSender").val("")

	})

	// Evento, al presionar enter tambien lo enviamos
	$('#textSender').keypress(function (e) {
	  if (e.which == 13) {
    	$("#sendBtn").click()

		return false;
	  }
	});
// jQuery end
});

function last(words) {

    var n = words.split(" ");
    return n[n.length - 1];

}


// Funcion para comprovar que no envias espacios
function proveTxt(txt){
	txt = txt.replace(/\s/g, '')
	if(txt === ""){
		return false
	} else {
		return true
	}
}