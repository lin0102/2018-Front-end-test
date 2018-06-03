import "./index.css";
import holiday from "./date.json";
import spring from "./img/春.jpg";
import summer from "./img/夏.jpg";
import autumn from "./img/秋.jpg";
import winter from "./img/冬.jpg";

let year = document.getElementById('yearselect'); //年份复选框
let month = document.getElementById('monthselect'); //月份复选框
let cometoday = document.querySelector('.today'); //查看今天

let tbody = document.querySelector('.calender-month'); //日历表
let nowyeartext = document.querySelector('.nowyear'); //右侧年份
let nowmonthdaytext = document.querySelector('.nowmonthday'); //右侧月日
let todaytext = document.querySelectorAll('.todaytext')[1]; //季节说明文字

let bodystyle = document.querySelector("#bodystyle"); //整体背景

let memo = document.querySelectorAll('.memo'); //添加和查看备忘录
let plusmemo = document.querySelector('.plusmemo'); //添加备忘录框
let memothing = document.querySelector('.thing'); //备忘事件
let memomonth = document.querySelector('#memomonth'); //备忘录框中月份选择
let memoday = document.querySelector('#memoday'); //备忘录框中日期选择
let memohour = document.querySelector('#memohour'); //备忘录框中小时选择
let submit = document.querySelector('#submit'); //备忘录中提交按钮
let watchmemo = document.querySelector('.watchmemo');
let memomain = document.querySelector('.memomain'); //备忘录表格

let storage = window.localStorage; //使用localstorage记录备忘事件，thingorder作为事件顺序标记

let color = ['lightgreen', 'lightcoral', 'gold', 'lightsteelblue']; //季节颜色
let text = ['花从春走过,留下缕缕花香', '叶从夏走过,留下片片荫凉', '风从秋走过,留下阵阵金浪', '雪从冬走过,留下种种希望']; //季节说明文字
let backimg = [spring, summer, autumn, winter]; //季节背景图

for (let i = 1900; i <= 2050; i++) {
    let yearoption = document.createElement('option');
    yearoption.value = i;
    yearoption.innerText = i + '年';
    year.appendChild(yearoption);
} //添加年份
for (let key in storage) {
    if (key[0] == 'm') {
        let thingobj = JSON.parse(storage[key]);
        memomain.insertRow(1);
        memomain.rows[1].insertCell(0);
        memomain.rows[1].cells[0].innerText = thingobj.thing;
        memomain.rows[1].insertCell(1);
        memomain.rows[1].cells[1].innerText = thingobj.month;
        memomain.rows[1].insertCell(2);
        memomain.rows[1].cells[2].innerText = thingobj.day;
        memomain.rows[1].insertCell(3);
        memomain.rows[1].cells[3].innerText = thingobj.hour;
    }
} //遍历localstorage对象，填入备忘录
let comingthing = selectthing();

function selectthing() {
    let thingobj = storage.getItem("memo1");
    let time;
    for (let key in storage) {
        if (key[0] == 'm') {
            let timekey = new Date(2018, storage[key].month, storage[key].day, storage[key].hour, 0, 0);
            time = new Date(2018, thingobj.month, thingobj.day, thingobj.hour, 0, 0);
            if (timekey < time) {
                thingobj = storage[key];
            }
        }
    }
    if (time > new Date()) {
        return time;
    } else {
        return;
    }
} //查找出离当前时间最近的备忘录事件
function changecalender(year, month) {
    let k = 1;
    let now = new Date();
    let nowyear = now.getFullYear();
    let nowmonth = now.getMonth() + 1;
    let today = now.getDate();
    let search = year * 100 + month;
    let monthholiday = [];
    for (let key in holiday) { //获取该月中的节假日天数
        if (key == search) {
            let i = 0;
            for (let keyy in holiday[key]) {
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
                for (var l = 0; l < monthholiday.length; l++) {
                    if (monthholiday[l] == k) {
                        tbody.rows[i].cells[j].style.color = 'red';
                        break;
                    }
                }
                if (l == monthholiday.length) {
                    tbody.rows[i].cells[j].style.color = 'black';
                }
                if (year == nowyear && month == nowmonth && today == k) {
                    tbody.rows[i].cells[j].style.backgroundColor = 'white';
                } else {
                    tbody.rows[i].cells[j].style.backgroundColor = '';
                }
                k++;
            } else {
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
        return 0;
    } else if (month >= 5 && month <= 7) {
        return 1;
    } else if (month >= 8 && month <= 10) {
        return 2;
    } else if (month >= 11 || month <= 1) {
        return 3;
    }
} //判断季节

function appearance(season) {
    bodystyle.style.backgroundImage = 'url(' + backimg[season] + ')';
    year.style.backgroundColor = color[season];
    month.style.backgroundColor = color[season];
    cometoday.style.backgroundColor = color[season];
    plusmemo.style.backgroundColor = color[season];
    plusmemo.style.boxShadow = '0 ' + '0 ' + '5px ' + '5px ' + color[season];
    watchmemo.style.backgroundColor = color[season];
    watchmemo.style.boxShadow = '0 ' + '0 ' + '5px ' + '5px ' + color[season];
    memo[0].style.backgroundColor = color[season];
    memo[1].style.backgroundColor = color[season];
    todaytext.innerText = text[season];
} //改变样式

initcalender();

year.addEventListener('change', () => {
    changecalender(parseInt(year.value), parseInt(month.value));
});
month.addEventListener('change', () => {
    changecalender(parseInt(year.value), parseInt(month.value));
    let season = judgeseason(month.value);
    appearance(season);
}); //监听年月改变

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 38) { //上滑
        if (month.value > 1) {
            month.value--;
        } else {
            year.value--;
            month.value = 12;
        }
        changecalender(parseInt(year.value), parseInt(month.value));
        let season = judgeseason(month.value);
        appearance(season);
    } else if (e.keyCode == 40) { //下滑
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
}); //鼠标滑轮切换月份
cometoday.addEventListener('click', () => {
    initcalender();
});
memo[0].addEventListener('click', () => {
    if (plusmemo.style.display == 'none') {
        plusmemo.style.display = 'flex';
    } else {
        plusmemo.style.display = 'none';
    }
}) //点击添加备忘录出现备忘录添加框，再次点击即关闭
memo[1].addEventListener('click', () => {
    if (watchmemo.style.display == 'none') {
        watchmemo.style.display = 'flex';
    } else {
        watchmemo.style.display = 'none';
    }
})
memomonth.addEventListener('change', () => {
    memoday.innerHTML = '';
    let year = new Date().getFullYear();
    let monthdays = new Date(year, memomonth.value, 0).getDate();
    for (let i = 1; i <= monthdays; i++) {
        let dayoption = document.createElement('option');
        dayoption.value = i;
        dayoption.innerText = i + '日';
        memoday.appendChild(dayoption);
    } //根据月份选择添加日
})
submit.addEventListener('click', () => {
    if (memothing.value.replace(/\s+/, '').length == '0' || memomonth.value == 0) {
        alert('请正确输入');
    } else {
        let memoobj = {
            thing: memothing.value,
            month: parseInt(memomonth.value),
            day: parseInt(memoday.value),
            hour: parseInt(memohour.value)
        }
        memomain.insertRow(1);
        memomain.rows[1].insertCell(0);
        memomain.rows[1].cells[0].innerText = memoobj.thing;
        memomain.rows[1].insertCell(1);
        memomain.rows[1].cells[1].innerText = memoobj.month;
        memomain.rows[1].insertCell(2);
        memomain.rows[1].cells[2].innerText = memoobj.day;
        memomain.rows[1].insertCell(3);
        memomain.rows[1].cells[3].innerText = memoobj.hour;
        if (!storage.getItem(thingorder)) {
            var thingorder = 1;
            storage.setItem('thingorder', thingorder);
        }
        let order = storage.getItem('thingorder');
        storage.setItem('memo' + order, JSON.stringify(memoobj));
        thingorder++;
        storage.setItem('thingorder', thingorder);
        alert('添加成功');
        memothing.value = '';
        plusmemo.style.display = 'none';
        comingthing = selectthing();
    }
});
setInterval(() => {
    let nowtime = new Date();
    if (nowtime == comingthing) {
        alert('不要忘了重要的事情呦');
    }
}, 1000);