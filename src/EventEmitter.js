/**
 * イベントをディスパッチしたとき、登録されているコールバック関数（イベントリスナー）を呼び出すクラス
 * ディスパッチ側：emitメソッドは、指定されたイベント名に登録済みのすべてのコールバック関数を呼び出す
 * リッスン側：addEventListenerメソッドは、指定したイベント名に任意のコールバック関数を登録できる
 */
export class EventEmitter {
    constructor() {
        // 登録する[イベント名, Set（リスナー関数）]を管理するMap
        this._listeners = new Map();
    }

    /**
     * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
    addEventListener(type, listener) {
        // 指定したイベントに対応するSetを作成して、リスナー関数を登録する
        if (!this._listeners.has(type)) {
            this._listeners.set(type, new Set());
        }
        const listenerSet = this._listeners.get(type);
        listenerSet.add(listener);
    }

    /**
     * 指定したイベントをディスパッチする
     * @param {string} type イベント名
     */
    emit(type) {
        // 指定したイベントに対応するSetを取り出して、全てのリスナー関数を呼び出す
        const listenerSet = this._listeners.get(type);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(listener => {
            listener.call(this);
        });
    }

    /**
     * 指定したイベントのイベントリスナーを解除する
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
    removeEventListener(type, listener) {
        // 指定したイベントに対応するSetを取り出して、該当するリスナー関数を削除する
        const listenerSet = this._listeners.get(type);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(ownListener => {
            if (ownListener === listener) {
                listenerSet.delete(listener);
            }
        })
    }
}