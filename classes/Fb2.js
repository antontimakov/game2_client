/**
 * Класс Шара 2
 */
class Fb2 {
    /**
     * Конструктор Шара
     * @param {number} pFirstX Координата X запуска
     * @param {number} pFirstY Координата Y запуска
     * @param {number} pTop Высота на которой шар должен остановиться
     */
    constructor(pFirstX = 250, pFirstY = 500, pTop = 100) {
        /**
         * Координата X запуска
         * @type {number}
         */
        this.firstX = pFirstX;

        /**
         * Координата Y запуска
         * @type {number}
         */
        this.firstY = pFirstY;

        /**
         * Высота на которой шар должен остановиться
         * @type {number}
         */
        this.top = pTop;

        /**
         * Высота шара
         * @type {number}
         */
        this.height = 100;

        /**
         * Смещение дуг Безье
         * @type {number}
         */
        this.widthX1 = -10;

        /**
         * Смещение дуг Безье
         * @type {number}
         */
        this.widthX1_2 = 20;

        /**
         * Смещение дуг Безье
         * @type {number}
         */
        this.heightY1 = 45;

        /**
         * Смещение дуг Безье
         * @type {number}
         */
        this.widthX2 = 30;

        /**
         * Смещение дуг Безье
         * @type {number}
         */
        this.heightY2 = 98;

        /**
         * Скорость движения шара
         * @type {number}
         */
        this.speedMove = 3;

        /**
         * Скорость перетекания анимации
         * @type {number}
         */
        this.speedMoveХ = 2;

        /**
         * Текущее направление перетекания анимации
         * @type {boolean}
         */
        this.toLeft = true;

        /**
         * Уроверь анимации действующей на данный момент
         * @type {number}
         */
        this.level = 1;

        this.background = {
            x: 200,
            y: this.top,
            w: 100,
            h: this.firstY - this.top
        };

        // очерчиваем игровое поле
        Game.context.fillStyle = '#000000';
        Game.context.strokeRect(
            this.background.x,
            this.background.y,
            this.background.w,
            this.background.h
        );
    }

    /**
     * Отрисовка шара
     */
    renderFb(color = '#FF6000')
    {
        const cnt = Game.context;

        this.leftB = {
            cp1x: this.firstX - this.widthX1,
            cp1y: this.firstY - this.heightY1,
            cp2x: this.firstX - this.widthX2,
            cp2y: this.firstY - this.heightY2
        };
        this.rightB = {
            cp1x: this.firstX + this.widthX2,
            cp1y: this.firstY - this.heightY2,
            cp2x: this.firstX + this.widthX1_2,
            cp2y: this.firstY - this.heightY1
        };

        cnt.fillStyle = color;
        cnt.beginPath();
        cnt.moveTo(this.firstX, this.firstY);
        cnt.bezierCurveTo(this.leftB.cp1x, this.leftB.cp1y, this.leftB.cp2x, this.leftB.cp2y, this.firstX, this.firstY - this.height);
        cnt.moveTo(this.firstX, this.firstY - this.height);
        cnt.bezierCurveTo(this.rightB.cp1x, this.rightB.cp1y, this.rightB.cp2x, this.rightB.cp2y, this.firstX, this.firstY);
        cnt.fill();
    }

    /**
     * Полный цикл анимации
     * @returns {boolean} Флаг, закончина ли анимация
     */
    animate(){
        let finish = false;

        // Отрисовка заднего фона
        Game.context.fillStyle = '#FFFFFF';
        Game.context.fillRect(
            this.background.x,
            this.background.y,
            this.background.w,
            this.background.h
        );

        if (this.level === 1){
            this.animateMove(this.speedMove);
            if (this.firstY <= this.height + this.top){
                ++this.level;
            }
        }
        if (this.level === 2){
            finish = true;
        }
        return finish;
    }

    animateMove(step = 1)
    {
        this.firstY -= step;
        if (this.toLeft) {
            if (this.widthX1 <= 20) {
                this.widthX1 += this.speedMoveХ;
            }
            else{
                this.toLeft = false;
            }
            if (this.widthX1_2 >= -10) {
                this.widthX1_2 -= this.speedMoveХ;
            }
        }
        else{
            if (this.widthX1_2 <= 20) {
                this.widthX1_2 += this.speedMoveХ;
            }
            else{
                this.toLeft = true;
            }
            if (this.widthX1 >= -10) {
                this.widthX1 -= this.speedMoveХ;
            }
        }

        this.renderFb();
    }
}