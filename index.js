import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://dtdteam-a4fb5-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")//新增firebase資料庫 取名shoppingList，並用shoppingListInDB在城市中命名

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")//獲得資料庫



//監聽按下按下後的事件
addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue);

    clearInputFieldEl();

    // appendItemToShoppingListEl(inputValue);
})


//隨時更新資料庫中的數據並印到畫面上
onValue(shoppingListInDB, function (snapshot) {

if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val())//將撈出的物件資料轉為陣列(內容包括物件的ID與物件的值)

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {


        let currentItem = itemsArray[i] //創一方便識別的變數名稱取值
        let currentItemID = currentItem[0]; //取物件的ID
        let currentItemValue = currentItem[1];  //取物件的值
        appendItemToShoppingListEl(currentItem);
    }
}
else{
    shoppingListEl.innerHTML="暫無任何任務..."
}



  
})


// 涵式庫

//清空葉面上輸入清單
function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}


//清空輸入欄
function clearInputFieldEl() {
    inputFieldEl.value = ""
}


//案蝦添加後畫布更新HTML
function appendItemToShoppingListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];

    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    
    
    
    let newEl = document.createElement("li");//創建新的Element
    newEl.textContent = itemValue;//在element中新增文字內容


    newEl.addEventListener("click",function(){
        let excactLocationOfItenInDB=ref(database,`shoppingList/${itemID}`)
        remove(excactLocationOfItenInDB);
    })


    shoppingListEl.append(newEl);//在清單中新增元素


   

}