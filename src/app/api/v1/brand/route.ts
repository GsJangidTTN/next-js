import { NextRequest } from 'next/server';
import dbConnect from '@/app/api/db/dbConnect';
import Brand from '@/app/api/db/models/brand.model';
import Handler from '@/app/api/utils/handler/responseHandler';
import { createUpdateBrand } from '@/app/api/utils/validations/brand';
import CustomError from '@/app/api/utils/exception/customError';

// Create a new brand
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate request body
    await createUpdateBrand(data);

    const { title, description } = data;

    await dbConnect();

    const existingBrand = await Brand.findOne({ title });
    if (existingBrand) {
      throw new CustomError(`Brand with title "${title}" already exists`, 409);
    }

    const newBrand = new Brand({
      title,
      description,
    });

    const savedBrand = await newBrand.save();

    return Handler(
      {
        message: 'Brand created successfully',
        data: savedBrand,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return Handler({ message: error.message, status: false }, { status: error.status || 500 });
  }
}

// Fetch all brands
export async function GET() {
  try {
    await dbConnect();

    const brands = await Brand.find();

    return Handler(
      {
        message: 'Brands fetched successfully',
        data: brands,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Handler({ message: error.message, status: false }, { status: error.status || 500 });
  }
}

// Update a brand
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    const { id, ...updates } = data;

    await dbConnect();

    const updatedBrand = await Brand.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedBrand) {
      throw new CustomError(`Brand with ID "${id}" not found`, 404);
    }

    return Handler(
      {
        message: 'Brand updated successfully',
        data: updatedBrand,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Handler({ message: error.message, status: false }, { status: error.status || 500 });
  }
}

// Delete a brand
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await dbConnect();

    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      throw new CustomError(`Brand with ID "${id}" not found`, 404);
    }

    return Handler(
      {
        message: 'Brand deleted successfully',
        data: deletedBrand,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Handler({ message: error.message, status: false }, { status: error.status || 500 });
  }
}
