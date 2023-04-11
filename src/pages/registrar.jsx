import React, { useState } from "react";

import {Box, Button, Card, Grid,TextField, Typography} from "@mui/material";
import Header from "../components/header/header";
import clienteAxios from "../helpers/clienteAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Registrar = ()=>{
    const [archivo,setArchivo] = useState(null);
    const navigate = useNavigate();   
    const [isPdf, setPdf] = useState(true) 
    const handleSubirArchivo = (e)=>{
        e.preventDefault();
        const formData = new FormData();

            formData.append("archivo",archivo);

            clienteAxios.post("/archivo/subir-archivo",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            }
            
            ).then(response =>{
                if(response.status==201){
                    Swal.fire({
                        title:"Registrado",
                        text:"El pdf ha sido registrado correctamente",
                        icon:"success",
                        confirmButtonText:"Aceptar"
                    })
                    setTimeout(()=>{
                        navigate("/");
                    },2000)
                }
            }).catch(error =>{
                console.log(error);
            });  
        
      
             

    };
    const handleArchivoSeleccionado = (e)=>{
        console.log(e.target.files[0].name.includes(".pdf"));
        if(e.target.files[0].name.includes(".pdf")){
            setArchivo(e.target.files[0]);
            setPdf(false);
        }else{
                setPdf(true);
                Swal.fire({
                    title:"Error",
                    text:"El tipo de archivo no es pdf",
                    icon:"error",
                    confirmButtonText:"Aceptar"
                })
                setTimeout(()=>{
                },2000)
        
        }
        console.log(isPdf);
       
    }

    return (
        <Grid sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <Header/>
            <Grid sx={{
                width:"70%",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                margin:"0px auto",
                marginTop:"20px"

            }}>
               
                <Card sx={{padding:"20px"}}>
                <Typography sx={{textAlign:"center"}}>Subir archivo</Typography>
                    <form style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} action="">
                        <Box sx={{marginBottom:"15px",marginTop:"15px"}}>
                            <TextField required type="file" onChange={handleArchivoSeleccionado} />
                        </Box>
                        <Box>
                            <Button disabled={isPdf} type="submit" variant="contained" onClick={handleSubirArchivo} >Enviar Información</Button>
                        </Box>
                        
                    </form>
                </Card>
            </Grid>
            

        </Grid>
    );
};

export default Registrar;