"use client"
import Sidebar from '@/components/admin-panel/Sidebar'
import Loader from "@/components/admin-panel/Loader";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { useState ,useEffect} from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setLoading } from '@/redux/features/loadingSlice';

//import '@/styles/globals.css'

import React,{ReactNode} from 'react'
import axios from 'axios';
import ProductRow from '@/components/admin-panel/ProductRow';

export interface IProduct {
      _id: string;
    imgSrc: string;
    fileKey: string;
    name: string;
    price: string;
    category: string;
  // ... (interface definition likely goes here)
}

const Dashboard = ({children}:{children:ReactNode}) => {
  const isLoading = useAppSelector((store) => store.LoadingReducer);
  const { data: session } = useSession();

  const [products, setProducts] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    axios
      .get("/api/get_products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, [updateTable]);
  return (

    <div className="flex">
      
          {/* <Sidebar /> */}
          <Sidebar/>
          <div className="w-full h-full">
            {/* <Navbar /> */}
            {/* <div className="bg-gray-200 p-4 h-[calc(100vh-64px)]">{children}</div> */}
            <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">
              <h2 className="text-3xl">All Products</h2>

              <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-500 border-t border-[#ececec]">
                      <th>SR No.</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Picture</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: IProduct, index) => (
                      <ProductRow
                        key={product._id}
                        srNo={index + 1}
                        setOpenPopup={setOpenPopup}
                        setUpdateTable={setUpdateTable}
                        product={product}
                      />
                    ))}
                  </tbody>
                  </table>
              </div>
            </div>
          </div>
          {isLoading && <Loader />}
        </div>
  )
}

export default Dashboard