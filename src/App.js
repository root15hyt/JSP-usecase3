console.log("App.js: loaded");
// elementタグ関数をインポートする。
import { element } from "./view/html-util.js";

// Appという名前付きクラスをエクスポートする。
export class App {
    constructor() {
        console.log("App initialized");
    }

    mount() {
        // id="js-form", "js-form-input", "js-todo-list", "js-todo-count"の要素を取得
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        // Todoアイテム数
        let todoItemCount = 0;
        // form要素から発生したsubmitイベントを受け取る
        formElement.addEventListener("submit", (event) => {
            // イベントが発生したときに呼ばれるコールバック関数
            // submitイベントの本来の動作を止める。
            event.preventDefault();
            // 追加するTodoアイテムの要素（li要素）を作成する。
            const todoItemElement = element`<li>${inputElement.value}</li>`;
            // Todoアイテムをcontainerに追加する。
            containerElement.appendChild(todoItemElement);
            // Todoアイテム数を+1して、表示されているテキストを更新する。
            todoItemCount += 1;
            todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
            // 入力欄を空文字列にしてリセットする。
            inputElement.value = "";
        });
    }
}