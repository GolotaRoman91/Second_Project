export class dualRangeSlider {
    range: HTMLElement;
    min: number;
    max: number;
    handles: Element[];
    startPos: number;
    activeHandle: any;
    constructor(rangeElement: HTMLElement) {
        this.range = rangeElement;
        this.min = 10000;
        this.max = 300000000;
        this.handles = [...this.range.querySelectorAll('.handle')];
        this.startPos = 0;
        this.activeHandle;
        this.handles.forEach(handle => {
            handle.addEventListener('mousedown', this.startMove.bind(this));
            handle.addEventListener('touchstart', this.startMoveTouch.bind(this));
        });

        window.addEventListener('mouseup', this.stopMove.bind(this));
        window.addEventListener('touchend', this.stopMove.bind(this));
        window.addEventListener('touchcancel', this.stopMove.bind(this));
        window.addEventListener('touchleave', this.stopMove.bind(this));
        this.range.style.setProperty('--x-1', '0px');
        this.range.style.setProperty('--x-2', '500px');
        (<HTMLElement>this.handles[0]).dataset.value = this.range.dataset.min;
        (<HTMLElement>this.handles[1]).dataset.value = this.range.dataset.max;
    }

    startMoveTouch(this, e: { target: { getBoundingClientRect: () => any }; touches: { clientX: number }[] }) {
        const handleRect = e.target.getBoundingClientRect();
        this.startPos = e.touches[0].clientX - handleRect.x;
        this.activeHandle = e.target;
        this.moveTouchListener = this.moveTouch.bind(this);
        window.addEventListener('touchmove', this.moveTouchListener);
    }

    startMove(this, e: { offsetX: number; target: number }) {
        this.startPos = e.offsetX;
        this.activeHandle = e.target;
        this.moveListener = this.move.bind(this);
        window.addEventListener('mousemove', this.moveListener);
    }

    moveTouch(e: { touches: { clientX: number }[] }) {
        this.move({ clientX: e.touches[0].clientX });
    }

    move(this, e) {
        const isLeft = this.activeHandle.classList.contains('left');
        const property = isLeft ? '--x-1' : '--x-2';
        const parentRect = this.range.getBoundingClientRect();
        const handleRect = this.activeHandle.getBoundingClientRect();
        let newX = e.clientX - parentRect.x - this.startPos;
        if (isLeft) {
            const otherX = parseInt(this.range.style.getPropertyValue('--x-2'));
            newX = Math.min(newX, otherX - handleRect.width);
            newX = Math.max(newX, 0 - handleRect.width / 2);
        } else {
            const otherX = parseInt(this.range.style.getPropertyValue('--x-1'));
            newX = Math.max(newX, otherX + handleRect.width);
            newX = Math.min(newX, parentRect.width - handleRect.width / 2);
        }
        this.activeHandle.dataset.value = this.calcHandleValue((newX + handleRect.width / 2) / parentRect.width);
        this.range.style.setProperty(property, newX + 'px');
    }

    calcHandleValue(this, percentage: number) {
        return Math.round(percentage * (this.max - this.min) + this.min);
    }

    stopMove(this) {
        window.removeEventListener('mousemove', this.moveListener);
        window.removeEventListener('touchmove', this.moveTouchListener);
    }
}
