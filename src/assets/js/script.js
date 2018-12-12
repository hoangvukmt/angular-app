function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function collapseMessage(el) {
  if ($($(el).parent().parent()).find(".collapse-placeholder").is(":visible")){
    $($(el).parent().parent()).find(".collapse-placeholder").toggle();
    $($(el).parent().parent()).find(".collapse").slideToggle(500);
    if ($(el).hasClass("down-arrow")) {
      $(el).removeClass("down-arrow");
      $(el).addClass("up-arrow");
    }
    else {
      $(el).addClass("down-arrow");
      $(el).removeClass("up-arrow");
    }
  }
  else {
    if ($(el).hasClass("down-arrow")) {
      $(el).removeClass("down-arrow");
      $(el).addClass("up-arrow");
    }
    else {
      $(el).addClass("down-arrow");
      $(el).removeClass("up-arrow");
    }
    $($(el).parent().parent()).find(".collapse").slideToggle(500);
    setTimeout(function() {
      $($(el).parent().parent()).find(".collapse-placeholder").toggle();
    }, 500);
  }
}

function toggelMenu() {
  $(".btn-toggle-menu").click();
}

function forceNumber(e, el, _maxlength) {
  const strInput = $(el).val();
  let strOutput = "";
  if (strInput === "" && e.keyCode !== 8){
    strOutput = $(el).next().val();
  }
  else {
    const len = strInput.length > _maxlength ? _maxlength : strInput.length;
    for (var i = 0; i < len; i++) {
      const str = strInput[i];
      if (i === 0 && str === "0") {
        continue;
      }
      switch (str) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          strOutput += str;
          break;
      }
    }
  }
  if (strOutput.length > 0) {
    strOutput = parseFloat(strOutput);
  }
  $(el).val(strOutput);
}

function forceNumberPhone(e, el, _maxlength) {
  const strInput = $(el).val();
  let strOutput = "";
  if (strInput === "" && e.keyCode !== 8){
    strOutput = $(el).next().val();
  }
  else {
    const len = strInput.length > _maxlength ? _maxlength : strInput.length;
    for (var i = 0; i < len; i++) {
      const str = strInput[i];
      switch (str) {
        case "-":
        case "(":
        case ")":
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          strOutput += str;
          break;
      }
    }
  }
  $(el).val(strOutput);
}

function forceHalfSize(e, el, _maxlength) {
  const strInput = $(el).val();
  let strOutput = "";
  
  const len = strInput.length > _maxlength ? _maxlength : strInput.length;
  for (var i = 0; i < len; i++) {
    const str = strInput[i];
    if (
      str === "0" || str === "1" || str === "2" || str === "3" || str === "4" || str === "5" || str === "6" || str === "7" || str === "8" || str === "9" ||
      str === "q" || str === "w" || str === "e" || str === "r" || str === "t" || str === "y" || str === "u" || str === "i" || str === "o" || str === "p" ||
      str === "a" || str === "s" || str === "d" || str === "f" || str === "g" || str === "h" || str === "j" || str === "k" || str === "l" ||
      str === "z" || str === "x" || str === "c" || str === "v" || str === "b" || str === "n" || str === "m" ||
      str === "Q" || str === "W" || str === "E" || str === "R" || str === "T" || str === "Y" || str === "U" || str === "I" || str === "O" || str === "P" ||
      str === "A" || str === "S" || str === "D" || str === "F" || str === "G" || str === "H" || str === "J" || str === "K" || str === "L" ||
      str === "Z" || str === "X" || str === "C" || str === "V" || str === "B" || str === "N" || str === "M"
    ) {
      strOutput += str;
    }
  }
  
  $(el).val(strOutput);
}

function forceHalfSizeKatakana(e, el, _maxlength) {
  if (typeof el !== "undefined") {
    const strInput = $(el).val();
    let strOutput = "";
    
    const len = strInput.length > _maxlength ? _maxlength : strInput.length;
    for (var i = 0; i < len; i++) {
      const str = strInput[i];
      if (
        //half size 0123456789
        str === "0" || str === "1" || str === "2" || str === "3" || str === "4" || str === "5" || str === "6" || str === "7" || str === "8" || str === "9" ||
        str === "q" || str === "w" || str === "e" || str === "r" || str === "t" || str === "y" || str === "u" || str === "i" || str === "o" || str === "p" ||
        str === "a" || str === "s" || str === "d" || str === "f" || str === "g" || str === "h" || str === "j" || str === "k" || str === "l" ||
        str === "z" || str === "x" || str === "c" || str === "v" || str === "b" || str === "n" || str === "m" ||
        str === "Q" || str === "W" || str === "E" || str === "R" || str === "T" || str === "Y" || str === "U" || str === "I" || str === "O" || str === "P" ||
        str === "A" || str === "S" || str === "D" || str === "F" || str === "G" || str === "H" || str === "J" || str === "K" || str === "L" ||
        str === "Z" || str === "X" || str === "C" || str === "V" || str === "B" || str === "N" || str === "M" ||
        //full size str === "０" || str === "１" || str === "２" || str === "３" || str === "４" || str === "５" || str === "６" || str === "７" || str === "８" || str === "９" ||
        //full size str === "ｑ" || str === "ｗ" || str === "ｒ" || str === "ｔ" || str === "ｙ" || str === "ｐ" || str === "ｓ" || str === "ｄ" || str === "ｆ" || str === "ｇ" || str === "ｈ" || str === "ｊ" || str === "ｋ" || str === "ｌ" || str === "ｚ" || str === "ｘ" || str === "ｃ" || str === "ｖ" || str === "ｂ" || str === "ｍ" ||
        //full size /^([ァ-ヶー]+)$/.test(str) ||
        /^([ｱ-ﾝﾞﾟ]+)$/.test(str)
      ) {
        strOutput += str;
      }
    }
    
    $(el).val(strOutput);
  }
}
var _forceHalfSize;
function forceKatakana() {
  forceHalfSizeKatakana(event, $('.half-size')[0], 30);
  _forceHalfSize = setTimeout(forceKatakana, 100);
}
function stopForceKatakana() {
  clearTimeout(_forceHalfSize);
}

function forceHalfSizeNumber(e, el, _maxlength) {
  if (typeof el !== "undefined") {
    const strInput = $(el).val();
    let strOutput = "";
    
    const len = strInput.length > _maxlength ? _maxlength : strInput.length;
    for (var i = 0; i < len; i++) {
      const str = strInput[i];
      if (str === "0" || str === "1" || str === "2" || str === "3" || str === "4" || str === "5" || str === "6" || str === "7" || str === "8" || str === "9") {
        strOutput += str;
      }
    }
    
    $(el).val(strOutput);
  }
}
var _forceHalfSizeNumber;
function forceKatakanaNumber() {
  forceHalfSizeNumber(event, $('.number-half-size')[0], 30);
  _forceHalfSizeNumber = setTimeout(forceKatakanaNumber, 100);
}
function stopForceKatakanaNumber() {
  clearTimeout(_forceHalfSizeNumber);
}

function onlyYYYYmmdd(el) {
  const strInput = $(el).val();
  let strOutput = "";
  for (var i = 0; i < strInput.length; i++) {
    const str = strInput[i];
    if (i < 4) {
      if (
        str === "0" || str === "1" || str === "2" || 
        str === "3" || str === "4" || str === "5" || 
        str === "6" || str === "7" || str === "8" || str === "9"
      ) {
        strOutput += str;
      }
    }
    if (i === 4) {
      if (str === "/") {
        strOutput += str;
      }
      else if (str === "0" || str === "1"){
        strOutput += "/" + str;
      }
    }
    if (i === 5) {
      if (strInput.length === 6) {
        if (strInput[4] === "/") {
          if (str === "0" || str === "1") {
            strOutput += str;
          }
        }
      }
      else {
        strOutput += str;
      }
    }
    if (i === 6) {
      if (strInput[5] === "0") {
        if (
          str === "1" || str === "2" || str === "3" || str === "4" || str === "5" || 
          str === "6" || str === "7" || str === "8" || str === "9"
        ) {
          strOutput += str;
        }
      }
      else {
        if (str === "0" || str === "1" || str === "2") {
          strOutput += str;
        }
      }
    }
    if (i === 7) {
      if (str === "/") {
        strOutput += str;
      }
      else if (str === "0" || str === "1" || str === "2"){
        strOutput += "/" + str;
      }
      else if (str === "3"){
        let strCheck = checkDate(strOutput + "/" + str + "0");
        if (strCheck === (strOutput + "/" + str + "0")){
          strOutput += "/" + str;
        }
      }
    }
    if (i === 8) {
      if (strInput.length === 9) {
        if (strInput[7] === "/") {
          if (str === "0" || str === "1" || str === "2") {
            strOutput += str;
          }
          else if (str === "3") {
            let strCheck = checkDate(strOutput + str + "0");
            if (strCheck === (strOutput + str + "0")){
              strOutput += str;
            }
          }
        }
      }
      else {
        strOutput += str;
      }
    }
    if (i === 9) {
      if (strInput[8] === "0") {
        if (
          str === "1" || str === "2" || str === "3" || str === "4" || str === "5" || 
          str === "6" || str === "7" || str === "8" || str === "9"
        ) {
          strOutput += str;
        }
      }
      else if (strInput[8] === "1") {
        if (
          str === "0" || str === "1" || str === "2" || str === "3" || str === "4" || 
          str === "5" || str === "6" || str === "7" || str === "8" || str === "9" 
        ) {
          strOutput += str;
        }
      }
      else if (strInput[8] === "2") {
        if (
          str === "0" || str === "1" || str === "2" || str === "3" || str === "4" || 
          str === "5" || str === "6" || str === "7" || str === "8" || str === "9" 
        ) {
          let strCheck = checkDate(strOutput + str);
          if (strCheck === (strOutput + str)){
            strOutput += str;
          }
        }
      }
      else if (strInput[8] === "3") {
        if (str === "0" || str === "1") {
          let strCheck = checkDate(strOutput + str);
          if (strCheck === (strOutput + str)){
            strOutput += str;
          }
        }
      }
    }
  }

  $(el).val(strOutput);
}

function checkDate(strOutput) {
  const dateChk = new Date(strOutput);
  const MM = dateChk.getMonth() + 1;
  const dd = dateChk.getDate();

  strOutput = [
    dateChk.getFullYear(),
    (MM > 9 ? '' : '0') + MM,
    (dd > 9 ? '' : '0') + dd
  ].join('/');

  return strOutput;
}

function addValueToNext(el) {
  $(el).next().val($(el).val());
}

var _index = 0;
var _time = 0;
var _carouselTimeOut;
function carousel() {
  var i;
  var slideCpn = document.getElementsByClassName("banner-slide");
  if (slideCpn.length === 0) {
    _time = 0;
  }
  var slideControll = document.getElementsByClassName("slide-controll");
  if (slideCpn.length > 0) {
    var isHovered = $('.banner-slide:hover').length > 0 || $('.slide-controll:hover').length > 0;
    if (!isHovered) {
      for (i = 0; i < slideCpn.length; i++) {
        slideCpn[i].style.display = "none";
        if (typeof slideControll[i] !== "undefined") {
          slideControll[i].style.display = "inline-block";
          $(slideControll[i]).removeClass("active");
        }
      }
      _index++;
      if (_index > slideCpn.length) {
        _index = 1
      }
      slideCpn[_index-1].style.display = "block";
      if (typeof slideControll[_index-1] !== "undefined") {
        $(slideControll[_index-1]).addClass("active");
      }

      _time = ($(slideCpn[_index-1]).attr("data-seconds")) * 1000;
    }
    else {
      _time = 50;
    }
  }
  _carouselTimeOut = setTimeout(carousel, _time);
}
function stopCarousel() {
  clearTimeout(_carouselTimeOut);
}
function nextSlide(el) {
    var slideCpn = document.getElementsByClassName("banner-slide");
    var slideControll = document.getElementsByClassName("slide-controll");
    if (slideCpn.length > 0) {
        for (i = 0; i < slideCpn.length; i++) {
            slideCpn[i].style.display = "none";
            if (typeof slideControll[i] !== "undefined") {
                $(slideControll[i]).removeClass("active");
            }
        }

        slideCpn[Number($(el).attr("data-index"))].style.display = "block";
        if (typeof slideControll[Number($(el).attr("data-index"))] !== "undefined") {
            $(slideControll[Number($(el).attr("data-index"))]).addClass("active");
        }

        _time = ($(slideCpn[Number($(el).attr("data-index"))]).attr("data-seconds")) * 1000;
        _index = Number($(el).attr("data-index"));
    }
}
function slideTouchend(el) {
    var slideCpn = document.getElementsByClassName("banner-slide");
    var slideControll = document.getElementsByClassName("slide-controll");
    if (slideCpn.length > 0) {
        _index++;
        if (_index >= slideCpn.length) {
            _index = 0;
        }
        for (i = 0; i < slideCpn.length; i++) {
            slideCpn[i].style.display = "none";
            if (typeof slideControll[i] !== "undefined") {
                $(slideControll[i]).removeClass("active");
            }
        }
        slideCpn[_index].style.display = "block";
        if (typeof slideControll[_index] !== "undefined") {
            $(slideControll[_index]).addClass("active");
        }
        _time = ($(slideCpn[_index]).attr("data-seconds")) * 1000;
    }
}

function deviceResize() {
  $(".nav-scroll").css("height", window.innerHeight);
  if (window.innerWidth > 767) {
    if (typeof $("mat-drawer").attr("style") !== 'undefined' && $("mat-drawer").attr("style").indexOf("visibility: visible") >= 0) {
      $(".btn-toggle-menu").click();
    }
  }
  if ($("#analyzerTbl").length > 0) {
    let countColumn = $($("#analyzerTbl").find("tr")[0]).find("td").length - 2;
    if (countColumn > 0) {
      let displayW = window.innerWidth > 1000 ? 1000 : window.innerWidth;
      let categoryWidth = displayW * 0.3;
      let categoryItemWidth = displayW * 0.4;
      let maxWidth = categoryWidth + categoryItemWidth + countColumn * 80;
      /*if (window.innerWidth > maxWidth) {
        maxWidth = window.innerWidth;
      }*/
      
      let categoryPercent = (categoryWidth / maxWidth) * 100;
      let categoryItemPercent = (categoryItemWidth / maxWidth) * 100;
      $("#analyzerTbl").css("width", maxWidth + "px");
      $("td.td-category").css("width", categoryPercent + "%");
      $("td.td-category-item").css("width", categoryItemPercent + "%");
    }
  }
}

var countOpenMenu = 0;
function setHeightSideBar() {
  countOpenMenu = 0;
  $(".nav-scroll").css("height", window.innerHeight);
}

$(document).mouseup(function(e) {
  setTimeout(function(){
    let mobileMenu = $("mat-drawer.mobile-menu");
    if ($(mobileMenu).css('visibility') === "visible") {
      countOpenMenu++;
      var container = $(mobileMenu).find("div.nav-content");
      if (!container.is(e.target) && container.has(e.target).length === 0 && countOpenMenu > 1) {
        toggelMenu();
      }
    }
    else {
      countOpenMenu = 0;
    }
  }, 50);
});

function collapseTokuyaku(el) {
  $(el).toggleClass("fa-angle-down");
  $(el).toggleClass("fa-angle-up");
  let _parent = $(el).parent().parent();
  let _tokuyakus = $(_parent).next();
  $(_tokuyakus).toggle(500);

  setTimeout(function() {
    let checkRegions = $('.checkRegion');
    for (let j = 0; j < checkRegions.length; j++) {
      let checkRegion = checkRegions[j];
      let regionItem = $(checkRegion).find('.form-row');
      for (let i = 0; i < regionItem.length; i++) {
        let item = regionItem[i];
        let rowContent = $(item).find('.row-content');
        let rowTitle = $(rowContent).find('.row-title');
        let rowValue = $(rowContent).find('.row-value');
        if (($(rowTitle).width() + $(rowValue).width()) > $(rowContent).width()) {
          $(rowValue).css("float", "left");
        }
        else {
          $(rowValue).css("float", "right");
        }
      }
    }
  }, 500);
}

function toggleCollapse(el) {
  let _parent = $(el).parent();

  $(_parent).find(".fas").toggleClass("fa-angle-down");
  $(_parent).find(".fas").toggleClass("fa-angle-up");
  
  let _divCollapse = $(_parent).find(".div-collapse");
  $(_divCollapse).toggle(500);
}