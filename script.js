let highestZ = 1;

class Paper {

    holdingPaper = false;

    prevMouseX = 0;
    prevMouseY = 0;

    mouseX = 0;
    mouseY = 0;

    velocityX = 0;
    velocityY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {

        // START DRAG
        paper.addEventListener('mousedown', (e) => {

            if (e.button !== 0) return; // only left click

            this.holdingPaper = true;

            paper.style.zIndex = highestZ;
            highestZ++;

            this.prevMouseX = e.clientX;
            this.prevMouseY = e.clientY;
        });


        // DRAGGING
        document.addEventListener('mousemove', (e) => {

            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            this.velocityX = this.mouseX - this.prevMouseX;
            this.velocityY = this.mouseY - this.prevMouseY;

            if (this.holdingPaper) {

                this.currentPaperX += this.velocityX;
                this.currentPaperY += this.velocityY;

                paper.style.transform =
                    `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
            }

            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;
        });


        // STOP DRAG
        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
        });
    }
}


// APPLY TO ALL PAPERS
const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});