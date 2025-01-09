import { Schema, model, models } from 'mongoose';

export  enum Status{
    Active = 'active',
    InActvie = 'inActive'
}
const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Status,
      default: Status.Active,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Category = models.Category || model('Category', CategorySchema);

export default Category;
