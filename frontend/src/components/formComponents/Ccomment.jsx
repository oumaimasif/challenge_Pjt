import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Auth} from '../../context/Auth';
import { DateString } from '../dateAgeFormat';

export default function Ccomment({ annonceId }) {
    const { user } = useContext(Auth);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
  
    useEffect(() => {
      axios.get(`http://localhost:5000/comments/byAnnonce/${annonceId}`)
        .then(res => setComments(res.data));
    }, [annonceId]);
  
    const submit = async e => {
      e.preventDefault();
      await axios.post('http://localhost:5000/comments/add',
        { annonceId, content: text },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setText('');
      // rechargement
      const res = await axios.get(`http://localhost:5000/comments/byAnnonce/${annonceId}`);
      setComments(res.data);
    };
  
    if (!user) return null;
  
    return (
      <div className="mt-6">
        <form onSubmit={submit} className="mb-4">
          <textarea
            className="w-full border p-2 rounded"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Laissez un commentaire…"
            required
          />
          <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Commenter</button>
        </form>
        <div className="space-y-4">
          {comments.map(c => (
            <div key={c._id} className="border p-3 rounded bg-gray-50">
              <p className="text-sm text-gray-700">{c.content}</p>
              <div className="text-xs text-gray-500">{DateString(c.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  