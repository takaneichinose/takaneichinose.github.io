$(function(){$("div.panel").hide();$(".menu").click(function(){$(this).toggleClass("menuOpen").next().slideToggle();});})

// 18.06.02 追加
var bgMusic = document.getElementById('bg_music');

// 18.06.02 音を再生する
bgMusic.addEventListener('canplaythrough', function() {
  alert('test');
  bgMusic.play();
}, false);

setTimeout(function() {
  alert('test 2');
}, 1);

// 18.06.02 バックグラウンドで再生される音(イベント)
bgMusic.addEventListener('ended', function() {
  var content = document.getElementById('content');
  var footer  = document.getElementById('footer');
  
  // フッターに固定位置にする
  footer.classList.add('fixed');
  // 説明：フッターは固定の縦幅がセットされていないので、Javascriptで縦幅をセットする
  content.style.paddingBottom = document.getElementById('footer').offsetHeight + 'px';
});
