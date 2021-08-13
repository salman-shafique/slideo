import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import "Editor/css/contextMenu.css";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import deleteShapes from "Editor/js/shapes/actions/delete/deleteShapes";
import Events from "Editor/js/Events";
import selectTextboxElement from "Editor/js/shapes/textbox/selectTextboxElement";
import createNewIcon from "Editor/js/shapes/icon/createNewIcon.js";
import createNewImage from "Editor/js/shapes/image/createNewImage.js";
import createNewTextbox from "Editor/js/shapes/textbox/createNewTextbox.js";

export const getSelectedElementsType = () => {
	let pureType = null;
	for (let index = 0; index < session.SELECTED_ELEMENTS.length; index++) {
		const selectEl = session.SELECTED_ELEMENTS[index];
		if (pureType === null) pureType = getShapeType(selectEl.shape);

		if (pureType != getShapeType(selectEl.shape)) return "MULTIPLE";
	}
	return pureType;
};

// Citra's Code

export const shapeHandler = (e) => {
	const element = typeof e === "object" ? e : session.SELECTED_ELEMENTS;

	element.forEach((selectedEl) => {
		const selectedType = getShapeType(selectedEl.shape);
		const copiedType = selectedEl.shape_type;
		const type = typeof e === "object" ? copiedType : selectedType;

		switch (type) {
			case constants.SHAPE_TYPES.ICON:
				// Call the createNewIcon callback with new icon data
				e === "changecolor"
					? changecolor(selectedEl)
					: createNewIcon(duplicateShape(selectedEl, "icon"));
				break;
			case constants.SHAPE_TYPES.IMAGE:
				// Call the createNewImage callback with new icon data
				e === "showfull"
					? showFullImage(selectedEl)
					: createNewImage(duplicateShape(selectedEl, "image"));
				break;
			case constants.SHAPE_TYPES.TEXTBOX:
				// Call the createNewTextbox callback with new icon data
				createNewTextbox(duplicateShape(selectedEl, "text"));
				break;
			default:
				break;
		}
	});
};

// Function to remove shape props
const removeShapeProps = (obj) => {
	["shape_id", "shape_index", "rotation", "allTransforms"].forEach(
		(p) => delete obj[p]
	);
};

// Function to DUPLICATE shape
export const duplicateShape = (element, type) => {
	const oldShapeData = element.shape ? shape(element.shape).data() : element;
	// Copy the old shape data into a new icon data object
	const newShapeData = Object.assign({}, oldShapeData);

	// Remove shape_id, shape_index and rotation properties from new icon object
	removeShapeProps(newShapeData);

	// Function to generate new x and y coordinate
	const newXY = (a) => (parseInt(a) + 1500).toString();

	// Condition to define alt'x text based on the type of the shape
	const altText =
		type === "icon" ? "newicon" : type === "image" ? "newimage" : "newtextbox";

	// Object of properties to update
	const dataUpdate = {
		alt: altText,
		x: newShapeData.x ? newXY(newShapeData.x) : newShapeData.size.x,
		y: newShapeData.y ? newXY(newShapeData.y) : newShapeData.size.y,
		width: element.size.width,
		height: element.size.height,
	};

	// Assign updated properties into new icon data
	return Object.assign(newShapeData, dataUpdate);
};

// Function to SHOW FULL IMAGE
const showFullImage = (element) => {
	// Assign the old shape data into a new icon data object
	const newImage = Object.assign({}, shape(element.shape).data());

	// Remove shape_id, shape_index and rotation properties from new icon object
	removeShapeProps(newImage);

	// Define image width & height
	const imageWidth = newImage.image.width;
	const imageHeight = newImage.image.height;

	// Assign a new alt and width RELATED to image ratio
	// Define image's width & height ratio
	const imageRatio = imageWidth / imageHeight;

	const dataUpdate = {
		alt: "newimage",
		width: imageWidth
			? (newImage.height * imageRatio).toString()
			: newImage.width,
	};

	const fullImage = Object.assign(newImage, dataUpdate);

	// Assign a new alt and size with the image's ORIGINAL width and height
	// const dataUpdate = {
	//     alt: "newimage",
	//     width: imageWidth ? imageWidth.toString() : newImage.width,
	//     height: imageHeight ? imageHeight.toString() : newImage.height,
	// }
	// const fullImage = Object.assign(newImage, dataUpdate)

	// Assign x and y props into the image object
	Object.assign(newImage.image, { x: newImage.x, y: newImage.y });

	// Remove current image
	shape(element.shape).remove();

	// Call the createNewImage callback with new full image data
	createNewImage(fullImage);
};

// Function to CHANGE ICON COLOR
const changecolor = (e) => {
	Events.colorCircle.open();
	Events.popup.icon.open({ shapeId: e.shapeId });
};

function ContextMenu() {
	const [isOpen, setIsOpen] = React.useState(false);
	const [contextMenuLeft, setContextMenuLeft] = React.useState(null);
	const [contextMenuTop, setContextMenuTop] = React.useState(null);
	const [clickedElementType, setClickedElementType] = React.useState(null);

	const openContextMenu = (e) => {
		// Do not open contextMenu when there is no element selected
		if (session.SELECTED_ELEMENTS.length === 0) {
			setIsOpen(false);
			return;
		}

		const slideObject = slide(session.CURRENT_SLIDE)
			.object()
			.getBoundingClientRect();
		const clickedEl =
			session.SELECTED_ELEMENTS[0].shape.getBoundingClientRect();

		setContextMenuLeft(
			slideObject.left +
				clickedEl.left +
				clickedEl.width +
				(e.data.event.offsetX - clickedEl.left - clickedEl.width)
		);
		setContextMenuTop(
			slideObject.top +
				clickedEl.top +
				clickedEl.height +
				(e.data.event.y - clickedEl.top - clickedEl.height)
		);

		if (session.SELECTED_ELEMENTS.length == 1) {
			// One element selected
			setClickedElementType(getShapeType(session.SELECTED_ELEMENTS[0].shape));
		} else if (session.SELECTED_ELEMENTS.length > 1) {
			setClickedElementType(getSelectedElementsType());
		}
		setIsOpen(true);
	};

	const closeContextMenu = () => {
		setIsOpen(false);
	};

	const changeZindex = (zIndexMovement) => {
		if (session.SELECTED_ELEMENTS.length == 0) return;
		const slide_ = slide(session.CURRENT_SLIDE);
		const elementTree = slide_.page();
		const firstChild = elementTree.querySelector(".Background")
			? elementTree.children[1]
			: elementTree.children[0];
		session.SELECTED_ELEMENTS.forEach((selectedEl) => {
			switch (zIndexMovement) {
				case "BRING_TO_FRONT":
					if (elementTree.lastElementChild == selectedEl.shape) return;
					elementTree.insertBefore(
						selectedEl.shape,
						elementTree.lastElementChild
					);
					elementTree.insertBefore(
						elementTree.lastElementChild,
						selectedEl.shape
					);
					break;
				case "BRING_FORWARD":
					if (elementTree.lastElementChild == selectedEl.shape) return;
					if (
						selectedEl.shape.nextElementSibling == elementTree.lastElementChild
					) {
						elementTree.insertBefore(
							elementTree.lastElementChild,
							selectedEl.shape
						);
					} else {
						const nextItem =
							selectedEl.shape.nextElementSibling.nextElementSibling;
						elementTree.insertBefore(selectedEl.shape, nextItem);
					}
					break;
				case "SEND_BACKWARD":
					if (firstChild == selectedEl.shape) return;
					const prevItem = selectedEl.shape.previousElementSibling;
					elementTree.insertBefore(selectedEl.shape, prevItem);
					break;
				case "SEND_TO_BACK":
					if (firstChild == selectedEl.shape) return;
					elementTree.insertBefore(selectedEl.shape, firstChild);
					break;
				default:
					break;
			}
		});
	};

	const contextMenuAction = (type) => {
		switch (type) {
			case "EDIT_TEXT":
				selectTextboxElement({
					target: { parentElement: session.SELECTED_ELEMENTS[0].shape },
				});
				setIsOpen(false);
				break;
			case "DUPLICATE":
				shapeHandler("duplication");
				break;
			case "SHOW_FULL_IMAGE":
				shapeHandler("showfull");
				break;
			case "CHANGE_COLOR":
				shapeHandler("changecolor");
				setIsOpen(false);
				break;
			default:
				break;
		}
	};

	React.useEffect(() => {
		// Close the contextMenu Events
		Events.listen("shape.allReleased", closeContextMenu);
		Events.listen("shape.allReleasedExcept", closeContextMenu);
		Events.listen("shape.drag.started", closeContextMenu);
		Events.listen("shape.resize.started", closeContextMenu);
		Events.listen("shape.selected", closeContextMenu);
		Events.listen("contextMenu.open", openContextMenu);
	}, []);

	return (
		<div
			id="contextMenu"
			style={{
				display: isOpen ? "" : "none",
				left: contextMenuLeft,
				top: contextMenuTop,
			}}
		>
			{clickedElementType === constants.SHAPE_TYPES.TEXTBOX &&
			session.SELECTED_ELEMENTS.length == 1 ? (
				<div
					className="contextMenu-line-wrapper noselect"
					onClick={() => {
						contextMenuAction("EDIT_TEXT");
					}}
				>
					<div className="contextMenu-icon-wrapper">
						<i className="fas fa-pencil-alt" />
					</div>
					<div className="contextMenu-text-wrapper">Edit Text</div>
				</div>
			) : null}
			{clickedElementType === constants.SHAPE_TYPES.IMAGE && (
				<div
					className="contextMenu-line-wrapper noselect"
					onClick={() => {
						contextMenuAction("SHOW_FULL_IMAGE");
					}}
				>
					<div className="contextMenu-icon-wrapper">
						<i className="far fa-image" />
					</div>
					<div className="contextMenu-text-wrapper">Show Full Image</div>
				</div>
			)}
			{[constants.SHAPE_TYPES.ICON, constants.SHAPE_TYPES.AUTO_SHAPE].includes(
				clickedElementType
			) ? (
				<div
					className="contextMenu-line-wrapper noselect"
					onClick={() => {
						contextMenuAction("CHANGE_COLOR");
					}}
				>
					<div className="contextMenu-icon-wrapper">
						<i className="fas fa-palette" />
					</div>
					<div className="contextMenu-text-wrapper">Change Color</div>
				</div>
			) : null}
			<div
				className="contextMenu-line-wrapper noselect"
				onClick={() => {
					contextMenuAction("DUPLICATE");
				}}
			>
				<div className="contextMenu-icon-wrapper">
					<i className="far fa-clone" />
				</div>
				<div className="contextMenu-text-wrapper">Duplicate</div>
			</div>
			<div className="contextMenu-line-wrapper noselect" onClick={deleteShapes}>
				<div className="contextMenu-icon-wrapper">
					<i className="far fa-trash-alt" />
				</div>
				<div className="contextMenu-text-wrapper">Delete</div>
			</div>
			<div className="contextMenu-divider"></div>
			<div
				className="contextMenu-line-wrapper noselect"
				onClick={() => {
					changeZindex("SEND_BACKWARD");
				}}
			>
				<div className="contextMenu-icon-wrapper">
					<i className="fas fa-angle-left" />
				</div>
				<div className="contextMenu-text-wrapper">Send Backward</div>
			</div>
			<div
				className="contextMenu-line-wrapper noselect"
				onClick={() => {
					changeZindex("SEND_TO_BACK");
				}}
			>
				<div className="contextMenu-icon-wrapper">
					<i className="fas fa-angle-double-left" />
				</div>
				<div className="contextMenu-text-wrapper">Send to Back</div>
			</div>
			<div
				className="contextMenu-line-wrapper noselect"
				onClick={() => {
					changeZindex("BRING_FORWARD");
				}}
			>
				<div className="contextMenu-icon-wrapper">
					<i className="fas fa-angle-right" />
				</div>
				<div className="contextMenu-text-wrapper">Bring Forward</div>
			</div>
			<div
				className="contextMenu-line-wrapper noselect"
				onClick={() => {
					changeZindex("BRING_TO_FRONT");
				}}
			>
				<div className="contextMenu-icon-wrapper">
					<i className="fas fa-angle-double-right" />
				</div>
				<div className="contextMenu-text-wrapper">Bring to Front</div>
			</div>
		</div>
	);
}

ReactDOM.render(<ContextMenu />, document.getElementById("contextMenuWrapper"));
