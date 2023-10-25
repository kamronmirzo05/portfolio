import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { DetailsData } from "../interfaces/data";
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import PrimarySearchAppBar from "./Navbar";
import axios from 'axios';
import { Button } from '@mui/material';
import baseUrl from './baseUrl';
import { options } from '../option';


const Details: React.FC = () => {


    const navigate = useNavigate();

    const { state } = useLocation();

    const [youtubeUrl, setYoutubeUrl] = useState<string>('')

    const [youTubeVideo, setYouTubeVideo] = useState<boolean>(false)

    const [details, setDetails] = useState<DetailsData>({ backdrop_path: '' })

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${state.type}/${state.id}/videos?api_key=a753e8aaf7d0723716f884e11dcd42e0`)
            .then(res => {
                if (res.data) {
                    if (res.data?.results[1]) {
                        setYoutubeUrl(res.data.results[1].key)
                    } else {
                        setYoutubeUrl(res.data.results[0].key)
                    }
                    setYouTubeVideo(true)
                }
            })
            .catch(err => console.log(err))

        axios.get(`https://api.themoviedb.org/3/${state.type}/${state.id}?language=en-US`, options)
            .then(res => setDetails(res.data))
            .catch(err => console.log(err))

    }, [])



    const [videoSearching, setVideoSearching] = useState<boolean>(true)

    setTimeout(() => {
        if (!youTubeVideo) {
            setVideoSearching(false)
        }
    }, 10000)

    window.scrollTo(0, 0)


    return (
        <div className='py-5'>
            <PrimarySearchAppBar />
            <Button variant='outlined' sx={{ marginLeft: 5 }} color='error' onClick={() => navigate(-1)}>Back</Button>
            <div className={`w-full md:w-[40%] mx-auto  text-gray-600 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg ${videoSearching && 'md:h-[600px]'} ${youTubeVideo && 'hidden'}`}>
                <h1>{videoSearching ? 'Please wait...' : 'Sorry video not found!'}</h1>
            </div>
            <iframe src={details.homepage ? details.homepage : `https://www.youtube.com/embed/${youtubeUrl}`}
                frameBorder='0'
                className={`w-full md:w-[90%] mx-auto rounded-lg md:h-[600px] ${!youtubeUrl && 'hidden'}`}
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
            />

            <div className='grid md:grid-cols-[1fr_1fr] border-b-2 pb-2 gap-4 text-black dark:text-white my-4 font-serif text-xs md:text-2xl px-5 '>
                <div>
                    <span className='text-sm md:text-xl text-red-600 border px-2 border-dashed border-red-600 animate-pulse'>(perhaps: ) This content is 18+</span>
                    <img src={baseUrl(details.backdrop_path)} className='w-[60%] mx-auto h-auto z-[-1]' style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} alt="" />
                    <div className='flex gap-3 border-t-2 my-4 pt-5'>
                        <h3>Production Companies : </h3>
                        <div>
                            {details.production_companies?.map(comp => <p className='border-b-2 border-dotted p-1'>{comp.name}</p>)}
                        </div>
                    </div>
                    <div className='flex gap-3 border-t-2 my-4 pt-5'>
                        <h3>Genres : </h3>
                        <div>
                            {details.genres?.map(comp => <span className='border px-3 p-1'>{comp.name}</span>)}
                        </div>
                    </div>

                    <p>{details.tagline}</p>
                </div>
                <div  >
                    <h2 className='border border-dotted bor p-2'>Status : {details.status}</h2>
                    <p>Title: <span className='text-sm md:text-2xl text-blue-600  font-mono '>{details.title}</span></p>
                    <p>Orginal lang: <span className="text-sm md:text-xl text-red-600 border px-2 border-dashed border-red-600">{details.original_language}</span></p>
                    <hr className="my-4" />
                    <p className='overflow-hidden transition'>{details.overview}</p>
                    <hr className="my-4" />
                    <p>Popularity: <span className="text-sm md:text-xl text-red-600 border px-2 font-mono border-dashed border-red-600">{details.popularity}</span></p>
                    <p>Release Date: <span className="text-sm md:text-xl text-blue-600 font-mono border px-2 border-dashed border-blue-600">{details.release_date}</span></p>
                    <p><GradeOutlinedIcon className='text-yellow-400' />: {details.vote_average}</p>
                    <p><FavoriteOutlinedIcon className='text-red-600' />: {details.vote_count}</p>


                    <p>{details.title}</p>
                </div>

            </div>
            <iframe src={`https://www.youtube.com/embed/${youtubeUrl}`}
                frameBorder='0'
                className={`w-full md:w-[60%] mx-auto rounded-lg md:h-[500px] ${!youTubeVideo || !details.homepage && 'hidden'}`}
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
            />
        </div >
    )
}

export default Details