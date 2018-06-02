$(function(){$("div.panel").hide();$(".menu").click(function(){$(this).toggleClass("menuOpen").next().slideToggle();});})

// 18.06.02 音を再生する
function initializeAudio() {
  // var bgMusic = document.getElementById('bg_music');
  
  /*
  bgMusic.load();
  bgMusic.play();
  */
  
  var ctx = new (window.AudioContext || window.webkitAudioContext)();
  var src = ctx.createBufferSource();
  var xhr = new XMLHttpRequest();
  
  xhr.open('GET', 'audio/sample_audio.mp3');
  
  xhr.responseType = 'arraybuffer';
  
  xhr.addEventListener('load', function (data) {
    ctx.decodeAudioData(
      xhr.response,
      function(buffer) {
        src.buffer = buffer;
        src.loop   = false
        
        src.connect(ctx.destination);
      }
    );
    src.start(0);
    
    src.onended = function() {
      var content = document.getElementById('content');
      var footer  = document.getElementById('footer');
      
      // フッターに固定位置にする
      footer.classList.add('fixed');
      // 説明：フッターは固定の縦幅がセットされていないので、Javascriptで縦幅をセットする
      content.style.paddingBottom = document.getElementById('footer').offsetHeight + 'px';
    }
  });
  
  xhr.send();
  
  // 18.06.02 バックグラウンドで再生される音(イベント)
  /*
  bgMusic.addEventListener('ended', function() {
    var content = document.getElementById('content');
    var footer  = document.getElementById('footer');
    
    // フッターに固定位置にする
    footer.classList.add('fixed');
    // 説明：フッターは固定の縦幅がセットされていないので、Javascriptで縦幅をセットする
    content.style.paddingBottom = document.getElementById('footer').offsetHeight + 'px';
  });
  */
}
