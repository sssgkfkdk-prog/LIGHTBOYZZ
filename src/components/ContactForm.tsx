'use client';
import { useState } from 'react';
import { User, Mail, MessageSquare, Send, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#f4a261] group-focus-within:text-[#e76f51] transition-colors">
          <User size={20} />
        </div>
        <input 
          type="text" 
          name="name" 
          id="name" 
          required
          className="w-full bg-[#1c110a]/60 backdrop-blur-sm border-2 border-[#4a2e1b] rounded-xl pl-12 pr-4 py-4 text-[#fcf6f0] placeholder-[#8c6b54] focus:outline-none focus:border-[#e76f51] focus:bg-[#2d1b11] transition-all duration-300 shadow-inner"
          placeholder="What's your name?"
        />
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#f4a261] group-focus-within:text-[#e76f51] transition-colors">
          <Mail size={20} />
        </div>
        <input 
          type="email" 
          name="email" 
          id="email" 
          required
          className="w-full bg-[#1c110a]/60 backdrop-blur-sm border-2 border-[#4a2e1b] rounded-xl pl-12 pr-4 py-4 text-[#fcf6f0] placeholder-[#8c6b54] focus:outline-none focus:border-[#e76f51] focus:bg-[#2d1b11] transition-all duration-300 shadow-inner"
          placeholder="your.email@example.com"
        />
      </div>

      <div className="relative group">
        <div className="absolute top-4 left-0 pl-4 pointer-events-none text-[#f4a261] group-focus-within:text-[#e76f51] transition-colors">
          <MessageSquare size={20} />
        </div>
        <textarea 
          name="message" 
          id="message" 
          rows={5}
          required
          className="w-full bg-[#1c110a]/60 backdrop-blur-sm border-2 border-[#4a2e1b] rounded-xl pl-12 pr-4 py-4 text-[#fcf6f0] placeholder-[#8c6b54] focus:outline-none focus:border-[#e76f51] focus:bg-[#2d1b11] transition-all duration-300 shadow-inner resize-none"
          placeholder="Describe your vision or the thumbnail you need..."
        />
      </div>
      
      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="relative w-full bg-gradient-to-r from-[#e76f51] to-[#f4a261] text-white font-bold py-4 rounded-xl mt-2 hover:from-[#d65a3d] hover:to-[#e76f51] transition-all duration-500 shadow-[0_10px_20px_rgba(231,111,81,0.3)] hover:shadow-[0_15px_30px_rgba(231,111,81,0.5)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none overflow-hidden group flex items-center justify-center gap-2 text-lg tracking-wide"
      >
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
        {status === 'submitting' ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            SENDING...
          </>
        ) : (
          <>
            SEND INQUIRY <Send size={20} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="font-semibold text-lg">Message Delivered!</p>
          <p className="text-sm mt-1 opacity-80">I will get back to you shortly.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="font-semibold text-lg">Transmission Failed</p>
          <p className="text-sm mt-1 opacity-80">Please try again or contact me via Discord.</p>
        </div>
      )}
    </form>
  );
}
