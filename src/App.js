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
      const notices = await fetch('http://localhost:3000/notices').then(res => res.json());
      setNoticesState({ notices });
    }

    getNotices();

  }, []);

  const handleAdd = async (formInputs) => {
    const newNotice = await fetch('http://localhost:3000/notices', {
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

    // handleAdd();
  }

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Aside handleAdd={handleAdd} handleChange={handleChange} handleSubmit={handleSubmit} 
        setFormState={setFormState} formState={formState} />
        <Main notices={noticesState.notices} />
        <Nav />
        <Footer />
      </div>
    </div>
  );
}

export default App;