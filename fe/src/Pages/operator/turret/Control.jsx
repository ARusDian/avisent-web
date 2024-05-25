import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { SlArrowUp } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";

export function OperatorTurretControl() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [turret, setTurret] = useState(null);

    const [mode, setMode] = useState("manual");

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
                        secretKey: data.data.secret_key,
                    });
                } else {
                    console.error("Failed to get data for editing turret");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        console.log("fetchData");
        fetchData();
        setIsLoading(false);
        console.log("fetchData" + id, isLoading);

    }, [id]);

    console.log(turret);

    // video url = /detection

    const [isHolding, setIsHolding] = useState(false);
    const timeoutRef = useRef(null);
    const holdParam = useRef(null);

    const handlePost = (task) => {
        console.log({ task });

        axios
            .post("http://192.168.1.9:8000/tasks", { task })
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
    
    // refresh image when mode changes

    return (
        <div className="min-h-screen">
            <div className="mx-[25%]">
                <div className="p-5 bg-gray-200 rounded-xl">
                    <img className="" src={turret && turret.secretKey ? `${turret.secretKey}/${mode}` : ""}></img>
                </div>
                <div className="p-5 bg-gray-200 rounded-xl">
                    <a className="font-sans font-bold text-xl">Controller</a>
                    <div className="flex justify-between">
                        <button className="col-start-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded flex flex-wrap justify-center" onClick={() => handleClick("reset")} onMouseDown={() => onMouseDown("reset")} onMouseUp={onMouseUp} onKeyDown={(e) => handleKeyDown(e)} onKeyUp={onMouseUp}><SlArrowDown className="m-5" /></button>
                        <div className="flex gap-3">
                                                        <label class="inline-block ps-[0.15rem] hover:cursor-pointer" for="flexSwitchCheckDefault">Manual</label>
                            <input 
                            checked={mode === "detection"}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setMode("detection");
                                } else {
                                    setMode("manual");
                                }
                            }}
                            class="me-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-black/25 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-switch-2 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-switch-1 checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-switch-3 focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ms-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-switch-3 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-white/25 dark:after:bg-surface-dark dark:checked:bg-primary dark:checked:after:bg-primary" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label class="inline-block ps-[0.15rem] hover:cursor-pointer" for="flexSwitchCheckDefault">Detection</label>
                        </div>
                    </div>
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