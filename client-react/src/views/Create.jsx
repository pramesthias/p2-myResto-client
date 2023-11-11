import { useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function Create() {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token")
    const [formData, setData] = useState({
        name: "",
        price: 0,
        imgUrl: "",
        description: "",
        categoryId: 1,
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({...formData, [name]: value});  //setData({...formData});

        console.log(event.target.value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({  //dipersatu
                url: "http://localhost:3000/cuisines/add",
                method: "post",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data:
                {
                    name: formData.name,
                    price: formData.price,
                    imgUrl: formData.imgUrl,
                    description: formData.description,
                    categoryId: formData.categoryId
                }
            })
            // console.log(data)
            navigate("/cuisines");
        } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form 
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            />
        </>
    )
}

