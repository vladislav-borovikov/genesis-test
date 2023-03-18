import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getCourse } from "../API/api";
import Player from "../markup/player";
import Loader from "../markup/Loader";
import NotificationError from "../markup/NotificationError";
import { Button, Grid, Paper } from "@mui/material";
import NotificationInfo from "../markup/NotificationInfo";

function Сourse() {

  const [course, setCorse] = useState({})
  const { courseId } = useParams();
  const [playerData, setPlayerData] = useState({})
  const [loading, setLoading] = useState(false)
  
  const {title, description, lessons} = course




  const sortedLessons = lessons?.sort(function (a, b) {
    if (a.order > b.order) {
      return 1;
    }
    if (a.order < b.order) {
      return -1;
    }
    return 0;
  })
           


  useEffect(() => {
      setLoading(true)
    const requestСorse = async () => {
         try {
      const response = await getCourse(courseId)
           setCorse(response)
           setPlayerData(response.lessons[0])
      return response
    } catch (error) {
           NotificationError(error.message)
    } finally {
    setLoading(false)
    }
 
  }
      requestСorse()
    }, [courseId])
  
  
  function sendingВata(id, link, previewImageLink, order, title) {
  
    setPlayerData({ id, link, previewImageLink, order })
    NotificationInfo( `You are watching a video lesson ${title}`)
  }


    return <div>
      <NavLink to="/">Back Home</NavLink>
      {loading ? <Loader /> : <>
        <h1>{title}</h1>
        <p>{description}</p>
        <Player url={playerData.link} videoId={playerData.id} preview={`${playerData.previewImageLink}/lesson-${playerData.order}.webp`}></Player>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} component="ul">
          {sortedLessons?.map(({ title, id, link, previewImageLink, order, duration, status }) =>
            <Grid item xs={6} key={id} component="li">
            <Paper elevation={3}>
              <li key={id} >
              <h3>{title}</h3>
              <p>Duration: {new Date(duration * 1000).toISOString().substr(11, 8)}</p>
              {status === 'unlocked' ? <Button variant="outlined" onClick={() => sendingВata(id, link, previewImageLink, order, title)}>Overview</Button> :
                <Button variant="outlined" disabled>Video not available</Button>}
            </li>
            </Paper>
            </Grid>
          )}
        </Grid>
      </>
      }
      
  </div>;
}

export default Сourse;