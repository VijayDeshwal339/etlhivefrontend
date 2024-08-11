// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLeads, addLead, updateLead, deleteLead } from '../features/leadSlice';

// const LeadApplication = () => {
//     const [lead, setLead] = useState({ email: '', name: '', number: '', product: '' });
//     const [leads, setLeadsState] = useState([]);
//     const [search, setSearch] = useState('');
//     const [sort, setSort] = useState('');
//     const [editingId, setEditingId] = useState(null); // Track lead being edited
//     const dispatch = useDispatch();
//     const token = useSelector(state => state.auth.token);

//     useEffect(() => {
//         const fetchLeads = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/leads', {
//                     headers: { Authorization: `Bearer ${token}` },
//                     params: { search, sort }
//                 });
//                 setLeadsState(response.data);
//                 dispatch(setLeads(response.data));
//             } catch (error) {
//                 console.error('Error fetching leads:', error);
//             }
//         };
//         fetchLeads();
//     }, [dispatch, token, search, sort]);

//     const handleChange = (e) => {
//         setLead({ ...lead, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             let response;
//             if (editingId) {
//                 // Update Lead
//                 response = await axios.put(`http://localhost:5000/api/leads/update/${editingId}`, lead, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 dispatch(updateLead(response.data));
//                 setEditingId(null);
//             } else {
//                 // Create Lead
//                 response = await axios.post('http://localhost:5000/api/leads/create', lead, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 dispatch(addLead(response.data));
//             }
//             setLead({ email: '', name: '', number: '', product: '' });
//             // Refetch leads to ensure the latest data is displayed
//             const updatedLeads = await axios.get('http://localhost:5000/api/leads', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setLeadsState(updatedLeads.data);
//             dispatch(setLeads(updatedLeads.data));
//         } catch (error) {
//             console.error('Error submitting lead:', error);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/leads/delete/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             dispatch(deleteLead(id));
//             // Optionally refetch leads to update UI
//             const updatedLeads = await axios.get('http://localhost:5000/api/leads', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setLeadsState(updatedLeads.data);
//             dispatch(setLeads(updatedLeads.data));
//         } catch (error) {
//             console.error('Error deleting lead:', error);
//         }
//     };

//     const handleEdit = (lead) => {
//         setLead(lead);
//         setEditingId(lead._id);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl mb-4">Lead Application</h2>
//             <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-md mb-4">
//                 <label className="block mb-2">Email</label>
//                 <input
//                     type="email"
//                     name="email"
//                     value={lead.email}
//                     onChange={handleChange}
//                     className="block w-full mb-4 p-2 border"
//                     required
//                 />
//                 <label className="block mb-2">Name</label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={lead.name}
//                     onChange={handleChange}
//                     className="block w-full mb-4 p-2 border"
//                     required
//                 />
//                 <label className="block mb-2">Number</label>
//                 <input
//                     type="text"
//                     name="number"
//                     value={lead.number}
//                     onChange={handleChange}
//                     className="block w-full mb-4 p-2 border"
//                     required
//                 />
//                 <label className="block mb-2">Product</label>
//                 <select
//                     name="product"
//                     value={lead.product}
//                     onChange={handleChange}
//                     className="block w-full mb-4 p-2 border"
//                     required
//                 >
//                     <option value="">Select Product</option>
//                     <option value="A">Product A</option>
//                     <option value="B">Product B</option>
//                     <option value="C">Product C</option>
//                 </select>
//                 <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//                     {editingId ? 'Update Lead' : 'Add Lead'}
//                 </button>
//             </form>
//             <div className="mb-4">
//                 <label className="block mb-2">Search</label>
//                 <input
//                     type="text"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="block w-full mb-4 p-2 border"
//                 />
//                 <label className="block mb-2">Sort By</label>
//                 <select
//                     value={sort}
//                     onChange={(e) => setSort(e.target.value)}
//                     className="block w-full mb-4 p-2 border"
//                 >
//                     <option value="">Select Sort Order</option>
//                     <option value="name">Name</option>
//                     <option value="email">Email</option>
//                     <option value="number">Number</option>
//                 </select>
//             </div>
//             <div>
//                 <h3 className="text-xl mb-2">Leads</h3>
//                 <ul>
//                     {leads.map((lead) => (
//                         <li key={lead._id} className="mb-2 p-2 border">
//                             <p>Email: {lead.email}</p>
//                             <p>Name: {lead.name}</p>
//                             <p>Number: {lead.number}</p>
//                             <p>Product: {lead.product}</p>
//                             <button 
//                                 onClick={() => handleEdit(lead)} 
//                                 className="bg-green-500 text-white p-1 rounded mr-2"
//                             >
//                                 Edit
//                             </button>
//                             <button 
//                                 onClick={() => handleDelete(lead._id)} 
//                                 className="bg-red-500 text-white p-1 rounded"
//                             >
//                                 Delete
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default LeadApplication;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLeads, addLead, updateLead, deleteLead } from '../features/leadSlice';

const LeadApplication = () => {
    const [lead, setLead] = useState({ email: '', name: '', number: '', product: '' });
    const [leads, setLeadsState] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [editingId, setEditingId] = useState(null);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get('https://etlhivebackend.onrender.com/api/leads', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { search, sort }
                });
                setLeadsState(response.data);
                dispatch(setLeads(response.data));
            } catch (error) {
                console.error('Error fetching leads:', error);
            }
        };
        fetchLeads();
    }, [dispatch, token, search, sort]);

    const handleChange = (e) => {
        setLead({ ...lead, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingId) {
                response = await axios.put(`https://etlhivebackend.onrender.com/api/leads/update/${editingId}`, lead, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                dispatch(updateLead(response.data));
                setEditingId(null);
            } else {
                response = await axios.post('https://etlhivebackend.onrender.com/api/leads/create', lead, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                dispatch(addLead(response.data));
            }
            setLead({ email: '', name: '', number: '', product: '' });
            const updatedLeads = await axios.get('https://etlhivebackend.onrender.com/api/leads', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLeadsState(updatedLeads.data);
            dispatch(setLeads(updatedLeads.data));
        } catch (error) {
            console.error('Error submitting lead:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://etlhivebackend.onrender.com/api/leads/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(deleteLead(id));
            const updatedLeads = await axios.get('https://etlhivebackend.onrender.com/api/leads', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLeadsState(updatedLeads.data);
            dispatch(setLeads(updatedLeads.data));
        } catch (error) {
            console.error('Error deleting lead:', error);
        }
    };

    const handleEdit = (lead) => {
        setLead(lead);
        setEditingId(lead._id);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Lead Application</h2>
                <form onSubmit={handleSubmit} className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6 space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm md:text-base font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={lead.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm md:text-base font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={lead.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm md:text-base font-medium mb-2">Number</label>
                        <input
                            type="text"
                            name="number"
                            value={lead.number}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm md:text-base font-medium mb-2">Product</label>
                        <select
                            name="product"
                            value={lead.product}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Product</option>
                            <option value="A">Product A</option>
                            <option value="B">Product B</option>
                            <option value="C">Product C</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                        {editingId ? 'Update Lead' : 'Add Lead'}
                    </button>
                </form>
                <div className="mb-4 md:mb-6">
                    <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search leads..."
                            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 md:mb-0"
                        />
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Sort By</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="number">Number</option>
                        </select>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Leads</h3>
                    <ul className="space-y-4">
                        {leads.map((lead) => (
                            <li key={lead._id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm flex flex-col md:flex-row justify-between items-center">
                                <div className="mb-4 md:mb-0">
                                    <p className="text-gray-700 font-medium">Email: {lead.email}</p>
                                    <p className="text-gray-600">Name: {lead.name}</p>
                                    <p className="text-gray-600">Number: {lead.number}</p>
                                    <p className="text-gray-600">Product: {lead.product}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => handleEdit(lead)} 
                                        className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(lead._id)} 
                                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LeadApplication;
