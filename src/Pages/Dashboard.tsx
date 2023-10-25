import { Button } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import PrimarySearchAppBar from "../components/Navbar"
import Swipper from "../components/Swipper"
import { Data } from "../interfaces/data"
import { options } from '../option'
const Dashboard: React.FC = () => {

    const navigate = useNavigate();

    const [movies, setMovies] = useState<Data[]>([])
    const [tv, setTv] = useState<Data[]>([])

    useEffect(() => {
        (async () => {
            const res = await axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=truejnl&language=en-US&page=1&sort_by=popularity.desc', options)
            const data = await res.data.results
            setMovies(data)

            const resTv = await axios.get('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options)
            const dataTv = await resTv.data.results;
            setTv(dataTv)
        })()
    })


    



    return (
        <div className='overflow-hidden'>

            <PrimarySearchAppBar />
            <div className='relative animationTextDiv md:w-[40%] mx-auto au '>
                <h1 className='dark:drop-shadow-[0_0_20px_yellow] text-3xl md:text-9xl  text-center md:text-start text-yellow-400 font-serif'>MOVIE</h1>
                <h1 className='dark:drop-shadow-[0_0_20px_blue] text-3xl  md:text-9xl  text-center md:text-end  text-blue-600 font-serif'>TIME</h1>
            </div>


            <div className='flex items-center justify-around my-5 '>
                <h2 className='md:text-4xl dark:text-white text-center'>MOVIES</h2>
                <Button sx={{ fontSize: { xs: '10px', md: '24px' } }} variant='outlined' color='error' onClick={() => navigate('/movies')}>
                    movies page
                </Button>
            </div>

            <Swipper movies={movies} page='movies' />

            <div className='flex justify-around mt-10 mb-5'>
                <h2 className='md:text-4xl dark:text-white text-center'>TV Series</h2>
                <Button sx={{ fontSize: { xs: '10px', md: '24px' } }} variant='outlined' color='error' onClick={() => navigate('/tv')}>
                    tv page
                </Button>
            </div>
            <Swipper movies={tv} page='tv' />
            <Footer />

        </div>
    )
}

export default Dashboard