import './styles.css'; 
function App() {
  

  return (
    
    <>
    <Header /> 
 
  <main className="main">
    <section className="card users-container">
     <userSearch /> 

      <userListComponent />
   
      <pagination />
     
    </section>
  </main>
  
  <Footer />
  
</>

    
    
  )
}

export default App
