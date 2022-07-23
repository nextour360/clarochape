(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.playAudioList([this.audio_3E5C6AAF_2CFB_B0FE_41BB_D3823C82F74C]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_0DD1BF09_1744_0507_41B3_29434E440055",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
  "this.Image_306AC85E_2D7C_D05E_41C5_F06C160EC33A"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "minHeight": 20,
 "scripts": {
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "existsKey": function(key){  return key in window; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "unregisterKey": function(key){  delete window[key]; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "registerKey": function(key, value){  window[key] = value; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarOpacity": 0.5,
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "defaultVRPointer": "laser",
 "gap": 10,
 "height": "100%",
 "class": "Player",
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "downloadEnabled": false,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "visible",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -174.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_33931481_2D5B_D0A5_41A1_AD24FFCAFBE9",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 1.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_33FA83DC_2D5B_D0A2_41C2_5C6918B94C46",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_camera",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421",
   "camera": "this.panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 91.75,
   "backwardYaw": -89.89,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421",
 "thumbnailUrl": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_t.jpg",
 "label": "15",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_343D884F_2CBC_5FBE_41BF_AB795166E2F4"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": -171.3,
   "backwardYaw": 45.73,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C",
 "thumbnailUrl": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_t.jpg",
 "label": "14",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_34E89E29_2CBF_B3E2_4195_7A542410403D"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 45.73,
   "backwardYaw": -171.3,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C"
  },
  {
   "yaw": -178.05,
   "backwardYaw": 5.64,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39"
  },
  {
   "yaw": -89.89,
   "backwardYaw": 91.75,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0",
 "thumbnailUrl": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_t.jpg",
 "label": "8",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_3FAFFA2B_2CFC_F3E5_41C3_1D3773A2234D",
  "this.overlay_38D40B3B_2CCD_F1E6_41BE_3911063C347D",
  "this.overlay_3433ECD3_2CB4_50A6_41B8_883445F3F450"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 118.55,
   "backwardYaw": -66.36,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E",
 "thumbnailUrl": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_t.jpg",
 "label": "12",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_3877F405_2CCD_D7AD_41B8_F2BFB91092E7"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 90.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_33BA244C_2D5B_D7A2_41B5_18E1F392B1DC",
 "class": "PanoramaCamera"
},
{
 "displayOriginPosition": {
  "hfov": 165,
  "yaw": 0,
  "stereographicFactor": 1,
  "class": "RotationalCameraDisplayPosition",
  "pitch": -90
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_camera",
 "displayMovements": [
  {
   "duration": 1600,
   "easing": "linear",
   "class": "TargetRotationalCameraDisplayMovement"
  },
  {
   "targetPitch": 0,
   "targetStereographicFactor": 0,
   "duration": 3200,
   "easing": "cubic_in_out",
   "class": "TargetRotationalCameraDisplayMovement"
  }
 ],
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 179.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_33EFD411_2D5B_D7A5_41C0_202C34069897",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -0.3,
   "backwardYaw": -175.39,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6",
 "thumbnailUrl": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_t.jpg",
 "label": "2",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_3EC534A0_2CFC_50E2_41C4_6C478FE5F6AB"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 83.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_33E273EE_2D5B_D07E_41C2_38C4CF0A7FAE",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 8.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_33A5F45E_2D5B_D05E_417E_FBFA1E696FBA",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_camera",
 "class": "PanoramaCamera"
},
{
 "gyroscopeEnabled": true,
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -134.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_338B44A5_2D5B_D0ED_41A1_450B99953EFA",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -88.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_339E6493_2D5B_D0A5_4199_7818FDACB0D8",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -98.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_33C13428_2D5B_D7E2_41C2_0AAB8505EE78",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_3E5C6AAF_2CFB_B0FE_41BB_D3823C82F74C.mp3",
  "oggUrl": "media/audio_3E5C6AAF_2CFB_B0FE_41BB_D3823C82F74C.ogg",
  "class": "AudioResource"
 },
 "id": "audio_3E5C6AAF_2CFB_B0FE_41BB_D3823C82F74C",
 "data": {
  "label": "claro"
 },
 "class": "MediaAudio"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -96.64,
   "backwardYaw": 81.52,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812",
 "thumbnailUrl": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_t.jpg",
 "label": "10",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_3FED9B0E_2CF4_51BE_41BE_7161E989CEF6"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -61.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_33F393CA_2D5B_D0A7_41AF_357CC58C714D",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -66.36,
   "backwardYaw": 118.55,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E"
  },
  {
   "yaw": 5.64,
   "backwardYaw": -178.05,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0"
  },
  {
   "yaw": 81.52,
   "backwardYaw": -96.64,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812"
  },
  {
   "yaw": -175.39,
   "backwardYaw": -0.3,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "id": "panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39",
 "thumbnailUrl": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_t.jpg",
 "label": "4",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_3F56476A_2CFD_B066_41BA_A459C61C44AE",
  "this.overlay_3F9824F8_2CF4_D063_41BF_4A5954E40305",
  "this.overlay_38263A6D_2CF5_B07D_417C_26A1AD863AC6",
  "this.overlay_3844D04A_2CCB_CFA6_41C1_380D7CEA5D31"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 4.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_33CCF44A_2D5B_D7A6_4163_D6729C792670",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 113.64,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_33D52416_2D5B_D7AE_4145_B11E8817849A",
 "class": "PanoramaCamera"
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowVerticalLength": 0,
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 50,
 "toolTipOpacity": 0.5,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 13,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "paddingRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 7,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "paddingLeft": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 55,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 7,
 "toolTipPaddingLeft": 10,
 "class": "ViewerArea",
 "toolTipPaddingRight": 10,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "width": 115.05,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "height": 641,
 "top": "0%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingLeft": 0,
 "data": {
  "name": "--SETTINGS"
 }
},
{
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_0DD1BF09_1744_0507_41B3_29434E440055",
 "left": "2.72%",
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "width": 573,
 "children": [
  "this.Image_39DDF1A8_2CD5_B0E2_419E_06B95F682E47"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "height": 133,
 "top": "2.52%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "paddingLeft": 0,
 "data": {
  "name": "--STICKER"
 }
},
{
 "propagateClick": true,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_1B99DD00_16C4_0505_41B3_51F09727447A",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "paddingRight": 0,
 "bottom": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "height": 118,
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.64,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "paddingLeft": 0,
 "data": {
  "name": "--MENU"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingLeft": 0,
 "data": {
  "name": "--INFO photo"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
  "this.Container_23F097B8_0C0A_629D_4176_D87C90BA32B6"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingLeft": 0,
 "data": {
  "name": "--INFO photoalbum"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingLeft": 0,
 "data": {
  "name": "--PANORAMA LIST"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingLeft": 0,
 "data": {
  "name": "--LOCATION"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingLeft": 0,
 "data": {
  "name": "--FLOORPLAN"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, true, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingLeft": 0,
 "data": {
  "name": "--PHOTOALBUM + text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingLeft": 0,
 "data": {
  "name": "--PHOTOALBUM"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#04A3E1",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingLeft": 0,
 "data": {
  "name": "--REALTOR"
 }
},
{
 "maxHeight": 1095,
 "propagateClick": false,
 "id": "Image_306AC85E_2D7C_D05E_41C5_F06C160EC33A",
 "maxWidth": 1095,
 "horizontalAlign": "center",
 "right": "2.63%",
 "width": "13.225%",
 "borderSize": 0,
 "url": "skin/Image_306AC85E_2D7C_D05E_41C5_F06C160EC33A.png",
 "minHeight": 1,
 "paddingRight": 0,
 "bottom": "10.25%",
 "verticalAlign": "middle",
 "minWidth": 1,
 "height": "17.647%",
 "class": "Image",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Image34115"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "maxWidth": 58,
 "horizontalAlign": "center",
 "width": 58,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "maxWidth": 58,
 "horizontalAlign": "center",
 "width": 58,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0, this.camera_33BA244C_2D5B_D7A2_41B5_18E1F392B1DC); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.49,
   "image": "this.AnimatedImageResource_3454482F_2CBD_DFFE_41BD_E5A6C7E07816",
   "yaw": 91.75,
   "pitch": -2.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_343D884F_2CBC_5FBE_41BF_AB795166E2F4",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.49,
   "yaw": 91.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0, this.camera_338B44A5_2D5B_D0ED_41A1_450B99953EFA); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.5,
   "image": "this.AnimatedImageResource_304B3E2B_2CBC_53E6_41BD_D27228A68396",
   "yaw": -171.3,
   "pitch": -0.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_34E89E29_2CBF_B3E2_4195_7A542410403D",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.5,
   "yaw": -171.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C, this.camera_33A5F45E_2D5B_D05E_417E_FBFA1E696FBA); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.45,
   "image": "this.AnimatedImageResource_344B782E_2CBD_DFFE_419B_7C1C8476B312",
   "yaw": 45.73,
   "pitch": 1.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_3FAFFA2B_2CFC_F3E5_41C3_1D3773A2234D",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.45,
   "yaw": 45.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39, this.camera_33931481_2D5B_D0A5_41A1_AD24FFCAFBE9); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.84,
   "image": "this.AnimatedImageResource_344B182E_2CBD_DFFE_41C4_22F3A120DCD2",
   "yaw": -178.05,
   "pitch": -5.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_38D40B3B_2CCD_F1E6_41BE_3911063C347D",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.84,
   "yaw": -178.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421, this.camera_339E6493_2D5B_D0A5_4199_7818FDACB0D8); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.49,
   "image": "this.AnimatedImageResource_344B382E_2CBD_DFFE_41C2_F36E824FDFCC",
   "yaw": -89.89,
   "pitch": -1.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3433ECD3_2CB4_50A6_41B8_883445F3F450",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.49,
   "yaw": -89.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39, this.camera_33D52416_2D5B_D7AE_4145_B11E8817849A); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.74,
   "image": "this.AnimatedImageResource_34D53D23_2CB4_71E6_41C1_A599BB596F4E",
   "yaw": 118.55,
   "pitch": -27.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_3877F405_2CCD_D7AD_41B8_F2BFB91092E7",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.74,
   "yaw": 118.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39, this.camera_33CCF44A_2D5B_D7A6_4163_D6729C792670); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.25,
   "image": "this.AnimatedImageResource_344A882C_2CBD_DFE2_41B9_BA2B5843A23A",
   "yaw": -0.3,
   "pitch": -5.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3EC534A0_2CFC_50E2_41C4_6C478FE5F6AB",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 13.25,
   "yaw": -0.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.64,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "maxWidth": 58,
 "horizontalAlign": "center",
 "width": 58,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "push",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 37,
 "propagateClick": true,
 "id": "IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
 "maxWidth": 49,
 "horizontalAlign": "center",
 "right": 30,
 "width": 100,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270.png",
 "paddingRight": 0,
 "bottom": 8,
 "minWidth": 1,
 "mode": "push",
 "height": 75,
 "rollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_rollover.png",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "maxWidth": 58,
 "horizontalAlign": "center",
 "width": 58,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton GYRO"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39, this.camera_33C13428_2D5B_D7E2_41C2_0AAB8505EE78); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.32,
   "image": "this.AnimatedImageResource_3454E82F_2CBD_DFFE_4163_EB07F003E278",
   "yaw": -96.64,
   "pitch": -9.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_3FED9B0E_2CF4_51BE_41BE_7161E989CEF6",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.32,
   "yaw": -96.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0, this.camera_33FA83DC_2D5B_D0A2_41C2_5C6918B94C46); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.99,
   "image": "this.AnimatedImageResource_344BE82D_2CBD_DFE2_41B3_5DE13E548025",
   "yaw": 5.64,
   "pitch": -2.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3F56476A_2CFD_B066_41BA_A459C61C44AE",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.99,
   "yaw": 5.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812, this.camera_33E273EE_2D5B_D07E_41C2_38C4CF0A7FAE); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.63,
   "image": "this.AnimatedImageResource_31300369_2D4F_F062_41A7_71B283A7679B",
   "yaw": 81.52,
   "pitch": -5.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_3F9824F8_2CF4_D063_41BF_4A5954E40305",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 11.63,
   "yaw": 81.52,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.23,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E, this.camera_33F393CA_2D5B_D0A7_41AF_357CC58C714D); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.9,
   "image": "this.AnimatedImageResource_3133C369_2D4F_F062_41C5_FDFAB0C5D8FD",
   "yaw": -66.36,
   "pitch": -2.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_38263A6D_2CF5_B07D_417C_26A1AD863AC6",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.9,
   "yaw": -66.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6, this.camera_33EFD411_2D5B_D7A5_41C0_202C34069897); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.79,
   "image": "this.AnimatedImageResource_344B482D_2CBD_DFFD_41C0_E2CEC4F75536",
   "yaw": -175.39,
   "pitch": -6.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3844D04A_2CCB_CFA6_41C1_380D7CEA5D31",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.79,
   "yaw": -175.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "propagateClick": true,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "right": "0%",
 "width": 110,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 110,
 "top": "0%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "paddingLeft": 0,
 "data": {
  "name": "button menu sup"
 }
},
{
 "propagateClick": true,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "scrollBarColor": "#000000",
 "data": {
  "name": "-button set"
 },
 "horizontalAlign": "center",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.Button_390D3169_2CD7_B062_41C0_840BCCC2E415",
  "this.Button_3B299E64_2CD5_B062_41C2_6DA7577D0E93",
  "this.Button_3B021D4A_2CD5_F1A6_41C3_07809DB394A0",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "91.304%",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "scrollBarMargin": 2,
 "height": "85.959%",
 "gap": 3,
 "class": "Container",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll"
},
{
 "maxHeight": 1095,
 "propagateClick": false,
 "id": "Image_39DDF1A8_2CD5_B0E2_419E_06B95F682E47",
 "left": "0%",
 "maxWidth": 1095,
 "horizontalAlign": "center",
 "width": "19.721%",
 "borderSize": 0,
 "url": "skin/Image_39DDF1A8_2CD5_B0E2_419E_06B95F682E47.png",
 "minHeight": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "height": "76.692%",
 "top": "0%",
 "class": "Image",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Image16986"
 }
},
{
 "maxHeight": 2,
 "propagateClick": true,
 "id": "Image_1B99DD00_16C4_0505_41B3_51F09727447A",
 "left": "0%",
 "maxWidth": 3000,
 "horizontalAlign": "center",
 "right": "0%",
 "borderSize": 0,
 "url": "skin/Image_1B99DD00_16C4_0505_41B3_51F09727447A.png",
 "minHeight": 1,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "bottom": 53,
 "minWidth": 1,
 "height": 2,
 "class": "Image",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingLeft": 0,
 "data": {
  "name": "white line"
 }
},
{
 "propagateClick": true,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "width": 1199,
 "children": [
  "this.Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
  "this.Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
  "this.Button_1B9A6D00_16C4_0505_4197_F2108627CC98"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "scrollBarMargin": 2,
 "height": 51,
 "gap": 3,
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingLeft": 30,
 "data": {
  "name": "-button set container"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "layout": "horizontal",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "top": "5%",
 "paddingRight": 0,
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "class": "Container",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "propagateClick": false,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "10%",
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingRight": 20,
 "bottom": "80%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "top": "5%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "paddingLeft": 0,
 "data": {
  "name": "Container X global"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
  "this.Container_23F027B7_0C0A_6293_418E_075FCFAA8A19"
 ],
 "layout": "horizontal",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "top": "5%",
 "paddingRight": 0,
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "class": "Container",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "propagateClick": false,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_23F097B8_0C0A_629D_4176_D87C90BA32B6",
 "left": "10%",
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingRight": 20,
 "bottom": "80%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "top": "5%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "paddingLeft": 0,
 "data": {
  "name": "Container X global"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "layout": "vertical",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "top": "7%",
 "paddingRight": 0,
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "class": "Container",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
  "this.Container_221C9648_0C06_E5FD_41A1_A79DE53B3031"
 ],
 "layout": "horizontal",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "top": "5%",
 "paddingRight": 0,
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "class": "Container",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "propagateClick": false,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "10%",
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingRight": 20,
 "bottom": "80%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "top": "5%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "paddingLeft": 0,
 "data": {
  "name": "Container X global"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
  "this.MapViewer"
 ],
 "layout": "vertical",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "top": "7%",
 "paddingRight": 0,
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "class": "Container",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_28214A13_0D5D_5B97_4193_B631E1496339",
  "this.Container_2B0BF61C_0D5B_2B90_4179_632488B1209E"
 ],
 "layout": "vertical",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "top": "7%",
 "paddingRight": 0,
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "class": "Container",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "layout": "vertical",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "top": "7%",
 "paddingRight": 0,
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "class": "Container",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "layout": "horizontal",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "top": "5%",
 "paddingRight": 0,
 "bottom": "5%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "shadowVerticalLength": 0,
 "class": "Container",
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "propagateClick": false,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "10%",
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingRight": 20,
 "bottom": "80%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "top": "5%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "overflow": "visible",
 "paddingLeft": 0,
 "data": {
  "name": "Container X global"
 }
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_34186238_2CB4_73E3_41B1_28ED6CBFD421_1_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_3454482F_2CBD_DFFE_41BD_E5A6C7E07816",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3D705BDA_2CF4_70A6_415E_A1434A5BE65C_0_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_304B3E2B_2CBC_53E6_41BD_D27228A68396",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_344B782E_2CBD_DFFE_419B_7C1C8476B312",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_344B182E_2CBD_DFFE_41C4_22F3A120DCD2",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3D1DCF29_2CF4_B1E2_41C0_A0FF820A70A0_0_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_344B382E_2CBD_DFFE_41C2_F36E824FDFCC",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3D1DC2DB_2CF4_70A6_41AC_E73C890F147E_0_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_34D53D23_2CB4_71E6_41C1_A599BB596F4E",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3DAFA9C1_2CF4_F0A2_41A0_6B81F45FA3F6_0_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_344A882C_2CBD_DFE2_41B9_BA2B5843A23A",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3D7108C1_2CF4_50A5_41B8_CA6CCACE8812_0_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_3454E82F_2CBD_DFFE_4163_EB07F003E278",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_344BE82D_2CBD_DFE2_41B3_5DE13E548025",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_31300369_2D4F_F062_41A7_71B283A7679B",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_3133C369_2D4F_F062_41C5_FDFAB0C5D8FD",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3D438592_2CF4_B0A6_41B6_B13AC5570E39_0_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_344B482D_2CBD_DFFD_41C0_E2CEC4F75536",
 "frameDuration": 41,
 "class": "AnimatedImageResource"
},
{
 "transparencyActive": true,
 "maxHeight": 60,
 "propagateClick": true,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "maxWidth": 60,
 "horizontalAlign": "center",
 "width": 60,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "paddingRight": 0,
 "minWidth": 1,
 "mode": "toggle",
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "height": 60,
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "image button menu"
 }
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0.64,
  0.96
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_390D3169_2CD7_B062_41C0_840BCCC2E415",
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "propagateClick": false,
 "width": 110,
 "data": {
  "name": "Button fachada"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 1,
 "iconHeight": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#FF0000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "verticalAlign": "middle",
 "height": 40,
 "mode": "push",
 "minWidth": 1,
 "fontSize": 12,
 "label": "FACHADA",
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#CC0000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 0)",
 "fontStyle": "normal",
 "class": "Button",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "shadow": false,
 "rollOverShadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 0,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0.6,
  1
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_3B299E64_2CD5_B062_41C2_6DA7577D0E93",
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "propagateClick": false,
 "width": 110,
 "data": {
  "name": "Button entrada"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 1,
 "iconHeight": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#FF0000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "verticalAlign": "middle",
 "height": 40,
 "mode": "push",
 "minWidth": 1,
 "fontSize": 12,
 "label": "ENTRADA",
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#CC0000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 1)",
 "fontStyle": "normal",
 "class": "Button",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "shadow": false,
 "rollOverShadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 0,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0.63,
  1
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_3B021D4A_2CD5_F1A6_41C3_07809DB394A0",
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "propagateClick": false,
 "width": 110,
 "data": {
  "name": "Button house info"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 1,
 "iconHeight": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#FF0000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "verticalAlign": "middle",
 "height": 40,
 "mode": "push",
 "minWidth": 1,
 "fontSize": 12,
 "label": "PRODUTOS",
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#CC0000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 3)",
 "fontStyle": "normal",
 "class": "Button",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "shadow": false,
 "rollOverShadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 0,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0.15,
  1
 ],
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "id": "Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "propagateClick": true,
 "width": 137,
 "data": {
  "name": "Button house info"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 2,
 "iconHeight": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#FF0000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "height": 40,
 "mode": "push",
 "minWidth": 1,
 "fontSize": 12,
 "label": "NOSSOS CONTATOS",
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#CC0000",
  "#000000"
 ],
 "click": "this.openLink('https://beacons.ai/nextour360', '_blank')",
 "fontStyle": "normal",
 "class": "Button",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "rollOverShadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 0,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "propagateClick": true,
 "width": 130,
 "data": {
  "name": "Button panorama list"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 2,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#FF0000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "height": 40,
 "mode": "push",
 "minWidth": 1,
 "fontSize": 12,
 "label": "\u00c1LBUM DE FOTOS",
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#CC0000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "fontStyle": "normal",
 "class": "Button",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0.2,
  0.95
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "propagateClick": true,
 "width": 106,
 "data": {
  "name": "Button location"
 },
 "horizontalAlign": "center",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 2,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#FF0000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "height": 40,
 "mode": "push",
 "minWidth": 1,
 "fontSize": 12,
 "label": "LOCALIZA\u00c7\u00c3O",
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#CC0000",
  "#000000"
 ],
 "click": "this.openLink('https://www.google.com/maps/place/Claro+Chapec%C3%B3+-+MRZ+Celulares/@-27.1003206,-52.6144909,15z/data=!4m5!3m4!1s0x0:0x47807204ee409e9f!8m2!3d-27.1003206!4d-52.6144909', '_blank')",
 "fontStyle": "normal",
 "class": "Button",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "backgroundColorRatios": [
  0
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "height": "100%",
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "85%",
 "data": {
  "name": "-left"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "horizontalAlign": "left",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.51,
 "paddingRight": 50,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 460,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 0,
 "height": "100%",
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 20,
 "borderRadius": 0,
 "paddingLeft": 50,
 "overflow": "visible",
 "width": "50%",
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "maxWidth": 60,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "25%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "X"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "children": [
  "this.ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
  "this.Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "height": "100%",
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "85%",
 "data": {
  "name": "-left"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_23F027B7_0C0A_6293_418E_075FCFAA8A19",
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "horizontalAlign": "left",
 "children": [
  "this.Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
  "this.Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
  "this.Container_23F047B8_0C0A_629D_415D_F05EF8619564"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.51,
 "paddingRight": 50,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 460,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 0,
 "height": "100%",
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 20,
 "borderRadius": 0,
 "paddingLeft": 50,
 "overflow": "visible",
 "width": "50%",
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA",
 "maxWidth": 60,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "25%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_rollover.jpg",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "X"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 140,
 "verticalAlign": "top",
 "minWidth": 1,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "header"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "itemThumbnailWidth": 220,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "itemLabelFontStyle": "normal",
 "scrollBarColor": "#04A3E1",
 "horizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "itemMode": "normal",
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "itemPaddingRight": 3,
 "itemMaxHeight": 1000,
 "itemThumbnailOpacity": 1,
 "width": "100%",
 "minHeight": 1,
 "itemBorderRadius": 0,
 "paddingRight": 70,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "verticalAlign": "middle",
 "minWidth": 1,
 "itemLabelFontFamily": "Montserrat",
 "itemPaddingLeft": 3,
 "itemMaxWidth": 1000,
 "selectedItemLabelFontColor": "#04A3E1",
 "itemLabelPosition": "bottom",
 "backgroundColor": [
  "#000000"
 ],
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemOpacity": 1,
 "itemHorizontalAlign": "center",
 "height": "100%",
 "itemBackgroundOpacity": 0,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "backgroundOpacity": 0.05,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "shadow": false,
 "itemThumbnailBorderRadius": 0,
 "itemPaddingTop": 3,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemBackgroundColor": [],
 "paddingLeft": 70,
 "itemBackgroundColorRatios": [],
 "selectedItemThumbnailShadowVerticalLength": 0,
 "propagateClick": false,
 "itemWidth": 220,
 "selectedItemThumbnailShadow": true,
 "itemMinHeight": 50,
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "rollOverItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "scrollBarMargin": 2,
 "itemLabelFontSize": 14,
 "itemMinWidth": 50,
 "itemThumbnailScaleMode": "fit_outside",
 "itemVerticalAlign": "top",
 "itemLabelFontColor": "#666666",
 "itemHeight": 156,
 "gap": 26,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "class": "ThumbnailGrid",
 "itemThumbnailShadow": false,
 "paddingTop": 10,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "paddingBottom": 70,
 "itemLabelGap": 7,
 "scrollBarWidth": 10,
 "data": {
  "name": "ThumbnailList"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "height": "100%",
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "85%",
 "data": {
  "name": "-left"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_221C9648_0C06_E5FD_41A1_A79DE53B3031",
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "horizontalAlign": "left",
 "children": [
  "this.Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
  "this.Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
  "this.Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.51,
 "paddingRight": 50,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 400,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 0,
 "height": "100%",
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 20,
 "borderRadius": 0,
 "paddingLeft": 50,
 "overflow": "visible",
 "width": "15%",
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "maxWidth": 60,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "25%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "X"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 140,
 "verticalAlign": "top",
 "minWidth": 1,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "header"
 }
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Floor Plan"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowVerticalLength": 0,
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "paddingRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "class": "ViewerArea",
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_28214A13_0D5D_5B97_4193_B631E1496339",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
  "this.IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 140,
 "verticalAlign": "top",
 "minWidth": 1,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "header"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2B0BF61C_0D5B_2B90_4179_632488B1209E",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "children": [
  "this.ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
  "this.IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
  "this.IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "100%",
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "visible",
 "width": "100%",
 "data": {
  "name": "Container photo"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "100%",
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "visible",
 "width": "100%",
 "data": {
  "name": "Container photo"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "height": "100%",
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "55%",
 "data": {
  "name": "-left"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "horizontalAlign": "left",
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.51,
 "paddingRight": 60,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 460,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 0,
 "height": "100%",
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 1,
 "paddingBottom": 20,
 "borderRadius": 0,
 "paddingLeft": 60,
 "overflow": "visible",
 "width": "45%",
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "maxWidth": 60,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "25%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "X"
 }
},
{
 "maxHeight": 1000,
 "propagateClick": false,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "maxWidth": 2000,
 "horizontalAlign": "center",
 "width": "100%",
 "borderSize": 0,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "minHeight": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "height": "100%",
 "top": "0%",
 "class": "Image",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Image"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "verticalAlign": "top",
 "minWidth": 1,
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container space"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.79,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "100%",
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 30,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Viewer info 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
 "left": 0,
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "right": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "bottom": 0,
 "top": 0,
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "class": "ViewerArea",
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "playbackBarLeft": 0,
 "toolTipPaddingTop": 4,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "propagateClick": false,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0",
 "left": "0%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container arrows"
 },
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
  "this.Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
  "this.IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "height": "100%",
 "top": "0%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "verticalAlign": "top",
 "minWidth": 1,
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container space"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
  "this.Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.79,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "100%",
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 30,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_23F047B8_0C0A_629D_415D_F05EF8619564",
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "width": "77.115%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "top": "0%",
 "class": "HTMLText",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>",
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 80,
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "maxWidth": 60,
 "horizontalAlign": "right",
 "right": 20,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "100%",
 "paddingRight": 0,
 "verticalAlign": "top",
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "height": "36.14%",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton X"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "left": "0%",
 "propagateClick": false,
 "right": "0%",
 "borderSize": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "paddingRight": 0,
 "bottom": "0%",
 "minWidth": 1,
 "insetBorder": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "top": "0%",
 "class": "WebFrame",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingLeft": 0,
 "data": {
  "name": "WebFrame48191"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "verticalAlign": "top",
 "minWidth": 1,
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container space"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
  "this.Button_221B5648_0C06_E5FD_4198_40C786948FF0"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.79,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "100%",
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 30,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6",
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "width": "77.115%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "top": "0%",
 "class": "HTMLText",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">FLOORPLAN:</SPAN></SPAN></DIV></div>",
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 80,
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "maxWidth": 60,
 "horizontalAlign": "right",
 "right": 20,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "100%",
 "paddingRight": 0,
 "verticalAlign": "top",
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "height": "36.14%",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton X"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "width": "77.115%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "top": "0%",
 "class": "HTMLText",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">PHOTOALBUM:</SPAN></SPAN></DIV></div>",
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 80,
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3",
 "maxWidth": 60,
 "horizontalAlign": "right",
 "right": 20,
 "iconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "100%",
 "paddingRight": 0,
 "verticalAlign": "top",
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, false, 0, null, null, false)",
 "height": "36.14%",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_rollover.jpg",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton X"
 }
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Viewer photoalbum + text 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
 "left": "0%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowVerticalLength": 0,
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "paddingRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": "0%",
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "class": "ViewerArea",
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
 "left": 10,
 "maxWidth": 60,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D.png",
 "borderSize": 0,
 "minHeight": 50,
 "width": "14.22%",
 "paddingRight": 0,
 "bottom": "20%",
 "mode": "push",
 "verticalAlign": "middle",
 "minWidth": 50,
 "top": "20%",
 "rollOverIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_rollover.png",
 "class": "IconButton",
 "shadow": false,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton <"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14",
 "maxWidth": 60,
 "horizontalAlign": "center",
 "right": 10,
 "iconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14.png",
 "borderSize": 0,
 "minHeight": 50,
 "width": "14.22%",
 "paddingRight": 0,
 "bottom": "20%",
 "mode": "push",
 "verticalAlign": "middle",
 "minWidth": 50,
 "top": "20%",
 "rollOverIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_rollover.png",
 "class": "IconButton",
 "shadow": false,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton >"
 }
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowVerticalLength": 0,
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "paddingRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": "0%",
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "class": "ViewerArea",
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "maxWidth": 60,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "borderSize": 0,
 "minHeight": 50,
 "width": "14.22%",
 "paddingRight": 0,
 "bottom": "20%",
 "mode": "push",
 "verticalAlign": "middle",
 "minWidth": 50,
 "top": "20%",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "class": "IconButton",
 "shadow": false,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton <"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "maxWidth": 60,
 "horizontalAlign": "center",
 "right": 10,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "borderSize": 0,
 "minHeight": 50,
 "width": "14.22%",
 "paddingRight": 0,
 "bottom": "20%",
 "mode": "push",
 "verticalAlign": "middle",
 "minWidth": 50,
 "top": "20%",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "class": "IconButton",
 "shadow": false,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton >"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "maxWidth": 60,
 "horizontalAlign": "right",
 "right": 20,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "width": "10%",
 "paddingRight": 0,
 "verticalAlign": "top",
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "height": "10%",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton X"
 }
},
{
 "maxHeight": 1000,
 "propagateClick": false,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "maxWidth": 2000,
 "horizontalAlign": "center",
 "width": "100%",
 "borderSize": 0,
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "minHeight": 1,
 "paddingRight": 0,
 "verticalAlign": "bottom",
 "minWidth": 1,
 "height": "100%",
 "top": "0%",
 "class": "Image",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "paddingBottom": 0,
 "paddingLeft": 0,
 "data": {
  "name": "Image"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "right",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "verticalAlign": "top",
 "minWidth": 1,
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "paddingTop": 20,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container space"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.79,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "100%",
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 30,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 40,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 }
},
{
 "propagateClick": false,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "class": "HTMLText",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.73vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.72vh;font-family:'Bebas Neue Bold';\">Lorem ipsum</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.72vh;font-family:'Bebas Neue Bold';\">dolor sit amet</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.36vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.36vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.69vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.69vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\"> \u2022 Nam sed faucibus est.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\"> \u2022 Ut eget lorem sed leo.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.69vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.69vh;font-family:'Bebas Neue Bold';\"><B>lorem ipsum:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.7vh;font-family:'Bebas Neue Bold';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "paddingBottom": 20,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "data": {
  "name": "HTMLText"
 }
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "propagateClick": false,
 "data": {
  "name": "Button"
 },
 "horizontalAlign": "center",
 "fontFamily": "Bebas Neue Bold",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "fontSize": "3vh",
 "label": "lorem ipsum",
 "backgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "rollOverBackgroundOpacity": 1,
 "height": "9%",
 "fontStyle": "normal",
 "class": "Button",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 0.7,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "46%",
 "fontWeight": "normal"
},
{
 "transparencyActive": true,
 "maxHeight": 150,
 "propagateClick": false,
 "id": "IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
 "maxWidth": 150,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD.png",
 "borderSize": 0,
 "minHeight": 70,
 "width": "12%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 70,
 "height": "8%",
 "rollOverIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_rollover.png",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton <"
 }
},
{
 "propagateClick": false,
 "layout": "absolute",
 "id": "Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container separator"
 },
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "80%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "height": "30%",
 "gap": 10,
 "class": "Container",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "overflow": "scroll"
},
{
 "transparencyActive": true,
 "maxHeight": 150,
 "propagateClick": false,
 "id": "IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4",
 "maxWidth": 150,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4.png",
 "borderSize": 0,
 "minHeight": 70,
 "width": "12%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 70,
 "height": "8%",
 "rollOverIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_rollover.png",
 "class": "IconButton",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_pressed.png",
 "paddingBottom": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton >"
 }
},
{
 "propagateClick": false,
 "id": "HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "class": "HTMLText",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.73vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.72vh;font-family:'Bebas Neue Bold';\">Lorem ipsum</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.72vh;font-family:'Bebas Neue Bold';\">dolor sit amet</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.36vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.36vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.69vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.69vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\"> \u2022 Nam sed faucibus est.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\"> \u2022 Ut eget lorem sed leo.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></SPAN></DIV></div>",
 "paddingBottom": 20,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "data": {
  "name": "HTMLText"
 }
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145",
 "propagateClick": false,
 "data": {
  "name": "Button"
 },
 "horizontalAlign": "center",
 "fontFamily": "Bebas Neue Bold",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "fontSize": "3vh",
 "label": "lorem ipsum",
 "backgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "rollOverBackgroundOpacity": 1,
 "height": "9%",
 "fontStyle": "normal",
 "class": "Button",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 0.7,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "46%",
 "fontWeight": "normal"
},
{
 "propagateClick": false,
 "id": "HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "class": "HTMLText",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.73vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.72vh;font-family:'Bebas Neue Bold';\">location</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.85vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.36vh;font-family:'Bebas Neue Bold';\">address line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.36vh;font-family:'Bebas Neue Bold';\">address line 2</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:5.21vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac.</SPAN></SPAN></DIV></div>",
 "paddingBottom": 20,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "data": {
  "name": "HTMLText"
 }
},
{
 "textDecoration": "none",
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_221B5648_0C06_E5FD_4198_40C786948FF0",
 "propagateClick": false,
 "width": 207,
 "data": {
  "name": "Button"
 },
 "horizontalAlign": "center",
 "fontFamily": "Bebas Neue Bold",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 32,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "height": 59,
 "mode": "push",
 "minWidth": 1,
 "fontSize": 34,
 "label": "lorem ipsum",
 "shadowBlurRadius": 6,
 "gap": 5,
 "rollOverBackgroundOpacity": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "fontStyle": "normal",
 "class": "Button",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "backgroundOpacity": 0.7,
 "paddingBottom": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingLeft": 0,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "propagateClick": false,
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "45%",
 "class": "HTMLText",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.73vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.05vh;font-family:'Bebas Neue Bold';\">real estate agent</SPAN></SPAN></DIV></div>",
 "paddingBottom": 10,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "data": {
  "name": "HTMLText18899"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "children": [
  "this.Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "80%",
 "class": "Container",
 "paddingTop": 0,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "- content"
 }
},
{
 "maxHeight": 200,
 "propagateClick": false,
 "id": "Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
 "maxWidth": 200,
 "horizontalAlign": "left",
 "width": "25%",
 "borderSize": 0,
 "url": "skin/Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0.jpg",
 "minHeight": 1,
 "paddingRight": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "height": "100%",
 "class": "Image",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "data": {
  "name": "agent photo"
 }
},
{
 "propagateClick": false,
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "75%",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "class": "HTMLText",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.36vh;font-family:'Bebas Neue Bold';\">john doe</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.02vh;font-family:'Bebas Neue Bold';\">licensed real estate salesperson</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.85vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.85vh;font-family:'Bebas Neue Bold';\">Tlf.: +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.85vh;font-family:'Bebas Neue Bold';\">jhondoe@realestate.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.85vh;font-family:'Bebas Neue Bold';\">www.loremipsum.com</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.18vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV></div>",
 "paddingBottom": 10,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "data": {
  "name": "HTMLText19460"
 }
}],
 "width": "100%",
 "data": {
  "name": "Player468"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
