window.modules.blog = function(console, $ele, mod) {
    var toc = getTOC($('article'));
    if (toc) {
        $('.sidebar').append(toc);

        //sidebar affix, this offset is for sidebar position recognition
        setTimeout(function() {
            var $sideBar = $('.sidebar');
            $sideBar.affix({
                offset: {
                    top: function() {
                        var offsetTop = $sideBar.offset().top;
                        return (this.top = offsetTop - 40);
                    },
                    bottom: function() {
                        return (this.bottom = $(document).height() - $('.md').offset().top - $('.md').height());
                    }
                }
            });
        }, 100);

        //sidebar scroll spy
        $('body').scrollspy({
            target: '.sidebar',
            offset: 10 //make sure to spy the element when scrolled to
        });
    } else {
        $ele.addClass('collapsed');
    }

    $(window).resize(function() {
        $('body').scrollspy('refresh');
    });

    //生成目录
    function getTOC($content) {
        var $toc = $('<ul class="nav level-0" >').addClass("nav sidenav");

        var base_level = 1;
        while ($content.find('h' + base_level).length < 1 && base_level < 7) base_level += 1;
        if (base_level == 7) return null;

        $content.find(':header').each(function(i) {
            var $this = $(this);
            $this.attr('id', i);

            var level = parseInt(this.nodeName.substr(1));
            var offset = level - base_level;

            var li = new $('<li/>')
                .append('<a href="#' + i + '" class="animate">' + $this.text() + '</a>')
                .append($('<ul class="nav level-' + (offset + 1) + '"/>'));

            $('<div>').append($toc).find('ul.level-' + offset + ':last').append(li);
        });
        // remove empty ul
        $toc.find('ul').not(':parent').remove();
        return $toc;
    };
};