import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import './AddEdit.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialState = {
    name: '',
    email: '',
    contact: ''
}

export default () => {
    const [state, setState] = useState(initialState)
    const { name, email, contact } = state
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then(response => setState({...response.data[0]}))
    }, [id])

    const handleSubmit = e => {
        e.preventDefault()

        if(!name || !email || !contact) {
            toast.error('Please provide value into each input field')
        }
        else {
            if(!id) {
                axios
                    .post('http://localhost:5000/api/post', { name, email, contact }).then(() => {
                    setState({ name: '', email: '', contact: '' })
                    }).catch((err) => toast.error(err.response.data))
                toast.success('Contact Added Successully')
            } else {
                axios
                    .put(`http://localhost:5000/api/update/${id}`, { name, email, contact }).then(() => {
                    setState({ name: '', email: '', contact: '' })
                    }).catch((err) => toast.error(err.response.data))
                toast.success('Contact Updated Successully')
            }
            setTimeout(() => navigate('/'), 500)
        }
    }

    const handleInputChange = e => {
        const { name, value } = e.target

        setState({...state, [name] : value})
    }

    return (
        <div style={{marginTop: '100px'}}>
            <form 
                style={{
                    margin: 'auto',
                    padding: '15px',
                    maxWidth: '400px',
                    alignContent: 'center'
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor='name'>Name</label>
                <input 
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Your Name ...'
                    value={name || ''}
                    onChange={handleInputChange}
                />

                <label htmlFor='email'>Email</label>
                <input 
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email ...'
                    value={email || ''}
                    onChange={handleInputChange}
                />

                <label htmlFor='contact'>Contact</label>
                <input 
                    type='text'
                    id='contact'
                    name='contact'
                    placeholder='Contact ...'
                    value={contact || ''}
                    onChange={handleInputChange}
                />

                <input type='submit' value={id ? 'Update' : 'Save'} />
                <Link to='/'>
                    <input type='button' value='Go Back' />
                </Link>
            </form>
        </div>
    )
}
