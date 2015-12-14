$(document).ready(function(){
$(".player_container").remove();

//Config-Menu
/*$("body").prepend('<link rel="stylesheet" type="text/css" href="https://rawgit.com/Cr4fTeXe/Dubtrack-YT-Playlist-Importer/master/yt-importer.css">');
$(".header-right-navigation").append($('<div class="yt-import"><img src="http://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Settings-2-icon.png" alt="import"></div>'));
$("body").append($('<div class="import-input"><div class="import-inner"><span class="importer-title">Chat-Bot "Hero" by Cr4fTeXe</span></br>Work in Progress</div></div>'));
*/

var i = 0, mehskipx = 0, skip = 0, skipuser = 0, uservotes = 0, autoCounter = 0,  currentUser = "", votedisabled = true, inAutoQueue = false, commandoption = "";

//Functions
function getChatMessage(msg){
	var amsg = msg;
	var user = amsg.children().children(".username").html();
	var amsghtml = amsg.html(); //Message
	amsghtml = amsghtml.replace("<p>","");
	amsghtml = amsghtml.replace("</p>"," ");
	amsghtml = amsghtml.replace('<a href="#" class="username">'+user+'</a>', '');
	//console.log(amsghtml);
	return amsghtml;
	}
function getChatUser(user){
	var user = user;
	if(user.children().children(".username").html()){
		currentUser = user.children().children(".username").html();
		return user.children().children(".username").html();
	}else{ return currentUser; }
	}
function getCommandOptions(message){
	var msg = message;
	var msgarray = msg.split(" ");
	$.each(msgarray, function(index, value){
		var fierst = value.charAt(0);
		var laest = value.slice(-1);
		if(fierst == "[" && laest == "]"){
			commandoption = value.replace("[", "");
			commandoption = commandoption.replace("]", "");
			return commandoption;
		}
	})
	//console.log(commandoption);
	}
function getTotalUser(){ return $(".room-user-counter").html(); }
function postMsg(msg){
	var message = msg;
	$("#chat-txt-message").val(message);
	var e = $.Event("keydown");
	e.which = 13;
	$("#chat-txt-message").trigger(e);
	}
function sayhello(u){
	var user = u;
	var chatmsg = "Yo "+user+"!";
	postMsg(chatmsg);
	}
function welcome(u){
	var user = u;
	var chatmsg = "Welcome back "+user+"!";
	postMsg(chatmsg);
	}
function ping(){
	var chatmsg = "Pong!";
	postMsg(chatmsg);
	}
function yolo(){
	var chatmsg = "Swag";
	postMsg(chatmsg);
	}
function fb(){
	var chatmsg = "/me | Bitch, where?";
	postMsg(chatmsg);
	}
function lastfm(){
	var chatmsg = "/me | NA";
	postMsg(chatmsg);
	}
function website(){
	var chatmsg = "/me | Fuck a website.";
	postMsg(chatmsg);
	}
	function rules(){
	var chatmsg = "/me | Fuck rules.";
	postMsg(chatmsg);
	}
function dubx(){postMsg("Make sure to use the DubX-Extension and to activate the Community-Theme option. Get the extension here: https://dubx.net/");}
function skipvideo(vote){
	var vot = vote;
	$(".skip-el").trigger("click");fb
	if(vot = "vote"){ postMsg("Successful Vote. Video skipped!"); }
	}
function votedisabledfalse(){ votedisabled = false;}
function voteskip(act){
	if(act == "start" && votedisabled == false){
		skipuser = getTotalUser();
		skipuser = parseInt(skipuser);
		postMsg('Voteskip started! Type "!voteyes" or "!voteno".');
	}else{
		if(act == "end"){
			if(skip > 0){ uservotes = 0; skip = 0; skipuser = 0; votedisabled = true; skipvideo("vote");}else{ uservotes = 0; skip = 0; skipuser = 0; votedisabled = true; postMsg("Vote failed!");}
		}else{
			if(act == "yes" && votedisabled == false){
				var alle = getTotalUser();
				skip++; uservotes++;
				postMsg(uservotes+" out of "+alle+" voted.");
			}else{
				if(act == "no" && votedisabled == false){
					skip--; uservotes++;
					var alle = getTotalUser();
					postMsg(uservotes+" out of "+alle+" voted.");
				}else{ console.log("No Vote-Action"); }
			}
		}
	}
	}
function mehskip(){
	var woot = $('.dubup > .dub-counter').html();
	var meh = $('.dubdown > .dub-counter').html();
	if(meh > woot && meh > 1 && mehskipx==0){mehskipx = 1; postMsg("Enough DubDowns. Video will be skipped!"); $(".skip-el").trigger("click"); mehskipx = 0;}else{}
	}
function love(){postMsg(":heart: Love is in the Air :heart:");}
function hardwareinfo(){postMsg("This bot runs on the Raspberry Pi of Cr4fTeXe.");}
function joinQueue(){ $(".play-song-link").trigger("click"); setTimeout(function(){$(".close-browser").trigger("click");},2000); }
function pauseQueue(){ $(".display-browser").trigger("click"); setTimeout(function(){$(".pause-queue").trigger("click");},5000); setTimeout(function(){$(".close-browser").trigger("click");},1000) }
function resumeQueue(){ $(".display-browser").trigger("click"); setTimeout(function(){$(".pause-queue").trigger("click");},5000); setTimeout(function(){$(".close-browser").trigger("click");},1000) }
function queuePlaylist(){ $(".display-browser").trigger("click"); setTimeout(function(){$(".playlist-564f9473bd566d23009ab305").trigger("click");},1000); setTimeout(function(){$(".queue-playlist").trigger("click");},500); setTimeout(function(){$(".close-browser").trigger("click");},5000); }
function tooLong(){
	var mins = $(".min").html();
	var status = true;
	mins.replace('"', '');
	mins = parseInt(mins);
	if(mins > 7 && status == true){
		skip();
		postMsg("Video skipped, because it was too long!");
		status = false;
	}else{ postMsg("Video is less than 7 minutes, so it won't be skipped!"); }
	}
function autoJoinQueue(){ var total = getTotalUser();  if(total < 5){inAutoQueue = true;}else{inAutoQueue = false;}}
function getRandomGIF(){ var gifurl = $.getJSON("https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC"); return gifurl; }
function getTagGIF(t){ var tag = t; tag = tag.replace(" ", "+");var url = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+tag; var gifurl = $.getJSON(url); return gifurl; }


/*$('ul.chat-main').on('DOMNodeInserted', function(){
	var now = new Date();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	var timenow = hours + " " + minutes + " " + seconds;
	console.log($(this).attr('class'));
	console.log(timenow);
	console.log("----------------------------------");
})*/
document.addEventListener('DOMNodeInserted', function (evt) { console.log(evt.target + ' inserted under parent ' + evt.relatedNode); }, false);

//Command-Input
$('body').on('DOMNodeInserted', 'div.text', function(){

	/*autoJoinQueue();
	if(inAutoQueue == true && i == 0){ joinQueue(); i++;}*/

	var msg = getChatMessage($(this)), user = getChatUser($(this)), now = new Date($.now());

	//console.log(user);
	if(user != "hero" && user != "cyberpixlcraft"){

	//Commands + function-calls
	var msgoption = getCommandOptions(msg);
		if(msg.search('cya') >= 0){ postMsg('http://i.imgur.com/WUw1kHB.gif'); }
		if(msg.search('back') >= 0){ welcome(user); }
		if(msg.search('!love') >= 0 || msg.search('love') >= 0 || msg.search(':heart:') >= 0 || msg.search('<3') >= 0){ love(); }
		if(msg.search('!racist') >= 0 || msg.search('nigger') >= 0 || msg.search('niggur') >= 0 || msg.search('neger') >= 0 || msg.search('melon') >= 0 || msg.search('kfc') >= 0){ postMsg('https://i.ytimg.com/vi/3AzfIhs2-zo/hqdefault.jpg'); }

		//if(msg.search('!') >=0){
			if(msg.search('!search') >= 0 && commandoption.length > 0){ postMsg("https://en.wikipedia.org/wiki/"+commandoption); }
			if(msg.search('!rules') >= 0){ postMsg("Read the rules on our website: http://upcomingrecords.com/rules/");}
			if(msg.search('!tooLong') >= 0){ tooLong();}
			if(msg.search('!time') >= 0){ postMsg(now);}
			if(msg.search('!fuckyou') >= 0){ postMsg("http://i.imgur.com/dMDdQOI.gif");}
			if(msg.search('!dealwithit') >= 0){ postMsg("http://i.imgur.com/KtIcXyL.gif");}
			if(msg.search('!rub') >= 0){ postMsg("http://static2.fjcdn.com/thumbnails/comments/5082699+_057afdd878601db2f01dbfc4fd6b3872.gif");}
			if(msg.search('!gachimuchi') >= 0){ postMsg("http://booru.ehkzai.com/index.php?q=/image/6665.gif");}
			if(msg.search('!hardwareinfo') >= 0){ hardwareinfo(); }
			if(msg.search('!hello') >= 0 && commandoption == "1"){ sayhello(user); }
			if(msg.search('!hello') >= 0 && commandoption == "2"){ postMsg("Welcome to the UpcomingRecords Community :D"); }
			if(msg.search('!bye') >= 0 ){ postMsg("See you later, Adios, Auf Wiedersehen, Au Revoir, Ciao, Tot ziens, Adjö, Farvel, Poka, Sayōnara, Namaste, Alweda, Näkemiin"); }
			if(msg.search('!yolo') >= 0){ yolo(); }
			if(msg.search('!ping') >= 0){ ping(); }
			if(msg.search('!fb') >= 0){ fb(); }
			if(msg.search('!dubx') >= 0){ dubx(); }
			if(msg.search('!rave') >= 0){ postMsg("http://i.imgur.com/Rxv5Qnu.gif");}
			if(msg.search('!1738') >= 0){ postMsg("I'm like: Hey, what's up, hello.");}
			if(msg.search('!voteskip') >= 0 && staff == true){ votedisabledfalse(); voteskip("start"); } //Immer noch verbuggt
			if(msg.search('!voteyes') >= 0){ voteskip("yes"); }
			if(msg.search('!voteno') >= 0){ voteskip("no"); }
			if(msg.search('!skip') >= 0 && staff == true){ skipvideo(); }
			if(msg.search('!shutdown') >= 0 && staff == true && (user == "Cr4ftexe" || user == "1337")){ window.close(); }
			if(msg.search('!queuePlaylist') >= 0 && staff == true && user == "Cr4ftexe"){ queuePlaylist(); }
			if(msg.search('!joinQueue') >= 0 && staff == true){ joinQueue(); }
			if(msg.search('!pauseQueue') >= 0 && staff == true){ pauseQueue(); }
			if(msg.search('!resumeQueue') >= 0 && staff == true){ resumeQueue(); }
			if(msg.search('!commands') >= 0 || msg.search('!help') >= 0){ postMsg("No commands to display yet!"); }
	//	} //end of ! check

	} //end of bot user check
	});//end of commands function

//BEGINNING OF AUTO FUNCTION
setInterval(function auto() {
	//console.log(autoCounter);
	if(autoCounter >= 5) {autoCounter = 0;}
	if(autoCounter == 4) {rules();}
	if(autoCounter == 3) {lastfm();}
	if(autoCounter == 2) {website();}
	if(autoCounter == 1) {fb();}
	autoCounter = autoCounter + 1;
}, 1000 * 60 * 42);
//END OF AUTO FUNCTION

//MEHSKIP
setInterval(function(){ mehskip();}, 4200);
//END MEHSKIP
console.log("VBot succesfully loaded! V42.420.1337.14");

});
