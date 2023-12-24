// TodoListModel, TodoItemModel, elementタグ関数, render関数をインポートする。
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

// Appという名前付きクラスをエクスポートする。
export class App {
    constructor() {
        // 1. TodoListの初期化
        this.todoListModel = new TodoListModel();
    }
    mount() {
        // id="js-form", "js-form-input", "js-todo-list", "js-todo-count"の要素を取得
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        // 2. TodoListModelの状態が更新されたら表示を更新する
        /**
         * TodoListElementの実質的な中身
         * <ul>
         *  <li>Todoアイテム１のタイトル</li>
         *  <li>Todoアイテム２のタイトル</li>
         * </ul>
         */
        this.todoListModel.onChange(() => {
            // TodoリストをまとめるList要素
            const todoListElement = element`<ul />`;
            // それぞれのTodoItem要素をtodoListElement以下へ追加する
            const todoItems = this.todoListModel.getTodoItems();
            todoItems.forEach(item => {
                // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
                // input要素にはcheckboxクラスをつける
                const todoItemElement = item.completed
                    ? element`<li><input type="checkbox"
                            class="checkbox" checked><s>${item.title}
                            </s></input></li>`
                    : element`<li><input type="checkbox"
                            class="checkbox">${item.title}
                            </input></li>`;
                // チェックボックスがトグルしたときのイベントにリスナー関数を登録
                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", () => {
                    // 指定したTodoアイテムの完了状態を反転させる
                    this.todoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    })
                })
                todoListElement.appendChild(todoItemElement);
            });
            // containerElementの中身をtodoListElementで上書きする
            render(todoListElement, containerElement);
            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });
        // 3. フォームを送信したら、新しいTodoItemModelを追加する
        formElement.addEventListener("submit", (event) => {
            // イベントが発生したときに呼ばれるコールバック変数
            // subimitイベントの本来の動作（ページのリロード）を止める。
            event.preventDefault();
            // 新しいTodoItemをTodoListへ追加する
            this.todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
            // 入力欄を空文字列にしてリセットする。
            inputElement.value = "";
        });
    }
}