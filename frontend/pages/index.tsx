import {useEffect,useState} from "react"
import axios from "axios"

import Header from "../components/Header"
import Hero from "../components/HeroCarousel"
import MovieReel from "../components/MovieReel"
import SoundSection from "../components/SoundSection"
import PictureCarousel from "../components/PictureCarousel"
import EventFlyers from "../components/EventFlyers"
import Bio from "../components/BioPanel"
import EventCalendar from "../components/EventCalendar"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://ososdiscoscom-production.up.railway.app"

export default function Home(){

 const [layout,setLayout]=useState([])

 useEffect(()=>{

  axios.get(`${API_URL}/api/layout/home`)
  .then(res=>{
   setLayout(res.data.sections)
  })

 },[])

 const renderSection=(type)=>{

  switch(type){
   case "movies":
    return <MovieReel/>

   case "hero":
   case "pictures":
    return <PictureCarousel/>
   case "events":
    return <EventFlyers/>
    return <Hero/>

   case "sound":
    return <SoundSection/>

   case "bio":
    return <Bio/>

   case "calendar":
    return <EventCalendar/>

   default:
    return null

  }

 }

 return(

 <div>

 <Header/>

 {layout.map(section=>(
  <div key={section.type}>
   {renderSection(section.type)}
  </div>
 ))}

 </div>

 )

}
