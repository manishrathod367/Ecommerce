"use client";

import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { makeToast } from "@/utils/helper";
import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

interface IPayload {
  imgSrc: string | null;
  fileKey: string | null;
  name: string;
  category: string;
  price: number;
}

const ProductForm = () => {
  const [payload, setPayLoad] = useState<IPayload>({
    imgSrc: null,
    fileKey: null,
    name: "",
    category: "",
    price: 0,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      console.log("Sending payload:", payload); // Debugging log
      await axios.post("/api/add_products", payload); // ✅ Fixed API path
      makeToast("Product added successfully!");

      // Reset form after successful submission
      setPayLoad({
        imgSrc: null,
        fileKey: null,
        name: "",
        category: "",
        price: 0,
      });
    } catch (err) {
      console.error("Error adding product:", err);
      makeToast("Failed to add product. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Product Image Preview */}
      <Image
        className="max-h-[300px] w-auto object-contain rounded-md"
        src={payload.imgSrc ?? "/image.jpg"}
        width={800}
        height={500}
        alt="product_image"
      />

      {/* Upload Button */}
      <UploadButton
        className="text-black bg-pink-700 p-3 rounded-3xl"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res?.[0]) {
            setPayLoad((prev) => ({
              ...prev,
              imgSrc: res[0].url,
              fileKey: res[0].key,
            }));
          }
        }}
        onUploadError={(error: Error) => {
          console.error("Upload Error:", error);
          makeToast("Image upload failed!");
        }}
      />

      {/* Product Name */}
      <div>
        <label className="block ml-1">Product Name</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.name}
          onChange={(e) =>
            setPayLoad((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
      </div>

      {/* Product Category */}
      <div>
        <label className="block ml-1">Product Category</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.category}
          onChange={(e) =>
            setPayLoad((prev) => ({ ...prev, category: e.target.value }))
          }
          required
        />
      </div>

      {/* Product Price */}
      <div>
        <label className="block ml-1">Product Price</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="number"
          value={payload.price}
          onChange={(e) =>
            setPayLoad((prev) => ({
              ...prev,
              price: parseFloat(e.target.value) || 0,
            }))
          }
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button className="bg-pink-700 text-white px-8 py-2 rounded-md">
          Add
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

// "use client";

// import { setLoading } from "@/redux/features/loadingSlice";
// import { useAppDispatch } from "@/redux/hooks";
// import { makeToast } from "@/utils/helper";
// import { UploadButton } from "@/utils/uploadthing";
// import axios from "axios";
// import Image from "next/image";
// import React, { FormEvent, useState } from "react";

// interface IPayload {
//   imgSrc: string | null;
//   fileKey: string | null;
//   name: string;
//   category: string;
//   price: number;
// }

// const ProductForm = () => {
//   const [payload, setPayLoad] = useState<IPayload>({
//     imgSrc: null,
//     fileKey: null,
//     name: "",
//     category: "",
//     price: 0,
//   });

//   const dispatch = useAppDispatch();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     dispatch(setLoading(true));

//     try {
//       await axios.post("/api/add_product", payload);
//       makeToast("Product added successfully!");

//       setPayLoad({
//         imgSrc: null,
//         fileKey: null,
//         name: "",
//         category: "",
//         price: 0,
//       });
//     } catch (err) {
//       console.error(err);
//       makeToast("Failed to add product. Please try again.");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//       {/* Product Image Preview */}
//       <Image
//         className="max-h-[300px] w-auto object-contain rounded-md"
//         src={payload.imgSrc ?? "/image.jpg"}
//         width={800}
//         height={500}
//         alt="product_image"
//       />

//       {/* Upload Button */}
//       <UploadButton
//         className="text-black bg-pink-700 p-3 rounded-3xl"
//         endpoint="imageUploader"
//         onClientUploadComplete={(res) => {
//           if (res?.[0]) {
//             setPayLoad((prev) => ({
//               ...prev,
//               imgSrc: res[0].url,
//               fileKey: res[0].key,
//             }));
//           }
//         }}
//         onUploadError={(error: Error) => {
//           console.error("Upload Error:", error);
//           makeToast("Image upload failed!");
//         }}
//       />

//       {/* Product Name */}
//       <div>
//         <label className="block ml-1">Product Name</label>
//         <input
//           className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
//           type="text"
//           value={payload.name}
//           onChange={(e) =>
//             setPayLoad((prev) => ({ ...prev, name: e.target.value }))
//           }
//           required
//         />
//       </div>

//       {/* Product Category */}
//       <div>
//         <label className="block ml-1">Product Category</label>
//         <input
//           className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
//           type="text"
//           value={payload.category}
//           onChange={(e) =>
//             setPayLoad((prev) => ({ ...prev, category: e.target.value }))
//           }
//           required
//         />
//       </div>

//       {/* Product Price */}
//       <div>
//         <label className="block ml-1">Product Price</label>
//         <input
//           className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
//           type="number"
//           value={payload.price}
//           onChange={(e) =>
//             setPayLoad((prev) => ({
//               ...prev,
//               price: parseFloat(e.target.value) || 0,
//             }))
//           }
//           required
//         />
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <button className="bg-pink-700 text-white px-8 py-2 rounded-md">
//           Add
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ProductForm;
