import { DOM } from "./dom"
export function loader(): void {
    setTimeout(() => {
        DOM.loader.remove();
    }, 1000);
}