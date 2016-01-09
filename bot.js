var isIBotRunning;

if(!isIBotRunning) {
	// Name and Version
	var NAME = "2Bot";
	var VERSION = "v2";

	// Plug.DJ Ported API for Dubtrack.FM
	API = {
		getDJ: function() {
			return Dubtrack.room.player.activeSong.attributes.user.attributes.username;
		},
		getMedia: function() {
			return Dubtrack.room.player.activeSong.attributes.songInfo.name;
		},
		getRole: function(User) {
			if(User.attributes.roleid != null) {
				if(User.attributes.roleid.type == "dj") {
					return "(Resident?) DJ";
				}
				if(User.attributes.roleid.type == "vip") {
					return "VIP";
				}
				if(User.attributes.roleid.type == "mod") {
					return "Moderator";
				}
				if(User.attributes.roleid.type == "manager") {
					return "Manager";
				}
				if(User.attributes.roleid.type == "co-owner") {
					return "Co-Owner (or Owner)";
				}
			} else {
				return "Role not found! (Most likely means default user)";
			}
		},
		chatLog: function(String) {
			Dubtrack.room.chat._messagesEl.append("<li class='chat-system-loading system-error'>" + String + "</li>");
			document.getElementsByClassName("chat-main")[0].scrollIntoView(false);
		}, //MikuPlugin
		sendChat: function(String) {
			Dubtrack.room.chat._messageInputEl.val(String);
			Dubtrack.room.chat.sendMessage();
		}, // MikuPlugin
		setVolume: function(Value) {
			Dubtrack.playerController.setVolume(Value);
		},
		CHAT: "realtime:chat-message",
		ADVANCE: "realtime:room_playlist-update",
		USER_JOIN: "realtime:user-join",
		USER_LEAVE: "realtime:user-leave",
		on: function(Event, Function) {
			Dubtrack.Events.bind(Event, Function);
		},
		off: function(Event, Function) {
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
		API.sendChat(":wave: @" + data.user.username + ".");
	}

	function userLeaveMsg() {
		// API.sendChat(":wave: Goodbye @" + data.user.username + "! :wave:");
	}

	function commandHandler(data) {
		var msg = data.message;
		var user = data.user.username;
		var userId = data.user._id;
	
		if(msg.startsWith("!")) {
			if(msg === "!help") {
				API.sendChat(IBot.iBot + " user commands: !help, !cookie @user, !dj, !song, !list, !bops");
			}
			if(msg.startsWith("!cookie")) {
				var UN = msg.substring(9);
				if(UN != "") {
					if(IBot.Tools.lookForUser(UN)) {
						API.sendChat(":cookie: *hands @" + UN + " a cookie, a note on it reads 'With love, from @" + user + "'* :cookie:");
					} else {
						API.sendChat(":x: User not found! :x:");
					}
				} else {
					API.sendChat(":cookie: *hands you a cookie (for @" + user + ")* :cookie:");
				}
			}
			if(msg === "!dj") {
				API.sendChat("Current DJ: @" + API.getDJ() + "!");
			}
			if(msg === "!bops") {
			        API.sendChat(":sparkles: " + data.user.username + " just gave bops to @" + API.getDJ() + " :sparkles:");
		        }
			if(msg === "!list") {
				API.sendChat("Users 'found': " + IBot.Tools.getUsers());
			}
		}
	}

	/*function nextSongMsg() {
		API.sendChat(":musical_note: Now playing: " + API.getMedia() + "! DJ: " + API.getDJ() + ":musical_note:");
	}*/

	function connectAPI() {
		API.on(API.CHAT, commandHandler);
		API.on(API.USER_JOIN, userJoinMsg);
		API.on(API.USER_LEAVE, userLeaveMsg);
		/*
		* Leaving commented until I can fix the double sending problem
		* API.on(API.ADVANCE, nextSongMsg);
		*/
	}

	// Connect everything on to start up correctly
	function startUp() {
		connectAPI();
		document.getElementById("chat-txt-message").maxLength = 99999999999999999999;
		isIBotRunning = true;
		API.sendChat(IBot.iBot + " Started!");
	}

	startUp();
} else {
	Dubtrack.helpers.displayError("Error!", "Bot is already running!");
}
