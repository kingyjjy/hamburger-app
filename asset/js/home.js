$(document).on("pagecreate",function(){
    const search = $('#search').val();
    console.log(search);
    const isAuthorized = localStorage.getItem("isAuthorized");
    if(isAuthorized != 'authorized'){
        alert('회원전용 페이지 입니다. 로그인을 해주세요');
        location.href = "login.html";
    }
    $.ajax({
        type : "get",
        url : "data/list.json",
        dataType : "json",
        success: function(data){
            // console.log(data);
            data.forEach((list,i) => {
                $(".list").append(`<a href="main.html?foodId=${list.foodId}" data-ajax="false" class="row food-card">
                <div class="col-4 my-auto">
                    <img src="${list.foodImg}" class="img-fluid" alt="${list.foodTitle}">
                </div>
                <div class="col-7">
                    <h1 class="food-title">
                        ${list.foodTitle}
                    </h1>
                    <p class="food-description">${list.foodDescription}</p>
                    <div class="food-ratings">
                        <i class="ri-star-${list.foodStar[0]}"></i>
                        <i class="ri-star-${list.foodStar[1]}"></i>
                        <i class="ri-star-${list.foodStar[2]}"></i>
                        <i class="ri-star-${list.foodStar[3]}"></i>
                        <i class="ri-star-${list.foodStar[4]}"></i>
                    </div>
                    <p class="food-price">${list.foodPrice.toLocaleString()}원</p>
                </div>
                <div class="col-1">
                    <p class="food-wish">
                        <i class="ri-heart-fill"></i>
                    </p>
                </div>
            </a>`);
            });
        },
        error: function(){
            console.log("에러");
        }
    });

    

    $('#logout').click(function(){
        storageClear();
    });

    $('.slider').not('.slick-initialized').slick({
        autoplay:true,
        autoplaySpeed:3000,
        dots:true,
        arrows:false
    });
});


function storageClear(){
   const myStorage = ["wishItems","userid", "cartItems","members","userpass","isAuthorized"];
   for(let i=0; i<myStorage.length; i++){
    localStorage.removeItem(myStorage[i]);
   }
   window.location.href = "index.html";
}
