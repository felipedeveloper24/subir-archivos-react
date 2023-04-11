import { Box, Button, Grid,Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = ()=>{
    
    return(
        <Grid container sx={{
            width:"100%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"#18181b"
        }}>
            <Box sx={{
                width:"40%",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <Typography
                    sx={{
                        color:"white",
                        fontFamily:"inherit",
                        padding:"10px",
                        fontSize:"25px",
                        textAlign:"center"
                    }}
                > 
                Administrador de archivos
                </Typography>   
            </Box>
          
            <Box sx={{width:"60%",display:"flex",justifyContent:"center",fontFamily:"serif"}}>
                <Link style={{color:"white",textDecoration:"none"}} to="/">Inicio</Link>
                <Link style={{color:"white",textDecoration:"none",marginLeft:"10px"}} to="/registrar" >Registro de archivos</Link>
            </Box>
          
        </Grid>
      
      
    
    )
};

export default Header;