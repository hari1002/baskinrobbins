$(function(){

  const $gnb = $('#wrap > header > .menu > nav > .gnb');
  const $lnb = $gnb.find('.lnb');
  const $bg_lnb = $('#wrap > header > .bg_lnb');

  const $container = $('.visual > .slides > .slides-container');
  const $indicator = $('.visual > .slides > .slides-pagination > li > a');

  const $eventSlide = $('.event > .event_slides > ol');
  const $eventindicator = $('.event > .event_slides > .slides-pagination > li > a'); 

  const $btnPrev = $('.prev');
  const $btnNext = $('.next');

  let intervalKey = null;
  let nowIdx = 0; 


//네비게이션 배경판
$gnb.on('mouseenter', function(){
  $bg_lnb.stop().slideDown(350); 
  $lnb.stop().fadeIn(600); //서브메뉴 노출
  
});

$gnb.on('mouseleave', function(){
  $bg_lnb.stop().slideUp(350); 
  $lnb.stop().fadeOut(100); //서브메뉴 노출
  
});

$bg_lnb.on('mouseover', function(){
  $gnb.trigger('mouseover');
});

$bg_lnb.on('mouseout', function(){
  $gnb.trigger('mouseout');
});


 //이벤트 슬라이드 함수 활성화
 function slideFn(){
  $eventindicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');

  $eventSlide.stop().animate({
    left : -1210*nowIdx
    },300);
 }

 $eventindicator.on('click', function(evt){
  evt.preventDefault();
     
  //index값 추출
  nowIdx = $eventindicator.index(this);
  slideFn();
});
  

  //메인 슬라이드 함수 활성화
  function moveFn(){
    $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');

    $container.stop().animate({
    left : -(100 * (nowIdx + 7)) + "%"
    });
  }

  $indicator.on('click', function(evt){
    evt.preventDefault();
       
    //index값 추출
    nowIdx = $indicator.index(this);
    moveFn();
  });

     //자동재생
     intervalKey = setInterval(function(){

      if(nowIdx<=5){
          nowIdx++;
      }else{
          nowIdx=0;
      }
      moveFn();
    },3000); 

    
    //마우스 오버시 슬라이드 멈춤
    $container.on('mouseover', function(){

      clearInterval(intervalKey);
    });
    $container.on('mouseleave', function(){

      intervalKey = setInterval(function(){

        if(nowIdx<=5){
            nowIdx++;
        }else{
            nowIdx=0;
        }
        moveFn();
      },3000); 
      
    });


    //다음버튼
    $btnNext.on('click',function(evt){

      if(nowIdx<=5){
          nowIdx++;
      }else{
          nowIdx=0;
      }
      moveFn();
      evt.preventDefault();
  });

    //이전버튼
    $btnPrev.on('click',function(evt){

      if(nowIdx>=1){ 
          nowIdx--;
      }else{ 
          nowIdx=6;
      }
      moveFn();
      evt.preventDefault();
  });



  
});