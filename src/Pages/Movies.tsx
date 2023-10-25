import axios from 'axios'
import { options } from '../option'
import { useState, useEffect } from 'react'
import { Data } from '../interfaces/data'
import Button from '@mui/material/Button';
import baseUrl from '../components/baseUrl';
import Pagination from '@mui/material/Pagination';
import { ReactJSXElement } from '@emotion/react/dist/declarations/types/jsx-namespace';
import Skeletons from '../components/Skeletons';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PrimarySearchAppBar from '../components/Navbar';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addMovie, changePathPage, incProfileBadge, searchResult } from '../store/Slice';
import { useNavigate } from 'react-router-dom';
import { getLocalFavorites } from '../components/LocalStorage';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import Footer from '../components/Footer';

const Movies: React.FC = (): ReactJSXElement => {

    document.documentElement.scrollTo(0, 0);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const pathPage = useAppSelector(state => state.movies.page)
    const search = useAppSelector(state => state.movies.search)



    const [movies, setMovies] = useState<Data[]>([])
    const [page, setPage] = useState<number>(pathPage)
    const [loading, setLoading] = useState<boolean>(false)


    const [list, setList] = useState('');

    useEffect(() => {
        if (search?.length) {
            getData(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`)
        } else {
            if (Boolean(list)) {
                getData(`https://api.themoviedb.org/3/movie/${list}?language=en-US&page=${page}`)
            } else {
                getData(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=truejnl&language=en-US&page=${page}&sort_by=popularity.desc`)
            }
        }
    }, [page, list, search])

    const [pageCount, setPageCount] = useState<number>(1)

    const getData = async (url: string): Promise<void> => {
        setLoading(true)
        const res = await axios.get(url, options)
        const data = await res.data.results;
        setMovies(data)
        if (search?.length) {
            setPageCount(res.data.total_pages)
        } else {
            setPageCount(Math.ceil(res.data.total_pages / 80))
        }
        setLoading(false)
    }


    function changePage(_: React.ChangeEvent<unknown>, value: number): void {
        setPage(value)
        dispatch(changePathPage(value))
    }


    let addedMovieToFavorites = 0;
    function checkFavorite(add: boolean, movie: Data): boolean {
        const favorites: Data[] | [] = getLocalFavorites();
        const check: boolean = favorites.every(m => m.id !== movie.id)
        if (check) {
            if (add) {
                addedMovieToFavorites++
                dispatch(addMovie({ id: movie.id, movie: movie }))
                dispatch(incProfileBadge(addedMovieToFavorites))
            }
            return true
        } else {
            return false
        }
    }



    function Change(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        dispatch(searchResult(''))
        dispatch(changePathPage(1))
        setList(e.currentTarget.value)
    }

    interface list {
        value: string, text: string
    }

    const lists: list[] = [
        { value: '', text: 'All' },
        { value: 'now_playing', text: 'Now Playing' },
        { value: 'popular', text: 'Popular' },
        { value: 'top_rated', text: 'Top Rated' },
        { value: 'upcoming', text: 'Up Coming' },
    ];

    const [selectedList, setSelectedList] = useState<string>('')


    return (
        <>
            <PrimarySearchAppBar />
            <div className='container mx-auto my-11'>
                <h1 className='text-blue-400 font-serif dark:text-white  dark:drop-shadow-[0_0_20px_blue] text-center md:text-6xl'>MOVIE</h1>
                <div className='grid grid-cols-3 md:flex items-center justify-center md:gap-5'>
                    {
                        lists.map(p => {
                            return <Button className={`cursor-pointer  ${p.value == selectedList && 'bg-[red_!important] text-[white_!important]'}`} variant='outlined' sx={{fontSize:{xs:5,sm:15}}} value={p.value} onClick={(e) => {
                                Change(e)
                                setSelectedList(p.value)
                            }}>{p.text}</Button>
                        })
                    }
                </div>
                {loading && <Skeletons />}
                <div className='p-10 grid grid-cols-2 md:grid-cols-4  gap-5'>
                    {
                        !loading && movies.map((movie, i) => {
                            return <div key={i} className='grid grid-rows-[auto_1fr] border-b-2 pb-2 gap-4 dark:text-white my-4 font-serif text-xs md:text-2xl '>
                                <div className='content hover:shadow-[0_0_40px_black] dark:hover:shadow-[0_0_40px_blue] hover:translate-y-[-10px] transition duration-300'>
                                    <div className="content-overlay"></div>
                                    <img src={baseUrl(movie.poster_path)} className='w-full rounded-lg md:h-[600px] ' alt="" />
                                    <div className='content-details fadeIn-right text-white' >
                                        <span className='absolute translate-y-[-100px] md:translate-y-[-150px] left-5 text-sm text-red-600 border px-2 border-dashed border-red-600'>(perhaps: ) This content is 18+</span>
                                        <p>Org lang: {movie.original_language}</p>
                                        <p>Pp: {movie.popularity}</p>
                                        <p>Release Date: {movie.release_date}</p>
                                        <p><GradeOutlinedIcon className='text-yellow-400' />: {movie.vote_average}</p>
                                        <p><FavoriteOutlinedIcon className='text-red-600' />: {movie.vote_count}</p>
                                        <div className='text-center pt-5'>
                                            <Button onClick={() => navigate('/details', { state: { id: movie.id, type: 'movie' } })} variant="outlined" color='error'>MORE</Button>
                                        </div>
                                    </div>
                                </div>
                                <p>{movie.title.slice(0, 22)}</p>

                                {
                                    checkFavorite(false, movie) ?
                                        <Tooltip title='Add to favorites' placement='bottom-start'>
                                            <IconButton onClick={() => checkFavorite(true, movie)} color='error' className='inline w-10'>
                                                <FavoriteOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <IconButton disabled className='inline disabled:text-[gray_!important]  w-10'>
                                            <FavoriteOutlinedIcon />
                                        </IconButton>
                                }
                            </div>
                        })
                    }
                </div>
                <div className='relative'>
                    <Pagination className=' md:absolute left-[35%] rounded-lg bg-white text-center' count={pageCount} page={page} showFirstButton showLastButton onChange={changePage} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Movies;