$(function(){$("div.panel").hide();$(".menu").click(function(){$(this).toggleClass("menuOpen").next().slideToggle();});})

// 18.06.02 音を再生する
var bgMusic = document.getElementById('bg_music');
var playBtn = document.getElementById('play_button');
var isEnded = false;

// 18.06.02 ユーザーのジェスチャーで音を再生
function playBgMusic() {
  bgMusic.play();
}

// 18.06.02 フッターの間隔
function adjustFooterSpacing() {
  var content = document.getElementById('content');
  var sidebar = document.getElementById('sidebar');
  var footer  = document.getElementById('footer');
  
  // フッターに固定位置にする
  footer.classList.add('fixed');
  // 説明：フッターは固定の縦幅がセットされていないので、Javascriptで縦幅をセットする
  if (window.outerWidth >= 644) {
    content.style.paddingBottom = footer.offsetHeight + 'px';
    sidebar.style.paddingBottom = '0px';
  }
  else {
    content.style.paddingBottom = '0px';
    sidebar.style.paddingBottom = footer.offsetHeight + 'px';
  }
}

// 18.06.02 バックグラウンドで再生される音(イベント)
bgMusic.addEventListener('ended', function() {
  adjustFooterSpacing();
  
  bgMusic.parentNode.removeChild(bgMusic);
  playBtn.parentNode.removeChild(playBtn);
  
  bgMusic = null;
  isEnded = true;
});

playBtn.addEventListener('click', function() {
  playBgMusic();
});

window.addEventListener('resize', function() {
  if (isEnded) {
    adjustFooterSpacing();
  }
});
