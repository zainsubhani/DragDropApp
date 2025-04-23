import React from "react";
import fakeData from "../assets/fakeData.json";
import { NoteCard } from "../pages/NoteCard";

export const NotesPage = () => {
  return (
    <div className="note-grid">
      {fakeData.map((note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
    </div>
  );
};
export default NotesPage;
