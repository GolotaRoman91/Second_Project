/* eslint-disable @typescript-eslint/ban-ts-comment */
export class dualRangeSlider {
    constructor(rangeElement) {
        // @ts-ignore
        this.range = rangeElement;
        // @ts-ignore
        this.min = 0;
        // @ts-ignore
        this.max = 300000000;
        // @ts-ignore
        this.handles = [...this.range.querySelectorAll('.handle')];
        // @ts-ignore
        this.startPos = 0;
        // @ts-ignore
        this.activeHandle;
        // @ts-ignore
        this.handles.forEach(handle => {
            handle.addEventListener('mousedown', this.startMove.bind(this));
            handle.addEventListener('touchstart', this.startMoveTouch.bind(this));
        });

        window.addEventListener('mouseup', this.stopMove.bind(this));
        window.addEventListener('touchend', this.stopMove.bind(this));
        window.addEventListener('touchcancel', this.stopMove.bind(this));
        window.addEventListener('touchleave', this.stopMove.bind(this));
        // @ts-ignore
        const rangeRect: any = this.range.getBoundingClientRect();
        // @ts-ignore
        const handleRect: any = this.handles[0].getBoundingClientRect();
        // @ts-ignore
        this.range.style.setProperty('--x-1', '0px');
        // @ts-ignore
        this.range.style.setProperty('--x-2', '500px');
        // @ts-ignore
        this.handles[0].dataset.value = this.range.dataset.min;
        // @ts-ignore
        this.handles[1].dataset.value = this.range.dataset.max;
    }

    startMoveTouch(this: any, e) {
        const handleRect = e.target.getBoundingClientRect();
        this.startPos = e.touches[0].clientX - handleRect.x;
        this.activeHandle = e.target;
        this.moveTouchListener = this.moveTouch.bind(this);
        window.addEventListener('touchmove', this.moveTouchListener);
    }

    startMove(this: any, e) {
        this.startPos = e.offsetX;
        this.activeHandle = e.target;
        this.moveListener = this.move.bind(this);
        window.addEventListener('mousemove', this.moveListener);
    }

    moveTouch(e) {
        this.move({ clientX: e.touches[0].clientX });
    }

    move(this: any, e) {
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

    calcHandleValue(this: any, percentage) {
        return Math.round(percentage * (this.max - this.min) + this.min);
    }

    stopMove(this: any) {
        window.removeEventListener('mousemove', this.moveListener);
        window.removeEventListener('touchmove', this.moveTouchListener);
    }
}
