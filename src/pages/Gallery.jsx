import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Heart, Download, Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const initialPhotos = [
  {
    id: 'initial-1',
    src: 'https://horizons-cdn.hostinger.com/091764ce-381d-4e02-9a8c-8ace184e9aaa/c77017f029ce50b5d17551e85b387aa5.jpg',
    name: 'Our Engagement Photo 1',
    uploadDate: new Date().toISOString(),
    likes: 15,
  },
  {
    id: 'initial-2',
    src: 'https://images.unsplash.com/photo-1593183334148-74626834c549?q=80&w=1974&auto=format&fit=crop',
    name: 'Our Engagement Photo 2',
    uploadDate: new Date().toISOString(),
    likes: 10,
  },
];

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Load photos from localStorage on component mount
  useEffect(() => {
    const savedPhotos = localStorage.getItem('engagementPhotos');
    if (savedPhotos) {
      const parsedPhotos = JSON.parse(savedPhotos);
      // Simple check to see if initial photos are already there
      const hasInitialPhotos = parsedPhotos.some(p => p.id.startsWith('initial-'));
      if (hasInitialPhotos) {
        setPhotos(parsedPhotos);
      } else {
        setPhotos([...initialPhotos, ...parsedPhotos]);
      }
    } else {
      setPhotos(initialPhotos);
    }
  }, []);

  // Save photos to localStorage whenever photos change
  useEffect(() => {
    localStorage.setItem('engagementPhotos', JSON.stringify(photos));
  }, [photos]);

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            src: e.target.result,
            name: file.name,
            uploadDate: new Date().toISOString(),
            likes: 0
          };
          setPhotos(prev => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      }
    });

    toast({
      title: "Photos uploaded! 📸",
      description: `Successfully added ${fileArray.length} photo(s) to your gallery.`,
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files);
    }
  };

  const deletePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    setSelectedPhoto(null);
    toast({
      title: "Photo deleted",
      description: "The photo has been removed from your gallery.",
    });
  };

  const likePhoto = (photoId) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, likes: photo.likes + 1 }
        : photo
    ));
  };

  const downloadPhoto = (photo) => {
    const link = document.createElement('a');
    link.href = photo.src;
    link.download = photo.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pt-16">
      <Helmet>
        <title>Gallery - Our Love Story</title>
        <meta name="description" content="Browse through our beautiful collection of engagement and wedding photos. Upload and share your favorite memories with us." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-6xl text-gray-800 font-bold mb-4">
            Our Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Capture and share the beautiful moments of our journey together. 
            Upload your favorite photos and help us build our love story album.
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div
            className={`glass-effect rounded-2xl p-8 border-2 border-dashed transition-all duration-300 ${
              dragActive 
                ? 'border-pink-500 bg-pink-50' 
                : 'border-pink-300 hover:border-pink-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <Upload className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Upload Your Photos
              </h3>
              <p className="text-gray-600 mb-6">
                Drag and drop your photos here, or click to select files
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full">
                  Choose Photos
                </Button>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Photos Grid */}
        {photos.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative glass-effect rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.src}
                  alt={photo.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        likePhoto(photo.id);
                      }}
                    >
                      <Heart className="h-4 w-4 text-pink-500" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadPhoto(photo);
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePhoto(photo.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Likes counter */}
                {photo.likes > 0 && (
                  <div className="absolute bottom-2 left-2 bg-pink-500 text-white px-2 py-1 rounded-full text-sm flex items-center space-x-1">
                    <Heart className="h-3 w-3 fill-current" />
                    <span>{photo.likes}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">📸</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              No photos yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Start building your gallery by uploading your first photo. 
              Share the beautiful moments of your love story!
            </p>
          </motion.div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.name}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Close button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Photo info */}
              <div className="absolute bottom-4 left-4 right-4 glass-effect rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">{selectedPhoto.name}</h3>
                <div className="flex items-center justify-between text-white/80 text-sm">
                  <span>
                    Uploaded: {new Date(selectedPhoto.uploadDate).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 fill-current text-pink-400" />
                      <span>{selectedPhoto.likes}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => downloadPhoto(selectedPhoto)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;