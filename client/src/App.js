import { 
    BrowserRouter,
    RouterProvider,
    Route 
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

export default () => {
    return (
        <BrowserRouter>
            <div className="App">
                <ToastContainer position='top-center' />
            </div>
        </BrowserRouter>
    )
}
