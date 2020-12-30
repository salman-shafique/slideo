import ReactDOMServer from 'react-dom/server';
import stringToDOM from "./stringToDOM";

/**
 * 
 * @param {react.element} reactElement 
 * @return {HTMLElement}  HTMLElement without event listeners 
 */
export default function reactToDOM(reactElement, document = null, NS = null) {
    return stringToDOM(ReactDOMServer.renderToStaticMarkup(reactElement), document, NS)
}