import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [artRes, famRes] = await Promise.all([
        api.get('/articles'),
        api.get('/family')
      ]);
      setArticles(artRes.data);
      setFamilyData(famRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Article CRUD
  const addArticleSection = async (title) => {
    try {
      const res = await api.post('/articles/sections', { title, order: articles.length });
      setArticles([...articles, res.data]);
    } catch (error) {
      console.error('Error adding article section:', error);
    }
  };

  const updateArticleSection = async (sectionId, title) => {
    try {
      const res = await api.put(`/articles/sections/${sectionId}`, { title });
      setArticles(articles.map(sec => sec._id === sectionId ? res.data : sec));
    } catch (error) {
      console.error('Error updating article section:', error);
    }
  };

  const deleteArticleSection = async (sectionId) => {
    try {
      await api.delete(`/articles/sections/${sectionId}`);
      setArticles(articles.filter(sec => sec._id !== sectionId));
    } catch (error) {
      console.error('Error deleting article section:', error);
    }
  };

  const moveArticleSection = async (index, direction) => {
    const newArticles = [...articles];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newArticles.length) {
      [newArticles[index], newArticles[targetIndex]] = [newArticles[targetIndex], newArticles[index]];
      
      const updatedOrders = newArticles.map((sec, idx) => ({ id: sec._id, order: idx }));
      try {
        setArticles(newArticles);
        await api.put('/articles/sections/order', { sections: updatedOrders });
      } catch (error) {
        console.error('Error updating article section order:', error);
        fetchData();
      }
    }
  };

  const addArticleToSection = async (sectionId, article) => {
    try {
      const res = await api.post(`/articles/sections/${sectionId}/items`, article);
      setArticles(articles.map(sec => sec._id === sectionId ? res.data : sec));
    } catch (error) {
      console.error('Error adding article to section:', error);
    }
  };

  const updateArticleInSection = async (sectionId, articleId, updatedArticle) => {
    try {
      const res = await api.post(`/articles/sections/${sectionId}/items`, { ...updatedArticle, id: articleId });
      setArticles(articles.map(sec => sec._id === sectionId ? res.data : sec));
    } catch (error) {
      console.error('Error updating article in section:', error);
    }
  };

  const deleteArticleFromSection = async (sectionId, articleId) => {
    try {
      const res = await api.delete(`/articles/sections/${sectionId}/items/${articleId}`);
      setArticles(articles.map(sec => sec._id === sectionId ? res.data : sec));
    } catch (error) {
      console.error('Error deleting article from section:', error);
    }
  };

  const moveArticleInSection = async (sectionId, index, direction) => {
    const section = articles.find(sec => sec._id === sectionId);
    if (!section) return;

    const newItems = [...section.articles];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newItems.length) {
      [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
      
      try {
        const res = await api.put(`/articles/sections/${sectionId}`, { articles: newItems });
        setArticles(articles.map(sec => sec._id === sectionId ? res.data : sec));
      } catch (error) {
        console.error('Error moving article in section:', error);
      }
    }
  };

  const reorderArticleInSection = async (sectionId, oldIndex, newIndex) => {
    const section = articles.find(sec => sec._id === sectionId);
    if (!section) return;

    const newItems = [...section.articles];
    const [movedItem] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, movedItem);

    try {
      const res = await api.put(`/articles/sections/${sectionId}`, { articles: newItems });
      setArticles(articles.map(sec => sec._id === sectionId ? res.data : sec));
    } catch (error) {
      console.error('Error reordering article in section:', error);
    }
  };

  // Family CRUD
  const addFamilySection = async (title) => {
    try {
      const res = await api.post('/family/sections', { title, order: familyData.length });
      setFamilyData([...familyData, res.data]);
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };

  const updateFamilySection = async (sectionId, title) => {
    try {
      const res = await api.put(`/family/sections/${sectionId}`, { title });
      setFamilyData(familyData.map(sec => sec._id === sectionId ? res.data : sec));
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  const deleteFamilySection = async (sectionId) => {
    try {
      await api.delete(`/family/sections/${sectionId}`);
      setFamilyData(familyData.filter(sec => sec._id !== sectionId));
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const moveFamilySection = async (index, direction) => {
    const newFamily = [...familyData];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newFamily.length) {
      [newFamily[index], newFamily[targetIndex]] = [newFamily[targetIndex], newFamily[index]];
      
      const updatedOrders = newFamily.map((sec, idx) => ({ id: sec._id, order: idx }));
      try {
        setFamilyData(newFamily);
        await api.put('/family/sections/order', { sections: updatedOrders });
      } catch (error) {
        console.error('Error updating section order:', error);
        fetchData(); // Rollback
      }
    }
  };

  const addImageToFamily = async (sectionId, image) => {
    try {
      const res = await api.post(`/family/sections/${sectionId}/images`, image);
      setFamilyData(familyData.map(sec => sec._id === sectionId ? res.data : sec));
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  const updateFamilyImage = async (sectionId, imageId, updatedImage) => {
    try {
      // Backend handles update in the same POST endpoint if ID is provided in body
      const res = await api.post(`/family/sections/${sectionId}/images`, { ...updatedImage, id: imageId });
      setFamilyData(familyData.map(sec => sec._id === sectionId ? res.data : sec));
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const deleteFamilyImage = async (sectionId, imageId) => {
    try {
      const res = await api.delete(`/family/sections/${sectionId}/images/${imageId}`);
      setFamilyData(familyData.map(sec => sec._id === sectionId ? res.data : sec));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const moveFamilyImage = async (sectionId, index, direction) => {
    const section = familyData.find(sec => sec._id === sectionId);
    if (!section) return;

    const newImages = [...section.images];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newImages.length) {
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
      
      // We update the entire section's image array via the section update endpoint
      try {
        const res = await api.put(`/family/sections/${sectionId}`, { images: newImages });
        setFamilyData(familyData.map(sec => sec._id === sectionId ? res.data : sec));
      } catch (error) {
        console.error('Error moving image:', error);
      }
    }
  };

  const reorderFamilyImage = async (sectionId, oldIndex, newIndex) => {
    const section = familyData.find(sec => sec._id === sectionId);
    if (!section) return;

    const newImages = [...section.images];
    const [movedItem] = newImages.splice(oldIndex, 1);
    newImages.splice(newIndex, 0, movedItem);

    try {
      const res = await api.put(`/family/sections/${sectionId}`, { images: newImages });
      setFamilyData(familyData.map(sec => sec._id === sectionId ? res.data : sec));
    } catch (error) {
      console.error('Error reordering image:', error);
    }
  };

  return (
    <DataContext.Provider value={{
      articles, addArticleSection, updateArticleSection, deleteArticleSection, moveArticleSection,
      addArticleToSection, updateArticleInSection, deleteArticleFromSection, moveArticleInSection, reorderArticleInSection,
      familyData, addFamilySection, updateFamilySection, deleteFamilySection, moveFamilySection,
      addImageToFamily, updateFamilyImage, deleteFamilyImage, moveFamilyImage, reorderFamilyImage,
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext);
