import { Grid, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";

function MarkupCorses( {objectСourse}) {
  return <>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} component="ul">
        
        {objectСourse.map(element => <Grid item xs={6} key={element.id} component="li">
             <Paper elevation={3}><h2>{element.title}</h2>
                <img src={element.previewImageLink + '/cover.webp'} alt={element.title} width='400px' />
            <NavLink to={element.id}><p style={{ "fontSize" : "120%"}}>{element.title}</p></NavLink>
                <p style={{ "textDecoration" : "green wavy underline"}}>Number of lessons: {element.lessonsCount}</p>
                { element.meta.skills ?  <ul><p style={{ "textDecoration" : "green wavy underline"}}> Skils: </p> {element.meta.skills.map(it => <li key={ it} > { it} </li>)}</ul> : null}
            <p style={{ "textDecoration" : "red wavy underline"}}>Rating {element.rating}</p>
            </Paper>
             </Grid>
        )}</Grid>
    </>
      
        
       
  
}

export default MarkupCorses;