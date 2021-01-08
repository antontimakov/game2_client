/**
 * Класс определяющий параметры игрового поля
 */
class Game {
    static init() {
        /**
         * Канвас объект
         * @type {HTMLElement}
         */
        this.canvas = document.getElementById("fishingPlay");

        /**
         * Ширина поля
         * @type {number}
         */
        this.width = 745;

        /**
         * Высота поля
         * @type {number}
         */
        this.height = 500;

        /**
         * Частота обновления кадров
         * @type {number}
         */
        this.timeout = 1000 / 50;

        /**
         * Контекст объект канваса
         * @type {OffscreenRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext}
         */
        this.context = this.create();

        this.pusherConnect();
        setInterval(this.renderFrame, this.timeout);

        // TODO перенести в класс
        Game.x = 250;
        Game.y = 500;
    }

    /**
     * Создаёт поле
     * @returns {OffscreenRenderingContext | CanvasRenderingContext2D | WebGLRenderingContext}
     */
    static create(){
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        return this.canvas.getContext("2d");
    }

    /**
     * Отрисовка кадра
     */
    static renderFrame(){
        // Отрисовка заднего фона
        Game.context.fillStyle = '#FFFFFF';
        Game.context.fillRect(
            0,
            0,
            Game.width,
            Game.height
        );
        if (Game.y > 0) {
            Game.context.fillStyle = '#000000';
            Game.context.fillRect(
                Game.x,
                Game.y -= 10,
                10,
                10
            );
        } else {
            Game.y = 500;
        }

    }

    /**
     * Соединение по веб сокету
     */
    static pusherConnect(){
        // TODO delete me
        Pusher.logToConsole = true;

        const pusher = new Pusher('82314a91fbaa0b80b82e', {
            cluster: 'mt1'
        });

        const channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            alert(JSON.stringify(data));
        });
    }
}