import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }  
})
const upload = multer({dest:"./uploads", storage})
//linux ou no mac 
//const upload = multer ({dest: "./uploads"})

const routes = (app) => {
    //Permite que o servidor interprete as requisições com o corpo
    app.use(express.json());
    app.use(cors(corsOptions))
    //Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost );
    app.post("/upload", upload.single("imagem"), uploadImagem)
    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;