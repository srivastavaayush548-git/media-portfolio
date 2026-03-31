import React from "react";
import { useData } from "../Context/DataContext";
import ImageGroupGallery from "../Components/ImageGroupGallery";
import WhatOthersSay from "../Components/WhatOthersSay";
import EminentPersonalities from "../Components/EminentPersonalities";
import MiscellaneousVideos from "../Components/MiscellaneousVideos";
import { Play } from "lucide-react";
import { whatOthersSayVideos } from "../Data/whatOthersSay";

const VIPs = () => {
  const { vipsData } = useData();
  const getSectionKey = (value = "") =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const normalizedData = (vipsData || []).map((group) => ({
    ...group,
    id: group.id || group._id,
    sectionKey: getSectionKey(group.id || group.title || ""),
    thumbnail:
      group.thumbnail || group.images?.[0]?.src || group.images?.[0]?.url || "",
    images: (group.images || []).map((image) => ({
      ...image,
      id: image.id || image._id,
      src: image.src || image.url || "",
      alt: image.alt || image.title || group.title,
    })),
  }));
  const isCelebritySection = (group) => {
    const sectionText =
      `${group?.sectionKey || ""} ${group?.title || ""} ${group?.id || ""}`.toLowerCase();
    return (
      sectionText.includes("celebrity") ||
      sectionText.includes("celebrities") ||
      sectionText.includes("eminent-personalit")
    );
  };

  const topVideosGroup = normalizedData.find(
    (group) =>
      [
        "top-videos",
        "vip-videos",
        "top-video",
        "videos",
        "top-videos-hidden",
      ].includes(group.sectionKey) || group.title === "__TOP_VIDEOS__",
  );
  const eminentDataGroup = normalizedData.find(
    (group) => group.id === "eminent-personalities",
  );
  const eminentImages = eminentDataGroup ? eminentDataGroup.images : [];
  const galleryGroups = normalizedData.filter(
    (group) => group.id !== "eminent-personalities",
  );
  const filteredGalleryGroups = galleryGroups.filter(
    (group) => group._id !== topVideosGroup?._id && !isCelebritySection(group),
  );
  const topGalleryItems = galleryGroups
    .filter((group) => group.thumbnail)
    .slice(0, 4)
    .map((group) => ({
      src: group.thumbnail,
      name: group.title,
    }));
  const topVideoItems = (topVideosGroup?.images || [])
    .filter((item) => item.type === "video")
    .map((item) => ({
      src: item.src,
      thumbnail: item.thumbnail || "",
      name: item.title || item.alt || topVideosGroup.title,
    }))
    .slice(0, 4);
  const celebrityItems = normalizedData
    .filter(isCelebritySection)
    .flatMap((group) =>
      (group.images || [])
        .filter((item) => item?.src)
        .map((item) => ({
          src: item.src,
          thumbnail: item.thumbnail || "",
          title: item.title || item.alt || group.title,
          type: item.type || "image",
        })),
    );

  const miscellaneousItems = [];

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-100 pt-24 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-orange-200 via-yellow-100 to-orange-50" />
        <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
      </div>

      <div className="bg-white border-b border-stone-200 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight mb-6">
              Gallery
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-red-700 pl-6">
              Moments captured with eminent personalities, reflecting a journey
              of dialogue and engagement at the highest levels.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {topGalleryItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden shadow-md bg-white p-2 flex flex-col"
            >
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-44 md:h-60 object-cover rounded-lg mb-3"
              />
              <p className="text-sm font-medium text-stone-800 text-center px-1 pb-1">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {topVideoItems.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {topVideoItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden shadow-md bg-white p-2 flex flex-col"
              >
                <div className="relative">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-44 md:h-60 object-cover rounded-lg mb-3"
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="w-full h-44 md:h-60 object-cover rounded-lg mb-3"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-3">
                    <Play className="text-white fill-current w-10 h-10 opacity-80 drop-shadow-lg" />
                  </div>
                </div>
                <p className="text-sm font-medium text-stone-800 text-center px-1 pb-1">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <section className="py-20 max-w-7xl mx-auto px-6 relative z-10">
        <ImageGroupGallery
          groups={filteredGalleryGroups}
          customGridCols="grid-cols-1 md:grid-cols-2"
        />
      </section>
      {celebrityItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 mt-8 md:mt-12 border-t border-stone-300/70 relative z-10">
          <div className="mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3">
              Celebrities
            </h2>
            <p className="text-stone-600 max-w-3xl">
              Moments and interactions from the celebrity collection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {celebrityItems.map((item, idx) => (
              <div
                key={`${item.src}-${idx}`}
                className="rounded-xl overflow-hidden shadow-md bg-white p-2 flex flex-col"
              >
                <div className="relative">
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      className="w-full h-44 md:h-60 object-cover rounded-lg mb-3"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-44 md:h-60 object-cover rounded-lg mb-3"
                    />
                  )}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-3">
                      <Play className="text-white fill-current w-10 h-10 opacity-80 drop-shadow-lg" />
                    </div>
                  )}
                </div>

                <p className="text-sm font-medium text-stone-800 text-center px-1 pb-1">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      <EminentPersonalities images={eminentImages} />

      <WhatOthersSay videos={whatOthersSayVideos} />

      <MiscellaneousVideos items={miscellaneousItems} />
    </div>
  );
};

export default VIPs;
