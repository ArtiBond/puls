$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 300,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.png"></button>'
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
            .eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    })

    $('.catalog-item__back').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    })

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    $('.button_mini').on('click', function () {
        $('.overlay, #order').fadeIn('slow');
    });
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__title').eq(i).text());
        });
    });

    $("#myform").validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            }
        },
        messages: {
            name: "Напишіть своє ім'я",
            email: {
                required: "Напишіть свій e-mail",
                email: "Напишіть свій e-mail за зразком: name@domain.com"
            },
            phone: {
                required: "Напишіть свій телефон"
            }
        }
    });

    ('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");

            $('form').trigger('reset');
        });
        return false;
    });

});