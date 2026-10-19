import './styles.css'; 
import { useState, useEffect } from 'react';

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import userListComponent from './components/userListComponent.jsx';
import userSearch from './components/userSearch.jsx';
import pagination from './components/pagination.jsx';


function App() {
  
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    fetch('https://ivsblhkvjbfyakdaafrm.supabase.co/rest/v1/users', {
      headers:{
        'apikey' : 'sb_publishable_MLCyG6Hxn9Uvhe7DgQFe2A_4AToPvjG' 
      }
    })
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(error => console.log('Error',error));
  }, []);

  return (
    
    <>
    <Header /> 
 
  <main className="main">
    <section className="card users-container">
     <userSearch /> 

      <userListComponent users = {users}/>
   

   <button className="btn-add btn">Add new user</button>


      <pagination />
     
    </section>
  </main>
  
  <Footer />
  
</>

    
    
  )
}

export default App
