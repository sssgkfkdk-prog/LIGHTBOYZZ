'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, LogOut, Check, X, Star, Users, Briefcase, UploadCloud } from 'lucide-react';
import Link from 'next/link';

type Project = {
  id: number;
  title: string;
  imageUrl: string;
  description: string | null;
  orderIndex: number;
};

type Review = {
  id: number;
  name: string;
  channel: string;
  text: string;
  avatarUrl: string;
  rating: number;
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'reviews'>('projects');
  
  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [pTitle, setPTitle] = useState('');
  const [pImageUrl, setPImageUrl] = useState('');
  const [pDescription, setPDescription] = useState('');

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [rName, setRName] = useState('');
  const [rChannel, setRChannel] = useState('');
  const [rText, setRText] = useState('');
  const [rAvatarUrl, setRAvatarUrl] = useState('');
  const [rRating, setRRating] = useState(5);

  const [loading, setLoading] = useState(false);

  const handleImageUpload = (file: File) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setPImageUrl(dataUrl);
        };
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
      fetchAll();
    }
  }, []);

  const fetchAll = () => {
    fetchProjects();
    fetchReviews();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      fetchAll();
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  // --- Project Actions ---
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) setProjects(await res.json());
    } catch (err) {}
  };

  const handlePSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title: pTitle, imageUrl: pImageUrl, description: pDescription, orderIndex: projects.length };
    const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
    const res = await fetch(url, {
      method: editingProject ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      resetPForm();
      fetchProjects();
    }
  };

  const handlePDelete = async (id: number) => {
    if (confirm('Delete project?')) {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      fetchProjects();
    }
  };

  const resetPForm = () => {
    setEditingProject(null);
    setPTitle('');
    setPImageUrl('');
    setPDescription('');
  };

  // --- Review Actions ---
  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) setReviews(await res.json());
    } catch (err) {}
  };

  const handleRSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: rName, channel: rChannel, text: rText, avatarUrl: rAvatarUrl, rating: rRating };
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      resetRForm();
      fetchReviews();
    }
  };

  const handleRDelete = async (id: number) => {
    if (confirm('Delete review?')) {
      await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      fetchReviews();
    }
  };

  const resetRForm = () => {
    setEditingReview(null);
    setRName('');
    setRChannel('');
    setRText('');
    setRAvatarUrl('');
    setRRating(5);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1c110a] flex items-center justify-center p-4 text-[#fcf6f0]">
        <form onSubmit={handleLogin} className="bg-[#2d1b11] border border-[#4a2e1b] p-8 rounded-2xl max-w-md w-full shadow-2xl">
          <h2 className="text-3xl font-heading font-bold mb-6 text-center text-[#e76f51]">Admin Login</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1c110a] border border-[#4a2e1b] rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-[#e76f51] transition-colors"
          />
          <button type="submit" className="w-full bg-[#e76f51] text-white py-3 rounded-xl font-bold hover:bg-[#d65a3d] transition-all">LOGIN</button>
          <div className="mt-6 text-center">
            <Link href="/" className="text-[#f4a261] hover:text-[#e76f51] text-sm font-medium">Back to Portfolio</Link>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1c110a] text-[#fcf6f0] p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-[#4a2e1b] gap-6">
          <div>
            <h1 className="text-4xl font-heading font-bold text-[#e76f51]">ARTIST DASHBOARD</h1>
            <p className="text-[#f4a261] text-sm mt-1 uppercase tracking-widest font-bold">Manage Content & Feedback</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="px-4 py-2 rounded-xl bg-[#2d1b11] text-[#f4a261] hover:text-[#fcf6f0] transition-colors border border-[#4a2e1b]">View Site</Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 font-bold hover:bg-red-500/10 px-4 py-2 rounded-xl">
              <LogOut size={18} /> LOGOUT
            </button>
          </div>
        </header>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'projects' ? 'bg-[#e76f51] text-white shadow-lg' : 'bg-[#2d1b11] text-[#f4a261] border border-[#4a2e1b]'}`}
          >
            <Briefcase size={20} /> PROJECTS
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'reviews' ? 'bg-[#e76f51] text-white shadow-lg' : 'bg-[#2d1b11] text-[#f4a261] border border-[#4a2e1b]'}`}
          >
            <Users size={20} /> REVIEWS
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form Side */}
          <div className="lg:col-span-1">
            <div className="bg-[#2d1b11] border border-[#4a2e1b] rounded-2xl p-6 sticky top-6">
              <h2 className="text-2xl font-heading font-bold mb-6 text-[#f4a261] flex items-center gap-2 uppercase tracking-wide">
                {activeTab === 'projects' ? (editingProject ? 'Edit Project' : 'New Project') : (editingReview ? 'Edit Review' : 'New Review')}
              </h2>

              {activeTab === 'projects' ? (
                <form onSubmit={handlePSubmit} className="flex flex-col gap-4">
                  <input required placeholder="Title" value={pTitle} onChange={e => setPTitle(e.target.value)} className="w-full bg-[#1c110a] border border-[#4a2e1b] rounded-xl px-4 py-3 outline-none focus:border-[#e76f51]" />
                  <div 
                    className={`w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${pImageUrl ? 'border-[#e76f51] bg-[#1c110a]' : 'border-[#4a2e1b] hover:border-[#f4a261] bg-[#1c110a]'}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleImageUpload(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => document.getElementById('thumbnail-upload')?.click()}
                  >
                    <input 
                      type="file" 
                      id="thumbnail-upload" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0]);
                        }
                      }} 
                    />
                    {pImageUrl ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <img src={pImageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white font-bold flex items-center gap-2"><UploadCloud size={18} /> Change Image</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <UploadCloud size={32} className="text-[#f4a261]" />
                        <p className="text-[#fcf6f0] font-bold">Drag & Drop Thumbnail</p>
                        <p className="text-sm text-[#f4a261]/70">or click to browse</p>
                      </>
                    )}
                  </div>
                  <textarea placeholder="Description" value={pDescription} onChange={e => setPDescription(e.target.value)} className="w-full bg-[#1c110a] border border-[#4a2e1b] rounded-xl px-4 py-3 outline-none focus:border-[#e76f51] h-32 resize-none" />
                  <button type="submit" className="w-full bg-[#e76f51] text-white font-bold py-3 rounded-xl hover:bg-[#d65a3d] transition-all">SAVE PROJECT</button>
                  {editingProject && <button type="button" onClick={resetPForm} className="text-[#f4a261] text-sm">Cancel Edit</button>}
                </form>
              ) : (
                <form onSubmit={handleRSubmit} className="flex flex-col gap-4">
                  <input required placeholder="YouTuber Name" value={rName} onChange={e => setRName(e.target.value)} className="w-full bg-[#1c110a] border border-[#4a2e1b] rounded-xl px-4 py-3 outline-none focus:border-[#e76f51]" />
                  <input required placeholder="Channel Info (e.g. 500K Subs)" value={rChannel} onChange={e => setRChannel(e.target.value)} className="w-full bg-[#1c110a] border border-[#4a2e1b] rounded-xl px-4 py-3 outline-none focus:border-[#e76f51]" />
                  <input required placeholder="MC Avatar URL (e.g. mc-heads link)" value={rAvatarUrl} onChange={e => setRAvatarUrl(e.target.value)} className="w-full bg-[#1c110a] border border-[#4a2e1b] rounded-xl px-4 py-3 outline-none focus:border-[#e76f51]" />
                  <textarea required placeholder="Review Text" value={rText} onChange={e => setRText(e.target.value)} className="w-full bg-[#1c110a] border border-[#4a2e1b] rounded-xl px-4 py-3 outline-none focus:border-[#e76f51] h-32 resize-none" />
                  <div className="flex items-center gap-2 bg-[#1c110a] p-3 rounded-xl border border-[#4a2e1b]">
                    <span className="text-sm text-[#f4a261] font-bold">RATING:</span>
                    <select value={rRating} onChange={e => setRRating(Number(e.target.value))} className="bg-transparent outline-none flex-1 font-bold">
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-[#e76f51] text-white font-bold py-3 rounded-xl hover:bg-[#d65a3d] transition-all">SAVE REVIEW</button>
                </form>
              )}
            </div>
          </div>

          {/* List Side */}
          <div className="lg:col-span-2">
            {activeTab === 'projects' ? (
              <>
                <h2 className="text-2xl font-heading font-bold mb-6 text-[#fcf6f0] uppercase tracking-wide">Existing Projects ({projects.length})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {projects.map(p => (
                    <div key={p.id} className="bg-[#2d1b11] border border-[#4a2e1b] rounded-2xl overflow-hidden shadow-xl">
                      <div className="aspect-video relative overflow-hidden bg-[#1c110a]">
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-[#fcf6f0]">{p.title}</h3>
                        <div className="flex justify-end gap-2 mt-4">
                          <button onClick={() => {setEditingProject(p); setPTitle(p.title); setPImageUrl(p.imageUrl); setPDescription(p.description || '')}} className="p-2 bg-[#1c110a] rounded-lg text-[#f4a261] hover:text-[#e76f51]"><Edit2 size={18} /></button>
                          <button onClick={() => handlePDelete(p.id)} className="p-2 bg-[#1c110a] rounded-lg text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-heading font-bold mb-6 text-[#fcf6f0] uppercase tracking-wide">Existing Reviews ({reviews.length})</h2>
                <div className="flex flex-col gap-4">
                  {reviews.map(r => (
                    <div key={r.id} className="bg-[#2d1b11] border border-[#4a2e1b] rounded-2xl p-6 flex items-center justify-between shadow-xl">
                      <div className="flex items-center gap-4">
                        <img src={r.avatarUrl} className="w-12 h-12 rounded-lg bg-[#1c110a] pixelated" />
                        <div>
                          <h3 className="font-bold text-[#fcf6f0]">{r.name}</h3>
                          <p className="text-xs text-[#e76f51] font-bold uppercase tracking-widest">{r.channel}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleRDelete(r.id)} className="p-3 bg-[#1c110a] rounded-xl text-red-400 hover:bg-red-500/10"><Trash2 size={20} /></button>
                      </div>
                    </div>
                  ))}
                  {reviews.length === 0 && <p className="text-center py-20 text-[#f4a261]/50 italic">No reviews added yet.</p>}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
