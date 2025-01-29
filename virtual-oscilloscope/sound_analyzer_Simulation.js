/* _inputParameters: an object with different values for the model parameters */
function sound_analyzer(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
  var _model = EJSS_CORE.createAnimationLMS();
  var _view;
  var _isPlaying = false;
  var _isPaused = true;
  var _isMobile = (navigator===undefined) ? false : navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i);

var _stringProperties = {};
  var _tools = {
    showInputDialog : EJSS_INTERFACE.BoxPanel.showInputDialog,
    showOkDialog : EJSS_INTERFACE.BoxPanel.showOkDialog,
    showOkCancelDialog : EJSS_INTERFACE.BoxPanel.showOkCancelDialog,
    downloadText: EJSS_TOOLS.File.downloadText,
    uploadText: function(action) { EJSS_TOOLS.File.uploadText(_model,action); } 
  };

  function _play()  { _isPaused = false; _isPlaying = true;  _model.play();  }
  function _pause() { _isPaused = true;  _isPlaying = false; _model.pause(); }
  function _step()  { _pause();  _model.step(); }
  function _reset() { _model.reset();  _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); }
  _model._play  = _play;
  _model._pause = _pause;
  _model._step  = _step;
  _model._reset = _reset;
  function _update() { _model.update(); }
  function _initialize() { _model.initialize(); }
  function _setFPS(_fps) { _model.setFPS(_fps); }
  function _setDelay(_delay) { _model.setDelay(_delay); }
  function _setStepsPerDisplay(_spd) { _model.setStepsPerDisplay(_spd); }
  function _setUpdateView(_updateView) { _model.setUpdateView(_updateView); }
  function _setAutoplay(_auto) { _model.setAutoplay(_auto); }
  function _println(_message) { console.log(_message); }

  function _breakAfterThisPage() { _model.setShouldBreak(true); }

  function _resetSolvers() { if (_model.resetSolvers) _model.resetSolvers(); }

  function _saveText(name,type,content) { if (_model.saveText) _model.saveText(name,type,content); }

  function _saveState(name) { if (_model.saveState) _model.saveState(name); }

  function _saveImage(name,panelname) { if (_model.saveImage) _model.saveImage(name,panelname); }

  function _readState(url,type) { if (_model.readState) _model.readState(url,type); }

  function _readText(url,type,varname) { if (_model.readText) _model.readText(url,type,varname); }

  function _getStringProperty(propertyName) {
    var _value = _stringProperties[propertyName];
    if (_value===undefined) return propertyName;
    else return _value;
  }
  var __pagesEnabled = [];
  function _setPageEnabled(pageName,enabled) { __pagesEnabled[pageName] = enabled; }

  var audioCtx; // EjsS Model.Variables.Analyzer Vars.audioCtx
  var analyser; // EjsS Model.Variables.Analyzer Vars.analyser
  var dataArray; // EjsS Model.Variables.Analyzer Vars.dataArray
  var dbArray; // EjsS Model.Variables.Analyzer Vars.dbArray
  var freqArray; // EjsS Model.Variables.Analyzer Vars.freqArray
  var peakArray; // EjsS Model.Variables.Analyzer Vars.peakArray
  var fftSizeList; // EjsS Model.Variables.Analyzer Vars.fftSizeList
  var maxDecibels; // EjsS Model.Variables.Analyzer Vars.maxDecibels
  var minDecibels; // EjsS Model.Variables.Analyzer Vars.minDecibels
  var maximumX; // EjsS Model.Variables.Analyzer Vars.maximumX
  var maximumXs; // EjsS Model.Variables.Analyzer Vars.maximumXs
  var minimumX; // EjsS Model.Variables.Analyzer Vars.minimumX
  var baseFreq; // EjsS Model.Variables.Analyzer Vars.baseFreq
  var barSize; // EjsS Model.Variables.Analyzer Vars.barSize
  var peakShadow; // EjsS Model.Variables.Analyzer Vars.peakShadow
  var areaShadow; // EjsS Model.Variables.Analyzer Vars.areaShadow
  var xlabel; // EjsS Model.Variables.Analyzer Vars.xlabel
  var ylabel; // EjsS Model.Variables.Analyzer Vars.ylabel
  var tlabel; // EjsS Model.Variables.Analyzer Vars.tlabel
  var howmanypeaks; // EjsS Model.Variables.Analyzer Vars.howmanypeaks

  var font; // EjsS Model.Variables.lookang.font
  var fontaxis; // EjsS Model.Variables.lookang.fontaxis
  var fontmenu; // EjsS Model.Variables.lookang.fontmenu
  var elementinteracted; // EjsS Model.Variables.lookang.elementinteracted
  var firsttime; // EjsS Model.Variables.lookang.firsttime
  var xaxisself; // EjsS Model.Variables.lookang.xaxisself

  var mobileDisplay; // EjsS Model.Variables.Constants.mobileDisplay
  var height; // EjsS Model.Variables.Constants.height
  var width; // EjsS Model.Variables.Constants.width
  var myWidth; // EjsS Model.Variables.Constants.myWidth
  var myHeight; // EjsS Model.Variables.Constants.myHeight

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      audioCtx : audioCtx,
      analyser : analyser,
      dataArray : dataArray,
      dbArray : dbArray,
      freqArray : freqArray,
      peakArray : peakArray,
      fftSizeList : fftSizeList,
      maxDecibels : maxDecibels,
      minDecibels : minDecibels,
      maximumX : maximumX,
      maximumXs : maximumXs,
      minimumX : minimumX,
      baseFreq : baseFreq,
      barSize : barSize,
      peakShadow : peakShadow,
      areaShadow : areaShadow,
      xlabel : xlabel,
      ylabel : ylabel,
      tlabel : tlabel,
      howmanypeaks : howmanypeaks,
      font : font,
      fontaxis : fontaxis,
      fontmenu : fontmenu,
      elementinteracted : elementinteracted,
      firsttime : firsttime,
      xaxisself : xaxisself,
      mobileDisplay : mobileDisplay,
      height : height,
      width : width,
      myWidth : myWidth,
      myHeight : myHeight
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.audioCtx != "undefined") audioCtx = json.audioCtx;
    if(typeof json.analyser != "undefined") analyser = json.analyser;
    if(typeof json.dataArray != "undefined") dataArray = json.dataArray;
    if(typeof json.dbArray != "undefined") dbArray = json.dbArray;
    if(typeof json.freqArray != "undefined") freqArray = json.freqArray;
    if(typeof json.peakArray != "undefined") peakArray = json.peakArray;
    if(typeof json.fftSizeList != "undefined") fftSizeList = json.fftSizeList;
    if(typeof json.maxDecibels != "undefined") maxDecibels = json.maxDecibels;
    if(typeof json.minDecibels != "undefined") minDecibels = json.minDecibels;
    if(typeof json.maximumX != "undefined") maximumX = json.maximumX;
    if(typeof json.maximumXs != "undefined") maximumXs = json.maximumXs;
    if(typeof json.minimumX != "undefined") minimumX = json.minimumX;
    if(typeof json.baseFreq != "undefined") baseFreq = json.baseFreq;
    if(typeof json.barSize != "undefined") barSize = json.barSize;
    if(typeof json.peakShadow != "undefined") peakShadow = json.peakShadow;
    if(typeof json.areaShadow != "undefined") areaShadow = json.areaShadow;
    if(typeof json.xlabel != "undefined") xlabel = json.xlabel;
    if(typeof json.ylabel != "undefined") ylabel = json.ylabel;
    if(typeof json.tlabel != "undefined") tlabel = json.tlabel;
    if(typeof json.howmanypeaks != "undefined") howmanypeaks = json.howmanypeaks;
    if(typeof json.font != "undefined") font = json.font;
    if(typeof json.fontaxis != "undefined") fontaxis = json.fontaxis;
    if(typeof json.fontmenu != "undefined") fontmenu = json.fontmenu;
    if(typeof json.elementinteracted != "undefined") elementinteracted = json.elementinteracted;
    if(typeof json.firsttime != "undefined") firsttime = json.firsttime;
    if(typeof json.xaxisself != "undefined") xaxisself = json.xaxisself;
    if(typeof json.mobileDisplay != "undefined") mobileDisplay = json.mobileDisplay;
    if(typeof json.height != "undefined") height = json.height;
    if(typeof json.width != "undefined") width = json.width;
    if(typeof json.myWidth != "undefined") myWidth = json.myWidth;
    if(typeof json.myHeight != "undefined") myHeight = json.myHeight;
  };

  _model._inputAndPublicParameters = ["audioCtx",  "analyser",  "dataArray",  "dbArray",  "freqArray",  "peakArray",  "fftSizeList",  "maxDecibels",  "minDecibels",  "maximumX",  "maximumXs",  "minimumX",  "baseFreq",  "barSize",  "peakShadow",  "areaShadow",  "xlabel",  "ylabel",  "tlabel",  "howmanypeaks",  "font",  "fontaxis",  "fontmenu",  "elementinteracted",  "firsttime",  "xaxisself",  "mobileDisplay",  "height",  "width",  "myWidth",  "myHeight"]; 

  _model._outputAndPublicParameters = ["audioCtx",  "analyser",  "dataArray",  "dbArray",  "freqArray",  "peakArray",  "fftSizeList",  "maxDecibels",  "minDecibels",  "maximumX",  "maximumXs",  "minimumX",  "baseFreq",  "barSize",  "peakShadow",  "areaShadow",  "xlabel",  "ylabel",  "tlabel",  "howmanypeaks",  "font",  "fontaxis",  "fontmenu",  "elementinteracted",  "firsttime",  "xaxisself",  "mobileDisplay",  "height",  "width",  "myWidth",  "myHeight"];

  function _unserialize(json) { return _model.unserialize(json); }

  _model._userUnserialize = function(json) {
    _model._readParameters(json);
   _resetSolvers();
   _model.update();
  };

  _model.addToReset(function() {
    __pagesEnabled["initAudiothroughmouseclick"] = false;
    __pagesEnabled["peakreset3sec"] = true;
    __pagesEnabled["Initialization"] = true;
    __pagesEnabled["Init Size"] = true;
    __pagesEnabled["evolution"] = true;
    __pagesEnabled["findlong"] = true;
    __pagesEnabled["resetpeakevery3sec"] = true;
    __pagesEnabled["Size Relations"] = true;
  });

  _model.addToReset(function() {
    audioCtx = []; // EjsS Model.Variables.Analyzer Vars.audioCtx
    analyser = []; // EjsS Model.Variables.Analyzer Vars.analyser
    dataArray = []; // EjsS Model.Variables.Analyzer Vars.dataArray
    dbArray = []; // EjsS Model.Variables.Analyzer Vars.dbArray
    freqArray = []; // EjsS Model.Variables.Analyzer Vars.freqArray
    peakArray = []; // EjsS Model.Variables.Analyzer Vars.peakArray
    fftSizeList = [1024, 2048, 4096, 8192, 16384, 32768]; // EjsS Model.Variables.Analyzer Vars.fftSizeList
    maxDecibels = -20; // EjsS Model.Variables.Analyzer Vars.maxDecibels
    minDecibels = -80; // EjsS Model.Variables.Analyzer Vars.minDecibels
    maximumX = 2000; // EjsS Model.Variables.Analyzer Vars.maximumX
    maximumXs = 2000; // EjsS Model.Variables.Analyzer Vars.maximumXs
    minimumX = 100; // EjsS Model.Variables.Analyzer Vars.minimumX
    peakShadow = true; // EjsS Model.Variables.Analyzer Vars.peakShadow
    areaShadow = 20; // EjsS Model.Variables.Analyzer Vars.areaShadow
    xlabel = []; // EjsS Model.Variables.Analyzer Vars.xlabel
    ylabel = []; // EjsS Model.Variables.Analyzer Vars.ylabel
    tlabel = []; // EjsS Model.Variables.Analyzer Vars.tlabel
    howmanypeaks = 3; // EjsS Model.Variables.Analyzer Vars.howmanypeaks
  });

  _model.addToReset(function() {
    font = "normal normal 2vmax "; // EjsS Model.Variables.lookang.font
    fontaxis = "normal normal 2vmax "; // EjsS Model.Variables.lookang.fontaxis
    fontmenu = "normal normal 2vmax "; // EjsS Model.Variables.lookang.fontmenu
    elementinteracted = -1; // EjsS Model.Variables.lookang.elementinteracted
    firsttime = true; // EjsS Model.Variables.lookang.firsttime
    xaxisself = [500,1000,1500]; // EjsS Model.Variables.lookang.xaxisself
  });

  _model.addToReset(function() {
    mobileDisplay = _isMobile?true:false; // EjsS Model.Variables.Constants.mobileDisplay
    height = 600; // EjsS Model.Variables.Constants.height
    width = 850; // EjsS Model.Variables.Constants.width
    myWidth = width; // EjsS Model.Variables.Constants.myWidth
    myHeight = height; // EjsS Model.Variables.Constants.myHeight
  });

  if (_inputParameters) {
    _inputParameters = _model.parseInputParameters(_inputParameters);
    if (_inputParameters) _model.addToReset(function() { _model._readParameters(_inputParameters); });
  }

  _model.addToReset(function() {
    _model.setAutoplay(false);
    _model.setPauseOnPageExit(true);
    _model.setFPS(20);
    _model.setStepsPerDisplay(1);
  });

  function init_user_media (callback) {  // > CustomCode.UserMedia:1
    // Audio Context  // > CustomCode.UserMedia:2
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();  // > CustomCode.UserMedia:3
    //set up the analyser  // > CustomCode.UserMedia:4
    analyser = audioCtx.createAnalyser();  // > CustomCode.UserMedia:5
    analyser.minDecibels = minDecibels;   // > CustomCode.UserMedia:6
    analyser.maxDecibels = maxDecibels;  // > CustomCode.UserMedia:7
    analyser.smoothingTimeConstant = 0.85;  // > CustomCode.UserMedia:8
    // filter  // > CustomCode.UserMedia:9
    var distortion = audioCtx.createWaveShaper();  // > CustomCode.UserMedia:10
    var gainNode = audioCtx.createGain();  // > CustomCode.UserMedia:11
    var biquadFilter = audioCtx.createBiquadFilter();  // > CustomCode.UserMedia:12
    var convolver = audioCtx.createConvolver();  // > CustomCode.UserMedia:13
     // > CustomCode.UserMedia:14
    // Get User Media (http://brickhousecodecamp.org/docs/phase-i/Javascript/developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia.html)    // > CustomCode.UserMedia:15
    if (navigator.mediaDevices === undefined) navigator.mediaDevices = {};  // > CustomCode.UserMedia:16
    if (navigator.mediaDevices.getUserMedia === undefined) {  // > CustomCode.UserMedia:17
        navigator.mediaDevices.getUserMedia = function(constraints) {  // > CustomCode.UserMedia:18
          // First get ahold of the legacy getUserMedia, if present  // > CustomCode.UserMedia:19
          var getUserMedia = (navigator.getUserMedia ||  // > CustomCode.UserMedia:20
                            navigator.webkitGetUserMedia ||  // > CustomCode.UserMedia:21
                            navigator.mozGetUserMedia ||  // > CustomCode.UserMedia:22
                            navigator.msGetUserMedia);  // > CustomCode.UserMedia:23
          if (!getUserMedia) {  // > CustomCode.UserMedia:24
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));  // > CustomCode.UserMedia:25
          }  // > CustomCode.UserMedia:26
          return new Promise(function(resolve, reject) {  // > CustomCode.UserMedia:27
            getUserMedia.call(navigator, constraints, resolve, reject);  // > CustomCode.UserMedia:28
          });  // > CustomCode.UserMedia:29
       }  // > CustomCode.UserMedia:30
    }  // > CustomCode.UserMedia:31
    // Call Get User Media  // > CustomCode.UserMedia:32
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function(stream) {  // > CustomCode.UserMedia:33
         //console.log('getUserMedia supported.');  // > CustomCode.UserMedia:34
         // alert("getUserMedia supported.") //debugging lookang  // > CustomCode.UserMedia:35
         source = audioCtx.createMediaStreamSource(stream);  // > CustomCode.UserMedia:36
         source.connect(analyser);  // > CustomCode.UserMedia:37
         analyser.connect(distortion);  // > CustomCode.UserMedia:38
         distortion.connect(biquadFilter);  // > CustomCode.UserMedia:39
         biquadFilter.connect(convolver);  // > CustomCode.UserMedia:40
         convolver.connect(gainNode);  // > CustomCode.UserMedia:41
         gainNode.connect(audioCtx.destination);       // > CustomCode.UserMedia:42
           // > CustomCode.UserMedia:43
         callback();  // > CustomCode.UserMedia:44
    }).catch(function(err) {  // > CustomCode.UserMedia:45
      //https://caniuse.com/#search=getusermedia  // > CustomCode.UserMedia:46
     // iOS sarafi not supported in iOS10.3, only available on 11 onwards  // > CustomCode.UserMedia:47
         console.log('The following gUM error occured: ' + err +' likely need iOS safari >11');  // > CustomCode.UserMedia:48
         // alert("The following gUM error occured: " + err);  // > CustomCode.UserMedia:49
    });  // > CustomCode.UserMedia:50
  }  // > CustomCode.UserMedia:51

  function changeOrientation() {  // > CustomCode.changeOrientation:1
     // > CustomCode.changeOrientation:2
  var k =0.85 ; // k control height 1 is for full screen, 0.9 shorten etc  // > CustomCode.changeOrientation:3
  var kepub =0.8 ;  // > CustomCode.changeOrientation:4
  // check platform for Apps  // > CustomCode.changeOrientation:5
  try { // allow code to run in Student Learning Space   // > CustomCode.changeOrientation:6
    var iOSapp =  (typeof parent.device != 'undefined' && parent.device.platform == "iOS");  // > CustomCode.changeOrientation:7
    var Androidapp = (typeof parent.device != 'undefined' && parent.device.platform == "Android");  // > CustomCode.changeOrientation:8
  } catch(e) {  // > CustomCode.changeOrientation:9
    var iOSapp = false;  // > CustomCode.changeOrientation:10
    var Androidapp = false;  // > CustomCode.changeOrientation:11
  }  // > CustomCode.changeOrientation:12
  // check platform for web browsers  // > CustomCode.changeOrientation:13
  var iOS =/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:14
  var iPad =/iPad/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:15
  var iPhone = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;  // > CustomCode.changeOrientation:16
  var Android= /Android|android/i.test(navigator.userAgent);  // > CustomCode.changeOrientation:17
     // > CustomCode.changeOrientation:18
   //navigator  // > CustomCode.changeOrientation:19
  var Firefox = navigator.userAgent.indexOf("Firefox") != -1;  // > CustomCode.changeOrientation:20
     // > CustomCode.changeOrientation:21
  switch (window.orientation) {  // > CustomCode.changeOrientation:22
    case 0:  // > CustomCode.changeOrientation:23
    case 180:  // > CustomCode.changeOrientation:24
      this.screenOrientation = 'portrait';  // > CustomCode.changeOrientation:25
      if (iOSapp){ // does not seems to work  // > CustomCode.changeOrientation:26
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.changeOrientation:27
        return window.screen.height*k;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeOrientation:28
        // return window.screen.height;  // > CustomCode.changeOrientation:29
        //  return window.innerHeight;  // > CustomCode.changeOrientation:30
        // return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:31
      }  // > CustomCode.changeOrientation:32
      else if (_isEPub){ // does not seems to work  // > CustomCode.changeOrientation:33
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.changeOrientation:34
        return window.innerHeight*kepub;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeOrientation:35
        // return window.screen.height;  // > CustomCode.changeOrientation:36
        //  return window.innerHeight;  // > CustomCode.changeOrientation:37
        // return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:38
      }  // > CustomCode.changeOrientation:39
      else {  // > CustomCode.changeOrientation:40
        // return Math.max(window.innerWidth,window.innerHeight)*0.9;  // > CustomCode.changeOrientation:41
        return window.innerHeight*k;  // > CustomCode.changeOrientation:42
      }  // > CustomCode.changeOrientation:43
      break;  // > CustomCode.changeOrientation:44
    case 90:  // > CustomCode.changeOrientation:45
    case -90:  // > CustomCode.changeOrientation:46
      this.screenOrientation = 'landscape';  // > CustomCode.changeOrientation:47
     // > CustomCode.changeOrientation:48
      if (iOSapp){ // App  // > CustomCode.changeOrientation:49
        return window.screen.width*k;    // > CustomCode.changeOrientation:50
        // return window.screen.height;  // > CustomCode.changeOrientation:51
        //  return window.innerHeight;  // > CustomCode.changeOrientation:52
        //  return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:53
      }  // > CustomCode.changeOrientation:54
      else if (_isEPub){ // does not seems to work  // > CustomCode.changeOrientation:55
        //   return Math.max(window.screen.width,window.screen.height)*0.9;  // > CustomCode.changeOrientation:56
        return window.innerHeight*kepub;  //0.1 for app and 0.1 for nonfullscreenapp    // > CustomCode.changeOrientation:57
        // return window.screen.height;  // > CustomCode.changeOrientation:58
        //  return window.innerHeight;  // > CustomCode.changeOrientation:59
        // return document.documentElement.clientHeight;  // > CustomCode.changeOrientation:60
      }  // > CustomCode.changeOrientation:61
      else { // browser Android and PC  // > CustomCode.changeOrientation:62
        // return Math.min(window.innerWidth,window.innerHeight)*0.9;  // > CustomCode.changeOrientation:63
        // alert("browser Android and PC");  // > CustomCode.changeOrientation:64
        return window.innerHeight*k;  // > CustomCode.changeOrientation:65
      }  // > CustomCode.changeOrientation:66
      break;  // > CustomCode.changeOrientation:67
    default:  // > CustomCode.changeOrientation:68
      this.screenOrientation = 'unknown';  // > CustomCode.changeOrientation:69
      //       return (iPad)?""+(window.screen.width+window.screen.height)*0.4:((iPhone)?""+window.screen.width:_view._format(window.innerHeight*0.9,"0"));  // > CustomCode.changeOrientation:70
      return window.innerHeight*k;  // > CustomCode.changeOrientation:71
  }  // > CustomCode.changeOrientation:72
     // > CustomCode.changeOrientation:73
  }  // > CustomCode.changeOrientation:74
     // > CustomCode.changeOrientation:75

  function fontchangesize () {  // > CustomCode.fontchangesize:1
  if (window.innerHeight>=window.innerWidth){  // > CustomCode.fontchangesize:2
    fontaxis= "normal normal 3vh ";  // > CustomCode.fontchangesize:3
    font="normal normal 3vh ";  // > CustomCode.fontchangesize:4
    fontmenu="normal normal 3vh ";  // > CustomCode.fontchangesize:5
    }  // > CustomCode.fontchangesize:6
    else if (window.innerHeight<window.innerWidth){  // > CustomCode.fontchangesize:7
    fontaxis= "normal normal 2vw ";  // > CustomCode.fontchangesize:8
    font="normal normal 2vw ";  // > CustomCode.fontchangesize:9
    fontmenu="normal normal 2vw ";  // > CustomCode.fontchangesize:10
    }  // > CustomCode.fontchangesize:11
  _view._update();  // > CustomCode.fontchangesize:12
  }  // > CustomCode.fontchangesize:13

  function setFftSize (fftSize) {  // > CustomCode.fftSize:1
    // change fftSize in Analyzer  // > CustomCode.fftSize:2
    analyser.fftSize = fftSize;  // > CustomCode.fftSize:3
    // init arrays  // > CustomCode.fftSize:4
    var bufferLength = fftSize/2;  // > CustomCode.fftSize:5
    freqArray = new Array(bufferLength);  // > CustomCode.fftSize:6
    dbArray = new Array(bufferLength);  // > CustomCode.fftSize:7
    peakArray = new Array(bufferLength).fill(minDecibels);  // > CustomCode.fftSize:8
    dataArray = new Uint8Array(bufferLength);  // > CustomCode.fftSize:9
    // base freq  // > CustomCode.fftSize:10
    baseFreq = audioCtx.sampleRate / fftSize;     // > CustomCode.fftSize:11
  }  // > CustomCode.fftSize:12

  function findLong () {  // > CustomCode.findlong:1
    // get peaks  // > CustomCode.findlong:2
    var outp = []; //output of peaks  // > CustomCode.findlong:3
    for (var i=0; i<peakArray.length; i++) { // peakArray store all peaks global variable  // > CustomCode.findlong:4
      if (peakArray[i] > minDecibels) { // minDecibels is global -80  // > CustomCode.findlong:5
        outp.push(freqArray[i]); //freqArray is global   // > CustomCode.findlong:6
       // > CustomCode.findlong:7
      }  // > CustomCode.findlong:8
    }  // > CustomCode.findlong:9
      // > CustomCode.findlong:10
    // find out if open or closed pipe  // > CustomCode.findlong:11
    var margin = 0.2; // error margin  // > CustomCode.findlong:12
    //open open pipe at L = 0.3, v =330, frequencies are 550,1100,1650,2200,2750 Hz  // > CustomCode.findlong:13
    // we use 1100-2*550 <margin*550;  // > CustomCode.findlong:14
    // var open = (Math.abs(outp[1]-2*outp[0]) < margin*outp[1]); //old  // > CustomCode.findlong:15
    // results from our pipe L=0.31, F0 = 538, F1 = 1066, F2 = 1626   // > CustomCode.findlong:16
    var open = (Math.abs(outp[1]-2*outp[0]) < margin*outp[0]);  // > CustomCode.findlong:17
    //open closed pipe at L = 0.3, v =330, frequencies are 275,825,1375,1925,2450 Hz  // > CustomCode.findlong:18
    // we use 825-3*275 <margin*275;  // > CustomCode.findlong:19
   // var closed = (Math.abs(outp[1]-3*outp[0]) < margin*outp[1]);  // > CustomCode.findlong:20
     // > CustomCode.findlong:21
    var closed = (Math.abs(outp[1]-3*outp[0]) < margin*outp[0]);  // > CustomCode.findlong:22
   // var others;  // > CustomCode.findlong:23
    // formula  // > CustomCode.findlong:24
    var sound = 330; //assume to be 330 instead of 335  // > CustomCode.findlong:25
    if (open) {  // > CustomCode.findlong:26
      // true is for open, the formula is average of three F0=550 ,F1=1100 ,F2=1650  // > CustomCode.findlong:27
      return [true, ((sound/(2*outp[0])) + (sound/outp[1]) + ((3*sound)/(2*outp[2]))) / 3];  // > CustomCode.findlong:28
    }  // > CustomCode.findlong:29
    else if (closed){  // > CustomCode.findlong:30
      // false is for open-closed pipe, the formula is average of three F0=275 ,F1=825 ,F2=1375  // > CustomCode.findlong:31
      // using formula v =f lambda , 330 = 275 *lambda which lamdba/4 is Length of pipe   // > CustomCode.findlong:32
      return [false, ((sound/(4*outp[0])) + ((3*sound)/(4*outp[1])) + ((5*sound)/(4*outp[2]))) / 3];  // > CustomCode.findlong:33
    }  // > CustomCode.findlong:34
    else{  // > CustomCode.findlong:35
    return [];    // > CustomCode.findlong:36
    }  // > CustomCode.findlong:37
  }  // > CustomCode.findlong:38

  function play () {  // > CustomCode.playpause:1
  init_user_media (function() {   // > CustomCode.playpause:2
   // setFftSize(4096);   // > CustomCode.playpause:3
   fftSize = _view.fftSizeBox.getSelectedOptions()[0];  // > CustomCode.playpause:4
  setFftSize(fftSize);  // > CustomCode.playpause:5
  _play();  // > CustomCode.playpause:6
  });  // > CustomCode.playpause:7
  }  // > CustomCode.playpause:8

  _model.addToInitialization(function() {
    if (!__pagesEnabled["initAudiothroughmouseclick"]) return;
     EJSS_INTERFACE.BoxPanel.showOkDialog("Click the play button or double click on any part of the plotting panel or the reset button to activate microphone!");  // > Initialization.initAudiothroughmouseclick:1
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["peakreset3sec"]) return;
    myTime = new Date().getTime();  // > Initialization.peakreset3sec:1
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Initialization"]) return;
    minimumX = 100;  // > Initialization.Initialization:1
    //maximumX = audioCtx.sampleRate / 2; // set maximum freq  // > Initialization.Initialization:2
    maximumX = 2000; //leong  // > Initialization.Initialization:3
    maximumXs = maximumX ; //leong  // > Initialization.Initialization:4
    //setFftSize(fftSizeList[2]); //leong wanted 4096  // > Initialization.Initialization:5
    //setFftSize(4096); //leong wanted 4096 need to overcome Cannot read property 'getByteFrequencyData' of undefined?  // > Initialization.Initialization:6
    //_view.fftSizeBox.setSelectedOptions(["4096"]); //combobox  // > Initialization.Initialization:7
    //setFftSize(fftSizeList[3]); // list 3 is 8192  // > Initialization.Initialization:8
    // set axisY for markers  // > Initialization.Initialization:9
    _view.trace.setMarkAxisY(minDecibels);  // > Initialization.Initialization:10
    _view.shadow.setMarkAxisY(minDecibels);  // > Initialization.Initialization:11
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Size"]) return;
    var rect = document.getElementById("appContainer").getBoundingClientRect();  // > Initialization.Init Size:1
    var rect3 = document.getElementById("topPanel").getBoundingClientRect();  // > Initialization.Init Size:2
    var rect2 = document.getElementById("controlPanel").getBoundingClientRect();  // > Initialization.Init Size:3
        // > Initialization.Init Size:4
    myWidth=window.innerWidth;  // > Initialization.Init Size:5
    myHeight=window.innerHeight;  // > Initialization.Init Size:6
    if (screen.availWidth>screen.availHeight) {//landscape  // > Initialization.Init Size:7
      width=rect.width;  // > Initialization.Init Size:8
      height=window.innerHeight-rect2.height-rect3.height-125;  // > Initialization.Init Size:9
    } else {  // > Initialization.Init Size:10
      width=rect.width;  // > Initialization.Init Size:11
      height=window.innerHeight-rect2.height-rect3.height-125;  // > Initialization.Init Size:12
    }  // > Initialization.Init Size:13
        // > Initialization.Init Size:14
    height=Math.max(height,0);  // negative values not allowed  // > Initialization.Init Size:15
    width=Math.max(width,0);  // > Initialization.Init Size:16
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["evolution"]) return;
    analyser.getByteFrequencyData(dataArray);  // > Evolution.evolution:1
    // values (db)  // > Evolution.evolution:2
    dbArray = Array.from(dataArray);  // > Evolution.evolution:3
    for (i=0; i<dataArray.length; i++) {  // > Evolution.evolution:4
      dbArray[i] = minDecibels + (dbArray[i] / 255) * Math.abs(minDecibels - maxDecibels);  // > Evolution.evolution:5
      freqArray[i] = i * baseFreq;  // > Evolution.evolution:6
    }  // > Evolution.evolution:7
    // peak shadow  // > Evolution.evolution:8
    for (i=0; i<dataArray.length; i++) {  // > Evolution.evolution:9
        if (freqArray[i] < minimumX || freqArray[i] > maximumX) continue;  // > Evolution.evolution:10
        // initialization  // > Evolution.evolution:11
        var pre = i-areaShadow/2;  // > Evolution.evolution:12
        if (pre < 0) pre = 0;  // > Evolution.evolution:13
        var end = i+areaShadow/2;  // > Evolution.evolution:14
        if (end > dataArray.length) end = dataArray.length;  // > Evolution.evolution:15
          // > Evolution.evolution:16
        // find peak in current values and previous ones  // > Evolution.evolution:17
        var isPeak = true;  // > Evolution.evolution:18
        for (var j=pre; j<end; j++) {  // > Evolution.evolution:19
          if ((i != j && (dbArray[i] <= dbArray[j])) || dbArray[i] <= peakArray[j]) {  // > Evolution.evolution:20
            isPeak = false;  // > Evolution.evolution:21
            break;  // > Evolution.evolution:22
          }  // > Evolution.evolution:23
        }  // > Evolution.evolution:24
          // > Evolution.evolution:25
        if (isPeak) {  // > Evolution.evolution:26
          for (var j=pre; j<end; j++)  // > Evolution.evolution:27
              peakArray[j] = minDecibels; // mark as not peak  // > Evolution.evolution:28
          peakArray[i] = dbArray[i];  // > Evolution.evolution:29
        }  // > Evolution.evolution:30
    }  // > Evolution.evolution:31
    // how many peaks to show?  // > Evolution.evolution:32
    var outp = new Array(howmanypeaks).fill(minDecibels);  // > Evolution.evolution:33
    for (var i=0; i<peakArray.length; i++) {  // > Evolution.evolution:34
      var value = peakArray[i];   // > Evolution.evolution:35
      if (value > minDecibels) {  // > Evolution.evolution:36
        for (var j=0; j<outp.length; j++) {  // > Evolution.evolution:37
          if (value > outp[j]) {   // > Evolution.evolution:38
            var tmp = outp[j];  // > Evolution.evolution:39
            outp[j] = value;  // > Evolution.evolution:40
            value = tmp;  // > Evolution.evolution:41
          }  // > Evolution.evolution:42
        }  // > Evolution.evolution:43
      }  // > Evolution.evolution:44
    }  // > Evolution.evolution:45
    // update text values  // > Evolution.evolution:46
    for (var k=0; k<tlabel.length; k++) {  // > Evolution.evolution:47
      tlabel[k] = '';  // > Evolution.evolution:48
    }  // > Evolution.evolution:49
    var ct = 0;  // > Evolution.evolution:50
    for (var i=0; i<dataArray.length; i++) {  // > Evolution.evolution:51
      if (peakArray[i] > minDecibels) {  // > Evolution.evolution:52
       var peakToShow = false;  // > Evolution.evolution:53
       //console.log('---');  // > Evolution.evolution:54
       for (var j=0; j<outp.length; j++){  // > Evolution.evolution:55
         //console.log(outp[j]);  // > Evolution.evolution:56
         if(peakArray[i] == outp[j]) peakToShow = true;  // > Evolution.evolution:57
       }  // > Evolution.evolution:58
       if(peakToShow) {  // > Evolution.evolution:59
         if (peakArray[i] > dbArray[i]) {  // > Evolution.evolution:60
          xlabel[ct] = freqArray[i];  // > Evolution.evolution:61
          ylabel[ct] = peakArray[i] + 1; //higher by 1  // > Evolution.evolution:62
          tlabel[ct] = Math.round(freqArray[i])+"Hz"; // text of shadows  // > Evolution.evolution:63
          ct++;  // > Evolution.evolution:64
         }  // > Evolution.evolution:65
       } else {  // > Evolution.evolution:66
          peakArray[i] = minDecibels;  // > Evolution.evolution:67
       }  // > Evolution.evolution:68
      }  // > Evolution.evolution:69
    }          // > Evolution.evolution:70
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["findlong"]) return;
    // find long  // > Evolution.findlong:1
    var vals = findLong(); // return true,0.30911111 for open pipe  // > Evolution.findlong:2
    if (vals.length != 0) {   // > Evolution.findlong:3
     if (vals[0] == true) // vals[0] is true  // > Evolution.findlong:4
      _view.text.setText("Open pipe with length = " +   // > Evolution.findlong:5
          Math.round(vals[1] * 100) / 100 + " m") ;  // > Evolution.findlong:6
     else if (vals[0] == false) // vals[0] is false  // > Evolution.findlong:7
      _view.text.setText("Closed pipe with length = " +   // > Evolution.findlong:8
          Math.round(vals[1] * 100) / 100  + " m");  // > Evolution.findlong:9
    }  // > Evolution.findlong:10
    else { // add by lookang to address text locked in wrong state  // > Evolution.findlong:11
       _view.text.setText("Blow an open-open or open-closed \nend pipe to analyze the sound");  // > Evolution.findlong:12
      }  // > Evolution.findlong:13
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["resetpeakevery3sec"]) return;
    // reset peaks every 5 seconds  // > Evolution.resetpeakevery3sec:1
    var now = new Date().getTime();  // > Evolution.resetpeakevery3sec:2
    var distance = now - myTime;  // > Evolution.resetpeakevery3sec:3
    if (distance > 5000) {  // > Evolution.resetpeakevery3sec:4
      peakArray = [];  // > Evolution.resetpeakevery3sec:5
      myTime = now;  // > Evolution.resetpeakevery3sec:6
      }  // > Evolution.resetpeakevery3sec:7
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["Size Relations"]) return;
    var rect = document.getElementById("appContainer").getBoundingClientRect();  // > FixedRelations.Size Relations:1
    var rect3 = document.getElementById("topPanel").getBoundingClientRect();  // > FixedRelations.Size Relations:2
    var rect2 = document.getElementById("controlPanel").getBoundingClientRect();  // > FixedRelations.Size Relations:3
        // > FixedRelations.Size Relations:4
    myWidth=window.innerWidth;  // > FixedRelations.Size Relations:5
    myHeight=window.innerHeight;  // > FixedRelations.Size Relations:6
    if (screen.availWidth>screen.availHeight) {//landscape  // > FixedRelations.Size Relations:7
      width=rect.width;  // > FixedRelations.Size Relations:8
      height=window.innerHeight-rect2.height-rect3.height-125;  // > FixedRelations.Size Relations:9
    } else {  // > FixedRelations.Size Relations:10
      width=rect.width;  // > FixedRelations.Size Relations:11
      height=window.innerHeight-rect2.height-rect3.height-125;  // > FixedRelations.Size Relations:12
    }  // > FixedRelations.Size Relations:13
        // > FixedRelations.Size Relations:14
    height=Math.max(height,0);  // negative values not allowed  // > FixedRelations.Size Relations:15
    width=Math.max(width,0);  // > FixedRelations.Size Relations:16
    //console.log("minDecibels="+minDecibels);  // > FixedRelations.Size Relations:17
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

    _model._fontResized = function(iBase,iSize,iDelta) {
      _view._fontResized(iBase,iSize,iDelta);
  }; // end of _fontResized

  function _getViews() {
    var _viewsInfo = [];
    var _counter = 0;
    _viewsInfo[_counter++] = { name : "HtmlView Page", width : 800, height : 600 };
    return _viewsInfo;
  } // end of _getViews

  function _selectView(_viewNumber) {
    _view = null;
    _view = new sound_analyzer_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.configPanel.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'configPanel'
          _view.fftSizeBox.setAction("OnChange", function(_data,_info) {
  fftSize = _view.fftSizeBox.getSelectedOptions()[0];
  setFftSize(fftSize);
  //maximumX = fftSize ; //leong make this control the Xmax too
  //_view.plottingPanel.setProperty("MaximumX",maximumX);// set xmin lowest to 0 
  var opts = _view.fftSizeBox.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if (option=="1024"){
    _view.fftSizeBox.setSelectedOptions([option]);
    }
    
    else if (option=="2048"){
    _view.fftSizeBox.setSelectedOptions([option]);
    }
    else if (option=="4096"){
    _view.fftSizeBox.setSelectedOptions([option]);
    }
    else if (option=="8192"){
    _view.fftSizeBox.setSelectedOptions([option]);
    }
    else if (option=="16384"){
    _view.fftSizeBox.setSelectedOptions([option]);
    }
    else if (option=="32768"){
    _view.fftSizeBox.setSelectedOptions([option]);
    }

}); // HtmlView Page setting action 'OnChange' for element 'fftSizeBox'
          _view.fftSizeBox.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'fftSizeBox'
          _view.baseFreqValue.linkProperty("Value",  function() { return baseFreq; }, function(_v) { baseFreq = _v; } ); // HtmlView Page linking property 'Value' for element 'baseFreqValue'
          _view.baseFreqValue.linkProperty("Font",  function() { return fontaxis; }, function(_v) { fontaxis = _v; } ); // HtmlView Page linking property 'Font' for element 'baseFreqValue'
          _view.maxFreqValue.linkProperty("Value",  function() { return maximumXs; }, function(_v) { maximumXs = _v; } ); // HtmlView Page linking property 'Value' for element 'maxFreqValue'
          _view.maxFreqValue.setAction("OnChange", function(_data,_info) {
  maximumXs=Math.max(maximumXs,5*minimumX);
  maximumXs=Math.min(maximumXs,20000);
  maximumXs=Math.round(maximumXs/100);
  maximumXs*=100;
  maximumX = maximumXs ; //leong
  xaxisself=[];
  var inc=500;
  var xval=500;
  if(maximumX<=1500){
    xval=100;
    inc=100;
  }else if(maximumX>1500  && maximumX<=4000){
    xval=500;
    inc=500;
  }else if(maximumX>4000 && maximumX<=10000){
    xval=1000;
    inc=1000;
  }else if(10000<maximumX){
    xval=1000;
    inc=2000;
  }
  while(xval<maximumX){
    xaxisself.push(xval);
    xval+=inc;
  }
  _view._update();
  _view.plottingPanel.setProperty("MaximumX",maximumX);// set xmin lowest to 0 
  _view._update();

}); // HtmlView Page setting action 'OnChange' for element 'maxFreqValue'
          _view.maxFreqValue.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'maxFreqValue'
          _view.centerPanel.linkProperty("Height",  function() { return height; }, function(_v) { height = _v; } ); // HtmlView Page linking property 'Height' for element 'centerPanel'
          _view.centerPanel.linkProperty("Width",  function() { return width; }, function(_v) { width = _v; } ); // HtmlView Page linking property 'Width' for element 'centerPanel'
          _view.plottingPanel.linkProperty("Height",  function() { return height; }, function(_v) { height = _v; } ); // HtmlView Page linking property 'Height' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("Width",  function() { return width; }, function(_v) { width = _v; } ); // HtmlView Page linking property 'Width' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnResize", function(_data,_info) {
  // fix axis Y
  //_view.plottingPanel.setWorldYMin(minDecibels);
  minDecibels=-80; //force fixed value to get forever minimum Y to be -60 decibels
  _view.plottingPanel.setProperty("MinimumY",Math.max(_view.plottingPanel.getProperty("MinimumY"),-60)); // set ymin to lowest -60
  _view.plottingPanel.setProperty("MinimumX",Math.max(_view.plottingPanel.getProperty("MinimumX"),0));// set xmin lowest to 0 
  // control axis X
  //var minX = _view.plottingPanel.getWorldXMin();
  //if (minX < 0) {
  //  _view.plottingPanel.setWorldXMin(0);
  //}
  maxX = _view.plottingPanel.getWorldXMax();

}); // HtmlView Page setting action 'OnResize' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("XTickStep",  function() { return Math.round(maximumXs/100)*25; } ); // HtmlView Page linking property 'XTickStep' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TitleYFont",  function() { return fontaxis; }, function(_v) { fontaxis = _v; } ); // HtmlView Page linking property 'TitleYFont' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TitleXFont",  function() { return fontaxis; }, function(_v) { fontaxis = _v; } ); // HtmlView Page linking property 'TitleXFont' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumY",  function() { return maxDecibels; }, function(_v) { maxDecibels = _v; } ); // HtmlView Page linking property 'MaximumY' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnDrag", function(_data,_info) {
  // fix axis Y
  //_view.plottingPanel.setWorldYMin(minDecibels);
  minDecibels=-80; //force fixed value to get forever minimum Y to be -60 decibels
  _view.plottingPanel.setProperty("MinimumY",Math.max(_view.plottingPanel.getProperty("MinimumY"),-60)); // set ymin to lowest -60
  _view.plottingPanel.setProperty("MinimumX",Math.max(_view.plottingPanel.getProperty("MinimumX"),0));// set xmin lowest to 0 
  // control axis X
  //var minX = _view.plottingPanel.getWorldXMin();
  //if (minX < 0) {
  //  _view.plottingPanel.setWorldXMin(0);
  //}
  //maxX = _view.plottingPanel.getWorldXMax();
  /* // does not work
  // fix axis Y
  _view.plottingPanel.setWorldYMin(minDecibels);
  _view.plottingPanel.setWorldYMax(maxDecibels);
  // control axis X
  var minX = _view.plottingPanel.getWorldXMin();
  if (minX < 0) {
    _view.plottingPanel.setWorldXMin(0);
  }
  maxX = _view.plottingPanel.getWorldXMax();
  */;

}); // HtmlView Page setting action 'OnDrag' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MaximumX",  function() { return maximumX; }, function(_v) { maximumX = _v; } ); // HtmlView Page linking property 'MaximumX' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnMove", function(_data,_info) {
  //trick to display combobox to correct value set
  var opts = _view.fftSizeBox.getProperty("SelectedOptions");  // array of options
      var option = (opts.length > 0)? opts[0]:""; // selected option 
  if (option=="1024"){
    _view.fftSizeBox.setSelectedOptions(["1024"]);
    }
    
    else if (option=="2048"){
    _view.fftSizeBox.setSelectedOptions(["2048"]);
    }
    else if (option=="4096"){
    _view.fftSizeBox.setSelectedOptions(["4096"]);
    }
    else if (option=="8192"){
    _view.fftSizeBox.setSelectedOptions(["8192"]);
    }
    else if (option=="16384"){
    _view.fftSizeBox.setSelectedOptions(["16384"]);
    }
    else if (option=="32768"){
    _view.fftSizeBox.setSelectedOptions(["32768"]);
    }

}); // HtmlView Page setting action 'OnMove' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumX",  function() { return minimumX; }, function(_v) { minimumX = _v; } ); // HtmlView Page linking property 'MinimumX' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("MinimumY",  function() { return minDecibels; }, function(_v) { minDecibels = _v; } ); // HtmlView Page linking property 'MinimumY' for element 'plottingPanel'
          _view.plottingPanel.setAction("OnZoom", function(_data,_info) {
  // fix axis Y
  //_view.plottingPanel.setWorldYMin(minDecibels);
  minDecibels=-80; //force fixed value to get forever minimum Y to be -60 decibels
  _view.plottingPanel.setProperty("MinimumY",Math.max(_view.plottingPanel.getProperty("MinimumY"),-60)); // set ymin to lowest -60
  _view.plottingPanel.setProperty("MinimumX",Math.max(_view.plottingPanel.getProperty("MinimumX"),0));// set xmin lowest to 0 
  //_view.plottingPanel.setProperty("MaximumX",Math.min(_view.plottingPanel.getProperty("MaximumX"),maximumX));// set xmin lowest to 0 
  // control axis X
  //var minX = _view.plottingPanel.getWorldXMin();
  //if (minX < 0) {
  //  _view.plottingPanel.setWorldXMin(0);
  //}
  //maxX = _view.plottingPanel.getWorldXMax();

}); // HtmlView Page setting action 'OnZoom' for element 'plottingPanel'
          _view.plottingPanel.linkProperty("TitleFont",  function() { return fontaxis; }, function(_v) { fontaxis = _v; } ); // HtmlView Page linking property 'TitleFont' for element 'plottingPanel'
          _view.rightGutter.linkProperty("X",  function() { return maximumXs; }, function(_v) { maximumXs = _v; } ); // HtmlView Page linking property 'X' for element 'rightGutter'
          _view.shadow.linkProperty("MarkSize",  function() { return [_view.plottingPanel.toPixelMod([baseFreq,0])[0],0]; } ); // HtmlView Page linking property 'MarkSize' for element 'shadow'
          _view.shadow.linkProperty("InputX",  function() { return freqArray; }, function(_v) { freqArray = _v; } ); // HtmlView Page linking property 'InputX' for element 'shadow'
          _view.shadow.linkProperty("Visibility",  function() { return peakShadow; }, function(_v) { peakShadow = _v; } ); // HtmlView Page linking property 'Visibility' for element 'shadow'
          _view.shadow.linkProperty("InputY",  function() { return peakArray; }, function(_v) { peakArray = _v; } ); // HtmlView Page linking property 'InputY' for element 'shadow'
          _view.trace.linkProperty("MarkSize",  function() { return [_view.plottingPanel.toPixelMod([baseFreq,0])[0],0]; } ); // HtmlView Page linking property 'MarkSize' for element 'trace'
          _view.trace.linkProperty("InputX",  function() { return freqArray; }, function(_v) { freqArray = _v; } ); // HtmlView Page linking property 'InputX' for element 'trace'
          _view.trace.linkProperty("InputY",  function() { return dbArray; }, function(_v) { dbArray = _v; } ); // HtmlView Page linking property 'InputY' for element 'trace'
          _view.labelSet.linkProperty("X",  function() { return xlabel; }, function(_v) { xlabel = _v; } ); // HtmlView Page linking property 'X' for element 'labelSet'
          _view.labelSet.linkProperty("Y",  function() { return ylabel; }, function(_v) { ylabel = _v; } ); // HtmlView Page linking property 'Y' for element 'labelSet'
          _view.labelSet.linkProperty("Text",  function() { return tlabel; }, function(_v) { tlabel = _v; } ); // HtmlView Page linking property 'Text' for element 'labelSet'
          _view.labelSet.linkProperty("Visibility",  function() { return peakShadow; }, function(_v) { peakShadow = _v; } ); // HtmlView Page linking property 'Visibility' for element 'labelSet'
          _view.labelSet.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'labelSet'
          _view.labelSet.setAction("OnDrag", function(_data,_info) {
  //ylabel[elementinteracted]=_info._point[1];

}); // HtmlView Page setting action 'OnDrag' for element 'labelSet'
          _view.labelSet.linkProperty("ElementInteracted",  function() { return elementinteracted; }, function(_v) { elementinteracted = _v; } ); // HtmlView Page linking property 'ElementInteracted' for element 'labelSet'
          _view.text.linkProperty("X",  function() { return (maximumX-minimumX)/2; } ); // HtmlView Page linking property 'X' for element 'text'
          _view.text.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'text'
          _view.playpause.linkProperty("X",  function() { return (maximumX-minimumX)/2; } ); // HtmlView Page linking property 'X' for element 'playpause'
          _view.playpause.linkProperty("Y",  function() { return maxDecibels-5; } ); // HtmlView Page linking property 'Y' for element 'playpause'
          _view.playpause.linkProperty("Visibility",  function() { return _isPlaying; } ); // HtmlView Page linking property 'Visibility' for element 'playpause'
          _view.playpause.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'playpause'
          _view.playpause2.linkProperty("X",  function() { return (maximumX-minimumX)/2; } ); // HtmlView Page linking property 'X' for element 'playpause2'
          _view.playpause2.linkProperty("Y",  function() { return maxDecibels-5; } ); // HtmlView Page linking property 'Y' for element 'playpause2'
          _view.playpause2.linkProperty("Visibility",  function() { return _isPaused; } ); // HtmlView Page linking property 'Visibility' for element 'playpause2'
          _view.playpause2.linkProperty("Font",  function() { return font; }, function(_v) { font = _v; } ); // HtmlView Page linking property 'Font' for element 'playpause2'
          _view.xaxisLabel.linkProperty("X",  function() { return maximumX-10; } ); // HtmlView Page linking property 'X' for element 'xaxisLabel'
          _view.xaxisLabel.linkProperty("Y",  function() { return minDecibels+5; } ); // HtmlView Page linking property 'Y' for element 'xaxisLabel'
          _view.xaxisLabel.linkProperty("Font",  function() { return fontaxis; }, function(_v) { fontaxis = _v; } ); // HtmlView Page linking property 'Font' for element 'xaxisLabel'
          _view.axisself.linkProperty("NumberOfElements",  function() { return xaxisself.length; } ); // HtmlView Page linking property 'NumberOfElements' for element 'axisself'
          _view.axisself.linkProperty("X",  function() { return xaxisself; }, function(_v) { xaxisself = _v; } ); // HtmlView Page linking property 'X' for element 'axisself'
          _view.axisself.linkProperty("Y",  function() { return minDecibels+1; } ); // HtmlView Page linking property 'Y' for element 'axisself'
          _view.axisself.linkProperty("Text",  function() { return xaxisself; }, function(_v) { xaxisself = _v; } ); // HtmlView Page linking property 'Text' for element 'axisself'
          _view.axisself.linkProperty("Font",  function() { return fontaxis; }, function(_v) { fontaxis = _v; } ); // HtmlView Page linking property 'Font' for element 'axisself'
          _view.controlPanel.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'controlPanel'
          _view.peakShadow.linkProperty("Checked",  function() { return peakShadow; }, function(_v) { peakShadow = _v; } ); // HtmlView Page linking property 'Checked' for element 'peakShadow'
          _view.peakShadow.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'peakShadow'
          _view.runPauseButton.setAction("OffClick", _pause); // HtmlView Page setting action 'OffClick' for element 'runPauseButton'
          _view.runPauseButton.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'runPauseButton'
          _view.runPauseButton.setAction("OnClick", function(_data,_info) {
  play ();
  /*
  init_user_media (function() { 
   // setFftSize(4096); 
   fftSize = _view.fftSizeBox.getSelectedOptions()[0];
  setFftSize(fftSize);
  _play();
  });
  */;

}); // HtmlView Page setting action 'OnClick' for element 'runPauseButton'
          _view.runPauseButton.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'runPauseButton'
          _view.resetButton.setAction("OnClick", function(_data,_info) {
  _reset();

}); // HtmlView Page setting action 'OnClick' for element 'resetButton'
          _view.resetButton.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'resetButton'
          break;
      } // end of switch
    }; // end of new reset

    _model.setView(_view);
    _model.reset();
    _view._enableEPub();
  } // end of _selectView

  _model.setAutoplay(false);
  _model.setFPS(20);
  _model.setStepsPerDisplay(1);
  _selectView(_model._autoSelectView(_getViews())); // this includes _model.reset()
  return _model;
}
function sound_analyzer_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = sound_analyzer_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function sound_analyzer_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"appContainer", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'appContainer'
      .setProperty("Height","100%") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'appContainer'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'appContainer'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"topPanel", _view.appContainer) // EJsS HtmlView.HtmlView Page: declaration of element 'topPanel'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'topPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"labelPanel", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'labelPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"topLabel", _view.labelPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'topLabel'
      .setProperty("Text","<h1>Sound Frequency Analyzer</h1>") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'topLabel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton, "linkToPage", _view.labelPanel)  // EJsS HtmlView.HtmlView Page: declaration of element 'linkToPage'
      .setProperty("Text", "<a href=../index.html style='color: #000080; font-size: 25px; font-weight: bold; '>Go to Piano </a>")  // Set the link text
      .setProperty("Position", "absolute")  
      .setProperty("Top", "30px")  
      .setProperty("Left", "30px")  
      .setProperty("zIndex", "9999")
      ;
    
    document.getElementById("linkToPage").addEventListener('click', function() {
      window.location.href = '../index.html';  // Navigate to the target URL
    });

    _view._addElement(EJSS_INTERFACE.panel,"configPanel", _view.topPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'configPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"fftSizeLabel", _view.configPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'fftSizeLabel'
      .setProperty("Tooltip","FFT size is 1024 and the Sampling Rate is 8192, the resolution of each spectral line will be: 8192 / 1024 = 8 Hz. Larger FFT sizes provide higher spectral resolution but take longer to compute.") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'fftSizeLabel'
      .setProperty("Text","FFT Size (Hz):") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'fftSizeLabel'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"fftSizeBox", _view.configPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'fftSizeBox'
      .setProperty("Options",[128,256, 512, 1024, 2048, 4096, 8192, 16384, 32768]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'fftSizeBox'
      .setProperty("SelectedOptions",[4096]) // EJsS HtmlView.HtmlView Page: setting property 'SelectedOptions' for element 'fftSizeBox'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"baseFreqLabel", _view.configPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'baseFreqLabel'
      .setProperty("Text","Base Freq. (Hz):") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'baseFreqLabel'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'baseFreqLabel'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"baseFreqValue", _view.configPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'baseFreqValue'
      .setProperty("Width","4em") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'baseFreqValue'
      .setProperty("Format","0.0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'baseFreqValue'
      .setProperty("Editable",false) // EJsS HtmlView.HtmlView Page: setting property 'Editable' for element 'baseFreqValue'
      .setProperty("Display","none") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'baseFreqValue'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"maxFreqLabel", _view.configPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'maxFreqLabel'
      .setProperty("Text","Max Freq. (Hz):") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'maxFreqLabel'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"maxFreqValue", _view.configPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'maxFreqValue'
      .setProperty("Width","7vw") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'maxFreqValue'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'maxFreqValue'
      .setProperty("Editable",true) // EJsS HtmlView.HtmlView Page: setting property 'Editable' for element 'maxFreqValue'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"centerPanel", _view.appContainer) // EJsS HtmlView.HtmlView Page: declaration of element 'centerPanel'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'centerPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.centerPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("ShowAreaRectangle",false) // EJsS HtmlView.HtmlView Page: setting property 'ShowAreaRectangle' for element 'plottingPanel'
      .setProperty("Gutters",[0,0,0,0]) // EJsS HtmlView.HtmlView Page: setting property 'Gutters' for element 'plottingPanel'
      .setProperty("EnabledZooming",true) // EJsS HtmlView.HtmlView Page: setting property 'EnabledZooming' for element 'plottingPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'plottingPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'plottingPanel'
      .setProperty("AxisYFont","normal normal 0px ") // EJsS HtmlView.HtmlView Page: setting property 'AxisYFont' for element 'plottingPanel'
      .setProperty("YFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'YFixedTick' for element 'plottingPanel'
      .setProperty("YTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'plottingPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'plottingPanel'
      .setProperty("Title","Sound Visualizer") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'plottingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'plottingPanel'
      .setProperty("EnabledDragging","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledDragging' for element 'plottingPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'plottingPanel'
      .setProperty("TitleY","Power (dB)") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'plottingPanel'
      .setProperty("AxisXFont","normal normal 0px ") // EJsS HtmlView.HtmlView Page: setting property 'AxisXFont' for element 'plottingPanel'
      .setProperty("AutoScaleY",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("TitleX","") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'plottingPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("GuttersColor","White") // EJsS HtmlView.HtmlView Page: setting property 'GuttersColor' for element 'plottingPanel'
      .setProperty("XScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"leftGutter", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'leftGutter'
      .setProperty("FillColor","LightGray") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'leftGutter'
      .setProperty("SizeX",20000) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'leftGutter'
      .setProperty("RelativePosition","EAST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'leftGutter'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'leftGutter'
      .setProperty("Measured",false) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'leftGutter'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'leftGutter'
      .setProperty("DrawLines",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawLines' for element 'leftGutter'
      .setProperty("SizeY",1000) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'leftGutter'
      .setProperty("DrawFill",true) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'leftGutter'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"rightGutter", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'rightGutter'
      .setProperty("FillColor","LightGray") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'rightGutter'
      .setProperty("SizeX",20000) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'rightGutter'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'rightGutter'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'rightGutter'
      .setProperty("Measured",false) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'rightGutter'
      .setProperty("DrawLines",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawLines' for element 'rightGutter'
      .setProperty("SizeY",1000) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'rightGutter'
      .setProperty("DrawFill",true) // EJsS HtmlView.HtmlView Page: setting property 'DrawFill' for element 'rightGutter'
      ;

    _view._addElement(EJSS_DRAWING2D.trace,"shadow", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'shadow'
      .setProperty("MarkFillColor","LightGrey") // EJsS HtmlView.HtmlView Page: setting property 'MarkFillColor' for element 'shadow'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'shadow'
      .setProperty("MarkLineColor","Black") // EJsS HtmlView.HtmlView Page: setting property 'MarkLineColor' for element 'shadow'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'shadow'
      .setProperty("DrawLines",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawLines' for element 'shadow'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'shadow'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'shadow'
      .setProperty("MarkType","AREA") // EJsS HtmlView.HtmlView Page: setting property 'MarkType' for element 'shadow'
      ;

    _view._addElement(EJSS_DRAWING2D.trace,"trace", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'trace'
      .setProperty("MarkType","AREA") // EJsS HtmlView.HtmlView Page: setting property 'MarkType' for element 'trace'
      .setProperty("ClearAtInput",true) // EJsS HtmlView.HtmlView Page: setting property 'ClearAtInput' for element 'trace'
      .setProperty("MarkDrawLines",false) // EJsS HtmlView.HtmlView Page: setting property 'MarkDrawLines' for element 'trace'
      .setProperty("MarkLineWidth",0.5) // EJsS HtmlView.HtmlView Page: setting property 'MarkLineWidth' for element 'trace'
      .setProperty("MarkFillColor","Cyan") // EJsS HtmlView.HtmlView Page: setting property 'MarkFillColor' for element 'trace'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'trace'
      .setProperty("MarkLineColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'MarkLineColor' for element 'trace'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'trace'
      .setProperty("DrawLines",false) // EJsS HtmlView.HtmlView Page: setting property 'DrawLines' for element 'trace'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'trace'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"group", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'group'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"labelSet", _view.group) // EJsS HtmlView.HtmlView Page: declaration of element 'labelSet'
      .setProperty("NumberOfElements",20) // EJsS HtmlView.HtmlView Page: setting property 'NumberOfElements' for element 'labelSet'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'labelSet'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'labelSet'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"text", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'text'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'text'
      .setProperty("Y",-35) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'text'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'text'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"hide", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'hide'
      .setProperty("Visibility",false) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'hide'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"playpause", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'playpause'
      .setProperty("Text","Tab anywhere to pause data") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'playpause'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"playpause2", _view.hide) // EJsS HtmlView.HtmlView Page: declaration of element 'playpause2'
      .setProperty("Text","Tab anywhere to capture data") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'playpause2'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"xaxisLabel", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'xaxisLabel'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'xaxisLabel'
      .setProperty("Text","Frequency / Hz") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'xaxisLabel'
      .setProperty("Visibility",true) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'xaxisLabel'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"axisself", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'axisself'
      .setProperty("RelativePosition","SOUTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'axisself'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'axisself'
      .setProperty("Visibility",true) // EJsS HtmlView.HtmlView Page: setting property 'Visibility' for element 'axisself'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.appContainer) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'controlPanel'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"peakShadow", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'peakShadow'
      .setProperty("Height","4vmax") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'peakShadow'
      .setProperty("Text","Peak") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'peakShadow'
      .setProperty("Display","inline") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'peakShadow'
      .setProperty("MarginTop", "20px") // Add padding on top (if supported)
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"runPauseButton", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'runPauseButton'
      .setProperty("Height","4vmax") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'runPauseButton'
      .setProperty("Width","30%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'runPauseButton'
      .setProperty("TextOn","Press to start ►") // EJsS HtmlView.HtmlView Page: setting property 'TextOn' for element 'runPauseButton'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'runPauseButton'
      .setProperty("TextOff","Press to pause ❚❚") // EJsS HtmlView.HtmlView Page: setting property 'TextOff' for element 'runPauseButton'
      .setProperty("Display","inline") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'runPauseButton'
      .setProperty("MarginTop", "20px") // Add padding on top (if supported)
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton'
      .setProperty("Height","4vmax") // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'resetButton'
      .setProperty("Tooltip","Reset") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'resetButton'
      .setProperty("Text","↻") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'resetButton'
      .setProperty("Display","inline") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'resetButton'
      .setProperty("MarginTop", "20px") // Add padding on top (if supported)
      ;


  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new sound_analyzer("_topFrame","_ejs_library/",null);
          if (typeof _isApp !== "undefined" && _isApp) _model.setRunAlways(true);
          TextResizeDetector.TARGET_ELEMENT_ID = '_topFrame';
          TextResizeDetector.USER_INIT_FUNC = function () {
            var iBase = TextResizeDetector.addEventListener(function(e,args) {
              _model._fontResized(args[0].iBase,args[0].iSize,args[0].iDelta);
              },null);
            _model._fontResized(iBase);
          };
          _model.onload();
        }, false);
