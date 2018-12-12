$(document).mouseup(function (e) {
    var container = $("#ideviceUpload");
    if (!$(container).is(":visible")) {
        return;
    }
    else {
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $("#lbDoAdd").click();
        }
    }
});
$(document).bind("mouseup touchend", function (e) {
    var container = $("#ideviceUpload");
    if (!$(container).is(":visible")) {
        return;
    }
    else {
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $("#lbDoAdd").click();
        }
    }
});

// import * as EXIF from 'exif-js';
var isIphone = /iPhone|iPad|iPod/i.test(navigator.userAgent);
var isAndroid = /Android/i.test(navigator.userAgent);
var EXIF;
var listRotate = []
function test(el) {
    EXIF.getData(el, function () {
        let orientation = EXIF.getTag(this, 'Orientation');

        if(!isIphone) {       
            if(orientation === 3) {
                $(el).addClass('rotate180');
            }else if(orientation === 6) {
                $(el).addClass('rotate90');
            }else if(orientation === 8) {
                $(el).addClass('rotate270');
            }
        }
        if (isAndroid) {
            if(orientation === 0) {
                $(el).addClass('rotate90');
            }
        }
    });
}