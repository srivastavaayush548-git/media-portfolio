import React, { useState } from 'react';
import { LayoutGrid, FileText, Image as ImageIcon, Video, ArrowLeft, Plus, MoveUp, MoveDown, Trash2, Edit, Save, X, Upload, LogOut, BookOpen, Mail, BookText } from 'lucide-react';
import ManageArticles from './ManageArticles';
import ManageFamily from './ManageFamily';
import ManageMedia from './ManageMedia';
import ManageBooks from './ManageBooks';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-stone-900 text-stone-300 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-stone-800">
          <h2 className="text-xl font-serif font-bold text-white tracking-wider flex items-center gap-2">
            <LayoutGrid className="text-red-500" />
            ADMIN PANEL
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('articles')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'articles' ? 'bg-red-700 text-white' : 'hover:bg-stone-800'}`}
          >
            <FileText size={20} />
            <span>Articles</span>
          </button>

          <button
            onClick={() => setActiveTab('family')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'family' ? 'bg-red-700 text-white' : 'hover:bg-stone-800'}`}
          >
            <ImageIcon size={20} />
            <span>Family Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'media' ? 'bg-red-700 text-white' : 'hover:bg-stone-800'}`}
          >
            <Video size={20} />
            <span>Media Library</span>
          </button>

          <button
            onClick={() => setActiveTab('non-fiction')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'non-fiction' ? 'bg-red-700 text-white' : 'hover:bg-stone-800'}`}
          >
            <BookText size={20} />
            <span>Non-Fiction</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'reviews' ? 'bg-red-700 text-white' : 'hover:bg-stone-800'}`}
          >
            <BookOpen size={20} />
            <span>Book Reviews</span>
          </button>

          <button
            onClick={() => setActiveTab('invitations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'invitations' ? 'bg-red-700 text-white' : 'hover:bg-stone-800'}`}
          >
            <Mail size={20} />
            <span>Invitations</span>
          </button>

          <button
            onClick={() => setActiveTab('books')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'books' ? 'bg-red-700 text-white' : 'hover:bg-stone-800'}`}
          >
            <BookText size={20} />
            <span>All Books</span>
          </button>
        </nav>

        <div className="p-4 border-t border-stone-800">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 transition-all text-stone-400">
            <ArrowLeft size={18} />
            <span>Back to Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/30 transition-all text-red-500 mt-2"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        <header className="bg-white border-b border-stone-200 sticky top-0 z-10 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-stone-800 capitalize">
            Manage {activeTab}
          </h1>
          <div className="text-stone-500 text-sm">
            Portfolio Management System
          </div>
        </header>

        <main className="p-8">
          {activeTab === 'articles' && <ManageArticles />}
          {activeTab === 'family' && <ManageFamily />}
          {activeTab === 'media' && <ManageMedia />}
          {activeTab === 'non-fiction' && <ManageBooks category="Non-Fiction" />}
          {activeTab === 'reviews' && <ManageBooks category="Book Review" />}
          {activeTab === 'invitations' && <ManageBooks category="Book Invitation" />}
          {activeTab === 'books' && <ManageBooks />}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
