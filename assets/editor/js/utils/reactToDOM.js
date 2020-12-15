import ReactDOMServer from 'react-dom/server';
import stringToDOM from "./stringToDOM";

/**
 * 
 * @param {react.element} reactElement 
 * @return {HTMLElement}  HTMLElement without event listeners 
 */
export default function reactToDOM(reactElement) {
    return stringToDOM(ReactDOMServer.renderToStaticMarkup(reactElement))
}