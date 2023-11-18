import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Create from './pages/Create';
import { useEffect } from 'react';
import { randomString } from './utilities/randomString';
import Dashboard from './pages/Dashboard';

function App() {
	
	useEffect(() =>{
		const getLocalToken = localStorage.getItem('localToken');
		if(!getLocalToken){
			localStorage.setItem("localToken", randomString(50));
		}
	}, []);
	
	return (
		<Routes>
			<Route path='/' element={<Create />} />
			<Route path='/dashboard' element={<Dashboard />} />
			<Route path='*' element={<>NotFound</>} />
		</Routes>
	);
}

export default App;
