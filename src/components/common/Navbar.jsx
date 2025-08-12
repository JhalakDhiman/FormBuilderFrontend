import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { IoPerson } from "react-icons/io5";

const NavBar = () => {

    const NavbarLinks = [
        {
            title: "Home",
            path: "/",
        },
        {
            title: "About Us",
            path: "/about",
        },
        {
            title: "Contact Us",
            path: "/contact",
        },
    ];

    const { user,setUser } = useContext(UserContext)

    const loginHandler = ()=>{
        setUser("hello");
        localStorage.setItem("user","hello");
    }
    const location = useLocation();

    return (
        <div className=" border-b-[1px] w-[100vw] border-b-richblack-700 bg-richblack-900">
            <div className="w-11/12 flex items-center mx-auto py-2 justify-between ">

                <div className='w-[50px] h-[50px] bg-blue-300 rounded-full flex items-center justify-center text-richblack-5 font-bold'>
                    F
                </div>

                {/* links section 1 */}
                <nav>
                    <ul className="flex text-richblack-25 font-[400] text-[16px] gap-5">
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path}
                                        className={`${link.path === location.pathname ? "text-yellow-25" : ""}`}>
                                        <p>{link.title}</p>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* links section 2 */}
                <nav>

                    {!user ? (<ul className="flex text-richblack-25 font-[400] text-[16px] gap-5">
                        {
                            <>
                                <div onClick={() => {
                                    loginHandler();
                                    toast.success("logged in")
                                }} className="text-richblack-100 cursor-pointer text-[16px] font-semibold border border-richblack-700 bg-richblack-800 px-3 py-2 rounded-lg">
                                    Log in
                                </div>
                                <div onClick={() => {
                                    toast.success("signed up")
                                }} className="text-richblack-100 cursor-pointer text-[16px] font-semibold border border-richblack-700 bg-richblack-800 px-3 py-2 rounded-lg">
                                    Sign up
                                </div>
                            </>
                        }
                    </ul>) : (
                        <div className='w-[50px] h-[50px] text-2xl flex items-center justify-center rounded-full bg-richblack-700 text-richblack-5'>
                            <IoPerson />
                        </div>
                    )
                    }
                </nav>

            </div>
        </div>
    )
}

export default NavBar
