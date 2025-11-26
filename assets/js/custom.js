(function($) {
    'use strict';
    
    $(document).ready(function() {
        var $form = $('#registration-form');
        var $formAlert = $form.find('.form-alert');
        var $submitBtn = $('#mc-submit-btn');
        var originalBtnText = $submitBtn.html();
        
        $form.on('submit', function(e) {
            e.preventDefault();
            
            var $boothSelect = $form.find('select[name="MERGE6"]');
            var boothValue = $boothSelect.val();
            
            if (!boothValue) {
                showAlert('error', 'Vui lòng chọn loại gian hàng.');
                return false;
            }
            
            $submitBtn.html('<i class="fa fa-spinner fa-spin"></i> Đang gửi...');
            $submitBtn.prop('disabled', true);
            
            $.ajax({
                type: 'GET',
                url: $form.attr('action'),
                data: $form.serialize(),
                cache: false,
                dataType: 'jsonp',
                jsonp: 'c',
                contentType: 'application/json; charset=utf-8',
                
                error: function(err) {
                    $submitBtn.html(originalBtnText);
                    $submitBtn.prop('disabled', false);
                    showAlert('error', 'Không thể kết nối. Vui lòng thử lại sau.');
                },
                
                success: function(data) {
                    $submitBtn.html(originalBtnText);
                    $submitBtn.prop('disabled', false);
                    
                    if (data.result === 'success') {
                        showAlert('success', 'Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn sớm.');
                        $form[0].reset();
                        $form.find('.selectpicker').selectpicker('refresh');
                    } else {
                        var message = data.msg || 'Đã xảy ra lỗi. Vui lòng thử lại.';
                        message = message.replace(/<[^>]*>/g, '');
                        
                        if (message.indexOf('already subscribed') > -1) {
                            message = 'Email này đã được đăng ký trước đó.';
                        } else if (message.indexOf('valid email') > -1 || message.indexOf('invalid') > -1) {
                            message = 'Vui lòng nhập địa chỉ email hợp lệ.';
                        } else if (message.indexOf('required') > -1) {
                            message = 'Vui lòng điền đầy đủ các thông tin bắt buộc.';
                        }
                        
                        showAlert('error', message);
                    }
                }
            });
            
            return false;
        });
        
        function showAlert(type, message) {
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
    
})(jQuery);
