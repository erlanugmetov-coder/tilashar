/* v191: книжки Парка, Менің, Зоопарка — блоки по новым номерам уроков */
(function(){var rm=function(k,map){if(!RB[k])return;var n=0;RB[k]=RB[k].replace(/data-rbl="\d"/g,function(){var v=map[n];n++;return 'data-rbl="'+(v!=null?v:6)+'"'})};
  rm(4,[0,1,3,4,2,6]);rm(7,[0,0,1,4,1,6]);rm(2,[0,0,2,4,0,6])})();
