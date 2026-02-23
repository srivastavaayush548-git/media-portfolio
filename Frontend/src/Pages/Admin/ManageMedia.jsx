import React, { useState } from 'react';
import { useData } from '../../Context/DataContext';
import { Plus, MoveUp, MoveDown, Trash2, Edit, Save, X, Upload, Video, Image as ImageIcon, Play, ChevronDown, ChevronUp } from 'lucide-react';

const ManageMedia = () => {
  const { 
    mediaData: mediaSections, 
    addMediaSection, 
    updateMediaSection,
    deleteMediaSection, 
    moveMediaSection,
    addMediaToSection, 
    updateMediaInSection, 
    deleteMediaFromSection, 
    moveMediaInSection,
    reorderMediaInSection,
    getSignature
  } = useData();

  const [expandedSections, setExpandedSections] = useState({});
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [isAddingSection, setIsAddingSection] = useState(false);

  const [addingMediaTo, setAddingMediaTo] = useState(null);
  const [editingMedia, setEditingMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [mediaForm, setMediaForm] = useState({
    title: '',
    description: '',
    type: 'image',
    src: '',
    thumbnail: ''
  });

  const [rawFiles, setRawFiles] = useState({ src: null, thumbnail: null });

  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState('');

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
      addMediaSection(newSectionTitle);
      setNewSectionTitle('');
      setIsAddingSection(false);
    }
  };

  const handleSaveSectionTitle = (sectionId) => {
    if (editingSectionTitle.trim()) {
      updateMediaSection(sectionId, editingSectionTitle);
      setEditingSectionId(null);
    }
  };

  const resetMediaForm = () => {
    setMediaForm({ title: '', description: '', type: 'image', src: '', thumbnail: '' });
    setRawFiles({ src: null, thumbnail: null });
    setAddingMediaTo(null);
    setEditingMedia(null);
    setLoading(false);
    setUploadProgress(0);
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

  const handleMediaSave = async (sectionId) => {
    if (!mediaForm.title || !mediaForm.src) return alert('Title and Media are required');
    
    try {
      setLoading(true);
      let finalForm = { ...mediaForm };

      // Upload main media if it's a new local file
      if (rawFiles.src) {
        setUploadProgress(0);
        finalForm.src = await uploadFileDirectly(rawFiles.src, 'media', mediaForm.type);
      }

      // Upload thumbnail if it's a new local file
      if (rawFiles.thumbnail) {
        finalForm.thumbnail = await uploadFileDirectly(rawFiles.thumbnail, 'media/thumbnails', 'image');
      }

      if (editingMedia) {
        await updateMediaInSection(sectionId, editingMedia._id, finalForm);
      } else {
        await addMediaToSection(sectionId, finalForm);
      }
      resetMediaForm();
    } catch (error) {
      console.error('Error saving media:', error);
      alert('Failed to save media: ' + error.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024 && field === 'src' && mediaForm.type === 'video') {
         return alert('File size too large. Please keep it under 50MB or use a URL.');
      }
      setRawFiles(prev => ({ ...prev, [field]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaForm(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-800">Manage Media Sections</h2>
          <p className="text-stone-600">Organize your photos and videos into sections.</p>
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
              placeholder="e.g. Interviews, Event Coverage, Personal..."
            />
          </div>
          <button onClick={handleAddSection} className="bg-stone-900 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors">Add</button>
          <button onClick={() => setIsAddingSection(false)} className="px-4 py-2 text-stone-500">Cancel</button>
        </div>
      )}

      <div className="space-y-6">
        {mediaSections.map((section, sectionIndex) => (
          <div key={section._id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Section Header */}
            <div className="bg-stone-50 p-4 border-b border-stone-200 flex items-center gap-4">
              <div className="flex flex-col">
                <button 
                  disabled={sectionIndex === 0}
                  onClick={() => moveMediaSection(sectionIndex, -1)}
                  className="p-1 hover:bg-stone-200 rounded disabled:opacity-20 transition-colors"
                >
                  <MoveUp size={16} />
                </button>
                <button 
                  disabled={sectionIndex === mediaSections.length - 1}
                  onClick={() => moveMediaSection(sectionIndex, 1)}
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
                  onClick={() => setAddingMediaTo(section._id)}
                  className="p-2 text-red-700 hover:bg-red-50 rounded-lg flex items-center gap-1 transition-all"
                >
                  <Plus size={18} />
                  <span className="text-sm font-bold">Add Media</span>
                </button>
                <button 
                  onClick={() => { if(window.confirm('Delete this section and all its media?')) deleteMediaSection(section._id); }}
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
                {/* Media Add/Edit Form */}
                {(addingMediaTo === section._id || (editingMedia && editingMedia.sectionId === section._id)) && (
                  <div className="mb-8 p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
                          <input 
                            type="text" 
                            value={mediaForm.title}
                            onChange={(e) => setMediaForm({...mediaForm, title: e.target.value})}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Media title..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Description (Optional)</label>
                          <textarea 
                            value={mediaForm.description}
                            onChange={(e) => setMediaForm({...mediaForm, description: e.target.value})}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 h-24"
                            placeholder="Brief description..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">Media Type</label>
                          <div className="flex gap-4">
                            <button 
                              onClick={() => setMediaForm({...mediaForm, type: 'image'})}
                              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border-2 transition-all ${mediaForm.type === 'image' ? 'border-red-700 bg-red-50 text-red-700' : 'border-stone-200 hover:border-stone-300'}`}
                            >
                              <ImageIcon size={18} /> Image
                            </button>
                            <button 
                              onClick={() => setMediaForm({...mediaForm, type: 'video'})}
                              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border-2 transition-all ${mediaForm.type === 'video' ? 'border-red-700 bg-red-50 text-red-700' : 'border-stone-200 hover:border-stone-300'}`}
                            >
                              <Video size={18} /> Video
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">{mediaForm.type === 'video' ? 'Video File' : 'Image File'}</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={mediaForm.src.startsWith('data:') ? 'Local file selected' : mediaForm.src}
                              readOnly
                              className="flex-1 px-4 py-2 border border-stone-300 rounded-lg bg-stone-100 outline-none text-stone-500"
                              placeholder={`Upload ${mediaForm.type}...`}
                            />
                            <label className="bg-stone-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-black transition-colors flex items-center gap-2">
                              <Upload size={18} />
                              <input 
                                type="file" 
                                className="hidden" 
                                accept={mediaForm.type === 'video' ? 'video/*' : 'image/*'}
                                onChange={(e) => handleFileChange(e, 'src')}
                              />
                            </label>
                          </div>
                        </div>

                        {mediaForm.type === 'video' && (
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">Thumbnail Photo (Optional)</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={mediaForm.thumbnail.startsWith('data:') ? 'Local file selected' : mediaForm.thumbnail}
                                readOnly
                                className="flex-1 px-4 py-2 border border-stone-300 rounded-lg bg-stone-100 outline-none text-stone-500"
                                placeholder="Upload thumbnail..."
                              />
                              <label className="bg-white border border-stone-300 text-stone-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors flex items-center gap-2">
                                <ImageIcon size={18} />
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={(e) => handleFileChange(e, 'thumbnail')}
                                />
                              </label>
                            </div>
                          </div>
                        )}

                        {(mediaForm.src || mediaForm.thumbnail) && (
                          <div className="mt-2 p-2 border border-stone-200 rounded-xl bg-white flex justify-center">
                             {mediaForm.type === 'image' ? (
                               mediaForm.src && <img src={mediaForm.src} className="max-h-32 rounded object-contain" alt="Preview" />
                             ) : (
                               <div className="relative">
                                  {mediaForm.thumbnail ? (
                                    <img src={mediaForm.thumbnail} className="max-h-32 rounded object-contain" alt="Thumbnail Preview" />
                                  ) : (
                                    <div className="w-48 h-27 bg-stone-800 rounded flex items-center justify-center text-white text-[10px]">Video Selected</div>
                                  )}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                     <Play className="text-white fill-current w-6 h-6" />
                                  </div>
                               </div>
                             )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                      <button 
                        onClick={resetMediaForm}
                        className="px-6 py-2 text-stone-500 hover:text-stone-700 font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleMediaSave(section._id)}
                        disabled={loading}
                        className="bg-red-700 text-white px-8 py-2 rounded-lg hover:bg-red-800 flex flex-col items-center justify-center font-bold shadow-md disabled:opacity-50 min-w-[140px]"
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
                          <span className="flex items-center gap-2"><Save size={18} /> Save Media</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Media Grid */}
                {section.media && section.media.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.media.map((item, itemIndex) => (
                      <div key={item._id} className="relative group bg-white border border-stone-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-video bg-stone-900 relative">
                           {item.type === 'video' ? (
                              item.thumbnail ? (
                                <img src={item.thumbnail} className="w-full h-full object-cover opacity-80" alt={item.title} />
                              ) : (
                                <video src={item.src} className="w-full h-full object-cover opacity-50" />
                              )
                           ) : (
                             <img src={item.src} className="w-full h-full object-cover" alt={item.title} />
                           )}
                           
                           {item.type === 'video' && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="text-white fill-current w-10 h-10 opacity-70" />
                             </div>
                           )}

                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <button 
                                onClick={() => {
                                  setEditingMedia({...item, sectionId: section._id});
                                  setMediaForm({
                                    title: item.title, 
                                    description: item.description || '', 
                                    type: item.type, 
                                    src: item.src, 
                                    thumbnail: item.thumbnail || ''
                                  });
                                }}
                                className="p-2 bg-white rounded-full text-stone-900 hover:text-red-700"
                             >
                               <Edit size={16} />
                             </button>
                             <button 
                                onClick={() => { if(window.confirm('Delete this media?')) deleteMediaFromSection(section._id, item._id); }}
                                className="p-2 bg-white rounded-full text-stone-900 hover:text-red-700"
                             >
                               <Trash2 size={16} />
                             </button>
                           </div>
                        </div>
                        <div className="p-3">
                           <div className="flex items-center gap-2">
                              <div className="flex-1 min-w-0">
                                 <h5 className="font-bold text-sm text-stone-900 truncate">{item.title}</h5>
                                 <span className="text-[10px] text-stone-500 uppercase font-bold">{item.type}</span>
                              </div>
                              <div className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-lg border border-stone-200">
                                 <input 
                                   type="number"
                                   defaultValue={itemIndex + 1}
                                   onBlur={(e) => {
                                     const targetIdx = parseInt(e.target.value) - 1;
                                     if (targetIdx !== itemIndex && targetIdx >= 0 && targetIdx < section.media.length) {
                                       reorderMediaInSection(section._id, itemIndex, targetIdx);
                                     }
                                   }}
                                   className="w-8 text-xs text-center bg-transparent border-none outline-none font-bold"
                                 />
                                 <div className="flex flex-col border-l border-stone-200 pl-1">
                                    <button 
                                      disabled={itemIndex === 0}
                                      onClick={() => moveMediaInSection(section._id, itemIndex, -1)}
                                      className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20"
                                    >
                                      <MoveUp size={10} />
                                    </button>
                                    <button 
                                      disabled={itemIndex === section.media.length - 1}
                                      onClick={() => moveMediaInSection(section._id, itemIndex, 1)}
                                      className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20"
                                    >
                                      <MoveDown size={10} />
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-xl text-stone-400">
                    <p>No media in this section yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {mediaSections.length === 0 && !isAddingSection && (
          <div className="text-center py-20 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mx-auto mb-4">
              <ImageIcon size={32} />
            </div>
            <p className="text-stone-500 italic">No media sections found. Create your first section to start adding media.</p>
            <button 
              onClick={() => setIsAddingSection(true)}
              className="mt-4 text-red-700 font-bold hover:underline"
            >
              + Create Section
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMedia;

