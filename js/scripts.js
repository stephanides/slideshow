// Custom template scripts
jQuery(document).ready(function(){
 
    // Brand-full, Brand-half, Index, Node, Slideshow, Topic
    $('.carousel').carousel({
        interval: false
    });
    
    $.fn.carouselHeights = function() {
        var items = $(this),
            heights = [],
            tallest;

        var normalizeHeights = function() {
            items.each(function() {
                heights.push($(this).height()); 
            });
            tallest = Math.max.apply(null, heights);
            items.each(function() {
                $(this).css('min-height',tallest + 'px');
            });
        };

        normalizeHeights();

        $(window).on('resize orientationchange', function () {
            tallest = 0;
            heights.length = 0;

            items.each(function() {
                $(this).css('min-height','0');
            }); 
            normalizeHeights();
        });

    };

    // Quotes
    $('.quotes-form #personal-prayer').click(function() {
        if ($(this).is(':checked')){
            $('#edit-ppr-wrapper').slideDown();
        } else {
            $('#edit-ppr-wrapper').slideUp();
        }
    });

    // Brand-full, Brand-half
    $('.carousel.authors .item, .booklet-content .sidebar .carousel .item').carouselHeights();

    
    // Slideshow
    $('.slideshow-body .carousel[id^="carousel-top-"], .media .carousel-bottom-text .carousel[id^="carousel-top-"]').on('slide.bs.carousel', function(e){
        $(this).siblings('[id^="carousel-bottom-"]').carousel(e.direction == 'left' ? 'next' : 'prev');
    });
    
    // Index, Brand-series, Topic
    $('.content .post').hover(function(){
        $(this).find('.continue-reading').stop(true,true).fadeIn();
        $(this).find('.more-copy').stop(true,true).hide();
    }, function(){
        $(this).find('.continue-reading').stop(true,true).hide();
        $(this).find('.more-copy').stop(true,true).fadeIn();
    });
    
    // Index, Node, Topic, Slideshow, Video, Brand-series
    $('.hero-area .large-highlight, .hero-area .first-highlight, .hero-area .second-highlight, .content .post, .article-image, .slideshow-library .library, .brand-content .series-categories .category, .help-content .need, .publications .product, .how-content .help').click(function(e){
        if(e.target.nodeName.toLowerCase() != 'a' && $(this).find('.title a').length){
            window.location = $(this).find('.title a').attr('href');
            e.preventDefault();
            return false;
        }
    });
    
    function document_click_handler(e) {
        if(!$(e.target).parents(e.data.selector).length){
            $(e.data.selector).click();
            $(document).unbind('click', document_click_handler);
        }
    }
    // Index
    $('.top-social-share').click(function (e) {
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(document).unbind('click', document_click_handler);
        }
        else {
            $(this).addClass('active');
            $(document).on('click', { selector: '.top-social-share' } , document_click_handler);
        }
        e.preventDefault();
        return false;
    });
    
    // Index, Topic
    $('.sidebar-social-share .social-menu-center').click(function (e) {
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).siblings('.social-menu-wrapper').removeClass('active');
            $(document).unbind('click', document_click_handler);
        }
        else {
            $(this).addClass('active');
            $(this).siblings('.social-menu-wrapper').addClass('active');
            $(document).on('click', { selector: '.sidebar-social-share .social-menu-center' } , document_click_handler);
        }
        e.preventDefault();
        return false;
    });
    
    // Index, Node, Slideshow, Topic, Video
    if ($(window).width() > 768) {
        $('.sticky-sidebar').each(function(){
            $(this).children('div').stick_in_parent({
                parent: $(this).parent(),
                recalc_every: 1000
                //inner_scrolling: false
            });
        });
    }
    
    // Node, Slideshow, Video
    $('.share-quote .share-button').click(function (e) {
        if($(this).parent().hasClass('active')){
            $(this).parent().removeClass('active');
            $(document).unbind('click', document_click_handler);
        }
        else {
            $(this).parent().addClass('active');
            $(document).on('click', { selector: '.share-quote .share-button' } , document_click_handler);
        }
        e.preventDefault();
        return false;
    });
    
    // Help
    $('.help-content.help-single .post').hover(function (e) {
        $(this).find('.share-quote').addClass('active');
    }, function(e){
        $(this).find('.share-quote').removeClass('active');
    });
    
    // Node
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
          $(".img-wrapper").addClass("active");
        } else {
          $(".img-wrapper").removeClass("active");
        }
    });
    
    // Node, Slideshow, Video
    var lazyLoadHandler = function(e){
        var lastVisibleNode = $(this);
        lastVisibleNode.next('.section').removeClass('hidden');
        var nextLeaderboard = lastVisibleNode.nextAll('.wrapper-leaderboard').first();
        nextLeaderboard.removeClass('hidden');
        nextLeaderboard.appear(lazyLoadHandler);
    };
    $('.node .wrapper-leaderboard,.slideshow-body .wrapper-leaderboard').not('.hidden').last().appear(lazyLoadHandler);
    
    // Node
    $('.node .arrow-down').click(function(e) {
        $('html, body').animate({
            scrollTop: $('.node .article-node').first().offset().top
        }, 1000);
        e.preventDefault();
        return false;
    });
    
    // Slideshow, Video
    $('.slideshow-library .library, .booklet-content .article-image').hover(function() {
        $(this).find('.text').stop(true,true).slideDown();
    }, function(){
        var selectbox = $(this).find('.text select');
        if(!selectbox.length || !selectbox.is(':focus')){
            $(this).find('.text').stop(true,true).slideUp();
        }
    });
    
    // Booklet
    $('select[name="pillar"]').change(function(){
        if($(this).val()){
            window.open($(this).val(),'_blank');
        }
    });
    
    $('.submit-testimonial').click(function(e) {
        var testimonial = $(this);
        if(!testimonial.hasClass('active')){
            testimonial.find('.open-form').addClass('hidden');
            testimonial.find('.booklet-form').stop(true,true).slideDown(400, function(){
                testimonial.addClass('active');
            });
            e.preventDefault();
            return false;
        }
    });
    
    $('.request-prayer-toggle').click(function(e) {
        var wrapper = $(this).closest('.request-prayer-wrapper');
        var prayer = wrapper.find('.request-prayer');
        var form = wrapper.find('form');

        if(!form.hasClass('active')){
            prayer.stop(true,true).slideUp();
            form.stop(true,true).slideDown(400, function(){
                form.addClass('active');
            });
            e.preventDefault();
            return false;
        }
    });
    
    // Slideshow, Video
    $(".slideshow-wrapper .show-text i").click(function () {
        var text = $(this).parent('.show-text').prev('.video-text').find('.expand-text');
        var expanded = text.is(".expanded");
        if (expanded){
            $(this).removeClass('rotate-out');
            $(this).addClass('rotate-in');
            text.removeClass("expanded").slideToggle(); 
        } else {
            $(this).removeClass('rotate-in');
            $(this).addClass('rotate-out');
            text.addClass("expanded").slideToggle();
        }
    });
    
    // Booklet
    $('a.scroll-link[href*=#]').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });

    // Media
    $('.sidebar-menu .menu li a').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
            || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
               if (target.length) {
                 $('html,body').animate({
                     scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    
    // Help
    $('.help-content.help-single .help-top-wrapper .quick-links a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top - $('.navbar-fixed-top').height() - 20
            }, 500, 'linear');
    });
    
    // Media
    $(".open-contact-form").click(function () {
        if($(".contact-us-form").hasClass('active')){
            $('.contact-us-form').removeClass('active');
        } else {
            $(".contact-us-form").addClass('active');
        }
    });
    $(".contact-us-form .close-cross").click(function () {
        if($(this).parent('.contact-us-form').hasClass('active')){
            $(this).parent('.contact-us-form').removeClass('active');
        } 
    });
    
    if(typeof $.fn.magnificPopup != 'undefined'){
        $('.media-content .carousel-bottom-text .carousel').magnificPopup({
            delegate: 'a',
            removalDelay: 300,
            type: 'image',
            callbacks: {
                beforeOpen: function () {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure magnificPopup__Animus');
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            closeOnContentClick: true,
            midClick: true
        });
    }
});

