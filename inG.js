   (function() {
   	"use strict";

      var access_token;

      window.onload = function() {
         document.getElementById("load").onclick = getUserData;
         document.getElementById("recent").onclick = getRecentMedia;
      };

      // gets a users access token, stores to access_token      
      access_token = window.location.href.split("=")[1];
      
      // get recent media, only want this to run once
      var hasRun = false;
      
      if (access_token != null) {
         console.log("Authentication complete");  
         console.log(access_token); // for debugging
      }
         
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
               document.getElementById("load").style.display = 'none';
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
                  var totalLength = data.data.length;
                  var dict = {};
                  var top = 5;
                  // inserts photo index and #likes into a map, displays only top 5
                  for (var i = 0; i < totalLength; i++) {
                     dict[i] = data.data[i].likes["count"];
                     if (i < top) {
                        if (data.data[i].type === "video") {
                           $("#recentpics").append("<div class='media'><a target='_blank' href='" + data.data[i].link + "'><video controls loop autoplay class='media' src='" + data.data[i].videos.low_resolution.url + "'></video></a></div>");
                        } else { 
                           $("#recentpics").append("<div class='media'><a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url + "'></img></a></div>");
                        }
                     }
                  }
                  // Create items array, sort, slice top three
                  var items = Object.keys(dict).map(function(key) {
                      return [key, dict[key]];
                  });
                  
                  items.sort(function(first, second) {
                      return second[1] - first[1];
                  });

                  items = items.slice(0, 3);

                  console.log("Top photo processing complete" + items);

                  for (var i = 0; i < items.length; i++) {
                     var index = items[i][0];
                     if (data.data[index].type === "video") {
                        $("#topphoto").append("<div class='media'><a target='_blank' href='" + data.data[index].link + "'><video controls loop autoplay class='media' src='" + data.data[index].videos.low_resolution.url + "'></video></a></div>");
                     } else { 
                        $("#topphoto").append("<div class='media'><a target='_blank' href='" + data.data[index].link + "'><img src='" + data.data[index].images.low_resolution.url + "'></img></a></div>");
                     }
                  }
               }
            });
         }
         hasRun = true;
         return null;
         
      }
   })();
