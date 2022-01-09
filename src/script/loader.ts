import { DOM } from "./dom"
export function loader() {
    setTimeout(() => {
        DOM.loader.remove();
    }, 1000);
}