(function() {
	"use strict";

   var access_token;

   window.onload = function() {
      // gets a users access token, stores to access_token      
      document.getElementById("load").onclick = getUserData;
      document.getElementById("recent").onclick = getRecentMedia;
   };

      // gets a users access token, stores to access_token      
   var access_token = window.location.href.split("=")[1];
   // get recent media only want this to run once
   var hasRun = false;
   if (access_token != null) {
      console.log("Authentication complete");  
      console.log(access_token); // for debugging
   }
      
   // gets users data (username, bio, follower counts, media, id, full name, profile pic)
   function getUserData() {
      this.style.display = 'none';
      $.ajax ({  
         type: "GET",
         dataType: "jsonp",
         cache: false,
         url: "https://api.instagram.com/v1/users/self/?access_token=" + access_token,
         success: function(data) {
            console.log("sucessfully retrived user data");
            $('#name').text(data.data.username);
            $('#bio').text(data.data.bio);
            $('#realName').text(data.data.full_name);
            $("#pic").append("<div'><img src='" + data.data.profile_picture + "'></img></a></div>");
         }
      });
      return null;
   }

   function getRecentMedia() {
      if (!hasRun) {
         $.ajax ({  
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + access_token,
            success: function(data) {
               console.log("sucessfully retrived media");
              // var totalLength = data.data.length;
               var totalLength = 10;
               for (var i = 0; i < totalLength; i++) {
                  if (data.data[i].type === "video") {
                     $("#tenpics").append("<div class='media'><a target='_blank' href='" + data.data[i].link + "'><video controls loop autoplay class='media' src='" + data.data[i].videos.low_resolution.url + "'></video></a></div>");
                  } else { 
                     $("#tenpics").append("<div class='media'><a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url + "'></img></a></div>");
                  }
               }
            }
         });
      }
      hasRun = true;
      return null;
   }
})();