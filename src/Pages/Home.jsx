import { Button, ButtonGroup} from "@mui/material";
import { useEffect, useState } from "react";
import { getCourses } from "../API/api";
import Loader from "../markup/Loader";
import MarkupCorses from "../markup/markupCorses";
import NotificationError from "../markup/NotificationError";




function Home() {
  const [courses, setCourses] = useState([])
  const [page, setPage] = useState(1)
  const [coursesPerPage, setCoursesPerPage] = useState([])
  const [nextPage, setNextPage] = useState(true)
  const [previousPage, setPreviousPage] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const numberOfCoursesPerPage = 10


  useEffect(()=>{const requestСourses = async () => {
     setLoading(true)
    try {
      const response = await getCourses()
      setCourses(response)
      setCoursesPerPage(response.slice(0, numberOfCoursesPerPage))
      
      return response
    } catch (error) {
      NotificationError(error.message)
    } finally {
    setLoading(false)
    }
 
  }
    requestСourses()}, [])

  
  useEffect(() => {
    const startPagination = numberOfCoursesPerPage * page - numberOfCoursesPerPage
    const endPagination = numberOfCoursesPerPage * page
    const newCoursesList = courses.slice(startPagination, endPagination)
    setCoursesPerPage(newCoursesList)
    if (page === 1) { setPreviousPage(false) }
    if (Math.ceil(courses?.length / numberOfCoursesPerPage) === page) {setNextPage(false)}
  }, [page, courses ])



  function incrementPage() {
    if (Math.ceil(courses?.length / numberOfCoursesPerPage) !== page) {
      setPage(page + 1)
      setPreviousPage(true)
    } 


  }
  function decrementPage() {
    if (page !== 1) {
      setNextPage(true)
      setPage(page - 1)
    } 
  }


    return <div>
      {loading ? <Loader /> :
        <>
          <h1>Improve Yourself</h1>
          <MarkupCorses objectСourse={coursesPerPage} />
          
            <ButtonGroup variant="text" aria-label="outlined button group" >
            {previousPage && <Button variant="outlined" type="button" onClick={() => decrementPage()}>назад</Button>}
            <p style={{"border" : "thick double #32a1ce" , 'width': '60px'}}>{page}</p>
            {nextPage && <Button variant="outlined" type="button" onClick={() => incrementPage()}>вперед</Button>}
            </ButtonGroup>
      </>
      }
  </div>;
}

export default Home;