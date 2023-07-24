
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import "./styles.css"

function Star({color}){

    return(
        <div>
            {
                (color=="red") ?(
                    <button className='red'><StarOutlineRoundedIcon/></button>
                ):(
                    <button className='green'><StarOutlineRoundedIcon/></button>  
                )
            }
        </div>
    )
}

export default Star;