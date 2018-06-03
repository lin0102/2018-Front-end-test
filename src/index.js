import "./index.css";
import holiday from "./date.json";
import spring from "./img/春.jpg";
import summer from "./img/夏.jpg";
import autumn from "./img/秋.jpg";
import winter from "./img/冬.jpg";

let year = document.getElementById('yearselect');
let month = document.getElementById('monthselect');
let cometoday = document.querySelector('.today');
let tbody = document.querySelector('.calender-month');
let nowyeartext = document.querySelector('.nowyear');
let nowmonthdaytext = document.querySelector('.nowmonthday');
let todaytext = document.querySelectorAll('.todaytext')[1];
let bodystyle = document.querySelector("#bodystyle");

function changecalender(year, month) {
    let k = 1;
    let now = new Date();
    let nowyear = now.getFullYear();
    let nowmonth = now.getMonth() + 1;
    let today = now.getDate();
    let search = year * 100 + month;
    let monthholiday = [];
    for(let key in holiday){  //获取该月中的节假日天数
        if(key == search){
            let i = 0;
            for(let keyy in holiday[key]){
                monthholiday[i] = parseInt(keyy);
                i++;
            }
            break;
        }
    }
    let monthdays = new Date(year, month, 0).getDate(); //当月总天数
    let j = new Date(year, month - 1, 1).getDay(); //计算当月一日为周几
    for (let i = j - 1; i >= 0; i--) {
        tbody.rows[1].cells[i].innerText = '';
    }
    for (let i = 1; i < 7; i++) {
        for (; j < 7; j++) {
            if (k <= monthdays) {
                tbody.rows[i].cells[j].innerText = k;
                for(var l = 0; l < monthholiday.length; l++){
                    if(monthholiday[l] == k){
                        tbody.rows[i].cells[j].style.color = 'red';
                        break;
                    }
                }
                if(l == monthholiday.length){
                    tbody.rows[i].cells[j].style.color = 'black';
                }
                if(year == nowyear && month == nowmonth && today == k){
                    tbody.rows[i].cells[j].style.backgroundColor = 'white';
                } else{
                    tbody.rows[i].cells[j].style.backgroundColor = '';
                }
                k++;
            }
            else {
                tbody.rows[i].cells[j].innerText = '';
            }
        }
        j = 0;
    } //遍历日历表，使星期和天数对应，并为节假日和今天写上样式
}

function initcalender() {
    let now = new Date();
    let nowyear = now.getFullYear();
    let nowmonth = now.getMonth() + 1;
    let today = now.getDate();
    changecalender(nowyear, nowmonth);
    year.value = nowyear;
    month.value = nowmonth;
    nowyeartext.innerText = nowyear + '年';
    nowmonthdaytext.innerText = nowmonth + '月' + today + '日';
    let season = judgeseason(nowmonth);
    appearance(season);
} //初始化日历,定位今天

function judgeseason(month) {
    if (month >= 2 && month <= 4) {
        return 1;
    } else if (month >= 5 && month <= 7) {
        return 2;
    } else if (month >= 8 && month <= 10) {
        return 3;
    } else if (month >= 11 || month <= 1) {
        return 4;
    }
} //判断季节

function appearance(season) {
    switch (season) {
        case 1:
            bodystyle.style.backgroundImage = 'url(' + spring + ')';
            year.style.backgroundColor = 'LIGHTGREEN';
            month.style.backgroundColor = 'LIGHTGREEN';
            cometoday.style.backgroundColor = 'LIGHTGREEN';
            todaytext.innerText = '花从春走过,留下缕缕花香';
            break;
        case 2:
            bodystyle.style.backgroundImage = 'url(' + summer + ')';
            year.style.backgroundColor = 'LIGHTCORAL';
            month.style.backgroundColor = 'LIGHTCORAL';
            cometoday.style.backgroundColor = 'LIGHTCORAL';
            todaytext.innerText = '叶从夏走过,留下片片荫凉';
            break;
        case 3:
            bodystyle.style.backgroundImage = 'url(' + autumn + ')';
            year.style.backgroundColor = 'GOLD';
            month.style.backgroundColor = 'GOLD';
            cometoday.style.backgroundColor = 'GOLD';
            todaytext.innerText = '风从秋走过,留下阵阵金浪';
            break;
        case 4:
            bodystyle.style.backgroundImage = 'url(' + winter + ')';
            year.style.backgroundColor = 'LIGHTSTEELBLUE';
            month.style.backgroundColor = 'LIGHTSTEELBLUE';
            cometoday.style.backgroundColor = 'LIGHTSTEELBLUE';
            todaytext.innerText = '雪从冬走过,留下种种希望';
            break;
    }
} //改变样式
for (let i = 1900; i <= 2050; i++) {
    let yearoption = document.createElement('option');
    yearoption.value = i;
    yearoption.innerText = i + '年';
    year.appendChild(yearoption);
}
initcalender();

year.addEventListener('change', function () {
    changecalender(parseInt(year.value), parseInt(month.value));
});
month.addEventListener('change', function () {
    changecalender(parseInt(year.value), parseInt(month.value));
    let season = judgeseason(month.value);
    appearance(season);
});  //监听年月改变

window.addEventListener('keydown', function (e) {
    if (e.keyCode == 38) {  //上滑
        if (month.value > 1) {
            month.value--;
        } else {
            year.value--;
            month.value = 12;
        }
        changecalender(parseInt(year.value), parseInt(month.value));
        let season = judgeseason(month.value);
        appearance(season);
    } else if (e.keyCode == 40) {  //下滑
        if (month.value < 12) {
            month.value++;
        } else {
            year.value++;
            month.value = 1;
        }
        changecalender(parseInt(year.value), parseInt(month.value));
        let season = judgeseason(month.value);
        appearance(season);
    }
});  //鼠标滑轮切换月份
cometoday.addEventListener('click', function () {  
    initcalender();
})