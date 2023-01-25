import './style.css'

const BREAKPOINTS: number[] = [720, 1000, 1440, 1600];
const DEFAULT_DELAY: number = 0;
const DEFAULT_EASING: string = 'linear';
const DEFAULT_OFFSET: number = 0;

class ParallaxItem extends HTMLElement {
    yspeed: {
        sm: number;
        md: number;
        lg: number;
        wd: number;
    };
    xspeed: {
        sm: number;
        md: number;
        lg: number;
        wd: number;
    };
    activeYSpeed: number;
    activeXSpeed: number;
    breakpoints: number[];
    delay: number;
    easing: string;
    offset: number;

    constructor() {
        super();
    }

    connectedCallback() {
        this.style.cssText = `
          --parallax-z: 0;
          --parallax-x: 0;
          --parallax-y: 0;
          --parallax-ease: linear;
          --parallax-delay: 0s;
          display: block;
          transition: transform var(--parallax-ease) var(--parallax-delay);
          transform: translate3d(var(--parallax-x), var(--parallax-y), var(--parallax-z));
          will-change: transform;
        `;

        this.yspeed = this.getSpeeds(this.dataset.yspeed ?? '0');
        this.xspeed = this.getSpeeds(this.dataset.xspeed ?? '0');
        this.activeYSpeed = 0;
        this.activeXSpeed = 0;
        this.breakpoints = BREAKPOINTS;
        // @ts-ignore
        this.delay = parseInt(this.dataset.delay ?? DEFAULT_DELAY);
        this.easing = this.dataset.easing ?? DEFAULT_EASING;
        // @ts-ignore
        this.offset = parseInt(this.dataset.offset ?? DEFAULT_OFFSET);

        this.updateActiveSpeed();
        this.style.setProperty('--parallax-ease', this.easing);
        this.style.setProperty('--parallax-delay', `${this.delay}s`);

        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
    }

    // format the speed data attribute
    getSpeeds(speed: string) {
        const speeds = speed.trim().split(',');
        return {
            sm: parseFloat(speeds[0]),
            md: parseFloat(speeds[1] ?? speeds[0]),
            lg: parseFloat(speeds[2] ?? speeds[1] ?? speeds[0]),
            wd: parseFloat(speeds[3] ?? speeds[2] ?? speeds[1] ?? speeds[0]),
        };
    }

    // update the active speed according to the current breakpoint
    updateActiveSpeed() {
        const { innerWidth } = window;
        const { yspeed, xspeed } = this;

        switch (true) {
            case innerWidth < this.breakpoints[0]:
                this.activeYSpeed = yspeed.sm;
                this.activeXSpeed = xspeed.sm;
                break;
            case innerWidth > this.breakpoints[0]:
                this.activeYSpeed = yspeed.md;
                this.activeXSpeed = xspeed.md;
                break;
            case innerWidth > this.breakpoints[1]:
                this.activeYSpeed = yspeed.lg;
                this.activeXSpeed = xspeed.lg;
                break;
            case innerWidth > this.breakpoints[2]:
                this.activeYSpeed = yspeed.wd;
                this.activeXSpeed = xspeed.wd;
                break;
        }
    }

    // update the parallax position
    updatePosition() {
        const { top, height } = this.getBoundingClientRect();
        const { innerHeight } = window;
        const isInRange = top - this.offset < innerHeight && top + height > 0;
        const y = (top + height / 2) / innerHeight;

        const newXPosition = Math.round((y - 0.5) * (this.activeXSpeed * -1));
        const newYPosition = Math.round((y - 0.5) * (this.activeYSpeed * -1));

        if (isInRange) {
            this.style.setProperty('--parallax-x', `${newXPosition}px`);
            this.style.setProperty('--parallax-y', `${newYPosition}px`);
        }
    }

    // the scroll event handler
    onScroll(e: Event) {
        console.log(e)
        const { scrollY } = window;
        const { offsetTop, clientHeight } = this;
        const { activeYSpeed, activeXSpeed } = this;
        const { offset } = this;
        const scrollTop = scrollY + offsetTop + clientHeight + offset;

        this.style.setProperty('--parallax-y', `${activeYSpeed * scrollTop}px`);
        this.style.setProperty('--parallax-x', `${activeXSpeed * scrollTop}px`);
    }
    onResize() {
        this.updateActiveSpeed();
    }
}

/*
  • Init and Exports
  ---------- ---------- ---------- ---------- ----------
*/

window.customElements.define('parallax-item', ParallaxItem);

export default ParallaxItem;
