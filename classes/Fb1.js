/**
 * Класс Шара 1
 */
class Fb1
{
    constructor()
    {
        /**
         * Координаты нижней начальной точки
         * @type {number}
         */
        this.firstX = 250;

        /**
         * Координаты нижней начальной точки
         * @type {number}
         */
        this.firstY = 500;

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
         * Уроверь анимации действующей на данный момент
         * @type {number}
         */
        this.level = 1;
    }

    /**
     * Отрисовка шара
     */
    renderFb()
    {
        const cnt = Game.context;

        this.leftB = {
            cp1x: this.firstX - this.widthX1,
            cp1y: this.firstY - this.heightY1,
            cp2x: this.firstX - this.widthX2,
            cp2y: this.firstY - this.heightY2
        };
        this.rightB = {
            cp1x: this.firstX + this.widthX1,
            cp1y: this.firstY - this.heightY2,
            cp2x: this.firstX + this.widthX2,
            cp2y: this.firstY - this.heightY1
        };
        cnt.fillStyle = '#FF8000';
        cnt.beginPath();
        cnt.moveTo(this.firstX, this.firstY);
        cnt.bezierCurveTo(this.leftB.cp1x, this.leftB.cp1y, this.leftB.cp2x, this.leftB.cp2y, this.firstX, this.firstY - this.height);
        cnt.moveTo(this.firstX, this.firstY - this.height);
        cnt.bezierCurveTo(this.rightB.cp1x, this.rightB.cp1y, this.rightB.cp2x, this.rightB.cp2y, this.firstX, this.firstY);
        cnt.fill();
    }

    /**
     * Полный цикл анимации
     * @returns {boolean}
     */
    animate(){
        let finish = false;

        if (this.level === 1){
            this.animateMove(this.speedMove);
            if (this.firstY <= this.height){
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
            if(this.firstY > 50){
                ++this.level;
            }
            this.animateDetonationExplode();
        }
        if (this.level === 4){
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
        this.heightY1 = 1;
        this.heightY2 = this.firstY;

        this.renderFb();
    }
}