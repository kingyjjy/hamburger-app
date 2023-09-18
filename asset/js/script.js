function myoption(){
    let price = parseInt($('#price').val());
    let totalprice =$('#price').val();
    let option_arr = [];
   
    $('.down').click(function(){
        let ct = $('.count-only').val();
        if(ct > 1){
            ct--;
            $('.count-only').val(ct);
            let optionprice = $('#option-price').val();
            totalprice = optionprice * ct;
            $('#total-price').val(totalprice);
            $('.total').text(totalprice.toLocaleString() + '원');
        }
    });
    $('.up').click(function(){
        let ct = $('.count-only').val();
        ct++;
        let cartC = $('.count-only').val(ct);
        
        let optionprice = $('#option-price').val();
        totalprice = optionprice * ct;
       
        $('#total-price').val(totalprice);
        $('.total').text(totalprice.toLocaleString() + '원');
    });

    // $('.topping').click(function(){
        $(document).on("click",".topping",function(){
            const option = $(this).data("option");
            let ct = parseInt($('.count-only').val());
            let addPrice = parseInt($(this).data("optionprice"));
            let addPrice2 = addPrice * ct;
            price = parseInt($('#option-price').val());

        if($(this).hasClass('active')){
            $(this).removeClass('active');
            totalprice = parseInt(totalprice) - addPrice2;
            optionprice = price - addPrice;
            option_arr.pop(option);
        }else{
            $(this).addClass('active');
            totalprice = parseInt(totalprice) +addPrice2;
            optionprice = price + addPrice;
            option_arr.push(option);
        }
        
        $('#total-price').val(totalprice);
        $('#option-price').val(optionprice);
        $('.total').text(totalprice.toLocaleString() + '원');
        });
        
        
    

}
