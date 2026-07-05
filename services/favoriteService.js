import { db } from '../config/firebaseConfig';
import { doc, setDoc, deleteDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { getAllPhotos } from './cloudinaryPhotoService';

// Add photo to favorites
export const addToFavorites = async (userId, photoOrId) => {
  try {
    const photoId = typeof photoOrId === 'string' ? photoOrId : photoOrId?.id;
    if (!photoId) throw new Error('photoId không hợp lệ');
    const favoriteRef = doc(db, 'users', userId, 'favorites', photoId);
    const photoSnapshot = typeof photoOrId === 'string' ? null : {
      ...photoOrId,
      cloudinaryUrl: photoOrId.cloudinaryUrl || photoOrId.uri || photoOrId.localUri || null,
      uri: photoOrId.uri || photoOrId.cloudinaryUrl || photoOrId.localUri || null,
      caption: photoOrId.caption || photoOrId.note || '',
      createdAt: photoOrId.createdAt || photoOrId.timestamp || new Date().toISOString(),
    };
    await setDoc(favoriteRef, {
      photoId,
      photo: photoSnapshot,
      addedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

// Remove photo from favorites
export const removeFromFavorites = async (userId, photoId) => {
  try {
    const favoriteRef = doc(db, 'users', userId, 'favorites', photoId);
    await deleteDoc(favoriteRef);
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

// Check if photo is favorited
export const isFavorited = async (userId, photoId) => {
  try {
    const favoriteRef = doc(db, 'users', userId, 'favorites', photoId);
    const docSnap = await getDoc(favoriteRef);
    return docSnap.exists();
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

// Get all favorite photos
export const getFavoritePhotos = async (userId) => {
  try {
    console.log('getFavoritePhotos - userId:', userId);
    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const snapshot = await getDocs(favoritesRef);
    
    console.log('Favorites snapshot size:', snapshot.size);
    const favoriteDocs = snapshot.docs.map(doc => {
      console.log('Favorite doc:', doc.id, doc.data());
      return { id: doc.id, ...doc.data() };
    });
    const favoriteIds = favoriteDocs.map(fav => fav.photoId || fav.id);
    
    console.log('Favorite IDs:', favoriteIds);
    
    if (favoriteIds.length === 0) {
      console.log('No favorites found');
      return [];
    }
    
    // Get actual photo data from user's Firebase album and local storage
    const albumRef = doc(db, 'userAlbums', userId);
    const [albumSnap, localPhotos] = await Promise.all([
      getDoc(albumRef),
      getAllPhotos(userId)
    ]);

    console.log('Album exists:', albumSnap.exists());

    const remotePhotos = albumSnap.exists() ? (albumSnap.data().photos || []) : [];
    const normalizedLocal = (localPhotos || []).map(photo => ({
      ...photo,
      cloudinaryUrl: photo.cloudinaryUrl || photo.uri || photo.localUri,
      uri: photo.uri || photo.cloudinaryUrl || photo.localUri,
      caption: photo.caption || photo.note || '',
      tags: photo.tags || photo.labels || [],
      aiAnalysis: photo.aiAnalysis || {
        labels: photo.labels || [],
        categoryPrimary: photo.categoryPrimary,
        categorySecondary: photo.categorySecondary,
      },
      createdAt: photo.createdAt || photo.timestamp,
      _localOnly: true,
    }));
    const snapshotPhotos = favoriteDocs
      .map(fav => fav.photo)
      .filter(Boolean)
      .map(photo => ({
        ...photo,
        cloudinaryUrl: photo.cloudinaryUrl || photo.uri || photo.localUri,
        uri: photo.uri || photo.cloudinaryUrl || photo.localUri,
        caption: photo.caption || photo.note || '',
        createdAt: photo.createdAt || photo.timestamp || new Date().toISOString(),
      }));
    const allPhotos = [...remotePhotos, ...normalizedLocal, ...snapshotPhotos];
    console.log('Total photos in album:', allPhotos.length);
    
    const favoritePhotos = allPhotos.filter(photo => {
      const isFav = favoriteIds.includes(photo.id);
      if (isFav) {
        console.log('Found favorite photo:', photo.id);
      }
      return isFav;
    });
    
    console.log('Favorite photos found:', favoritePhotos.length);
    return favoritePhotos;
  } catch (error) {
    console.error('Error getting favorite photos:', error);
    return [];
  }
};
