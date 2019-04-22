var sm;
(function (sm) {
    var services;
    (function (services) {
        var sipml = /** @class */ (function () {
            function sipml() {
                var _this = this;
                this._SIP_CLIENT = window['SIPml'] || null;
                this.sipEnabled = false;
                this.sipStack = null;
                this.sipSessionCall = null;
                this.sipSessionCallMute = false;
                this.sipSessionRegister = null;
                this.audioElement = new Audio();
                this.ringingTone = new Audio();
                this.onSipSessionCallConnectingFn = null;
                this.onSipSessionCallConnectedFn = null;
                this.onSipSessionCallDeclinedFn = null;
                this.onSipSessionCallIncomingFn = null;
                this.onSipSessionCallRingingFn = null;
                this.onSipSessionCallTerminatedFn = null;
                this.sipSessionCallConfig = {
                    audio_remote: this.audioElement,
                    events_listener: {
                        events: '*',
                        listener: function (evt) {
                            _this.onSipCallEventSession(evt);
                        }
                    }
                };
                this._SIP_EVENTS = {
                    _CANCELLED: 'request cancelled',
                    _CONNECTED: 'in call',
                    _CONNECTING: 'call in progress...',
                    _DECLINED: 'declined',
                    _DENIED: 'media refused',
                    _FAILED_TO_START: 'failed to connet to the server',
                    _FORBIDDEN: 'forbidden',
                    _INCOMING_CALL: 'incoming call',
                    _REJECTED: 'call rejected',
                    _RINGING: 'ringing',
                    _STARTED: 'stack started',
                    _TERMINATED: 'call terminated'
                };
                this._SIP_CLIENT.setDebugLevel('fatal');
                this.audioElement.autoplay = true;
                this.ringingTone.loop = true;
                this.ringingTone.src = 'ringingtone.mp3';
            }
            sipml.prototype.init = function (options) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    if (!_this.sipStack && !_this.sipEnabled) {
                        _this.sipEnabled = true;
                        _this._SIP_CLIENT.init(function () {
                            _this.sipStack = new _this._SIP_CLIENT.Stack({
                                realm: options.realm,
                                impi: options.impi,
                                impu: options.impu,
                                password: options.password,
                                display_name: "Web Phone",
                                websocket_proxy_url: options.websocket_proxy_url,
                                outbound_proxy_url: options.outbound_proxy_url,
                                enable_rtcweb_breaker: false,
                                events_listener: {
                                    events: '*',
                                    listener: function (evt) {
                                        _this.onSipEventStack(evt, resolve, reject);
                                    }
                                },
                                enable_early_ims: false,
                                enable_media_stream_cache: false,
                                bandwidth: null,
                                ice_servers: []
                            }, function (err) {
                                reject(err);
                            });
                        }, function (err) {
                            console.log(err);
                            reject(err);
                        });
                        _this.sipStack.start();
                    }
                    else {
                        /*
                            Check if a sipStack is available to use (it may have failed to connect)
                            If no sipStack is available, sipEnabled should reamin as false
                            Not sure of a surefire way to check if a sipStack is available
                        */
                        if (_this.onSipSessionCallIncomingFn) {
                            _this.sipEnabled = true;
                            resolve();
                        }
                        else {
                            reject();
                        }
                    }
                });
            }
            sipml.prototype.onSipEventStack = function (evt, resolve, reject) {
                if (this.sipStack && this.sipEnabled) {
                    switch (evt.description.toLowerCase()) {
                        case this._SIP_EVENTS._STARTED:
                            {
                                try {
                                    this.sipSessionRegister = this.sipStack.newSession('register', {
                                        expires: 200,
                                        events_listener: {
                                            events: '*',
                                            listener: function (evt) {
                                                if (evt.type === 'connected') {
                                                    resolve();
                                                }
                                                else if (evt.type === 'terminated') {
                                                    reject(evt.description);
                                                }
                                                ;
                                            }
                                        }
                                    });
                                    this.sipSessionRegister.register();
                                }
                                catch (err) {
                                    console.error(err);
                                }
                                break;
                            }
                        case this._SIP_EVENTS._DENIED:
                            //Browser is blocking the request for user media
                            this.onSipSessionCallDeclinedFn();
                            break;
                        case this._SIP_EVENTS._FAILED_TO_START:
                            reject(evt.description);
                            break;
                        case this._SIP_EVENTS._INCOMING_CALL:
                            this.sipSessionCall = evt.newSession;
                            this.sipSessionCall.setConfiguration(this.sipSessionCallConfig);
                            this.onSipSessionCallIncomingFn(this.sipSessionCall.getRemoteFriendlyName());
                            this.setRingtonePlayback(true);
                            break;
                        default:
                            break;
                    }
                }
            }
            sipml.prototype.setRingtonePlayback = function (play) {
                play ? this.ringingTone.play() : this.ringingTone.pause();
            };
            ;
            sipml.prototype.answer = function () {
                if (this.sipSessionCall) {
                    this.sipSessionCall.accept(this.sipSessionCallConfig);
                }
            }
            sipml.prototype.call = function (number) {
                console.log(number);
                console.log('SIP STACK:');
                console.log(this.sipStack);
                console.log('SIP SESSION CALL CONFIG:');
                console.log(this.sipSessionCallConfig);
                if (number) {
                    this.sipSessionCall = this.sipStack.newSession('call-audio', this.sipSessionCallConfig);
                    console.log('SIP SESSION CALL:');
                    console.log(this.sipSessionCall);
                    console.log('ANTES IF');
                    if (this.sipSessionCall.call(number) != 0) {
                        console.log('IF');
                        this.sipSessionCall = null;
                        return;
                    }
                    console.log('ELSE');
                    this.setCallAudio();
                }
            }
            sipml.prototype.decline = function () {
                this.sipSessionCall.hangup();
            }
            sipml.prototype.destroy = function () {
                this.sipEnabled = false;
            }
            sipml.prototype.endCall = function () {
                this.sipSessionCall.hangup();
            }
            sipml.prototype.onSipCallEventSession = function (evt) {
                switch (evt.description.toLowerCase()) {
                    case this._SIP_EVENTS._DECLINED:
                        if (this.onSipSessionCallDeclinedFn) {
                            this.onSipSessionCallDeclinedFn();
                        }
                        this.setRingtonePlayback(false);
                        break;
                    case this._SIP_EVENTS._RINGING:
                        if (this.onSipSessionCallRingingFn) {
                            this.onSipSessionCallRingingFn();
                        }
                        this.setRingtonePlayback(true);
                        break;
                    case this._SIP_EVENTS._CONNECTED:
                        if (this.onSipSessionCallConnectedFn) {
                            this.onSipSessionCallConnectedFn();
                        }
                        this.setRingtonePlayback(false);
                        break;
                    case this._SIP_EVENTS._CONNECTING:
                        if (this.onSipSessionCallConnectingFn) {
                            this.onSipSessionCallConnectingFn();
                        }
                        break;
                    case this._SIP_EVENTS._CANCELLED:
                    case this._SIP_EVENTS._FORBIDDEN:
                    case this._SIP_EVENTS._TERMINATED:
                    case this._SIP_EVENTS._REJECTED:
                        if (this.onSipSessionCallTerminatedFn) {
                            this.onSipSessionCallTerminatedFn();
                        }
                        this.setRingtonePlayback(false);
                        break;
                    default:
                        break;
                }
            }
            sipml.prototype.onSipSessionCallConnecting = function (fn) {
                this.onSipSessionCallConnectingFn = fn;
            }
            sipml.prototype.onSipSessionCallConnected = function (fn) {
                this.onSipSessionCallConnectedFn = fn;
            }
            sipml.prototype.onSipSessionCallDeclined = function (fn) {
                this.onSipSessionCallDeclinedFn = fn;
            }
            sipml.prototype.onSipSessionCallIncoming = function (fn) {
                this.onSipSessionCallIncomingFn = fn;
            }
            sipml.prototype.onSipSessionCallRinging = function (fn) {
                this.onSipSessionCallRingingFn = fn;
            }
            sipml.prototype.onSipSessionCallTerminated = function (fn) {
                this.onSipSessionCallTerminatedFn = fn;
            }
            sipml.prototype.muteCall = function (mute) {
                this.sipSessionCallMute = mute;
                this.setCallAudio();
            }
            sipml.prototype.setCallAudio = function () {
                if (this.sipSessionCall) {
                    this.sipSessionCall.mute('audio', this.sipSessionCallMute);
                }
            }
            sipml.$inject = [];
            return sipml;
        }());
        services.sipml = sipml;
    })(services = sm.services || (sm.services = {}));
})(sm || (sm = {}));

angular.module('nativeIP').service('sipml', sm.services.sipml);
