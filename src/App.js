// TodoListModel, TodoItemModel, elementタグ関数, render関数をインポートする。
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

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
            // それぞれのTodoItem要素をtodoListElement以下へ追加する
            const todoItems = this.todoListModel.getTodoItems();
            // todoItemsに対応するTodoListViewを作成する
            const todoListView = new TodoListView();
            const todoListElement = todoListView.createElement(todoItems, {
                // Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
                onDeleteTodo: ({ id }) => {
                    this.todoListModel.deleteTodo({ id });
                },
                // Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
                onUpdateTodo: ({ id, completed }) => {
                    this.todoListModel.updateTodo({ id, completed });
                }
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