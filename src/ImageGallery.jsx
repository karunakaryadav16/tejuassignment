
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '44163759-cfe074c6ed83c6211ecf8011e',  
          q: 'nature',
          image_type: 'photo',
          page: page,
          per_page: 10,
        },
      });
      console.log('Fetched images:', response.data.hits);
      setImages((prevImages) => [...prevImages, ...response.data.hits]);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading]);

  return (
    <div>
      <h1>Image Gallery</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <img key={image.id} src={image.webformatURL} alt={image.tags} style={{ width: '200px', height: '200px', margin: '8px' }} />
        ))}
      </div>
      <div ref={ref} style={{ height: '20px', marginBottom: '20px' }} />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ImageGallery;
