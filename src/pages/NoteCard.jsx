import { useEffect, useRef, useState } from "react";
import { setNewOffset } from "../utils.js";
import { setZIndex } from "../utils.js";
import { Trash } from "../icons/Trash.jsx";

export const NoteCard = ({ note }) => {
  const [position, setPositon] = useState(note.position);
  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);
  const textAreaRef = useRef(null);

  const mouseDown = (e) => {
    setZIndex(cardRef.current);
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp); // add mouseUp to remove listeners
  };

  const mouseMove = (e) => {
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPositon(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  const colors = note.colors;
  const body = note.body;

  useEffect(() => {
    if (textAreaRef.current) {
      autoGrow(textAreaRef);
    }
  }, [textAreaRef]);

  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        onMouseDown={mouseDown}
        style={{ backgroundColor: colors.colorHeader }}
      ></div>

      <Trash />

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          onInput={() => {
            if (textAreaRef.current) autoGrow(textAreaRef);
          }}
          style={{ color: colors.colorText }}
          defaultValue={body}
        ></textarea>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function autoGrow(textAreaRef) {
  const el = textAreaRef?.current;
  if (!el) return;
  el.style.height = "auto"; // Reset height
  el.style.height = el.scrollHeight + "px"; // Adjust height to content
}
