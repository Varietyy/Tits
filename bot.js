// Name and Version
var NAME = "2BotShakur";
var VERSION = "v1";

// Plug.DJ Ported API for Dubtrack.FM
API = {
	getDJ: function() {
		var tempString=$(".currentDJSong")[0].innerHTML;
		var DJ=tempString.slice(0,tempString.length-11);
		return DJ;
	},
	chatLog: function(String){
		Dubtrack.room.chat._messagesEl.append("<li class='chat-system-loading system-error'>" + String + "</li>");
		document.getElementsByClassName("chat-main")[0].scrollIntoView(false);
	}, //MikuPlugin
	sendChat: function(String){
		$("#chat-txt-message").val(String);
		Dubtrack.room.chat.sendMessage();
	}, // MikuPlugin
	setVolume: function(Value){
		Dubtrack.playerController.setVolume(Value);
	},
	CHAT: "realtime:chat-message",
	ADVANCE: "realtime:room_playlist-update",
	USER_JOIN: "realtime:user-join",
	USER_LEAVE: "realtime:user-leave",
	on: function(Event, Function){
		Dubtrack.Events.bind(Event, Function);
	},
	off: function(Event, Function){
		Dubtrack.Events.unbind(Event, Function);
	}
};

// Custom stuff
IBot = {
	iBot: NAME + " " + VERSION,
	Tools: {
		lookForUser: function(String) {
			var found = false;
			for(var i = 0; i < $(".username").length; i++) {
				if(String.toLowerCase() == $(".username")[i].innerHTML.toLowerCase()) {
					found = true;
				}
			}
			if(found) {
				return true;
			} else {
				return false;
			}
		},
		getUsers: function() {
			var users = "";
			for(var i = 0; i < $(".username").length; i++) {
				if(!users.includes($(".username")[i].innerHTML) && $(".username")[i].innerHTML != undefined) {
					users += "@" + $(".username")[i].innerHTML + " ";
				}
			}
			return users;
		}
	}
};

function userJoinMsg(data) {
	API.sendChat("Welcome @" + data.user.username + "!");
}

function userLeaveMsg() {
	// API.sendChat("Goodbye @" + data.user.username + "!");
}

function commandHandler(data) {
	var msg = data.message;
	
	if(msg.startsWith("!")) {
		if(msg === "!help") {
			API.sendChat(IBot.iBot + " user commands: help, cookie @{User}, dj, list, autodubup");
		}
		if(msg.startsWith("!cookie")) {
			var UN = msg.substring(9);
			if(UN != "") {
				if(IBot.Tools.lookForUser(UN)) {
					API.sendChat(":cookie: hands @" + UN + " a cookie, a note on it reads 'Watch out lil bitch' from @" + data.user.username + " :cookie:");
				} else {
					API.sendChat(":x: User not found! :x:");
				}
			} else {
				API.sendChat(":cookie: hands you a cookie (for @" + data.user.username + ") :cookie:");
			}
		}
		if(msg === "!dj") {
			API.sendChat("Current DJ: @" + API.getDJ() + "!");
		}
		if(msg === "!list") {
			API.sendChat("Users 'found': " + IBot.Tools.getUsers());
		}
		if(msg === "!autodubup") {
			API.sendChat(":P");
		}
	}
}

/*function nextSongMsg() {
	API.sendChat(":musical_note: Now playing: " + $(".currentSong").text() + "! DJ: " + API.getDJ() + ":musical_note:");
}*/

function connectAPI() {
	API.on(API.CHAT, commandHandler);
	API.on(API.USER_JOIN, userJoinMsg);
	API.on(API.USER_LEAVE, userLeaveMsg);
	API.on(API.ADVANCE, nextSongMsg);
}

// Just like iWoot, CONNECT EVERYTHING!
function startUp() {
	connectAPI();
	API.sendChat(IBot.iBot + " running <3");
}

startUp();
