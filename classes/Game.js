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


        // настройки текста
        Game.context.font = 'bold 20px courier';
        Game.context.textAlign = 'left';
        Game.context.textBaseline = 'top';
        Game.context.fillStyle = 'black';
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
            250,
            0,
            10,
            Game.height
        );

        // Квадратик
        if (Game.y > 0) {
            Game.context.fillStyle = '#000000';
            Game.context.fillRect(
                Game.x,
                Game.y -= 5,
                10,
                10
            );
        } else {
            Game.y = 500;
            window.axios.get('http://localhost/')
                .then(response => {
                    if (response.data['data']){
                    }
                });
        }

    }

    /**
     * Соединение по веб сокету
     */
    static pusherConnect(){
        // TODO delete me
        //Pusher.logToConsole = true;

        const pusher = new Pusher('82314a91fbaa0b80b82e', {
            cluster: 'mt1'
        });

        const channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            // Отрисовка заднего фона
            Game.context.fillStyle = '#FFFFFF';
            Game.context.fillRect(
                0,
                Game.height - 20,
                200,
                20
            );
            // Текс с сервера
            Game.context.fillStyle = 'black';
            Game.context.fillText(
                data.message,
                0,
                Game.height - 20
            );
        });
    }
}