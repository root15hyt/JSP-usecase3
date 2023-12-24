console.log("App.js: loaded");
// Appという名前付きクラスをエクスポートする。
export class App {
    constructor() {
        console.log("App initialized");
    }

    mount() {
        // id="js-form"の要素を取得
        const formElement = document.querySelector("#js-form");
        // id="js-form-input"の要素を取得
        const inputElement = document.querySelector("#js-form-input");
        // form要素から発生したsubmitイベントを受け取る
        formElement.addEventListener("submit", (event) => {
            // イベントが発生したときに呼ばれるコールバック関数
            // submitイベントの本来の動作を止める。
            event.preventDefault();
            console.log(`入力欄の値: ${inputElement.value}`);
        });
    }
}