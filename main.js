$(document).ready(function(){
	
	$.get("chat.php",
    	{
    		option	: 1,
    	},
    	function(data, status){
	    	for (i = 0; i < data.length; i++) {
	    		$(".contact-list").append('<div id="contactTag'+ data[i].user_id +'" class="contact"><p class="contact-name">' + data[i].username + '</p></div>')

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
		    		var id = data[i].user_id
		    		$(".contact-list").append('<div id="contactTag'+ data[i].user_id +'" class="contact"><p class="contact-name">' + data[i].username + '</p></div>')
					addRoom(id)
				}

				
			}, 'json');
	});


	function addRoom(id){
		$("#contactTag"+id).click(function(){
			console.log(id)
		});
	}
// jQuery end
});

function last(words) {

    var n = words.split(" ");
    return n[n.length - 1];

}