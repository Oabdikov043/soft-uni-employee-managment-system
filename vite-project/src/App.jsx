import { useState, useEffect } from 'react';


import header from './components/header.jsx';
import footer from './components/footer.jsx';
import userListComponent from './components/userListComponent.jsx';
import userSearch from './components/userSearch.jsx';
import pagination from './components/pagination.jsx';
import './styles.css';
import createEditUserModal from './components/createEditUserModal.jsx';

const baseUrl = 'https://ivsblhkvjbfyakdaafrm.supabase.co/rest/v1/users';
const apiKey = 'sb_publishable_MLCyG6Hxn9Uvhe7DgQFe2A_4AToPvjG';

function App() {
    const [users, setUsers] = useState([]);
    const [showcreateEditUserModal, setshowcreateEditUserModal] = useState(false);

    useEffect(() => {
        // Fetch users from an API or other source
        fetchUsers()
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);


    const addUserClickHandler = () => {
        setshowcreateEditUserModal(true);
    };

    const addUserCloseHandler = () => {
        setshowcreateEditUserModal(false);
    };

    const submitUserHandler = async (user) => {
        try {
            // Send user to Rest API
            await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apiKey
                },
                body: JSON.stringify(user)
            });

            // Fetch all users after adding a new one
            const updatedUsers = await fetchUsers();

            // Update the state with the latest users
            setUsers(updatedUsers);
        } catch (error) {
            alert('Error adding user: ' + error);
        } finally {
            setShowSaveUserModal(false);
        }
    };

    const userUpdateHandler = async () => {
        try {
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error updating users:', error);
        }
    };

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users} onUserUpdate={userUpdateHandler} />

                    <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button >

                    {showcreateEditUserModal && <SaveUserModal onClose={addUserCloseHandler} onSubmit={submitUserHandler} />}

                    <Pagination />
                </section >
            </main>

            <Footer />
        </>
    )
}


export default App
