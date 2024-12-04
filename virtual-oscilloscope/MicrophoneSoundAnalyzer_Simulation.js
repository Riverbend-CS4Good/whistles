/* _inputParameters: an object with different values for the model parameters */
function MicrophoneSoundAnalyzer(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
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

  var audioStream; // EjsS Model.Variables.Audio Vars.audioStream
  var audioCtx; // EjsS Model.Variables.Audio Vars.audioCtx
  var npts; // EjsS Model.Variables.Audio Vars.npts
  var tVec; // EjsS Model.Variables.Audio Vars.tVec
  var freqArray; // EjsS Model.Variables.Audio Vars.freqArray
  var maxDecibels; // EjsS Model.Variables.Audio Vars.maxDecibels
  var minDecibels; // EjsS Model.Variables.Audio Vars.minDecibels
  var audioRate; // EjsS Model.Variables.Audio Vars.audioRate
  var baseFreq; // EjsS Model.Variables.Audio Vars.baseFreq
  var maxFreq; // EjsS Model.Variables.Audio Vars.maxFreq
  var minFreq; // EjsS Model.Variables.Audio Vars.minFreq
  var dataArray; // EjsS Model.Variables.Audio Vars.dataArray
  var dbArray; // EjsS Model.Variables.Audio Vars.dbArray
  var peakFreqArray; // EjsS Model.Variables.Audio Vars.peakFreqArray
  var peakDBArray; // EjsS Model.Variables.Audio Vars.peakDBArray
  var peakValsXArray; // EjsS Model.Variables.Audio Vars.peakValsXArray
  var peakValsYArray; // EjsS Model.Variables.Audio Vars.peakValsYArray
  var peakValsArray; // EjsS Model.Variables.Audio Vars.peakValsArray
  var peakThreshold; // EjsS Model.Variables.Audio Vars.peakThreshold

  var hasMicrophone; // EjsS Model.Variables.Constants.hasMicrophone
  var allowMicrophone; // EjsS Model.Variables.Constants.allowMicrophone
  var counter; // EjsS Model.Variables.Constants.counter
  var width; // EjsS Model.Variables.Constants.width
  var height; // EjsS Model.Variables.Constants.height
  var halfheight; // EjsS Model.Variables.Constants.halfheight
  var showPeaks; // EjsS Model.Variables.Constants.showPeaks
  var showMeasure; // EjsS Model.Variables.Constants.showMeasure
  var measureStart; // EjsS Model.Variables.Constants.measureStart
  var measureEnd; // EjsS Model.Variables.Constants.measureEnd
  var freqStart; // EjsS Model.Variables.Constants.freqStart
  var freqEnd; // EjsS Model.Variables.Constants.freqEnd
  var msg; // EjsS Model.Variables.Constants.msg
  var msg2; // EjsS Model.Variables.Constants.msg2
  var fontmenu; // EjsS Model.Variables.Constants.fontmenu
  var scale; // EjsS Model.Variables.Constants.scale
  var titles; // EjsS Model.Variables.Constants.titles
  var mobileDisplay; // EjsS Model.Variables.Constants.mobileDisplay
  var graphDisplay; // EjsS Model.Variables.Constants.graphDisplay
  var myGutters; // EjsS Model.Variables.Constants.myGutters

  _model.getOdes = function() { return []; };

  _model.removeEvents = function(){
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      audioStream : audioStream,
      audioCtx : audioCtx,
      npts : npts,
      tVec : tVec,
      freqArray : freqArray,
      maxDecibels : maxDecibels,
      minDecibels : minDecibels,
      audioRate : audioRate,
      baseFreq : baseFreq,
      maxFreq : maxFreq,
      minFreq : minFreq,
      dataArray : dataArray,
      dbArray : dbArray,
      peakFreqArray : peakFreqArray,
      peakDBArray : peakDBArray,
      peakValsXArray : peakValsXArray,
      peakValsYArray : peakValsYArray,
      peakValsArray : peakValsArray,
      peakThreshold : peakThreshold,
      hasMicrophone : hasMicrophone,
      allowMicrophone : allowMicrophone,
      counter : counter,
      width : width,
      height : height,
      halfheight : halfheight,
      showPeaks : showPeaks,
      showMeasure : showMeasure,
      measureStart : measureStart,
      measureEnd : measureEnd,
      freqStart : freqStart,
      freqEnd : freqEnd,
      msg : msg,
      msg2 : msg2,
      fontmenu : fontmenu,
      scale : scale,
      titles : titles,
      mobileDisplay : mobileDisplay,
      graphDisplay : graphDisplay,
      myGutters : myGutters
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      audioStream : audioStream,
      audioCtx : audioCtx,
      npts : npts,
      tVec : tVec,
      freqArray : freqArray,
      maxDecibels : maxDecibels,
      minDecibels : minDecibels,
      audioRate : audioRate,
      baseFreq : baseFreq,
      maxFreq : maxFreq,
      minFreq : minFreq,
      dataArray : dataArray,
      dbArray : dbArray,
      peakFreqArray : peakFreqArray,
      peakDBArray : peakDBArray,
      peakValsXArray : peakValsXArray,
      peakValsYArray : peakValsYArray,
      peakValsArray : peakValsArray,
      peakThreshold : peakThreshold,
      hasMicrophone : hasMicrophone,
      allowMicrophone : allowMicrophone,
      counter : counter,
      width : width,
      height : height,
      halfheight : halfheight,
      showPeaks : showPeaks,
      showMeasure : showMeasure,
      measureStart : measureStart,
      measureEnd : measureEnd,
      freqStart : freqStart,
      freqEnd : freqEnd,
      msg : msg,
      msg2 : msg2,
      fontmenu : fontmenu,
      scale : scale,
      titles : titles,
      mobileDisplay : mobileDisplay,
      graphDisplay : graphDisplay,
      myGutters : myGutters
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.audioStream != "undefined") audioStream = json.audioStream;
    if(typeof json.audioCtx != "undefined") audioCtx = json.audioCtx;
    if(typeof json.npts != "undefined") npts = json.npts;
    if(typeof json.tVec != "undefined") tVec = json.tVec;
    if(typeof json.freqArray != "undefined") freqArray = json.freqArray;
    if(typeof json.maxDecibels != "undefined") maxDecibels = json.maxDecibels;
    if(typeof json.minDecibels != "undefined") minDecibels = json.minDecibels;
    if(typeof json.audioRate != "undefined") audioRate = json.audioRate;
    if(typeof json.baseFreq != "undefined") baseFreq = json.baseFreq;
    if(typeof json.maxFreq != "undefined") maxFreq = json.maxFreq;
    if(typeof json.minFreq != "undefined") minFreq = json.minFreq;
    if(typeof json.dataArray != "undefined") dataArray = json.dataArray;
    if(typeof json.dbArray != "undefined") dbArray = json.dbArray;
    if(typeof json.peakFreqArray != "undefined") peakFreqArray = json.peakFreqArray;
    if(typeof json.peakDBArray != "undefined") peakDBArray = json.peakDBArray;
    if(typeof json.peakValsXArray != "undefined") peakValsXArray = json.peakValsXArray;
    if(typeof json.peakValsYArray != "undefined") peakValsYArray = json.peakValsYArray;
    if(typeof json.peakValsArray != "undefined") peakValsArray = json.peakValsArray;
    if(typeof json.peakThreshold != "undefined") peakThreshold = json.peakThreshold;
    if(typeof json.hasMicrophone != "undefined") hasMicrophone = json.hasMicrophone;
    if(typeof json.allowMicrophone != "undefined") allowMicrophone = json.allowMicrophone;
    if(typeof json.counter != "undefined") counter = json.counter;
    if(typeof json.width != "undefined") width = json.width;
    if(typeof json.height != "undefined") height = json.height;
    if(typeof json.halfheight != "undefined") halfheight = json.halfheight;
    if(typeof json.showPeaks != "undefined") showPeaks = json.showPeaks;
    if(typeof json.showMeasure != "undefined") showMeasure = json.showMeasure;
    if(typeof json.measureStart != "undefined") measureStart = json.measureStart;
    if(typeof json.measureEnd != "undefined") measureEnd = json.measureEnd;
    if(typeof json.freqStart != "undefined") freqStart = json.freqStart;
    if(typeof json.freqEnd != "undefined") freqEnd = json.freqEnd;
    if(typeof json.msg != "undefined") msg = json.msg;
    if(typeof json.msg2 != "undefined") msg2 = json.msg2;
    if(typeof json.fontmenu != "undefined") fontmenu = json.fontmenu;
    if(typeof json.scale != "undefined") scale = json.scale;
    if(typeof json.titles != "undefined") titles = json.titles;
    if(typeof json.mobileDisplay != "undefined") mobileDisplay = json.mobileDisplay;
    if(typeof json.graphDisplay != "undefined") graphDisplay = json.graphDisplay;
    if(typeof json.myGutters != "undefined") myGutters = json.myGutters;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.audioStream != "undefined") audioStream = json.audioStream;
    if(typeof json.audioCtx != "undefined") audioCtx = json.audioCtx;
    if(typeof json.npts != "undefined") npts = json.npts;
    if(typeof json.tVec != "undefined") tVec = json.tVec;
    if(typeof json.freqArray != "undefined") freqArray = json.freqArray;
    if(typeof json.maxDecibels != "undefined") maxDecibels = json.maxDecibels;
    if(typeof json.minDecibels != "undefined") minDecibels = json.minDecibels;
    if(typeof json.audioRate != "undefined") audioRate = json.audioRate;
    if(typeof json.baseFreq != "undefined") baseFreq = json.baseFreq;
    if(typeof json.maxFreq != "undefined") maxFreq = json.maxFreq;
    if(typeof json.minFreq != "undefined") minFreq = json.minFreq;
    if(typeof json.dataArray != "undefined") dataArray = json.dataArray;
    if(typeof json.dbArray != "undefined") dbArray = json.dbArray;
    if(typeof json.peakFreqArray != "undefined") peakFreqArray = json.peakFreqArray;
    if(typeof json.peakDBArray != "undefined") peakDBArray = json.peakDBArray;
    if(typeof json.peakValsXArray != "undefined") peakValsXArray = json.peakValsXArray;
    if(typeof json.peakValsYArray != "undefined") peakValsYArray = json.peakValsYArray;
    if(typeof json.peakValsArray != "undefined") peakValsArray = json.peakValsArray;
    if(typeof json.peakThreshold != "undefined") peakThreshold = json.peakThreshold;
    if(typeof json.hasMicrophone != "undefined") hasMicrophone = json.hasMicrophone;
    if(typeof json.allowMicrophone != "undefined") allowMicrophone = json.allowMicrophone;
    if(typeof json.counter != "undefined") counter = json.counter;
    if(typeof json.width != "undefined") width = json.width;
    if(typeof json.height != "undefined") height = json.height;
    if(typeof json.halfheight != "undefined") halfheight = json.halfheight;
    if(typeof json.showPeaks != "undefined") showPeaks = json.showPeaks;
    if(typeof json.showMeasure != "undefined") showMeasure = json.showMeasure;
    if(typeof json.measureStart != "undefined") measureStart = json.measureStart;
    if(typeof json.measureEnd != "undefined") measureEnd = json.measureEnd;
    if(typeof json.freqStart != "undefined") freqStart = json.freqStart;
    if(typeof json.freqEnd != "undefined") freqEnd = json.freqEnd;
    if(typeof json.msg != "undefined") msg = json.msg;
    if(typeof json.msg2 != "undefined") msg2 = json.msg2;
    if(typeof json.fontmenu != "undefined") fontmenu = json.fontmenu;
    if(typeof json.scale != "undefined") scale = json.scale;
    if(typeof json.titles != "undefined") titles = json.titles;
    if(typeof json.mobileDisplay != "undefined") mobileDisplay = json.mobileDisplay;
    if(typeof json.graphDisplay != "undefined") graphDisplay = json.graphDisplay;
    if(typeof json.myGutters != "undefined") myGutters = json.myGutters;
  };

  function _unserializePublic(json) { return _model.unserializePublic(json); }

  _model._userUnserializePublic = function(json) {
    _model._readParametersPublic(json);
   _resetSolvers();
   _model.update();
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model._userUnserialize = function(json) {
    _model._readParameters(json);
   _resetSolvers();
   _model.update();
  };

  _model.addToReset(function() {
    __pagesEnabled["Switch Tabs"] = true;
    __pagesEnabled["Init Microphone"] = true;
    __pagesEnabled["Init PWA Height"] = false;
    __pagesEnabled["Init Size"] = true;
    __pagesEnabled["Adjust PWA Height"] = false;
    __pagesEnabled["Adjust Size"] = true;
  });

  _model.addToReset(function() {
    audioStream = undefined; // EjsS Model.Variables.Audio Vars.audioStream
    audioCtx = undefined; // EjsS Model.Variables.Audio Vars.audioCtx
    npts = 1024; // EjsS Model.Variables.Audio Vars.npts
    tVec = new Array(npts); // EjsS Model.Variables.Audio Vars.tVec
    (function () {
      var _i0;
      for (_i0=0; _i0<npts; _i0+=1) {  // EjsS Model.Variables.Audio Vars.tVec
        tVec[_i0] = 0;  // EjsS Model.Variables.Audio Vars.tVec
      }
    }());
    freqArray = new Array(npts/2); // EjsS Model.Variables.Audio Vars.freqArray
    (function () {
      var _i0;
      for (_i0=0; _i0<npts/2; _i0+=1) {  // EjsS Model.Variables.Audio Vars.freqArray
        freqArray[_i0] = 0;  // EjsS Model.Variables.Audio Vars.freqArray
      }
    }());
    maxDecibels = -20; // EjsS Model.Variables.Audio Vars.maxDecibels
    minDecibels = -80; // EjsS Model.Variables.Audio Vars.minDecibels
    audioRate = 44100; // EjsS Model.Variables.Audio Vars.audioRate
    baseFreq = audioRate / npts; // EjsS Model.Variables.Audio Vars.baseFreq
    maxFreq = 10; // EjsS Model.Variables.Audio Vars.maxFreq
    minFreq = 0; // EjsS Model.Variables.Audio Vars.minFreq
    dataArray = []; // EjsS Model.Variables.Audio Vars.dataArray
    dbArray = []; // EjsS Model.Variables.Audio Vars.dbArray
    peakFreqArray = []; // EjsS Model.Variables.Audio Vars.peakFreqArray
    peakDBArray = []; // EjsS Model.Variables.Audio Vars.peakDBArray
    peakValsXArray = []; // EjsS Model.Variables.Audio Vars.peakValsXArray
    peakValsYArray = []; // EjsS Model.Variables.Audio Vars.peakValsYArray
    peakValsArray = []; // EjsS Model.Variables.Audio Vars.peakValsArray
    peakThreshold = -68; // EjsS Model.Variables.Audio Vars.peakThreshold
  });

  _model.addToReset(function() {
    hasMicrophone = false; // EjsS Model.Variables.Constants.hasMicrophone
    allowMicrophone = false; // EjsS Model.Variables.Constants.allowMicrophone
    counter = 0; // EjsS Model.Variables.Constants.counter
    width = 900; // EjsS Model.Variables.Constants.width
    height = 600; // EjsS Model.Variables.Constants.height
    halfheight = height/2; // EjsS Model.Variables.Constants.halfheight
    showPeaks = true; // EjsS Model.Variables.Constants.showPeaks
    showMeasure = false; // EjsS Model.Variables.Constants.showMeasure
    measureStart = 384*npts/audioRate; // EjsS Model.Variables.Constants.measureStart
    measureEnd = 640*npts/audioRate; // EjsS Model.Variables.Constants.measureEnd
    freqStart = 4; // EjsS Model.Variables.Constants.freqStart
    freqEnd = 6; // EjsS Model.Variables.Constants.freqEnd
    msg = "Requesting microphone access."; // EjsS Model.Variables.Constants.msg
    msg2 = ""; // EjsS Model.Variables.Constants.msg2
    fontmenu = "normal normal 1em "; // EjsS Model.Variables.Constants.fontmenu
    scale = 0.25; // EjsS Model.Variables.Constants.scale
    titles = ["Analyzer","About and Help"]; // EjsS Model.Variables.Constants.titles
    mobileDisplay = false; // EjsS Model.Variables.Constants.mobileDisplay
    graphDisplay = 2; // EjsS Model.Variables.Constants.graphDisplay
    myGutters = [55,45,25,45]; // EjsS Model.Variables.Constants.myGutters
  });

  if (_inputParameters) {
    _inputParameters = _model.parseInputParameters(_inputParameters);
    if (_inputParameters) _model.addToReset(function() { _model._readParameters(_inputParameters); });
  }

  _model.addToReset(function() {
    _model.setAutoplay(false);
    _model.setFPS(10);
    _model.setStepsPerDisplay(1);
  });

  function getAudioStream() {  // > CustomCode.Microphone Access:1
    hasMicrophone=false;  // > CustomCode.Microphone Access:2
    try {  // > CustomCode.Microphone Access:3
      if (window.location.protocol != "https:") {  // > CustomCode.Microphone Access:4
        console.log('Insecure http may not be supported.  Use https.');  // > CustomCode.Microphone Access:5
      }                          // > CustomCode.Microphone Access:6
      navigator.mediaDevices.getUserMedia( {  // > CustomCode.Microphone Access:7
        audio: true, video: false  // > CustomCode.Microphone Access:8
      } )  // > CustomCode.Microphone Access:9
      .then(function(stream) {  // > CustomCode.Microphone Access:10
        allowMicrophone=true;  // > CustomCode.Microphone Access:11
        hasMicrophone=true;  // > CustomCode.Microphone Access:12
        audioStream=stream;  // > CustomCode.Microphone Access:13
      } )  // > CustomCode.Microphone Access:14
      .catch(function(err) {  // > CustomCode.Microphone Access:15
        msg2="Media devices promise err: "+err;  // > CustomCode.Microphone Access:16
        console.error(msg2);  // > CustomCode.Microphone Access:17
        allowMicrophone=false;  // > CustomCode.Microphone Access:18
        hasMicrophone=false;  // > CustomCode.Microphone Access:19
        audioStream=undefined;  // > CustomCode.Microphone Access:20
      } );  // > CustomCode.Microphone Access:21
    } catch(err) {  // > CustomCode.Microphone Access:22
       msg2="Media devices API err: "+err;  // > CustomCode.Microphone Access:23
       console.error(msg2);  // > CustomCode.Microphone Access:24
       allowMicrophone=false;  // > CustomCode.Microphone Access:25
       hasMicrophone=false;  // > CustomCode.Microphone Access:26
       audioStream=undefined;  // > CustomCode.Microphone Access:27
    }  // > CustomCode.Microphone Access:28
  }  // > CustomCode.Microphone Access:29
  function checkAudioAccess() {  //  Don't use: navigator.permissions.query not supported yet.  // > CustomCode.Microphone Access:30
    navigator.permissions.query( {  // > CustomCode.Microphone Access:31
      name:'microphone'  // > CustomCode.Microphone Access:32
    } ).then(function(result) {  // > CustomCode.Microphone Access:33
      if (result.state == 'granted') {  // > CustomCode.Microphone Access:34
        console.log("have access");  // > CustomCode.Microphone Access:35
      } else if (result.state == 'prompt') {  // > CustomCode.Microphone Access:36
        console.log("ask for access");  // > CustomCode.Microphone Access:37
      } else if (result.state == 'denied') {  // > CustomCode.Microphone Access:38
        console.log("no access");  // > CustomCode.Microphone Access:39
      }  // > CustomCode.Microphone Access:40
      result.onchange = function() {  // > CustomCode.Microphone Access:41
         console.log("access changed");  // > CustomCode.Microphone Access:42
      } ;  // > CustomCode.Microphone Access:43
    } );  // > CustomCode.Microphone Access:44
  }  // > CustomCode.Microphone Access:45

  function initTimeVec(rate) {  // > CustomCode.Audio Ctx Functions:1
    audioRate=rate;  // > CustomCode.Audio Ctx Functions:2
    let dt=1000.0/rate;  // timechange in ms  // > CustomCode.Audio Ctx Functions:3
    let ti=0;  // > CustomCode.Audio Ctx Functions:4
    for( let i=0; i<tVec.length; i++) {  // > CustomCode.Audio Ctx Functions:5
      tVec[i]=ti;  // > CustomCode.Audio Ctx Functions:6
      ti+=dt;  // > CustomCode.Audio Ctx Functions:7
    }  // > CustomCode.Audio Ctx Functions:8
    baseFreq = rate / freqArray.length; // freqArray.length should be npts/2  // > CustomCode.Audio Ctx Functions:9
    for (i=0; i<freqArray.length; i++) {  // > CustomCode.Audio Ctx Functions:10
      freqArray[i] = i * baseFreq  //frequency in Hz  // > CustomCode.Audio Ctx Functions:11
    }  // > CustomCode.Audio Ctx Functions:12
    //console.log("length"+tVec.length + "  rate: "+rate );  // > CustomCode.Audio Ctx Functions:13
  }  // > CustomCode.Audio Ctx Functions:14
  function initArrays() {  // > CustomCode.Audio Ctx Functions:15
    freqArray = new Array(npts/2);  // > CustomCode.Audio Ctx Functions:16
    dbArray = new Array(npts/2);  // > CustomCode.Audio Ctx Functions:17
    peakArray = new Array(npts/2).fill(minDecibels);  // > CustomCode.Audio Ctx Functions:18
    dataArray = new Uint8Array(npts/2);  // > CustomCode.Audio Ctx Functions:19
    freqArray = new Array(npts/2);  // > CustomCode.Audio Ctx Functions:20
  }  // > CustomCode.Audio Ctx Functions:21
  function closeAudio() {  // > CustomCode.Audio Ctx Functions:22
  if(audioCtx) { // close existing stream and prepare new stream  // > CustomCode.Audio Ctx Functions:23
    audioCtx.close().then(function() {  // > CustomCode.Audio Ctx Functions:24
      audioCtx=undefined;  // > CustomCode.Audio Ctx Functions:25
      audioStream=undefined;  // > CustomCode.Audio Ctx Functions:26
      if(tVec.length!=npts){  // > CustomCode.Audio Ctx Functions:27
        tVec = new Array(npts);  // > CustomCode.Audio Ctx Functions:28
        freqArray=new Array(npts/2);  // > CustomCode.Audio Ctx Functions:29
      }  // > CustomCode.Audio Ctx Functions:30
      getAudioStream();  // > CustomCode.Audio Ctx Functions:31
    } );  // > CustomCode.Audio Ctx Functions:32
  } else {  // > CustomCode.Audio Ctx Functions:33
      audioCtx=undefined;  // > CustomCode.Audio Ctx Functions:34
      audioStream=undefined;  // > CustomCode.Audio Ctx Functions:35
      if(tVec.length!=npts){  // > CustomCode.Audio Ctx Functions:36
        tVec = new Array(npts);  // > CustomCode.Audio Ctx Functions:37
        freqArray=new Array(npts/2);  // > CustomCode.Audio Ctx Functions:38
      }  // > CustomCode.Audio Ctx Functions:39
      getAudioStream();  // > CustomCode.Audio Ctx Functions:40
  }  // > CustomCode.Audio Ctx Functions:41
  }  // > CustomCode.Audio Ctx Functions:42
  function playAudioContext() {  // > CustomCode.Audio Ctx Functions:43
    if(audioCtx){  // > CustomCode.Audio Ctx Functions:44
      //console.log("play state="+audioCtx.state);  // > CustomCode.Audio Ctx Functions:45
      if(audioCtx.state === 'suspended') {  // > CustomCode.Audio Ctx Functions:46
        audioCtx.resume().then(function() {  // > CustomCode.Audio Ctx Functions:47
          console.log("recording resumed new state="+audioCtx.state);  // > CustomCode.Audio Ctx Functions:48
          msg="";  // > CustomCode.Audio Ctx Functions:49
          _play();  // > CustomCode.Audio Ctx Functions:50
        });    // > CustomCode.Audio Ctx Functions:51
      }  // > CustomCode.Audio Ctx Functions:52
    }else { //audioCtx not defined so create it  // > CustomCode.Audio Ctx Functions:53
      //console.log("Create Audio Ctx and play");  // > CustomCode.Audio Ctx Functions:54
      createAudioCtx ();  // > CustomCode.Audio Ctx Functions:55
      //console.log("created state="+audioCtx.state);  // > CustomCode.Audio Ctx Functions:56
       msg="";  // > CustomCode.Audio Ctx Functions:57
      _play();  // > CustomCode.Audio Ctx Functions:58
    }  // > CustomCode.Audio Ctx Functions:59
  }  // > CustomCode.Audio Ctx Functions:60
  function pauseAudioContext() {  // > CustomCode.Audio Ctx Functions:61
    _pause();  // > CustomCode.Audio Ctx Functions:62
    if(!audioCtx)return;  // > CustomCode.Audio Ctx Functions:63
    //console.log("pause state="+audioCtx.state);  // > CustomCode.Audio Ctx Functions:64
    if(audioCtx.state === 'running') {  // > CustomCode.Audio Ctx Functions:65
        audioCtx.suspend().then(function() {  // > CustomCode.Audio Ctx Functions:66
         //console.log("recording suspended new state="+audioCtx.state);  // > CustomCode.Audio Ctx Functions:67
        //_model.update();  // > CustomCode.Audio Ctx Functions:68
        _view._update();  // > CustomCode.Audio Ctx Functions:69
        });  // > CustomCode.Audio Ctx Functions:70
    }  // > CustomCode.Audio Ctx Functions:71
  }  // > CustomCode.Audio Ctx Functions:72
  function createAudioCtx () {  // > CustomCode.Audio Ctx Functions:73
    if(!audioStream) {  // > CustomCode.Audio Ctx Functions:74
      console.error("Audio stream is not defined.");  // > CustomCode.Audio Ctx Functions:75
      return;  // > CustomCode.Audio Ctx Functions:76
    }  // > CustomCode.Audio Ctx Functions:77
    //audioCtx = new AudioContext();  // > CustomCode.Audio Ctx Functions:78
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();  // > CustomCode.Audio Ctx Functions:79
    initTimeVec(audioCtx.sampleRate);  // > CustomCode.Audio Ctx Functions:80
    const analyser = audioCtx.createAnalyser();  // > CustomCode.Audio Ctx Functions:81
    analyser.minDecibels = minDecibels;  // > CustomCode.Audio Ctx Functions:82
    analyser.maxDecibels = maxDecibels;  // > CustomCode.Audio Ctx Functions:83
    analyser.smoothingTimeConstant = 0.85;  // > CustomCode.Audio Ctx Functions:84
    const distortion = audioCtx.createWaveShaper();  // > CustomCode.Audio Ctx Functions:85
    const gainNode = audioCtx.createGain();  // > CustomCode.Audio Ctx Functions:86
    const biquadFilter = audioCtx.createBiquadFilter();  // > CustomCode.Audio Ctx Functions:87
    const convolver = audioCtx.createConvolver();  // > CustomCode.Audio Ctx Functions:88
    const source = audioCtx.createMediaStreamSource(audioStream);  // > CustomCode.Audio Ctx Functions:89
    //FFT code  // > CustomCode.Audio Ctx Functions:90
    source.connect(analyser);  // > CustomCode.Audio Ctx Functions:91
    analyser.connect(distortion);  // > CustomCode.Audio Ctx Functions:92
    distortion.connect(biquadFilter);  // > CustomCode.Audio Ctx Functions:93
    biquadFilter.connect(convolver);  // > CustomCode.Audio Ctx Functions:94
    convolver.connect(gainNode);  // > CustomCode.Audio Ctx Functions:95
    gainNode.connect(audioCtx.destination);  // > CustomCode.Audio Ctx Functions:96
    analyser.fftSize = npts;  // > CustomCode.Audio Ctx Functions:97
    initArrays();  // > CustomCode.Audio Ctx Functions:98
    // audio processor code  // > CustomCode.Audio Ctx Functions:99
    const processor = audioCtx.createScriptProcessor(npts, 1, 1);  // > CustomCode.Audio Ctx Functions:100
    source.connect(processor);  // > CustomCode.Audio Ctx Functions:101
    processor.connect(audioCtx.destination);  // > CustomCode.Audio Ctx Functions:102
    processor.onaudioprocess = function(e) {  // > CustomCode.Audio Ctx Functions:103
      if(_isPaused) return;  // > CustomCode.Audio Ctx Functions:104
      counter++;  // > CustomCode.Audio Ctx Functions:105
      // audio stream  // > CustomCode.Audio Ctx Functions:106
      let audioBuffer=e.inputBuffer;  // > CustomCode.Audio Ctx Functions:107
      rate=audioBuffer.sampleRate;  // > CustomCode.Audio Ctx Functions:108
      let audioVec=audioBuffer.getChannelData(0);  // > CustomCode.Audio Ctx Functions:109
      _view.audioTrace.clear();  // > CustomCode.Audio Ctx Functions:110
      _view.audioTrace.addPoints(tVec, audioVec);  // > CustomCode.Audio Ctx Functions:111
      if(counter<0) {  // set >2 for debugging  // > CustomCode.Audio Ctx Functions:112
        // check to see if recorder is working  // > CustomCode.Audio Ctx Functions:113
        console.log("CTXC sample rate="+audioCtx.sampleRate +"  npts="+npts+ "  baseFreq="+baseFreq);  // > CustomCode.Audio Ctx Functions:114
        console.log("audioVec: "+audioVec );  // > CustomCode.Audio Ctx Functions:115
        console.log("tVec: "+tVec );  // > CustomCode.Audio Ctx Functions:116
        //console.log("freqArray: "+freqArray );  // > CustomCode.Audio Ctx Functions:117
      }  // > CustomCode.Audio Ctx Functions:118
      // frequency stream  // > CustomCode.Audio Ctx Functions:119
      analyser.getByteFrequencyData(dataArray);  // > CustomCode.Audio Ctx Functions:120
      dbArray = Array.from(dataArray);  // > CustomCode.Audio Ctx Functions:121
      for (i=0; i<dataArray.length; i++) {  // > CustomCode.Audio Ctx Functions:122
        dbArray[i] = minDecibels + (dbArray[i] / 255) * Math.abs(minDecibels - maxDecibels);  // > CustomCode.Audio Ctx Functions:123
        freqArray[i] = i * baseFreq/2000.0;  //in KHz  // > CustomCode.Audio Ctx Functions:124
      }  // > CustomCode.Audio Ctx Functions:125
      _view.fftTrace.clear();  // > CustomCode.Audio Ctx Functions:126
      _view.fftTrace.addPoints(freqArray, dbArray);  // > CustomCode.Audio Ctx Functions:127
      findPeaks(freqArray, dbArray);  // > CustomCode.Audio Ctx Functions:128
    }  // > CustomCode.Audio Ctx Functions:129
  }  // > CustomCode.Audio Ctx Functions:130

  function findPeaks(freqArray, dbArray) {  // > CustomCode.Find Peaks:1
    let dpts=freqArray.length-2;  // > CustomCode.Find Peaks:2
    let firstDer= new Array(dpts);  // > CustomCode.Find Peaks:3
    let secondtDer= new Array(dpts);  // > CustomCode.Find Peaks:4
    let df=freqArray[1]-freqArray[0];  // > CustomCode.Find Peaks:5
    let df2=df*df;  // > CustomCode.Find Peaks:6
    for(let i=0; i<dpts; i++) {  // > CustomCode.Find Peaks:7
      firstDer[i]=10*(dbArray[i+1]- dbArray[i-1])/df;  // > CustomCode.Find Peaks:8
      secondtDer[i]=(dbArray[i+1]+ dbArray[i-1]-2*dbArray[i])/df2;  // > CustomCode.Find Peaks:9
    }  // > CustomCode.Find Peaks:10
    peakFreqArray=[];  // > CustomCode.Find Peaks:11
    peakDBArray=[];  // > CustomCode.Find Peaks:12
    peakValsArray=[];  // > CustomCode.Find Peaks:13
    peakValsXArray=[];  // > CustomCode.Find Peaks:14
    peakValsYArray=[];  // > CustomCode.Find Peaks:15
    let plus=false;  // > CustomCode.Find Peaks:16
    for(let i=1; i<dpts; i++) {  // > CustomCode.Find Peaks:17
      let change = plus && (firstDer[i]<0);  // > CustomCode.Find Peaks:18
      if(change && (secondtDer[i]<100)) {  // > CustomCode.Find Peaks:19
        if(dbArray[i]>dbArray[i-1]) {  // > CustomCode.Find Peaks:20
          peakFreqArray.push(freqArray[i]);  // > CustomCode.Find Peaks:21
          peakDBArray.push(80+dbArray[i]);  // > CustomCode.Find Peaks:22
          if(dbArray[i]>peakThreshold) {  // > CustomCode.Find Peaks:23
            peakValsXArray.push(freqArray[i]);  // > CustomCode.Find Peaks:24
            peakValsYArray.push(dbArray[i]+2);  // > CustomCode.Find Peaks:25
            peakValsArray.push(freqArray[i].toFixed(2))  // > CustomCode.Find Peaks:26
          }  // > CustomCode.Find Peaks:27
        } else {  // > CustomCode.Find Peaks:28
          peakFreqArray.push(freqArray[i-1]);  // > CustomCode.Find Peaks:29
          peakDBArray.push(80+dbArray[i-1]);  // > CustomCode.Find Peaks:30
          if(dbArray[i-1]>peakThreshold) {  // > CustomCode.Find Peaks:31
            peakValsXArray.push(freqArray[i-1]);  // > CustomCode.Find Peaks:32
            peakValsYArray.push(dbArray[i-1]+2);  // > CustomCode.Find Peaks:33
            peakValsArray.push(freqArray[i-1].toFixed(2))  // > CustomCode.Find Peaks:34
          }  // > CustomCode.Find Peaks:35
        }  // > CustomCode.Find Peaks:36
      }  // > CustomCode.Find Peaks:37
      plus=(firstDer[i]>0);  // > CustomCode.Find Peaks:38
    }  // > CustomCode.Find Peaks:39
  }  // > CustomCode.Find Peaks:40

  function adjustTimeCursors() {  // > CustomCode.Measure Freq and Time:1
    if(measureStart>measureEnd) {  // > CustomCode.Measure Freq and Time:2
      let temp = measureStart;  // > CustomCode.Measure Freq and Time:3
      measureStart=measureEnd;  // > CustomCode.Measure Freq and Time:4
      measureEnd=temp;  // > CustomCode.Measure Freq and Time:5
    }  // > CustomCode.Measure Freq and Time:6
  }  // > CustomCode.Measure Freq and Time:7
  function adjustFreqCursors() {  // > CustomCode.Measure Freq and Time:8
    if(freqStart>freqEnd) {  // > CustomCode.Measure Freq and Time:9
      let temp = freqStart;  // > CustomCode.Measure Freq and Time:10
      freqStart=freqEnd;  // > CustomCode.Measure Freq and Time:11
      freqEnd=temp;  // > CustomCode.Measure Freq and Time:12
    }  // > CustomCode.Measure Freq and Time:13
  }  // > CustomCode.Measure Freq and Time:14

  function testMediaStream (table) {  // > CustomCode.Test Audio:1
    try {  // > CustomCode.Test Audio:2
      if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&  // > CustomCode.Test Audio:3
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {  // > CustomCode.Test Audio:4
        table.appendRow(['Navigator getUserMedia API= ','not supported']);  // > CustomCode.Test Audio:5
      } else {  // > CustomCode.Test Audio:6
        table.appendRow(['Navigator getUserMedia API= ','supported']);  // > CustomCode.Test Audio:7
      }  // > CustomCode.Test Audio:8
    } catch(err) {  // > CustomCode.Test Audio:9
      table.appendRow(['Navigator getUserMedia API= ','not supported']);  // > CustomCode.Test Audio:10
    }  // > CustomCode.Test Audio:11
      // > CustomCode.Test Audio:12
    try {  // > CustomCode.Test Audio:13
      if (navigator.mediaDevices.getUserMedia) {  // > CustomCode.Test Audio:14
        table.appendRow(['Navigator mediaDevices API= ','supported']);  // > CustomCode.Test Audio:15
      } else {  // > CustomCode.Test Audio:16
        table.appendRow(['Navigator mediaDevices API= ','not supported']);  // > CustomCode.Test Audio:17
      }  // > CustomCode.Test Audio:18
    } catch(err) {  // > CustomCode.Test Audio:19
      table.appendRow(['Navigator mediaDevices API= ','not supported']);  // > CustomCode.Test Audio:20
    }  // > CustomCode.Test Audio:21
  }  // > CustomCode.Test Audio:22
  function requestAudioStream() {  // > CustomCode.Test Audio:23
    testMediaStream (_view.avDataTable);  // > CustomCode.Test Audio:24
    if (navigator.mediaDevices === undefined) navigator.mediaDevices = {  // > CustomCode.Test Audio:25
    } ;  // > CustomCode.Test Audio:26
    if (navigator.mediaDevices.getUserMedia === undefined) {  // > CustomCode.Test Audio:27
      navigator.mediaDevices.getUserMedia = function(constraints) {  // > CustomCode.Test Audio:28
        // Look for legacy getUserMedia, if present  // > CustomCode.Test Audio:29
        var getUserMedia = (navigator.getUserMedia ||  // > CustomCode.Test Audio:30
        navigator.webkitGetUserMedia ||  // > CustomCode.Test Audio:31
        navigator.mozGetUserMedia ||  // > CustomCode.Test Audio:32
        navigator.msGetUserMedia);  // > CustomCode.Test Audio:33
        if (!getUserMedia) {  // > CustomCode.Test Audio:34
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));  // > CustomCode.Test Audio:35
        }  // > CustomCode.Test Audio:36
        return new Promise(function(resolve, reject) {  // > CustomCode.Test Audio:37
          getUserMedia.call(navigator, constraints, resolve, reject);  // > CustomCode.Test Audio:38
        } );  // > CustomCode.Test Audio:39
      }  // > CustomCode.Test Audio:40
    }  // > CustomCode.Test Audio:41
    try {  // > CustomCode.Test Audio:42
      navigator.mediaDevices.getUserMedia( {  // > CustomCode.Test Audio:43
        audio: true, video: false  // > CustomCode.Test Audio:44
      } )  // > CustomCode.Test Audio:45
      .then(function(stream) {  // > CustomCode.Test Audio:46
        audioStream=stream;  // > CustomCode.Test Audio:47
        //console.log("stream found = "+stream);  // > CustomCode.Test Audio:48
        _view.avDataTable.appendRow(['Microphone access= ','granted']);  // > CustomCode.Test Audio:49
        //_view._update();  // > CustomCode.Test Audio:50
        _model.update();  // > CustomCode.Test Audio:51
        _view._update();  // > CustomCode.Test Audio:52
      } )  // > CustomCode.Test Audio:53
      .catch(function(err) {  // > CustomCode.Test Audio:54
        /* handle the error */  // > CustomCode.Test Audio:55
        console.log("audio not found = "+err);  // > CustomCode.Test Audio:56
        audioStream=undefined;  // > CustomCode.Test Audio:57
        _view.avDataTable.appendRow(['Microphone access = ','not granted']);  // > CustomCode.Test Audio:58
        //_view._update();  // > CustomCode.Test Audio:59
        _model.update();  // > CustomCode.Test Audio:60
        _view._update();  // > CustomCode.Test Audio:61
      } );  // > CustomCode.Test Audio:62
    } catch(err) {  // > CustomCode.Test Audio:63
      console.error("Get User Media error: "+err);  // > CustomCode.Test Audio:64
      audioStream=undefined;  // > CustomCode.Test Audio:65
      _view.avDataTable.appendRow(['Get User Media = ','not supported']);  // > CustomCode.Test Audio:66
      //_view._update();  // > CustomCode.Test Audio:67
      _model.update();  // > CustomCode.Test Audio:68
      _view._update();  // > CustomCode.Test Audio:69
    }  // > CustomCode.Test Audio:70
    //_view._update();  // > CustomCode.Test Audio:71
    _model.update();  // > CustomCode.Test Audio:72
    _view._update();  // > CustomCode.Test Audio:73
  }  // > CustomCode.Test Audio:74

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Switch Tabs"]) return;
    document.getElementById("tabbedPanel.ul").addEventListener("click", function(evt) {  // > Initialization.Switch Tabs:1
      var source = evt.srcElement || evt.originalTarget;  // > Initialization.Switch Tabs:2
       evt.stopPropagation();  // > Initialization.Switch Tabs:3
      //alert("id="+source.id);  // > Initialization.Switch Tabs:4
      console.log("id="+source.id);  // > Initialization.Switch Tabs:5
      if(source.id==="tabbedPanel.item.a.1") {  // > Initialization.Switch Tabs:6
        console.log("stop now");  // > Initialization.Switch Tabs:7
        pauseAudioContext();  // > Initialization.Switch Tabs:8
        closeAudio();  // > Initialization.Switch Tabs:9
      }  // > Initialization.Switch Tabs:10
    } );  // > Initialization.Switch Tabs:11
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Microphone"]) return;
    peakFreqArray=[];  // > Initialization.Init Microphone:1
    peakDBArray=[];  // > Initialization.Init Microphone:2
    peakValsArray=[];  // > Initialization.Init Microphone:3
    peakValsXArray=[];  // > Initialization.Init Microphone:4
    peakValsYArray=[];  // > Initialization.Init Microphone:5
         // > Initialization.Init Microphone:6
    if(audioCtx) { // close existing stream and then get new stream  // > Initialization.Init Microphone:7
      audioCtx.close().then(function() {  // > Initialization.Init Microphone:8
        audioCtx=undefined;  // > Initialization.Init Microphone:9
        getAudioStream();  // > Initialization.Init Microphone:10
      } );  // > Initialization.Init Microphone:11
    } else {  // > Initialization.Init Microphone:12
      getAudioStream();  // > Initialization.Init Microphone:13
      msg="Press play button to start."  // > Initialization.Init Microphone:14
    }  // > Initialization.Init Microphone:15
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init PWA Height"]) return;
    myGutters=mobileDisplay?[55,10,5,45]:[55,45,25,45];  // > Initialization.Init PWA Height:1
    var rect2 = document.getElementById("controlPanel").getBoundingClientRect();  // > Initialization.Init PWA Height:2
    var rect3 = document.getElementById("checkPanel").getBoundingClientRect();  // > Initialization.Init PWA Height:3
    height=0.9*window.innerHeight-rect2.height-rect3.height-10;  // > Initialization.Init PWA Height:4
    height=Math.max(height,100);  // negative values not allowed  // > Initialization.Init PWA Height:5
  });

  _model.addToInitialization(function() {
    if (!__pagesEnabled["Init Size"]) return;
    width=0.90*window.innerWidth;  // > Initialization.Init Size:1
    width=Math.max(width,100);  // > Initialization.Init Size:2
    halfheight=(graphDisplay==2)?height/2: height;  // > Initialization.Init Size:3
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["Adjust PWA Height"]) return;
    myGutters=mobileDisplay?[55,10,5,45]:[55,45,25,45];  // > FixedRelations.Adjust PWA Height:1
    var rect2 = document.getElementById("controlPanel").getBoundingClientRect();  // > FixedRelations.Adjust PWA Height:2
    var rect3 = document.getElementById("checkPanel").getBoundingClientRect();  // > FixedRelations.Adjust PWA Height:3
    height=0.9*window.innerHeight-rect2.height-rect3.height-10;  // > FixedRelations.Adjust PWA Height:4
    height=Math.max(height,100);  // negative values not allowed  // > FixedRelations.Adjust PWA Height:5
  });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["Adjust Size"]) return;
    halfheight=(graphDisplay==2)?height/2: height;  // > FixedRelations.Adjust Size:1
    width=0.90*window.innerWidth;  // > FixedRelations.Adjust Size:2
    width=Math.max(width,100);  // > FixedRelations.Adjust Size:3
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
    _view = new MicrophoneSoundAnalyzer_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view._setRootProperty(_model,"OnBlur",function(_data,_info) {
  pauseAudioContext();
  closeAudio();

}); // HtmlView Page setting property 'OnBlur' for root element
          _view.tabbedPanel.linkProperty("Height",  function() { return height; }, function(_v) { height = _v; } ); // HtmlView Page linking property 'Height' for element 'tabbedPanel'
          _view.tabbedPanel.linkProperty("Width",  function() { return width; }, function(_v) { width = _v; } ); // HtmlView Page linking property 'Width' for element 'tabbedPanel'
          _view.tabbedPanel.linkProperty("Titles",  function() { return titles; }, function(_v) { titles = _v; } ); // HtmlView Page linking property 'Titles' for element 'tabbedPanel'
          _view.tabbedPanel.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'tabbedPanel'
          _view.checkPanel.linkProperty("Visibility",  function() { return !mobileDisplay || _isPaused; } ); // HtmlView Page linking property 'Visibility' for element 'checkPanel'
          _view.checkPanel.linkProperty("Display",  function() { return (!mobileDisplay || _isPaused)?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'checkPanel'
          _view.titleLabel2.linkProperty("Text",  function() { return mobileDisplay?"Sound Analyzer":"Microphone Sound Analyzer"; } ); // HtmlView Page linking property 'Text' for element 'titleLabel2'
          _view.graphLabel.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'graphLabel'
          _view.audioButton.linkProperty("Checked",  function() { return graphDisplay==0; } ); // HtmlView Page linking property 'Checked' for element 'audioButton'
          _view.audioButton.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'audioButton'
          _view.audioButton.setAction("OnCheckOn", function(_data,_info) {
  graphDisplay=0;

}); // HtmlView Page setting action 'OnCheckOn' for element 'audioButton'
          _view.freqButton.linkProperty("Checked",  function() { return graphDisplay==1; } ); // HtmlView Page linking property 'Checked' for element 'freqButton'
          _view.freqButton.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'freqButton'
          _view.freqButton.setAction("OnCheckOn", function(_data,_info) {
  graphDisplay=1;

}); // HtmlView Page setting action 'OnCheckOn' for element 'freqButton'
          _view.bothButton.linkProperty("Checked",  function() { return graphDisplay==2; } ); // HtmlView Page linking property 'Checked' for element 'bothButton'
          _view.bothButton.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'bothButton'
          _view.bothButton.setAction("OnCheckOn", function(_data,_info) {
  graphDisplay=2;

}); // HtmlView Page setting action 'OnCheckOn' for element 'bothButton'
          _view.mainPanel.linkProperty("Width",  function() { return width; }, function(_v) { width = _v; } ); // HtmlView Page linking property 'Width' for element 'mainPanel'
          _view.fftPanel.linkProperty("Height",  function() { return halfheight; }, function(_v) { halfheight = _v; } ); // HtmlView Page linking property 'Height' for element 'fftPanel'
          _view.fftPanel.linkProperty("Width",  function() { return width; }, function(_v) { width = _v; } ); // HtmlView Page linking property 'Width' for element 'fftPanel'
          _view.fftPanel.linkProperty("Gutters",  function() { return myGutters; }, function(_v) { myGutters = _v; } ); // HtmlView Page linking property 'Gutters' for element 'fftPanel'
          _view.fftPanel.linkProperty("MaximumY",  function() { return maxDecibels; }, function(_v) { maxDecibels = _v; } ); // HtmlView Page linking property 'MaximumY' for element 'fftPanel'
          _view.fftPanel.linkProperty("MaximumX",  function() { return maxFreq; }, function(_v) { maxFreq = _v; } ); // HtmlView Page linking property 'MaximumX' for element 'fftPanel'
          _view.fftPanel.linkProperty("YFixedTick",  function() { return minDecibels; }, function(_v) { minDecibels = _v; } ); // HtmlView Page linking property 'YFixedTick' for element 'fftPanel'
          _view.fftPanel.linkProperty("MinimumX",  function() { return minFreq; }, function(_v) { minFreq = _v; } ); // HtmlView Page linking property 'MinimumX' for element 'fftPanel'
          _view.fftPanel.linkProperty("MinimumY",  function() { return minDecibels; }, function(_v) { minDecibels = _v; } ); // HtmlView Page linking property 'MinimumY' for element 'fftPanel'
          _view.fftPanel.linkProperty("XTickStep",  function() { return maxFreq<7?0.5:2; } ); // HtmlView Page linking property 'XTickStep' for element 'fftPanel'
          _view.fftPanel.linkProperty("Visibility",  function() { return graphDisplay!=0; } ); // HtmlView Page linking property 'Visibility' for element 'fftPanel'
          _view.fftPanel.linkProperty("Display",  function() { return graphDisplay!=0?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'fftPanel'
          _view.fftTrace.linkProperty("Maximum",  function() { return npts; }, function(_v) { npts = _v; } ); // HtmlView Page linking property 'Maximum' for element 'fftTrace'
          _view.peakGroup.linkProperty("Visibility",  function() { return showPeaks&& peakValsArray && peakValsArray.length>0; } ); // HtmlView Page linking property 'Visibility' for element 'peakGroup'
          _view.peakSet.linkProperty("NumberOfElements",  function() { return peakFreqArray.length; } ); // HtmlView Page linking property 'NumberOfElements' for element 'peakSet'
          _view.peakSet.linkProperty("X",  function() { return peakFreqArray; }, function(_v) { peakFreqArray = _v; } ); // HtmlView Page linking property 'X' for element 'peakSet'
          _view.peakSet.linkProperty("Y",  function() { return minDecibels; }, function(_v) { minDecibels = _v; } ); // HtmlView Page linking property 'Y' for element 'peakSet'
          _view.peakSet.linkProperty("SizeY",  function() { return peakDBArray; }, function(_v) { peakDBArray = _v; } ); // HtmlView Page linking property 'SizeY' for element 'peakSet'
          _view.fvaluesSet.linkProperty("NumberOfElements",  function() { return peakValsArray.length; } ); // HtmlView Page linking property 'NumberOfElements' for element 'fvaluesSet'
          _view.fvaluesSet.linkProperty("X",  function() { return peakValsXArray; }, function(_v) { peakValsXArray = _v; } ); // HtmlView Page linking property 'X' for element 'fvaluesSet'
          _view.fvaluesSet.linkProperty("Y",  function() { return peakValsYArray; }, function(_v) { peakValsYArray = _v; } ); // HtmlView Page linking property 'Y' for element 'fvaluesSet'
          _view.fvaluesSet.linkProperty("Text",  function() { return peakValsArray; }, function(_v) { peakValsArray = _v; } ); // HtmlView Page linking property 'Text' for element 'fvaluesSet'
          _view.fvaluesSet.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'fvaluesSet'
          _view.freqGroup.linkProperty("Visibility",  function() { return showMeasure; }, function(_v) { showMeasure = _v; } ); // HtmlView Page linking property 'Visibility' for element 'freqGroup'
          _view.startFreqCursor.setAction("OnRelease", function(_data,_info) {
  adjustFreqCursors();

}); // HtmlView Page setting action 'OnRelease' for element 'startFreqCursor'
          _view.startFreqCursor.linkProperty("X",  function() { return freqStart; }, function(_v) { freqStart = _v; } ); // HtmlView Page linking property 'X' for element 'startFreqCursor'
          _view.endFreqCursor.setAction("OnRelease", function(_data,_info) {
  adjustFreqCursors();

}); // HtmlView Page setting action 'OnRelease' for element 'endFreqCursor'
          _view.endFreqCursor.linkProperty("X",  function() { return freqEnd; }, function(_v) { freqEnd = _v; } ); // HtmlView Page linking property 'X' for element 'endFreqCursor'
          _view.arrowFreq.linkProperty("SizeX",  function() { return freqEnd-freqStart; } ); // HtmlView Page linking property 'SizeX' for element 'arrowFreq'
          _view.arrowFreq.linkProperty("X",  function() { return freqStart; }, function(_v) { freqStart = _v; } ); // HtmlView Page linking property 'X' for element 'arrowFreq'
          _view.Df.linkProperty("X",  function() { return (freqStart+freqEnd)/2; } ); // HtmlView Page linking property 'X' for element 'Df'
          _view.Df.linkProperty("Text",  function() { return "\u0394f="+(freqEnd-freqStart).toFixed(2)+" kHz"; } ); // HtmlView Page linking property 'Text' for element 'Df'
          _view.audioPanel.linkProperty("Height",  function() { return halfheight; }, function(_v) { halfheight = _v; } ); // HtmlView Page linking property 'Height' for element 'audioPanel'
          _view.audioPanel.linkProperty("Width",  function() { return width; }, function(_v) { width = _v; } ); // HtmlView Page linking property 'Width' for element 'audioPanel'
          _view.audioPanel.linkProperty("Gutters",  function() { return myGutters; }, function(_v) { myGutters = _v; } ); // HtmlView Page linking property 'Gutters' for element 'audioPanel'
          _view.audioPanel.linkProperty("MaximumY",  function() { return scale; }, function(_v) { scale = _v; } ); // HtmlView Page linking property 'MaximumY' for element 'audioPanel'
          _view.audioPanel.linkProperty("MaximumX",  function() { return 1000*npts/audioRate; } ); // HtmlView Page linking property 'MaximumX' for element 'audioPanel'
          _view.audioPanel.linkProperty("MinimumY",  function() { return -scale; } ); // HtmlView Page linking property 'MinimumY' for element 'audioPanel'
          _view.audioPanel.linkProperty("Visibility",  function() { return graphDisplay!=1; } ); // HtmlView Page linking property 'Visibility' for element 'audioPanel'
          _view.audioPanel.linkProperty("BRMessage",  function() { return msg; }, function(_v) { msg = _v; } ); // HtmlView Page linking property 'BRMessage' for element 'audioPanel'
          _view.audioPanel.linkProperty("Display",  function() { return graphDisplay!=1?"block":"none"; } ); // HtmlView Page linking property 'Display' for element 'audioPanel'
          _view.timeGroup.linkProperty("Visibility",  function() { return showMeasure; }, function(_v) { showMeasure = _v; } ); // HtmlView Page linking property 'Visibility' for element 'timeGroup'
          _view.startTimeCursor.setAction("OnRelease", function(_data,_info) {
  adjustTimeCursors();

}); // HtmlView Page setting action 'OnRelease' for element 'startTimeCursor'
          _view.startTimeCursor.linkProperty("X",  function() { return measureStart; }, function(_v) { measureStart = _v; } ); // HtmlView Page linking property 'X' for element 'startTimeCursor'
          _view.endTimeCursor.setAction("OnRelease", function(_data,_info) {
  adjustTimeCursors();

}); // HtmlView Page setting action 'OnRelease' for element 'endTimeCursor'
          _view.endTimeCursor.linkProperty("X",  function() { return measureEnd; }, function(_v) { measureEnd = _v; } ); // HtmlView Page linking property 'X' for element 'endTimeCursor'
          _view.arrowTime.linkProperty("SizeX",  function() { return measureEnd-measureStart; } ); // HtmlView Page linking property 'SizeX' for element 'arrowTime'
          _view.arrowTime.linkProperty("X",  function() { return measureStart; }, function(_v) { measureStart = _v; } ); // HtmlView Page linking property 'X' for element 'arrowTime'
          _view.Dt.linkProperty("X",  function() { return (measureStart+measureEnd)/2; } ); // HtmlView Page linking property 'X' for element 'Dt'
          _view.Dt.linkProperty("Text",  function() { return "\u0394t="+(measureEnd-measureStart).toFixed(2)+" ms"; } ); // HtmlView Page linking property 'Text' for element 'Dt'
          _view.audioTrace.linkProperty("Maximum",  function() { return npts; }, function(_v) { npts = _v; } ); // HtmlView Page linking property 'Maximum' for element 'audioTrace'
          _view.controlPanel.linkProperty("Width",  function() { return width; }, function(_v) { width = _v; } ); // HtmlView Page linking property 'Width' for element 'controlPanel'
          _view.runPauseButton.setAction("OffClick", function(_data,_info) {
  pauseAudioContext();
  closeAudio();
  titles=["Analyzer","About and Help"];

}); // HtmlView Page setting action 'OffClick' for element 'runPauseButton'
          _view.runPauseButton.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'runPauseButton'
          _view.runPauseButton.setAction("OnClick", function(_data,_info) {
  playAudioContext();
  titles="";

}); // HtmlView Page setting action 'OnClick' for element 'runPauseButton'
          _view.resetButton.setAction("OnClick", function(_data,_info) {
  if(audioCtx) { // close existing stream and then get new stream
    audioCtx.close().then(function() {
      _reset();
    } );
  }else{
    _reset();
  }

}); // HtmlView Page setting action 'OnClick' for element 'resetButton'
          _view.measureCheck.linkProperty("Checked",  function() { return showMeasure; }, function(_v) { showMeasure = _v; } ); // HtmlView Page linking property 'Checked' for element 'measureCheck'
          _view.scaleFreqLabel.linkProperty("Text",  function() { return mobileDisplay?"Scale:":"Amp Scale:"; } ); // HtmlView Page linking property 'Text' for element 'scaleFreqLabel'
          _view.scaleFreqLabel.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'scaleFreqLabel'
          _view.scaleField.linkProperty("Value",  function() { return scale; }, function(_v) { scale = _v; } ); // HtmlView Page linking property 'Value' for element 'scaleField'
          _view.scaleField.setAction("OnChange", function(_data,_info) {
  scale=Math.min(scale,10);
  scale=Math.max(scale,0.01);

}); // HtmlView Page setting action 'OnChange' for element 'scaleField'
          _view.scaleField.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'scaleField'
          _view.minDecible.linkProperty("Text",  function() { return mobileDisplay?"dB: min":"Decible: min"; } ); // HtmlView Page linking property 'Text' for element 'minDecible'
          _view.minDecible.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'minDecible'
          _view.minDecibleField.linkProperty("Value",  function() { return minDecibels; }, function(_v) { minDecibels = _v; } ); // HtmlView Page linking property 'Value' for element 'minDecibleField'
          _view.minDecibleField.setAction("OnChange", function(_data,_info) {
  minDecibels=Math.round(minDecibels);// only integers
  minDecibels=Math.min(maxDecibels-20, minDecibels);
  minDecibels=Math.max(minDecibels, -100);
  minDecibels=Math.min(minDecibels, -40);

}); // HtmlView Page setting action 'OnChange' for element 'minDecibleField'
          _view.minDecibleField.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'minDecibleField'
          _view.maxDecible.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'maxDecible'
          _view.maxDecibleField.linkProperty("Value",  function() { return maxDecibels; }, function(_v) { maxDecibels = _v; } ); // HtmlView Page linking property 'Value' for element 'maxDecibleField'
          _view.maxDecibleField.setAction("OnChange", function(_data,_info) {
  maxDecibels=Math.round(maxDecibels);// only integers
  maxDecibels=Math.max(maxDecibels, minDecibels+20);
  maxDecibels=Math.min(maxDecibels, 0);
  maxDecibels=Math.max(maxDecibels, -60);

}); // HtmlView Page setting action 'OnChange' for element 'maxDecibleField'
          _view.maxDecibleField.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'maxDecibleField'
          _view.peaksCheck.linkProperty("Checked",  function() { return showPeaks; }, function(_v) { showPeaks = _v; } ); // HtmlView Page linking property 'Checked' for element 'peaksCheck'
          _view.peaksCheck.linkProperty("Text",  function() { return mobileDisplay?"Peaks":"Show peaks:"; } ); // HtmlView Page linking property 'Text' for element 'peaksCheck'
          _view.peaksCheck.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'peaksCheck'
          _view.thresholdDecible.linkProperty("Text",  function() { return mobileDisplay?"threshold":"peak threshold"; } ); // HtmlView Page linking property 'Text' for element 'thresholdDecible'
          _view.thresholdDecible.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'thresholdDecible'
          _view.thresholdField.linkProperty("Value",  function() { return peakThreshold; }, function(_v) { peakThreshold = _v; } ); // HtmlView Page linking property 'Value' for element 'thresholdField'
          _view.thresholdField.setAction("OnChange", function(_data,_info) {
  peakThreshold=Math.round(peakThreshold);
  peakThreshold=Math.max(peakThreshold, -100);
  peakThreshold=Math.min(peakThreshold, -20);

}); // HtmlView Page setting action 'OnChange' for element 'thresholdField'
          _view.thresholdField.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'thresholdField'
          _view.minFreqLabel.linkProperty("Text",  function() { return mobileDisplay?"kHz: min":"    Frequency (kHz): min"; } ); // HtmlView Page linking property 'Text' for element 'minFreqLabel'
          _view.minFreqLabel.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'minFreqLabel'
          _view.minFreqField.linkProperty("Value",  function() { return minFreq; }, function(_v) { minFreq = _v; } ); // HtmlView Page linking property 'Value' for element 'minFreqField'
          _view.minFreqField.setAction("OnChange", function(_data,_info) {
  minFreq=Math.min(minFreq,maxFreq-2);
  minFreq=Math.max(minFreq,0);
  freqStart=Math.min(freqStart,minFreq);

}); // HtmlView Page setting action 'OnChange' for element 'minFreqField'
          _view.minFreqField.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'minFreqField'
          _view.maxFreqLabel.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'maxFreqLabel'
          _view.maxFreqField.linkProperty("Value",  function() { return maxFreq; }, function(_v) { maxFreq = _v; } ); // HtmlView Page linking property 'Value' for element 'maxFreqField'
          _view.maxFreqField.setAction("OnChange", function(_data,_info) {
  maxFreq=Math.max(maxFreq, minFreq+2);
  maxFreq=Math.min(maxFreq,npts*baseFreq/500.0);
  maxFreq=Math.min(maxFreq,40);
  freqEnd=Math.min(freqEnd,maxFreq);

}); // HtmlView Page setting action 'OnChange' for element 'maxFreqField'
          _view.maxFreqField.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'maxFreqField'
          _view.ptsLabel.linkProperty("Text",  function() { return mobileDisplay?"#":"# Points:"; } ); // HtmlView Page linking property 'Text' for element 'ptsLabel'
          _view.ptsLabel.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'ptsLabel'
          _view.ptsBox.setAction("OnChange", function(_data,_info) {
  npts = parseInt(_view.ptsBox.getSelectedOptions()[0]);
  counter=0;
  var opts = _view.ptsBox.getProperty("SelectedOptions");  // array of options
  var option = (opts.length > 0)? opts[0]:""; // selected option
  _view.ptsBox.setSelectedOptions([option]);
  if(audioCtx) {
    // close existing stream and get new stream
    audioCtx.close().then(function() {
      audioCtx=undefined;
      audioStream=undefined;
      tVec = new Array(npts);
      freqArray=new Array(npts/2);
      _initialize();
    } );
  } else {
      audioCtx=undefined;
      audioStream=undefined;
      tVec = new Array(npts);
      freqArray=new Array(npts/2);
      _initialize();
  }

}); // HtmlView Page setting action 'OnChange' for element 'ptsBox'
          _view.ptsBox.linkProperty("Disabled",  function() { return !_isPaused; } ); // HtmlView Page linking property 'Disabled' for element 'ptsBox'
          _view.ptsBox.linkProperty("Font",  function() { return fontmenu; }, function(_v) { fontmenu = _v; } ); // HtmlView Page linking property 'Font' for element 'ptsBox'
          _view.mobileCheck.linkProperty("Checked",  function() { return mobileDisplay; }, function(_v) { mobileDisplay = _v; } ); // HtmlView Page linking property 'Checked' for element 'mobileCheck'
          _view.avDataTable.linkProperty("HeadersText",  function() { return ["Property","Value"]; } ); // HtmlView Page linking property 'HeadersText' for element 'avDataTable'
          _view.audioPermissioButton.setAction("OnClick", function(_data,_info) {
  requestAudioStream() ;

}); // HtmlView Page setting action 'OnClick' for element 'audioPermissioButton'
          break;
      } // end of switch
    }; // end of new reset

    _model.setView(_view);
    _model.reset();
    _view._enableEPub();
  } // end of _selectView

  _model.setAutoplay(false);
  _model.setFPS(10);
  _model.setStepsPerDisplay(1);
  _selectView(_model._autoSelectView(_getViews())); // this includes _model.reset()
  return _model;
}
function MicrophoneSoundAnalyzer_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = MicrophoneSoundAnalyzer_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);


  return _view;
} // end of main function

function MicrophoneSoundAnalyzer_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.tabbedPanel,"tabbedPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'tabbedPanel'
      .setProperty("FillColor","Pink") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'tabbedPanel'
      .setProperty("CSS",{"margin-top" : "0px", "margin-bottom" : "0px"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'tabbedPanel'
      .setProperty("BorderStyle","solid") // EJsS HtmlView.HtmlView Page: setting property 'BorderStyle' for element 'tabbedPanel'
      .setProperty("BorderColor","LightGray") // EJsS HtmlView.HtmlView Page: setting property 'BorderColor' for element 'tabbedPanel'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'tabbedPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"appPanel", _view.tabbedPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'appPanel'
      .setProperty("Width","100%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'appPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"checkPanel", _view.appPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'checkPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"graphDisplay", _view.checkPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'graphDisplay'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'graphDisplay'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"titleLabel2", _view.graphDisplay) // EJsS HtmlView.HtmlView Page: declaration of element 'titleLabel2'
      .setProperty("Foreground","red") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'titleLabel2'
      .setProperty("Font","normal bold 16px ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'titleLabel2'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"graphLabel", _view.graphDisplay) // EJsS HtmlView.HtmlView Page: declaration of element 'graphLabel'
      .setProperty("Text","Show:") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'graphLabel'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"audioButton", _view.graphDisplay) // EJsS HtmlView.HtmlView Page: declaration of element 'audioButton'
      .setProperty("Text","audio") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'audioButton'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"freqButton", _view.graphDisplay) // EJsS HtmlView.HtmlView Page: declaration of element 'freqButton'
      .setProperty("Text","freq.") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'freqButton'
      ;

    _view._addElement(EJSS_INTERFACE.radioButton,"bothButton", _view.graphDisplay) // EJsS HtmlView.HtmlView Page: declaration of element 'bothButton'
      .setProperty("Text","both") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'bothButton'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"mainPanel", _view.appPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'mainPanel'
      .setProperty("CSS",{"display":"block"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'mainPanel'
      .setProperty("Display","block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'mainPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"fftPanel", _view.mainPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'fftPanel'
      .setProperty("YScalePrecision",0) // EJsS HtmlView.HtmlView Page: setting property 'YScalePrecision' for element 'fftPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'fftPanel'
      .setProperty("Title","Frequency Spectrum") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'fftPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'fftPanel'
      .setProperty("SquareAspect",false) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'fftPanel'
      .setProperty("YAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'YAutoTicks' for element 'fftPanel'
      .setProperty("TitleY","audio level (dB)") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'fftPanel'
      .setProperty("YTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'YTickStep' for element 'fftPanel'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'fftPanel'
      .setProperty("TitleX","f (Hz)") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'fftPanel'
      .setProperty("AutoScaleX",false) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'fftPanel'
      .setProperty("XAutoTicks",false) // EJsS HtmlView.HtmlView Page: setting property 'XAutoTicks' for element 'fftPanel'
      .setProperty("XScalePrecision",1) // EJsS HtmlView.HtmlView Page: setting property 'XScalePrecision' for element 'fftPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.trace,"fftTrace", _view.fftPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'fftTrace'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'fftTrace'
      .setProperty("DrawLines",true) // EJsS HtmlView.HtmlView Page: setting property 'DrawLines' for element 'fftTrace'
      .setProperty("NoRepeat",false) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'fftTrace'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'fftTrace'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"peakGroup", _view.fftPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'peakGroup'
      ;

    _view._addElement(EJSS_DRAWING2D.arrowSet,"peakSet", _view.peakGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'peakSet'
      .setProperty("MarkEnd","POINTED") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'peakSet'
      .setProperty("SizeX",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'peakSet'
      .setProperty("LineColor","DarkGray") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'peakSet'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'peakSet'
      .setProperty("Offset","SOUTH_WEST") // EJsS HtmlView.HtmlView Page: setting property 'Offset' for element 'peakSet'
      ;

    _view._addElement(EJSS_DRAWING2D.textSet,"fvaluesSet", _view.peakGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'fvaluesSet'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'fvaluesSet'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'fvaluesSet'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"freqGroup", _view.fftPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'freqGroup'
      ;

    _view._addElement(EJSS_DRAWING2D.cursor,"startFreqCursor", _view.freqGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'startFreqCursor'
      .setProperty("Sensitivity",8) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'startFreqCursor'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'startFreqCursor'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'startFreqCursor'
      .setProperty("CursorType","VERTICAL") // EJsS HtmlView.HtmlView Page: setting property 'CursorType' for element 'startFreqCursor'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'startFreqCursor'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'startFreqCursor'
      ;

    _view._addElement(EJSS_DRAWING2D.cursor,"endFreqCursor", _view.freqGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'endFreqCursor'
      .setProperty("Sensitivity",8) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'endFreqCursor'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'endFreqCursor'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'endFreqCursor'
      .setProperty("CursorType","VERTICAL") // EJsS HtmlView.HtmlView Page: setting property 'CursorType' for element 'endFreqCursor'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'endFreqCursor'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'endFreqCursor'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"arrowFreqGroup", _view.freqGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'arrowFreqGroup'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrowFreq", _view.arrowFreqGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'arrowFreq'
      .setProperty("MarkEnd","ANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrowFreq'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'arrowFreq'
      .setProperty("Measured",false) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'arrowFreq'
      .setProperty("MarkStart","INVANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkStart' for element 'arrowFreq'
      .setProperty("Y",-40) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrowFreq'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrowFreq'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'arrowFreq'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"Df", _view.arrowFreqGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'Df'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'Df'
      .setProperty("RelativePosition","NORTH") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'Df'
      .setProperty("Measured",true) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'Df'
      .setProperty("Y",-34) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'Df'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'Df'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"audioPanel", _view.mainPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'audioPanel'
      .setProperty("XFixedTick",0) // EJsS HtmlView.HtmlView Page: setting property 'XFixedTick' for element 'audioPanel'
      .setProperty("Title","Microphone Signal") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'audioPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'audioPanel'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'audioPanel'
      .setProperty("XTickStep",10) // EJsS HtmlView.HtmlView Page: setting property 'XTickStep' for element 'audioPanel'
      .setProperty("TitleY","amplitude") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'audioPanel'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'audioPanel'
      .setProperty("TitleX","t (ms)") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'audioPanel'
      .setProperty("AutoScaleX",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'audioPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"timeGroup", _view.audioPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'timeGroup'
      ;

    _view._addElement(EJSS_DRAWING2D.cursor,"startTimeCursor", _view.timeGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'startTimeCursor'
      .setProperty("Sensitivity",8) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'startTimeCursor'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'startTimeCursor'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'startTimeCursor'
      .setProperty("CursorType","VERTICAL") // EJsS HtmlView.HtmlView Page: setting property 'CursorType' for element 'startTimeCursor'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'startTimeCursor'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'startTimeCursor'
      ;

    _view._addElement(EJSS_DRAWING2D.cursor,"endTimeCursor", _view.timeGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'endTimeCursor'
      .setProperty("Sensitivity",8) // EJsS HtmlView.HtmlView Page: setting property 'Sensitivity' for element 'endTimeCursor'
      .setProperty("LineColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'endTimeCursor'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'endTimeCursor'
      .setProperty("CursorType","VERTICAL") // EJsS HtmlView.HtmlView Page: setting property 'CursorType' for element 'endTimeCursor'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'endTimeCursor'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'endTimeCursor'
      ;

    _view._addElement(EJSS_DRAWING2D.group,"arrowTimeGroup", _view.timeGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'arrowTimeGroup'
      ;

    _view._addElement(EJSS_DRAWING2D.arrow,"arrowTime", _view.arrowTimeGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'arrowTime'
      .setProperty("MarkEnd","ANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkEnd' for element 'arrowTime'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'arrowTime'
      .setProperty("Measured",false) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'arrowTime'
      .setProperty("MarkStart","INVANGLE") // EJsS HtmlView.HtmlView Page: setting property 'MarkStart' for element 'arrowTime'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'arrowTime'
      .setProperty("SizeY",0) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'arrowTime'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'arrowTime'
      ;

    _view._addElement(EJSS_DRAWING2D.text,"Dt", _view.arrowTimeGroup) // EJsS HtmlView.HtmlView Page: declaration of element 'Dt'
      .setProperty("MovesGroup",true) // EJsS HtmlView.HtmlView Page: setting property 'MovesGroup' for element 'Dt'
      .setProperty("Measured",false) // EJsS HtmlView.HtmlView Page: setting property 'Measured' for element 'Dt'
      .setProperty("Y",0.1) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'Dt'
      .setProperty("EnabledPosition","ENABLED_Y") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'Dt'
      ;

    _view._addElement(EJSS_DRAWING2D.trace,"audioTrace", _view.audioPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'audioTrace'
      .setProperty("LineColor","Red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'audioTrace'
      .setProperty("DrawLines",true) // EJsS HtmlView.HtmlView Page: setting property 'DrawLines' for element 'audioTrace'
      .setProperty("NoRepeat",false) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'audioTrace'
      .setProperty("LineWidth",2) // EJsS HtmlView.HtmlView Page: setting property 'LineWidth' for element 'audioTrace'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"controlPanel", _view.appPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'controlPanel'
      .setProperty("CSS",{"display":"block"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'controlPanel'
      .setProperty("Background","rgba(224,224,224,1.0)") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'controlPanel'
      .setProperty("BorderStyle","solid") // EJsS HtmlView.HtmlView Page: setting property 'BorderStyle' for element 'controlPanel'
      .setProperty("BorderColor","Gray") // EJsS HtmlView.HtmlView Page: setting property 'BorderColor' for element 'controlPanel'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'controlPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"firstRowPanel", _view.controlPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'firstRowPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"buttonPanel", _view.firstRowPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'buttonPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'buttonPanel'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"runPauseButton", _view.buttonPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'runPauseButton'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'runPauseButton'
      .setProperty("ImageOnUrl","/org/opensourcephysics/resources/controls/images/play.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageOnUrl' for element 'runPauseButton'
      .setProperty("ImageOffUrl","/org/opensourcephysics/resources/controls/images/pause.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageOffUrl' for element 'runPauseButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton", _view.buttonPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton'
      .setProperty("Tooltip","Reset") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'resetButton'
      .setProperty("ImageUrl","/org/opensourcephysics/resources/controls/images/reset.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'resetButton'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"measureCheck", _view.firstRowPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'measureCheck'
      .setProperty("Text","Measure") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'measureCheck'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"scalePanel", _view.firstRowPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'scalePanel'
      .setProperty("Tooltip","Y-axis minumum") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'scalePanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'scalePanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"scaleFreqLabel", _view.scalePanel) // EJsS HtmlView.HtmlView Page: declaration of element 'scaleFreqLabel'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"scaleField", _view.scalePanel) // EJsS HtmlView.HtmlView Page: declaration of element 'scaleField'
      .setProperty("Width",45) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'scaleField'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'scaleField'
      .setProperty("Tooltip","Amplude scale") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'scaleField'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"aboutPanel", _view.tabbedPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'aboutPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"optionsPanel", _view.aboutPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'optionsPanel'
      .setProperty("Width","80%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'optionsPanel'
      .setProperty("Background","LightGray") // EJsS HtmlView.HtmlView Page: setting property 'Background' for element 'optionsPanel'
      .setProperty("BorderStyle","solid") // EJsS HtmlView.HtmlView Page: setting property 'BorderStyle' for element 'optionsPanel'
      .setProperty("BorderColor","Gray") // EJsS HtmlView.HtmlView Page: setting property 'BorderColor' for element 'optionsPanel'
      .setProperty("Html","<h2>Sound Analyzer: FFT Options</h2>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'optionsPanel'
      .setProperty("BorderWidth",1) // EJsS HtmlView.HtmlView Page: setting property 'BorderWidth' for element 'optionsPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"peaksPanel", _view.optionsPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'peaksPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"minDBPanel", _view.peaksPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'minDBPanel'
      .setProperty("Tooltip","Y-axis minumum") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'minDBPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'minDBPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"minDecible", _view.minDBPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'minDecible'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"minDecibleField", _view.minDBPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'minDecibleField'
      .setProperty("Width",35) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'minDecibleField'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'minDecibleField'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"maxDBPanel", _view.peaksPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'maxDBPanel'
      .setProperty("Tooltip","Y-axis minumum") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'maxDBPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'maxDBPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"maxDecible", _view.maxDBPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'maxDecible'
      .setProperty("Text"," max") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'maxDecible'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"maxDecibleField", _view.maxDBPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'maxDecibleField'
      .setProperty("Width",35) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'maxDecibleField'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'maxDecibleField'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"peaksCheck", _view.peaksPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'peaksCheck'
      .setProperty("Tooltip","Show freq. spectrum peaks") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'peaksCheck'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"thresholdPanel", _view.peaksPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'thresholdPanel'
      .setProperty("Tooltip","Y-axis minumum") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'thresholdPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'thresholdPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"thresholdDecible", _view.thresholdPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'thresholdDecible'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"thresholdField", _view.thresholdPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'thresholdField'
      .setProperty("Width",45) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'thresholdField'
      .setProperty("Format","0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'thresholdField'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"minPanel", _view.optionsPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'minPanel'
      .setProperty("Tooltip","Y-axis minumum") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'minPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'minPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"minFreqLabel", _view.minPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'minFreqLabel'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"minFreqField", _view.minPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'minFreqField'
      .setProperty("Width",45) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'minFreqField'
      .setProperty("Format","0.0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'minFreqField'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"maxPanel", _view.optionsPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'maxPanel'
      .setProperty("Tooltip","Y-axis minumum") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'maxPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'maxPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"maxFreqLabel", _view.maxPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'maxFreqLabel'
      .setProperty("Text"," max") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'maxFreqLabel'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"maxFreqField", _view.maxPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'maxFreqField'
      .setProperty("Width",45) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'maxFreqField'
      .setProperty("Format","0.0") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'maxFreqField'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"ptsPanel", _view.optionsPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'ptsPanel'
      .setProperty("Display","inline-block") // EJsS HtmlView.HtmlView Page: setting property 'Display' for element 'ptsPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"ptsLabel", _view.ptsPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'ptsLabel'
      .setProperty("Tooltip","Number of points in sample.") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'ptsLabel'
      ;

    _view._addElement(EJSS_INTERFACE.comboBox,"ptsBox", _view.ptsPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'ptsBox'
      .setProperty("Options",[256, 512, 1024, 2048, 4096, 8192]) // EJsS HtmlView.HtmlView Page: setting property 'Options' for element 'ptsBox'
      .setProperty("Multiple",false) // EJsS HtmlView.HtmlView Page: setting property 'Multiple' for element 'ptsBox'
      .setProperty("SelectedOptions",[1024]) // EJsS HtmlView.HtmlView Page: setting property 'SelectedOptions' for element 'ptsBox'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"mobileCheck", _view.ptsPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'mobileCheck'
      .setProperty("Tooltip","Show mobile device view") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'mobileCheck'
      .setProperty("Text","Mobile") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'mobileCheck'
      .setProperty("Font","normal normal 1em ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'mobileCheck'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"aboutNarrative", _view.aboutPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'aboutNarrative'
      .setProperty("Width","90%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'aboutNarrative'
      .setProperty("Html","<h2>About Microphone Sound Analyzer</h2> <h5>Developed by Wolfgang Christian at Davidson College using Easy JavaScript Simulations.</h5> <p> The Microphone Sound Analyzer JavaScript simulation records the sound from a computer or mobile device microphone and displays its amplitude and frequency spectrum.  Users can vary the recording length by selecting the number of data points. The number of points must, however, be a power of 2 in oder to utilize the audio processor's  Fast Fourier Transform (FFT) to compute the sound&#39;s frequency spectrum.  Because the domain of  the computed frequency spectrum is usually too large for typical audio signals between 20 Hz to 10 kHz,  users can set the minimum and maximum values on the graph to display only the range of interest.</p> <p>The Microphone Sound Analyzer is designed for classroom demonstration and student experimentation.  It was developed using the Easy JavaScript Simulations (EjS) version 5.3 and is distributed as a  ready-to-run html page and requires only a browser with JavaScript support. This model runs on all platforms,  including mobile devices, that support the Media Devices API. </p> <p> <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices\"> https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices</a> </p> <h2>Microphone Access</h2> <p> Unfortunatley, not all operating system + browser combinations support microphone access.  For example, on Apple molbile devices running iOS and iPadOS 13, microphone access is allowed using Safari but not allowed using Chrome.  The <em>Test Audio Access</em> button can be used to test micropone access. </p>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'aboutNarrative'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"audioApiPanel", _view.aboutPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'audioApiPanel'
      .setProperty("Width","90%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'audioApiPanel'
      .setProperty("Html","<h2>Test Audio API</h2>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'audioApiPanel'
      ;

    _view._addElement(EJSS_INTERFACE.dataTable,"avDataTable", _view.audioApiPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'avDataTable'
      .setProperty("Width","80%") // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'avDataTable'
      .setProperty("ColumnsWidth",250) // EJsS HtmlView.HtmlView Page: setting property 'ColumnsWidth' for element 'avDataTable'
      .setProperty("AddToTop",false) // EJsS HtmlView.HtmlView Page: setting property 'AddToTop' for element 'avDataTable'
      .setProperty("NoRepeat",false) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'avDataTable'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"testAudioPanel", _view.audioApiPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'testAudioPanel'
      ;

    _view._addElement(EJSS_INTERFACE.button,"audioPermissioButton", _view.testAudioPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'audioPermissioButton'
      .setProperty("Text","Test Audio Access") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'audioPermissioButton'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"DavidsonPanel", _view.aboutPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'DavidsonPanel'
      .setProperty("Html","<figure>       <img class=\"centered\" src=\"./MicrophoneSoundAnalyzer/Davidson.png\" alt=\"Davidson College\"/>       <figcaption style=\"text-align: center; font-weight: bold\"></figcaption>     </figure>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'DavidsonPanel'
      ;

    /* _view._addElement(EJSS_INTERFACE.panel,"narrativePanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'narrativePanel'
      .setProperty("Html","<h3>Questions:</h3> <p>Instructions: When the web page loads the software will ask for access to the device microphone. Click <em>allow</em>. Make some sound (sing, talk, whistle) and click the play button to see the software at work. A second click on the play button will capture a segment of data.</p> <ol> <li>Capture a sound sample while whistling a single note (or use a tuning fork if you have one). Describe the waveform of the amplitude (bottom graph) of this sound.</li> <li>The bottom graph is an amplitude versus time (in milliseconds) graph. Click the <em>measure</em> checkbox. Adjust the bars to measure the period of the wave (it is more accurate to measure the period of several waves and divide by the number of waves to get the period of one wave). What is this whistle&#39;s period in seconds?</li> <li>Use the <em>peaks</em>. checkbox to find the main frequency of your whistle (upper graph). What is the frequency? (Note: You may notice two peaks in this part. Try taking a sound sample while blowing through your lips without making a whistle. Can you now explain what the lower peak is showing?)</li> <li>Divide the period of the wave into one to get the frequency (change to seconds first). Does the frequency as calculated from the period match the frequency (in Hz) on the top graph?</li> <li>Now capture a sound of your voice or a musical instrument playing the same tone as your whistle. What is different about the two graphs from those of a whistle or tuning fork? What is similar?</li> <li>Use the peak checkbox and the period on the lower graph to compare the highest frequency shown in the top graph. How do they compare?</li> <li>The lower frequency peaks are overtones. Are they harmonic? How do you know?</li> <li>Now have a lab partner sing the same note (or use a different instrument). How does their waveform and frequency spectrum differ from yours?</li> <li>Suppose a clarinet and a trumpet both play the same note (have the same fundamental frequency). What would be different and what would be the same for the set of graphs for each. Why is it that you can still tell them apart, even though they are playing the same note?</li> <li>Write a brief definition of each of the following: Fourier Analysis, Fourier Synthesis, spectrogram, harmonics, overtones, timbre.</li> </ol> <h5>Questions by Kyle Forinash.  See <em>Sound: An Interactive eBook</em> for additonal additional curricular material and simulations. <br/><br/> <a href=\"https://www.compadre.org/books/SoundBook\"> https://https://www.compadre.org/books/SoundBook</a> </h5>") // EJsS HtmlView.HtmlView Page: setting property 'Html' for element 'narrativePanel'
      ;*/

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new MicrophoneSoundAnalyzer("_topFrame","_ejs_library/",null);
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
