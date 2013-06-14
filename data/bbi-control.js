self.port.on("bbi-modify", function(userPreferences)
{
    //Note that user names can contain leading and ending spaces so that is why the blacklist/whitelist(s) are not trimmed.
    if (userPreferences.enabled == true)
    {
        var url = window.location.href;
        var is_thread = url.indexOf("thread");

        if (is_thread != -1)
        {
            $('.thread_post').each(function(i, obj)
            {
                var post = $(this);
                //userName has an extra space at the beginning and the end
                var userName = $(post).find("a:first").html();
                userName = userName.substr(1, userName.length-2);
                
                if (userPreferences.postFilterType == "B")
                {
                    var blacklist = userPreferences.blacklist;
          
                    $.each(blacklist.split(","), function(index, item)
                    {
                        if (userName === item)
                        {
                            $(post).hide();
                            return false;
                        }
                    });
                }
                else if (userPreferences.postFilterType == "W")
                {
                    var whitelist = userPreferences.whitelist;
                    var whitelisted = false;
                    $.each(whitelist.split(","), function(index, item)
                    {
                        if (userName === item)
                        {
                            whitelisted = true;
                            return false;
                        }
                    });
                    if (!whitelisted)
                    {
                        $(post).hide();
                    }
                }  
            });
        }
        else
        {
            $('.forumline').each(function(i, obj)
            {
                var thread = $(this);
                var userNameHTML = $(thread).children("td:nth-child(2)").html();
                var userName = userNameHTML.split("<br>")[0];
          
                if (userPreferences.threadFilterType == "B")
                {
                    var blacklist = userPreferences.blacklist;
            
                    $.each(blacklist.split(","), function(index, item)
                    {
                        if (userName == item)
                        {
                            $(thread).hide();
                        }
                    });
                }
                else if (userPreferences.threadFilterType == "W")
                {
                    var whitelist = userPreferences.whitelist;
                    var whitelisted = false;
                    $.each(whitelist.split(","), function(index, item)
                    {
                        if (userName == item)
                        {
                            whitelisted = true;
                            return false;
                        }
                    });
                    if (!whitelisted)
                    {
                        $(thread).hide();
                    }
                }
        
                if (userPreferences.hideThreadsUnderXPosts > 0)
                {
                    var minPostsRequired = userPreferences.hideThreadsUnderXPosts;
                    var numPosts = $(thread).children("td:nth-child(4)").html();
                    if (numPosts < minPostsRequired)
                    {
                        $(thread).hide();
                    }
                }
            });
        }
    }  //end if (userPreferences.enabled == true)
});