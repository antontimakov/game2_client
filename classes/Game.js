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

        //setInterval(this.renderFrame, this.timeout);

        // TODO перенести в класс
        Game.x = 250;
        Game.y = 500;
        Game.w = 10;
        Game.h = 10;

        Game.firstX = 250;
        Game.firstY = 500;
        Game.lastY = 400;

        Game.widthX1 = 20;
        Game.widthX2 = 20;
        Game.heightY1 = 45;
        Game.heightY2 = 98;

        this.renderFb();

        // Game.firstY = 100;
        // Game.lastY = 0;
        Game.firstY = 300;
        Game.lastY = 200;
        this.renderFb();

        Game.firstY = 35;
        Game.lastY = 0;
        Game.heightY1 = 0;
        Game.heightY2 = 35;
        this.renderFb();

        // настройки текста
        Game.context.font = 'bold 20px courier';
        Game.context.textAlign = 'left';
        Game.context.textBaseline = 'top';
        Game.context.fillStyle = 'black';
    }

    static renderFb(){
        Game.leftB = {
            cp1x: Game.firstX - Game.widthX1,
            cp1y: Game.firstY - Game.heightY1,
            cp2x: Game.firstX - Game.widthX2,
            cp2y: Game.firstY - Game.heightY2
        };
        Game.rightB = {
            cp1x: Game.firstX + Game.widthX1,
            cp1y: Game.firstY - Game.heightY2,
            cp2x: Game.firstX + Game.widthX2,
            cp2y: Game.firstY - Game.heightY1
        };
        Game.context.fillStyle = '#FF8000';
        Game.context.beginPath();
        Game.context.moveTo(Game.firstX, Game.firstY);
        Game.context.bezierCurveTo(Game.leftB.cp1x, Game.leftB.cp1y, Game.leftB.cp2x, Game.leftB.cp2y, Game.firstX, Game.lastY);
        Game.context.moveTo(Game.firstX, Game.lastY);
        Game.context.bezierCurveTo(Game.rightB.cp1x, Game.rightB.cp1y, Game.rightB.cp2x, Game.rightB.cp2y, Game.firstX, Game.firstY);
        Game.context.fill();
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
            230,
            0,
            50,
            Game.height
        );

        // // Квадратик
        // if (Game.y > 0) {
        //     Game.context.fillStyle = '#000000';
        //     Game.context.fillRect(
        //         Game.x,
        //         Game.y -= 5,
        //         10,
        //         10
        //     );
        // } else {
        //     //Game.y = 500;
        //     Game.context.fillStyle = '#000000';
        //     Game.context.fillRect(
        //         --Game.x,
        //         Game.y,
        //         Game.w += 2,
        //         Game.h += 2
        //     );
        //     // window.axios.get('http://localhost/')
        //     //     .then(response => {
        //     //         if (response.data['data']){
        //     //         }
        //     //     });
        // }

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