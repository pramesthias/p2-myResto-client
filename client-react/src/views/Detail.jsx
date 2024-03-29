import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { toast } from 'react-toastify';


export default function Detail() {
  const { id } = useParams();
  // console.log(id)
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://resto-server-h8.pramresto.site/pub/cuisines/" + id);
        console.log(data)
        setData(data)
        console.log(data)
      } catch ({ response }) {
        toast.error(response.data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        console.log(error)
      }

      // catch (error) {
      //   console.log(error)
      // }
    }
    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      <section id="detail-page" className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0"
              src={data.imgUrl}
              alt={data.name} /></div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">{data.name}</h1>
              <div className="fs-5 mb-5">
                <span>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(data.price)}</span>
              </div>
              <p className="lead">{data.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )


}