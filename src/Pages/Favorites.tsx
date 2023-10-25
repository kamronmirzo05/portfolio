import baseUrl from "../components/baseUrl";
import { useAppDispatch, useAppSelector } from "../store/store"
import PrimarySearchAppBar from '../components/Navbar'
import { Data } from "../interfaces/data";
import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { deleteMovie } from "../store/Slice";
import { useNavigate } from "react-router-dom";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'

const Favorites: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const movies = useAppSelector((state) => state.movies.favorites)

    return (
        <>
            <PrimarySearchAppBar />
            <div className="container">
                <span className="dark:text-white  textShadowText mx-5 md:text-2xl">Favorites</span>
                <div className='p-10 grid grid-cols-2 md:grid-cols-4  gap-5'>
                    {
                        movies?.map((movie: Data, i) => {
                            return <div key={i} className='grid grid-rows-[auto_1fr] border-b-2 pb-2 gap-4 dark:text-white my-4 font-serif text-xs md:text-2xl'>
                                <div className='content hover:shadow-[0_0_40px_black] dark:hover:shadow-[0_0_40px_blue] text-white hover:translate-y-[-10px] transition duration-300'>
                                    <div className="content-overlay"></div>
                                    <img src={baseUrl(movie.poster_path)} className='w-full rounded-lg md:h-[600px] ' alt="" />
                                    <div className='content-details fadeIn-right text-[6px] md:text-xl'>
                                        <span className='absolute translate-y-[-100px] md:translate-y-[-180px] left-5 text-sm text-red-600 border px-2 border-dashed border-red-600'>(perhaps: ) This content 18+</span>

                                        <p>Org lang : {movie.original_language}</p>
                                        <p>Pp: {movie.popularity}</p>
                                        <p>Release Date: {movie.release_date}</p>
                                        <p><GradeOutlinedIcon sx={{fontSize:{sm:'6px' , md:'20px'}}} color="warning" />: {movie.vote_average}</p>
                                        <p><FavoriteOutlinedIcon color="error" sx={{fontSize:{sm:'6px' , md:'20px'}}} />: {movie.vote_count}</p>
                                        <div className='text-center pt-5'>
                                            <Button onClick={() => navigate('/details', { state: { id: 1, movie: movie } })} variant="outlined" color='error'>MORE</Button>
                                        </div>
                                    </div>
                                </div>
                                <p>{movie.title}</p>

                                <Tooltip title='Delete from favorites' placement='bottom-start'>
                                    <IconButton onClick={() => dispatch(deleteMovie(movie.id))} className='inline text-[red_!important] w-10'>
                                        <DeleteForeverOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Favorites