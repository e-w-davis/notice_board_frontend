function Notice({ notice, handleDelete }) {
  return (
    <div className="notice">
      <h3>{notice.title}</h3>
      <p>{notice.author}</p>
      <small>{notice.phone}</small>
      <button onClick={()=> handleDelete(notice.id)}>x</button>
    </div>
  );
}

export default Notice;