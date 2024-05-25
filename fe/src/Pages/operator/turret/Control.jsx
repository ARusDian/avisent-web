import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { SlArrowUp } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";

export function OperatorTurretControl() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [turret, setTurret] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/turrets/${id}`, // Menggunakan id_turret sebagai ID dalam URL
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = response.data;

                if (data.success) {
                    // Mengatur nilai form berdasarkan data yang diterima dari API
                    setTurret({
                        path: data.data.path,
                        description: data.data.description,
                        location: data.data.location,
                        secretKey: data.data.secretKey,
                    });
                } else {
                    console.error("Failed to get data for editing turret");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();

        setIsLoading(false);
    }, [id]); 

    // video url = /detection

    const [isHolding, setIsHolding] = useState(false);
    const timeoutRef = useRef(null);
    const holdParam = useRef(null);

    const handlePost = (task) => {
        console.log({ task });

        API
            .post("/tasks", { task })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const onMouseDown = (task) => {
        setIsHolding(true);
        holdParam.current = task;
        timeoutRef.current = setTimeout(() => setIsHolding(true), 100);
    };

    const onMouseUp = () => {
        setIsHolding(false);
        clearTimeout(timeoutRef.current);
    };

    const handleClick = (task) => {
        handlePost(task);
    }

    const handleKeyDown = (e) => {
        setIsHolding(true);
        if (e.key === "w") {
            handlePost("up2");
        } else if (e.key === "a") {
            handlePost("left2");
        } else if (e.key === "s") {
            handlePost("down2");
        } else if (e.key === "d") {
            handlePost("right2");
        } else if (e.key === "b") {
            handlePost("reset");
        }
        timeoutRef.current = setTimeout(() => setIsHolding(true), 100);
        setIsHolding(false);
        clearTimeout(timeoutRef.current);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        if (isHolding) {
            const intervalId = setInterval(() => {
                handlePost(holdParam.current);
            }, 50);

            return () => clearInterval(intervalId);
        }
    }, [isHolding]);

    return (
        <div className="min-h-screen">
            <div className="mx-[25%]">
                <img className="w-[75%] rounded-xl" src={`${turret.secretKey}/detection`}></img>
                <div className="p-5 bg-gray-200 rounded-xl">
                    <a className="font-sans font-bold text-xl">Controller</a>
                    <button className="col-start-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded flex flex-wrap justify-center" onClick={() => handleClick("reset")} onMouseDown={() => onMouseDown("reset")} onMouseUp={onMouseUp} onKeyDown={(e) => handleKeyDown(e)} onKeyUp={onMouseUp}><SlArrowDown className="m-5" /></button>
                    <div className="my-5 mx-20 grid grid-cols-3 gap-5">
                        <div className="grid grid-cols-subgrid col-span-3">
                            <button className="col-start-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded flex flex-wrap justify-center" onClick={() => handleClick("up2")} onMouseDown={() => onMouseDown("up2")} onMouseUp={onMouseUp}><SlArrowUp className="m-5" /></button>
                        </div>
                        <button className="col-start-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded flex flex-wrap justify-center" onClick={() => handleClick("left2")} onMouseDown={() => onMouseDown("left2")} onMouseUp={onMouseUp}><SlArrowLeft className="m-5" /></button>
                        <button className="col-start-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded flex flex-wrap justify-center" onClick={() => handleClick("right2")} onMouseDown={() => onMouseDown("right2")} onMouseUp={onMouseUp}><SlArrowRight className="m-5" /></button>
                        <div className="grid grid-cols-subgrid col-span-3">
                            <button className="col-start-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded flex flex-wrap justify-center" onClick={() => handleClick("down2")} onMouseDown={() => onMouseDown("down2")} onMouseUp={onMouseUp}><SlArrowDown className="m-5" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}