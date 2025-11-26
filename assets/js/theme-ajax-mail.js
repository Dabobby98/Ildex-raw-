// Content Contact Form
// ---------------------------------------------------------------------------------------
$(function () {
    $("#af-form .form-control").tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    $('#af-form .form-control').blur(function () {
        $(this).tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    });

    $("#af-form #submit_btn").click(function () {
        // validate and process form
        // first hide any error messages
        $('#af-form .error').hide();

        var name = $("#af-form input#name").val();
        if (name == "" || name == "Name...." || name == "Name" || name == "Name *" || name == "Type Your Name...") {
            $("#af-form input#name").tooltip({placement: 'bottom', trigger: 'manual'}).tooltip('show');
            $("#af-form input#name").focus();
            return false;
        }
        var email = $("#af-form input#email").val();
        //var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
        //console.log(filter.test(email));
        if (!filter.test(email)) {
            $("#af-form input#email").tooltip({placement: 'bottom', trigger: 'manual'}).tooltip('show');
            $("#af-form input#email").focus();
            return false;
        }
        var message = $("#af-form #input-message").val();
        if (message == "" || message == "Message...." || message == "Message" || message == "Message *" || message == "Type Your Message...") {
            $("#af-form #input-message").tooltip({placement: 'bottom', trigger: 'manual'}).tooltip('show');
            $("#af-form #input-message").focus();
            return false;
        }

        var dataString = 'name=' + name + '&email=' + email + '&message=' + message;
        //alert (dataString);return false;

        $.ajax({
            type:"POST",
            url:"assets/php/contact-form.php",
            data:dataString,
            success:function () {
                $('#af-form').prepend("<div class=\"alert alert-success fade in\"><button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button><strong>Contact Form Submitted!</strong> We will be in touch soon.</div>");
                $('#af-form')[0].reset();
            }
        });
        return false;
    });
});

// Content Registration Form - Mailchimp Integration
// ---------------------------------------------------------------------------------------
$(function () {

    var $form = $('#registration-form');
    var $formAlert = $form.find('.form-alert');
    var $submitBtn = $form.find('.submit-button');
    var originalBtnText = $submitBtn.html();
    var iframeName = 'mailchimp-iframe-' + Date.now();

    $form.find('.form-control').tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    $form.find('.form-control').on('blur', function(){
        $(this).tooltip({placement: 'top', trigger: 'manual'}).tooltip('hide');
    });

    // Create hidden iframe for form submission
    var $iframe = $('<iframe name="' + iframeName + '" style="display:none;"></iframe>');
    $('body').append($iframe);

    // Handle form submission
    $form.on('submit', function(e) {
        
        // Validate Company Name
        var company = $form.find('.input-company').val();
        if (company == '' || company.trim() == '') {
            $form.find('.input-company').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $form.find('.input-company').focus();
            e.preventDefault();
            return false;
        }

        // Validate Name
        var name = $form.find('.input-name').val();
        if (name == '' || name.trim() == '') {
            $form.find('.input-name').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $form.find('.input-name').focus();
            e.preventDefault();
            return false;
        }

        // Validate Email
        var email = $form.find('.input-email').val();
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
        if (!filter.test(email)) {
            $form.find('.input-email').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $form.find('.input-email').focus();
            e.preventDefault();
            return false;
        }

        // Validate Phone
        var phone = $form.find('.input-phone').val();
        if (phone == '' || phone.trim() == '') {
            $form.find('.input-phone').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
            $form.find('.input-phone').focus();
            e.preventDefault();
            return false;
        }

        // Validate Booth Type
        var boothType = $form.find('select[name="MERGE6"]').val();
        if (!boothType || boothType == '') {
            showFormAlert('error', 'Vui lòng chọn loại gian hàng.');
            e.preventDefault();
            return false;
        }

        // Set form to submit to iframe
        $form.attr('target', iframeName);
        $form.attr('action', 'https://ildex-vietnam.us11.list-manage.com/subscribe/post');

        // Show loading state
        $submitBtn.html('<i class="fa fa-spinner fa-spin"></i> Đang gửi...');
        $submitBtn.prop('disabled', true);

        // Handle iframe load (submission complete)
        $iframe.off('load').on('load', function() {
            $submitBtn.html(originalBtnText);
            $submitBtn.prop('disabled', false);
            
            // Show success message (we can't read iframe content due to cross-origin)
            showFormAlert('success', 'Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn sớm.');
            $form[0].reset();
            $form.find('.selectpicker').selectpicker('refresh');
        });

        // Allow form to submit normally to iframe
        return true;
    });

    function showFormAlert(type, message) {
        var alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        var icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
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
        
        if (type === 'success') {
            setTimeout(function() {
                $formAlert.find('.alert').fadeOut();
            }, 5000);
        }
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