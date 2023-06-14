$(document).ready(function(){
    /**
    * Form Validation
    * @see  http://jqueryvalidation.org/validate/
    */
    $('.js-validation-form').each(function(){
        $(this).validate();
    });
});

/**
* Русификатор Form Validation
*/
$.extend($.validator.messages, {
    required: "Обязательное поле",
    remote: "Исправьте это поле",
    email: "Некорректный e-mail",
    url: "Некорректный url",
    date: "Некорректная дата",
    dateISO: "Некорректная дата (ISO)",
    number: "Некорректное число",
    digits: "Cимволы 0-9",
    creditcard: "Некорректный номер карты",
    equalTo: "Не совпадает с предыдущим значением",
    accept: "Недопустимое расширение",
    maxlength: $.validator.format("Максимум {0} символов"),
    minlength: $.validator.format("Минимум {0} символов"),
    rangelength: $.validator.format("Минимум {0} и максимумт {1} символов"),
    range: $.validator.format("Допустимо знаечение между {0} и {1}"),
    max: $.validator.format("Допустимо значение меньше или равное {0}"),
    min: $.validator.format("Допустимо значение больше или равное {0}")
});

$.validator.setDefaults({
    errorPlacement: function(error, element) {
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            error.insertAfter($(element).closest('label'));
        } else {
            error.insertAfter(element);
        }
    }
});

$(document).ready(function(){
    /**
    * Form Styler
    * @see  http://dimox.name/jquery-form-styler/
    */
    $('.js-styler').styler();

    $('input.js-styler[required], select.js-styler[required]').on('change', function(e){
        var $this = $(this);
        setTimeout(function() {
            $this.valid();
            if($this.is(':file')){
                if($this.hasClass('error'))
                    $this.closest('.jq-file').addClass('error');
                else
                    $this.closest('.jq-file').removeClass('error');
            } else {
                $this.trigger('refresh');
            }
        });
    });
});

$.validator.setDefaults({
    errorPlacement: function(error, element) {
        if ($(element).parents('.jq-selectbox').length) {
            error.insertAfter($(element).parents('.jq-selectbox'));
        } else if ($(element).parents('.jq-number').length) {
            error.insertAfter($(element).parents('.jq-number'));
        } else if ($(element).parents('.jq-file').length) {
            error.insertAfter($(element).parents('.jq-file'));
        } else if ($(element).is(':checkbox') || $(element).is(':radio')) {
            error.insertAfter($(element).closest('label'));
        } else {
            error.insertAfter(element);
        }
    },
    invalidHandler: function() {
        var $this = $(this);
        setTimeout(function() {
            $this.find('input.js-styler:not(:file)[required], select.js-styler[required]').trigger('refresh');
            
            $this.find('.js-styler:file[required]').each(function(){
                if($(this).hasClass('error'))
                    $(this).closest('.jq-file').addClass('error');
                else
                    $(this).closest('.jq-file').removeClass('error');
            });
        }, 1);
    }
});

$(document).ready(function(){
    /**
    * FancyBox 3
    * @see  http://fancyapps.com/fancybox/3/
    */
    /*$(document).on('click', '.js-popup-open', function(e){
        e.preventDefault();
        $.fancybox.close();
        $.fancybox.open({
            src  : $(this).attr('href') || $(this).data('src'),
            type : $(this).data('type') || 'inline',
            opts : {
                afterShow : function(instance, current) {
                    $(current.$slide).find('.js-validation-form').each(function() {
                        $(this).validate();
                    });
                }
            }
        });
    });*/

    $('[data-fancybox][data-type=ajax]').fancybox({
        afterShow : function(instance, current) {
            $(current.$slide).find('.js-validation-form').each(function() {
                $(this).validate({
                    submitHandler: function(form) {
                        $.ajax({
                            type: "POST",
                            url: $(form).attr('action'),
                            data: $(form).serialize()
                        }).done(function() {
                            form.reset();
                            $.fancybox.close();
                            $.fancybox.open('<div class="popup-window" style="text-align: center;"><div class="popup-window__title h2">Спасибо!</div><p>Наш менеджер свяжется с&nbsp;Вами в&nbsp;ближайшее время.</p><br><button type="button" class="btn js-popup-close" style="min-width: 130px;">ОК</button></div>');
                        });
                    }
                });
            });
        }
    });
    
    $(document).on('click', '.js-popup-close', function(e){
        e.preventDefault();
        $.fancybox.close();
    });
});

/**
* Настройки FancyBox
*/
$.extend(true, $.fancybox.defaults, {
    touch: false,
    autoFocus: false,
    closeExisting: true,
});

$(document).ready(function(){
    /**
    * Slick
    * @see  http://kenwheeler.github.io/slick/
    */
    $('.main-slider').slick({
        slidesToShow: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 7000,
        speed: 1000,
    });

    $('.catalog-slider').slick({
        dots: true,
        slidesToShow: 4,
        responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
        }
        ]
    });
});

$(document).ready(function(){
    /**
    * Sticky-Kit
    * @see  http://leafo.net/sticky-kit/
    */
    $('.js-sticky').stick_in_parent({
        sticky_class: 'is-stuck'
    });
});

$(document).ready(function(){
    /**
    * Mobile Menu
    */
    $('.menu-btn').on('click', function(e){
        noscrollStart();
        $('html').addClass('is-menu-open');
    });

    $('.menu-popup__close, .menu-popup__bg').on('click', function(e){
        $('html').removeClass('is-menu-open');
        noscrollFinish();
    });
});

/**
* Mobile Scroll Prevent
*/
var noscrollY = 0;

function noscrollStart(){
    noscrollY = $(document).scrollTop();
    $('body').css('top', - noscrollY + 'px');
    $('html').addClass('is-noscroll');
}

function noscrollFinish(){
    $('html').removeClass('is-noscroll');
    $(document).scrollTop(noscrollY);
    $('body').css('top', 'auto');
}

$(document).ready(function(){
    
});
