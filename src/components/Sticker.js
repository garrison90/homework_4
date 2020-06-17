import React, { useState } from "react";

function Sticker({ sticker, deleteSticker, onSaveChanges }) {
  const [item, setItem] = useState(sticker);

  function handleTextarea(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  function submitTextarea() {
    onSaveChanges(item);
  }

  function dragEnd(e) {
    const dragItem = {
      ...item,
      top: e.clientY,
      left: e.clientX,
    };
    setItem(dragItem);
    onSaveChanges(dragItem);
  }

  function getStickerContainerStyle() {
    const { top, left } = item;
    return {
      ...StickerContainerStyle,
      top: top,
      left: left,
    };
  }

  return (
    <div
      draggable="true"
      style={getStickerContainerStyle()}
      onDragEnd={(e) => dragEnd(e)}
    >
      <button style={stickerButton} onClick={() => deleteSticker(item.id)}>
        &times;
      </button>
      <textarea
        onBlur={submitTextarea}
        name="text"
        style={stickerTextarea}
        value={item.text}
        onChange={(e) => handleTextarea(e)}
      ></textarea>
    </div>
  );
}

export default Sticker;

const StickerContainerStyle = {
  position: "absolute",
  height: "150px",
  width: "135px",
  display: "block",
  borderRadius: "5px",
  overflow: "hidden",
  backgroundColor: "rgb(246, 229, 228)",
  margin: "15px",
  zIndex: "0",
};

const stickerButton = {
  float: "right",
  margin: "5px",
  fontSize: "20px",
  fontWeight: "bold",
  border: "transparent",
  backgroundColor: "transparent",
};

const stickerTextarea = {
  width: "120px",
  minHeight: "100px",
  margin: "4px",
};
