(function() {
	"use strict";

	// gets a users access token, stores to access_token      
   var access_token = window.location.href.split("=")[1]; // 
   console.log(access_token);

   // gets users data (username, bio, follower counts, media, id, full name, profile pic)
   // function get_data() {
   //    $.ajax ({  
   //       type: "GET",
   //       dataType: "jsonp",
   //       cache: false,
   //       url: "https://api.instagram.com/v1/users/self/?access_token=" + access_token,
   //       success: function(data) {
   //                                                           // EVERYTHING WORKS UP UNTIL HERE
   //          var data_P = JSON.parse(data.responseText);
   //          console.log(data_P);
           
   //       }
   //    });
   // }

   function get_data() {
      var request = new XMLHttpRequest();
      request.onload = fetchInfo;
      request.open("GET", "https://api.instagram.com/v1/users/self/?access_token=" + access_token, 
               true);
      request.send();
   }

   function fetchInfo() {
      if(this.status == 200) {
         var data = JSON.parse(this.responseText);
         console.log(data);
      } else {
         console.log("error");
      }
   }
})();