import React, { useState } from 'react';
import { useData } from '../../Context/DataContext';
import { Plus, MoveUp, MoveDown, Trash2, Edit, Save, X, Upload, Video, Image as ImageIcon, Play, ChevronDown, ChevronUp } from 'lucide-react';

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
    reorderArticleInSection,
    getSignature
  } = useData();

  const [expandedSections, setExpandedSections] = useState({});
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [isAddingSection, setIsAddingSection] = useState(false);

  const [addingArticleTo, setAddingArticleTo] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [rawFile, setRawFile] = useState(null);
  const [articleForm, setArticleForm] = useState({ title: '', src: '', alt: '', type: 'image' });

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

  const uploadFileDirectly = async (fileData, folder, type) => {
    const { timestamp, signature, cloudName, apiKey } = await getSignature(folder);

    const formData = new FormData();
    formData.append('file', fileData);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('api_key', apiKey);
    formData.append('folder', folder);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const resourceType = type === 'video' ? 'video' : 'image';
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url);
        } else {
          const error = JSON.parse(xhr.responseText);
          reject(new Error(error.error?.message || 'Upload failed'));
        }
      };

      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(formData);
    });
  };

  const handleArticleSave = async (sectionId) => {
    try {
      setLoading(true);
      let finalForm = { ...articleForm };

      if (rawFile) {
        setUploadProgress(0);
        finalForm.src = await uploadFileDirectly(rawFile, 'articles', articleForm.type);
      }

      if (editingArticle) {
        await updateArticleInSection(sectionId, editingArticle._id, finalForm);
        setEditingArticle(null);
      } else {
        await addArticleToSection(sectionId, finalForm);
        setAddingArticleTo(null);
      }
      setArticleForm({ title: '', src: '', alt: '', type: 'image' });
      setRawFile(null);
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article: ' + error.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        return alert('File size too large. Please keep it under 50MB.');
      }
      setRawFile(file);
      const isVideo = file.type.startsWith('video');
      const reader = new FileReader();
      reader.onloadend = () => {
        setArticleForm({
          ...articleForm,
          src: reader.result,
          type: isVideo ? 'video' : 'image'
        });
      };
      reader.readAsDataURL(file);
    }
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
                          onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                          className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none"
                          placeholder="Headline..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Image/Video (Upload or Path)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={articleForm.src.startsWith('data:') ? 'Local file selected' : articleForm.src}
                            onChange={(e) => setArticleForm({ ...articleForm, src: e.target.value })}
                            className="flex-1 px-4 py-2 border border-stone-300 rounded-lg outline-none"
                            placeholder="URL or path"
                          />
                          <label className="bg-white border border-stone-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors flex items-center gap-2">
                            <Upload size={18} />
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*,video/*"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        {articleForm.type === 'video' && <p className="text-[10px] text-red-700 mt-1 font-bold">Video detected</p>}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => { setAddingArticleTo(null); setEditingArticle(null); setRawFile(null); }}
                        className="px-6 py-2 text-stone-500 hover:text-stone-700 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleArticleSave(section._id)}
                        disabled={loading}
                        className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 flex flex-col items-center justify-center font-bold shadow-md disabled:opacity-50 min-w-[140px]"
                      >
                        {loading ? (
                          <div className="flex flex-col items-center">
                            <span>{uploadProgress > 0 ? `Uploading ${uploadProgress}%` : 'Saving...'}</span>
                            {uploadProgress > 0 && (
                              <div className="w-full h-1 bg-red-900 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-white transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="flex items-center gap-2"><Save size={18} /> Save Article</span>
                        )}
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
                          {art.type === 'video' ? (
                            <video src={art.src} className="w-full h-full object-cover" />
                          ) : (
                            <img src={art.src} alt={art.title} className="w-full h-full object-cover" />
                          )}
                          {art.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <Play className="text-white fill-current w-8 h-8 opacity-70" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setEditingArticle({ ...art, sectionId: section._id });
                                setArticleForm({ title: art.title, src: art.src, alt: art.alt || art.title, type: art.type || 'image' });
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
