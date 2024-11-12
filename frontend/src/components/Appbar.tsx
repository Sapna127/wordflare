import { Avatar } from "./Card";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";

// Type for decoded token payload
interface DecodedToken {
    id: number;
    // Add other fields if needed
}

export const Appbar = () => {
    const [user, setUser] = useState<DecodedToken | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Decode the JWT to get user info
                const decoded = jwtDecode<DecodedToken>(token);
                setUser(decoded);
            } catch (error) {
                console.error("Invalid token");
                // Optionally, remove invalid token
                localStorage.removeItem("token");
            }
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/signin"); // Redirect to sign-in page
    };

    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link to="/" className="flex flex-col justify-center cursor-pointer text-2xl font-semibold">
                Wordflare
            </Link>
            <div className="flex items-center">
                {user ? (
                    <>
                        <Link to="/publish">
                            <button
                                type="button"
                                className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                            >
                                New
                            </button>
                        </Link>
                        <Avatar size="big" name="sapna" />
                        <button
                            onClick={handleSignOut}
                            className="ml-4 text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/signin">
                            <button className="mr-4 text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-full text-sm px-5 py-2.5">
                                Sign In
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5">
                                Sign Up
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};
