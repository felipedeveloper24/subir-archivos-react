import { Grid } from "@mui/material";
import React from "react";
import Header from "../components/header/header";
import ShowArchivos from "../components/showArchivos/showArchivos";


const Home = ()=>{
    return (
        <Grid sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <Header/>
            <ShowArchivos/>
        </Grid>
    );
};

export default Home;