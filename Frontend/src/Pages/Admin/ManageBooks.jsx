import React, { useState } from 'react';
import { useData } from '../../Context/DataContext';
import { nonFictionBooks } from '../../Data/books';
import { Plus, MoveUp, MoveDown, Trash2, Edit, Save, X, Upload, Book, Image as ImageIcon, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

const ManageBooks = () => {
    const {
        booksData: bookSections,
        addBookSection,
        updateBookSection,
        deleteBookSection,
        moveBookSection,
        addBookToSection,
        updateBookInSection,
        deleteBookFromSection,
        moveBookInSection,
        reorderBookInSection,
        getSignature
    } = useData();

    const [expandedSections, setExpandedSections] = useState({});
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [isAddingSection, setIsAddingSection] = useState(false);

    const [addingBookTo, setAddingBookTo] = useState(null);
    const [editingBook, setEditingBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [bookForm, setBookForm] = useState({
        title: '',
        author: '',
        description: '',
        cover: '',
        pages: '',
        published: '',
        language: '',
        purchaseLink: '',
        readOnline: false
    });

    const [rawFiles, setRawFiles] = useState({ cover: null });

    const [editingSectionId, setEditingSectionId] = useState(null);
    const [editingSectionTitle, setEditingSectionTitle] = useState('');

    const toggleSection = (id) => {
        setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAddSection = () => {
        addBookSection(newSectionTitle || 'Untitled Section');
        setNewSectionTitle('');
        setIsAddingSection(false);
    };

    const handleSaveSectionTitle = (sectionId) => {
        updateBookSection(sectionId, editingSectionTitle || 'Untitled Section');
        setEditingSectionId(null);
    };

    const resetBookForm = () => {
        setBookForm({
            title: '', author: '', description: '', cover: '',
            pages: '', published: '', language: '', purchaseLink: '',
            readOnline: false
        });
        setRawFiles({ cover: null });
        setAddingBookTo(null);
        setEditingBook(null);
        setLoading(false);
        setUploadProgress(0);
    };

    const uploadFileDirectly = async (fileData, folder) => {
        const { timestamp, signature, cloudName, apiKey } = await getSignature(folder);

        const formData = new FormData();
        formData.append('file', fileData);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);
        formData.append('api_key', apiKey);
        formData.append('folder', folder);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

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

    const handleBookSave = async (sectionId) => {
        try {
            setLoading(true);
            let finalForm = { ...bookForm };

            if (rawFiles.cover) {
                setUploadProgress(0);
                finalForm.cover = await uploadFileDirectly(rawFiles.cover, 'books/covers');
            }

            if (editingBook) {
                await updateBookInSection(sectionId, editingBook._id, finalForm);
            } else {
                await addBookToSection(sectionId, finalForm);
            }
            resetBookForm();
        } catch (error) {
            console.error('Error saving book:', error);
            alert('Failed to save book: ' + error.message);
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    const handleSyncData = async () => {
        if (!window.confirm('This will upload all books from the data file to the database. Continue?')) return;

        try {
            setLoading(true);
            let section = bookSections.find(s => s.title === 'Non-Fiction');
            if (!section) {
                section = await addBookSection('Non-Fiction');
            }

            for (const book of nonFictionBooks) {
                // Check if book already exists in this section (by title)
                const exists = section.books?.some(b => b.title === book.title);
                if (exists) {
                    console.log(`Skipping "${book.title}" as it already exists.`);
                    continue;
                }

                console.log(`Syncing "${book.title}"...`);
                let coverUrl = book.cover;

                // If cover is a local asset (URL starting with /src or base64 or similar)
                if (coverUrl && (coverUrl.startsWith('/') || coverUrl.includes('base64') || coverUrl.startsWith('http'))) {
                    try {
                        const response = await fetch(coverUrl);
                        const blob = await response.blob();
                        const file = new File([blob], 'cover.jpg', { type: blob.type });
                        coverUrl = await uploadFileDirectly(file, 'books/covers');
                    } catch (e) {
                        console.error(`Failed to upload cover for ${book.title}:`, e);
                        // Continue even if image fails
                    }
                }

                await addBookToSection(section._id, {
                    ...book,
                    cover: coverUrl
                });
            }

            alert('Data synced successfully!');
        } catch (error) {
            console.error('Error syncing data:', error);
            alert('Failed to sync data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setRawFiles(prev => ({ ...prev, [field]: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setBookForm(prev => ({ ...prev, [field]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-stone-800">Manage Books</h2>
                    <p className="text-stone-600">Organize your non-fiction, reviews, and invitations.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSyncData}
                        disabled={loading}
                        className="bg-stone-100 text-stone-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-stone-200 transition-colors shadow-sm disabled:opacity-50"
                        title="Sync books from local data file"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                        Sync Data
                    </button>
                    <button
                        onClick={() => setIsAddingSection(true)}
                        className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition-colors shadow-md"
                    >
                        <Plus size={18} />
                        New Section
                    </button>
                </div>
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
                            placeholder="e.g. Non-Fiction, Book Reviews..."
                        />
                    </div>
                    <button onClick={handleAddSection} className="bg-stone-900 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors">Add</button>
                    <button onClick={() => setIsAddingSection(false)} className="px-4 py-2 text-stone-500">Cancel</button>
                </div>
            )}

            <div className="space-y-6">
                {bookSections.map((section, sectionIndex) => (
                    <div key={section._id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                        {/* Section Header */}
                        <div className="bg-stone-50 p-4 border-b border-stone-200 flex items-center gap-4">
                            <div className="flex flex-col">
                                <button
                                    disabled={sectionIndex === 0}
                                    onClick={() => moveBookSection(sectionIndex, -1)}
                                    className="p-1 hover:bg-stone-200 rounded disabled:opacity-20 transition-colors"
                                >
                                    <MoveUp size={16} />
                                </button>
                                <button
                                    disabled={sectionIndex === bookSections.length - 1}
                                    onClick={() => moveBookSection(sectionIndex, 1)}
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
                                    <h3 className="text-xl font-serif font-bold text-stone-800">{section.title || 'Untitled Section'}</h3>
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
                                    onClick={() => setAddingBookTo(section._id)}
                                    className="p-2 text-red-700 hover:bg-red-50 rounded-lg flex items-center gap-1 transition-all"
                                >
                                    <Plus size={18} />
                                    <span className="text-sm font-bold">Add Book</span>
                                </button>
                                <button
                                    onClick={() => { if (window.confirm('Delete this section and all its books?')) deleteBookSection(section._id); }}
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
                                {/* Book Add/Edit Form */}
                                {(addingBookTo === section._id || (editingBook && editingBook.sectionId === section._id)) && (
                                    <div className="mb-8 p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
                                                    <input
                                                        type="text"
                                                        value={bookForm.title}
                                                        onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                                                        className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                                                        placeholder="Book title..."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">Author</label>
                                                    <input
                                                        type="text"
                                                        value={bookForm.author}
                                                        onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                                                        className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                                                        placeholder="Author name..."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">Description (Optional)</label>
                                                    <textarea
                                                        value={bookForm.description}
                                                        onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                                                        className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 h-24"
                                                        placeholder="Brief description..."
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-stone-700 mb-1">Pages</label>
                                                        <input
                                                            type="text"
                                                            value={bookForm.pages}
                                                            onChange={(e) => setBookForm({ ...bookForm, pages: e.target.value })}
                                                            className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                                                            placeholder="e.g. 296"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-stone-700 mb-1">Published</label>
                                                        <input
                                                            type="text"
                                                            value={bookForm.published}
                                                            onChange={(e) => setBookForm({ ...bookForm, published: e.target.value })}
                                                            className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                                                            placeholder="e.g. 12 March, 2025"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">Language</label>
                                                    <input
                                                        type="text"
                                                        value={bookForm.language}
                                                        onChange={(e) => setBookForm({ ...bookForm, language: e.target.value })}
                                                        className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                                                        placeholder="e.g. English"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">Purchase Link</label>
                                                    <input
                                                        type="text"
                                                        value={bookForm.purchaseLink}
                                                        onChange={(e) => setBookForm({ ...bookForm, purchaseLink: e.target.value })}
                                                        className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                                                        placeholder="https://amazon.com/..."
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2 py-2">
                                                    <input
                                                        type="checkbox"
                                                        id="readOnline"
                                                        checked={bookForm.readOnline}
                                                        onChange={(e) => setBookForm({ ...bookForm, readOnline: e.target.checked })}
                                                        className="w-4 h-4 text-red-700 border-stone-300 rounded focus:ring-red-500"
                                                    />
                                                    <label htmlFor="readOnline" className="text-sm font-medium text-stone-700">Enable Read Online</label>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">Cover Image</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={bookForm.cover.startsWith('data:') ? 'Local file selected' : bookForm.cover}
                                                            readOnly
                                                            className="flex-1 px-4 py-2 border border-stone-300 rounded-lg bg-stone-100 outline-none text-stone-500"
                                                            placeholder="Upload cover..."
                                                        />
                                                        <label className="bg-stone-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-black transition-colors flex items-center gap-2">
                                                            <Upload size={18} />
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, 'cover')}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>

                                                {bookForm.cover && (
                                                    <div className="mt-2 p-2 border border-stone-200 rounded-xl bg-white flex justify-center">
                                                        <img src={bookForm.cover} className="max-h-32 rounded object-contain" alt="Preview" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                                            <button
                                                onClick={resetBookForm}
                                                className="px-6 py-2 text-stone-500 hover:text-stone-700 font-medium"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleBookSave(section._id)}
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
                                                    <span className="flex items-center gap-2"><Save size={18} /> Save Book</span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Book Grid */}
                                {section.books && section.books.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {section.books.map((item, itemIndex) => (
                                            <div key={item._id} className="relative group bg-white border border-stone-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                                <div className="aspect-2/3 bg-stone-200 relative">
                                                    <img src={item.cover} className="w-full h-full object-cover" alt={item.title} />

                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingBook({ ...item, sectionId: section._id });
                                                                setBookForm({
                                                                    title: item.title,
                                                                    author: item.author || '',
                                                                    description: item.description || '',
                                                                    cover: item.cover,
                                                                    pages: item.pages || '',
                                                                    published: item.published || '',
                                                                    language: item.language || '',
                                                                    purchaseLink: item.purchaseLink || '',
                                                                    readOnline: item.readOnline || false
                                                                });
                                                            }}
                                                            className="p-2 bg-white rounded-full text-stone-900 hover:text-red-700"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => { if (window.confirm('Delete this book?')) deleteBookFromSection(section._id, item._id); }}
                                                            className="p-2 bg-white rounded-full text-stone-900 hover:text-red-700"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 min-w-0">
                                                            <h5 className="font-bold text-sm text-stone-900 truncate">{item.title || 'Untitled Book'}</h5>
                                                            <span className="text-[10px] text-stone-500 uppercase font-bold">{item.author}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-lg border border-stone-200">
                                                            <input
                                                                type="number"
                                                                defaultValue={itemIndex + 1}
                                                                onBlur={(e) => {
                                                                    const targetIdx = parseInt(e.target.value) - 1;
                                                                    if (targetIdx !== itemIndex && targetIdx >= 0 && targetIdx < section.books.length) {
                                                                        reorderBookInSection(section._id, itemIndex, targetIdx);
                                                                    }
                                                                }}
                                                                className="w-8 text-xs text-center bg-transparent border-none outline-none font-bold"
                                                            />
                                                            <div className="flex flex-col border-l border-stone-200 pl-1">
                                                                <button
                                                                    disabled={itemIndex === 0}
                                                                    onClick={() => moveBookInSection(section._id, itemIndex, -1)}
                                                                    className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20"
                                                                >
                                                                    <MoveUp size={10} />
                                                                </button>
                                                                <button
                                                                    disabled={itemIndex === section.books.length - 1}
                                                                    onClick={() => moveBookInSection(section._id, itemIndex, 1)}
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
                                        <p>No books in this section yet.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {bookSections.length === 0 && !isAddingSection && (
                    <div className="text-center py-20 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
                        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mx-auto mb-4">
                            <Book size={32} />
                        </div>
                        <p className="text-stone-500 italic">No book sections found. Create your first section to start adding books.</p>
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

export default ManageBooks;
