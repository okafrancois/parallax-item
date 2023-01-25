
declare module "*.module.scss"
declare module "*.module.css"
interface ParallaxData {
    xspeed: {
        sm: number;
        md: number;
        lg: number;
        wd: number;
    };
    yspeed: {
        sm: number;
        md: number;
        lg: number;
        wd: number;
    };
    offset?: number;
    delay?: number;
    easing?: string;
}

declare class ParallaxItem extends HTMLElement {
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

    connectedCallback(): void;
    getSpeeds(speed: string): ParallaxData['xspeed'] & ParallaxData['yspeed'];
    updateActiveSpeed(): void;
}

// @ts-ignore
declare global {
    interface HTMLElementTagNameMap {
        'parallax-item': ParallaxItem;
    }
}
