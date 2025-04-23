export const NoteCard = ({ note }) => {
  let position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      ></div>
      <div className="card-body">
        <textarea
          style={{ color: colors.colorText }}
          defaultValue={body}
        ></textarea>
      </div>
    </div>
  );
};
