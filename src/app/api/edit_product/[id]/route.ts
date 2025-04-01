
import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";
type Params = Promise<{ id: string }>;
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }  // Correct Next.js dynamic route type
) {
  try {
    const { id } = await params; // Correct access to `id`
    const body = await request.json();
    const { name, category, price } = body;

    await connectMongoDB();

    const data = await Product.findByIdAndUpdate(
      id,
      { name, category, price },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ msg: "Updated Successfully", data });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        msg: "Something Went Wrong",
      },
      { status: 400 }
    );
  }
}


// import { connectMongoDB } from "@/libs/MongoConnect";
// import Product from "@/libs/models/Pderoduct";
// import { NextRequest, NextResponse } from "next/server";

// export async function PUT(request: NextRequest, URLParams:{ params: { id: string } }) {
//   // ...
//    {
//   try {

//     const body = await request.json();
//    const id = URLParams.params.id;
//    const { name, category, price } = body;

//     await connectMongoDB();

//     const data = await Product.findByIdAndUpdate(id, {
//         name,
//         category,
//         price,
//       });
    
//       return NextResponse.json({ msg: "Updated Successfully", data });
    
    
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error,
//         msg: "Something Went Wrong",
//       },
//       { status: 400 }
//     );
//   }
// }
// }