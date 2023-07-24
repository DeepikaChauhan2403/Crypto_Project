import "./styles.css"
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

function AddedStar({color}){

    return(
        <div>
            {
                (color=="red") ?(
                    <div className='red'><StarRateRoundedIcon/></div>
                ):(
                    <div className='green'><StarRateRoundedIcon/></div>  
                )
            }
        </div>
    )
}

export default AddedStar;