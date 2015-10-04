function addShine(elem){

    elem.on('mousemove', function (event) {

        var width = $(this).width(),
            height = $(this).height();
        var layers = $(this).find('div').not('.shiny-object').not('.shine-effect');
        var shinyObject = $(this).find('.shiny-object');
        var posX = event.pageX - $(this).offset().left,
            posY = event.pageY - $(this).offset().top;
        var offsetX = (width * 2) - event.pageX,
            offsetY = (height *2) - event.pageY;

        var tranY = 1 - (-offsetX / 280);
        //var tranY2 = 1 - ((-offsetX - 10) / 280);
        //higher the multiplication, the more the movement created
        var rotX = 1 - (posX * 3) / width;
        var rotY = 1 - (posY * 3) / height;

        var transformTranslate = 'translateY(' + tranY + 'px)';
        var transformRotate = 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';

        shinyObject.css({transform:transformTranslate + transformRotate});

        layers.each(function () {
            var layerElement = $(this),
                offsetLayer = layerElement.data('offset') || 0,
                transformLayer = 'translateX(' + rotX * offsetLayer + 'px) translateY(' + rotY * offsetLayer + 'px)';

            layerElement.css({transform: transformLayer});
        });

        var radian = Math.atan2(posY - height / 2, posX - width / 2);
        var angle = radian * 180 / Math.PI - 90;

        $('.shine-effect').css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + event.pageY / height + ') 0%,rgba(255,255,255,0) 80%)');

        //debug output
        $("#coords").html(posX + ',' + posY);
        $("#coords2").html(offsetX + ',' + offsetY);
        $("#epx").html(event.pageX);
        $("#epy").html(event.pageY);
        $("#theta").html(radian);
        $("#angle").html(angle);
        $("#tranY").html(-offsetX / 280);
        $("#rotX").html(rotX);
        $("#rotY").html(rotY);
    });

    //on mouse leave reset the object

}


