import { IProduct } from "@/app/admin/dashboard/page";
import { setProduct } from "@/redux/features/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Image from 'next/image';
import axios from "axios";
import { makeToast } from "@/utils/helper";
import { setLoading } from "@/redux/features/loadingSlice";

interface PropsType {
  srNo: number;
  // setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

const ProductRow = ({ srNo,  setUpdateTable, product }: PropsType) => {
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(setProduct(product));
    // setOpenPopup(true);
  };

  const onDelete = () => {
    // ... (implementation for onDelete)
    dispatch(setLoading(true));

  const payload = {
    fileKey: product.fileKey,
  };

  axios
    .delete("/api/uploadthing", { data: payload })
    .then((res) => {
      console.log(res.data);
    });

  axios
    .delete(`/api/delete_product/${product._id}`)
    .then((res) => {
      console.log(res.data);
      makeToast("Product deleted Successfully");
      setUpdateTable((prevState) => !prevState);
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(setLoading(false)));
    

  };

  return (
    <tr className="text-center items-center">
  <td className="py-2">{srNo}</td>
  <td className="py-2">{product.name}</td>
  <td className="py-2">${product.price}</td>
  <td className="py-2 flex justify-center">
    <Image src={product.imgSrc} width={40} height={40} alt="product_image" />
  </td>
  <td className="py-2">
    <div className="text-2xl flex justify-center gap-2 text-gray-600">
      <CiEdit
        className="cursor-pointer hover:text-black"
        onClick={onEdit}
      />
      <RiDeleteBin5Line
        className="text-[20px] cursor-pointer hover:text-red-600"
        onClick={onDelete}
      />
    </div>
  </td>
</tr>


  );
  
  

  // ... (rest of the component)
};
export default ProductRow;