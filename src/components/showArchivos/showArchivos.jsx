import React, { useEffect, useState } from "react";
import {Button, Grid,Typography} from "@mui/material"
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from "@mui/material/Table";
import Paper from '@mui/material/Paper';
import clienteAxios from "../../helpers/clienteAxios";
import FileSaver from "file-saver";
import { Delete, Download } from "@mui/icons-material";
import Swal from "sweetalert2";
const ShowArchivos = ()=>{
    const [archivos,setArchivos] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        getAllArchivos();
    },[]);

    const getAllArchivos = async()=>{
        const response = await clienteAxios.get("/archivo/getall");
        if(response.status==200){
            const pdfsData = response.data.data;
         
            const Urls = pdfsData.map((pdf,index)=>{;
                const pdfData = new Uint8Array(pdf.archivo.data);
                const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });

                return { blob: pdfBlob, name: `${pdf.nombre}`, id: pdf.id };
            })
         
            console.log(Urls);
            setArchivos(Urls);
            setLoading(false)
        }
        
    };

    const downloadPdf = (pdfBlob, pdfName) => {
        FileSaver.saveAs(pdfBlob, pdfName);
    };

    const deleteArchivo = async (id)=>{

        Swal.fire({
            title: '¿Estás seguro si quieres eliminar el archivo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText:"Cancelar"
        }).then(async(result) =>{
            if(result.isConfirmed){
                const response = await clienteAxios.delete(`/archivo/delete/${id}`);
                if(response.status==200){
                    Swal.fire({
                        title:"Eliminado",
                        text:"El trabajador ha sido eliminado correctamente",
                        icon:"success",
                        confirmButtonText:"Aceptar"
                    })
                    setTimeout(()=>{
                    },2000)
                    getAllArchivos();
                }
            }
        });

       
    };


    if(!loading){
        return(
            <Grid sx={{
                width:"75%",
                margin:"0px auto"
            }}>
               <Typography variant="h4" sx={{textAlign:"center",marginTop:"10px",marginBottom:"10px"}}>Listado de archivos  </Typography>
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell >Nombre</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            
                        {archivos.map((pdf, index) => (
                            <TableRow key={index}>
                                 <TableCell >{pdf.name}</TableCell>
                                 <TableCell >
                                    <Download sx={{cursor:"pointer"}} onClick={()=>downloadPdf(pdf.blob,pdf.name)}  >
                                    </Download>
                                    <Delete sx={{cursor:"pointer"}} onClick={()=>deleteArchivo(pdf.id)} />
                                 </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                  
    
            </Grid>
             
        )
    }else{
        return (
            <div>
                Cargando data ....
            </div>
        )
    }

    
};

export default ShowArchivos;