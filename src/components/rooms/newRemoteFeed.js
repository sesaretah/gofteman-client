import Janus from "../../janus.js";
export function newRemoteFeed(dom, janus, opaqueId, myroom, mypvtid ,id, feeds,display, audio, video) {
	// A new feed has been published, create a new plugin handle and attach to it as a subscriber
  var remoteFeed = null;
	janus.attach(
		{
			plugin: "janus.plugin.videoroom",
			opaqueId: opaqueId,
			success: function(pluginHandle) {
				remoteFeed = pluginHandle;
				remoteFeed.simulcastStarted = false;
				Janus.log("Plugin attached! (" + remoteFeed.getPlugin() + ", id=" + remoteFeed.getId() + ")");
				Janus.log("  -- This is a subscriber");
				// We wait for the plugin to send us an offer
				var subscribe = {
					request: "join",
					room: myroom,
					ptype: "subscriber",
					feed: id,
					private_id: mypvtid
				};
				// In case you don't want to receive audio, video or data, even if the
				// publisher is sending them, set the 'offer_audio', 'offer_video' or
				// 'offer_data' properties to false (they're true by default), e.g.:
				// 		subscribe["offer_video"] = false;
				// For example, if the publisher is VP8 and this is Safari, let's avoid video
				if(Janus.webRTCAdapter.browserDetails.browser === "safari" &&
						(video === "vp9" || (video === "vp8" && !Janus.safariVp8))) {
					if(video)
						video = video.toUpperCase()
					console.log("Publisher is using " + video + ", but Safari doesn't support it: disabling video");
					subscribe["offer_video"] = false;
				}
				remoteFeed.videoCodec = video;
        remoteFeed.send({ message: subscribe });
        //console.log(subscribe)
        //console.log(remoteFeed)
			},
			error: function(error) {
				Janus.error("  -- Error attaching plugin...", error);
				window.alert("Error attaching plugin... " + error);
			},
			onmessage: function(msg, jsep) {
				Janus.debug(" ::: Got a message (subscriber) :::", msg);
				var event = msg["videoroom"];
				Janus.log("Event: " + event);
				if(msg["error"]) {
					window.alert(msg["error"]);
				} else if(event) {
					if(event === "attached") {
            remoteFeed.rfindex = 2;
            remoteFeed.rfid = msg["id"];
            remoteFeed.rfdisplay = msg["display"];
            //console.log(remoteFeed)
            Janus.log("Successfully attached to feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") in room " + msg["room"]);
            //dom.$$('#details').html('XXXXX');
					} else if(event === "event") {

					} else {
						// What has just happened?
					}
				}
				if(jsep) {
					Janus.debug("Handling SDP as well...", jsep);

				}
			},
			iceState: function(state) {
				Janus.log("ICE state of this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") changed to " + state);
			},
			webrtcState: function(on) {
        console.log(on)
				Janus.log("Janus says this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") is " + (on ? "up" : "down") + " now");
			},
			onlocalstream: function(stream) {
        console.log(stream)
				// The subscriber stream is recvonly, we don't expect anything here
			},
			onremotestream: function(stream) {
        console.log(stream)
				Janus.log("Remote feed #" + remoteFeed.rfindex + ", stream:", stream);
			},
			oncleanup: function() {
				Janus.log(" ::: Got a cleanup notification (remote feed " + id + ") :::");
			}
		});
}