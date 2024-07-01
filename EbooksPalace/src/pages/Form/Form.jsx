import React, { useState, useRef } from 'react';
import './Form.css';
import validate from "./validate";
import NavBar from '../../components/Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Form = () => {
    const [input, setInput] = useState({
        name: "",
        editorial: "",
        category: "",
        author: "",
        price: "0.00",
        image: "https://",
        description: "",
        file: "https://"
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [URL_Image, setURL_Image] = useState("");
    const [URL_File, setURL_File] = useState("");
    const imageInputRef = useRef(null);
    const fileInputRef = useRef(null);

    const deleteImage = () => {
        setURL_Image("");
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    const deleteFile = () => {
        setURL_File("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const changeUploadImage = async (e) => {
        if (URL_Image) {
            alert("Primero elimine la imagen actual antes de subir una nueva.");
            return;
        }

        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ebookspalace_preset");

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dwxr0uihx/image/upload", data);
            setURL_Image(response.data.secure_url);
            setErrors((prevErrors) => {
                const { image, ...rest } = prevErrors;
                return rest;
            });
        } catch (error) {
            console.error("Error al subir la imagen", error);
        }
    };

    const changeUploadFile = async (e) => {
        if (URL_File) {
            alert("Primero elimine el archivo actual antes de subir uno nuevo.");
            return;
        }

        const file = e.target.files[0];
        const fileUrl = await uploadFileToCloudinary(file);
        setURL_File(fileUrl);

        setErrors((prevErrors) => {
            const { file, ...rest } = prevErrors;
            return rest;
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });

        setErrors(validate({
            ...input,
            [name]: value,
            image: URL_Image,
            file: URL_File,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate({ ...input, image: URL_Image, file: URL_File });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:3001/books", {
                    ...input,
                    image: URL_Image,

                };
                const response = await axios.post("https://ebookspalace.onrender.com/books", formData);

                    file: URL_File,
                });
                console.log(response)

                if (response.status === 200) {
                    console.log("Libro creado con éxito", response.data);
                    setSuccessMessage("El libro fue creado exitosamente");
                    navigate("/");
                }
            } catch (error) {
                console.error("Error al crear el libro", error);
                setErrors({ submit: "Hubo un error al crear el libro. Inténtalo de nuevo." });
            }
        }
    };

    const uploadFileToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ebookspalace_preset');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dwxr0uihx/upload', formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error al subir el archivo a Cloudinary', error);
            throw new Error('Error al subir el archivo a Cloudinary');
        }
    };

    return (
        <div>
            <div className="contenedor">
                <form onSubmit={handleSubmit} className="formulario">
                    <h2 className="title">Formulario de Libro</h2>
                    <label>Título:</label>
                    <div className="campo">
                        <input type="text" placeholder="Ej: Romeo y Julieta" name="name" value={input.name} onChange={handleChange} />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <label>Editorial:</label>
                    <div className="campo">
                        <input type="text" placeholder="Ej: San Andrés" name="editorial" value={input.editorial} onChange={handleChange} />
                        {errors.editorial && <p>{errors.editorial}</p>}
                    </div>
                    <label>Género:</label>
                    <div className="campo">
                        <select name="category" value={input.category} onChange={handleChange}>
                            <option value="">Seleccione un género literario</option>
                            <option value="Terror">Terror</option>
                            <option value="Comedy">Comedia</option>
                            <option value="Romance">Romance</option>
                            <option value="Education">Educativo</option>
                            <option value="Self-Help">Auto-ayuda</option>
                        </select>
                        {errors.category && <p>{errors.category}</p>}
                    </div>
                    <label>Autor:</label>
                    <div className="campo">
                        <input type="text" placeholder="Ej: William Shakespeare" name="author" value={input.author} onChange={handleChange} />
                        {errors.author && <p>{errors.author}</p>}
                    </div>
                    <label>Precio:</label>
                    <div className="campo">
                        <input type="number" name="price" value={input.price} onChange={handleChange} />
                        {errors.price && <p>{errors.price}</p>}
                    </div>
                    <label>Descripción:</label>
                    <div className="campo">
                        <textarea name="description" placeholder="Ej: En el último día de un helado junio..." value={input.description} onChange={handleChange}></textarea>
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    <label>Imagen:</label>
                    <div className="campo">
                        <input type="file" accept="image/*" name="image" onChange={changeUploadImage} disabled={!!URL_Image} ref={imageInputRef} />
                        {errors.image && <p>{errors.image}</p>}
                        {URL_Image && (
                            <div className='image-div'>
                                <img className="uploaded-image" src={URL_Image} alt="Uploaded" />
                                <button type="button" onClick={deleteImage}>Eliminar Imagen</button>
                            </div>
                        )}
                    </div>
                    <label>Archivo:</label>
                    <div className='campo'>
                        <input type="file" accept=".pdf,.doc,.docx" name="file" onChange={changeUploadFile} disabled={!!URL_File} ref={fileInputRef} />
                        {errors.file && <p>{errors.file}</p>}
                        {URL_File && (
                            <div className='file-div'>
                                <p className="uploaded-file-url">{URL_File}</p>
                                <button type="button" onClick={deleteFile}>Eliminar Archivo</button>
                            </div>
                        )}
                    </div>
                    <div className="boton">
                        <button type="submit">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;
