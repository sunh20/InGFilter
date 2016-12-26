   (function() {
   	"use strict";

      var access_token;

      window.onload = function() {
         document.getElementById("loadUser").onclick = getUserData;
         document.getElementById("loadMedia").onclick = getMedia;
         document.getElementById("recent").onclick = showRecent(recent);
         document.getElementById("top").onclick = showTop(top);
         document.getElementById("recent").style.display = 'none';
         document.getElementById("top").style.display = 'none';
      };

      // gets a users access token, stores to access_token      
      access_token = window.location.href.split("=")[1];
            
      if (access_token != null) {
         console.log("Authentication complete");  
         console.log(access_token); // for debugging
      }
      
      // for get media, only want this to run once
      var hasRun = false;
      
      // maps media to likes
      var dict = {};
      
      // how many photos to display
      var recent = 5;
      var top = 3;

         
      // gets users data (username, bio, follower counts, media, id, full name, profile pic)
      function getUserData() {
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
               document.getElementById("loadUser").style.display = 'none';
            }
         });
         return null;
      }
      
      // gets all media from user, stores as dict as global variable
      function getMedia() {
         if (!hasRun) {
            $.ajax ({  
               type: "GET",
               dataType: "jsonp",
               cache: false,
               url: "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + access_token,
               success: function(data) {
                  console.log("sucessfully retrived media");
                  var totalLength = data.data.length;
                  // var dict = {};
                  // var recent = 5;
                  // var top = 3;
                  // inserts photo index and #likes into a map, // displays recent
                  for (var i = 0; i < totalLength; i++) {
                     dict[i] = data.data[i].likes["count"];
                     //if (i < recent) {
                     //   if (data.data[i].type === "video") {
                     //      $("#recentpics").append("<div class='media'><a target='_blank' href='" + data.data[i].link + "'><video controls loop autoplay class='media' src='" + data.data[i].videos.low_resolution.url + "'></video></a></div>");
                     //   } else { 
                     //      $("#recentpics").append("<div class='media'><a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url + "'></img></a></div>");
                     //   }
                     // }
                  }
                  document.getElementById("loadMedia").style.display = 'none';
                  document.getElementById("recent").style.display = 'initial';
                  document.getElementById("top").style.display = 'initial';
               }
            });
         }
         hasRun = true;
         return null;
         
      }
      
      // displays recents photos
      function showRecent(recent) {
         for (var i = 0; i < recent; i++) {
            if (data.data[i].type === "video") {
               $("#recentpics").append("<div class='media'><a target='_blank' href='" + data.data[i].link + "'><video controls loop autoplay class='media' src='" + data.data[i].videos.low_resolution.url + "'></video></a></div>");
            } else { 
               $("#recentpics").append("<div class='media'><a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url + "'></img></a></div>");
            }
         }
         document.getElementById("recent").style.display = 'none';
      }
      
      // displays top photos
      function showTop(top) {
         // Create items array, sort, slice top three
         var items = Object.keys(dict).map(function(key) {
             return [key, dict[key]];
         });

         items.sort(function(first, second) {
             return second[1] - first[1];
         });

         items = items.slice(0, top);

         console.log("Top photo processing complete" + items);

         for (var i = 0; i < items.length; i++) {
            var index = items[i][0];
            if (data.data[index].type === "video") {
               $("#topphoto").append("<div class='media'><a target='_blank' href='" + data.data[index].link + "'><video controls loop autoplay class='media' src='" + data.data[index].videos.low_resolution.url + "'></video></a></div>");
            } else { 
               $("#topphoto").append("<div class='media'><a target='_blank' href='" + data.data[index].link + "'><img src='" + data.data[index].images.low_resolution.url + "'></img></a></div>");
            }
         }
         document.getElementById("top").style.display = 'none';
      }
      
      // gets all users followers
      function getFollowers() {
         $.ajax ({  
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: "https://api.instagram.com/v1/users/self/followed-by?access_token=" + access_token,
            success: function(data) {
               console.log("sucessfully retrived followers");
               //$('#follower').text(data.data.username);
            }
         });
         return null;
      }
      
      
      
   })();
