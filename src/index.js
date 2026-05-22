var SETTINGS_KEY = 'mosaic_settings';

function loadSettings() {
  var def = { display_mode: 0, time_color: 0xFF };
  try {
    var s = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    return s || def;
  } catch(e) { return def; }
}

function saveSettings(s) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

// Keys must match C enum order (alphabetical = numeric):
// display_mode = 0
// time_color   = 1
function sendSettings(s) {
  Pebble.sendAppMessage(
    { 0: parseInt(s.display_mode), 1: parseInt(s.time_color) },
    function() { console.log('Settings sent'); },
    function(e) { console.log('Settings error: ' + JSON.stringify(e)); }
  );
}

Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready');
});

Pebble.addEventListener('showConfiguration', function() {
  var s = loadSettings();

  var html = '<!DOCTYPE html><html><head>'
    + '<meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<style>'
    + 'body{font-family:sans-serif;background:#111;color:#eee;padding:16px;max-width:400px;margin:0 auto}'
    + 'h2{font-size:18px;margin:0 0 20px;letter-spacing:2px;text-transform:uppercase;color:#aaa}'
    + '.section{margin-bottom:24px}'
    + '.section-title{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#666;margin-bottom:10px}'
    + 'label{display:flex;align-items:center;gap:10px;padding:10px;border-radius:6px;cursor:pointer;margin-bottom:6px}'
    + 'label:hover{background:#222}'
    + 'input[type=radio]{accent-color:#4a90d9}'
    + '.dot{width:20px;height:20px;border-radius:3px;flex-shrink:0}'
    + 'button{width:100%;padding:14px;background:#4a90d9;color:#fff;border:none;border-radius:8px;font-size:15px;cursor:pointer;margin-top:8px}'
    + 'button:active{background:#357ab8}'
    + '</style></head><body>'
    + '<h2>Mosaic</h2>'
    + '<div class="section">'
    + '<div class="section-title">Display Mode</div>'
    + '<label><input type="radio" name="mode" value="0"'+(s.display_mode==0?' checked':'')+'>Color (Van Gogh)</label>'
    + '<label><input type="radio" name="mode" value="1"'+(s.display_mode==1?' checked':'')+'>Grayscale (Pebble native)</label>'
    + '</div>'
    + '<div class="section">'
    + '<div class="section-title">Time Color</div>'
    + '<label><input type="radio" name="tc" value="255"'+(s.time_color==255?' checked':'')+'>White <span class="dot" style="background:#fff"></span></label>'
    + '<label><input type="radio" name="tc" value="85"'+(s.time_color==85?' checked':'')+'>Yellow <span class="dot" style="background:#ffff55"></span></label>'
    + '<label><input type="radio" name="tc" value="0"'+(s.time_color==0?' checked':'')+'>Black <span class="dot" style="background:#000;border:1px solid #444"></span></label>'
    + '</div>'
    + '<button onclick="save()">Save</button>'
    + '<script>'
    + 'function save(){'
    + 'var m=document.querySelector("[name=mode]:checked");'
    + 'var t=document.querySelector("[name=tc]:checked");'
    + 'if(!m||!t){alert("Pick all options");return;}'
    + 'var argb_map={"255":0xFF,"85":0xFC,"0":0xC0};'
    + 'var tc=argb_map[t.value]||0xFF;'
    + 'location.href="pebblejs://close#"+encodeURIComponent(JSON.stringify({display_mode:parseInt(m.value),time_color:tc}));'
    + '}'
    + '<\/script>'
    + '</body></html>';

  Pebble.openURL('data:text/html,' + encodeURIComponent(html));
});

Pebble.addEventListener('webviewclosed', function(e) {
  if (!e.response || e.response === 'CANCELLED') return;
  try {
    var s = JSON.parse(decodeURIComponent(e.response));
    saveSettings(s);
    sendSettings(s);
  } catch(err) {
    console.log('Config parse error: ' + err);
  }
});
