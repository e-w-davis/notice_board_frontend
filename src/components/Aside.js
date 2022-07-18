import Form from './Form.js';

function Aside({handleAdd, 
  handleChange, handleSubmit, 
  setFormState, formState}) {
    return (
      <aside>
        <h1>Aside</h1>
        <Form handleAdd={handleAdd}
        handleChange={handleChange} handleSubmit={handleSubmit} 
        setFormState={setFormState} formState={formState}/>
      </aside>
    );
}

export default Aside;