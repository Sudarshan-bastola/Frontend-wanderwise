import { useNavigate } from "react-router-dom"

const CustomButton = ({ text, className, link }) => {
    const navigate = useNavigate();

  return (
      <button onClick={() => {navigate(link)}} className={`font-semibold bg-primary border border-blue-50 px-6 py-3 rounded-2xl text-white cursor-pointer hover:bg-cyan-400 ${className}`}> {text} </button>
  )
}

export default CustomButton