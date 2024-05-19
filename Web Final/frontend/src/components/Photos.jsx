import React, {useState, useEffect} from 'react'
import './gallery.css'
import GalleryData from './GalleryData'
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { useAuth } from '../store/Auth';

function Photos() {

    const [galleryData, setGalleryData] = useState(GalleryData);

    const {user} = useAuth();


    const [pictures, setPictures] = useState(
        JSON.parse(localStorage.getItem("pictures")) || []
      );
      
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const newPicture = { src: event.target.result, file };
            setPictures([...pictures, newPicture]);
            localStorage.setItem(
              "pictures",
              JSON.stringify([...pictures, newPicture])
            );
          };
          reader.readAsDataURL(file);
        }

      };


   
    const toggleLike = (index) => {
        const updatedPictures = [...pictures];
        updatedPictures[index].liked = !updatedPictures[index].liked;
        setPictures(updatedPictures);
        
        localStorage.setItem("pictures", JSON.stringify(updatedPictures));
      };

     
    

    const toggleLikeGallery = (id) => {
        setGalleryData(prevData => {
            const updatedData = prevData.map(item => {
                if (item.id === id) {
                    return { ...item, liked: !item.liked };
                }
                return item;
            });
            localStorage.setItem("galleryData", JSON.stringify(updatedData));
            return updatedData;
        });
    };

    useEffect(() => {
        const storedGalleryData = localStorage.getItem("galleryData");
        if (storedGalleryData) {
            setGalleryData(JSON.parse(storedGalleryData));
        }
    }, []);

    const deletePhoto =  (index) => {
        const updatedPictures = [...pictures];
        updatedPictures.splice(index, 1);
        setPictures(updatedPictures);   
       
    };



  return (

    <>
         
            <div className='glry'>
                <h2><span className='username'>{user.username}</span>  Share your travel moments with Travella!</h2>

                <div className="input">
                <input type="file" accept="image/*" className="custom-file-input"  onChange={handleFileChange} />
                </div>

                <div className="glry-container">
                    
                    {pictures.map((picture, index) => (
                        <div className="glry-card" key={`uploaded-${index}`}>
                            <div className="img-like">
                            <img src={picture.src} alt={`Uploaded ${index + 1}`} />
                            <button className='like' onClick={() => toggleLike(index)}>
                                {picture.liked ? <BiSolidDislike className='liked'/> : <AiFillLike className='unliked'/>}
                            </button>
                            <button className="delete" onClick={() => deletePhoto(index)}>
                            Delete
                            </button>  
                            
                        </div>
                        </div>
                    ))}

                        {galleryData.map((item) => (
                                <div className="glry-card" key={item.id}>

                                    <div className="img-like">

                                    <img src={item.image} alt={`Gallery ${item.id}`} />
                                    <button className='like' onClick={() => toggleLikeGallery(item.id)}>
                                        {item.liked ? <BiSolidDislike className='liked'/> : <AiFillLike className='unliked'/>}
                                    </button>

                                    </div>

                                </div>
                            ))}
                </div>
                </div>


    </>
  )
}


export default Photos













