exports.main = function() {};

var data = require("sdk/self").data;

var userPreferences = new Object();

userPreferences.enabled = require("sdk/simple-prefs").prefs.Enabled;
userPreferences.threadFilterType = require("sdk/simple-prefs").prefs.ThreadFilterType;
userPreferences.postFilterType = require("sdk/simple-prefs").prefs.PostFilterType;
userPreferences.blacklist = sanitizeInputList(require("sdk/simple-prefs").prefs.Blacklist);
userPreferences.whitelist = sanitizeInputList(require("sdk/simple-prefs").prefs.Whitelist);
userPreferences.hideThreadsUnderXPosts = require("sdk/simple-prefs").prefs.HideThreadsUnderXPosts;

//Need to sanitize blacklist and whitelist
function onPrefChange(prefName)
{
    if (prefName == "Enabled")
    {
        userPreferences.enabled = require("sdk/simple-prefs").prefs.Enabled;
    }
    
    if (prefName == "ThreadFilterType")
    {
        userPreferences.threadFilterType = require("sdk/simple-prefs").prefs.ThreadFilterType;
    }
    if (prefName == "PostFilterType")
    {
        userPreferences.postFilterType = require("sdk/simple-prefs").prefs.PostFilterType;
    }
    if (prefName == "Blacklist")
    {
        userPreferences.blacklist = sanitizeInputList(require("sdk/simple-prefs").prefs.Blacklist);
    }
    if (prefName == "Whitelist")
    {
        userPreferences.whitelist = sanitizeInputList(require("sdk/simple-prefs").prefs.Whitelist);
    }
    if (prefName == "HideThreadsUnderXPosts")
    {
        userPreferences.hideThreadsUnderXPosts = require("sdk/simple-prefs").prefs.HideThreadsUnderXPosts;
    }
}

require("sdk/simple-prefs").on("", onPrefChange);

//Usernames cannot contain & > < ; or @
//If any part of the input contains an invalid character, the inputList will be empty
function sanitizeInputList(inputList)
{
    var re = new RegExp("[&><;@]+");
    if(inputList.match(re))
    {
        //The id is invalid
        return "";
    }
    else
    {
        return inputList;
    }
}

var pageMod = require("sdk/page-mod");
pageMod.PageMod({
    include: '*.corner.bigblueinteractive.com',
    contentScriptFile: [data.url("jquery-1.9.1.min.js"),
                      data.url("bbi-control.js")],
    onAttach: function(worker) {
    worker.port.emit("bbi-modify", userPreferences);
    
    worker.port.on("bbi-control", function(elementContent) {
      console.log(elementContent);
    });
  }
});