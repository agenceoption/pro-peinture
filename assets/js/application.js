(function($) {
    "use strict";
    
	// mobile navigation
    $(".open").pageslide({ direction: "left" });

    // set default search text
    $('#searchform input[type="text"]').attr('placeholder', 'Type and hit enter...');

    // check if mobile device
	var isMobile =
	{
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    if ( isMobile.any() )
	{
	    $('#primary').css({
	        background : '#19274c',
            padding    : '15px 0'
        });
	}
	else
	{
        // force chrome to go back to top on refresh. prevents nav bug
        $( 'html, body' ).scrollTop(0);

        // instantiate scrollreveal
        var config = {
            after: '0.02s',
            enter: 'bottom',
            move: '50px',
            over: '0.5s',
            easing: 'ease-in-out',
            viewportFactor: 0.40,
            reset: true,
            init: true
        };
        window.scrollReveal = new scrollReveal( config );

        // sticky nav
        var nav      = $('#primary');
        var drop     = $('#primary ul li ul');
        var navHomeY = nav.offset().top + 250;
        var isFixed  = false;
        var $w       = $(window);

        $w.scroll(function()
        {
            var scrollTop = $w.scrollTop();
            var shouldBeFixed = scrollTop > navHomeY;

            if ( shouldBeFixed && ! isFixed )
            {

                nav.css({
                    background : '#19274c',
                    padding    : '10px 0',
                    left       : nav.offset().left,
                    width      : nav.width()
                });

                drop.css({
                    paddingTop : '31px'
                });
                
                $( '#navwrap' ).removeClass( 'wrapper' );
                $( '#navwrap' ).addClass( 'boxed' );

                isFixed = true;
            }
            else if ( ! shouldBeFixed && isFixed )
            {
                if ( $('#swiper, #video-header, #image-header').length ) 
                {
                    nav.css({
                        background : 'background:rgba(255,255,255,0.05)',
                        padding    : '30px 0',
                        left       : nav.offset().left,
                        width      : nav.width()
                    });
                }
                else
                {
                    nav.css({
                        background : '#19274c',
                        padding    : '30px 0',
                        left       : nav.offset().left,
                        width      : nav.width()
                    });
                }

                drop.css({
                    paddingTop : '46px'
                });

                $( '#navwrap' ).removeClass( 'boxed' );
                $( '#navwrap' ).addClass( 'wrapper' );

                isFixed = false;
            }
        });

        // make sure nav stays full width on resize
        $( window ).resize( function() {
            $( "#primary" ).css({ width: '100%' });
        });
        
        // parallax header
        $( window ).scroll( function() {
    		var scroll = $(window).scrollTop(), slowScroll = scroll / 2;
    		$( ".swiper-slide, #video-header video, #image-header img" ).css({ transform: "translateY(" + slowScroll + "px)" });
    	});

        // parallax business line
        $( window ).scroll( function() {
            var scroll = $(window).scrollTop() - $("#business-line-parallax-image").offset().top, slowScroll = scroll / 2;
            $( "#business-line-parallax-image" ).css({ transform: "translateY(" + slowScroll + "px)" });
        });

        // parallax philosophy
        $( window ).scroll( function() {
            var scroll = $(window).scrollTop() - $("#philosophy-parallax-image").offset().top, slowScroll = scroll / 2;
            $( "#philosophy-parallax-image" ).css({ transform: "translateY(" + slowScroll + "px)" });
        });

        // scroll to on nav click
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
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
    }
    
    // modify styles if slider, video or image header active
    if ( $( "#swiper, #video-header, #image-header" ).length ) 
    {   
        $('body').addClass('hasHeader');
        
        $( "#filters" ).hide();

        $( "#folio" ).css({
            paddingTop    : '65px'
//            marginTop     : '75px',
//            marginBottom  : '-50px',
//            borderTop     : '1px solid #f3f3f3'
        });
        
        $( "#team" ).css({
            padding    : '75px 0 25px 0',
            marginTop  : '75px',
            borderTop  : '1px solid #f3f3f3' 
        });
    }
    
    // search
    $( '.search-button' ).click( function() {
          $('#searchform').stop(true, true).animate({
                width: ['toggle', 'swing'],
                opacity: 'toggle'
          }, 300, 'linear');
    });
    
    // primary drop menu
    $( '.navigation li' ).hover( function() {
          $(this).find('ul:first').stop(true, true).animate({
                height: ['toggle', 'swing'],
                opacity: 'toggle'
          }, 300, 'linear');
    });

    // portfolio filter
    $( '#filter a' ).click( function() {
        var opacity = 1, toOpacity = 0.05, duration = 200;

        $( '#filter .current' ).removeClass( 'current' );
        $( this ).parent().addClass( 'current' );

        var filterVal = $( this ).text().toLowerCase().replace(' ', '-');

        if ( filterVal == 'all' )
        {
            $( '#folio li' ).css( 'z-index', 999 ).fadeTo( duration, opacity );
        }
        else
        {
            $( '#folio li' ).each( function() {
                if ( ! $( this ).hasClass( filterVal ) )
                {
                    $( this ).css( 'z-index', -1 ).fadeTo( duration, toOpacity );
                }
                else
                {
                    $( this ).css( 'z-index', 999 ).fadeTo( duration, opacity );
                }
            });
        }
        return false;
    });
    
    // add button class to elements
    $(".postnavi span").addClass("button");

    // gmap
    $( "#map-overlay" ).click( function() 
    {
      $( this ).removeClass( "map-overlay" )
    });
    
    $('#gmap').on('mouseleave', function() 
    {
        $('#map-overlay').addClass('map-overlay');
    });
    
    // testimonials
    var scrollSpeed = 80;
    var current = 0;
    var direction = "h"
    
    function bgscroll()
    {
        current -= 1;
        $("#testimonials").css("backgroundPosition", (direction == "h") ? current+"px 0" : "0 " + current+"px");
    }
    setInterval(bgscroll, scrollSpeed);
            
    // twitter
    $('#twitter li').hide();
    $('#twitter li').fadeLoop({ fadeIn: 1000, stay: 5000, fadeOut: 500 });

	// contact validation
	$('#contact_form').validate({
        rules: {
            firstname    : 'required',
            lastname     : 'required',
            email : {
                required : true,
                email    : true
            },
            phone : {
                required : true,
                digits   : true
            },
            message      : 'required'
        },
        messages : {
            firstname    : 'Looks like you forget to give us your first name.',
            lastname     : 'Looks like you forget to give us your last name.',
            email : {
                required : 'Looks like you forget to give us your email address.',
                email    : 'Looks like you may have made a typo. Email format is hello@example.com'
            },
            phone : {
                required : 'Looks like you forget to give us your phone number.',
                digits   : 'Numbers only, no spaces please.'
            },
            message      : 'Looks like you forget to say something.'
        }
    });
    
    // prettyprint
    $( "pre" ).addClass( "prettyprint" );
    
    // typer
    $('[data-typer-targets]').typer({
        highlightSpeed    : 20,
        typeSpeed         : 100,
        clearDelay        : 500,
        typeDelay         : 500,
        clearOnHighlight  : true,
        typerDataAttr     : 'data-typer-targets',
        typerInterval     : 2000
    });
})(jQuery);