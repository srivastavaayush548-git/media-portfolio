import React, { useState } from 'react';
import { useData } from '../../Context/DataContext';
import { Plus, MoveUp, MoveDown, Trash2, Edit, Save, X, Upload, ChevronDown, ChevronUp } from 'lucide-react';

const ManageFamily = () => {
  const { 
    familyData, addFamilySection, deleteFamilySection, moveFamilySection,
    addImageToFamily, updateFamilyImage, deleteFamilyImage, moveFamilyImage, reorderFamilyImage 
  } = useData();

  const [expandedSections, setExpandedSections] = useState({});
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [isAddingSection, setIsAddingSection] = useState(false);

  const [addingImageTo, setAddingImageTo] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [imageForm, setImageForm] = useState({ title: '', src: '' });

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
      addFamilySection(newSectionTitle);
      setNewSectionTitle('');
      setIsAddingSection(false);
    }
  };

  const handleImageSave = (sectionId) => {
    if (editingImage) {
      updateFamilyImage(sectionId, editingImage._id, imageForm);
      setEditingImage(null);
    } else {
      addImageToFamily(sectionId, imageForm);
      setAddingImageTo(null);
    }
    setImageForm({ title: '', src: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-stone-600">Manage family photo collections, captions, and section order.</p>
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
              placeholder="e.g. Early Days, Family Trips..."
            />
          </div>
          <button onClick={handleAddSection} className="bg-stone-900 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors">Add</button>
          <button onClick={() => setIsAddingSection(false)} className="px-4 py-2 text-stone-500">Cancel</button>
        </div>
      )}

      <div className="space-y-6">
        {familyData.map((section, sectionIndex) => (
          <div key={section._id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Section Header */}
            <div className="bg-stone-50 p-4 border-b border-stone-200 flex items-center gap-4">
              <div className="flex flex-col">
                <button 
                  disabled={sectionIndex === 0}
                  onClick={() => moveFamilySection(sectionIndex, -1)}
                  className="p-1 hover:bg-stone-200 rounded disabled:opacity-20 transition-colors"
                >
                  <MoveUp size={16} />
                </button>
                <button 
                  disabled={sectionIndex === familyData.length - 1}
                  onClick={() => moveFamilySection(sectionIndex, 1)}
                  className="p-1 hover:bg-stone-200 rounded disabled:opacity-20 transition-colors"
                >
                  <MoveDown size={16} />
                </button>
              </div>

              <h3 className="text-xl font-serif font-bold text-stone-800 flex-1">{section.title}</h3>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setAddingImageTo(section._id)}
                  className="p-2 text-red-700 hover:bg-red-50 rounded-lg flex items-center gap-1 transition-all"
                >
                  <Plus size={18} />
                  <span className="text-sm font-bold">Add Photo</span>
                </button>
                <button 
                  onClick={() => deleteFamilySection(section._id)}
                  className="p-2 text-stone-400 hover:text-red-600 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  onClick={() => toggleSection(section._id)}
                  className="p-2 text-stone-400 hover:bg-stone-200 rounded-lg transition-all"
                >
                  {expandedSections[section._id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            </div>

            {/* Section Content */}
            {expandedSections[section._id] !== false && (
              <div className="p-6">
                {/* Photo Add/Edit Form */}
                {(addingImageTo === section._id || (editingImage && editingImage.sectionId === section._id)) && (
                  <div className="mb-8 p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-stone-800">{editingImage ? 'Edit Photo' : 'Add New Photo'}</h4>
                      <button onClick={() => {setAddingImageTo(null); setEditingImage(null);}}><X size={18} /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Photo Caption / Heading</label>
                        <input 
                          type="text" 
                          value={imageForm.title}
                          onChange={(e) => setImageForm({...imageForm, title: e.target.value})}
                          className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none"
                          placeholder="What is currently shown as title..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Image (Upload or Path)</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={imageForm.src}
                            onChange={(e) => setImageForm({...imageForm, src: e.target.value})}
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
                                  reader.onloadend = () => setImageForm({...imageForm, src: reader.result});
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
                        onClick={() => handleImageSave(section._id)}
                        className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 flex items-center gap-2"
                      >
                        <Save size={18} />
                        Save Photo
                      </button>
                    </div>
                  </div>
                )}

                {/* Images Grid */}
                {section.images.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.images.map((img, imgIndex) => (
                      <div key={img._id} className="relative group bg-white border border-stone-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden mb-3 relative">
                          <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <button 
                                onClick={() => {
                                  setEditingImage({...img, sectionId: section._id});
                                  setImageForm({title: img.title, src: img.src});
                                }}
                                className="p-2 bg-white rounded-full text-stone-900 hover:bg-red-50 hover:text-red-700"
                             >
                               <Edit size={16} />
                             </button>
                             <button 
                                onClick={() => deleteFamilyImage(section._id, img._id)}
                                className="p-2 bg-white rounded-full text-stone-900 hover:bg-red-50 hover:text-red-700"
                             >
                               <Trash2 size={16} />
                             </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="flex-1">
                              <h5 className="font-bold text-sm text-stone-900 truncate">{img.title}</h5>
                           </div>
                           <div className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-lg border border-stone-200">
                              <input 
                                type="number"
                                defaultValue={imgIndex + 1}
                                onBlur={(e) => {
                                  const targetIdx = parseInt(e.target.value) - 1;
                                  if (targetIdx !== imgIndex && targetIdx >= 0 && targetIdx < section.images.length) {
                                    reorderFamilyImage(section._id, imgIndex, targetIdx);
                                  }
                                }}
                                className="w-8 text-xs text-center bg-transparent border-none outline-none focus:ring-0 font-bold"
                              />
                              <div className="flex flex-col border-l border-stone-200 pl-1">
                                <button 
                                  disabled={imgIndex === 0}
                                  onClick={() => moveFamilyImage(section._id, imgIndex, -1)}
                                  className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20"
                                >
                                  <MoveUp size={10} />
                                </button>
                                <button 
                                  disabled={imgIndex === section.images.length - 1}
                                  onClick={() => moveFamilyImage(section._id, imgIndex, 1)}
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
                    <p>No photos in this section yet.</p>
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

export default ManageFamily;
