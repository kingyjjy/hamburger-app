$(document).on("pagecreate",function(){
    

    const isAuthorized = localStorage.getItem("isAuthorized");
    if(isAuthorized != 'authorized'){
        alert('회원전용 페이지 입니다. 로그인을 해주세요');
        location.href = 'login.html';
    }
    const params = new URLSearchParams(document.location.search);
    const fid = params.get('foodId');

    let wishStorage = localStorage.getItem("wishItems");
    let cartStorage = localStorage.getItem("cartItems");
    let orderStorage = localStorage.getItem("orderItems");

    if(wishStorage){
        wishStorage = JSON.parse(wishStorage);
        let li = "";
        wishStorage.forEach((list) => {
            li +=   `<li class="mywhisList">
                        <a href="main.html?foodId=${list.foodId}">
                            <img src="${list.foodImg}">
                            <h2>${list.title}</h2>
                            <p>${list.desc} <span>${list.price}</span></p>
                        </a>
                    </li>`;
        });
        $('#wishlist').html(li);
    }
    if(cartStorage){
        
        cartStorage = JSON.parse(cartStorage);
        let cartb = "";
       
        
        cartStorage.forEach((list) => {
            
            
            cartb += `<li class="mycartList">
                        <a class="cart-close" href="main.html?foodId=${list.foodId}" ><i class="ri-close-line"></i></a>
                        <a href="main.html?foodId=${list.foodId}">
                            <img src="${list.foodImg}" >
                            <h4>${list.title}</h4>
                        </a>
                        <p>
                            <input type="number" min="1" style="width: 40px;" id="quan" value="1" > 
                            <span id = "plusprice">${list.price}</span>
                        </p>
                        
                    </li>`;
            
        });
        $('#cartlist').html(cartb);
        
    }
    if(orderStorage){
        
        orderStorage = JSON.parse(orderStorage);
        let orderb = ""; 
        orderStorage.forEach((list) => {
        orderb += `<li class="mycartList">
                        <a class="cart-close" href="main.html?foodId=${list.foodId}" ><i class="ri-close-line"></i></a>
                        <a href="main.html?foodId=${list.foodId}">
                            <img src="${list.foodImg}" >
                            <h4>${list.title}</h4>
                        </a>
                        <p>
                            <input type="number" min="1" style="width: 40px;" id="quan" value="1" > 
                            <span id = "plusprice">${list.price}</span>
                        </p>
                        
                    </li>`;       
        });
        $('#order').html(orderb);     
    }


    $.ajax({
        type:"get",
        dataType:'JSON',
        url:'data/list.json',
        success:function(data){
            
            const rs = data.filter((list) => list.foodId == fid );
            console.log(rs);
            const result = rs[0];
            $('.food-title').text(result.foodTitle);
            $('.food-description, .opt').text(result.foodDescription);
            $('#food-img').attr("src", result.detailUrl);
            $('.opt-price').text(result.foodPrice.toLocaleString()+"원");
           
            let options = '';
            for(let i=0; i<result.foodTopping.length; i++){
                options += `<div class="ul-topping-box">
                                <div class="topping "
                                        style="background-image: url('asset/img/${result.foodTopping[i].img}.png');"
                                        data-optionprice="${result.foodTopping[i].toppingPrice}"
                                        data-option="${result.foodTopping[i].toppingName}">
                                    <p>${result.foodTopping[i].toppingName}</p>
                                    <p>${result.foodTopping[i].toppingPrice.toLocaleString()}원</p>
                                </div>
                            </div>`;

            $('.ul-topping').html(options);
            $('#foodId').val(fid);
            $('#price').val(result.foodPrice);
            $('#option-price').val(result.foodPrice);
            $('#total-price').val(result.foodPrice);

            $('.total').text(result.foodPrice.toLocaleString()+"원");
            }
                
            
        },
        error:function(){
            console.log("error");
        },
        complete:function(){
            myoption();
            // cartQuanprice();
            optionSlick.not('.slick-initialized').slick(slicks);
        }
    });

    // page가 이동될때 slick 초기화
    $(document).on("pagebeforechange",function(){
        distorySlick();
        optionSlick.slick("refresh");
    });


    $('#logout').click(function(){
        storageClear();
    });

    var optionSlick = $('.ul-topping');
    var slicks = {
        infinite:true,
        slidesToShow:3,
        dots:false,
        arrows:false
    }

    $('.btn-wish').click(function(){
        // console.log(typeof wishStorage);
        const foodId = $('#foodId').val();

        const id = wishStorage.filter((wish) => wish.foodId == foodId);

        if(id.length == 0){
            const foodTitle = $('.food-title').text();
            const foodDescription = $('.food-description').text();
            const price = $('.opt-price').text();
            const foodImg = $('#food-img').attr("src");

            let dummy = {"foodId":foodId,"title":foodTitle,"desc":foodDescription,"price":price,"foodImg":foodImg};
            wishStorage.push(dummy);
            localStorage.setItem("wishItems",JSON.stringify(wishStorage));
        }
            $.mobile.changePage("#list-wish", {transition:"slidedown", role:'dialog'});
        
       
    });

    $('.btn-cart').click(function(){
        // console.log(typeof wishStorage);
        
        const foodId = $('#foodId').val();

        const id = cartStorage.filter((cart) => cart.foodId == foodId);

        if(id.length == 0){
            
            const foodTitle = $('.food-title').text();
            const foodDescription = $('.food-description').text();
            const price = $('.opt-price').text();
            const foodImg = $('#food-img').attr("src");

            let dummy = {"foodId":foodId,"title":foodTitle,"desc":foodDescription,"price":price,"foodImg":foodImg};
            cartStorage.push(dummy);
            localStorage.setItem("cartItems",JSON.stringify(cartStorage));
            
            
        }
            $.mobile.changePage("#list-cart", {transition:"slidedown", role:'dialog'});
        
       
    });

    $('.btn-order').click(function(){
        // console.log(typeof wishStorage);
        
        const foodId = $('#foodId').val();

        const id =cartStorage.filter((cart) => cart.foodId == foodId);

        if(id.length == 0){
            
            const foodTitle = $('.food-title').text();
            const foodDescription = $('.food-description').text();
            const price = $('.opt-price').text();
            const foodImg = $('#food-img').attr("src");

            let dummy = {"foodId":foodId,"title":foodTitle,"desc":foodDescription,"price":price,"foodImg":foodImg};
            orderStorage.push(dummy);
            localStorage.setItem("orderItems",JSON.stringify(orderStorage));
            
            
        }
            $.mobile.changePage("#list-order", {transition:"slidedown", role:'dialog'});
        
       
    });
       
   
    
});//jquery

function cartQuanprice(){
    $('#quan').keyup(function(){
        let quantity = $('#quan').val();
        console.log(quantity);
    });
}

function distorySlick(){
    if($('.ul-topping, .slick').hasClass('slick-initialized')){
        $('.ul-topping, .slick').slick('unslick');
    }
}

function storageClear(){

    localStorage.clear();
//    const myStorage = ["wishItems","userid", "cartItems","members","userpass","isAuthorized"];
//    for(let i=0; i<myStorage.length; i++){
//     localStorage.removeItem(myStorage[i]);
//    }
   window.location.href = 'index.html';
}


