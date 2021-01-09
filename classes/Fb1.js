/**
 * Класс Шара 1
 */
class Fb1
{
    /**
     * Конструктор Шара
     * @param {number} pFirstX Координата X запуска
     * @param {number} pFirstY Координата Y запуска
     * @param {number} pTop Высота на которой шар должен остановиться
     */
    constructor(pFirstX = 250, pFirstY = 500, pTop = 100)
    {
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
        this.widthX1 = 20;

        /**
         * Смещение дуг Безье
         * @type {number}
         */
        this.heightY1 = 45;

        /**
         * Смещение дуг Безье
         * @type {number}
         */
        this.widthX2 = 20;

        /**
         * Смещение дуг Безье
         * @type {number}
         */
        this.heightY2 = 98;

        /**
         * Скорость движения шара
         * @type {number}
         */
        this.speedMove = 5;

        /**
         * Скорость сжатия шара
         * @type {number}
         */
        this.speedCollapse = 5;

        /**
         * Прозрачность
         * @type {number}
         */
        this.attenuation = 1;

        /**
         * Скорость затухания
         * @type {number}
         */
        this.speedAttenuation = 0.05;

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
    renderFb(color = '#FF8000')
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
            cp2x: this.firstX + this.widthX1,
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
            this.animateDetonationCollapse(this.speedCollapse);
            if(this.heightY1 <= 0){
                ++this.level;
            }
        }
        if (this.level === 3){
            if(this.firstY > 50 + this.top){
                ++this.level;
            }
            this.animateDetonationExplode();
        }
        if (this.level === 4){
            this.animateDetonationAttenuation();
            if(this.attenuation <= 0){
                ++this.level;
                this.attenuation = 1;
            }
        }
        if (this.level === 5){
            finish = true;
        }
        return finish;
    }

    /**
     * Анимация движения шара
     * @param step
     */
    animateMove(step = 1)
    {
        this.firstY -= step;

        this.renderFb();
    }

    /**
     * Анимация сжатия шара
     * @param step
     */
    animateDetonationCollapse(step = 5)
    {
        const deltaFirstY = 65;
        const deltaHeightY1 = 45;
        const deltaHeightY2 = 63;

        this.firstY -= deltaFirstY / step;
        this.height -= deltaFirstY / step;
        this.heightY1 -= deltaHeightY1 / step;
        this.heightY2 -= deltaHeightY2 / step;

        this.renderFb();
    }

    /**
     * Анимация взрыва шара
     */
    animateDetonationExplode()
    {
        this.firstY += 10;
        this.height += 10;
        this.widthX1 += 9;
        this.widthX2 += 9;
        this.heightY1 = 0;
        this.heightY2 = this.height;

        this.renderFb();
    }

    /**
     * Анимация затухания
     */
    animateDetonationAttenuation()
    {
        this.renderFb("rgba(255,128,0," + (this.attenuation -= this.speedAttenuation) + ")");
    }
}