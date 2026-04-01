const VipSection = require("../models/VipSection");
const { uploadToCloudinary } = require("../utils/cloudinary");

exports.getVipsData = async (req, res) => {
  try {
    const sections = await VipSection.find().sort({ order: 1 });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSection = async (req, res) => {
  try {
    const section = await VipSection.create(req.body);
    res.status(201).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const section = await VipSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    await VipSection.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Section deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSectionsOrder = async (req, res) => {
  try {
    const { sections } = req.body;
    const updatePromises = sections.map((sec) =>
      VipSection.findByIdAndUpdate(sec.id, { order: sec.order }),
    );
    await Promise.all(updatePromises);
    res.status(200).json({ message: "Sections order updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.saveImage = async (req, res) => {
  try {
    const section = await VipSection.findById(req.params.sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    let { id, title, src, thumbnail, order, type } = req.body;

    if (!src) {
      return res
        .status(400)
        .json({ message: "Image/video source is required" });
    }

    let imageUrl = src;
    if (src && src.startsWith("data:")) {
      const resType = src.includes("video") ? "video" : "image";
      imageUrl = await uploadToCloudinary(src, "vips", resType);
    }

    let thumbnailUrl = thumbnail || "";
    if (thumbnail && thumbnail.startsWith("data:")) {
      thumbnailUrl = await uploadToCloudinary(
        thumbnail,
        "vips/thumbnails",
        "image",
      );
    }

    if (id) {
      const imageIndex = section.images.findIndex(
        (img) => img._id.toString() === id || img.id === id,
      );
      if (imageIndex !== -1) {
        section.images[imageIndex] = {
          ...section.images[imageIndex].toObject(),
          title,
          src: imageUrl,
          thumbnail: thumbnailUrl,
          order: order !== undefined ? order : imageIndex,
          type,
        };
      }
    } else {
      section.images.push({
        title,
        src: imageUrl,
        thumbnail: thumbnailUrl,
        order: order !== undefined ? order : section.images.length,
        type,
      });
    }

    await section.save();
    res.status(200).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const section = await VipSection.findById(req.params.sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });
    section.images = section.images.filter(
      (img) => img._id.toString() !== req.params.imageId,
    );
    await section.save();
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
