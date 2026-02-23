import React, { useState } from 'react';
import { useData } from '../../Context/DataContext';
import { Plus, MoveUp, MoveDown, Trash2, Edit, Save, X, Upload, Video, Image as ImageIcon, Play } from 'lucide-react';

const ManageMedia = () => {
  const { mediaData, saveMedia, deleteMedia, moveMedia, reorderMedia } = useData();

  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'image',
    src: '',
    thumbnail: ''
  });

  const resetForm = () => {
    setForm({ title: '', description: '', type: 'image', src: '', thumbnail: '' });
    setIsAdding(false);
    setEditingItem(null);
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description || '',
      type: item.type,
      src: item.src,
      thumbnail: item.thumbnail || ''
    });
    setIsAdding(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.src) return alert('Title and Media are required');
    
    try {
      setLoading(true);
      await saveMedia({ ...form, id: editingItem?._id });
      resetForm();
    } catch (error) {
      console.error('Error saving media:', error);
      alert('Failed to save media');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024 && field === 'src' && form.type === 'video') {
         alert('File size too large. Please keep it under 10MB or use a URL.');
         // return; 
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-800">Manage Media</h2>
          <p className="text-stone-600">Upload and manage photos and videos for your portfolio.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition-colors shadow-md"
          >
            <Plus size={18} />
            Add Media
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-2">
             <h3 className="font-serif font-bold text-lg">{editingItem ? 'Edit Media' : 'New Media'}</h3>
             <button onClick={resetForm} className="text-stone-400 hover:text-stone-600"><X size={20} /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
                <input 
                  type="text" 
                  value={form.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Description (Optional)</label>
                <textarea 
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none h-24"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Media Type</label>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setForm({...form, type: 'image'})}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border-2 transition-all ${form.type === 'image' ? 'border-red-700 bg-red-50 text-red-700' : 'border-stone-200 hover:border-stone-300'}`}
                  >
                    <ImageIcon size={18} className="mr-2" /> Image
                  </button>
                  <button 
                    onClick={() => setForm({...form, type: 'video'})}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border-2 transition-all ${form.type === 'video' ? 'border-red-700 bg-red-50 text-red-700' : 'border-stone-200 hover:border-stone-300'}`}
                  >
                    <Video size={18} className="mr-2" /> Video
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">{form.type === 'video' ? 'Video File' : 'Image File'}</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={form.src.startsWith('data:') ? 'Local file selected' : form.src}
                    readOnly
                    className="flex-1 px-4 py-2 border border-stone-300 rounded-lg bg-stone-50 outline-none text-stone-500"
                    placeholder={`Upload ${form.type}...`}
                  />
                  <label className="bg-stone-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-black transition-colors flex items-center gap-2">
                    <Upload size={18} />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept={form.type === 'video' ? 'video/*' : 'image/*'}
                      onChange={(e) => handleFileChange(e, 'src')}
                    />
                  </label>
                </div>
              </div>

              {form.type === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Thumbnail Photo (Optional)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={form.thumbnail.startsWith('data:') ? 'Local file selected' : form.thumbnail}
                      readOnly
                      className="flex-1 px-4 py-2 border border-stone-300 rounded-lg bg-stone-50 outline-none text-stone-500"
                      placeholder="Upload thumbnail..."
                    />
                    <label className="bg-stone-100 text-stone-700 border border-stone-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-stone-200 transition-colors flex items-center gap-2">
                      <ImageIcon size={18} />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'thumbnail')}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">Recommended for videos to ensure fast loading.</p>
                </div>
              )}

              {(form.src || form.thumbnail) && (
                <div className="mt-4 p-4 border border-stone-100 rounded-xl bg-stone-50 flex justify-center overflow-hidden">
                   {form.type === 'image' ? (
                     form.src && <img src={form.src} className="max-h-40 rounded shadow-sm object-contain" alt="Preview" />
                   ) : (
                     <div className="relative">
                        {form.thumbnail ? (
                          <img src={form.thumbnail} className="max-h-40 rounded shadow-sm object-contain" alt="Thumbnail Preview" />
                        ) : (
                          <div className="w-64 h-36 bg-stone-800 rounded flex items-center justify-center text-white text-xs">Video Selected</div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Play className="text-white fill-current drop-shadow-lg" />
                        </div>
                     </div>
                   )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
             <button onClick={resetForm} className="px-6 py-2 text-stone-500 hover:text-stone-700 font-medium">Cancel</button>
             <button 
               onClick={handleSubmit}
               disabled={loading}
               className="bg-red-700 text-white px-8 py-2 rounded-lg hover:bg-red-800 flex items-center gap-2 font-bold shadow-md shadow-red-100 disabled:opacity-50"
             >
               {loading ? (
                 <>
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Saving...
                 </>
               ) : (
                 <>
                   <Save size={18} />
                   {editingItem ? 'Update Media' : 'Save Media'}
                 </>
               )}
             </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaData.map((item, index) => (
          <div key={item._id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm group hover:shadow-md transition-all">
            <div className="aspect-video relative bg-stone-900 overflow-hidden">
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

               <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="p-2 bg-white rounded-full text-stone-700 hover:text-red-700 shadow-sm"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => { if(window.confirm('Delete this media?')) deleteMedia(item._id); }}
                    className="p-2 bg-white rounded-full text-stone-700 hover:text-red-700 shadow-sm"
                  >
                    <Trash2 size={16} />
                  </button>
               </div>
               
               <div className="absolute bottom-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    disabled={index === 0}
                    onClick={() => moveMedia(index, -1)}
                    className="p-1 bg-white/80 backdrop-blur rounded text-stone-700 hover:bg-white disabled:opacity-30"
                  >
                    <MoveUp size={14} />
                  </button>
                  <button 
                    disabled={index === mediaData.length - 1}
                    onClick={() => moveMedia(index, 1)}
                    className="p-1 bg-white/80 backdrop-blur rounded text-stone-700 hover:bg-white disabled:opacity-30"
                  >
                    <MoveDown size={14} />
                  </button>
               </div>
            </div>
            <div className="p-4">
              <h4 className="font-serif font-bold text-stone-800 truncate">{item.title}</h4>
              <p className="text-xs text-stone-500 mt-1 line-clamp-1">{item.description || 'No description'}</p>
              <div className="mt-3 flex items-center justify-between">
                 <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${item.type === 'video' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                    {item.type}
                 </span>
                 <div className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-lg border border-stone-200">
                   <input 
                      type="number"
                      value={index + 1}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) - 1;
                        if(val >=0 && val < mediaData.length) reorderMedia(index, val);
                      }}
                      className="w-8 text-xs text-center bg-transparent border-none outline-none font-bold"
                   />
                 </div>
              </div>
            </div>
          </div>
        ))}
        
        {(!mediaData || mediaData.length === 0) && !isAdding && (
          <div className="col-span-full py-20 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 text-center flex flex-col items-center gap-4">
             <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                <ImageIcon size={32} />
             </div>
             <p className="text-stone-500 italic">No media found. Start by adding your first photo or video!</p>
             <button 
                onClick={() => setIsAdding(true)}
                className="text-red-700 font-bold hover:underline"
              >
                + Add Media Item
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMedia;
