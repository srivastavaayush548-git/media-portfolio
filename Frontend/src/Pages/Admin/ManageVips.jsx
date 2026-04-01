import React, { useState } from "react";
import { useData } from "../../Context/DataContext";
import {
  Plus,
  MoveUp,
  MoveDown,
  Trash2,
  Edit,
  Save,
  X,
  Upload,
  ChevronDown,
  ChevronUp,
  Play,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";

const TOP_VIDEOS_SECTION_TITLE = "__TOP_VIDEOS__";

const ManageVips = () => {
  const {
    vipsData,
    addVipSection,
    updateVipSection,
    deleteVipSection,
    moveVipSection,
    addImageToVips,
    updateVipImage,
    deleteVipImage,
    moveVipImage,
    reorderVipImage,
  } = useData();

  const [expandedSections, setExpandedSections] = useState({});
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [isAddingSection, setIsAddingSection] = useState(false);

  const [addingImageTo, setAddingImageTo] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [imageForm, setImageForm] = useState({
    title: "",
    src: "",
    type: "image",
  });
  const [imageSaveLoading, setImageSaveLoading] = useState(false);
  const [imageSaveError, setImageSaveError] = useState("");

  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState("");

  const [isAddingTopVideo, setIsAddingTopVideo] = useState(false);
  const [editingTopVideo, setEditingTopVideo] = useState(null);
  const [topVideoForm, setTopVideoForm] = useState({
    title: "",
    src: "",
    thumbnail: "",
    type: "video",
  });
  const [topVideoLoading, setTopVideoLoading] = useState(false);
  const [topVideoError, setTopVideoError] = useState("");
  const [topVideoSuccess, setTopVideoSuccess] = useState("");

  const topVideosSection = vipsData.find(
    (section) => section.title === TOP_VIDEOS_SECTION_TITLE,
  );
  const visibleSections = vipsData.filter(
    (section) => section.title !== TOP_VIDEOS_SECTION_TITLE,
  );

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSection = async () => {
    if (newSectionTitle.trim()) {
      await addVipSection(newSectionTitle);
      setNewSectionTitle("");
      setIsAddingSection(false);
    }
  };

  const handleSaveSectionTitle = (sectionId) => {
    if (editingSectionTitle.trim()) {
      updateVipSection(sectionId, editingSectionTitle);
      setEditingSectionId(null);
    }
  };

  const resetImageForm = () => {
    setAddingImageTo(null);
    setEditingImage(null);
    setImageForm({ title: "", src: "", type: "image" });
    setImageSaveError("");
  };

  const handleImageSave = async (sectionId) => {
    setImageSaveError("");

    if (!imageForm.src?.trim()) {
      setImageSaveError("Please select or enter an image/video source");
      return;
    }

    setImageSaveLoading(true);
    try {
      if (editingImage) {
        await updateVipImage(sectionId, editingImage._id, imageForm);
      } else {
        await addImageToVips(sectionId, imageForm);
      }
      resetImageForm();
    } catch (error) {
      setImageSaveError(
        `Error saving image: ${error.message || "Unknown error"}`,
      );
      console.error("Error saving image:", error);
    } finally {
      setImageSaveLoading(false);
    }
  };

  const resetTopVideoForm = () => {
    setIsAddingTopVideo(false);
    setEditingTopVideo(null);
    setTopVideoForm({ title: "", src: "", thumbnail: "", type: "video" });
    setTopVideoError("");
    setTopVideoSuccess("");
  };

  const ensureTopVideosSection = async () => {
    let section = vipsData.find((s) => s.title === TOP_VIDEOS_SECTION_TITLE);
    if (section) return section;

    try {
      section = await addVipSection(TOP_VIDEOS_SECTION_TITLE);
      return section;
    } catch (error) {
      throw new Error(`Failed to create Top Videos section: ${error.message}`);
    }
  };

  const handleTopVideoSave = async () => {
    setTopVideoError("");
    setTopVideoSuccess("");

    if (!topVideoForm.src?.trim()) {
      setTopVideoError("Please upload a video file or enter a video URL");
      return;
    }

    if (topVideoForm.src.length < 10) {
      setTopVideoError(
        "Invalid video source. Please provide a valid URL or upload a file",
      );
      return;
    }

    setTopVideoLoading(true);
    try {
      const section = await ensureTopVideosSection();

      if (!section?._id) {
        throw new Error("Failed to get Top Videos section");
      }

      const videoData = {
        title:
          topVideoForm.title.trim() ||
          `Video ${topVideosSection?.images?.length || 0 + 1}`,
        src: topVideoForm.src,
        thumbnail: topVideoForm.thumbnail || "",
        type: "video",
      };

      if (editingTopVideo) {
        await updateVipImage(section._id, editingTopVideo._id, videoData);
        setTopVideoSuccess("Video updated successfully!");
      } else {
        await addImageToVips(section._id, videoData);
        setTopVideoSuccess("Video added successfully!");
      }

      setTimeout(() => {
        resetTopVideoForm();
      }, 1500);
    } catch (error) {
      setTopVideoError(
        `Error saving video: ${error.message || "Unknown error"}`,
      );
      console.error("Error saving top video:", error);
    } finally {
      setTopVideoLoading(false);
    }
  };

  const handleFileChange = (e, setter, currentForm, field = "src") => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        return alert("File size too large. Please keep it under 50MB.");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setter((prev) => ({
          ...prev,
          [field]: reader.result,
          ...(field === "src"
            ? { type: file.type.startsWith("video") ? "video" : "image" }
            : {}),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-stone-600">
            Manage VIP gallery sections, captions, and photo order.
          </p>
          <p className="text-sm text-stone-500 mt-1">
            Top videos can be uploaded directly here. No separate section
            creation is needed.
          </p>
        </div>
        <button
          onClick={() => setIsAddingSection(true)}
          className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition-colors shadow-md"
        >
          <Plus size={18} />
          New Section
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-stone-50 p-4 border-b border-stone-200 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-800">
              Top Videos
            </h3>
            <p className="text-sm text-stone-500">
              These videos appear in the 4-card strip near the top of the VIP
              page.
            </p>
          </div>
          <button
            onClick={() => {
              setIsAddingTopVideo(true);
              setEditingTopVideo(null);
              setTopVideoForm({
                title: "",
                src: "",
                thumbnail: "",
                type: "video",
              });
            }}
            className="p-2 text-red-700 hover:bg-red-50 rounded-lg flex items-center gap-1 transition-all"
          >
            <Plus size={18} />
            <span className="text-sm font-bold">Add Video</span>
          </button>
        </div>

        <div className="p-6">
          {topVideoError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle size={20} className="text-red-600 shrink-0" />
              <p className="text-red-700 text-sm">{topVideoError}</p>
            </div>
          )}

          {topVideoSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle size={20} className="text-green-600 shrink-0" />
              <p className="text-green-700 text-sm">{topVideoSuccess}</p>
            </div>
          )}

          {(isAddingTopVideo || editingTopVideo) && (
            <div className="mb-8 p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Video Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={topVideoForm.title}
                    onChange={(e) =>
                      setTopVideoForm({
                        ...topVideoForm,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none disabled:bg-stone-100 disabled:cursor-not-allowed"
                    placeholder="Optional caption"
                    disabled={topVideoLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Video Upload or URL <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={
                        topVideoForm.src.startsWith("data:")
                          ? "Local file selected ✓"
                          : topVideoForm.src
                      }
                      onChange={(e) =>
                        setTopVideoForm({
                          ...topVideoForm,
                          src: e.target.value,
                          type: "video",
                        })
                      }
                      className="flex-1 px-4 py-2 border border-stone-300 rounded-lg outline-none disabled:bg-stone-100 disabled:cursor-not-allowed"
                      placeholder="Enter video URL or upload file"
                      disabled={topVideoLoading}
                    />
                    <label className="bg-white border border-stone-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors flex items-center gap-2 disabled:opacity-50">
                      <Upload size={18} />
                      <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onChange={(e) =>
                          handleFileChange(
                            e,
                            setTopVideoForm,
                            topVideoForm,
                            "src",
                          )
                        }
                        disabled={topVideoLoading}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Thumbnail Image (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={
                        topVideoForm.thumbnail?.startsWith("data:")
                          ? "Image selected ✓"
                          : topVideoForm.thumbnail || ""
                      }
                      onChange={(e) =>
                        setTopVideoForm({
                          ...topVideoForm,
                          thumbnail: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-2 border border-stone-300 rounded-lg outline-none disabled:bg-stone-100 disabled:cursor-not-allowed"
                      placeholder="Thumbnail URL or upload image"
                      disabled={topVideoLoading}
                    />
                    <label className="bg-white border border-stone-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors flex items-center gap-2 disabled:opacity-50">
                      <ImageIcon size={18} />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange(
                            e,
                            setTopVideoForm,
                            topVideoForm,
                            "thumbnail",
                          )
                        }
                        disabled={topVideoLoading}
                      />
                    </label>
                  </div>
                  {topVideoForm.thumbnail && (
                    <img
                      src={topVideoForm.thumbnail}
                      className="mt-2 h-16 rounded object-cover"
                      alt="preview"
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={resetTopVideoForm}
                  className="px-6 py-2 text-stone-500 hover:text-stone-700 font-medium disabled:opacity-50"
                  disabled={topVideoLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleTopVideoSave}
                  className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  disabled={topVideoLoading}
                >
                  {topVideoLoading ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Video
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {topVideosSection?.images?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topVideosSection.images.map((video, videoIndex) => (
                <div
                  key={video._id}
                  className="relative group bg-white border border-stone-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden mb-3 relative">
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        className="w-full h-full object-cover"
                        alt={video.title}
                      />
                    ) : (
                      <video
                        src={video.src}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Play className="text-white fill-current w-8 h-8 opacity-70" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingTopVideo(video);
                          setIsAddingTopVideo(false);
                          setTopVideoForm({
                            title: video.title || "",
                            src: video.src,
                            thumbnail: video.thumbnail || "",
                            type: "video",
                          });
                        }}
                        className="p-2 bg-white rounded-full text-stone-900 hover:bg-red-50 hover:text-red-700"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Delete this video?"))
                            deleteVipImage(topVideosSection._id, video._id);
                        }}
                        className="p-2 bg-white rounded-full text-stone-900 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <h5 className="font-bold text-sm text-stone-900 truncate">
                        {video.title || `Video ${videoIndex + 1}`}
                      </h5>
                    </div>
                    <div className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-lg border border-stone-200">
                      <input
                        type="number"
                        defaultValue={videoIndex + 1}
                        onBlur={(e) => {
                          const targetIdx = parseInt(e.target.value, 10) - 1;
                          if (
                            targetIdx !== videoIndex &&
                            targetIdx >= 0 &&
                            targetIdx < topVideosSection.images.length
                          ) {
                            reorderVipImage(
                              topVideosSection._id,
                              videoIndex,
                              targetIdx,
                            );
                          }
                        }}
                        className="w-8 text-xs text-center bg-transparent border-none outline-none focus:ring-0 font-bold"
                      />
                      <div className="flex flex-col border-l border-stone-200 pl-1">
                        <button
                          disabled={videoIndex === 0}
                          onClick={() =>
                            moveVipImage(topVideosSection._id, videoIndex, -1)
                          }
                          className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20"
                        >
                          <MoveUp size={10} />
                        </button>
                        <button
                          disabled={
                            videoIndex === topVideosSection.images.length - 1
                          }
                          onClick={() =>
                            moveVipImage(topVideosSection._id, videoIndex, 1)
                          }
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
              <p>No top videos uploaded yet.</p>
            </div>
          )}
        </div>
      </div>

      {isAddingSection && (
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xl flex gap-4 items-end animate-in zoom-in-95 duration-200">
          <div className="flex-1">
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="e.g. Presidents, Prime Ministers..."
            />
          </div>
          <button
            onClick={handleAddSection}
            className="bg-stone-900 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors"
          >
            Add
          </button>
          <button
            onClick={() => setIsAddingSection(false)}
            className="px-4 py-2 text-stone-500"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="space-y-6">
        {visibleSections.map((section, sectionIndex) => {
          const actualSectionIndex = vipsData.findIndex(
            (item) => item._id === section._id,
          );

          return (
            <div
              key={section._id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="bg-stone-50 p-4 border-b border-stone-200 flex items-center gap-4">
                <div className="flex flex-col">
                  <button
                    disabled={actualSectionIndex <= 0}
                    onClick={() => moveVipSection(actualSectionIndex, -1)}
                    className="p-1 hover:bg-stone-200 rounded disabled:opacity-20 transition-colors"
                  >
                    <MoveUp size={16} />
                  </button>
                  <button
                    disabled={
                      actualSectionIndex === -1 ||
                      actualSectionIndex >= vipsData.length - 1
                    }
                    onClick={() => moveVipSection(actualSectionIndex, 1)}
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
                    <button
                      onClick={() => handleSaveSectionTitle(section._id)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Save size={18} />
                    </button>
                    <button
                      onClick={() => setEditingSectionId(null)}
                      className="p-1 text-stone-400 hover:bg-stone-100 rounded"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center gap-2 group">
                    <h3 className="text-xl font-serif font-bold text-stone-800">
                      {section.title}
                    </h3>
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
                    onClick={() => setAddingImageTo(section._id)}
                    className="p-2 text-red-700 hover:bg-red-50 rounded-lg flex items-center gap-1 transition-all"
                  >
                    <Plus size={18} />
                    <span className="text-sm font-bold">Add Photo</span>
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Delete this section and all its photos?",
                        )
                      )
                        deleteVipSection(section._id);
                    }}
                    className="p-2 text-stone-400 hover:text-red-600 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => toggleSection(section._id)}
                    className="p-2 text-stone-400 hover:bg-stone-200 rounded-lg transition-all"
                  >
                    {expandedSections[section._id] ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>
              </div>

              {expandedSections[section._id] !== false && (
                <div className="p-6">
                  {imageSaveError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <AlertCircle
                        size={20}
                        className="text-red-600 shrink-0"
                      />
                      <p className="text-red-700 text-sm">{imageSaveError}</p>
                    </div>
                  )}

                  {(addingImageTo === section._id ||
                    (editingImage &&
                      editingImage.sectionId === section._id)) && (
                    <div className="mb-8 p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">
                            Photo Caption / Heading
                          </label>
                          <input
                            type="text"
                            value={imageForm.title}
                            onChange={(e) =>
                              setImageForm({
                                ...imageForm,
                                title: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg outline-none disabled:bg-stone-100 disabled:cursor-not-allowed"
                            placeholder="What is currently shown as title..."
                            disabled={imageSaveLoading}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">
                            Image/Video (Upload or Path){" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={
                                imageForm.src.startsWith("data:")
                                  ? "Local file selected ✓"
                                  : imageForm.src
                              }
                              onChange={(e) =>
                                setImageForm({
                                  ...imageForm,
                                  src: e.target.value,
                                })
                              }
                              className="flex-1 px-4 py-2 border border-stone-300 rounded-lg outline-none disabled:bg-stone-100 disabled:cursor-not-allowed"
                              placeholder="URL or upload file"
                              disabled={imageSaveLoading}
                            />
                            <label className="bg-white border border-stone-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors flex items-center gap-2 disabled:opacity-50">
                              <Upload size={18} />
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*,video/*"
                                onChange={(e) =>
                                  handleFileChange(
                                    e,
                                    setImageForm,
                                    imageForm,
                                    "src",
                                  )
                                }
                                disabled={imageSaveLoading}
                              />
                            </label>
                          </div>
                          {imageForm.type === "video" && (
                            <p className="text-[10px] text-red-700 mt-1 font-bold">
                              Video detected
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={resetImageForm}
                          className="px-6 py-2 text-stone-500 hover:text-stone-700 font-medium disabled:opacity-50"
                          disabled={imageSaveLoading}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleImageSave(section._id)}
                          className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          disabled={imageSaveLoading}
                        >
                          {imageSaveLoading ? (
                            <>
                              <Loader size={18} className="animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save size={18} />
                              Save Photo
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {section.images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.images.map((img, imgIndex) => (
                        <div
                          key={img._id}
                          className="relative group bg-white border border-stone-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden mb-3 relative">
                            {img.type === "video" ? (
                              <video
                                src={img.src}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img
                                src={img.src}
                                alt={img.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                            {img.type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <Play className="text-white fill-current w-8 h-8 opacity-70" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  setEditingImage({
                                    ...img,
                                    sectionId: section._id,
                                  });
                                  setImageForm({
                                    title: img.title,
                                    src: img.src,
                                    type: img.type || "image",
                                  });
                                }}
                                className="p-2 bg-white rounded-full text-stone-900 hover:bg-red-50 hover:text-red-700"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm("Delete this photo?"))
                                    deleteVipImage(section._id, img._id);
                                }}
                                className="p-2 bg-white rounded-full text-stone-900 hover:bg-red-50 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <h5 className="font-bold text-sm text-stone-900 truncate">
                                {img.title}
                              </h5>
                            </div>
                            <div className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-lg border border-stone-200">
                              <input
                                type="number"
                                defaultValue={imgIndex + 1}
                                onBlur={(e) => {
                                  const targetIdx =
                                    parseInt(e.target.value, 10) - 1;
                                  if (
                                    targetIdx !== imgIndex &&
                                    targetIdx >= 0 &&
                                    targetIdx < section.images.length
                                  ) {
                                    reorderVipImage(
                                      section._id,
                                      imgIndex,
                                      targetIdx,
                                    );
                                  }
                                }}
                                className="w-8 text-xs text-center bg-transparent border-none outline-none focus:ring-0 font-bold"
                              />
                              <div className="flex flex-col border-l border-stone-200 pl-1">
                                <button
                                  disabled={imgIndex === 0}
                                  onClick={() =>
                                    moveVipImage(section._id, imgIndex, -1)
                                  }
                                  className="p-0.5 hover:bg-stone-200 rounded disabled:opacity-20"
                                >
                                  <MoveUp size={10} />
                                </button>
                                <button
                                  disabled={
                                    imgIndex === section.images.length - 1
                                  }
                                  onClick={() =>
                                    moveVipImage(section._id, imgIndex, 1)
                                  }
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
          );
        })}
      </div>
    </div>
  );
};

export default ManageVips;
