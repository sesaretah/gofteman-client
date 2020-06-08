import React from "react";
import { Page, Col, Icon } from "framework7-react";
import ModelStore from "../../stores/ModelStore";
import RoomIndex from "../../containers/rooms/index";
import * as MyActions from "../../actions/MyActions";
import { dict } from "../../Dict";
import { conf } from "../../conf";
import Janus from "../../janus.js";
import Framework7 from "framework7/framework7.esm.bundle";
//import {newRemoteFeed} from "./newRemoteFeed.js"

export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.sessionCreate = this.sessionCreate.bind(this);
    this.registerUsername = this.registerUsername.bind(this);
    this.newRemoteFeed = this.newRemoteFeed.bind(this);
    this.publishCamera = this.publishCamera.bind(this);
    this.publishMicrophone = this.publishMicrophone.bind(this);
    this.off = this.off.bind(this);
    this.on = this.on.bind(this);
    this.pageAfterIn = this.pageAfterIn.bind(this);

    this.state = {
      token: window.localStorage.getItem("token"),
      shortners: null,
      server: conf.janusServer,
      janus: null,
      sfutest: null,
      opaqueId: "videoroomtest-" + Janus.randomString(12),
      myroom: 1234,
      myusername: null,
      myid: null,
      mystream: null,
      mypvtid: null,
      feeds: [],
      bitrateTimer: [],
      urls: [],
      publisedCamera: false,
      publishedMicrophone: false,
    };
  }
  componentWillMount() {
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_list", this.getList);
  }

  sessionCreate() {
    var self = this;
    Janus.init({
      debug: "all",
      callback: function () {
        var janus = new Janus({
          server: self.state.server,
          success: function () {
            janus.attach({
              plugin: "janus.plugin.videoroom",
              opaqueId: self.state.opaqueId,
              success: function (pluginHandle) {
                self.setState({ janus: janus });
                self.setState({ sfutest: pluginHandle });
                Janus.log(
                  "Plugin attached! (" +
                    self.state.sfutest.getPlugin() +
                    ", id=" +
                    self.state.sfutest.getId() +
                    ")"
                );
                Janus.log("  -- This is a publisher/manager");
                self.registerUsername();
              },
              error: function (error) {
                Janus.error("  -- Error attaching plugin...", error);
                window.alert("Error attaching plugin... " + error);
              },
              consentDialog: function (on) {
                Janus.debug(
                  "Consent dialog should be " + (on ? "on" : "off") + " now"
                );
              },
              iceState: function (state) {
                Janus.log("ICE state changed to " + state);
              },
              mediaState: function (medium, on) {
                Janus.log(
                  "Janus " +
                    (on ? "started" : "stopped") +
                    " receiving our " +
                    medium
                );
              },
              webrtcState: function (on) {
                Janus.log(
                  "Janus says our WebRTC PeerConnection is " +
                    (on ? "up" : "down") +
                    " now"
                );
              },
              onmessage: function (msg, jsep) {
                console.log(msg);
                Janus.log(" ::: Got a message (publisher) :::", msg);
                var event = msg["videoroom"];
                Janus.debug("Event: " + event);
                if (event) {
                  if (event === "joined") {
                    console.log("joined");
                    self.setState({
                      myid: msg["id"],
                      mypvtid: msg["private_id"],
                    });

                    if (msg["publishers"]) {
                      var list = msg["publishers"];
                      Janus.log(
                        "Got a list of available publishers/feeds:",
                        list
                      );
                      for (var f in list) {
                        var id = list[f]["id"];
                        var display = list[f]["display"];
                        var audio = list[f]["audio_codec"];
                        var video = list[f]["video_codec"];
                        Janus.debug(
                          "  >> [" +
                            id +
                            "] " +
                            display +
                            " (audio: " +
                            audio +
                            ", video: " +
                            video +
                            ")"
                        );
                        self.newRemoteFeed(id, display, audio, video);
                      }
                    }
                  } else if (event === "destroyed") {
                    // The room has been destroyed
                    Janus.warn("The room has been destroyed!");
                  } else if (event === "event") {
                    // Any new feed to attach to?
                    if (msg["publishers"]) {
                      var list = msg["publishers"];
                      Janus.log(
                        "Got a list of available publishers/feeds:",
                        list
                      );
                      for (var f in list) {
                        var id = list[f]["id"];
                        var display = list[f]["display"];
                        var audio = list[f]["audio_codec"];
                        var video = list[f]["video_codec"];
                        Janus.log(
                          "  >> [" +
                            id +
                            "] " +
                            display +
                            " (audio: " +
                            audio +
                            ", video: " +
                            video +
                            ")"
                        );
                        self.newRemoteFeed(id, display, audio, video);
                      }
                    } else if (msg["leaving"]) {
                    } else if (msg["unpublished"]) {
                      var unpublished = msg["unpublished"];
												Janus.log("Publisher left: " + unpublished);
												if(unpublished === 'ok') {
													// That's us
													self.state.sfutest.hangup();
													return;
												}
                    } else if (msg["error"]) {
                    }
                  }
                }
                if (jsep) {
                  Janus.log("Handling SDP as well...", jsep);
                  self.state.sfutest.handleRemoteJsep({ jsep: jsep });
                }
              },
              onlocalstream: function (stream) {
                Janus.log(" ::: Got a local stream :::", stream);
                self
                  .$$("#video0")
                  .prop("src", window.URL.createObjectURL(stream));
              },
              onremotestream: function (stream) {
                Janus.log(" ::: Got a remote stream :::", stream);
                // The publisher stream is sendonly, we don't expect anything here
              },
              oncleanup: function () {
                Janus.log(
                  " ::: Got a cleanup notification: we are unpublished now :::"
                );
              },
            });
          },
          error: function (error) {
            Janus.error(error);
            window.alert(error, function () {
              window.location.reload();
            });
          },
          destroyed: function () {
            window.location.reload();
          },
        });
      },
    });
  }
  registerUsername() {
    var self = this;
    var register = {
      request: "join",
      room: self.state.myroom,
      ptype: "publisher",
      display: "test1",
    };
    self.state.sfutest.send({ message: register });
  }

  newRemoteFeed(id, feeds, display, audio, video) {
    var self = this;
    // A new feed has been published, create a new plugin handle and attach to it as a subscriber
    var remoteFeed = null;
    self.state.janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: this.state.opaqueId,
      success: function (pluginHandle) {
        remoteFeed = pluginHandle;
        remoteFeed.simulcastStarted = false;
        Janus.log(
          "Plugin attached! (" +
            remoteFeed.getPlugin() +
            ", id=" +
            remoteFeed.getId() +
            ")"
        );
        Janus.log("  -- This is a subscriber");
        // We wait for the plugin to send us an offer
        var subscribe = {
          request: "join",
          room: self.state.myroom,
          ptype: "subscriber",
          feed: id,
          private_id: self.state.mypvtid,
        };
        // In case you don't want to receive audio, video or data, even if the
        // publisher is sending them, set the 'offer_audio', 'offer_video' or
        // 'offer_data' properties to false (they're true by default), e.g.:
        // 		subscribe["offer_video"] = false;
        // For example, if the publisher is VP8 and this is Safari, let's avoid video
        if (
          Janus.webRTCAdapter.browserDetails.browser === "safari" &&
          (video === "vp9" || (video === "vp8" && !Janus.safariVp8))
        ) {
          if (video) video = video.toUpperCase();
          console.log(
            "Publisher is using " +
              video +
              ", but Safari doesn't support it: disabling video"
          );
          subscribe["offer_video"] = false;
        }
        remoteFeed.videoCodec = video;
        remoteFeed.send({ message: subscribe });
        //console.log(subscribe)
        //console.log(remoteFeed)
      },
      error: function (error) {
        Janus.error("  -- Error attaching plugin...", error);
        window.alert("Error attaching plugin... " + error);
      },
      onmessage: function (msg, jsep) {
        Janus.debug(" ::: Got a message (subscriber) :::", msg);
        var event = msg["videoroom"];
        Janus.log("Event: " + event);
        if (msg["error"]) {
          window.alert(msg["error"]);
        } else if (event) {
          if (event === "attached") {
            //for (var i = 1; i < 6; i++) {
              //if (!self.state.feeds[i]) {
                //let newState = Object.assign({}, self.state);
                //newState.feeds[i] = remoteFeed;
                //self.setState(newState);
                //remoteFeed.rfindex = i;
               // break;
              //}
            //}
            self.setState({feeds: self.state.feeds.concat(remoteFeed)})
            remoteFeed.rfid = msg["id"];
            remoteFeed.rfdisplay = msg["display"];
            console.log(remoteFeed);
            Janus.log(
              "Successfully attached to feed " +
                remoteFeed.rfid +
                " (" +
                remoteFeed.rfdisplay +
                ") in room " +
                msg["room"]
            );
            //dom.$$('#details').html('XXXXX');
          } else if (event === "event") {
          } else {
            // What has just happened?
          }
        }
        if (jsep) {
          Janus.log("Handling SDP as well...", jsep);
          remoteFeed.createAnswer({
            jsep: jsep,
            // Add data:true here if you want to subscribe to datachannels as well
            // (obviously only works if the publisher offered them in the first place)
            media: { audioSend: false, videoSend: false }, // We want recvonly audio/video
            success: function (jsep) {
              Janus.log("Got SDP!", jsep);
              var body = { request: "start", room: self.state.myroom };
              remoteFeed.send({ message: body, jsep: jsep });
            },
            error: function (error) {
              Janus.log("WebRTC error:", error);
              window.alert("WebRTC error... " + error.message);
            },
          });
        }
      },
      iceState: function (state) {
        Janus.log(
          "ICE state of this WebRTC PeerConnection (feed #" +
            remoteFeed.rfindex +
            ") changed to " +
            state
        );
      },
      webrtcState: function (on) {
        //console.log(on);
        Janus.log(
          "Janus says this WebRTC PeerConnection (feed #" +
            remoteFeed.rfindex +
            ") is " +
            (on ? "up" : "down") +
            " now"
        );
      },
      onlocalstream: function (stream) {
        //console.log(stream);
        // The subscriber stream is recvonly, we don't expect anything here
      },
      onremotestream: function (stream) {
        console.log('stream>>>>>>>>>>>>', stream)
        // self
        //  .$$('#hosts').append("<video id='video-"+remoteFeed.rfid+"' src='' width='320' height='240' autoPlay playsInline />")
          Janus.attachMediaStream(document.getElementById('video-'+remoteFeed.id), stream)
          //.$$("#video" + remoteFeed.rfindex)
        // .prop("src", window.URL.createObjectURL(stream));
         // console.log('>>>>>')
          //console.log(remoteFeed)
      },
      oncleanup: function () {
        Janus.log(
          " ::: Got a cleanup notification (remote feed " + id + ") :::"
        );
      },
    });
  }

  publishCamera() {
    var self = this;
    console.log('camera', !self.state.publisedCamera);
    self.state.sfutest.createOffer({
      media: {
        audioRecv: false,
        videoRecv: false,
        videoSend: !self.state.publisedCamera,
        removeVideo: self.state.publisedCamera,
        audioSend: self.state.publishedMicrophone,
      },

      success: function (jsep) {
        Janus.debug("********* Got publisher SDP!", jsep);
        if (jsep) {
          var publish = { request: "configure", audio: true, video: true };
          self.state.sfutest.send({ message: publish, jsep: jsep });
        }
        self.setState({publisedCamera: !self.state.publisedCamera})
      },
      error: function (error) {
        Janus.error("***** WebRTC error:", error);
      },
    });
  }

  publishMicrophone() {
    var self = this;
    console.log('Microphone', !self.state.publishedMicrophone);
    self.state.sfutest.createOffer({
      media: {
        audioRecv: false,
        videoRecv: false,
        audioSend: !self.state.publishedMicrophone,
        removeAudio: self.state.publishedMicrophone,
        videoSend: self.state.publisedCamera,
      },

      success: function (jsep) {
        Janus.debug("********* Got publisher SDP!", jsep);
        if (jsep) {
          var publish = { request: "configure", audio: true, video: true };
          self.state.sfutest.send({ message: publish, jsep: jsep });
          self.setState({publishedMicrophone: !self.state.publishedMicrophone})
        }
      },
      error: function (error) {
        Janus.error("***** WebRTC error:", error);
      },
    });
  }

  off() {
    console.log(this.state.feeds);
    var body = {
      request: "switch",
      feed: this.state.feeds[1].rfid,
      video: false,
    };
    this.state.feeds[1].send({ message: body });
  }

  on() {
    console.log(this.state.feeds);
    var body = {
      request: "switch",
      feed: this.state.feeds[1].rfid,
      video: true,
    };
    this.state.feeds[1].send({ message: body });
  }

  componentDidMount() {
    
  }

  pageAfterIn(){
    this.sessionCreate();
  }

  loadData() {
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({
      text: dict.receiving,
      closeTimeout: 2000,
      position: "top",
    });
    MyActions.getList("shortners", this.state.page, {}, this.state.token);
  }

  getList() {
    var shortners = ModelStore.getList();
    var klass = ModelStore.getKlass();
    if (shortners && klass === "Shortner") {
      this.setState({
        shortners: shortners,
      });
    }
  }

  render() {
    const { shortners, urls, publishedMicrophone, publisedCamera, feeds} = this.state;
    return (
      <RoomIndex
        pageAfterIn={this.pageAfterIn}
        shortners={shortners}
        urls={urls}
        off={this.off}
        on={this.on}
        feeds={feeds}
        publisedCamera={publisedCamera}
        publishedMicrophone={publishedMicrophone}
        publishCamera={this.publishCamera}
        publishMicrophone={this.publishMicrophone}
      />
    );
  }
}
