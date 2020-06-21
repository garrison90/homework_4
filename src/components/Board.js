import React, { useState, useEffect } from "react";
import api from "../api";
import Sticker from "./Sticker";

const initialSticker = {
  //id: Date.now(),
  text: "",
  top: 100,
  left: 50,
};

function Board() {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    api.get().then(({ data }) => {
      setStickers(data);
    });
  }, []);

  function addNewSticker() {
    api
      .post("", {
        ...initialSticker,
      })
      .then(({ data }) => {
        setStickers([...stickers, data]);
      });
  }

  function deleteSticker(id) {
    api.delete(id).then(({ data }) => {
      setStickers(stickers.filter((sticker) => sticker.id !== data.id));
    });
  }

  function onSaveChanges(item) {
    api
      .put(item.id, item)
      .then(() =>
        setStickers(
          stickers.map((sticker) => (sticker.id === item.id ? item : sticker))
        )
      );
  }

  return (
    <div style={boardContainer}>
      <div style={boardNav}>
        <h1 style={boardTitle}>Stickers Board</h1>
        <button style={boardButton} onClick={addNewSticker}>
          Add Sticker
        </button>
      </div>
      <section>
        {stickers.map((sticker) => {
          return (
            <Sticker
              key={sticker.id}
              sticker={sticker}
              deleteSticker={deleteSticker}
              onSaveChanges={onSaveChanges}
            />
          );
        })}
      </section>
    </div>
  );
}

export default Board;

const boardContainer = {
  display: "block",
  margin: "0 auto",
  padding: "0",
  height: "100%",
  width: "100%",
};

const boardNav = {
  backgroundColor: "blue",
  height: "70px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const boardTitle = {
  color: "white",
  verticalAlign: "middle",
  padding: "0 15px",
};

const boardButton = {
  height: "30px",
  backgroundColor: "green",
  color: "white",
  borderRadius: "5px",
  width: "100px",
  border: "none",
  margin: "auto 20px",
  cursor: "pointer",
};
