import { NextRequest } from 'next/server';
import dbConnect from '@/app/api/db/dbConnect';
import Category from '@/app/api/db/models/category.model';
import Handler from '@/app/api/utils/handler/responseHandler';
import { createUpdateCategory } from '@/app/api/utils/validations/category';
import CustomError from '@/app/api/utils/exception/customError';

// Create a new category
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate request body
    await createUpdateCategory(data);

    const { title, description, status } = data;

    await dbConnect();

    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      throw new CustomError(`Category with title "${title}" already exists`, 409);
    }

    const newCategory = new Category({
      title,
      description,
      status,
    });

    const savedCategory = await newCategory.save();

    return Handler(
      {
        message: 'Category created successfully',
        data: savedCategory,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return Handler({ message: error.message, status: false }, { status: error.status || 500 });
  }
}

// Fetch all categories
export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find();

    return Handler(
      {
        message: 'Categories fetched successfully',
        data: categories,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Handler({ message: error.message, status: false }, { status: error.status || 500 });
  }
}

// Update a category
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate request body
    await createUpdateCategory(data);

    const { id, ...updates } = data;

    await dbConnect();

    const updatedCategory = await Category.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedCategory) {
      throw new CustomError(`Category with ID "${id}" not found`, 404);
    }

    return Handler(
      {
        message: 'Category updated successfully',
        data: updatedCategory,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Handler({ message: error.message, status: false }, { status: error.status || 500 });
  }
}

// Delete a category
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await dbConnect();

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw new CustomError(`Category with ID "${id}" not found`, 404);
    }

    return Handler(
      {
        message: 'Category deleted successfully',
        data: deletedCategory,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Handler({ message: error.message, status: false }, { status: error.status || 500 });
  }
}
