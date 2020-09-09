
// 宣告
// 瓶子1200px以上定位
let setPosition = ['37%/130px','44%/110px','41%/80px','52%/195px','30%/60px','37%/0px',
                    '20%/80px','26%/38px','5%/40px','14%/50px','8%/25px','18%/0px',
                    '71%/85px','64%/140px','84%/145px','66%/5px','56%/105px','50%/0px',
                    '85%/50px','60%/-10px','77%/75px','71%/15px','20%/-55px','2%/-5px',
                    '69%/-20px','47%/-35px','56%/-35px','88%/20px','80%/-15px','77%/-80px']
//768px
let setPosition768 = ['37%/50px','44%/90px','41%/30px','53%/120px','30%/40px','37%/0px',
                    '18%/80px','26%/10px','5%/40px','15%/60px','8%/10px','18%/-30px',
                    '70%/50px','65%/90px','80%/60px','66%/-20px','56%/50px','50%/-50px',
                    '85%/-20px','60%/0px','75%/20px','71%/0px','23%/-70px','2%/-20px',
                    '68%/-40px','45%/0px','56%/-40px','82%/-20px','60%/-50px','76%/-90px']    
// 色票全30色
let colors = ['#A4A4A2','#CABFD3','#C3C9D9','#8996A6','#FEFAEE','#BEBCBD',
                '#C7B4A6','#9FA5BB','#B1AEB5','#A57D7C','#E1E3E2','#C9C5BA',
                '#96A28A','#D6C8AE','#B3AFA3','#B6C5B2','#788976','#C7B8A5',
                '#9F9687','#DED8D8','#656462','#675450','#EBD2CE','#DDCDD0',
                '#D8D4C9','#F1EDE6','#F1EDE6','#939391','#EEECED','#FFFBF2'
                ];
// 
let newColors=[];
colors.sort();


// 色卡copy
let copied='';
// BGC
let container = document.querySelector('.container');
// 瓶子們
let bottles = document.querySelectorAll('.main ul li');
// 色卡們
let cards = document.querySelectorAll('.palette .card');
// ALL btn
let btnAll = document.querySelector('.all');
// colorChips
let colorChips = document.querySelector('.colorChips');
// cancelLeft
let cancelLeft = document.querySelector('.cancelLeft i');
// info btn
let btnInfo = document.querySelector('.info');
// artist
let artist = document.querySelector('.artist');
// cancelRight
let cancelRight = document.querySelector('.cancelRight i');
// slider
let sliderBtns = document.querySelectorAll('.sliderBtn a i');
    
// 填色cards
for(i=0;i<cards.length;i++){
    cards[i].index=i;
    cards[i].style.backgroundColor=colors[i];
    cards[i].classList.add(colors[i]);
    
    // 色卡監聽事件
    cards[i].addEventListener('click',function(e){
        let hex = document.querySelector('.hex');
        copied=this.classList.item(1);
        hex.children[0].innerText=copied;
        container.style.backgroundColor=copied;
        //    
        let rgb = document.querySelector('.rgb span');
        rgb.innerText=hexToRgb(copied);
        // 移除動畫
        removeTada();                
    })
}

// 填色瓶子
for(i=0;i<bottles.length;i++){
    bottles[i].index=i;
    // svg
    bottles[i].children[0].style.fill=colors[i];
    // li
    bottles[i].classList.add(colors[i]);
    // 瓶子set位置
    widthResize() 

    // 監聽事件
    bottles[i].children[0].addEventListener('click',function(e){
        // 移除動畫
        removeTada();
        //更換背景色 
        let choiceColor = this.parentNode.classList.item(1);            
        container.style.backgroundColor=choiceColor;
        // 給動畫特效
        this.parentNode.classList.add('tada');
        // 更換hex色號文字
        let hex = document.querySelector('.hex');
        hex.children[0].innerText=choiceColor;
        // 更換rgb色號文字
        let rgb = document.querySelector('.rgb span');
        rgb.innerText=hexToRgb(choiceColor);
    })
}

// function
//寬變時判斷並給瓶子位置 
function widthResize(){
    let ul = document.querySelector('.main ul');
    if(window.innerWidth>=1200){
        ul.classList.remove('transition08');
        bottles[i].style.left = setPosition[i].split('/')[0];
        bottles[i].style.bottom = setPosition[i].split('/')[1];
    }else if(1200>window.innerWidth && window.innerWidth>=768){
        ul.classList.remove('transition08');
        bottles[i].style.left = setPosition768[i].split('/')[0];
        bottles[i].style.bottom = setPosition768[i].split('/')[1];
    }else{
        ul.classList.add('transition08');
    }
}
// 移除動畫
function removeTada(){
    for(j=0;j<bottles.length;j++){
            bottles[j].index=j;
            bottles[j].classList.remove('tada');
        }
}
// hex轉rgb
function hexToRgb(choiceColor){
        let r = parseInt(choiceColor.slice(1,3),16);
        let g = parseInt(choiceColor.slice(3,5),16);
        let b = parseInt(choiceColor.slice(5,7),16);
        let rgbColor = 'RGB('+r+','+g+','+b+')';
        console.log(rgbColor)
        return rgbColor
}
// 複製色號
function copyIt(node){
        // 色號複製
        let TextRange = document.createRange();
        TextRange.selectNode(node);
        select = window.getSelection();
        select.removeAllRanges();
        select.addRange(TextRange);
        document.execCommand("copy");
        // 移除反白
        select.removeAllRanges();
        // notice
        notice.classList.add('notice');
}; 

// 監聽事件
// AllBtn監聽事件
btnAll.addEventListener('click',function(e){
    colorChips.classList.remove('translateX700');
    cancelRight.classList.add('translateX100');
})
// infoBtn監聽事件
btnInfo.addEventListener('click',function(e){
    artist.classList.remove('translateX250');
    cancelLeft.classList.add('translateX100plus');
})
// cancelLeftBtn監聽事件
cancelLeft.addEventListener('click',function(e){
    artist.classList.add('translateX250');
    this.classList.remove('translateX100plus');
})
    // cancelRightBtn監聽事件
cancelRight.addEventListener('click',function(e){
    colorChips.classList.add('translateX700');
    this.classList.remove('translateX100');  
});

// 視窗寬變時
window.addEventListener('resize',function(e){
    // ul拉回0
    let ul = document.querySelector('.main ul');
    ul.style.left = 0;
    //寬變時判斷並給瓶子位置 
    for(i=0;i<bottles.length;i++){
        widthResize()
    }
});


// slider控制ul左右
sliderBtns[1].addEventListener('click',function(e){
    let ul = document.querySelector('.main ul');
    let now =window.getComputedStyle(ul).left;
    let nowLeft = now.split('px')[0];
    if(nowLeft>-5500){
        ul.style.left = (Number(nowLeft)-200)+'px'
    }
})

sliderBtns[0].addEventListener('click',function(e){
    let ul = document.querySelector('.main ul');
    let now =window.getComputedStyle(ul).left;
    let nowLeft = now.split('px')[0];
    if(nowLeft<0){
    ul.style.left = (Number(nowLeft)+200)+'px'
    }
});

// 複製icon監聽事件
let copys = document.querySelectorAll('.copy2 i');
for(i=0;i<copys.length;i++){
    copys[i].addEventListener('click',function(e){
    // 色號複製   
    copyIt(this.parentNode.parentNode.children[0]);                  
    })
};

// copied提示
let notice = document.querySelector('.copied');
notice.addEventListener('animationend',function(e){
    this.classList.remove('notice');
});