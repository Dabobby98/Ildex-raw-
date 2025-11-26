// Content Contact Form - Mailchimp Integration
// ---------------------------------------------------------------------------------------
$(function () {

    var $contactForm = $('#contact-form');
    var $contactFormAlert = $contactForm.find('.form-alert');
    var $contactSubmitBtn = $contactForm.find('#contact-submit-btn');
    var originalContactBtnText = $contactSubmitBtn.html();

    $contactForm.find('.form-control').tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    $contactForm.find('.form-control').on('blur', function(){
        $(this).tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    });

    // Handle contact form submission
    $contactForm.on('submit', function(e) {
        e.preventDefault();
        
        // Validate Email
        var email = $contactForm.find('.input-email').val();
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
        if (!filter.test(email)) {
            $contactForm.find('.input-email').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $contactForm.find('.input-email').focus();
            return false;
        }

        // Show loading message
        showContactFormAlert('info', 'Đang gửi tin nhắn của bạn...');
        $contactSubmitBtn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Đang gửi...');

        // Submit to Mailchimp using JSONP - sử dụng list ID đúng cho Contact/Questions
        var mailchimpUrl = 'https://ildex-vietnam.us11.list-manage.com/subscribe/post-json?u=2dae538b15c3fb52220a11db5&id=2d5994350c&c=?';
        
        var formData = $contactForm.serialize();
        
        $.ajax({
            type: 'GET',
            url: mailchimpUrl,
            data: formData,
            cache: false,
            dataType: 'jsonp',
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                if (data.result === 'success') {
                    showContactFormAlert('success', 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
                    $contactForm[0].reset();
                } else {
                    var errorMsg = data.msg || 'Có lỗi xảy ra. Vui lòng thử lại.';
                    // Remove Mailchimp error codes
                    errorMsg = errorMsg.replace(/0 - /g, '').replace(/1 - /g, '').replace(/6 - /g, '');
                    showContactFormAlert('error', errorMsg);
                }
                $contactSubmitBtn.prop('disabled', false).html(originalContactBtnText);
            },
            error: function() {
                showContactFormAlert('error', 'Có lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.');
                $contactSubmitBtn.prop('disabled', false).html(originalContactBtnText);
            }
        });

        return false;
    });

    function showContactFormAlert(type, message) {
        var alertClass = 'alert-info';
        var icon = 'fa-info-circle';
        
        if (type === 'success') {
            alertClass = 'alert-success';
            icon = 'fa-check-circle';
        } else if (type === 'error') {
            alertClass = 'alert-danger';
            icon = 'fa-exclamation-circle';
        }
        
        $contactFormAlert.html(
            '<div class="alert ' + alertClass + ' alert-dismissible fade in" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span></button>' +
            '<i class="fa ' + icon + '"></i> ' + message +
            '</div>'
        );
        
        $('html, body').animate({
            scrollTop: $contactFormAlert.offset().top - 100
        }, 500);
    }

});

// Content Registration Form - Mailchimp Integration
// ---------------------------------------------------------------------------------------
$(function () {

    var $form = $('#registration-form');
    var $formAlert = $form.find('.form-alert');
    var $submitBtn = $form.find('.submit-button');
    var originalBtnText = $submitBtn.html();

    $form.find('.form-control').tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    $form.find('.form-control').on('blur', function(){
        $(this).tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    });

    // Handle form submission
    $form.on('submit', function(e) {
        e.preventDefault();
        
        // Validate Company Name
        var company = $form.find('.input-company').val();
        if (company == '' || company.trim() == '') {
            $form.find('.input-company').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $form.find('.input-company').focus();
            return false;
        }

        // Validate Name
        var name = $form.find('.input-name').val();
        if (name == '' || name.trim() == '') {
            $form.find('.input-name').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $form.find('.input-name').focus();
            return false;
        }

        // Validate Email
        var email = $form.find('.input-email').val();
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
        if (!filter.test(email)) {
            $form.find('.input-email').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $form.find('.input-email').focus();
            return false;
        }

        // Validate Phone
        var phone = $form.find('.input-phone').val();
        if (phone == '' || phone.trim() == '') {
            $form.find('.input-phone').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $form.find('.input-phone').focus();
            return false;
        }

        // Validate Booth Type
        var boothType = $form.find('select[name="MMERGE2"]').val();
        if (!boothType || boothType == '') {
            showFormAlert('error', 'Vui lòng chọn loại gian hàng.');
            return false;
        }

        // Show loading message
        showFormAlert('info', 'Đang gửi thông tin đăng ký...');
        $submitBtn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Đang gửi...');

        // Submit to Mailchimp using JSONP to avoid redirect
        var mailchimpUrl = 'https://ildex-vietnam.us11.list-manage.com/subscribe/post-json?u=2dae538b15c3fb52220a11db5&id=2d5994350c&c=?';
        
        // Build form data
        var formData = $form.serialize();
        
        $.ajax({
            type: 'GET',
            url: mailchimpUrl,
            data: formData,
            cache: false,
            dataType: 'jsonp',
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                if (data.result === 'success') {
                    showFormAlert('success', 'Đăng ký thành công! Cảm ơn bạn đã đăng ký tham gia ILDEX Vietnam 2026. Chúng tôi sẽ liên hệ với bạn sớm.');
                    $form[0].reset();
                    $form.find('.selectpicker').selectpicker('refresh');
                } else {
                    var errorMsg = data.msg || 'Có lỗi xảy ra. Vui lòng thử lại.';
                    // Remove Mailchimp error codes
                    errorMsg = errorMsg.replace(/0 - /g, '').replace(/1 - /g, '');
                    showFormAlert('error', errorMsg);
                }
                $submitBtn.prop('disabled', false).html(originalBtnText);
            },
            error: function() {
                showFormAlert('error', 'Có lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.');
                $submitBtn.prop('disabled', false).html(originalBtnText);
            }
        });

        return false;
    });

    function showFormAlert(type, message) {
        var alertClass = 'alert-info';
        var icon = 'fa-info-circle';
        
        if (type === 'success') {
            alertClass = 'alert-success';
            icon = 'fa-check-circle';
        } else if (type === 'error') {
            alertClass = 'alert-danger';
            icon = 'fa-exclamation-circle';
        }
        
        $formAlert.html(
            '<div class="alert ' + alertClass + ' alert-dismissible fade in" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span></button>' +
            '<i class="fa ' + icon + '"></i> ' + message +
            '</div>'
        );
        
        $('html, body').animate({
            scrollTop: $formAlert.offset().top - 100
        }, 500);
    }

});

// Slider Registration Form
// ---------------------------------------------------------------------------------------
$(function () {

    var $form = $('#registration-form-alt');
    $form.find('.form-control').tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    $form.find('.form-control').on('blur', function(){
        $(this).tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    });

    // validate and process form
    $form.find('.submit-button').on('click', function () {

        // Name
        var name = $form.find('.input-name').val();
        if (name == '' || name == 'Name....' || name == 'Name' || name == 'Name *' || name == 'Type Your Name...' || name == 'Name and Surname') {
            $form.find('.input-name').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $form.find('.input-name').focus();
            return false;
        }

        // Email address
        var email = $form.find('.input-email').val();
        //var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
        //console.log(filter.test(email));
        if (!filter.test(email)) {
            $form.find('.input-email').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $form.find('.input-email').focus();
            return false;
        }

        // Phone number
        var phone = $form.find('.input-phone').val();
        if (phone == 'Your Phone Number') {
            phone = '';
        }

        // Price list
        var price = $form.find('.input-price').val();
        if (price == '' || price == 'Select Your Price Tab') {
            $form.find('.input-price').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $form.find('.input-price').focus();
            return false;
        }
        else {
            $form.find('.input-price').tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
        }

        var dataString = 'name=' + name + '&email=' + email + '&phone=' + phone + '&price=' + price;
        //alert(dataString); return false;

        $.ajax({
            type: 'POST',
            url: 'assets/php/registration-form.php',
            data: dataString,
            success: function () {
                $form.find('.form-alert').append('' +
                '<div class=\"alert alert-success registration-form-alert fade in\">' +
                '<button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button>' +
                '<strong>Registration Form Submitted!</strong> We will be in touch soon.' +
                '</div>' +
                '');
                $form[0].reset();
                $form.find('.form-control').focus().blur();
            }
        });
        return false;
    });

});

// Paypal Registration Form
// ---------------------------------------------------------------------------------------
$(function () {

    var $form = $('#registration-form-paypal');
    $form.find('.form-control').tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    $form.find('.form-control').on('blur', function(){
        $(this).tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    });

    // validate and process form
    $form.find('.submit-button').on('click', function () {

        
                // Paypal email
                var paypal_email = $form.find('.input-paypal').val();
                var currency_code = $form.find('.input-currency_code').val();
                var return_url = $form.find('.input-return_url').val();
                
                if($.trim(paypal_email)!=''){
                        
                        // Name
                        var name = $form.find('.input-name').val();
                        if (name == '' || name == 'Name....' || name == 'Name' || name == 'Name *' || name == 'Type Your Name...' || name == 'Name and Surname') {
                                $form.find('.input-name').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
                                $form.find('.input-name').focus();
                                return false;
                        }
        
                        // Email address
                        var email = $form.find('.input-email').val();
                        //var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
                        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
                        //console.log(filter.test(email));
                        if (!filter.test(email)) {
                                $form.find('.input-email').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
                                $form.find('.input-email').focus();
                                return false;
                        }
        
                        // Phone number
                        var phone = $form.find('.input-phone').val();
                        if (phone == 'Your Phone Number') {
                                phone = '';
                        }
        
                        // Price list
                        var price = $form.find('.input-price').val();
                        if (price == '' || price == 'Select Your Price Tab') {
                                $form.find('.input-price').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
                                $form.find('.input-price').focus();
                                return false;
                        }
                        else {
                                $form.find('.input-price').tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
                        }
        
                        var dataString = 'name=' + name + '&email=' + email + '&phone=' + phone + '&price=' + price;
                        //alert(dataString); return false;
        
                        $.ajax({
                                type: 'POST',
                                url: 'assets/php/registration-form.php',
                                data: dataString,
                                success: function () {
                                        $form.find('.form-alert').append('' +
                                        '<div class=\"alert alert-success registration-form-alert fade in\">' +
                                        '<button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button>' +
                                        '<strong>Registration Form Submitted!</strong> You will be redirected to Paypal to make payment.' +
                                        '</div>' +
                                        '');
                                        $form[0].reset();
                                        $form.find('.form-control').focus().blur();
                                        
                                        setTimeout(function(){
                                                var paypal_url = 'https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business='+paypal_email+'&item_name=Event fee&amount='+price+'&currency_code='+currency_code+'&return='+return_url;
                                                window.location = encodeURI(paypal_url);
        
                                        }, 3000);
                                
                                }
                        });
                        return false;
    
        }else{
                return false;   
        }
        });

});