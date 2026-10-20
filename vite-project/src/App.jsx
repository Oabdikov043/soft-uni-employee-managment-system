import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import UserList from './components/UserList.jsx';
import UserSearch from './components/UserSearch.jsx';
import Pagination from './components/Pagination.jsx';
import './styles.css';
import SaveUserModal from './components/SaveUserModal.jsx';

const baseUrl = 'https://ivsblhkvjbfyakdaafrm.supabase.co/rest/v1/users';
const apiKey = 'sb_publishable_MLCyG6Hxn9Uvhe7DgQFe2A_4AToPvjG';

async function fetchUsers() {
    const response = await fetch(baseUrl, {
        headers: { apikey: apiKey },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
    }

    return response.json();
}

function App() {
    const [users, setUsers] = useState([]);
    const [showSaveUserModal, setShowSaveUserModal] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        // Fetch users from an API or other source
        fetchUsers()
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);


    const addUserClickHandler = () => {
        setEditingUserId(null);
        setShowSaveUserModal(true);
    };

    const addUserCloseHandler = () => {
        setShowSaveUserModal(false);
        setEditingUserId(null);
    };

    const editUserClickHandler = (userId) => {
        setEditingUserId(userId);
        setShowSaveUserModal(true);
    };

    const submitUserHandler = async (user, userId) => {
        try {
            const response = await fetch(userId ? `${baseUrl}?id=eq.${userId}` : baseUrl, {
                method: userId ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    apikey: apiKey,
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error(`Failed to ${userId ? 'update' : 'add'} user: ${response.status}`);
            }

            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
            addUserCloseHandler();
        } catch (error) {
            alert(`Error ${userId ? 'updating' : 'adding'} user: ${error.message}`);
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

                    <UserList
                        users={users}
                        onUserUpdate={userUpdateHandler}
                        onEditUser={editUserClickHandler}
                    />

                    <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button >

                    {showSaveUserModal && (
                        <SaveUserModal
                            userId={editingUserId}
                            edit={Boolean(editingUserId)}
                            onClose={addUserCloseHandler}
                            onSubmit={submitUserHandler}
                        />
                    )}

                    <Pagination />
                </section >
            </main>

            <Footer />
        </>
    )
}


export default App
