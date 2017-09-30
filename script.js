$(document).ready(function() {

 var interval;
 var time;
 var time_new;
 var playing=false;
 var session=true;
 var change_mode=false;

 $("button").hover(function() {
 	$(this).css("color","rgb(246, 194, 161)");
 }, function() {
 	$(this).css("color","black");
 });
 
 $("#session-down").on("click", function() {
 	if (!playing) {
 		var session = parseInt($("#session-length").text());
    	if (session > 1) {
    		$("#session-length").text(session-1);
      		$("#time").text(session-1+":00");
    	}
	}
  });
  $("#session-up").on("click", function() {
  	if (!playing) {
   		var session = parseInt($("#session-length").text());
    	$("#session-length").text(session+1);
      	$("#time").text(session+1+":00");
  	}
  });
  $("#break-down").on("click", function() {
   	if (!playing) {
  		var break_ = parseInt($("#break-length").text());
    	if (break_ > 1){
    		$("#break-length").text(break_-1);
    	}
    }
  });
  $("#break-up").on("click", function() {
   	if (!playing) { 
   		var break_ = parseInt($("#break-length").text());
    	$("#break-length").text(break_+1);
  	}
  });
  
  $("#reset").on("click", function() {
    clearInterval(interval);
    playing=false;
    $("#time-label").text("-SESSION-");	
    $("#session-length").text(25);
    $("#break-length").text(5);
      $("#time").text(25+":00");
  });
  
   
   $("#play").on("click", function() {
   		if (!playing) {
      clearInterval(interval);
      playing = true;     
      change_mode = false;
      time = $("#time");
      interval = setInterval(function() {   
      	if (session) {
      		if (change_mode) {
				$("#time-label").text("-SESSION-");			
				time.text(parseInt($("#session-length").text()) + ":01");
				change_mode = false;
			}

      		$("#time-label").text("-SESSION-");
      		time_new = decrementTime(time.text());
       		time.text(time_new);

       		if (time_new=="00:00" || time_new=="00:00:00") {
      			session = false;
      			change_mode = true;
      		}
       		
      	}else {      
			if (change_mode) {
				$("#time-label").text("-BREAK-");			
				time.text(parseInt($("#break-length").text()) + ":01");
				change_mode = false;
			}
      		$("#time-label").text("-BREAK-");
       		time_new = decrementTime(time.text());
       		time.text(time_new);

       		if (time_new=="00:00" || time_new=="00:00:00") {
      			session = true;
      			change_mode = true;
      		}	
      	}
    }, 1000);
  }		
    });
  
    $("#stop").on("click", function() {
      $("#time").text($("#session-length").text()+":00");
      clearInterval(interval);
      playing=false;
      $("#time-label").text("-SESSION-");	
  });
  
  $("#pause").on("click", function() {
  	playing = false;
    clearInterval(interval);
  });
  
   
});

function decrementTime(timeString) {
	var hours=0;
  	var minutes=0;
  	var seconds=0;
  	var timeUnits = timeString.split(':');
  if (timeUnits.length>2) {
    hours = parseInt(timeUnits[0]);
    minutes = parseInt(timeUnits[1]);
    seconds = parseInt(timeUnits[2]);
  } else {  
    minutes = parseInt(timeUnits[0]);
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    seconds = parseInt(timeUnits[1]);
    }
    if (seconds==0) {
     if (minutes==0) {
      if (hours>0) {
          hours--;
          minutes=59;
          seconds=59;
        }     
      } else {
       minutes--;
        seconds=59;
      }
    } else {
    seconds--;
    }    
    return formatTime(hours,minutes,seconds);    
}

function formatTime(hours,minutes,seconds){
 timeString="";
 if (hours<10 && hours>0) {
   timeString+=("0"+hours+":");
  } else if (hours>9) {
   timeString+=(hours.toString()+":");
  }
  if (minutes>9) {
   timeString+=(minutes + ":");
  } else {
   timeString+=("0" + minutes + ":");
  }
  if (seconds>9) {
   timeString+=seconds;
  } else {
   timeString+=("0" + seconds);
  }
  return timeString;
}
