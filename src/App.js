// TodoListModel, TodoItemModel, elementタグ関数, render関数をインポートする。
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

// Appという名前付きクラスをエクスポートする。
export class App {
    constructor() {
        // 1. TodoListの初期化
        this.todoListModel = new TodoListModel([]);
        this.todoListView = new TodoListView();
    }

    /**
     * Todoを追加するときに呼ばれるリスナー関数
     * @param {string} title
     */
    handleAdd(title) {
        this.todoListModel.addTodo(new TodoItemModel({ title, completed:false }));
    }

    /**
     * Todoの状態を更新したときに呼ばれるリスナー関数
     * @param {{ id:number, completed:boolean }}
     */
    handleUpdate({ id, completed }) {
        this.todoListModel.updateTodo({ id, completed });
    }

    /**
     * Todoを削除したときの呼ばれるリスナー関数
     * @param {{ id:number }}
     */
    handleDelete({ id }) {
        this.todoListModel.deleteTodo({ id });
    }
    
    mount() {
        // id="js-form", "js-form-input", "js-todo-list", "js-todo-count"の要素を取得
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        // 2. TodoListModelの状態が更新されたら表示を更新する
        this.todoListModel.onChange(() => {
            // それぞれのTodoItem要素をtodoListElement以下へ追加する
            const todoItems = this.todoListModel.getTodoItems();
            // todoItemsに対応するTodoListViewを作成する
            const todoListElement = this.todoListView.createElement(todoItems, {
                // Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
                onDeleteTodo: ({ id }) => {
                    this.handleDelete({ id });
                },
                // Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
                onUpdateTodo: ({ id, completed }) => {
                    this.handleUpdate({ id, completed });
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
            this.handleAdd(inputElement.value);
            // 入力欄を空文字列にしてリセットする。
            inputElement.value = "";
        });
    }
}