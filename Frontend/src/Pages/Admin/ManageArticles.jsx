import React, { useState } from 'react';
import { useData } from '../../Context/DataContext';
import { Plus, MoveUp, MoveDown, Trash2, Edit, Save, X, Upload, ChevronDown, ChevronUp } from 'lucide-react';

const ManageArticles = () => {
  const { 
    articles: articleSections, 
    addArticleSection, 
    updateArticleSection,
    deleteArticleSection, 
    moveArticleSection,
    addArticleToSection, 
    updateArticleInSection, 
    deleteArticleFromSection, 
    moveArticleInSection,
    reorderArticleInSection
  } = useData();

  const [expandedSections, setExpandedSections] = useState({});
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [isAddingSection, setIsAddingSection] = useState(false);

  const [addingArticleTo, setAddingArticleTo] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleForm, setArticleForm] = useState({ title: '', src: '', alt: '' });

   const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState('');

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
      addArticleSection(newSectionTitle);
      setNewSectionTitle('');
      setIsAddingSection(false);
    }
  };

  const handleSaveSectionTitle = (sectionId) => {
    if (editingSectionTitle.trim()) {
      updateArticleSection(sectionId, editingSectionTitle);
      setEditingSectionId(null);
    }
  };

  const handleArticleSave = (sectionId) => {
    if (editingArticle) {
      updateArticleInSection(sectionId, editingArticle._id, articleForm);
      setEditingArticle(null);
    } else {
      addArticleToSection(sectionId, articleForm);
      setAddingArticleTo(null);
    }
    setArticleForm({ title: '', src: '', alt: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-stone-600">Manage article groups, titles, and ordering.</p>
        </div>
        <button 
          onClick={() => setIsAddingSection(true)}
          className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition-colors shadow-md"
        >
          <Plus size={18} />
          New Section
        </button>
      </div>

      {isAddingSection && (
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xl flex gap-4 items-end animate-in zoom-in-95 duration-200">
          <div className="flex-1">
            <label className="block text-sm font-medium text-stone-700 mb-1">Section Title</label>
            <input 
              type="text" 
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="e.g. Political Commentary, Economic Briefs..."
            />
          </div>
          <button onClick={handleAddSection} className="bg-stone-900 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors">Add</button>
          <button onClick={() => setIsAddingSection(false)} className="px-4 py-2 text-stone-500">Cancel</button>
        </div>
      )}

      <div className="space-y-6">
        {articleSections.map((section, sectionIndex) => (
          <div key={section._id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Section Header */}
            <div className="bg-stone-50 p-4 border-b border-stone-200 flex items-center gap-4">
              <div className="flex flex-col">
                <button 
                  disabled={sectionIndex === 0}
                  onClick={() => moveArticleSection(sectionIndex, -1)}
                  className="p-1 hover:bg-stone-200 rounded disabled:opacity-20 transition-colors"
                >
                  <MoveUp size={16} />
                </button>
                <button 
                  disabled={sectionIndex === articleSections.length - 1}
                  onClick={() => moveArticleSection(sectionIndex, 1)}
                  className="p-1 hover:bg-stone-200 rounded disabled:opacity-20 transition-colors"
                >
                  <MoveDown size={16} />
                </button>
              </div>

              {editingSectionId === section._id ? (
                <div className="flex-1 flex gap-2">
                  <input 
                    type="text"
                    value={editingSectionTitle}
                    onChange={(e) => setEditingSectionTitle(e.target.value)}
                    className="flex-1 px-3 py-1 border border-stone-300 rounded outline-none focus:ring-2 focus:ring-red-500"
                    autoFocus
                  />
                  <button onClick={() => handleSaveSectionTitle(section._id)} className="p-1 text-green-600 hover:bg-green-50 rounded">
                    <Save size={18} />
                  </button>
                  <button onClick={() => setEditingSectionId(null)} className="p-1 text-stone-400 hover:bg-stone-100 rounded">
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex items-center gap-2 group">
                  <h3 className="text-xl font-serif font-bold text-stone-800">{section.title}</h3>
                  <button 
                    onClick={() => {
                      setEditingSectionId(section._id);
                      setEditingSectionTitle(section.title);
                    }}
                    className="p-1 text-stone-400 opacity-0 group-hover:opacity-100 hover:text-red-700 transition-all"
                  >
                    <Edit size={16} />
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setAddingArticleTo(section._id)}
                  className="p-2 text-red-700 hover:bg-red-50 rounded-lg flex items-center gap-1 transition-all"
                >
                  <Plus size={18} />
                  <span className="text-sm font-bold">Add Article</span>
                </button>
                <button 
                  onClick={() => deleteArticleSection(section._id)}
                  className="p-2 text-stone-400 hover:text-red-600 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  onClick={() => toggleSection(section._id)}
                  className="p-2 text-stone-400 hover:bg-stone-200 rounded-lg transition-all"
                >
                  {expandedSections[section._id] !== false ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            </div>

            {/* Section Content */}
            {expandedSections[section._id] !== false && (
              <div className="p-6">
                {/* Article Add/Edit Form */}
                {(addingArticleTo === section._id || (editingArticle && editingArticle.sectionId === section._id)) && (
                  <div className="mb-8 p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Article Title</label>
                        <input 
                          type="text" 
                          value={articleForm.title}
                          onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                          className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none"
                          placeholder="Headline..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Image (Upload or Path)</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={articleForm.src}
                            onChange={(e) => setArticleForm({...articleForm, src: e.target.value})}
                            className="flex-1 px-4 py-2 border border-stone-300 rounded-lg outline-none"
                            placeholder="URL or path"
                          />
                          <label className="bg-white border border-stone-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors flex items-center gap-2">
                            <Upload size={18} />
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => setArticleForm({...articleForm, src: reader.result});
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => {setAddingArticleTo(null); setEditingArticle(null);}}
                        className="px-6 py-2 text-stone-500 hover:text-stone-700 font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleArticleSave(section._id)}
                        className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 flex items-center gap-2"
                      >
                        <Save size={18} />
                        Save Article
                      </button>
                    </div>
                  </div>
                )}

                {/* Articles Grid */}
                {section.articles && section.articles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.articles.map((art, artIndex) => (
                      <div key={art._id} className="relative group bg-white border border-stone-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden mb-3 relative">
                          <img src={art.src} alt={art.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <button 
                                onClick={() => {
                                  setEditingArticle({...art, sectionId: section._id});
                                  setArticleForm({title: art.title, src: art.src, alt: art.alt || art.title});
                                }}
                                className="p-2 bg-white rounded-full text-stone-900 hover:bg-red-50 hover:text-red-700"
                             >
                               <Edit size={16} />
                             </button>
                             <button 
                                onClick={() => deleteArticleFromSection(section._id, art._id)}
                                className="p-2 bg-white rounded-full text-stone-900 hover:bg-red-50 hover:text-red-700"
                             >
                               <Trash2 size={16} />
                             </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="flex-1">
                              <h5 className="font-bold text-sm text-stone-900 truncate">{art.title}</h5>
                           </div>
                           <div className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-lg border border-stone-200">
                              <input 
                                type="number"
                                defaultValue={artIndex + 1}
                                onBlur={(e) => {
                                  const targetIdx = parseInt(e.target.value) - 1;
                                  if (targetIdx !== artIndex && targetIdx >= 0 && targetIdx < section.articles.length) {
                                    reorderArticleInSection(section._id, artIndex, targetIdx);
                                  }
                                }}
                                className="w-8 text-xs text-center bg-transparent border-none outline-none focus:ring-0 font-bold"
                              />
                              <div className="flex flex-col border-l border-stone-200 pl-1">
                                <button 
                                  disabled={artIndex === 0}
                                  onClick={() => moveArticleInSection(section._id, artIndex, -1)}
                                  className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20"
                                >
                                  <MoveUp size={10} />
                                </button>
                                <button 
                                  disabled={artIndex === section.articles.length - 1}
                                  onClick={() => moveArticleInSection(section._id, artIndex, 1)}
                                  className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20"
                                >
                                  <MoveDown size={10} />
                                </button>
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-xl text-stone-400">
                    <p>No articles in this section yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageArticles;
