import { useState, useEffect } from 'react';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';


function App() {
  // ////////////////////////
    const [formState, setFormState] = useState({
      title:'',
      author:'',
      phone:''
    });

  function handleChange(event) {
    setFormState(prevState => ({
      ...prevState,
      [event.target.id] : event.target.value
    }));
  }

  function handleSubmit(event){
    event.preventDefault();
    handleAdd(formState);
  }
  // ////////////////////////
  const [noticesState, setNoticesState] = useState({ notices: [] });

  useEffect(() => {
    const getNotices = async () => {
      const notices = await fetch('https://board-of-notices.herokuapp.com/notices').then(res => res.json());
      setNoticesState({ notices });
    }

    getNotices();

  }, []);

  const handleAdd = async (formInputs) => {
    const newNotice = await fetch('https://board-of-notices.herokuapp.com/notices', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(formInputs)
    }).then(res => res.json());
    // console.log(typeof newNotice)
    // console.log(Array.isArray(noticesState))

    setNoticesState( noticesState => (
      {
        notices:
        [...noticesState.notices, newNotice]
      }
    ));
  }

  const handleDelete = async (id) => {
    await fetch(`https://board-of-notices.herokuapp.com/notices/${id}`, {
      method: 'DELETE',
    })
    const updatedNotices = noticesState.notices.filter(notice => notice.id !== id)
    setNoticesState({ notices: updatedNotices});
    };



  return (
    <div className="App">
      <div className="container">
        <Header />
        <Aside handleAdd={handleAdd} handleChange={handleChange} handleSubmit={handleSubmit} 
        setFormState={setFormState} formState={formState} />
        <Main 
          notices={noticesState.notices} handleDelete={handleDelete}
        />
        <Nav />
        <Footer />
      </div>
    </div>
  );
}

export default App;