import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Skeletons():ReactJSXElement {
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {Array.from(Array(20).keys()).map((_, i) => {
                return <div key={i}>
                    <Skeleton className='h-[200px] md:h-[400px]' baseColor='#79a6f5' />
                    <Skeleton count={3} height='20px' baseColor='#79a6f5' />
                </div>
            })}
        </div>
    )
}

export default Skeletons