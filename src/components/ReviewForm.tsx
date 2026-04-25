'use client';
import { useState } from 'react';
import { User, MessageSquare, Star, Link as LinkIcon, Loader2, Video } from 'lucide-react';

export default function ReviewForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      channel: formData.get('channel'),
      text: formData.get('text'),
      avatarUrl: formData.get('avatarUrl') || `https://mc-heads.app/avatar/${formData.get('name')}/100`,
      rating: rating,
    };

    try {
      const res = await fetch('/api/reviews', {
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
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#2d1b11]/80 backdrop-blur-xl border-2 border-[#4a2e1b] rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden group">
      {/* Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e76f51] to-transparent opacity-50"></div>
      
      <h3 className="text-3xl font-heading font-normal text-[#fcf6f0] mb-2 text-center uppercase tracking-wide">
        Submit Your Feedback
      </h3>
      <p className="text-[#f4a261] text-sm text-center mb-8 font-medium">YOUR REVIEW WILL BE SHOWN ON THE MARQUEE</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#f4a261]">
              <User size={18} />
            </div>
            <input 
              type="text" 
              name="name" 
              required
              placeholder="Minecraft Username"
              className="w-full bg-[#1c110a] border border-[#4a2e1b] rounded-xl pl-12 pr-4 py-3 text-[#fcf6f0] outline-none focus:border-[#e76f51] transition-all"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#f4a261]">
              <Video size={18} />
            </div>
            <input 
              type="text" 
              name="channel" 
              required
              placeholder="Channel (e.g. 1M Subs)"
              className="w-full bg-[#1c110a] border border-[#4a2e1b] rounded-xl pl-12 pr-4 py-3 text-[#fcf6f0] outline-none focus:border-[#e76f51] transition-all"
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#f4a261]">
            <LinkIcon size={18} />
          </div>
          <input 
            type="url" 
            name="avatarUrl" 
            placeholder="Avatar URL (Optional, uses skin by default)"
            className="w-full bg-[#1c110a] border border-[#4a2e1b] rounded-xl pl-12 pr-4 py-3 text-[#fcf6f0] outline-none focus:border-[#e76f51] transition-all"
          />
        </div>

        <div className="relative">
          <div className="absolute top-4 left-0 pl-4 pointer-events-none text-[#f4a261]">
            <MessageSquare size={18} />
          </div>
          <textarea 
            name="text" 
            required
            rows={4}
            placeholder="What did you think of the art?"
            className="w-full bg-[#1c110a] border border-[#4a2e1b] rounded-xl pl-12 pr-4 py-3 text-[#fcf6f0] outline-none focus:border-[#e76f51] transition-all resize-none"
          />
        </div>

        <div className="flex items-center justify-between bg-[#1c110a] p-4 rounded-xl border border-[#4a2e1b]">
          <span className="text-sm font-bold text-[#f4a261] uppercase tracking-widest">Rate the service:</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button 
                key={s} 
                type="button"
                onClick={() => setRating(s)}
                className="transition-transform active:scale-90"
              >
                <Star 
                  size={24} 
                  fill={s <= rating ? "#f4a261" : "transparent"} 
                  className={s <= rating ? "text-[#f4a261]" : "text-[#4a2e1b]"} 
                />
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full bg-gradient-to-r from-[#e76f51] to-[#f4a261] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-[#e76f51]/40 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === 'submitting' ? <Loader2 className="animate-spin" /> : 'SUBMIT REVIEW'}
        </button>

        {status === 'success' && (
          <p className="text-green-400 text-center font-bold animate-pulse">THANK YOU! YOUR REVIEW IS LIVE.</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-center font-bold">FAILED TO SUBMIT. TRY AGAIN.</p>
        )}
      </form>
    </div>
  );
}
