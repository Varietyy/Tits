if (typeof fcs === "undefined") {
	var fcs = {
		"version": "Fucked Yo Bitch",
		"menu_css": "https://rawgit.com/WiBla/FCS/master/ressources/menu.css",
		"ranks_css": "https://rawgit.com/WiBla/FCS/master/ranks/ranks.css",
		"theme_css": "https://rawgit.com/WiBla/FCS/master/ressources/blue.css",
		"smallChat_css": "https://rawgit.com/WiBla/FCS/master/ressources/smallChat.css",
		"settings": {
			"autoVote": true,
			"theme": true,
			"smallChat": true,
			"smallHistory": false,
			"confirmQuit": false,
			"customBGURL": "",
			"onlyShowMention": false
		},
		"room": {
			"name": "",
			"type": "",
			"url": "",
			"background": $(".backstretch img").attr("src"),
			"audience": {
				"admins": [],
				"creator": [],
				"mods": [],
				"users": [],
				"DJ": []
			}
		},
		"user": {
			"settings": {}
		},
		"items": {
			"script": {},
			"dubUp": $(".dubup"),
			"dubDown": $(".dubdown")
		},
		// ##### [Functions] #####
		"log": function(msg, type) {
			if (type === undefined || typeof msg !== "string") return;
			switch(type) {
				case "info":
					msg = '<img class="emoji" src="https://mediadubtrackfm.s3.amazonaws.com/assets/emoji/images/emoji/information_source.png" title=":information_source:" alt=":information_source:" align="absmiddle"></img> ' + msg;
				break;
				case "warn":
					msg = '<img class="emoji" src="https://mediadubtrackfm.s3.amazonaws.com/assets/emoji/images/emoji/warning.png" title=":warning:" alt=":warning:" align="absmiddle"></img> ' + msg;
				break;
				case "error":
					msg = '<img class="emoji" src="https://mediadubtrackfm.s3.amazonaws.com/assets/emoji/images/emoji/bangbang.png" title=":bangbang:" alt=":bangbang:" align="absmiddle"></img> ' + msg;
				break;
				case "broadcast":
					msg = "" + msg;
				break;
			}
			$("#chat .chat-container .chat-main").append($(
				'<li class="fcs-'+type+' user-560f0b496280680300ece34d">\
					<div class="stream-item-content">\
						<div class="chatDelete" onclick="$(this).closest(\'li\').remove();"><span class="icon-close"></span></div>\
						<div class="image_row">\
							<img src="https://api.dubtrack.fm/user/560f0b496280680300ece34d/image" alt="wibla" onclick="Dubtrack.helpers.displayUser(\'560f0b496280680300ece34d\', this);" class="cursor-pointer" onerror="Dubtrack.helpers.image.imageError(this);">\
						</div>\
						<div class="activity-row">\
							<div class="text"><p><a href="#" class="username">♥ </a>'+msg+'</p></div>\
							<div class="meta-info">\
								<span class="username">Chase N. Cashe </span>\
								<i class="icon-dot"></i>\
								<span class="timeinfo">\
									<time class="timeago" datetime="undefined" title="Creator\'s website"><a target="_blank"href="http://wibla.free.fr/FCS/">http://wibla.free.fr</a></time>\
								</span>\
							</div>\
						</div>\
					</div>\
				</li>'));
		},
		/*"chatHandler": function(data) {
			if (data.type == "chat-message") {
				var msg = $(".chat-main li:last p:last")[0].innerHTML.split(" ");
				for (var i = 0; i < msg.length; i++) {
					if (msg[i][0] == ":") {
						switch (msg[i]) {
							case ":facepalm:":
								msg[i] = $('<img src="http://orig04.deviantart.net/2570/f/2008/358/e/7/facepalm_by_kynquinhe.gif" alt="facepalm">')[0];
							break;
						}
						$(".chat-main li:last p:last")[0].innerHTML = msg.join(" ");
					}
				}
			}
		},*/
		"sendChat": function(msg) {
			// Ajax does not let you see your own messages
			if (typeof msg == "string" && msg.length > 0) {
				$("#chat-txt-message").val(msg);
				$(".pusher-chat-widget-send-btn").click();
			}
		},
		"autoComplete": function(txt) {
			txt = txt.split(" ");
			for (var i = 0; i < txt.length; i++) {
				if (txt[i][0] == "$") {
					switch(txt[i]) {
						case "$version":
							txt[i] = fcs.version;
						break;
						
						default:
							console.error("[FCS] Unrecognised variable(s)");
					}
				}
			}
			return txt.join(" ");
		},
		"paintGreen": function(e) {e[0].className = "on";},
		"paintOrange": function(e) {e[0].className = "off";},
		"getTimeRemaining": function() {
			return ($(".min")[0].innerHTML*60) + parseInt($(".sec")[0].innerHTML);
		},
		"getVolume": function() {
			return Math.round(Number($("#volume-div").slider("option", "value")));
		},
		"setVolume": function(x) {
			if (isNaN(x)) return "Argument is NaN !";
			else if (x <= 0) {
				x = 0;
				$("#vol-meter")[0].className = "muted";
			} else if (x > 0 && x < 100) {
				$("#vol-meter").removeClass("muted");
			} else if (x >= 100) {
				x = 100;
			}
			$("#volume-div").slider({value: x});
			$("#vol-meter")[0].innerText = x+"";
		},
		"getAudience": function() {
			var room = {"admins": [],"creator": [],"mods": [],"users": [],"DJ": []};
			for (var i = 0; i < $(".avatar-list li").length; i++) {
				if ($($(".avatar-list li")[i]).hasClass("admin")) room.admins.push($($(".avatar-list li")[i])[0]);
				if ($($(".avatar-list li")[i]).hasClass("creator")) room.creator.push($($(".avatar-list li")[i])[0]);
				if ($($(".avatar-list li")[i]).hasClass("mod")) room.mods.push($($(".avatar-list li")[i])[0]);
				if ($($(".avatar-list li")[i]).hasClass("currentDJ")) room.DJ.push($($(".avatar-list li")[i])[0]);
				room.users.push($($(".avatar-list li")[i])[0]);
			}
			for (var j = 0; j < room.length; j++) {
				console.log(room[j]);
				if (room[j].length === 0 || room[j] === "") room[j] = null;
			}
			fcs.room.audience = room;
			return room;
		},
		"getAdmins": function() {
			fcs.getAudience();
			return fcs.room.audience.admins;
		},
		"getCreator": function() {
			fcs.getAudience();
			return fcs.room.audience.creator;
		},
		"getStaff": function() {
			fcs.getAudience();
			return fcs.room.audience.mods;
		},
		"getDJ": function() {
			fcs.getAudience();
			return fcs.room.audience.DJ;
		},
		"getUsers": function() {
			fcs.getAudience();
			return fcs.room.audience.users;
		},
		"getUser": function() {
			fcs.user = {
				"id": Dubtrack.session.id,
				"name": Dubtrack.session.attributes.username,
				"created": Dubtrack.session.attributes.created,
				"image": "",
				"roleid": Dubtrack.session.attributes.roleid,
				"status": Dubtrack.session.attributes.status,
				"dubs": Dubtrack.session.attributes.dubs,
				"vote": "",
				"locale": Dubtrack.session.attributes.userInfo.locale,
				"playlists": {
					"": ""
				},
				"settings": JSON.parse(localStorage.getItem("fcs-settings"))
			};
			return fcs.user;
		},
		"getUserByName": function(name) {
			$.ajax({
				type: "GET",
				url: "https://api.dubtrack.fm/user/" + name,
				success: function(data) {
					data = data.data; // make things more readable
					return {
						"id": data._id,
						"name": data.username,
						"created": data.created,
						"image": data.image,
						"roleid": data.roleid,
						"status": data.status,
						"dubs": data.dubs,
						"vote": data.vote
					};
				},
				error: function() {return null;}
			});
		},
		"getETA": function() {
			var eta = $(".queue-info")[0].innerText;
			
			// Between two DJ, currentDJ innerHTML is not accessible
			if ($(".currentDJ .username")[0].innerHTML == fcs.getUser().name) return "is DJing";
			else if (eta === "") return null;
			else {
				eta = (eta-1)*4 + Math.round(fcs.getTimeRemaining()/60);
				if (eta < 60) return eta;
				else {
					var h = Math.round(eta/60), m = eta%60;
					return [h, m];
				}
			}
		},
		"scrollSongName": function() {
			var text = $(".currentSong")[0].innerHTML;
			if ($(".currentSong").height() > 17 && $(".currentSong")[0].nodeName == "SPAN") {
				$(".currentSong").replaceWith($("<marquee class='currentSong' scrollamount='3' scrolldelay='70'>"+text+"</marquee>"));
				$(".infoContainer").attr("style", "padding-left: 5px;padding-right: 50px;");
			} else if ($(".currentSong")[0].nodeName == "MARQUEE") {
				$(".currentSong").replaceWith($("<span class='currentSong'>"+text+"</span>"));
			}
		},
			// menu
		"autoVote": function() {
			if (fcs.user.settings.autoVote) {
				if (!fcs.items.dubUp.hasClass("voted") && !fcs.items.dubDown.hasClass("voted")) fcs.items.dubUp[0].click();
			}
		},
		"theme": function(){
			if (fcs.user.settings.theme) {
				$("head").append($("<link id='fcs-theme-css' rel='stylesheet' type='text/css' href='"+fcs.theme_css+"'>"));
			} else {
				$("#fcs-theme-css").remove();
			}
		},
		"smallChat": function(){
			if (fcs.user.settings.smallChat) {
				$("head").append($("<link id='fcs-smallChat-css' rel='stylesheet' type='text/css' href='"+fcs.smallChat_css+"'>"));
			} else {
				$("#fcs-smallChat-css").remove();
			}
		},
		"smallHistory": function(){
			if (fcs.user.settings.smallHistory) {
				$("head").append($("<style id='fcs-smallHistoty-css'>\
					#browser .nano ul li,\
					#browser .nano ul li .description,\
					#browser .nano ul li .description p,\
					#browser .nano ul li .actions span,\
					#browser .nano ul li .actions a\
					{padding: 0 !important; margin: 0 !important;}\
					#browser .nano ul li figure,\
					#browser .nano ul li figure img\
					{display: none !important;}\
					#browser .nano ul li .actions a,\
					#browser .nano ul li .actions span\
					{width: 30px; height: 30px;}\
					#browser .nano ul li .description h2 {margin: 0 0 0 45px !important;}\
					#browser .nano ul li .description b {font-weight: normal !important; color: hsl(20080%,50%);}\
					#browser .nano ul li .actions {top: 5px !important;}\
					#browser .nano ul li .actions a {color: transparent !important;}\
					#browser .nano ul li .actions span {margin: 0px !important;}\
					#browser .nano ul li .actions span:before {color: #aaa !important;}\
					#browser .nano ul li .timeDisplay {top: 0 !important; bottom: auto !important;}\
				</style>"));
			} else {
				$("#fcs-smallHistoty-css").remove();
			}
		},
		"importPlaylists": function(){
			// Playlist Import init
			var i,
				key,
				keys,
				PL = {},
				f = $("#importPlaylists")[0];
			
			function importPL(obj) {
				key = 0;
				while (key < PL.playlists[keys[i]].length) {
					type = PL.playlists[keys[i]][key].type === 1 ? "youtube" : "soundcloud"; 
					if (key < PL.playlists[keys[i]].length - 1)
						$.post("https://api.dubtrack.fm/playlist/" + obj.data._id + "/songs",{fkid: PL.playlists[keys[i]][key].id, type: type});
					else
						$.post("https://api.dubtrack.fm/playlist/" + obj.data._id + "/songs",{fkid: PL.playlists[keys[i]][key].id, type: type}, pLFinished);
					key++;
				}
			}
			
			function pLFinished() {
				i++;
				if (i === keys.length) {
					fcs.log("Finished Playlists's import !", "log");
					return false;
				} else {
					fcs.log("Starting import of: \"" + keys[i] + "\".", "log");
					$.post("https://api.dubtrack.fm/playlist/",{name: keys[i]} , importPL);
				}
			}
			
			f.onchange = function() {
				var file = f.files[0],
				    fr = new FileReader();
				
				fr.onerror = function() {fcs.log("An error occured, please try again.", "error");};
				fr.onload = function() {
					fcs.log("File successfuly loaded, initiating import...", "info");
					// Is the file a text file ?
					if (typeof fr.result !== "string") {
						fcs.log("Choose a correct JSON file. Aborting import.", "error");
					} // Is the file JSON compatible ?
					else try {JSON.parse(fr.result);} catch(e) {return fcs.log("File is not JSON compatible. Aborting import.", "error");}
					
					PL = JSON.parse(fr.result);
					// Is the file PYE compatible ?
					if ((PL.is_plugdj_playlist === true)){
							i = 0;
							keys = Object.keys(PL.playlists);
							fcs.log("Starting import of: \"" + keys[i] + "\".", "info");
							$.post("https://api.dubtrack.fm/playlist/", {name: keys[i]}, importPL);
					} else {
						fcs.log("File is not PYE compatible. Aborting import.", "error");
						fcs.log("Other files will be supported in the near futur.", "info");
					}
				};
				fr.readAsText(file);
			};
		},
		"changeBG": function(){
			// There is room for improvement (customize the prompt, avoid code repetition..)
			// If the host change the default BG while the user is connected, it does not update fcs.room.background
			var URL = prompt('URL of the wanted image:\n(Type "default" to reset room\'s background, "none" to have nothing)');
			if (URL !== null && URL !== "") {
				URL.toLowerCase();
				if (URL == "default") {
					$(".backstretch img").attr("src", fcs.room.background);
					fcs.paintOrange($("#changeBG"));
				}
				else if (URL == "none") {
					$(".backstretch img").attr("src", "");
					fcs.paintGreen($("#changeBG"));
				}
				else {
					$(".backstretch img").attr("src", URL);
					fcs.paintGreen($("#changeBG"));
					fcs.user.settings.customBGURL = URL;
				}
			}
		},
		"confirmQuit": function() {
			if (fcs.user.settings.confirmQuit) {
				window.onbeforeunload = function(){
					return "Are you sure you want to quit ?";
				};
			} else window.onbeforeunload = "";
		},
		"reload": function() {
			if (fcs.kill() === "done") {
				setTimeout(function(){$.getScript("https://rawgit.com/Varietyy/Tits/master/script.js");}, 1000);
			}
		},
		"kill": function() {
			if (init(true)) {fcs=undefined; return "done";}
			else fcs.log("Could not reload/shutdown"); console.log("[FCS] Could not reload/shutdown");
		}
	};
	
	init();
} else fcs.reload();

function init(kill) {
	if (!kill) {
		// Initating custom css
		$("head").append($("<link id='fcs-css' rel='stylesheet' type='text/css' href='"+fcs.menu_css+"'>"));
		$("head").append($("<link id='fcs-ranks' rel='stylesheet' type='text/css' href='"+fcs.ranks_css+"'>"));
		// Creating script's core elements
		$("#header-global .user-info ul > li.user-messages").before(
		$('<li id="fcs-logo">\
				<button id="fcs-button">Mr. Steal Your Bitch</button>\
				<ul id="fcs-menu" style="display: none;">\
					<li class="off" id="autoVote">Auto-Vote</li>\
					<li class="off" id="theme">Theme</li>\
					<li class="off" id="smallChat">Small chat</li>\
					<li class="off" id="smallHistory">Small history</li>\
					<li id="changeBG">Change Background</li>\
					<input id="importPlaylists" type="file">\
					<li class="off" id="importPlaylists">Import Playlist</li>\
					<li class="off" id="confirmQuit">Confirm on quit</li>\
					<li id="reload">Reload</li>\
					<li id="kill">Shutdown</li>\
					<li id="undefined">'+fcs.version+'</li>\
				</ul>\
			</li>'));
		// Creating other defaults elements
		//$(".chat_tools .chatSound").after($("<a href='#' id='mentionOnly'>@</a>"));
		$("#volume-div").after($('<span id="vol-meter">0</span>'));
		// Initating script's element as they cannot be reached until created
		fcs.items.script = {
			"logo": $("#fcs-logo"),
			"menu": $("#fcs-menu"),
			"fcs-css": $("#fcs-css"),
			"ranks-css": $("#fcs-ranks"),
			"theme-css": $("#fcs-theme-css"),
			"smallChat-css": $("#fcs-smallChat-css"),
			"@": $("#mentionOnly"),
			"volume-meter": $("#vol-meter")
		};
		// Getting settings
		if (!localStorage.getItem("fcs-settings")) {
			localStorage.setItem("fcs-settings", JSON.stringify(fcs.settings));
			fcs.user.settings = fcs.settings;
		} else {
			fcs.user.settings = JSON.parse(localStorage.getItem("fcs-settings"));
			var i=0,j=0;
			for (var key in fcs.settings) {
				i++;
				for (var key2 in fcs.user.settings) {
					j++;
				}
				if (i > j) {
					fcs.user.settings[key2] = fcs.settings[key2];
				}
			}
		}
		// Setting the items as they should be (active or inactive)
		$.each($("#fcs-menu li"), function(i, elm){
			if (fcs.user.settings[elm.id]) {
				fcs.paintGreen($("#" + elm.id));
				fcs[elm.id]();
			}
		});
		if (fcs.user.settings.customBGURL !== "") {
			$(".backstretch img").attr("src", fcs.user.settings.customBGURL);
			fcs.paintGreen($("#changeBG"));
		}
		// ##### [Event Handlers] #####
		// menu's slide
		$("#fcs-logo").on("click", "button", function(){
			var menu = fcs.items.script.menu[0];
			if (menu.style.display === "none") {
				menu.style.display = "block";
			} else {
				menu.style.display = "none";
			}
		});
		// menu's selection
		$("#fcs-menu").on("click", "li", function(){
			var settings = fcs.user.settings;
			switch($(this)[0].id) {
				case "autoVote":
					settings.autoVote = !settings.autoVote;
					if (settings.autoVote) fcs.paintGreen($(this));
					else fcs.paintOrange($(this));
					fcs.autoVote();
				break;
				case "theme":
					settings.theme = !settings.theme;
					if (settings.theme) fcs.paintGreen($(this));
					else fcs.paintOrange($(this));
					fcs.theme();
				break;
				case "smallChat":
					settings.smallChat = !settings.smallChat;
					if (settings.smallChat) fcs.paintGreen($(this));
					else fcs.paintOrange($(this));
					fcs.smallChat();
				break;
				case "smallHistory":
					settings.smallHistory = !settings.smallHistory;
					if (settings.smallHistory) fcs.paintGreen($(this));
					else fcs.paintOrange($(this));
					fcs.smallHistory();
				break;
				case "changeBG":fcs.changeBG();break;
				case "importPlaylists":fcs.confirmQuit();break;
				case "confirmQuit":
					settings.confirmQuit = !settings.confirmQuit;
					if (settings.confirmQuit) fcs.paintGreen($(this));
					else fcs.paintOrange($(this));
					fcs.confirmQuit();
				break;
				case "reload":fcs.reload();break;
				case "kill":fcs.kill();break;
				case "undefined":break;
				
				default: console.error("[FCS] unrecognised menu item: " + $(this)[0].id);
			}
			localStorage.setItem("fcs-settings", JSON.stringify(settings));
		});
		$("#mentionOnly").on("click", function() {
			fcs.user.settings.onlyShowMention = !fcs.user.settings.onlyShowMention;
			if (fcs.user.settings.onlyShowMention) {
				$("#mentionOnly")[0].style.color = "#fff";
				$("head").append($('<style id="fcs-mention-only" type="text/css">\
						#chat .chat-container ul li {display: none !important;}\
						#chat .chat-container ul li[style="box-shadow: rgb(255, 0, 255) -4px 0px 0px 0px inset;"] {display: block !important;}\
					</style>'));
			} else {
				$("#mentionOnly")[0].style.color = "#aaa";
				$("#fcs-mention-only").remove();
			}
		});
		$("#vol-meter").on("click", function(){
			if (fcs.getVolume() !== 0) fcs.settings.volume = fcs.getVolume();
			$("#vol-meter").toggleClass("muted");
			if ($("#vol-meter").hasClass("muted")) fcs.setVolume(0);
			else fcs.setVolume(fcs.settings.volume);
		});
		//Dubtrack.Events.on("realtime:chat-message", fcs.chatHandler);
		Dubtrack.Events.on("realtime:room_playlist-update", fcs.autoVote);
		Dubtrack.Events.on("realtime:room_playlist-update", fcs.scrollSongName);
		fcs.getUser(); fcs.importPlaylists(); fcs.scrollSongName(); fcs.setVolume(fcs.getVolume());
		window.onresize = fcs.scrollSongName; // auto-update if songName should scroll or not
		$(".volume, .left_section").bind("mousewheel", function(e){
			if (e.originalEvent.wheelDelta > 0) fcs.setVolume(fcs.getVolume() + 5);
			else fcs.setVolume(fcs.getVolume() - 5);
		});
		$(".volume").on("mouseup, mousemove", function(){fcs.setVolume(fcs.getVolume());});
		fcs.log(fcs.autoComplete("$version loaded !"), "log");
	} else {
		// Saving settings
		localStorage.setItem("fcs-settings", JSON.stringify(fcs.user.settings)); // Just in case something has gone wrong
		// inversing functions (if a function changes the DOM, invert-it to get the more basic dubtrack.fm possible)
		// Removing elements
		for (var item in fcs.items.script) {
			if (typeof fcs.items.script[item][0] !== "undefined") fcs.items.script[item].remove();
		}
		// Unbinding Event Handlers
		Dubtrack.Events.off();
		$("#fcs-logo").off();
		$("#fcs-menu").off();
		$(".chat-main").off();
		window.onbeforeunload = "";
		// And finaly 
		fcs.log("Script Reloading!", "log"); console.log("[FCS] Aurevoir !");
		return true; // needed in case of reload
	}
}
